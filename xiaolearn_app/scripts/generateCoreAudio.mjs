import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const apiKey = process.env.GOOGLE_TTS_API_KEY;
const forceMode = process.argv.includes('--force');

if (!apiKey) {
  console.error('✗ GOOGLE_TTS_API_KEY est requis pour appeler l'API Google Text-to-Speech.');
  process.exit(1);
}

const voice = {
  languageCode: 'cmn-CN',
  name: 'cmn-CN-Wavenet-A',
  ssmlGender: 'FEMALE'
};

const audioConfig = {
  audioEncoding: 'MP3',
  speakingRate: 0.9,
  pitch: 0,
  volumeGainDb: 0
};

const bopomofo = (symbols, display) =>
  `<speak><phoneme alphabet="bopomofo" ph="${symbols}">${display}</phoneme></speak>`;

const trainingInitials = [
  { ssml: bopomofo('ㄅㄛ', 'bo'), description: 'Syllabe bo (b + o, ton 1)', output: 'audio/pinyin/bo.mp3' },
  { ssml: bopomofo('ㄆㄛ', 'po'), description: 'Syllabe po (p + o, ton 1)', output: 'audio/pinyin/po.mp3' },
  { ssml: bopomofo('ㄇㄛ', 'mo'), description: 'Syllabe mo (m + o, ton 1)', output: 'audio/pinyin/mo.mp3' },
  { ssml: bopomofo('ㄈㄛ', 'fo'), description: 'Syllabe fo (f + o, ton 1)', output: 'audio/pinyin/fo.mp3' },
  { ssml: bopomofo('ㄉㄜ', 'de'), description: 'Syllabe de (d + e, ton 1)', output: 'audio/pinyin/de.mp3' },
  { ssml: bopomofo('ㄊㄜ', 'te'), description: 'Syllabe te (t + e, ton 1)', output: 'audio/pinyin/te.mp3' },
  { ssml: bopomofo('ㄋㄜ', 'ne'), description: 'Syllabe ne (n + e, ton 1)', output: 'audio/pinyin/ne.mp3' },
  { ssml: bopomofo('ㄌㄜ', 'le'), description: 'Syllabe le (l + e, ton 1)', output: 'audio/pinyin/le.mp3' },
  { ssml: bopomofo('ㄍㄜ', 'ge'), description: 'Syllabe ge (g + e, ton 1)', output: 'audio/pinyin/ge.mp3' },
  { ssml: bopomofo('ㄎㄜ', 'ke'), description: 'Syllabe ke (k + e, ton 1)', output: 'audio/pinyin/ke.mp3' },
  { ssml: bopomofo('ㄏㄜ', 'he'), description: 'Syllabe he (h + e, ton 1)', output: 'audio/pinyin/he.mp3' },
  { ssml: bopomofo('ㄗㄜ', 'ze'), description: 'Syllabe ze (z + e, ton 1)', output: 'audio/pinyin/ze.mp3' },
  { ssml: bopomofo('ㄘㄜ', 'ce'), description: 'Syllabe ce (c + e, ton 1)', output: 'audio/pinyin/ce.mp3' },
  { ssml: bopomofo('ㄙㄜ', 'se'), description: 'Syllabe se (s + e, ton 1)', output: 'audio/pinyin/se.mp3' },
  { ssml: bopomofo('ㄓㄜ', 'zhe'), description: 'Syllabe zhe (zh + e, ton 1)', output: 'audio/pinyin/zhe.mp3' },
  { ssml: bopomofo('ㄔㄜ', 'che'), description: 'Syllabe che (ch + e, ton 1)', output: 'audio/pinyin/che.mp3' },
  { ssml: bopomofo('ㄕㄜ', 'she'), description: 'Syllabe she (sh + e, ton 1)', output: 'audio/pinyin/she.mp3' },
  { ssml: bopomofo('ㄖㄜ', 're'), description: 'Syllabe re (r + e, ton 1)', output: 'audio/pinyin/re.mp3' },
  { ssml: bopomofo('ㄐㄧ', 'ji'), description: 'Syllabe ji (j + i, ton 1)', output: 'audio/pinyin/ji.mp3' },
  { ssml: bopomofo('ㄑㄧ', 'qi'), description: 'Syllabe qi (q + i, ton 1)', output: 'audio/pinyin/qi.mp3' },
  { ssml: bopomofo('ㄒㄧ', 'xi'), description: 'Syllabe xi (x + i, ton 1)', output: 'audio/pinyin/xi.mp3' }
];

const pinyinFinals = [
  { text: '啊', description: 'a', output: 'audio/pinyin/a.mp3' },
  { text: '哦', description: 'o', output: 'audio/pinyin/o.mp3' },
  { text: '鹅', description: 'e', output: 'audio/pinyin/e.mp3' },
  { text: '一', description: 'i', output: 'audio/pinyin/i.mp3' },
  { text: '乌', description: 'u', output: 'audio/pinyin/u.mp3' },
  { text: '鱼', description: 'ü', output: 'audio/pinyin/ü.mp3' }
];

const toneExamples = [
  { text: '妈', description: 'Tone 1 (mā)', output: 'audio/pinyin/tone1.mp3' },
  { text: '麻', description: 'Tone 2 (má)', output: 'audio/pinyin/tone2.mp3' },
  { text: '马', description: 'Tone 3 (mǎ)', output: 'audio/pinyin/tone3.mp3' },
  { text: '骂', description: 'Tone 4 (mà)', output: 'audio/pinyin/tone4.mp3' }
];

const complexInitials = [
  { text: '知', description: 'zh (zhī)', output: 'audio/pinyin/zh.mp3' },
  { text: '吃', description: 'ch (chī)', output: 'audio/pinyin/ch.mp3' },
  { text: '师', description: 'sh (shī)', output: 'audio/pinyin/sh.mp3' },
  { text: '日', description: 'r (rì)', output: 'audio/pinyin/r.mp3' },
  { text: '资', description: 'z (zī)', output: 'audio/pinyin/z.mp3' },
  { text: '次', description: 'c (cì)', output: 'audio/pinyin/c.mp3' },
  { text: '思', description: 's (sī)', output: 'audio/pinyin/s.mp3' }
];

const grammarEntries = [
  { text: '我学习', description: 'Structure Sujet + Verbe', output: 'audio/grammar/subject-verb.mp3' },
  { text: '天气很好', description: 'Structure 很 + adjectif', output: 'audio/grammar/adjectives.mp3' },
  { text: '三本书', description: 'Spécificatifs', output: 'audio/grammar/measure-words.mp3' },
  { text: '我今天学习', description: 'Expressions temporelles', output: 'audio/grammar/time-expressions.mp3' },
  { text: '我正在学习', description: 'Aspect progressif', output: 'audio/grammar/progressive.mp3' },
  { text: '我学了两年中文', description: 'Durée', output: 'audio/grammar/duration.mp3' },
  { text: '我吃完了', description: 'Compléments de résultat', output: 'audio/grammar/resultative.mp3' },
  { text: '虽然很累但是我很开心', description: 'Conjonctions complexes', output: 'audio/grammar/complex-conjunctions.mp3' }
];

const tasks = [
  { label: 'Syllabes d'entraînement', entries: trainingInitials },
  { label: 'Voyelles finales', entries: pinyinFinals },
  { label: 'Tons du mandarin', entries: toneExamples },
  { label: 'Combinaisons complexes', entries: complexInitials },
  { label: 'Points de grammaire', entries: grammarEntries }
];

async function synthesize(entry, entryLabel) {
  const input = entry.ssml ? { ssml: entry.ssml } : { text: entry.text };
  const body = {
    input,
    voice,
    audioConfig
  };

  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur API pour "${entryLabel}" (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  if (!result.audioContent) {
    throw new Error(`Réponse sans audio pour "${entryLabel}"`);
  }

  return Buffer.from(result.audioContent, 'base64');
}

async function ensureDirectory(filePath) {
  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateEntry(entry) {
  const targetPath = path.join(publicDir, entry.output);
  if (!forceMode && fs.existsSync(targetPath)) {
    console.log(`• Déjà présent, ignoré : ${entry.output}`);
    return;
  }

  const buffer = await synthesize(entry, entry.description);
  await ensureDirectory(targetPath);
  await fs.promises.writeFile(targetPath, buffer);
  console.log(`✓ Généré : ${entry.output} (${entry.description})`);
}

async function main() {
  console.log('🎙️  Génération des audios Pinyin & Grammaire via Google Cloud TTS');
  for (const group of tasks) {
    console.log(`\n== ${group.label} ==`);
    for (const entry of group.entries) {
      try {
        await generateEntry(entry);
      } catch (error) {
        console.error(`✗ Échec pour ${entry.output}:`, error.message);
      }
    }
  }
  console.log('\nTerminé.');
}

main().catch((error) => {
  console.error('Erreur inattendue:', error);
  process.exit(1);
});
