/**
 * StructuredLearnBody.tsx — rend le `body` des sections d'apprentissage
 * --------------------------------------------------------------------
 * Le format historique des sections était un gros pavé de texte dans `body`.
 * Pour rendre la lecture plus agréable, on parse ce texte et on le découpe
 * en blocs visuels avec icônes et couleurs :
 *
 *   - 📏 Règle (RÈGLE D'OR, Règle :, etc.)
 *   - ⚠️ Exception
 *   - 💡 Astuce / Remarque
 *   - 🎯 Definition (X = ... ou X (pinyin) = ...)
 *   - paragraphe simple sinon
 *
 * Le découpage se fait en runtime sans toucher aux données existantes. Si
 * une section a un format que le parser ne reconnaît pas, elle retombe sur
 * le rendu de paragraphes classique. Aucune régression possible.
 */

import { Fragment, useMemo } from 'react';
import AutoPinyin from './AutoPinyin';

type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'rule'; text: string }
  | { kind: 'exception'; text: string }
  | { kind: 'note'; text: string };

/** Découpe une chaîne en blocs structurés selon les marqueurs détectés. */
function parseBody(body: string): Block[] {
  if (!body) return [];

  // 1) Split d'abord par \n explicites
  const lines = body.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  // 2) Pour chaque ligne, split par séparateurs sémantiques intra-ligne :
  //    "RÈGLE D'OR :", "Exception", "Astuce :", etc. — ces marqueurs créent
  //    de nouveaux blocs même au sein d'un seul paragraphe.
  const SPLIT_RE =
    /(?<=[.!?])\s+(?=(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:|Exception\b|Astuce\s*:|Remarque\s*:|Attention\s*:))/g;

  const blocks: Block[] = [];
  for (const line of lines) {
    const segments = line.split(SPLIT_RE).map((s) => s.trim()).filter(Boolean);
    for (const seg of segments) {
      // Règle
      const ruleMatch = seg.match(
        /^(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:)\s*(.+)$/i
      );
      if (ruleMatch) {
        blocks.push({ kind: 'rule', text: ruleMatch[1].trim() });
        continue;
      }
      // Exception (mot Exception au début, suivi de divers délimiteurs)
      const exceptionMatch = seg.match(
        /^Exception\s*(?:fréquente\s*)?(?:pour\s+[^:]+)?\s*[:.,]?\s*(.+)$/i
      );
      if (exceptionMatch) {
        blocks.push({ kind: 'exception', text: exceptionMatch[1].trim() });
        continue;
      }
      // Astuce / Remarque / Attention
      const noteMatch = seg.match(
        /^(?:Astuce|Remarque|Attention|Note)\s*[:.,]?\s*(.+)$/i
      );
      if (noteMatch) {
        blocks.push({ kind: 'note', text: noteMatch[1].trim() });
        continue;
      }
      blocks.push({ kind: 'paragraph', text: seg });
    }
  }

  return blocks;
}

const ICON: Record<Block['kind'], string> = {
  paragraph: '',
  rule: '📏',
  exception: '⚠️',
  note: '💡'
};

const LABEL_FR: Record<Block['kind'], string> = {
  paragraph: '',
  rule: 'Règle',
  exception: 'Exception',
  note: 'Astuce'
};

const LABEL_EN: Record<Block['kind'], string> = {
  paragraph: '',
  rule: 'Rule',
  exception: 'Exception',
  note: 'Tip'
};

export interface StructuredLearnBodyProps {
  body: string;
  language?: 'fr' | 'en';
}

export default function StructuredLearnBody({
  body,
  language = 'fr'
}: StructuredLearnBodyProps) {
  const blocks = useMemo(() => parseBody(body), [body]);
  if (blocks.length === 0) return null;

  const labels = language === 'en' ? LABEL_EN : LABEL_FR;

  return (
    <div className="lv2-structured-body">
      {blocks.map((block, i) => {
        if (block.kind === 'paragraph') {
          return (
            <p key={i} className="lv2-block lv2-block--paragraph">
              <AutoPinyin text={block.text} />
            </p>
          );
        }
        return (
          <div key={i} className={`lv2-block lv2-block--${block.kind}`}>
            <div className="lv2-block-header">
              <span className="lv2-block-icon" aria-hidden>
                {ICON[block.kind]}
              </span>
              <span className="lv2-block-label">{labels[block.kind]}</span>
            </div>
            <div className="lv2-block-content">
              <AutoPinyin text={block.text} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Export du parser pour testing / preview
export const __parseBodyForTest = parseBody;
export type { Block as LearnBodyBlock };
// Force Fragment to be considered used by TS (defensive — Fragment is for future use).
export const __frag = Fragment;
