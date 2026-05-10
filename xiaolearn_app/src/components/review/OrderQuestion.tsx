/**
 * OrderQuestion — exercice "réordonner les fragments" pour le runner Révisions.
 * ----------------------------------------------------------------------------
 * Les choix sont stockés dans l'ordre canonique (correct). On les affiche
 * mélangés au montage. L'utilisateur réorganise les jetons par drag & drop
 * (HTML5 native sur desktop) ou par tap-to-swap (fallback mobile).
 *
 * Validation : la séquence est correcte si chaque slot contient l'index
 * d'origine qui correspond à sa position (i.e. order[i] === i pour tout i).
 *
 * Le composant est purement contrôlé : il remonte la séquence courante via
 * `onSequenceChange`. La validation et le feedback "correct/wrong" sont gérés
 * par le parent qui passe `revealed` + `correctness` (par jeton).
 */
import { useEffect, useMemo, useRef, useState } from 'react';

export interface OrderQuestionProps {
  /** Choix dans l'ordre canonique (correct). */
  choices: string[];
  /** Phase de feedback — verrouille les interactions et affiche les couleurs. */
  revealed: boolean;
  /** Remonte la séquence d'indices courante (positions des choices d'origine). */
  onSequenceChange: (sequence: number[]) => void;
  language: 'fr' | 'en';
}

const HINTS = {
  fr: {
    instruction: 'Glisse les jetons pour reconstituer la phrase dans le bon ordre.',
    tapHint: '(ou tape un jeton, puis tape sa nouvelle position)',
    waitingSwap: 'Tape un autre jeton pour les échanger.'
  },
  en: {
    instruction: 'Drag the tokens to reconstruct the phrase in the right order.',
    tapHint: '(or tap a token, then tap its new position)',
    waitingSwap: 'Tap another token to swap them.'
  }
};

/** Renvoie [0..n-1] mélangé. Garantit qu'au moins un index n'est pas en place. */
const shuffleIndices = (n: number): number[] => {
  if (n <= 1) return [0];
  let order: number[] = [];
  let attempts = 0;
  do {
    order = Array.from({ length: n }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    attempts += 1;
  } while (
    attempts < 5 &&
    order.every((origIdx, slotIdx) => origIdx === slotIdx)
  );
  return order;
};

export default function OrderQuestion({
  choices,
  revealed,
  onSequenceChange,
  language
}: OrderQuestionProps) {
  const t = HINTS[language];

  // Ordre courant : tableau d'index d'origine, initialisé mélangé.
  // Reset si la liste de choix change (= nouvelle question).
  const [order, setOrder] = useState<number[]>(() => shuffleIndices(choices.length));
  const choicesKey = useMemo(() => choices.join('|'), [choices]);
  const initRef = useRef(choicesKey);
  useEffect(() => {
    if (initRef.current !== choicesKey) {
      setOrder(shuffleIndices(choices.length));
      initRef.current = choicesKey;
      setTouchSelected(null);
      setDraggedSlot(null);
    }
  }, [choicesKey, choices.length]);

  // Remonte la séquence au parent à chaque changement.
  useEffect(() => {
    onSequenceChange(order);
  }, [order, onSequenceChange]);

  // Drag & drop desktop : on stocke le slot source pendant le drag.
  const [draggedSlot, setDraggedSlot] = useState<number | null>(null);

  // Tap-to-swap mobile/clavier : premier tap mémorise le slot, second tap swap.
  const [touchSelected, setTouchSelected] = useState<number | null>(null);

  const swap = (a: number, b: number) => {
    if (a === b) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  };

  const onTap = (slot: number) => {
    if (revealed) return;
    if (touchSelected === null) {
      setTouchSelected(slot);
    } else if (touchSelected === slot) {
      setTouchSelected(null);
    } else {
      swap(touchSelected, slot);
      setTouchSelected(null);
    }
  };

  return (
    <div className="rv3-order">
      <p className="rv3-order-hint">
        {t.instruction}
        <span className="rv3-order-hint-sub"> {t.tapHint}</span>
      </p>

      <div className="rv3-order-row" role="list">
        {order.map((origIdx, slotIdx) => {
          const isSelected = touchSelected === slotIdx && !revealed;
          const isDragSrc = draggedSlot === slotIdx && !revealed;
          let stateCls = '';
          if (revealed) {
            stateCls = origIdx === slotIdx ? 'is-correct' : 'is-wrong';
          } else if (isSelected) {
            stateCls = 'is-selected';
          } else if (isDragSrc) {
            stateCls = 'is-dragging';
          }
          return (
            <div
              key={`slot-${slotIdx}`}
              role="listitem"
              tabIndex={revealed ? -1 : 0}
              draggable={!revealed}
              className={`rv3-order-chip ${stateCls}`}
              onClick={() => onTap(slotIdx)}
              onKeyDown={(e) => {
                if (revealed) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTap(slotIdx);
                }
              }}
              onDragStart={(e) => {
                if (revealed) {
                  e.preventDefault();
                  return;
                }
                setDraggedSlot(slotIdx);
                e.dataTransfer.effectAllowed = 'move';
                // Firefox refuse le drag si on ne pose rien dans le dataTransfer.
                e.dataTransfer.setData('text/plain', String(slotIdx));
              }}
              onDragEnd={() => setDraggedSlot(null)}
              onDragOver={(e) => {
                if (revealed || draggedSlot === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                if (revealed || draggedSlot === null) return;
                e.preventDefault();
                swap(draggedSlot, slotIdx);
                setDraggedSlot(null);
              }}
              aria-grabbed={isDragSrc || isSelected ? 'true' : 'false'}
              aria-label={`Position ${slotIdx + 1} : ${choices[origIdx]}`}
            >
              <span className="rv3-order-num" aria-hidden="true">
                {slotIdx + 1}
              </span>
              <span className="rv3-order-text">{choices[origIdx]}</span>
            </div>
          );
        })}
      </div>

      {touchSelected !== null && !revealed && (
        <p className="rv3-order-hint rv3-order-hint--active">{t.waitingSwap}</p>
      )}
    </div>
  );
}
