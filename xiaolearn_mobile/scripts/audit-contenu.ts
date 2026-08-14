/**
 * audit-contenu — passer tout le contenu pédagogique au même crible.
 *
 * Chaque campagne de correction précédente a été écrite à la main, pour un
 * jeu de données à la fois, et n'a laissé aucune trace exécutable : impossible
 * de savoir, trois semaines plus tard, si une régression s'est glissée dans le
 * dictionnaire ou dans les exercices. D'où ce script, qui rassemble en un seul
 * endroit les contrôles qui ont réellement trouvé des défauts :
 *
 *   - le pinyin d'un mot doit être le même partout où le mot apparaît ;
 *   - un champ chinois ne contient que du chinois, un champ français que du
 *     français (les deux se sont mélangés à répétition) ;
 *   - un QCM a des choix distincts, un index dans les bornes, et ne trahit pas
 *     sa réponse par un trait saillant ;
 *   - un identifiant est unique, une référence pointe sur quelque chose.
 *
 * Usage :  npx tsx scripts/audit-contenu.ts [--details]
 * Sortie : un compte par contrôle, et le détail des cas avec `--details`.
 * Code de sortie 1 s'il reste des anomalies bloquantes.
 */
import HSK_VOCAB from '@/data/hskVocab.json';
import { LEARN_SECTIONS } from '@/data/cecrLearnSections';
import { EXERCISES } from '@/data/cecrExercises';
import { cecrBilans } from '@/data/cecrBilans';
import { EVAL_QUESTIONS } from '@/data/evalQuestions';
import { DICTATION_PHRASES } from '@/data/dictationPhrases';
import { GRAMMAR_SHEETS } from '@/data/grammarLessons';
import { GRAMMAR_PINYIN } from '@/data/grammarPinyin';
import { LECTURES } from '@/data/cecrLectures';
import { dialogues } from '@/data/dialogues';
import { simulatorScenarios } from '@/data/simulatorScenarios';

const details = process.argv.includes('--details');

/**
 * Cas relus un par un et jugés corrects malgré l'alerte.
 *
 * Sans cette liste, vingt-sept avertissements permanents finissent par être
 * ignorés en bloc, et le vingt-huitième — le vrai — avec eux. Un identifiant
 * n'entre ici qu'après examen, et la raison est écrite à côté.
 */
const RELUS_ET_ACCEPTES = new Set<string>([
  // Le trait signalé EST la compétence évaluée : l'exercice demande justement
  // de reconnaître la négation, l'aspect ou la forme interrogative.
  'cecr-a1-daily-m4-listen1',        // reconnaître 没有 à l'écoute
  'cecr-a2-food-m2-gq1',             // 吃不了 : complément potentiel, pas une négation ordinaire
  'cecr-a2-nuances-m4-usg1',         // 正在…呢 contre 了 et 着
  'cecr-a2-nuances-m4-tr1',          // même opposition, en traduction
  'cecr-b11-jiucai-m1-contrast-4',   // 就 contre 才, le 了 fait partie de la forme correcte
  'cecr-b21-grammar-conj-m2-mcq2',   // 无论…来不来 : l'alternative interrogative est le point
  'cecr-b12-nuances-m7-gen1',
  'cecr-b12-nuances-m13-q3',
  'cecr-b21-nuances-m8-q3',
  'cecr-c11-media-discourse-m3-q3',
  'cecr-c12-chengyu-advanced-m3-q3',
  'cecr-c12-education-system-m1-q3',
  'cecr-c22-nuances-m7-dlg1',
  'b11-q9',
  'c12-q9',                          // choix de la particule finale : les options SONT des particules
  'cecr-b11-de-m1-contrast-3',       // 的 / 地 / 得 et l'ordre des mots : exercice de forme
  // Faux positifs du détecteur : le caractère repéré n'a pas ici sa valeur
  // grammaticale — 过 de 不过 ou de 过敏, 不 de 不但 ou de 差不多.
  'cecr-b22-conv-m6-ctx1',
  'cecr-c21-nuances-m3-dlg1',
  // Le trait porte sur le sens même de la réponse attendue : réagir avec
  // modestie, refuser, réfuter — la négation y est inévitable.
  'cecr-b11-conv-m4-dlg1', 'cecr-b11-conv-m4-dlg2',
  'cecr-b22-conv-m2-dlg2', 'cecr-c11-conv-m4-mcq1', 'cecr-c11-conv-m6-dlg1',
  'cecr-c12-conv-m3-ctx2', 'cecr-c12-conv-m6-dlg2', 'cecr-c21-conv-m1-mcq1',
  'cecr-c21-conv-m3-ctx1', 'cecr-c22-conv-m4-mcq1', 'cecr-c22-conv-m4-trans1',
]);

/**
 * Textes où un caractère chinois au milieu du français est voulu : la fiche
 * parle du caractère lui-même, ou nomme une génération (les 90后).
 */
/**
 * Explications qui opposent volontairement le mot enseigné à un voisin non
 * proposé : contraster 晚上 avec 晚安 est utile même si 晚安 n'est pas un choix.
 */
const CONTRASTE_VOULU = new Set<string>([
  'cecr-a2-city-m2-trans-zh2fr',   // 多长时间 contre 多少钱 et 什么时候
  'cecr-a2-day-m1-listen1',        // 晚上 contre 晚安 et 晚饭
  'a2-q14',                        // 一点儿 contre 有点儿
  // Anciens distracteurs devenus des contrastes : ils étaient acceptables
  // comme réponse, on les a retirés des choix et gardés dans l'explication.
  'cecr-b22-debate-m1-gen1',       // 因为 contre 由于
  'cecr-b11-conversation-m7-gen1', // 换工作 contre 跳槽
  'cecr-a2-grammar-m6-gen3',       // 不必 contre 不用
]);

const CHINOIS_VOULU = new Set<string>([
  'dico 偏旁', 'dialogue dlg-a1-classroom#1',
  'dialogue dlg-b12-generations#0', 'dialogue dlg-b12-generations#1',
]);

// ---------------------------------------------------------------------------
// Outils
// ---------------------------------------------------------------------------

const HAN = /[一-鿿]/;
const LATIN = /[A-Za-zÀ-ÿ]/;
const PY_LETTRE = /[A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹê]/;

const sansEspace = (s: string) => (s ?? '').replace(/\s+/g, '').toLowerCase();

/** Un contrôle : son intitulé, ses cas fautifs, et s'il est bloquant. */
interface Controle { nom: string; cas: string[]; bloquant: boolean; total?: number }
const controles: Controle[] = [];
const verifier = (nom: string, cas: string[], bloquant = true, total?: number) =>
  controles.push({ nom, cas, bloquant, total });

// ---------------------------------------------------------------------------
// 1. Dictionnaire : cohérence interne
// ---------------------------------------------------------------------------

type Ex = { hanzi: string; pinyin: string; translation?: string; translationEn?: string };
type Mot = { hanzi: string; pinyin: string; translation?: string; translationEn?: string;
  level?: string; examples?: Ex[] };
const VOCAB = HSK_VOCAB as Mot[];

const DICO = new Map<string, string>();
for (const e of VOCAB) if (e?.hanzi && e.pinyin && !DICO.has(e.hanzi)) DICO.set(e.hanzi, e.pinyin);

{
  const desaccord: string[] = [];
  const corrompu: string[] = [];
  const vide: string[] = [];
  let nEx = 0;

  for (const e of VOCAB) {
    if (!e?.hanzi) { vide.push('entrée sans hanzi'); continue; }
    if (!e.pinyin) vide.push(`${e.hanzi} sans pinyin`);
    if (!e.translation) vide.push(`${e.hanzi} sans traduction`);

    for (const x of e.examples ?? []) {
      nEx++;
      if (!x?.hanzi) { corrompu.push(`${e.hanzi} : exemple sans hanzi`); continue; }
      // Un champ « caractères » qui contient un mot latin a été écrasé — sauf
      // quand le chinois courant l'emprunte tel quel (HSK, VIP, une adresse).
      const SIGLES = /HSK|VIP|GDP|CEO|CT|AI|PPT|WiFi|@|\.com/;
      if (/[A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]{3}/.test(x.hanzi) && !SIGLES.test(x.hanzi))
        corrompu.push(`${e.hanzi} : hanzi contient du latin — ${x.hanzi}`);
      if (!x.pinyin) corrompu.push(`${e.hanzi} : exemple sans pinyin — ${x.hanzi}`);
      // Un caractère CITÉ dans une explication française est légitime ;
      // un caractère laissé au milieu d'une phrase ne l'est pas.
      if (x.translation && HAN.test(x.translation.replace(/[«"“][^»"”]*[»"”]/g, '')))
        corrompu.push(`${e.hanzi} : chinois dans la traduction — ${x.translation}`);

      // Le mot doit se lire dans son exemple comme dans son entrée.
      if (!e.pinyin || e.pinyin.includes('/') || e.hanzi.length < 2) continue;
      if (!x.hanzi.includes(e.hanzi) || !x.pinyin) continue;
      if (!sansEspace(x.pinyin).includes(sansEspace(e.pinyin)))
        desaccord.push(`${e.hanzi} « ${e.pinyin} » lu « ${x.pinyin} » dans ${x.hanzi}`);
    }
  }
  verifier('dictionnaire · mot ≠ son propre exemple', desaccord, true, nEx);
  verifier('dictionnaire · exemple au champ corrompu', corrompu, true, nEx);
  verifier('dictionnaire · champ obligatoire vide', vide, true, VOCAB.length);
}

// ---------------------------------------------------------------------------
// 2. Leçons : accord avec le dictionnaire
// ---------------------------------------------------------------------------

{
  const desaccord: string[] = [];
  const vus = new Set<string>();
  let n = 0;
  for (const secs of Object.values(LEARN_SECTIONS) as any[])
    for (const sec of secs)
      for (const it of sec.items ?? []) {
        if (!it?.hanzi || !it.pinyin) continue;
        n++;
        const d = DICO.get(it.hanzi);
        // Un caractère isolé a souvent plusieurs lectures : hors contexte,
        // aucune source ne peut trancher, on ne compare que les mots.
        if (!d || d.includes('/') || it.hanzi.length < 2) continue;
        if (sansEspace(d) === sansEspace(it.pinyin)) continue;
        const cle = `${it.hanzi} leçon « ${it.pinyin} » · dico « ${d} »`;
        if (!vus.has(cle)) { vus.add(cle); desaccord.push(cle); }
      }
  verifier('leçons · pinyin ≠ dictionnaire', desaccord, true, n);
}

// ---------------------------------------------------------------------------
// 3. Fiches de grammaire
// ---------------------------------------------------------------------------

{
  const sansPinyin: string[] = [];
  const decoupe: string[] = [];
  const maigres: string[] = [];
  const melange: string[] = [];

  for (const s of GRAMMAR_SHEETS) {
    const taille = (['explanation', 'whenToUse', 'howToUse', 'commonMistakes', 'tips'] as const)
      .reduce((a, f) => a + ((s as any)[f] ?? '').length, 0);
    if (taille < 1400) maigres.push(`${s.id} — ${taille} caractères`);
    for (const f of ['explanation', 'whenToUse', 'howToUse', 'commonMistakes', 'tips'] as const) {
      const v = (s as any)[f] as string;
      if (!v) melange.push(`${s.id} · ${f} vide`);
    }
    for (const e of s.examples ?? []) {
      if (!HAN.test(e.hanzi)) continue;
      const py = GRAMMAR_PINYIN[e.hanzi] ?? e.pinyin;
      if (!py) { sansPinyin.push(`${s.id} — ${e.hanzi}`); continue; }
      const nz = (e.hanzi.match(/[一-鿿]/g) ?? []).length;
      const ng = (py.match(new RegExp(`${PY_LETTRE.source}+`, 'g')) ?? []).length;
      if (ng > nz) decoupe.push(`${s.id} — ${e.hanzi} → ${py}`);
      // « il court vite (得 — degré) » : l'étiquette finale nomme le point
      // enseigné, elle n'est pas un résidu de traduction.
      if (HAN.test(e.translationFr.replace(/\([^)]*\)\s*$/, '')))
        melange.push(`${s.id} · chinois dans la traduction — ${e.translationFr}`);
    }
  }
  verifier('grammaire · exemple sans pinyin', sansPinyin);
  verifier('grammaire · pinyin découpé syllabe par syllabe', decoupe);
  verifier('grammaire · fiche trop maigre (< 1 400 caractères)', maigres, false, GRAMMAR_SHEETS.length);
  verifier('grammaire · champ vide ou langues mêlées', melange);
}

// ---------------------------------------------------------------------------
// 4. QCM : exercices, bilans, évaluation, lectures, dialogues
// ---------------------------------------------------------------------------

/**
 * Un distracteur « se trahit » quand la bonne réponse est la seule à porter un
 * trait immédiatement visible : la seule question, la seule négation, la seule
 * qui contienne un chiffre. Le candidat répond alors sans rien comprendre.
 */
const traitsZh: [string, RegExp][] = [
  ['interrogation', /[?？吗呢]/],
  ['négation', /[不没别]/],
  ['accompli', /[了过着]/],
];
const traitsFr: [string, RegExp][] = [
  ['interrogation', /\?\s*$/],
  ['négation', /\b(ne|n'|pas|jamais|aucun|rien)\b/i],
];
function seTrahit(choix: string[], correct: number): string | null {
  if (choix.length < 3) return null;
  // Au-delà d'une trentaine de caractères, un « choix » est une phrase entière
  // ou une paire chinois/traduction : la présence d'un chiffre ou d'une
  // négation n'y est plus un indice, juste du texte.
  if (choix.some(c => (c ?? '').length > 30)) return null;
  // Le trait ne veut dire quelque chose que si tous les choix sont dans la
  // MÊME langue : comparer 八 à « bonjour » n'a pas de sens. Et il faut au
  // moins trois caractères par choix, sinon le trait EST le choix.
  const zh = choix.every(c => HAN.test(c ?? ''));
  const fr = choix.every(c => !HAN.test(c ?? '') && LATIN.test(c ?? ''));
  if (!zh && !fr) return null;
  if (choix.some(c => (c ?? '').replace(/\s/g, '').length < 3)) return null;
  const traits = zh ? traitsZh : traitsFr;
  for (const [nom, re] of traits) {
    const marques = choix.map(c => re.test(c ?? ''));
    if (marques.filter(Boolean).length === 1 && marques[correct]) return nom;
  }
  return null;
}

interface Qcm { source: string; id: string; choix: string[]; correct: number }
const qcms: Qcm[] = [];

for (const [sec, list] of Object.entries(EXERCISES))
  for (const ex of list) {
    // Un exercice de remise en ordre n'est pas un QCM : ses « choix » sont des
    // jetons à réagencer, et 九十九 en répète légitimement un.
    if (ex.type === 'order' || ex.type === 'error-correction' || !ex.choices?.length) continue;
    qcms.push({ source: `exercice ${sec}`, id: ex.id, choix: ex.choices, correct: ex.correctIndex });
  }

for (const b of Object.values(cecrBilans))
  for (const q of b.questions)
    qcms.push({ source: `bilan ${b.level}`, id: q.id, choix: q.choices, correct: q.correctIndex });

// Le test de niveau nomme ses champs `q` et `correct`, pas `prompt`/`correctIndex`.
for (const q of EVAL_QUESTIONS)
  if (q.choices?.length)
    qcms.push({ source: 'évaluation', id: q.q.slice(0, 40), choix: q.choices, correct: q.correct });

for (const l of LECTURES)
  for (const q of l.questions)
    qcms.push({ source: `lecture ${l.id}`, id: q.id, choix: q.choices, correct: q.correctIndex });

for (const d of dialogues)
  (d.dialogue.quiz ?? []).forEach((q, i) =>
    qcms.push({ source: `dialogue ${d.dialogue.id}`, id: `q${i}`, choix: q.choicesFr, correct: q.correct }));

{
  const bornes: string[] = [];
  const doublons: string[] = [];
  const vides: string[] = [];
  const trahis: string[] = [];
  const positions: Record<number, number> = {};

  for (const q of qcms) {
    if (q.correct == null || q.correct < 0 || q.correct >= q.choix.length)
      bornes.push(`${q.source} · ${q.id} — index ${q.correct} pour ${q.choix.length} choix`);
    else positions[q.correct] = (positions[q.correct] ?? 0) + 1;
    if (new Set(q.choix.map(c => (c ?? '').trim())).size !== q.choix.length)
      doublons.push(`${q.source} · ${q.id} — ${q.choix.join(' | ')}`);
    if (q.choix.some(c => !c || !c.trim()))
      vides.push(`${q.source} · ${q.id}`);
    const t = seTrahit(q.choix, q.correct);
    if (t && !RELUS_ET_ACCEPTES.has(q.id)) trahis.push(`${q.source} · ${q.id} — ${t} : ${q.choix.join(' | ')}`);
  }
  verifier('QCM · index de bonne réponse hors bornes', bornes, true, qcms.length);
  verifier('QCM · choix dupliqués', doublons, true, qcms.length);
  verifier('QCM · choix vide', vides, true, qcms.length);
  verifier('QCM · la bonne réponse se trahit', trahis, false, qcms.length);

  // Le défaut le plus courant n'était pas un trait saillant mais des
  // distracteurs bouche-trou : trois formules de politesse recollées au hasard
  // (« 竞争再见。» = « la concurrence au revoir ») à côté de la seule phrase
  // sensée. L'apprenant trouve sans rien comprendre.
  const POLITESSE = ['再见', '不客气', '对不起', '你好', '谢谢', '没关系', '请问', '早上好', '晚安'];
  const bouchetrou: string[] = [];
  for (const q of qcms) {
    const bonne = q.choix[q.correct];
    if (!bonne || q.choix.length < 3) continue;
    const autres = q.choix.filter((_, i) => i !== q.correct);
    if (!q.choix.every(c => HAN.test(c ?? ''))) continue;
    if (autres.every(c => POLITESSE.some(f => c.includes(f))) && !POLITESSE.some(f => bonne.includes(f)))
      bouchetrou.push(`${q.source} · ${q.id} — ${q.choix.join(' | ')}`);
  }
  verifier('QCM · distracteurs bouche-trou (formules recollées)', bouchetrou, true, qcms.length);

  // Variante du même défaut : les distracteurs ne sont pas des formules
  // connues mais de simples bribes de deux ou trois caractères, face à une
  // bonne réponse développée. Le déséquilibre suffit à la désigner.
  const bribes: string[] = [];
  for (const q of qcms) {
    const bonne = q.choix[q.correct];
    if (!bonne || q.choix.length < 3 || !q.choix.every(c => HAN.test(c ?? ''))) continue;
    if (RELUS_ET_ACCEPTES.has(q.id)) continue;
    const autres = q.choix.filter((_, i) => i !== q.correct);
    const plusLong = Math.max(...autres.map(c => (c ?? '').length));
    if (bonne.length >= 2.5 * plusLong && plusLong <= 8 && bonne.length >= 12)
      bribes.push(`${q.source} · ${q.id} — ${q.choix.join(' | ')}`);
  }
  verifier('QCM · distracteurs réduits à des bribes', bribes, true, qcms.length);

  // Un QCM bilingue porte deux tableaux de choix que `correctIndex` indexe
  // tous les deux. S'ils n'ont pas la même longueur, l'app en anglais désigne
  // la mauvaise réponse — et rien ne le signale tant qu'on reste en français.
  const bilingue: string[] = [];
  const paire = (id: string, fr: string[], en?: string[]) => {
    if (!en?.length) return;
    if (en.length !== fr.length) bilingue.push(`${id} — ${fr.length} choix en français, ${en.length} en anglais`);
  };
  for (const list of Object.values(EXERCISES)) for (const ex of list) paire(ex.id, ex.choices ?? [], ex.choicesEn);
  for (const b of Object.values(cecrBilans)) for (const q of b.questions) paire(q.id, q.choices, q.choicesEn);
  for (const q of EVAL_QUESTIONS) paire(q.q.slice(0, 40), q.choices, q.choicesEn);
  for (const d of dialogues) (d.dialogue.quiz ?? []).forEach((q, i) =>
    paire(`${d.dialogue.id}#${i}`, q.choicesFr, q.choicesEn));
  verifier('QCM · version anglaise désalignée', bilingue, true);

  // Une phrase à trous doit avoir autant de trous que la réponse a de
  // morceaux. Dix exercices portaient deux trous pour une réponse corrélative
  // (又…又, 所有…都) que le composant ne savait pas répartir : la fin de la
  // phrase disparaissait à l'écran.
  const trous: string[] = [];
  for (const list of Object.values(EXERCISES)) for (const ex of list) {
    if (ex.type !== 'fill') continue;
    const phrase = (ex as any).sentence as string | undefined;
    if (!phrase) { trous.push(`${ex.id} — texte à trous sans phrase`); continue; }
    const n = (phrase.match(/_{2,}/g) ?? []).length;
    if (n === 0) { trous.push(`${ex.id} — phrase sans trou : ${phrase.slice(0, 40)}`); continue; }
    if (n === 1) continue;
    const bonne = ex.choices?.[ex.correctIndex] ?? '';
    const morceaux = bonne.split(/\s*(?:…|\.{3}|\/)\s*/).filter(Boolean).length;
    if (morceaux !== n)
      trous.push(`${ex.id} — ${n} trous mais la réponse « ${bonne} » en comble ${morceaux}`);
  }
  verifier('textes à trous · trous et réponse discordants', trous, true, undefined);

  // Le désalignement d'ORDRE, lui, ne se voit pas à la longueur : `choicesEn`
  // peut être une permutation de `choices`, et `correctIndex` désigne alors la
  // bonne réponse en français et une autre en anglais. Le cas s'est produit sur
  // 66 questions de lecture et 68 de bilan, où l'anglophone qui répondait juste
  // était compté faux. On ne peut pas juger une traduction automatiquement,
  // mais on peut repérer la signature du défaut : un même libellé français
  // rendu par deux libellés anglais différents ailleurs dans le corpus.
  const traductions = new Map<string, Set<string>>();
  const noterPaire = (fr: string[], en?: string[]) => {
    if (!en || en.length !== fr.length) return;
    for (const [i, f] of fr.entries()) {
      if (!f || HAN.test(f) || f === en[i]) continue;
      (traductions.get(f) ?? traductions.set(f, new Set()).get(f)!).add(en[i]);
    }
  };
  for (const list of Object.values(EXERCISES)) for (const ex of list) noterPaire(ex.choices ?? [], ex.choicesEn);
  for (const b of Object.values(cecrBilans)) for (const q of b.questions) noterPaire(q.choices, q.choicesEn);
  for (const L of LECTURES) for (const q of L.questions) noterPaire(q.choices, (q as any).choicesEn);
  for (const d of dialogues) (d.dialogue.quiz ?? []).forEach(q => noterPaire(q.choicesFr, q.choicesEn));
  const incoherentes = [...traductions.entries()]
    .filter(([f, v]) => v.size > 1 && f.length > 6)
    .map(([f, v]) => `« ${f} » traduit tantôt « ${[...v].join(' », tantôt « ')} »`);
  verifier('traductions · un même libellé rendu de deux façons', incoherentes, false);

  // Une explication qui cite un choix retiré depuis. Le cas s'est produit en
  // remplaçant des distracteurs : « À ne pas confondre avec 要不然 » alors que
  // 要不然 n'était plus proposé nulle part.
  const orphelines: string[] = [];
  const citation = /(?:confondre avec|confused with|contrairement à|unlike|au lieu de|instead of)\s+\*{0,2}([一-鿿]{2,8})/g;
  const citer = (id: string, choix: string[], ...textes: (string | undefined)[]) => {
    if (CONTRASTE_VOULU.has(id)) return;
    for (const t of textes) {
      if (!t) continue;
      for (const m of t.matchAll(citation))
        if (!choix.some(c => (c ?? '').includes(m[1])))
          orphelines.push(`${id} — cite « ${m[1]} », absent des choix`);
    }
  };
  for (const list of Object.values(EXERCISES)) for (const ex of list)
    if (ex.choices?.length) citer(ex.id, ex.choices, ex.explanation, ex.explanationEn);
  for (const b of Object.values(cecrBilans)) for (const q of b.questions)
    citer(q.id, q.choices, q.explanationFr, q.explanationEn);
  verifier('QCM · explication citant un choix disparu', orphelines, false);

  // Accents et ligatures perdus dans les textes français — la faute la plus
  // fréquente quand un texte transite par un outil qui normalise l'unicode.
  // Les frontières de mot de JavaScript ignorent les lettres accentuées :
  // « centimètres » contient « tres » pour \b. D'où les gardes explicites.
  const SANS_ACCENT = new RegExp(
    '(?<![a-zà-ÿ])(?:tres|apres|deja|etre|meme|prefere|eleve|reponse|probleme|francais|' +
    'ecole|bientot|plutot|hopital|theatre|fenetre|necessaire|premiere|derniere|celebre|' +
    'paraitre|disparait|apparait|connait|coeur|soeur|oeuvre|oeil|voeu|noeud)(?![a-zà-ÿ])', 'i');
  const accents: string[] = [];
  const lireFr = (id: string, ...textes: (string | undefined)[]) => {
    for (const t of textes) {
      const m = t?.replace(/[一-鿿]/g, ' ').match(SANS_ACCENT);
      if (m) accents.push(`${id} — « ${m[0]} » : ${t!.slice(0, 60)}`);
    }
  };
  for (const list of Object.values(EXERCISES)) for (const ex of list)
    lireFr(ex.id, ex.prompt, ex.explanation, ...(ex.choices ?? []));
  for (const b of Object.values(cecrBilans)) for (const q of b.questions)
    lireFr(q.id, q.promptFr, q.explanationFr, ...q.choices);
  for (const d of dialogues) for (const [i, l] of d.dialogue.lines.entries())
    lireFr(`${d.dialogue.id}#${i}`, l.translationFr, l.note);
  verifier('français · accent ou ligature perdus', accents, true);

  // Presque tous les QCM ont quatre choix ; les positions 5+ sont trop rares
  // pour qu'un écart y signifie quoi que ce soit.
  const quatre = [0, 1, 2, 3].map(p => positions[p] ?? 0);
  const tot = quatre.reduce((a, b) => a + b, 0);
  const desequilibre = quatre
    .map((n, p) => ({ n, p }))
    .filter(({ n }) => tot > 40 && (n / tot > 0.35 || n / tot < 0.15))
    .map(({ n, p }) => `position ${p} : ${n} fois (${Math.round((n / tot) * 100)} %)`);
  verifier('QCM · positions de bonne réponse déséquilibrées', desequilibre, false, tot);
}

// ---------------------------------------------------------------------------
// 5. Langues mêlées et identifiants
// ---------------------------------------------------------------------------

{
  const melange: string[] = [];
  const majuscules: string[] = [];
  const regarde = (source: string, fr?: string, en?: string) => {
    if (CHINOIS_VOULU.has(source)) return;
    if (fr && HAN.test(fr) && !/[«»"]/.test(fr)) melange.push(`${source} — chinois en français : ${fr.slice(0, 70)}`);
    if (en && HAN.test(en) && !/[«»"]/.test(en)) melange.push(`${source} — chinois en anglais : ${en.slice(0, 70)}`);
    for (const [t, lg] of [[fr, 'fr'], [en, 'en']] as const) {
      if (!t) continue;
      const lettres = [...t].filter(c => LATIN.test(c));
      if (lettres.length > 3 && lettres.every(c => c === c.toUpperCase()))
        majuscules.push(`${source} (${lg}) — ${t.slice(0, 60)}`);
    }
  };
  for (const e of VOCAB) for (const x of e.examples ?? []) regarde(`dico ${e.hanzi}`, x.translation, x.translationEn);
  for (const d of dialogues) for (const [i, l] of d.dialogue.lines.entries())
    regarde(`dialogue ${d.dialogue.id}#${i}`, l.translationFr, l.translationEn);
  for (const p of DICTATION_PHRASES) regarde(`dictée ${p.id}`, p.translationFr, p.translationEn);
  verifier('traductions · langues mêlées', melange, false);
  verifier('traductions · tout en majuscules', majuscules, false);

  const ids = new Map<string, string[]>();
  const noter = (espace: string, id: string) => {
    const k = `${espace}/${id}`;
    ids.set(k, [...(ids.get(k) ?? []), espace]);
  };
  for (const list of Object.values(EXERCISES)) for (const ex of list) noter('exercice', ex.id);
  for (const b of Object.values(cecrBilans)) for (const q of b.questions) noter('bilan', q.id);
  for (const l of LECTURES) noter('lecture', l.id);
  for (const d of dialogues) noter('dialogue', d.dialogue.id);
  for (const s of GRAMMAR_SHEETS) noter('grammaire', s.id);
  for (const s of simulatorScenarios) noter('scénario', (s as any).id);
  const dup = [...ids.entries()].filter(([, v]) => v.length > 1).map(([k, v]) => `${k} × ${v.length}`);
  verifier('identifiants dupliqués', dup);
}

// ---------------------------------------------------------------------------
// 6. Dialogues et lectures : complétude
// ---------------------------------------------------------------------------

{
  const manques: string[] = [];
  for (const d of dialogues) {
    const x = d.dialogue;
    if (!x.quiz?.length) manques.push(`dialogue ${x.id} sans quiz`);
    if (!x.vocab?.length) manques.push(`dialogue ${x.id} sans vocabulaire`);
    if (!x.lines?.length) manques.push(`dialogue ${x.id} sans réplique`);
    for (const [i, l] of x.lines.entries()) {
      if (!l.pinyin) manques.push(`dialogue ${x.id}#${i} sans pinyin`);
      if (!l.translationFr) manques.push(`dialogue ${x.id}#${i} sans traduction`);
      // Un numéro (téléphone, vol) se lit chiffre par chiffre : chaque chiffre
      // vaut une syllabe alors qu'il n'est pas un hanzi.
      const chiffres = (l.hanzi.match(/[0-9]/g) ?? []).length;
      const nz = (l.hanzi.match(/[一-鿿]/g) ?? []).length + chiffres;
      const ng = (l.pinyin?.match(new RegExp(`${PY_LETTRE.source}+`, 'g')) ?? []).length;
      if (nz && ng > nz) manques.push(`dialogue ${x.id}#${i} pinyin découpé — ${l.pinyin.slice(0, 50)}`);
    }
  }
  for (const l of LECTURES) {
    if (!l.questions?.length) manques.push(`lecture ${l.id} sans question`);
    if (!l.text) manques.push(`lecture ${l.id} sans texte`);
    if (!l.translationFr) manques.push(`lecture ${l.id} sans traduction`);
  }
  verifier('dialogues et lectures · élément manquant', manques, true, dialogues.length + LECTURES.length);
}

// ---------------------------------------------------------------------------
// Rapport
// ---------------------------------------------------------------------------

let bloquants = 0;
console.log('\n╭─ Audit du contenu XiaoLearn ─────────────────────────────────────\n');
for (const c of controles) {
  const n = c.cas.length;
  const marque = n === 0 ? '✓' : c.bloquant ? '✗' : '!';
  if (n && c.bloquant) bloquants += n;
  const sur = c.total ? `  (sur ${c.total.toLocaleString('fr-FR')})` : '';
  console.log(`  ${marque} ${c.nom.padEnd(52)} ${String(n).padStart(5)}${sur}`);
  if (details && n) for (const x of c.cas.slice(0, 200)) console.log(`        · ${x}`);
  if (details && n > 200) console.log(`        … et ${n - 200} autres`);
}
console.log(`\n╰─ ${bloquants === 0 ? 'aucune anomalie bloquante' : `${bloquants} anomalies bloquantes`}\n`);
process.exit(bloquants ? 1 : 0);
