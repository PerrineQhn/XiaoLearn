/**
 * grammarFocus — repérer, dans un exemple, ce que la fiche est en train
 * d'enseigner.
 *
 * Un exemple de grammaire ne se lit pas comme une phrase ordinaire : ce qui
 * compte, c'est le morceau qui illustre la règle. Dans 我把碗洗干净了, le mot
 * à voir est 把 ; dans 他把行李搬上来了, c'est 上来. Noyés dans la phrase, ils
 * demandent à l'apprenant de chercher lui-même ce qu'on veut lui montrer.
 *
 * Ce module extrait les motifs à souligner depuis le titre de la fiche, puis
 * localise leurs occurrences dans une phrase.
 */

/**
 * Motifs enseignés par une fiche, à partir de son titre.
 *
 * Les titres suivent plusieurs conventions, toutes gérées ici :
 *   « 把 »                              → ['把']
 *   « 怎么 (zěnme) »                     → ['怎么']            (le pinyin saute)
 *   « 什么/谁/哪儿/多少/几 »                 → les cinq mots
 *   « 很 + 形容词 »                       → ['很']              (形容词 est un
 *                                          méta-terme : il ne figure jamais
 *                                          dans une phrase réelle)
 *   « V + 上/下/进/出/回/过/起 + 来/去 »      → les neuf morphèmes
 *   « Sujet + Verbe »                    → []  (rien à souligner)
 */
export function focusPatterns(sheetHanzi: string): string[] {
  // Le pinyin entre parenthèses n'a rien à faire dans les motifs.
  const sansPinyin = sheetHanzi.replace(/[（(][^)）]*[)）]/g, ' ');

  const morceaux = sansPinyin
    .split(/[+＋/／,，、\s]+/)
    .map(x => x.trim())
    .filter(Boolean);

  // Méta-termes de la grammaire chinoise : ils NOMMENT une catégorie, ils ne
  // l'illustrent pas. Les souligner reviendrait à chercher le mot « verbe »
  // dans une phrase chinoise.
  const META = new Set([
    '形容词', '动词', '名词', '量词', '数词', '副词', '介词', '助词', '代词',
    '时间词', '主语', '谓语', '宾语', '定语', '状语', '补语',
    'V', 'Adj', 'N', 'Sujet', 'Verbe', 'Objet', 'Adjectif', 'Nom', 'Verb',
  ]);

  const out: string[] = [];
  for (const m of morceaux) {
    if (META.has(m)) continue;
    // On ne garde que ce qui est réellement chinois : « Sujet », « … »,
    // les points de suspension et autres n'ont rien à chercher.
    const zh = m.replace(/[^一-鿿]/g, '');
    if (zh) out.push(zh);
  }
  // Les motifs longs d'abord : dans 上来, on veut souligner 上来 d'un bloc
  // plutôt que 上 puis 来 séparément.
  return [...new Set(out)].sort((a, b) => b.length - a.length);
}

/**
 * Indices des caractères de `phrase` couverts par l'un des motifs.
 * Les zones déjà prises ne sont pas réattribuées : un motif long l'emporte.
 */
export function focusIndices(phrase: string, patterns: string[]): Set<number> {
  const marked = new Set<number>();
  if (!patterns.length) return marked;

  for (const p of patterns) {
    if (!p) continue;
    let from = 0;
    for (;;) {
      const at = phrase.indexOf(p, from);
      if (at < 0) break;
      // Ne pas recouvrir un motif déjà marqué (cas 上 dans 上来 déjà pris).
      let libre = true;
      for (let k = at; k < at + p.length; k++) if (marked.has(k)) { libre = false; break; }
      if (libre) for (let k = at; k < at + p.length; k++) marked.add(k);
      from = at + p.length;
    }
  }
  return marked;
}

/**
 * Raccourci : les indices à souligner dans une phrase, pour une fiche donnée.
 *
 * Garde-fou : si presque toute la phrase est marquée, on n'a rien mis en
 * évidence — on a juste tout mis en gras. Dans ce cas on renonce.
 */
export function focusFor(phrase: string, sheetHanzi: string): Set<number> {
  const idx = focusIndices(phrase, focusPatterns(sheetHanzi));
  const hanCount = Array.from(phrase).filter(ch => /[一-鿿]/.test(ch)).length;
  if (hanCount > 0 && idx.size / hanCount > 0.7) return new Set();
  return idx;
}
