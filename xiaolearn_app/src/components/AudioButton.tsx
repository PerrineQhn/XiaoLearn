import { useEffect, useMemo, useRef, useState } from 'react';
import { getAudioSrcCandidates, resolveAudioSrc } from '../utils/audio';
import type { Language } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioButtonProps {
  src: string;
  label?: string;
  /** Langue UI. Par défaut, lue depuis LanguageContext. */
  language?: Language;
}

const AudioButton = ({ src, label, language }: AudioButtonProps) => {
  const ctxLang = useLanguage();
  const effectiveLang = language ?? ctxLang;
  const t = effectiveLang === 'en'
    ? { listen: 'Listen', retry: 'Retry', pause: 'Pause', notFound: 'Audio not found', cantPlay: 'Cannot play' }
    : { listen: 'Écouter', retry: 'Réessayer', pause: 'Pause', notFound: 'Audio introuvable', cantPlay: 'Lecture impossible' };
  const effectiveLabel = label ?? t.listen;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcIndex, setSrcIndex] = useState(0);

  const resolvedSrc = useMemo(() => resolveAudioSrc(src), [src]);
  const srcCandidates = useMemo(() => getAudioSrcCandidates(src), [src]);
  const activeSrc = srcCandidates[Math.min(srcIndex, srcCandidates.length - 1)] ?? resolvedSrc;

  useEffect(() => {
    setError(null);
    setIsPlaying(false);
    setSrcIndex(0);
  }, [src]);

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
      setError(t.notFound);
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
      setError(t.cantPlay);
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
        {error ? t.retry : isPlaying ? t.pause : effectiveLabel}
      </span>
      {isPlaying && <span className="audio-pulse" aria-hidden="true" />}
    </button>
  );
};

export default AudioButton;
