import { useEffect, useMemo, useRef, useState } from 'react';
import { resolveAudioSrc } from '../utils/audio';

interface AudioButtonProps {
  src: string;
  label?: string;
}

const AudioButton = ({ src, label = 'Écouter' }: AudioButtonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcIndex, setSrcIndex] = useState(0);

  const resolvedSrc = resolveAudioSrc(src);
  const srcCandidates = useMemo(() => {
    const candidates = [resolvedSrc];
    if (resolvedSrc.endsWith('.wav')) candidates.push(resolvedSrc.slice(0, -4) + '.mp3');
    if (resolvedSrc.endsWith('.mp3')) candidates.push(resolvedSrc.slice(0, -4) + '.wav');
    return Array.from(new Set(candidates));
  }, [resolvedSrc]);
  const activeSrc = srcCandidates[Math.min(srcIndex, srcCandidates.length - 1)] ?? resolvedSrc;

  useEffect(() => {
    setError(null);
    setIsPlaying(false);
    setSrcIndex(0);
  }, [resolvedSrc]);

  useEffect(() => {
    const audio = new Audio(activeSrc);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => {
      if (srcIndex < srcCandidates.length - 1) {
        setError(null);
        setSrcIndex(srcIndex + 1);
        return;
      }
      setError('Audio introuvable');
      setIsPlaying(false);
    };

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
  }, [activeSrc, srcCandidates.length, srcIndex]);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      if (error) {
        setError(null);
        audio.load();
      }
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
      console.error('Impossible de lire le fichier audio', err);
      if (srcIndex < srcCandidates.length - 1) {
        setSrcIndex(srcIndex + 1);
        return;
      }
      setError('Lecture impossible');
    }
  };

  return (
    <button
      type="button"
      className={`audio-button ${isPlaying ? 'playing' : ''} ${error ? 'error' : ''}`}
      onClick={handleClick}
    >
      <span className="audio-icon" aria-hidden="true">
        {error ? '⚠️' : isPlaying ? '🔊' : '🎧'}
      </span>
      <span className="audio-label">
        {error ? 'Réessayer' : isPlaying ? 'Pause' : label}
      </span>
      {isPlaying && <span className="audio-pulse" aria-hidden="true" />}
    </button>
  );
};

export default AudioButton;
