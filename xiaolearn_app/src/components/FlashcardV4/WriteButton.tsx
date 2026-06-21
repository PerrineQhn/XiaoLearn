/**
 * WriteButton.tsx — bouton ✏️ + modale d'écriture pour les flashcards.
 * --------------------------------------------------------------------
 * Insère un 3e bouton dans le topbar des FlashcardV4 (à côté de 🔊 et 🎤).
 * Au clic, ouvre une modale par-dessus la carte qui lance le HandwritingDrill
 * sur tous les caractères du hanzi (mode démo + pratique, géré par HanziWriterPad).
 *
 * Conçu pour rester silencieux si le hanzi ne contient aucun caractère
 * traçable (uniquement pinyin/punctuation) — le composant retourne null.
 */

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import HandwritingDrill from '../HandwritingDrill';

/**
 * Calcule la taille du HanziWriterPad selon le viewport. Aligné sur les
 * breakpoints de la modale `.fc4-write-modal-dialog` (mobile / tablette /
 * desktop) — pad ≈ width modal - paddings - 30px de respiration.
 */
function getPadSize(): number {
  if (typeof window === 'undefined') return 150;
  const w = window.innerWidth;
  if (w >= 1024) return 210; // desktop
  if (w >= 600) return 180; // tablette
  return 150; // mobile
}

interface WriteButtonProps {
  hanzi: string;
  language?: 'fr' | 'en';
  /** Variante visuelle pour la face arrière (fond rouge inversé). */
  inverse?: boolean;
}

/** Icône stylo line-art assortie au SpeakerIcon (même taille / stroke). */
function PenIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Stylo type marqueur : pointe + corps + manche */}
      <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
      <path d="M13 6l5 5" />
    </svg>
  );
}

const COPY = {
  fr: {
    aria: 'Pratiquer l\'écriture',
    close: 'Fermer'
  },
  en: {
    aria: 'Practice writing',
    close: 'Close'
  }
};

export default function WriteButton({ hanzi, language = 'fr', inverse }: WriteButtonProps) {
  const [open, setOpen] = useState(false);
  const [viewportTick, setViewportTick] = useState(0);
  const copy = COPY[language];

  // Recalcule padSize si l'utilisateur tourne sa tablette (portrait/paysage)
  // ou redimensionne la fenêtre desktop pendant que la modale est ouverte.
  useEffect(() => {
    if (!open) return;
    const onResize = () => setViewportTick((t) => t + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const padSize = useMemo(() => getPadSize(), [viewportTick, open]);

  // Détecte la présence d'au moins un caractère CJK : sinon on cache le bouton
  // (cas des cartes pinyin-only qui ont déjà été filtrées en amont mais
  // certaines flashcards d'exemples peuvent ne contenir que de la ponctuation).
  const hasCjk = /[一-鿿]/.test(hanzi ?? '');

  const handleOpen = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!hasCjk) return null;

  return (
    <>
      <button
        type="button"
        className={`fc4-card-writer${inverse ? ' fc4-card-writer--inverse' : ''}`}
        onClick={handleOpen}
        aria-label={copy.aria}
      >
        <PenIcon size={20} />
      </button>

      {open && (
        <div
          className="fc4-write-modal"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={copy.aria}
        >
          <div
            className="fc4-write-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="fc4-write-modal-close"
              onClick={handleClose}
              aria-label={copy.close}
            >
              ✕
            </button>
            <HandwritingDrill hanzis={[hanzi]} language={language} padSize={padSize} />
          </div>
        </div>
      )}
    </>
  );
}
