/**
 * generate-phrase-audio.mjs
 * -------------------------
 * Génère les MP3 des phrases de dictée via Azure Neural TTS (cohérent avec
 * les autres scripts d'audio : dialogues, readings, learn-sections).
 *
 * Usage :
 *   npm run generate:audio:phrases          # mode normal, dossier phrases/
 *   npm run generate:audio:phrases:slow     # mode shadowing, dossier phrases-slow/
 *
 * Charge automatiquement `.env.local` à la racine du projet pour récupérer
 * AZURE_SPEECH_KEY (pas besoin de --env-file=.env.local).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ── .env.local loader (minimal, pas de dépendance dotenv) ────────────────────
const envLocal = path.join(PROJECT_ROOT, '.env.local');
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

// ── CLI ─────────────────────────────────────────────────────────────────────
// --slow active le mode shadowing : rate -35%, pauses sur ponctuation, sortie
// vers `public/audio/phrases-slow/`. Sans le flag, comportement normal
// (rate -10%, dossier phrases/).
const argv = process.argv.slice(2);
const slowMode = argv.includes('--slow');
const dryRun = argv.includes('--dry-run');
const PROSODY_RATE = slowMode ? '-35%' : '-10%';
const SHADOWING_BREAK_MS = 350;
const PHRASES_FOLDER = slowMode ? 'phrases-slow' : 'phrases';

if (!AZURE_KEY && !dryRun) {
  console.error('✗ AZURE_SPEECH_KEY manquant (ni env ni .env.local).');
  console.error('  Export :   export AZURE_SPEECH_KEY="<ta clé>"');
  console.error('  Ou utilise --dry-run pour prévisualiser sans appeler l\'API.');
  process.exit(1);
}

/**
 * Réécrit le chemin audio d'une phrase pour pointer vers le dossier slow
 * sans toucher au reste de l'arborescence. Préserve `audio/phrases/foo.mp3`
 * en `audio/phrases-slow/foo.mp3`.
 */
function toSlowAudioPath(rel) {
  return rel.replace(/^audio\/phrases\//, 'audio/phrases-slow/');
}

// ── SSML ────────────────────────────────────────────────────────────────────
function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

/**
 * En slow-mode, on insère un <break/> après chaque ponctuation chinoise
 * forte (。，！？；：、) pour créer une pause respiratoire. Sans le mode,
 * on retourne juste le texte échappé.
 */
function buildSsmlBody(text) {
  if (!slowMode) return escapeXml(text);
  const parts = text.split(/([。，！？；：、])/u).filter(Boolean);
  let out = '';
  for (const p of parts) {
    out += escapeXml(p);
    if (/[。，！？；：、]/u.test(p)) out += `<break time="${SHADOWING_BREAK_MS}ms"/>`;
  }
  return out;
}

// Voix Azure Neural féminine zh-CN par défaut (équivalent direct du
// `cmn-CN-Wavenet-A` Google Cloud utilisé précédemment).
const VOICE_NAME = 'zh-CN-XiaoxiaoNeural';

function buildSsml(text) {
  return [
    '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
    `  <voice name="${VOICE_NAME}">`,
    `    <prosody rate="${PROSODY_RATE}">${buildSsmlBody(text)}</prosody>`,
    '  </voice>',
    '</speak>'
  ].join('\n');
}

// ── Azure REST call ─────────────────────────────────────────────────────────
async function synthesize(text) {
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-phrase-audio'
    },
    body: buildSsml(text)
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Azure TTS ${res.status}: ${body.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function synthesizeWithRetry(text, label) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await synthesize(text);
    } catch (err) {
      lastErr = err;
      console.warn(`  ⚠ tentative ${attempt} échec [${label}] : ${err.message.slice(0, 100)}`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 800));
    }
  }
  throw lastErr;
}

// Données des phrases de dictée
const dictationPhrases = [
  // HSK1 Phrases (50)
  { id: 'hsk1-phrase-001', hanzi: '你好', audio: 'audio/phrases/hsk1-phrase-001.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-002', hanzi: '我是学生', audio: 'audio/phrases/hsk1-phrase-002.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-003', hanzi: '你好吗', audio: 'audio/phrases/hsk1-phrase-003.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-004', hanzi: '谢谢你', audio: 'audio/phrases/hsk1-phrase-004.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-005', hanzi: '不客气', audio: 'audio/phrases/hsk1-phrase-005.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-006', hanzi: '再见', audio: 'audio/phrases/hsk1-phrase-006.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-007', hanzi: '今天很好', audio: 'audio/phrases/hsk1-phrase-007.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-008', hanzi: '我叫小明', audio: 'audio/phrases/hsk1-phrase-008.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-009', hanzi: '你叫什么名字', audio: 'audio/phrases/hsk1-phrase-009.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-010', hanzi: '我爱你', audio: 'audio/phrases/hsk1-phrase-010.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-011', hanzi: '这是我的书', audio: 'audio/phrases/hsk1-phrase-011.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-012', hanzi: '那是什么', audio: 'audio/phrases/hsk1-phrase-012.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-013', hanzi: '我想喝水', audio: 'audio/phrases/hsk1-phrase-013.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-014', hanzi: '他是我爸爸', audio: 'audio/phrases/hsk1-phrase-014.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-015', hanzi: '她是我妈妈', audio: 'audio/phrases/hsk1-phrase-015.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-016', hanzi: '我有一个弟弟', audio: 'audio/phrases/hsk1-phrase-016.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-017', hanzi: '几点了', audio: 'audio/phrases/hsk1-phrase-017.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-018', hanzi: '现在三点', audio: 'audio/phrases/hsk1-phrase-018.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-019', hanzi: '我去学校', audio: 'audio/phrases/hsk1-phrase-019.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-020', hanzi: '你在哪儿', audio: 'audio/phrases/hsk1-phrase-020.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-021', hanzi: '我在家', audio: 'audio/phrases/hsk1-phrase-021.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-022', hanzi: '今天星期几', audio: 'audio/phrases/hsk1-phrase-022.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-023', hanzi: '今天星期一', audio: 'audio/phrases/hsk1-phrase-023.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-024', hanzi: '明天见', audio: 'audio/phrases/hsk1-phrase-024.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-025', hanzi: '我很累', audio: 'audio/phrases/hsk1-phrase-025.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-026', hanzi: '他不在', audio: 'audio/phrases/hsk1-phrase-026.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-027', hanzi: '我会说中文', audio: 'audio/phrases/hsk1-phrase-027.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-028', hanzi: '多少钱', audio: 'audio/phrases/hsk1-phrase-028.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-029', hanzi: '五块钱', audio: 'audio/phrases/hsk1-phrase-029.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-030', hanzi: '我想买水', audio: 'audio/phrases/hsk1-phrase-030.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-031', hanzi: '请坐', audio: 'audio/phrases/hsk1-phrase-031.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-032', hanzi: '对不起', audio: 'audio/phrases/hsk1-phrase-032.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-033', hanzi: '没关系', audio: 'audio/phrases/hsk1-phrase-033.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-034', hanzi: '你几岁', audio: 'audio/phrases/hsk1-phrase-034.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-035', hanzi: '我十岁', audio: 'audio/phrases/hsk1-phrase-035.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-036', hanzi: '你吃饭了吗', audio: 'audio/phrases/hsk1-phrase-036.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-037', hanzi: '我吃了', audio: 'audio/phrases/hsk1-phrase-037.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-038', hanzi: '天气很好', audio: 'audio/phrases/hsk1-phrase-038.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-039', hanzi: '今天很热', audio: 'audio/phrases/hsk1-phrase-039.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-040', hanzi: '我喜欢你', audio: 'audio/phrases/hsk1-phrase-040.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-041', hanzi: '这个很大', audio: 'audio/phrases/hsk1-phrase-041.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-042', hanzi: '那个很小', audio: 'audio/phrases/hsk1-phrase-042.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-043', hanzi: '我不知道', audio: 'audio/phrases/hsk1-phrase-043.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-044', hanzi: '我认识他', audio: 'audio/phrases/hsk1-phrase-044.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-045', hanzi: '我们是朋友', audio: 'audio/phrases/hsk1-phrase-045.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-046', hanzi: '他们都很好', audio: 'audio/phrases/hsk1-phrase-046.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-047', hanzi: '我要回家', audio: 'audio/phrases/hsk1-phrase-047.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-048', hanzi: '你来我家', audio: 'audio/phrases/hsk1-phrase-048.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-049', hanzi: '我们一起去', audio: 'audio/phrases/hsk1-phrase-049.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-050', hanzi: '祝你好运', audio: 'audio/phrases/hsk1-phrase-050.mp3', level: 'hsk1' },

  // HSK2 Phrases (50)
  { id: 'hsk2-phrase-001', hanzi: '你在做什么', audio: 'audio/phrases/hsk2-phrase-001.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-002', hanzi: '我正在看书', audio: 'audio/phrases/hsk2-phrase-002.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-003', hanzi: '天气怎么样', audio: 'audio/phrases/hsk2-phrase-003.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-004', hanzi: '我觉得很冷', audio: 'audio/phrases/hsk2-phrase-004.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-005', hanzi: '你喜欢吃什么', audio: 'audio/phrases/hsk2-phrase-005.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-006', hanzi: '我喜欢吃中国菜', audio: 'audio/phrases/hsk2-phrase-006.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-007', hanzi: '请给我一杯咖啡', audio: 'audio/phrases/hsk2-phrase-007.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-008', hanzi: '我已经吃过了', audio: 'audio/phrases/hsk2-phrase-008.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-009', hanzi: '你去过北京吗', audio: 'audio/phrases/hsk2-phrase-009.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-010', hanzi: '我去过很多次', audio: 'audio/phrases/hsk2-phrase-010.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-011', hanzi: '这件衣服太贵了', audio: 'audio/phrases/hsk2-phrase-011.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-012', hanzi: '能便宜一点吗', audio: 'audio/phrases/hsk2-phrase-012.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-013', hanzi: '我需要帮助', audio: 'audio/phrases/hsk2-phrase-013.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-014', hanzi: '你能帮我吗', audio: 'audio/phrases/hsk2-phrase-014.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-015', hanzi: '当然可以', audio: 'audio/phrases/hsk2-phrase-015.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-016', hanzi: '我听不懂', audio: 'audio/phrases/hsk2-phrase-016.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-017', hanzi: '请说慢一点', audio: 'audio/phrases/hsk2-phrase-017.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-018', hanzi: '你的汉语说得很好', audio: 'audio/phrases/hsk2-phrase-018.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-019', hanzi: '我在学习中文', audio: 'audio/phrases/hsk2-phrase-019.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-020', hanzi: '这个问题很难', audio: 'audio/phrases/hsk2-phrase-020.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-021', hanzi: '我们一起努力吧', audio: 'audio/phrases/hsk2-phrase-021.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-022', hanzi: '医院在哪里', audio: 'audio/phrases/hsk2-phrase-022.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-023', hanzi: '一直往前走', audio: 'audio/phrases/hsk2-phrase-023.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-024', hanzi: '你要去哪儿', audio: 'audio/phrases/hsk2-phrase-024.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-025', hanzi: '我想去火车站', audio: 'audio/phrases/hsk2-phrase-025.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-026', hanzi: '坐地铁很方便', audio: 'audio/phrases/hsk2-phrase-026.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-027', hanzi: '今天我很忙', audio: 'audio/phrases/hsk2-phrase-027.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-028', hanzi: '明天我有时间', audio: 'audio/phrases/hsk2-phrase-028.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-029', hanzi: '我们什么时候见面', audio: 'audio/phrases/hsk2-phrase-029.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-030', hanzi: '下午三点怎么样', audio: 'audio/phrases/hsk2-phrase-030.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-031', hanzi: '没问题', audio: 'audio/phrases/hsk2-phrase-031.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-032', hanzi: '我身体不舒服', audio: 'audio/phrases/hsk2-phrase-032.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-033', hanzi: '你应该去看医生', audio: 'audio/phrases/hsk2-phrase-033.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-034', hanzi: '这是你的房间', audio: 'audio/phrases/hsk2-phrase-034.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-035', hanzi: '房间很干净', audio: 'audio/phrases/hsk2-phrase-035.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-036', hanzi: '我想换一个房间', audio: 'audio/phrases/hsk2-phrase-036.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-037', hanzi: '我要一张票', audio: 'audio/phrases/hsk2-phrase-037.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-038', hanzi: '你会游泳吗', audio: 'audio/phrases/hsk2-phrase-038.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-039', hanzi: '我会一点儿', audio: 'audio/phrases/hsk2-phrase-039.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-040', hanzi: '外面下雨了', audio: 'audio/phrases/hsk2-phrase-040.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-041', hanzi: '别忘了带伞', audio: 'audio/phrases/hsk2-phrase-041.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-042', hanzi: '我想休息一下', audio: 'audio/phrases/hsk2-phrase-042.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-043', hanzi: '你在哪个公司工作', audio: 'audio/phrases/hsk2-phrase-043.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-044', hanzi: '我是老师', audio: 'audio/phrases/hsk2-phrase-044.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-045', hanzi: '你的工作怎么样', audio: 'audio/phrases/hsk2-phrase-045.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-046', hanzi: '工作很有意思', audio: 'audio/phrases/hsk2-phrase-046.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-047', hanzi: '我想学做中国菜', audio: 'audio/phrases/hsk2-phrase-047.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-048', hanzi: '我可以教你', audio: 'audio/phrases/hsk2-phrase-048.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-049', hanzi: '周末你有什么打算', audio: 'audio/phrases/hsk2-phrase-049.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-050', hanzi: '我打算去爬山', audio: 'audio/phrases/hsk2-phrase-050.mp3', level: 'hsk2' },

  // HSK3 Phrases (50)
  { id: 'hsk3-phrase-001', hanzi: '你对这个城市的印象怎么样', audio: 'audio/phrases/hsk3-phrase-001.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-002', hanzi: '我觉得这里的环境非常好', audio: 'audio/phrases/hsk3-phrase-002.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-003', hanzi: '虽然工作很累，但是我很开心', audio: 'audio/phrases/hsk3-phrase-003.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-004', hanzi: '如果明天不下雨，我们就去公园', audio: 'audio/phrases/hsk3-phrase-004.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-005', hanzi: '因为太累了，所以我想早点睡觉', audio: 'audio/phrases/hsk3-phrase-005.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-006', hanzi: '我已经习惯了这里的生活', audio: 'audio/phrases/hsk3-phrase-006.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-007', hanzi: '你能不能帮我检查一下这份文件', audio: 'audio/phrases/hsk3-phrase-007.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-008', hanzi: '我希望能找到一份好工作', audio: 'audio/phrases/hsk3-phrase-008.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-009', hanzi: '他的汉语水平提高得很快', audio: 'audio/phrases/hsk3-phrase-009.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-010', hanzi: '我打算明年去中国留学', audio: 'audio/phrases/hsk3-phrase-010.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-011', hanzi: '这本书的内容很有意思', audio: 'audio/phrases/hsk3-phrase-011.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-012', hanzi: '我需要准备一下考试', audio: 'audio/phrases/hsk3-phrase-012.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-013', hanzi: '你应该注意身体健康', audio: 'audio/phrases/hsk3-phrase-013.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-014', hanzi: '这家餐厅的菜味道不错', audio: 'audio/phrases/hsk3-phrase-014.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-015', hanzi: '我对中国文化很感兴趣', audio: 'audio/phrases/hsk3-phrase-015.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-016', hanzi: '昨天我参加了一个聚会', audio: 'audio/phrases/hsk3-phrase-016.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-017', hanzi: '我们应该保护环境', audio: 'audio/phrases/hsk3-phrase-017.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-018', hanzi: '他比我高一点儿', audio: 'audio/phrases/hsk3-phrase-018.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-019', hanzi: '这个城市越来越漂亮了', audio: 'audio/phrases/hsk3-phrase-019.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-020', hanzi: '我把钱包忘在家里了', audio: 'audio/phrases/hsk3-phrase-020.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-021', hanzi: '我们一边吃饭一边聊天', audio: 'audio/phrases/hsk3-phrase-021.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-022', hanzi: '他向我借了一本书', audio: 'audio/phrases/hsk3-phrase-022.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-023', hanzi: '我对这个结果很满意', audio: 'audio/phrases/hsk3-phrase-023.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-024', hanzi: '你最好早点出发', audio: 'audio/phrases/hsk3-phrase-024.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-025', hanzi: '我想了解一下中国历史', audio: 'audio/phrases/hsk3-phrase-025.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-026', hanzi: '除了工作以外，我还喜欢运动', audio: 'audio/phrases/hsk3-phrase-026.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-027', hanzi: '他们正在讨论这个问题', audio: 'audio/phrases/hsk3-phrase-027.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-028', hanzi: '我决定接受这份工作', audio: 'audio/phrases/hsk3-phrase-028.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-029', hanzi: '我们应该互相帮助', audio: 'audio/phrases/hsk3-phrase-029.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-030', hanzi: '这次旅行让我印象深刻', audio: 'audio/phrases/hsk3-phrase-030.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-031', hanzi: '我需要找一个安静的地方学习', audio: 'audio/phrases/hsk3-phrase-031.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-032', hanzi: '他的态度让我很生气', audio: 'audio/phrases/hsk3-phrase-032.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-033', hanzi: '我相信你一定能成功', audio: 'audio/phrases/hsk3-phrase-033.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-034', hanzi: '这个问题需要仔细考虑', audio: 'audio/phrases/hsk3-phrase-034.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-035', hanzi: '我们应该尊重不同的文化', audio: 'audio/phrases/hsk3-phrase-035.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-036', hanzi: '他的表现超出了我的预期', audio: 'audio/phrases/hsk3-phrase-036.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-037', hanzi: '我终于完成了这个项目', audio: 'audio/phrases/hsk3-phrase-037.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-038', hanzi: '为了学好汉语，我每天都练习', audio: 'audio/phrases/hsk3-phrase-038.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-039', hanzi: '他不但聪明而且很努力', audio: 'audio/phrases/hsk3-phrase-039.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-040', hanzi: '我们的意见基本一致', audio: 'audio/phrases/hsk3-phrase-040.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-041', hanzi: '这个方法很有效', audio: 'audio/phrases/hsk3-phrase-041.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-042', hanzi: '我们需要更多的时间来准备', audio: 'audio/phrases/hsk3-phrase-042.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-043', hanzi: '他的话让我很感动', audio: 'audio/phrases/hsk3-phrase-043.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-044', hanzi: '我们应该珍惜现在的生活', audio: 'audio/phrases/hsk3-phrase-044.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-045', hanzi: '这个经验对我很有帮助', audio: 'audio/phrases/hsk3-phrase-045.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-046', hanzi: '无论遇到什么困难，都不要放弃', audio: 'audio/phrases/hsk3-phrase-046.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-047', hanzi: '我打算利用假期去旅游', audio: 'audio/phrases/hsk3-phrase-047.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-048', hanzi: '他的成绩比以前进步了很多', audio: 'audio/phrases/hsk3-phrase-048.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-049', hanzi: '我们应该养成良好的习惯', audio: 'audio/phrases/hsk3-phrase-049.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-050', hanzi: '通过这次经历，我学到了很多', audio: 'audio/phrases/hsk3-phrase-050.mp3', level: 'hsk3' }
];

async function generateAudio(text, outputPath) {
  if (dryRun) {
    console.log(`  · ${outputPath} (dry-run)`);
    return;
  }
  try {
    const mp3 = await synthesizeWithRetry(text, path.basename(outputPath));
    fs.writeFileSync(outputPath, mp3);
    console.log(`✓ Créé: ${outputPath} (${(mp3.length / 1024).toFixed(0)} KiB)`);
  } catch (error) {
    console.error(`✗ Erreur pour ${outputPath}:`, error.message);
  }
}

async function main() {
  console.log('🎵 Génération des fichiers audio pour les phrases de dictée · Azure Neural TTS');
  console.log(`   Mode   : ${slowMode ? '🐢 SHADOWING (slow)' : 'NORMAL'} · rate=${PROSODY_RATE}${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`   Voice  : ${VOICE_NAME} · region=${AZURE_REGION}`);
  console.log(`   Output : public/audio/${PHRASES_FOLDER}/\n`);

  // Créer les dossiers nécessaires
  const audioDir = path.join(process.cwd(), 'public', 'audio', PHRASES_FOLDER);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  let totalGenerated = 0;
  let totalSkipped = 0;

  // Générer l'audio pour chaque phrase
  for (const phrase of dictationPhrases) {
    // En slow-mode, dévie chaque chemin vers `audio/phrases-slow/...`
    const audioRel = slowMode ? toSlowAudioPath(phrase.audio) : phrase.audio;
    const outputPath = path.join(process.cwd(), 'public', audioRel);

    // Vérifier si le fichier existe déjà
    if (fs.existsSync(outputPath)) {
      console.log(`⊘ Existe déjà: ${audioRel}`);
      totalSkipped++;
      continue;
    }

    // Générer l'audio
    await generateAudio(phrase.hanzi, outputPath);
    totalGenerated++;

    // Petit délai pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ Génération terminée!`);
  console.log(`   - ${totalGenerated} fichiers créés`);
  console.log(`   - ${totalSkipped} fichiers déjà existants`);
  console.log(`   - ${dictationPhrases.length} fichiers au total\n`);
}

main().catch(console.error);
