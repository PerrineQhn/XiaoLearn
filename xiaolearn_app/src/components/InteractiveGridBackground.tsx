/**
 * InteractiveGridBackground.tsx
 * --------------------------------------------------------------------------
 * Halo/blob diffus rouge XiaoLearn qui suit le curseur avec un effet de
 * ressort (lerp). Pas de grille — juste une tache de lumière douce qui
 * accompagne la souris.
 *
 * Détails :
 *   - <div> rond avec radial-gradient + filter:blur — pur CSS, animé via
 *     transform: translate3d (GPU-composité, 60fps gratuit).
 *   - requestAnimationFrame : interpolation linéaire entre la position
 *     actuelle et la cible (curseur) → traînée fluide façon ressort.
 *   - Désactivé sur appareils sans souris (touch).
 *   - position:fixed z-index:-1 → reste derrière tout le contenu, ne capture
 *     pas les clics. Visible dans les zones de fond crème (.app-container
 *     bg) entre les cartes.
 */

import { useEffect, useRef } from 'react';
import './InteractiveGridBackground.css';

const GLOW_SIZE = 500; // diamètre du halo en px

const InteractiveGridBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Sur mobile/touch : pas de curseur → pas de halo. On retire l'élément
    // visuellement pour économiser la moindre ressource.
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) {
      glow.style.display = 'none';
      return;
    }

    // ------------------------------------------------------------------
    // État partagé : position cible (curseur) et position actuelle (halo).
    // Le halo suit la cible avec un lerp → effet ressort sans dépendance.
    // ------------------------------------------------------------------
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let pointerInside = false;

    /** Facteur d'easing : 0 = halo statique, 1 = collé au curseur.
     *  0.16 → ressort doux, traînée visible ~5 frames. */
    const LERP = 0.16;

    let rafId = 0;
    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      glow.style.transform = `translate3d(${currentX - GLOW_SIZE / 2}px, ${currentY - GLOW_SIZE / 2}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!pointerInside) {
        // Au premier mouvement (ou retour après leave), on téléporte le halo
        // sur le curseur pour éviter qu'il "voyage" depuis l'ancienne position.
        currentX = targetX;
        currentY = targetY;
        glow.style.opacity = '1';
        pointerInside = true;
      }
    };

    const onLeave = () => {
      glow.style.opacity = '0';
      pointerInside = false;
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={glowRef} className="xl-cursor-glow" aria-hidden="true" />;
};

export default InteractiveGridBackground;
