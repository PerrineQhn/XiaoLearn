/**
 * pinyinUtils.ts — utilitaires pinyin pour l'app mobile
 */

const _TONED = new Set([...'āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ']);
const _UNTONED_V = new Set([...'aeiouü']);
const _PUNCT = /[。，、！？.,:;!?）\)\s]/;

/**
 * spacePinyin — insère des espaces entre syllabes pinyin concaténées.
 * Chaque voyelle tonée (diacritique) marque la fin du noyau syllabique ;
 * on consomme les voyelles atones finales (diphtongues), la coda -n/-ng/-r,
 * puis on insère un espace avant la syllabe suivante.
 *
 * Si la chaîne contient déjà des espaces, elle est retournée telle quelle.
 */
export function spacePinyin(raw: string): string {
  if (!raw || raw.includes(' ')) return raw;
  let out = '';
  let i = 0;
  while (i < raw.length) {
    const ch = raw[i];
    out += ch;
    if (_TONED.has(ch)) {
      let j = i + 1;
      // Diphtongue : voyelles atones qui suivent (même syllabe)
      while (j < raw.length && _UNTONED_V.has(raw[j])) { out += raw[j]; j++; }
      // Coda -ng, -n, -r
      if (j < raw.length) {
        if (raw[j] === 'n') {
          if (j + 1 < raw.length && raw[j + 1] === 'g') {
            out += 'ng'; j += 2;
          } else {
            const after = j + 1 < raw.length ? raw[j + 1] : '';
            if (!_UNTONED_V.has(after) && !_TONED.has(after)) { out += 'n'; j++; }
          }
        } else if (raw[j] === 'r') {
          const after = j + 1 < raw.length ? raw[j + 1] : '';
          if (!_UNTONED_V.has(after) && !_TONED.has(after)) { out += 'r'; j++; }
        }
      }
      // Espace avant la syllabe suivante (sauf ponctuation/fin)
      const next = j < raw.length ? raw[j] : '';
      if (next && !_PUNCT.test(next)) out += ' ';
      i = j;
    } else {
      i++;
    }
  }
  return out.trim();
}

// ─── Pinyin d'une phrase avec ponctuation ────────────────────────────────────
import { pinyin as _pinyinPro } from 'pinyin-pro';

/** Ponctuation chinoise → latine pour le rendu pinyin. */
const _ZH_PUNCT: Record<string, string> = {
  '，': ',', '。': '.', '！': '!', '？': '?', '：': ':', '；': ';',
  '、': ',', '（': '(', '）': ')', '「': '"', '」': '"', '《': '"', '》': '"',
  '”': '"', '“': '"', '…': '…',
};

const _HAN = /[㐀-鿿]/;

/** Nombre de syllabes dans un token pinyin (runs de voyelles). */
function _sylCount(token: string): number {
  let n = 0, inRun = false;
  for (const ch of token.toLowerCase()) {
    const isV = _UNTONED_V.has(ch) || _TONED.has(ch);
    if (isV && !inRun) { n++; inRun = true; }
    else if (!isV) inRun = false;
  }
  return Math.max(1, n);
}

/**
 * Fusionne la ponctuation des hanzi dans un pinyin SOURCE existant, en
 * conservant EXACTEMENT le découpage des mots du pinyin source
 * (ex: 你好 → "nǐhǎo" reste groupé). La ponctuation chinoise est convertie
 * en latin et insérée à la bonne position.
 *
 * ex: hanzi="喂，你好！", pinyin="wèi nǐhǎo" → "wèi, nǐhǎo!"
 */
export function mergePinyinPunct(hanzi: string, srcPinyin: string): string {
  if (!hanzi) return '';
  // Pas de pinyin source → repli pinyin-pro (par syllabe).
  if (!srcPinyin || !srcPinyin.trim()) {
    try {
      const raw = _pinyinPro(hanzi, { toneType: 'symbol' });
      return _tidy(raw.replace(/[，。！？：；、（）「」《》”“…]/g, c => _ZH_PUNCT[c] ?? c));
    } catch { return ''; }
  }

  const tokens = srcPinyin.trim().split(/\s+/).filter(Boolean)
    .map(t => ({ text: t, syl: _sylCount(t) }));

  let out = '';
  let ti = 0, used = 0;
  for (const ch of Array.from(hanzi)) {
    if (_HAN.test(ch)) {
      if (ti >= tokens.length) continue;
      if (used === 0) out += (out ? ' ' : '') + tokens[ti].text; // émet le token entier
      used++;
      if (used >= tokens[ti].syl) { ti++; used = 0; }
    } else if (_ZH_PUNCT[ch]) {
      out += _ZH_PUNCT[ch]; // ponctuation collée au token précédent
    }
  }
  return _tidy(out);
}

/** Espacement propre : pas d'espace avant ponctuation, un espace après. */
function _tidy(s: string): string {
  return s
    .replace(/\s+([,.!?:;)…])/g, '$1')
    .replace(/([,.!?:;])(?=\S)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
