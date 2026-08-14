/**
 * pinyinSyllables — découper une transcription en syllabes.
 *
 * Le pinyin écrit correctement ne sépare pas les syllabes d'un même mot :
 * « wǒ de shǒujī » compte quatre syllabes mais trois blocs. Pour rapprocher
 * une transcription de sa chaîne de caractères — savoir quelle syllabe
 * correspond à quel hanzi — il faut donc redécouper les blocs.
 *
 * Le découpage se fait par correspondance la plus longue d'abord sur
 * l'inventaire fermé des syllabes du mandarin standard, avec deux règles qui
 * lèvent l'essentiel des ambiguïtés :
 *
 *   - `xīān` se lit xī + ān, jamais xiān : une syllabe suivante commençant
 *     par a, o ou e est précédée d'une apostrophe en orthographe soignée, mais
 *     tout le monde ne l'écrit pas. On préfère donc le découpage qui consomme
 *     toute la chaîne.
 *   - le `r` de 儿化 se colle à la syllabe qu'il suffixe (`nàr`, `yìdiǎnr`),
 *     il ne compte pas pour une syllabe à part.
 *
 * Sert à vérifier qu'une phrase d'exemple lit bien ses mots comme le
 * dictionnaire les lit — la seule incohérence qu'un apprenant remarque
 * immédiatement.
 */

/** Finales du mandarin, les plus longues d'abord. */
const FINALES = [
  'iang', 'iong', 'uang', 'ueng',
  'ang', 'eng', 'ian', 'iao', 'ing', 'ong', 'uai', 'uan', 'uei', 'uen', 'üan',
  'ai', 'an', 'ao', 'ei', 'en', 'er', 'ia', 'ie', 'in', 'iu', 'ou', 'ua', 'ue',
  'ui', 'un', 'uo', 'üe', 'ün',
  'a', 'e', 'i', 'o', 'u', 'ü', 'v',
];

/** Initiales, les plus longues d'abord ; la chaîne vide couvre yi-, wu-, a-… */
const INITIALES = [
  'zh', 'ch', 'sh',
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x',
  'r', 'z', 'c', 's', 'y', 'w', '',
];

/** Toutes les syllabes admissibles, sans les tons. */
const SYLLABES: Set<string> = (() => {
  const s = new Set<string>();
  for (const i of INITIALES) for (const f of FINALES) s.add(i + f);
  // Interjections et syllabes autonomes hors combinatoire.
  for (const x of ['er', 'n', 'ng', 'hm', 'hng', 'm']) s.add(x);
  return s;
})();

const TONES: Record<string, string> = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a', ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i', ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u', ǖ: 'ü', ǘ: 'ü', ǚ: 'ü', ǜ: 'ü',
  ń: 'n', ň: 'n', ǹ: 'n', ê: 'e',
};

/** Lettres nues d'un bloc, tons et apostrophes retirés. */
const nu = (s: string) =>
  Array.from(s.toLowerCase())
    .map(c => TONES[c] ?? c)
    .filter(c => /[a-zü]/.test(c))
    .join('');

/**
 * Découpe un bloc de lettres (un « mot » écrit d'un seul tenant) en syllabes.
 * Renvoie `null` si aucun découpage ne consomme tout le bloc — mieux vaut
 * renoncer que produire un alignement faux.
 */
export function decouperBloc(bloc: string): string[] | null {
  const lettres = Array.from(bloc);
  const brut = lettres.map(c => (TONES[c.toLowerCase()] ?? c.toLowerCase()));

  // memo[i] = découpage du suffixe commençant en i, ou null.
  const memo = new Map<number, string[] | null>();

  const depuis = (i: number): string[] | null => {
    if (i === lettres.length) return [];
    if (memo.has(i)) return memo.get(i)!;
    memo.set(i, null); // coupe les cycles

    // Le plus long d'abord : 'shuang' avant 'shu'.
    for (let len = Math.min(6, lettres.length - i); len >= 1; len--) {
      let bout = brut.slice(i, i + len).join('');
      let pris = len;
      if (!SYLLABES.has(bout)) {
        // 儿化 : le r final appartient à la syllabe précédente.
        if (bout.endsWith('r') && SYLLABES.has(bout.slice(0, -1)) && bout !== 'er') {
          bout = bout.slice(0, -1);
        } else continue;
      } else if (
        // Un r qui suit immédiatement peut être le suffixe 儿化 plutôt que
        // l'initiale de la syllabe suivante : nàr, pas nà + r…
        brut[i + len] === 'r' && !SYLLABES.has(brut.slice(i + len, i + len + 3).join(''))
      ) {
        pris = len + 1;
      }
      const reste = depuis(i + pris);
      if (reste) {
        const out = [lettres.slice(i, i + pris).join(''), ...reste];
        memo.set(i, out);
        return out;
      }
    }
    return null;
  };

  return depuis(0);
}

/**
 * Syllabes d'une transcription entière, ponctuation et espaces ignorés.
 * `null` si un bloc résiste au découpage.
 */
export function syllabes(pinyin: string): string[] | null {
  const blocs = pinyin.match(/[A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹê]+/g) ?? [];
  const out: string[] = [];
  for (const b of blocs) {
    const d = decouperBloc(b);
    if (!d) return null;
    out.push(...d);
  }
  return out;
}

export { nu as lettresNues };
