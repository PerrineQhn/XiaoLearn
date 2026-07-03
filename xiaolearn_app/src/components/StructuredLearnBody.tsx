/**
 * StructuredLearnBody.tsx — rend le `body` des sections d'apprentissage
 * --------------------------------------------------------------------
 * V22 — Réécriture pour fiabilité :
 *   - Détection des marqueurs sémantiques (Règle / Exception / Astuce) au DÉBUT
 *     D'UNE PHRASE, comme avant. Capitalise la première lettre du contenu.
 *   - LISTES EXPLICITES : si un body contient des lignes commençant par '- '
 *     (tiret puis espace) ou '• ' (puce), elles sont rendues en liste à puces.
 *     L'auto-détection par virgule a été RETIRÉE (trop fragile : coupait les
 *     pinyins parenthésés).
 *   - Mini-markdown inline : **gras** et *italique* (parser conservateur).
 *
 * Pour expliciter une liste dans un body, l'auteur écrit :
 *
 *   "Phrases-bouées :
 *   - 请再说一遍 (redites svp)
 *   - 慢一点 (plus lentement)
 *   - 我听不懂 (je ne comprends pas)
 *   Astuce : ces 5 phrases te sortent de presque toutes les impasses."
 *
 * Et il obtient un titre + une liste à puces + un bloc Astuce.
 */

import { Fragment, useMemo, type ReactNode } from 'react';

type Block =
  | { kind: 'paragraph'; text: string; listItems?: string[]; listIntro?: string }
  | { kind: 'rule'; text: string; listItems?: string[]; listIntro?: string }
  | { kind: 'exception'; text: string; listItems?: string[]; listIntro?: string }
  | { kind: 'note'; text: string; listItems?: string[]; listIntro?: string }
  | {
      kind: 'topic-card';
      hanzi: string;
      pinyin?: string;
      description: string;
      examples?: string[];
    };

/** Capitalise la 1re lettre (en gérant les caractères accentués / unicode). */
function capitalize(s: string): string {
  const trimmed = s.trimStart();
  if (!trimmed) return s;
  return trimmed.charAt(0).toLocaleUpperCase('fr') + trimmed.slice(1);
}

/**
 * Découpe une chaîne en blocs structurés selon les marqueurs détectés.
 * Le découpage suit cet ordre :
 *   1. Split par lignes (\n)
 *   2. Pour chaque ligne, split par marqueurs sémantiques en début de phrase
 *      (Règle/Exception/Astuce après un point).
 *   3. Pour chaque segment, détecter si c'est un bloc spécial et capitaliser.
 *   4. Détecter d'éventuelles listes explicites via '- ' / '• ' multi-lignes.
 */
function parseBody(body: string): Block[] {
  if (!body) return [];

  // Étape 1 : split par lignes mais préserve les listes (lignes commençant par '- ').
  // On va regrouper les lignes qui ne commencent pas par '- ' avec la précédente
  // POUR les paragraphes en plusieurs lignes (rare), mais SÉPARER les items '- '
  // qui doivent rester individuels.

  // Approche : split par \n, puis fusionner intelligemment.
  const rawLines = body
    .split(/\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);

  // Étape 2 : convertir en blocks bruts, en gérant les listes explicites.
  const SPLIT_RE =
    /(?<=[.!?])\s+(?=(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:|Exception\b|Astuce\s*:|Remarque\s*:|Attention\s*:|[\u4e00-\u9fff]{1,4}\s*\([^)]+\)\s*[^:]{1,80}:))/g;

  const blocks: Block[] = [];

  // Buffer pour les items d'une liste en cours
  let listBuffer: string[] = [];
  let listIntro: string | undefined;
  let listAttachedToBlock: Block | null = null;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    if (listAttachedToBlock && listAttachedToBlock.kind !== 'topic-card') {
      // Attache la liste au dernier bloc créé (l'intro était dans son texte)
      listAttachedToBlock.listItems = [...listBuffer];
      listAttachedToBlock.listIntro = listIntro;
    } else {
      // Liste orpheline → en faire un paragraphe avec juste les items
      blocks.push({
        kind: 'paragraph',
        text: '',
        listItems: [...listBuffer],
        listIntro
      });
    }
    listBuffer = [];
    listIntro = undefined;
    listAttachedToBlock = null;
  };

  const processSegment = (seg: string) => {
    // Item de liste : commence par '- ' ou '• '
    if (/^[-•]\s/.test(seg)) {
      listBuffer.push(seg.replace(/^[-•]\s+/, '').trim());
      return;
    }

    // Si on avait des items en cours sans nouveau marqueur, on flush avant
    flushList();

    // Détection des blocs spéciaux
    const ruleMatch = seg.match(
      /^(?:RÈGLE\s*(?:D[''’]OR)?\s*:|Règle\s*:)\s*(.+)$/i
    );
    if (ruleMatch) {
      const block: Block = { kind: 'rule', text: capitalize(ruleMatch[1]) };
      blocks.push(block);
      // Si le texte se termine par ":" alors les prochaines lignes "- ..." vont
      // s'attacher comme liste de ce bloc.
      if (/:\s*$/.test(ruleMatch[1])) {
        listIntro = undefined;
        listAttachedToBlock = block;
      }
      return;
    }
    const exceptionMatch = seg.match(
      /^Exception\s*(?:fréquente\s*)?(?:pour\s+[^:]+)?\s*[:.,]?\s*(.+)$/i
    );
    if (exceptionMatch) {
      const block: Block = { kind: 'exception', text: capitalize(exceptionMatch[1]) };
      blocks.push(block);
      if (/:\s*$/.test(exceptionMatch[1])) {
        listAttachedToBlock = block;
      }
      return;
    }
    const noteMatch = seg.match(
      /^(?:Astuce|Remarque|Attention|Note)\s*[:.,]?\s*(.+)$/i
    );
    if (noteMatch) {
      const block: Block = { kind: 'note', text: capitalize(noteMatch[1]) };
      blocks.push(block);
      if (/:\s*$/.test(noteMatch[1])) {
        listAttachedToBlock = block;
      }
      return;
    }
    // Topic-card : « HANZI (pinyin) description : ex1, ex2, ex3. »
    // Utile pour découper les gros paragraphes qui présentent plusieurs
    // sous-sujets thématiques (ex : suffixes de lieux 店/馆/院).
    // Anti-faux-positifs :
    //   - la partie « description » ne doit pas contenir de ':' internes
    //   - il faut au moins un exemple séparé par des virgules OU une glose
    //     multi-mots pour éviter les cas type « 苹果 (píngguǒ) est mon fruit »
    const topicMatch = seg.match(
      /^([\u4e00-\u9fff]{1,4})\s*\(([^)]+)\)\s*([^:]{1,80}?):\s*(.+?)\.?\s*$/
    );
    if (topicMatch) {
      const [, hanzi, pinyin, description, rest] = topicMatch;
      const trimmedDesc = description.trim();
      let trimmedRest = rest.trim();
      // Anti-faux-positifs :
      //   - description ne doit pas être vide et doit ressembler à une
      //     description (pas juste un verbe copule court)
      //   - rest doit ressembler à une liste d'exemples : contient une virgule
      //     OU commence par un hanzi (typique d'un exemple chinois)
      const pinyinLooksValid = looksLikePinyin(pinyin);
      const restStartsWithHanzi = /^[\u4e00-\u9fff]/.test(trimmedRest);
      const descIsMeaningful = trimmedDesc.length >= 3;
      // Détection d'une éventuelle phrase de conclusion collée à la fin :
      // ex. « ... 电影院 (diànyǐngyuàn) cinéma. Reconnaître ces 3 suffixes... »
      // Si le rest contient un « . » suivi d'un espace + majuscule ASCII
      // (typique d'une phrase FR/EN qui commence), on scinde.
      let trailingConclusion: string | null = null;
      const conclusionSplit = trimmedRest.match(
        /^(.+?[\u4e00-\u9fff\)\w])\.\s+([A-ZÀ-Ý][a-zà-ÿ].{5,})$/
      );
      if (conclusionSplit) {
        trimmedRest = conclusionSplit[1].trim();
        trailingConclusion = conclusionSplit[2].trim();
      }
      const restHasComma = /,/.test(trimmedRest);
      if (
        pinyinLooksValid &&
        descIsMeaningful &&
        (restHasComma || restStartsWithHanzi)
      ) {
        // Split exemples par virgule (top-level uniquement — préserve les
        // parenthèses pinyin qui ne contiennent pas de virgules internes en
        // pratique).
        const examples = trimmedRest
          .split(/,\s*/)
          .map((e) => e.trim())
          .filter(Boolean);
        if (examples.length > 0) {
          blocks.push({
            kind: 'topic-card',
            hanzi,
            pinyin: pinyin.trim(),
            description: trimmedDesc,
            examples
          });
          // Si une phrase de conclusion suivait, la traiter récursivement
          // comme paragraphe standard (ou marker).
          if (trailingConclusion) {
            processSegment(trailingConclusion);
          }
          return;
        }
      }
    }

    // Sinon : paragraphe simple. Si le texte se termine par ":" et qu'une liste
    // suit, le ":" sert d'intro de liste.
    if (/:\s*$/.test(seg)) {
      const block: Block = {
        kind: 'paragraph',
        text: seg.replace(/:\s*$/, '').trim()
      };
      blocks.push(block);
      listIntro = block.text;
      listAttachedToBlock = block;
      // Le texte du paragraphe est l'intro de la liste : on le vide pour ne
      // pas l'afficher deux fois.
      block.text = '';
      return;
    }
    blocks.push({ kind: 'paragraph', text: seg });
  };

  for (const rawLine of rawLines) {
    // Si la ligne est un item de liste, on garde le \n implicite et on processe.
    if (/^[-•]\s/.test(rawLine)) {
      processSegment(rawLine);
      continue;
    }

    // Sinon, on split la ligne par les marqueurs sémantiques in-line.
    const segments = rawLine.split(SPLIT_RE).map((s) => s.trim()).filter(Boolean);
    for (const seg of segments) {
      processSegment(seg);
    }
  }
  flushList();

  return blocks;
}

const ICON: Record<Block['kind'], string> = {
  paragraph: '',
  rule: '📏',
  exception: '⚠️',
  note: '💡',
  'topic-card': ''
};

const LABEL_FR: Record<Block['kind'], string> = {
  paragraph: '',
  rule: 'Règle',
  exception: 'Exception',
  note: 'Astuce',
  'topic-card': ''
};

const LABEL_EN: Record<Block['kind'], string> = {
  paragraph: '',
  rule: 'Rule',
  exception: 'Exception',
  note: 'Tip',
  'topic-card': ''
};

/**
 * Détecte si le contenu d'une parenthèse ressemble à du pinyin :
 *   - Que des lettres ASCII + diacritiques pinyin + espaces + chiffres de ton
 *   - Pas de ponctuation française (apostrophe, point d'interrogation, etc.)
 *   - Pas de mots français/anglais entiers AUTONOMES
 *
 * Critère : ne contient QUE [a-zA-Z], tons accentués, espaces, apostrophes
 * pinyin (’ pour qing'an), chiffres 1-4 (pour les tons numériques) ET au moins
 * une voyelle accentuée ou tone-numbered (sinon c'est probablement de l'anglais).
 *
 * V18 — Bugfix : l'ancien check `\b...du\b` faisait des faux négatifs sur des
 * pinyins comme "duōshao", "lái", "déng" parce qu'en regex JS le `\b` se
 * trouve entre un \w (lettre ASCII) et un non-\w (les voyelles accentuées
 * ō/á/è… sont non-\w). Donc "duōshao" exposait la sous-séquence "du" entre
 * deux frontières et matchait "du" dans la wordlist — alors qu'on ciblait
 * que les mots français autonomes.
 *
 * Nouvelle approche : on segmente la string par espaces, et on rejette
 * seulement si l'un des segments EST EXACTEMENT un mot français/anglais
 * commun. Comme ça "duōshao" passe (1 seul segment, pas dans la liste),
 * mais "(de la)" est rejeté (2 segments, tous deux dans la liste).
 */
const NON_PINYIN_WORDS = new Set([
  'the', 'and', 'or', 'but', 'not', 'to', 'of', 'in', 'with', 'on', 'at', 'is',
  'de', 'le', 'la', 'et', 'ou', 'mais', 'pas', 'une', 'un', 'du', 'des', 'les',
  'ce', 'ces', 'que', 'qui', 'pour', 'avec', 'sans', 'sur', 'sous', 'dans'
]);
function looksLikePinyin(inner: string): boolean {
  const s = inner.trim();
  if (!s || s.length > 60) return false;
  // Caractères autorisés (pinyin + variants)
  if (!/^[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹńŋ'’\s\d]+$/.test(s)) return false;
  // Doit contenir au moins une voyelle accentuée OU un ton numéroté (1-5)
  const hasAccent = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]/.test(s);
  const hasToneNum = /[a-z]+[1-5]/.test(s);
  if (!hasAccent && !hasToneNum) return false;
  // Si TOUS les segments (séparés par espaces) sont des mots français/anglais
  // communs SANS accent pinyin, c'est de la prose — rejeter.
  const segments = s.split(/\s+/).filter(Boolean);
  if (segments.length > 0) {
    const allFrenchWords = segments.every((seg) => {
      const low = seg.toLowerCase();
      const hasSegAccent = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]/.test(seg);
      return !hasSegAccent && NON_PINYIN_WORDS.has(low);
    });
    if (allFrenchWords) return false;
  }
  return true;
}

/**
 * Transforme les parenthèses de pinyin en spans italiques gris pour harmoniser
 * avec le style .auto-pinyin (sinon : pinyin manuel = texte noir normal,
 * pinyin auto-injecté = italique gris → incohérence visuelle).
 *
 * Pattern : (texte ressemblant à du pinyin) → <span class="manual-pinyin">(...)</span>
 */
function wrapPinyinParens(text: string): { kind: 'text' | 'pinyin'; content: string }[] {
  const tokens: { kind: 'text' | 'pinyin'; content: string }[] = [];
  let i = 0;
  // Buffer pour le texte courant (qu'on flush avant un token pinyin).
  let textBuf = '';
  const flushText = () => {
    if (textBuf) {
      tokens.push({ kind: 'text', content: textBuf });
      textBuf = '';
    }
  };
  while (i < text.length) {
    const ch = text[i];
    if (ch === '(') {
      // Cherche la fermeture
      const end = text.indexOf(')', i + 1);
      if (end > i) {
        const inner = text.slice(i + 1, end);
        if (looksLikePinyin(inner)) {
          // Match pinyin → flush texte, push pinyin, avance i
          flushText();
          tokens.push({ kind: 'pinyin', content: inner });
          i = end + 1;
          continue;
        }
      }
      // Parenthèse présente mais non-pinyin (ou pas fermée) : on prend
      // simplement le '(' comme texte et on continue → i progresse TOUJOURS.
      textBuf += ch;
      i++;
      continue;
    }
    textBuf += ch;
    i++;
  }
  flushText();
  return tokens;
}

/**
 * Rend une string avec mini-markdown :
 *   - **gras** → <strong>
 *   - *italique* → <em> (mais seulement si pas dans une parenthèse pinyin)
 *   - (pinyin) → <span class="manual-pinyin"> (italique gris harmonisé)
 *
 * Conservateur pour ne pas casser l'AutoPinyin qui suit.
 */
function renderInlineMarkdown(text: string): ReactNode {
  if (!text) return null;
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
        if (
          inner.length > 0 &&
          !/[\s(]/.test(inner.charAt(0)) &&
          !/[)\s]/.test(inner.charAt(inner.length - 1))
        ) {
          tokens.push({ kind: 'italic', content: inner });
          i = end + 1;
          continue;
        }
      }
    }
    let j = i;
    while (j < text.length && text[j] !== '*') j++;
    tokens.push({ kind: 'text', content: text.slice(i, j) });
    i = j;
  }

  /** Rend un texte en stylisant les parenthèses pinyin existantes.
   *
   *  IMPORTANT : on N'utilise PAS AutoPinyin ici car les bodies de leçon
   *  contiennent DÉJÀ les pinyins écrits par l'auteur (à dessein, pour
   *  contrôler le découpage par mots, érhua, etc.). Injecter en plus le
   *  pinyin auto provoquerait un doublon visible : "爸爸 (bàba) (bà ba)".
   *  On se contente donc d'harmoniser le STYLE des parenthèses existantes.
   */
  const renderWithPinyin = (raw: string): ReactNode => {
    const sub = wrapPinyinParens(raw);
    return sub.map((s, k) => {
      if (s.kind === 'pinyin') {
        return (
          <span key={k} className="manual-pinyin">
            <span aria-hidden> (</span>
            {s.content}
            <span aria-hidden>)</span>
          </span>
        );
      }
      return <Fragment key={k}>{s.content}</Fragment>;
    });
  };

  return tokens.map((t, idx) => {
    if (t.kind === 'bold') {
      return <strong key={idx}>{renderWithPinyin(t.content)}</strong>;
    }
    if (t.kind === 'italic') {
      return <em key={idx}>{renderWithPinyin(t.content)}</em>;
    }
    return <Fragment key={idx}>{renderWithPinyin(t.content)}</Fragment>;
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
        // Topic-card : forme dédiée, rendu autonome (pas de listItems partagés)
        if (block.kind === 'topic-card') {
          return (
            <div key={i} className="lv2-block lv2-block--topic">
              <div className="lv2-block-topic-header">
                <span className="lv2-block-topic-hanzi">{block.hanzi}</span>
                {block.pinyin && (
                  <span className="lv2-block-topic-pinyin">
                    ({block.pinyin})
                  </span>
                )}
                <span className="lv2-block-topic-desc">
                  {renderInlineMarkdown(block.description)}
                </span>
              </div>
              {block.examples && block.examples.length > 0 && (
                <ul className="lv2-block-topic-examples">
                  {block.examples.map((ex, j) => (
                    <li key={j}>{renderInlineMarkdown(ex)}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        const hasList = block.listItems && block.listItems.length > 0;

        const intro =
          block.listIntro ?? (block.kind === 'paragraph' ? undefined : undefined);

        const renderedContent = (
          <>
            {block.text && (
              <span className="lv2-block-text-part">
                {renderInlineMarkdown(block.text)}
              </span>
            )}
            {hasList && (
              <>
                {intro && (
                  <span className="lv2-block-intro-text">
                    {renderInlineMarkdown(intro)} :
                  </span>
                )}
                <ul className="lv2-block-examples">
                  {block.listItems!.map((it, j) => (
                    <li key={j}>{renderInlineMarkdown(it)}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        );

        if (block.kind === 'paragraph') {
          return (
            <div key={i} className="lv2-block lv2-block--paragraph">
              {renderedContent}
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
            <div className="lv2-block-content">{renderedContent}</div>
          </div>
        );
      })}
    </div>
  );
}

export const __parseBodyForTest = parseBody;
export type { Block as LearnBodyBlock };
