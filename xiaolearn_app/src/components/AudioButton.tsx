import { useEffect, useRef, useState } from 'react';
import { resolveAudioSrc } from '../utils/audio';

interface AudioButtonProps {
  src: string;
  label?: string;
}

const AudioButton = ({ src, label = 'Écouter' }: AudioButtonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedSrc = resolveAudioSrc(src);

  useEffect(() => {
    const audio = new Audio(resolvedSrc);
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => setError('Audio introuvable');

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [resolvedSrc]);

  const handleClick = async () => {
    if (error) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
      console.error('Impossible de lire le fichier audio', err);
      setError('Lecture impossible');
    }
  };

  return (
    <button
      type="button"
      className={`audio-button ${isPlaying ? 'playing' : ''} ${error ? 'error' : ''}`}
      onClick={handleClick}
      disabled={Boolean(error)}
    >
      <span className="audio-icon" aria-hidden="true">
        {error ? '⚠️' : isPlaying ? '🔊' : '🎧'}
      </span>
      <span className="audio-label">
        {error ? error : isPlaying ? 'Pause' : label}
      </span>
      {isPlaying && <span className="audio-pulse" aria-hidden="true" />}
    </button>
  );
};

export default AudioButton;
