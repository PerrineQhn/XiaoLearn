/**
 * autoPinyin — transcrire une phrase chinoise, mot par mot.
 *
 * L'orthographe officielle du pinyin (汉语拼音正词法基本规则) lie les syllabes
 * d'un même MOT et sépare les mots par des espaces : 手机 s'écrit « shǒujī »,
 * jamais « shǒu jī ». La règle n'est pas cosmétique — « wǒ bǎ shǒujī fàng zài
 * zhuōzi shàng le » se lit, la version tout en syllabes se déchiffre.
 *
 * ## Segmenter, le vrai problème
 *
 * Le chinois ne sépare pas ses mots ; il faut donc les retrouver. Un simple
 * « mot le plus long d'abord » sur 我把手机… produit 把手 (une poignée) suivi
 * de 机, au lieu de 把 puis 手机. Le découpage de pinyin-pro ne fait pas mieux
 * ici : il rend 手 et 机 séparés.
 *
 * On segmente donc par programmation dynamique, en maximisant un score qui
 * combine deux signaux : la LONGUEUR du mot (au carré — un mot long est un
 * meilleur candidat que deux courts) et sa FRÉQUENCE, approchée par son
 * niveau HSK. C'est ce second terme qui tranche 把手机 : 手机 est HSK 1,
 * 把手 est HSK 7. Le découpage courant l'emporte sur le découpage savant.
 *
 * pinyin-pro reste la source pour ce que le dictionnaire ignore : il tranche
 * les caractères à lectures multiples d'après le contexte de la phrase.
 */
import { pinyin as pinyinPro } from 'pinyin-pro';
import HSK_VOCAB from '@/data/hskVocab.json';
import { GRAMMAR_PINYIN } from '@/data/grammarPinyin';

const HAN = /[一-鿿]/;

/** Poids par niveau : un mot HSK 1 est bien plus probable qu'un mot HSK 7. */
const NIVEAU_POIDS: Record<string, number> = {
  hsk1: 3.0, hsk2: 2.6, hsk3: 2.2, hsk4: 1.8, hsk5: 1.4, hsk6: 1.0, hsk7: 0.6,
};

interface Entree { py: string; poids: number }

/** hanzi → transcription liée + poids, construit une seule fois. */
const DICT: Map<string, Entree> = (() => {
  const m = new Map<string, Entree>();
  for (const e of HSK_VOCAB as { hanzi: string; pinyin: string; level: string }[]) {
    if (!e?.hanzi || !e.pinyin) continue;
    const py = e.pinyin.trim();
    // Une glose à alternatives n'est pas une transcription utilisable.
    if (!py || py.includes('/') || py.includes(';') || py.length > 24) continue;
    const poids = NIVEAU_POIDS[e.level] ?? 1;
    const dejala = m.get(e.hanzi);
    // Le niveau le plus bas gagne : c'est le sens le plus courant du mot.
    if (!dejala || poids > dejala.poids) m.set(e.hanzi, { py: py.replace(/\s+/g, ''), poids });
  }
  return m;
})();

const MAX_WORD = 4;
const cache = new Map<string, string>();

/** Syllabes de la phrase, lues dans leur contexte — pour les inconnus. */
function syllabes(text: string): string[] {
  try {
    return pinyinPro(text, { toneType: 'symbol', type: 'array' }) as string[];
  } catch {
    return [];
  }
}

/**
 * Pinyin d'une phrase : syllabes liées dans les mots, espace entre les mots,
 * rien avant la ponctuation. Renvoie '' s'il n'y a pas de chinois.
 */
export function autoPinyin(text: string): string {
  if (!text || !HAN.test(text)) return '';

  // Une transcription RELUE prime toujours sur une transcription déduite :
  // les phrases des fiches de grammaire ont été vérifiées une par une.
  const relu = GRAMMAR_PINYIN[text];
  if (relu) return relu;

  const hit = cache.get(text);
  if (hit !== undefined) return hit;

  const ch = Array.from(text);
  const n = ch.length;
  const syl = syllabes(text);

  // best[i] = meilleur score pour le suffixe commençant en i.
  const best = new Array<number>(n + 1).fill(-Infinity);
  const coupe = new Array<number>(n + 1).fill(1);
  best[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let L = Math.min(MAX_WORD, n - i); L >= 1; L--) {
      const mot = ch.slice(i, i + L).join('');
      const e = DICT.get(mot);
      // Un mot connu vaut sa longueur au carré, pondérée par sa fréquence ;
      // un caractère isolé et inconnu vaut peu, mais reste possible.
      const gain = e ? L * L * e.poids : (L === 1 ? 0.3 : -Infinity);
      if (gain === -Infinity) continue;
      const score = gain + best[i + L];
      if (score > best[i]) { best[i] = score; coupe[i] = L; }
    }
  }

  const mots: string[] = [];
  for (let i = 0; i < n; ) {
    const L = coupe[i];
    const mot = ch.slice(i, i + L).join('');

    if (!HAN.test(mot)) {
      // Ponctuation : collée au mot précédent, pour ne pas la faire flotter.
      const t = mot.trim();
      if (t) { if (mots.length) mots[mots.length - 1] += t; else mots.push(t); }
      i += L;
      continue;
    }

    const e = DICT.get(mot);
    mots.push(e ? e.py : ch.slice(i, i + L).map((_, k) => syl[i + k] ?? '').join(''));
    i += L;
  }

  const out = mots.filter(Boolean).join(' ').trim();
  cache.set(text, out);
  return out;
}
