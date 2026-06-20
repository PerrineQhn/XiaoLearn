/**
 * AutoPinyin — injecte automatiquement le pinyin après chaque run de hanzi
 * --------------------------------------------------------------------------
 * Pour les corps de texte des sections d'apprentissage / explications où le
 * rédacteur a écrit des hanzi inline sans ajouter le pinyin (ex: « 看电视 est
 * la collocation »), ce composant scanne la string et insère le pinyin entre
 * parenthèses juste après chaque séquence de hanzi.
 *
 * V14 — segmentation par MOTS au lieu de caractère par caractère :
 *   - Charge un dictionnaire compact (mots HSK 1-7 multi-char + overrides),
 *     ~9400 mots / 86 KB.
 *   - Greedy longest-match pour découper le run de hanzi en mots connus.
 *     Caractères restants (non reconnus) → traités isolément.
 *   - Pour chaque segment (mot ou caractère isolé), pinyin-pro est appelé
 *     avec `separator: ''` → on obtient le pinyin du mot complet concaténé
 *     (ex: "厕所" → "cèsuǒ", "怎么" → "zěnme") plutôt que séparé caractère
 *     par caractère.
 *   - Les segments sont ensuite joints par espace pour séparer les mots.
 *   Résultat : "厕所在哪儿" → "cèsuǒ zài nǎér" (avant : "cè suǒ zài nǎ ér").
 *
 * Heuristique pour éviter le bruit :
 *   - Skip si le texte qui SUIT le run de hanzi commence déjà par `(...)` ou
 *     `（…）` ou contient le pinyin du run (cas où l'auteur a mis le pinyin)
 *   - Skip si le run < 1 hanzi (sécurité)
 *
 * Rendu : le pinyin est affiché entre parenthèses dans un <span> italique
 * légèrement plus discret pour ne pas perturber la lecture.
 */

import { Fragment } from 'react';
import { pinyin } from 'pinyin-pro';
import segmentDictRaw from '../data/pinyin-segment-dict.json';

/** Détecte les runs de hanzi consécutifs (avec ponctuation chinoise interne tolérée). */
const HANZI_RUN_RE = /[一-鿿㐀-䶿]+/g;

/** Dico des mots multi-caractères connus pour la segmentation (Set pour lookup O(1)). */
const SEGMENT_DICT: Set<string> = new Set(segmentDictRaw as string[]);
/** Longueur max d'un mot dans le dico (pour borner la fenêtre du longest-match).
 *  Cap à 4 (chéngyǔ + mots usuels) : au-delà, on risque de groffer des phrases
 *  entières (ex: "一直走") au lieu de les segmenter naturellement ("一直" + "走"). */
const MAX_WORD_LEN = 4;

/**
 * Découpe une suite de hanzi en mots via greedy longest-match sur le dico.
 * Les caractères non reconnus comme partie d'un mot sont rendus isolément.
 *
 * Exemples :
 *   "厕所在哪儿" → ["厕所", "在", "哪儿"]
 *   "我要去地铁站" → ["我", "要", "去", "地铁站"]  (si 地铁站 dans dico)
 *   "你好世界" → ["你好", "世界"]
 */
function segmentHanziRun(text: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < text.length) {
    let matched = false;
    // Essai de mots du plus long au plus court (≥ 2 char)
    const maxLen = Math.min(MAX_WORD_LEN, text.length - i);
    for (let len = maxLen; len >= 2; len--) {
      const word = text.slice(i, i + len);
      if (SEGMENT_DICT.has(word)) {
        out.push(word);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Caractère isolé (mot inconnu ou hanzi seul)
      out.push(text[i]);
      i++;
    }
  }
  return out;
}

/** Cache simple hanzi → pinyin pour éviter de recomputer dans le même render. */
const pinyinCache = new Map<string, string>();
const getPinyin = (hanzi: string): string => {
  const cached = pinyinCache.get(hanzi);
  if (cached !== undefined) return cached;
  try {
    const segments = segmentHanziRun(hanzi);
    // Pour chaque segment : pinyin-pro avec separator vide → pinyin du mot
    // complet concaténé. On joint ensuite les segments avec un espace.
    const py = segments
      .map((seg) =>
        pinyin(seg, {
          toneType: 'symbol',
          type: 'string',
          separator: '',
          nonZh: 'consecutive'
        }).trim()
      )
      .filter(Boolean)
      .join(' ');
    pinyinCache.set(hanzi, py);
    return py;
  } catch {
    pinyinCache.set(hanzi, '');
    return '';
  }
};

/**
 * Détecte si du texte suivant déjà un run de hanzi contient une parenthèse
 * d'annotation pinyin. Si oui, on n'en ajoute pas.
 *
 * Patterns détectés :
 *   - 看电视 (kàn diànshì)
 *   - 看电视（kàn diànshì）
 *   - 看电视 [kan4 dian4 shi4]
 */
const ALREADY_ANNOTATED_RE = /^\s*[(\[（［]\s*[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]/;

export interface AutoPinyinProps {
  /** La chaîne à enrichir. Renvoie des React.Fragment avec les annotations injectées. */
  text: string;
  /** Si false, retourne la string brute sans annotation (utile pour disabler en un endroit). */
  enabled?: boolean;
}

const AutoPinyin = ({ text, enabled = true }: AutoPinyinProps) => {
  if (!enabled || !text) return <>{text}</>;
  const parts: Array<React.ReactNode> = [];
  let lastEnd = 0;
  let key = 0;
  HANZI_RUN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = HANZI_RUN_RE.exec(text)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    const hanzi = m[0];
    // Ajoute le texte avant le run tel quel
    if (start > lastEnd) parts.push(text.slice(lastEnd, start));
    // Ajoute le hanzi
    parts.push(hanzi);
    // Vérifie si le texte qui suit a déjà une annotation pinyin
    const after = text.slice(end);
    if (!ALREADY_ANNOTATED_RE.test(after)) {
      const py = getPinyin(hanzi);
      if (py) {
        parts.push(
          <span key={`py-${key++}`} className="auto-pinyin"> ({py})</span>
        );
      }
    }
    lastEnd = end;
  }
  // Texte restant après le dernier run
  if (lastEnd < text.length) parts.push(text.slice(lastEnd));
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? <Fragment key={i}>{p}</Fragment> : p
      )}
    </>
  );
};

export default AutoPinyin;
