/**
 * WriteButton.tsx — bouton ✏️ + modale d'écriture pour les flashcards.
 * --------------------------------------------------------------------
 * Insère un 3e bouton dans le topbar des FlashcardV4 (à côté de 🔊 et 🎤).
 * Au clic, ouvre une modale POSITIONNÉE EXACTEMENT SUR LA CARTE de flashcard
 * (pas centrée sur le viewport — sinon décalage à cause de la sidebar).
 *
 * Stratégie (V19) :
 *   - Au montage, on remonte le DOM depuis le bouton pour trouver l'ancêtre
 *     .fc4-flip-card (la carte qui flip), on lit son getBoundingClientRect.
 *   - On rend la modale via createPortal dans document.body pour s'extraire
 *     de la rotation 3D de la flip-card et des potentiels overflow:hidden.
 *   - La modale est positionnée en `position: fixed` aux coords exactes du
 *     rect → elle COUVRE pile la carte.
 *   - Si la fenêtre est resize / scroll, on recalcule.
 *
 * Reste silencieux si le hanzi ne contient aucun caractère CJK traçable.
 */

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import HandwritingDrill from '../HandwritingDrill';

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
      <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
      <path d="M13 6l5 5" />
    </svg>
  );
}

const COPY = {
  fr: { aria: 'Pratiquer l\'écriture', close: 'Fermer' },
  en: { aria: 'Practice writing', close: 'Close' }
};

interface AnchorRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Cherche l'ancêtre .fc4-flip-card (ou .fc4-mcq-card, etc.) à partir d'un node. */
function findCardAncestor(node: HTMLElement | null): HTMLElement | null {
  let cur: HTMLElement | null = node;
  while (cur) {
    if (
      cur.classList.contains('fc4-flip-card') ||
      cur.classList.contains('fc4-mcq-card') ||
      cur.classList.contains('fc4-typing-card') ||
      cur.classList.contains('fc4-listening-card')
    ) {
      return cur;
    }
    cur = cur.parentElement;
  }
  return null;
}

/** padSize en fonction du width de la carte (au lieu du viewport).
 *  ~50-55% du width de la carte = pad confortable sans déborder. */
function getPadSize(cardWidth: number): number {
  if (cardWidth >= 600) return Math.round(cardWidth * 0.42); // desktop
  if (cardWidth >= 400) return Math.round(cardWidth * 0.5); // tablette
  return Math.round(cardWidth * 0.6); // mobile
}

export default function WriteButton({ hanzi, language = 'fr', inverse }: WriteButtonProps) {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const copy = COPY[language];

  const hasCjk = /[一-鿿]/.test(hanzi ?? '');

  // Recalcule le rect de la carte (au mount + au resize/scroll).
  const recomputeRect = useCallback(() => {
    const card = findCardAncestor(buttonRef.current);
    if (!card) {
      setAnchorRect(null);
      return;
    }
    const r = card.getBoundingClientRect();
    setAnchorRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, []);

  useEffect(() => {
    if (!open) return;
    recomputeRect();
    const onChange = () => recomputeRect();
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, true);
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, true);
    };
  }, [open, recomputeRect]);

  const handleOpen = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

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

  const padSize = useMemo(() => {
    if (!anchorRect) return 180;
    return getPadSize(anchorRect.width);
  }, [anchorRect]);

  if (!hasCjk) return null;

  // Style inline appliqué au dialog pour qu'il occupe exactement le rect de
  // la carte (fallback : viewport centered si l'ancêtre n'a pas pu être trouvé).
  const dialogStyle: React.CSSProperties = anchorRect
    ? {
        position: 'fixed',
        top: anchorRect.top,
        left: anchorRect.left,
        width: anchorRect.width,
        height: anchorRect.height
      }
    : {};

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`fc4-card-writer${inverse ? ' fc4-card-writer--inverse' : ''}`}
        onClick={handleOpen}
        aria-label={copy.aria}
      >
        <PenIcon size={20} />
      </button>

      {open &&
        createPortal(
          <div
            className="fc4-write-modal"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={copy.aria}
          >
            <div
              className="fc4-write-modal-dialog"
              style={dialogStyle}
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
          </div>,
          document.body
        )}
    </>
  );
}
