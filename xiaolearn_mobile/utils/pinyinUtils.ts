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
