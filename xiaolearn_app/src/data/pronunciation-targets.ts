/**
 * pronunciation-targets.ts — Phase 4 IA.
 *
 * Catalogue de phrases-cibles pour la page Coach prononciation, groupées
 * par niveau et difficulté tonale. V1 : ~30 cibles couvrant les grandes
 * difficultés tonales du chinois mandarin pour francophones.
 *
 * Critères de sélection :
 *  - Phrases COURTES (1-8 syllabes) — Gemini est plus précis sur du court
 *  - Cibles avec des contrastes tonaux fréquents (ex: 妈/麻/马/骂)
 *  - Pinyin écrit avec diacritiques pour clarté
 */

export type PronunciationLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface PronunciationTarget {
  id: string;
  level: PronunciationLevel;
  hanzi: string;
  pinyin: string;
  /** Traduction française. */
  translation: string;
  /** Catégorie tonale travaillée. */
  focus: string;
}

export const PRONUNCIATION_TARGETS: PronunciationTarget[] = [
  // ============================================================
  // A1 — Tons isolés, syllabes simples
  // ============================================================
  { id: 'a1-1', level: 'A1', hanzi: '你好', pinyin: 'nǐ hǎo', translation: 'Bonjour', focus: 'Ton 3 + ton 3' },
  { id: 'a1-2', level: 'A1', hanzi: '谢谢', pinyin: 'xiè xie', translation: 'Merci', focus: 'Ton 4 + neutre' },
  { id: 'a1-3', level: 'A1', hanzi: '再见', pinyin: 'zài jiàn', translation: 'Au revoir', focus: 'Ton 4 + ton 4' },
  { id: 'a1-4', level: 'A1', hanzi: '我', pinyin: 'wǒ', translation: 'Je / moi', focus: 'Ton 3 isolé' },
  { id: 'a1-5', level: 'A1', hanzi: '不是', pinyin: 'bú shì', translation: 'Non / ne pas être', focus: 'Sandhi 不 → ton 2 devant ton 4' },
  { id: 'a1-6', level: 'A1', hanzi: '一二三', pinyin: 'yī èr sān', translation: 'Un deux trois', focus: 'Ton 1, ton 4, ton 1' },
  { id: 'a1-7', level: 'A1', hanzi: '中国人', pinyin: 'Zhōng guó rén', translation: 'Chinois (personne)', focus: 'Ton 1 + ton 2 + ton 2' },
  { id: 'a1-8', level: 'A1', hanzi: '老师', pinyin: 'lǎo shī', translation: 'Professeur', focus: 'Ton 3 + ton 1' },

  // ============================================================
  // A2 — Phrases courtes, sandhi tonal
  // ============================================================
  { id: 'a2-1', level: 'A2', hanzi: '我喜欢中文', pinyin: 'wǒ xǐ huān Zhōng wén', translation: 'J\'aime le chinois', focus: 'Sandhi 3+3 → 2+3 sur 我喜' },
  { id: 'a2-2', level: 'A2', hanzi: '今天天气很好', pinyin: 'jīn tiān tiān qì hěn hǎo', translation: 'Il fait beau aujourd\'hui', focus: 'Tons 1 + sandhi 3+3' },
  { id: 'a2-3', level: 'A2', hanzi: '请问，你叫什么名字？', pinyin: 'qǐng wèn, nǐ jiào shén me míng zi?', translation: 'Excusez-moi, comment vous appelez-vous ?', focus: 'Politesse + intonation interrogative' },
  { id: 'a2-4', level: 'A2', hanzi: '我们一起去吧', pinyin: 'wǒ men yī qǐ qù ba', translation: 'Allons-y ensemble', focus: 'Sandhi de 一' },
  { id: 'a2-5', level: 'A2', hanzi: '吃饭了吗？', pinyin: 'chī fàn le ma?', translation: 'Vous avez mangé ?', focus: 'Particule 了 + question' },
  { id: 'a2-6', level: 'A2', hanzi: '多少钱？', pinyin: 'duō shǎo qián?', translation: 'Combien ça coûte ?', focus: 'Ton 1 + ton 3 + ton 2' },

  // ============================================================
  // B1 — Phrases plus longues, contrastes
  // ============================================================
  { id: 'b1-1', level: 'B1', hanzi: '我以为你不会来', pinyin: 'wǒ yǐ wéi nǐ bú huì lái', translation: 'Je pensais que tu ne viendrais pas', focus: '以为 (croire à tort)' },
  { id: 'b1-2', level: 'B1', hanzi: '昨天我去了北京', pinyin: 'zuó tiān wǒ qù le Běi jīng', translation: 'Hier je suis allé à Pékin', focus: 'Particule 了 d\'aspect' },
  { id: 'b1-3', level: 'B1', hanzi: '虽然下雨，但是我还是去', pinyin: 'suī rán xià yǔ, dàn shì wǒ hái shì qù', translation: 'Bien qu\'il pleuve, j\'y vais quand même', focus: 'Concession 虽然...但是' },
  { id: 'b1-4', level: 'B1', hanzi: '请帮我一个忙', pinyin: 'qǐng bāng wǒ yí ge máng', translation: 'Rends-moi un service s\'il te plaît', focus: 'Verbe séparable 帮忙' },
  { id: 'b1-5', level: 'B1', hanzi: '这个问题很难回答', pinyin: 'zhè ge wèn tí hěn nán huí dá', translation: 'Cette question est difficile à répondre', focus: 'Adjectif + verbe' },

  // ============================================================
  // B2 — Phrases pro / nuancées
  // ============================================================
  { id: 'b2-1', level: 'B2', hanzi: '我们达成协议了', pinyin: 'wǒ men dá chéng xié yì le', translation: 'Nous avons trouvé un accord', focus: 'Vocabulaire pro' },
  { id: 'b2-2', level: 'B2', hanzi: '请稍等一下', pinyin: 'qǐng shāo děng yí xià', translation: 'Veuillez patienter un instant', focus: 'Politesse pro' },
  { id: 'b2-3', level: 'B2', hanzi: '我对这个想法非常感兴趣', pinyin: 'wǒ duì zhè ge xiǎng fǎ fēi cháng gǎn xìng qù', translation: 'Cette idée m\'intéresse beaucoup', focus: 'Phrase longue + structures' },
  { id: 'b2-4', level: 'B2', hanzi: '不好意思，您能再说一遍吗？', pinyin: 'bù hǎo yì si, nín néng zài shuō yí biàn ma?', translation: 'Pardon, pouvez-vous répéter ?', focus: '您 formel + 再...一遍' }
];

/** Groupe les cibles par niveau pour l'affichage. */
export function groupTargetsByLevel(): Array<{
  level: PronunciationLevel;
  targets: PronunciationTarget[];
}> {
  const order: PronunciationLevel[] = ['A1', 'A2', 'B1', 'B2'];
  return order.map((lvl) => ({
    level: lvl,
    targets: PRONUNCIATION_TARGETS.filter((t) => t.level === lvl)
  }));
}
