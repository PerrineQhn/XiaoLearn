/**
 * OfflineLessonButton — déclenche le précache audio d'une leçon
 * --------------------------------------------------------------
 * 3 états visuels :
 *   - Idle             : "📥 Télécharger hors-ligne"
 *   - Downloading      : "↻ Téléchargement… N/M"
 *   - Done             : "✓ Disponible hors-ligne" (cliquable pour oublier)
 *
 * À placer en header de StructuredLessonPageV2 (ou n'importe quelle page
 * leçon) avec un payload OfflineLessonPayload qui liste les hanzi/urls
 * à mettre en cache.
 */

import { useState } from 'react';
import {
  useOfflineLessons,
  type OfflineLessonPayload
} from '../hooks/useOfflineLessons';

export interface OfflineLessonButtonProps {
  payload: OfflineLessonPayload;
  language?: 'fr' | 'en';
  /** Si fourni, override le style "pill discret" par "button-primary" plus gros. */
  variant?: 'compact' | 'large';
}

const COPY = {
  fr: {
    idle: '📥 Télécharger hors-ligne',
    downloading: 'Téléchargement…',
    done: '✓ Disponible hors-ligne',
    confirmForget: 'Oublier les audios hors-ligne pour cette leçon ?',
    offline: 'Hors-ligne — connecte-toi pour télécharger',
    nothingToDownload: 'Aucun audio à télécharger pour cette leçon'
  },
  en: {
    idle: '📥 Download for offline',
    downloading: 'Downloading…',
    done: '✓ Available offline',
    confirmForget: 'Forget offline audios for this lesson?',
    offline: 'Offline — connect to download',
    nothingToDownload: 'No audio to download for this lesson'
  }
} as const;

export const OfflineLessonButton = ({
  payload,
  language = 'fr',
  variant = 'compact'
}: OfflineLessonButtonProps) => {
  const offline = useOfflineLessons();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const copy = COPY[language];

  // Écoute les changements de connectivité (sans listener pour rester simple :
  // re-render au moment du clic suffit pour le UX courant).
  if (typeof window !== 'undefined') {
    window.ononline = () => setIsOnline(true);
    window.onoffline = () => setIsOnline(false);
  }

  const isDownloaded = offline.isDownloaded(payload.id);
  const isActive = offline.progress?.lessonId === payload.id;
  const pct = isActive && offline.progress
    ? Math.round((offline.progress.done / Math.max(1, offline.progress.total)) * 100)
    : 0;

  const handleClick = async () => {
    if (isActive) return; // déjà en cours
    if (isDownloaded) {
      if (window.confirm(copy.confirmForget)) {
        offline.forgetLesson(payload.id);
      }
      return;
    }
    if (!isOnline) {
      window.alert(copy.offline);
      return;
    }
    await offline.downloadLesson(payload);
  };

  const className = [
    'offline-lesson-btn',
    `offline-lesson-btn--${variant}`,
    isDownloaded ? 'is-downloaded' : '',
    isActive ? 'is-downloading' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const label = isActive
    ? `${copy.downloading} ${offline.progress?.done}/${offline.progress?.total}`
    : isDownloaded
      ? copy.done
      : copy.idle;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={isActive}
      aria-label={label}
    >
      <span className="offline-lesson-btn-label">{label}</span>
      {isActive && (
        <span
          className="offline-lesson-btn-progress"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      )}
    </button>
  );
};

export default OfflineLessonButton;
