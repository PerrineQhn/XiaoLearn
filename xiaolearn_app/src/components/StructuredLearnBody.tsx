/**
 * StructuredLearnBody.tsx — rend le `body` des sections d'apprentissage
 * --------------------------------------------------------------------
 * V21 — Améliorations UX (retours utilisateur) :
 *   1. Capitalise la 1re lettre après les marqueurs (ex : "Astuce : pour épeler"
 *      → "Astuce : Pour épeler").
 *   2. Détecte les suites de phrases-exemples (hanzi (traduction), hanzi
 *      (traduction), …) et les rend en LISTE À PUCES au lieu d'un pavé.
 *   3. Supporte un mini-markdown : `**gras**` et `*italique*` pour mettre en
 *      valeur les mots-clés dans les bodies.
 *
 * Blocs détectés (V20) :
 *   - 📏 Règle (RÈGLE D'OR :, Règle :)
 *   - ⚠️ Exception
 *   - 💡 Astuce / Remarque / Attention
 *   - paragraphe simple sinon
 *
 * Le découpage se fait en runtime sans toucher aux données existantes.
 */

import { Fragment, useMemo, type ReactNode } from 'react';
import AutoPinyin from './AutoPinyin';

type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'rule'; text: string }
  | { kind: 'exception'; text: string }
  | { kind: 'note'; text: string };

/** Capitalise la 1re lettre (en gérant les caractères accentués / unicode). */
function capitalize(s: string): string {
  const trimmed = s.trimStart();
  if (!trimmed) return s;
  return trimmed.charAt(0).toLocaleUpperCase('fr') + trimmed.slice(1);
}

/** Découpe une chaîne en blocs structurés selon les marqueurs détectés. */
function parseBody(body: string): Block[] {
  if (!body) return [];

  const lines = body.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  const SPLIT_RE =
    /(?<=[.!?])\s+(?=(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:|Exception\b|Astuce\s*:|Remarque\s*:|Attention\s*:))/g;

  const blocks: Block[] = [];
  for (const line of lines) {
    const segments = line.split(SPLIT_RE).map((s) => s.trim()).filter(Boolean);
    for (const seg of segments) {
      const ruleMatch = seg.match(
        /^(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:)\s*(.+)$/i
      );
      if (ruleMatch) {
        blocks.push({ kind: 'rule', text: capitalize(ruleMatch[1]) });
        continue;
      }
      const exceptionMatch = seg.match(
        /^Exception\s*(?:fréquente\s*)?(?:pour\s+[^:]+)?\s*[:.,]?\s*(.+)$/i
      );
      if (exceptionMatch) {
        blocks.push({ kind: 'exception', text: capitalize(exceptionMatch[1]) });
        continue;
      }
      const noteMatch = seg.match(
        /^(?:Astuce|Remarque|Attention|Note)\s*[:.,]?\s*(.+)$/i
      );
      if (noteMatch) {
        blocks.push({ kind: 'note', text: capitalize(noteMatch[1]) });
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

/**
 * Détecte si un texte ressemble à une suite de phrases-exemples séparées par
 * des virgules : "hanzi (trad), hanzi (trad), hanzi (trad)".
 * Si oui, retourne la liste de chaque exemple ; sinon null.
 *
 * Critères :
 *   - Le texte contient ≥ 3 segments séparés par ", " (ou "， ")
 *   - Chaque segment contient au moins 2 caractères chinois consécutifs
 *   - Optionnellement, le texte commence par un intro court ("Exemples : " etc.)
 */
function detectExampleList(text: string): { intro?: string; items: string[] } | null {
  // Skip si le texte est court (< 80 char = probablement pas une liste)
  if (text.length < 80) return null;

  // Possible intro suivi de ":"
  const introMatch = text.match(/^([^:]{3,40}):\s*(.+)$/s);
  let intro: string | undefined;
  let rest = text;
  if (introMatch) {
    const introCandidate = introMatch[1].trim();
    // L'intro ne doit pas contenir de hanzi (sinon c'est juste une phrase normale)
    if (!/[一-鿿]/.test(introCandidate) && introCandidate.length <= 40) {
      intro = introCandidate;
      rest = introMatch[2].trim();
    }
  }

  // Split par virgules ASCII ou chinoises, en gardant l'ordre
  const parts = rest.split(/(?:,|，)\s+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 3) return null;

  // Chaque part doit contenir au moins 1 hanzi (sinon c'est de la prose pure)
  const validParts = parts.filter((p) => /[一-鿿]/.test(p));
  if (validParts.length < 3) return null;
  // Si plus de 60% des parts contiennent du hanzi → c'est une liste d'exemples
  if (validParts.length / parts.length < 0.6) return null;

  // Retire un éventuel point final du dernier item
  const cleaned = parts.map((p, i) =>
    i === parts.length - 1 ? p.replace(/[.。]\s*$/, '') : p
  );

  return { intro, items: cleaned };
}

/**
 * Rend une string avec mini-markdown :
 *   - **gras** → <strong>
 *   - *italique* → <em> (mais SEULEMENT si pas dans une parenthèse pinyin)
 *
 * Le mini-parser est conservateur pour ne pas casser l'AutoPinyin qui suit.
 */
function renderInlineMarkdown(text: string): ReactNode {
  // Tokenize **bold** et *italic* en gardant le reste comme texte brut.
  const tokens: { kind: 'text' | 'bold' | 'italic'; content: string }[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2);
      if (end > 0) {
        tokens.push({ kind: 'bold', content: text.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    if (text[i] === '*') {
      const end = text.indexOf('*', i + 1);
      if (end > 0) {
        const inner = text.slice(i + 1, end);
        // évite que * intercalé dans un pinyin ou un mot soit interprété
        if (!/[\s(]/.test(inner.charAt(0)) && !/[)\s]/.test(inner.charAt(inner.length - 1))) {
          tokens.push({ kind: 'italic', content: inner });
          i = end + 1;
          continue;
        }
      }
    }
    // Caractère brut : accumule jusqu'au prochain * ou **
    let j = i;
    while (j < text.length && text[j] !== '*') j++;
    tokens.push({ kind: 'text', content: text.slice(i, j) });
    i = j;
  }

  return tokens.map((t, idx) => {
    if (t.kind === 'bold') {
      return (
        <strong key={idx}>
          <AutoPinyin text={t.content} />
        </strong>
      );
    }
    if (t.kind === 'italic') {
      return (
        <em key={idx}>
          <AutoPinyin text={t.content} />
        </em>
      );
    }
    return (
      <Fragment key={idx}>
        <AutoPinyin text={t.content} />
      </Fragment>
    );
  });
}

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
        const exampleList = detectExampleList(block.text);
        const content = exampleList ? (
          <>
            {exampleList.intro && (
              <span className="lv2-block-intro-text">
                {renderInlineMarkdown(exampleList.intro)} :
              </span>
            )}
            <ul className="lv2-block-examples">
              {exampleList.items.map((it, j) => (
                <li key={j}>{renderInlineMarkdown(it)}</li>
              ))}
            </ul>
          </>
        ) : (
          renderInlineMarkdown(block.text)
        );

        if (block.kind === 'paragraph') {
          return (
            <div key={i} className="lv2-block lv2-block--paragraph">
              {content}
            </div>
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
            <div className="lv2-block-content">{content}</div>
          </div>
        );
      })}
    </div>
  );
}

export const __parseBodyForTest = parseBody;
export type { Block as LearnBodyBlock };
