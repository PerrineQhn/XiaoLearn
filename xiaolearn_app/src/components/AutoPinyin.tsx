/**
 * AutoPinyin — injecte automatiquement le pinyin après chaque run de hanzi
 * --------------------------------------------------------------------------
 * Pour les corps de texte des sections d'apprentissage / explications où le
 * rédacteur a écrit des hanzi inline sans ajouter le pinyin (ex: « 看电视 est
 * la collocation »), ce composant scanne la string et insère le pinyin entre
 * parenthèses juste après chaque séquence de hanzi.
 *
 * Heuristique pour éviter le bruit :
 *   - Skip si le texte qui SUIT le run de hanzi commence déjà par `(...)` ou
 *     `（…）` ou contient le pinyin du run (cas où l'auteur a mis le pinyin)
 *   - Skip si le run < 1 hanzi (sécurité)
 *   - Le pinyin est généré via pinyin-pro (accentué, mots groupés par jieba
 *     côté regex simple — on traite chaque run indépendamment)
 *
 * Rendu : le pinyin est affiché entre parenthèses dans un <span> italique
 * légèrement plus discret pour ne pas perturber la lecture.
 */

import { Fragment } from 'react';
import { pinyin } from 'pinyin-pro';

/** Détecte les runs de hanzi consécutifs (avec ponctuation chinoise interne tolérée). */
const HANZI_RUN_RE = /[一-鿿㐀-䶿]+/g;

/** Cache simple hanzi → pinyin pour éviter de recomputer dans le même render. */
const pinyinCache = new Map<string, string>();
const getPinyin = (hanzi: string): string => {
  const cached = pinyinCache.get(hanzi);
  if (cached !== undefined) return cached;
  try {
    const py = pinyin(hanzi, {
      toneType: 'symbol',
      type: 'string',
      separator: ' ',
      nonZh: 'consecutive'
    }).trim();
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
