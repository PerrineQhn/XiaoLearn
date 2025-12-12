import json
import sys
import collections
from pathlib import Path

import numpy as np
import soundfile as sf

try:
    from TTS.api import TTS
    from TTS.utils import radam
    from torch.serialization import add_safe_globals
except ImportError as exc:
    raise SystemExit('La librairie TTS est requise. Veuillez installer `pip install TTS`.') from exc


def trim_silence(audio: np.ndarray, threshold: float = 2e-3, margin_ms: int = 50, sample_rate: int = 22050) -> np.ndarray:
    """
    Trim silence from audio with improved threshold and safety margins.

    Args:
        audio: Audio array to trim
        threshold: Amplitude threshold for silence detection (increased from 1e-3)
        margin_ms: Safety margin in milliseconds to keep before/after speech
        sample_rate: Sample rate for margin calculation
    """
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
    """
    Normalize audio volume to consistent level.

    Args:
        audio: Audio array to normalize
        target_db: Target volume in dB
    """
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


if len(sys.argv) < 3:
    raise SystemExit('Usage: python audio_tts.py <jobs.json> <output_dir>')

jobs_path = Path(sys.argv[1])
output_dir = Path(sys.argv[2])

with jobs_path.open('r', encoding='utf-8') as fh:
    jobs = json.load(fh)

# Import configuration
try:
    from audio_config import get_config, print_config, validate_config
    config = get_config(use_cloud=False)
except ImportError:
    # Fallback to default config if audio_config not found
    config = {
        'speech_rate': 1.15,
        'use_gpu': False,
        'model_name': 'tts_models/zh-CN/baker/tacotron2-DDC-GST',
        'sample_rate': 24000,
        'subtype': 'PCM_24',
        'silence_threshold': 2e-3,
        'silence_margin_ms': 100,
        'target_db': -20.0,
    }
    print("⚠️  audio_config.py not found, using default configuration")

# Extract config values
model_name = config.get('model_name', 'tts_models/zh-CN/baker/tacotron2-DDC-GST')
SPEECH_RATE = config['speech_rate']
USE_GPU = config['use_gpu']

add_safe_globals([radam.RAdam, collections.defaultdict, dict])

# Validate and print config
warnings = validate_config() if 'validate_config' in dir() else []
if warnings:
    for warning in warnings:
        print(warning)
    print()

print(f"Initializing TTS model: {model_name}")
print(f"Speech rate: {SPEECH_RATE}x")
print(f"GPU: {'enabled' if USE_GPU else 'disabled'}")

tts = TTS(model_name=model_name, progress_bar=False, gpu=USE_GPU)
sample_rate = tts.synthesizer.output_sample_rate

for index, job in enumerate(jobs, start=1):
    destination = output_dir / job['audio']
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        continue

    print(f"[{index}/{len(jobs)}] {job['audio']} - '{job['text']}'")

    # Generate audio
    audio = tts.tts(text=job['text'])
    audio_array = np.asarray(audio, dtype=np.float32)

    # Apply speed adjustment by resampling
    if SPEECH_RATE != 1.0:
        from scipy import signal
        num_samples = int(len(audio_array) / SPEECH_RATE)
        audio_array = signal.resample(audio_array, num_samples)

    # Trim silence with configured parameters
    trimmed = trim_silence(
        audio_array,
        threshold=config.get('silence_threshold', 2e-3),
        margin_ms=config.get('silence_margin_ms', 100),
        sample_rate=sample_rate
    )

    # Normalize volume for consistency
    normalized = normalize_audio(trimmed, target_db=config.get('target_db', -20.0))

    # Save with configured quality
    sf.write(
        destination,
        normalized,
        sample_rate,
        subtype=config.get('subtype', 'PCM_24')
    )

    # Log duration for monitoring
    duration_sec = len(normalized) / sample_rate
    print(f"  → Duration: {duration_sec:.2f}s")

print('Terminé ✅')
