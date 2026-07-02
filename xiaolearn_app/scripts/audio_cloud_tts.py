"""
Hybrid TTS service using Google Cloud Text-to-Speech API with local fallback.

This service provides high-quality Chinese audio generation with:
- Google Cloud TTS for superior quality
- Local Coqui TTS fallback
- Intelligent caching
- Duration control and normalization
"""

import json
import sys
import os
from pathlib import Path
from typing import Optional, Dict, Any

import numpy as np
import soundfile as sf


# Audio processing functions (duplicated to avoid importing audio_tts which initializes Coqui)
def trim_silence(audio: np.ndarray, threshold: float = 2e-3, margin_ms: int = 50, sample_rate: int = 22050) -> np.ndarray:
    """Trim silence from audio with improved threshold and safety margins."""
    if audio.size == 0:
        return audio
    mask = np.where(np.abs(audio) > threshold)[0]
    if mask.size == 0:
        return audio

    # Add safety margins to avoid cutting speech
    margin_samples = int((margin_ms / 1000.0) * sample_rate)
    start = max(0, mask[0] - margin_samples)
    end = min(len(audio), mask[-1] + 1 + margin_samples)

    return audio[start:end]


def normalize_audio(audio: np.ndarray, target_db: float = -20.0) -> np.ndarray:
    """Normalize audio volume to consistent level."""
    if audio.size == 0:
        return audio

    # Calculate current RMS and target RMS
    rms = np.sqrt(np.mean(audio ** 2))
    if rms == 0:
        return audio

    # Convert target dB to amplitude
    target_rms = 10 ** (target_db / 20.0)

    # Normalize
    normalized = audio * (target_rms / rms)

    # Prevent clipping
    max_val = np.abs(normalized).max()
    if max_val > 1.0:
        normalized = normalized / max_val * 0.99

    return normalized


class CloudTTSService:
    """Hybrid TTS service with cloud and local providers."""

    def __init__(self, use_cloud: bool = True, cache_dir: Optional[Path] = None):
        self.use_cloud = use_cloud
        self.cache_dir = cache_dir or Path('.audio_cache')
        self.cache_dir.mkdir(exist_ok=True)

        # Initialize Google Cloud TTS if available
        self.google_client = None
        if use_cloud:
            self.google_client = self._init_google_tts()

        # Initialize local TTS as fallback
        self.local_tts = None
        if not self.google_client:
            print("⚠️  Cloud TTS not available, using local Coqui TTS")
            self.local_tts = self._init_local_tts()

    def _init_google_tts(self) -> Optional[Any]:
        """Initialize Google Cloud TTS client."""
        try:
            from google.cloud import texttospeech

            # Check for credentials
            if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
                print("ℹ️  GOOGLE_APPLICATION_CREDENTIALS not set")
                return None

            client = texttospeech.TextToSpeechClient()
            print("✅ Google Cloud TTS initialized")
            return client
        except ImportError:
            print("ℹ️  google-cloud-texttospeech not installed")
            print("   Install with: pip install google-cloud-texttospeech")
            return None
        except Exception as e:
            print(f"⚠️  Could not initialize Google Cloud TTS: {e}")
            return None

    def _init_local_tts(self) -> Any:
        """Initialize local Coqui TTS as fallback."""
        try:
            import collections
            from TTS.api import TTS
            from TTS.utils import radam
            from torch.serialization import add_safe_globals

            model_name = 'tts_models/zh-CN/baker/tacotron2-DDC-GST'
            add_safe_globals([radam.RAdam, collections.defaultdict, dict])
            tts = TTS(model_name=model_name, progress_bar=False, gpu=False)
            print(f"✅ Local TTS initialized: {model_name}")
            return tts
        except Exception as e:
            raise RuntimeError(f"Could not initialize local TTS: {e}") from e

    def generate_audio(
        self,
        text: str,
        output_path: Path,
        speech_rate: float = 1.0,
        voice_name: str = 'cmn-CN-Wavenet-A'
    ) -> Dict[str, Any]:
        """
        Generate audio for given text.

        Args:
            text: Chinese text to convert to speech
            output_path: Where to save the audio file
            speech_rate: Speech speed multiplier (0.5-2.0)
            voice_name: Google Cloud voice name (for cloud TTS)

        Returns:
            Dict with metadata (duration, provider, etc.)
        """
        if self.google_client:
            return self._generate_google(text, output_path, speech_rate, voice_name)
        else:
            return self._generate_local(text, output_path, speech_rate)

    def _generate_google(
        self,
        text: str,
        output_path: Path,
        speech_rate: float,
        voice_name: str
    ) -> Dict[str, Any]:
        """Generate audio using Google Cloud TTS."""
        from google.cloud import texttospeech

        # Configure synthesis
        synthesis_input = texttospeech.SynthesisInput(text=text)

        # Select voice (Mandarin Chinese, Wavenet for best quality)
        voice = texttospeech.VoiceSelectionParams(
            language_code='cmn-CN',  # Mandarin Chinese
            name=voice_name
        )

        # Configure audio
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.LINEAR16,
            sample_rate_hertz=24000,
            speaking_rate=speech_rate,
            pitch=0.0,
            volume_gain_db=0.0
        )

        # Create output directory first
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Generate audio
        response = self.google_client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        # Save raw audio temporarily
        temp_path = output_path.with_suffix('.raw.wav')
        with open(temp_path, 'wb') as out:
            out.write(response.audio_content)

        # Load, process, and save
        audio, sample_rate = sf.read(temp_path)
        audio = audio.astype(np.float32)

        # Process audio
        trimmed = trim_silence(audio, threshold=2e-3, margin_ms=50, sample_rate=sample_rate)
        normalized = normalize_audio(trimmed, target_db=-20.0)

        # Save processed audio
        output_path.parent.mkdir(parents=True, exist_ok=True)
        sf.write(output_path, normalized, sample_rate, subtype='PCM_24')

        # Cleanup
        temp_path.unlink()

        duration = len(normalized) / sample_rate
        return {
            'provider': 'google-cloud-tts',
            'voice': voice_name,
            'duration': duration,
            'sample_rate': sample_rate,
            'speech_rate': speech_rate
        }

    def _generate_local(
        self,
        text: str,
        output_path: Path,
        speech_rate: float
    ) -> Dict[str, Any]:
        """Generate audio using local Coqui TTS."""
        from scipy import signal

        # Generate audio
        audio = self.local_tts.tts(text=text)
        audio_array = np.asarray(audio, dtype=np.float32)
        sample_rate = self.local_tts.synthesizer.output_sample_rate

        # Apply speed adjustment
        if speech_rate != 1.0:
            num_samples = int(len(audio_array) / speech_rate)
            audio_array = signal.resample(audio_array, num_samples)

        # Process audio
        trimmed = trim_silence(audio_array, threshold=2e-3, margin_ms=100, sample_rate=sample_rate)
        normalized = normalize_audio(trimmed, target_db=-20.0)

        # Save
        output_path.parent.mkdir(parents=True, exist_ok=True)
        sf.write(output_path, normalized, sample_rate, subtype='PCM_24')

        duration = len(normalized) / sample_rate
        return {
            'provider': 'coqui-tts-local',
            'voice': 'baker',
            'duration': duration,
            'sample_rate': sample_rate,
            'speech_rate': speech_rate
        }


def main():
    """Main entry point for batch audio generation."""
    if len(sys.argv) < 3:
        raise SystemExit('Usage: python audio_cloud_tts.py <jobs.json> <output_dir> [--cloud]')

    jobs_path = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    use_cloud = '--cloud' in sys.argv

    with jobs_path.open('r', encoding='utf-8') as fh:
        jobs = json.load(fh)

    # Import configuration
    try:
        from audio_config import get_config, print_config, validate_config
        config = get_config(use_cloud=use_cloud)

        # Validate configuration
        warnings = validate_config()
        if warnings:
            for warning in warnings:
                print(warning)
            print()
    except ImportError:
        # Fallback to default config
        config = {
            'speech_rate': 1.1,
            'voice_name': 'cmn-CN-Wavenet-A',
            'silence_margin_ms': 50,
        }
        print("⚠️  audio_config.py not found, using default configuration\n")

    # Extract configuration
    SPEECH_RATE = config.get('speech_rate', 1.1)
    VOICE_NAME = config.get('voice_name', 'cmn-CN-Wavenet-A')
    # Alternative voices: cmn-CN-Wavenet-B (male), cmn-CN-Wavenet-C (male)

    print(f"{'='*60}")
    print(f"Starting audio generation")
    print(f"Jobs: {len(jobs)}")
    print(f"Mode: {'Cloud (Google TTS)' if use_cloud else 'Local (Coqui TTS)'}")
    print(f"Speech rate: {SPEECH_RATE}x")
    if use_cloud:
        print(f"Voice: {VOICE_NAME}")
    print(f"{'='*60}\n")

    # Initialize service
    service = CloudTTSService(use_cloud=use_cloud)

    # Process jobs
    stats = {'total': len(jobs), 'generated': 0, 'skipped': 0, 'total_duration': 0.0}

    for index, job in enumerate(jobs, start=1):
        destination = output_dir / job['audio']

        if destination.exists():
            stats['skipped'] += 1
            print(f"[{index}/{len(jobs)}] ⏭️  Skipped (exists): {job['audio']}")
            continue

        print(f"[{index}/{len(jobs)}] 🎙️  Generating: {job['audio']} - '{job['text']}'")

        try:
            metadata = service.generate_audio(
                text=job['text'],
                output_path=destination,
                speech_rate=SPEECH_RATE,
                voice_name=VOICE_NAME
            )

            stats['generated'] += 1
            stats['total_duration'] += metadata['duration']

            print(f"  ✅ {metadata['provider']} - {metadata['duration']:.2f}s")

        except Exception as e:
            print(f"  ❌ Error: {e}")
            continue

    # Summary
    print(f"\n{'='*60}")
    print(f"Generation complete!")
    print(f"Generated: {stats['generated']}/{stats['total']}")
    print(f"Skipped: {stats['skipped']}")
    print(f"Total duration: {stats['total_duration']:.1f}s")
    print(f"Avg duration: {stats['total_duration']/max(stats['generated'], 1):.2f}s")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
