import { useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { DialogueLine, LessonExercise, LessonExerciseDialogue, LessonItem } from '../types';
import type { LessonCategory, LessonModule, LessonPhase } from '../types/lesson-structure';
import { getLessonByHanzi, getLessonsByHanziList } from '../data/lessons';
import { getGrammarLessonById } from '../data/grammar-lessons';
import { getSimpleLessonById } from '../data/simple-lessons';
import { lessonExercises } from '../data/lesson-exercises';
import { level1LessonWordBank } from '../data/level1-course';
import { findExampleAudio } from '../utils/exampleAudio';
import AudioButton from '../components/AudioButton';
import GrammarQuizComponent from '../components/quiz/GrammarQuizComponent';
import GrammarExplanationCard from '../components/GrammarExplanationCard';
import WritingExercise from '../components/exercises/WritingExercise';
import DialogueExercise from '../components/exercises/DialogueExercise';
import ReadingExercise from '../components/exercises/ReadingExercise';
import SpeakingExercise from '../components/exercises/SpeakingExercise';
import DictationExercise from '../components/exercises/DictationExercise';
import { parseMarkdown } from '../utils/markdownUtils';

interface StructuredLessonPageProps {
  lesson: LessonModule;
  language: Language;
  onComplete: (payload: { learnedWordIds: string[]; duration: number }) => void;
  onExit: () => void;
}

interface LessonExerciseSectionProps {
  exercise: LessonExercise;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

interface QuizEntry {
  word: LessonItem;
  options: string[];
}

interface LessonExplanationStep {
  id: string;
  title: string;
  content: string;
  bullets: string[];
}

const CATEGORY_ICON: Record<LessonCategory, string> = {
  pronunciation: '🔤',
  grammar: '📘',
  conversation: '💬',
  vocabulary: '🧠',
  culture: '🏮',
  writing: '✍️',
  reading: '📖'
};

const normalizeLessonRichText = (text: string) =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .trim();

const buildQuizOptions = (word: LessonItem | undefined, words: LessonItem[], language: Language) => {
  if (!word) return [];
  const correctAnswer = language === 'fr' ? word.translationFr : word.translation;
  const wrongAnswers = words
    .filter((entry) => entry.id !== word.id)
    .map((entry) => (language === 'fr' ? entry.translationFr : entry.translation));
  const uniqueWrong = Array.from(new Set(wrongAnswers)).slice(0, 3);
  const allOptions = [correctAnswer, ...uniqueWrong];

  for (let i = allOptions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  return allOptions;
};

type DialogueSeedLine = Omit<DialogueLine, 'speaker' | 'speakerName'>;

const normalizeDialogueText = (value: string) => value.replace(/[，。！？!?\s]/g, '');
const stripDialoguePunctuation = (value: string) => value.replace(/[，。！？!?]/g, '');
const dialogueTopicStopChars = new Set(
  Array.from('我你他她它们的是了吗呢吧啊呀很就都也在有不没要想会能可请把给跟和对这那一个')
);

const isQuestionLine = (value: string) => /[？?]|吗|怎么|什么|多少|哪儿|哪里|什么时候/.test(value);

const resolveDialogueAudio = (text: string): string | undefined => {
  const baseText = stripDialoguePunctuation(text).trim();
  const candidates = Array.from(new Set([text.trim(), baseText])).filter(Boolean);

  for (const candidate of candidates) {
    const exampleAudio = findExampleAudio(candidate);
    if (exampleAudio) return exampleAudio;

    const lessonAudio = getLessonByHanzi(candidate)?.audio;
    if (lessonAudio) return lessonAudio;
  }

  const chars = Array.from(baseText).filter((char) => /[\u3400-\u9fff]/.test(char));
  for (const char of chars) {
    const charAudio = getLessonByHanzi(char)?.audio;
    if (charAudio) return charAudio;
  }

  return undefined;
};

const extractTopicChars = (value: string): Set<string> => {
  const normalized = stripDialoguePunctuation(value).replace(/\s/g, '');
  const topicChars = new Set<string>();
  for (const char of Array.from(normalized)) {
    if (!/[\u3400-\u9fff]/.test(char)) continue;
    if (dialogueTopicStopChars.has(char)) continue;
    topicChars.add(char);
  }
  return topicChars;
};

const hasSharedTopic = (a: string, b: string) => {
  const aTopics = extractTopicChars(a);
  const bTopics = extractTopicChars(b);
  if (aTopics.size === 0 || bTopics.size === 0) return false;
  for (const char of aTopics) {
    if (bTopics.has(char)) return true;
  }
  return false;
};

const generatedLine = (
  text: string,
  pinyin: string,
  translationFr: string,
  translationEn: string
): DialogueSeedLine => {
  const audio = resolveDialogueAudio(text);
  return {
    text,
    pinyin,
    translationFr,
    translationEn,
    ...(audio ? { audio } : {})
  };
};

const collectSourceDialogueLines = (words: LessonItem[]): DialogueSeedLine[] => {
  const unique = new Map<string, DialogueSeedLine>();

  for (const word of words) {
    const example = word.examples.find((entry) => Boolean(entry.hanzi));
    const line: DialogueSeedLine = {
      text: example?.hanzi || word.hanzi,
      pinyin: example?.pinyin || word.pinyin || undefined,
      translationFr: example?.translationFr || example?.translation || word.translationFr || undefined,
      translationEn: example?.translation || word.translation || undefined,
      audio: example?.audio || word.audio
    };

    if (!line.text) continue;
    const key = normalizeDialogueText(line.text);
    if (!unique.has(key)) unique.set(key, line);
  }

  return Array.from(unique.values());
};

const buildGeneratedReply = (line: DialogueSeedLine): DialogueSeedLine => {
  const text = line.text;

  if (text.includes('你呢')) {
    return generatedLine('我也很好，谢谢。', 'wǒ yě hěn hǎo, xièxie.', 'Moi aussi, je vais bien, merci.', 'I am fine too, thanks.');
  }
  if (text.includes('多少钱')) {
    return generatedLine('十块钱。', 'shí kuài qián.', 'Dix yuans.', 'Ten yuan.');
  }
  if (text.includes('便宜')) {
    return generatedLine('可以，九块钱。', 'kěyǐ, jiǔ kuài qián.', 'D’accord, 9 yuans.', 'Okay, 9 yuan.');
  }
  if (text.includes('在哪里') || text.includes('哪儿')) {
    return generatedLine('在前面，不远。', 'zài qiánmiàn, bù yuǎn.', 'C’est devant, pas loin.', 'It is ahead, not far.');
  }
  if (text.includes('做什么')) {
    return generatedLine('我正在看书。', 'wǒ zhèngzài kàn shū.', 'Je suis en train de lire.', 'I am reading.');
  }
  if (text.includes('什么时候')) {
    return generatedLine('下午三点吧。', 'xiàwǔ sān diǎn ba.', 'Vers 15 heures.', 'Around 3 PM.');
  }
  if (text.includes('天气')) {
    return generatedLine('今天有点冷。', 'jīntiān yǒudiǎn lěng.', 'Aujourd’hui il fait un peu froid.', 'It is a bit cold today.');
  }
  if (text.includes('你能帮我吗')) {
    return generatedLine('当然可以。', 'dāngrán kěyǐ.', 'Bien sûr.', 'Of course.');
  }
  if (text.includes('周末') && text.includes('打算')) {
    return generatedLine('我打算去爬山。', 'wǒ dǎsuàn qù páshān.', 'Je prévois d’aller randonner.', 'I plan to go hiking.');
  }
  if (text.includes('我身体不舒服')) {
    return generatedLine('你应该去看医生。', 'nǐ yīnggāi qù kàn yīshēng.', 'Tu devrais consulter un médecin.', 'You should see a doctor.');
  }
  if (text.includes('我想换一个房间')) {
    return generatedLine('好的，我来帮你。', 'hǎo de, wǒ lái bāng nǐ.', 'D’accord, je vais t’aider.', 'Okay, I will help you.');
  }
  if (text.includes('我想买') || text.includes('我要')) {
    return generatedLine('好的，一共十块钱。', 'hǎo de, yígòng shí kuài qián.', 'D’accord, ça fait 10 yuans.', 'Okay, that will be 10 yuan.');
  }

  return generatedLine('好的。', 'hǎo de.', 'D’accord.', 'Okay.');
};

const buildGeneratedResponseToStatement = (line: DialogueSeedLine): DialogueSeedLine => {
  const text = line.text;

  if (text.includes('你好') || text.includes('您好')) {
    return generatedLine('你好！', 'nǐ hǎo!', 'Bonjour !', 'Hello!');
  }
  if (text.includes('谢谢')) {
    return generatedLine('不客气。', 'bú kèqi.', 'De rien.', 'You are welcome.');
  }
  if (text.includes('对不起')) {
    return generatedLine('没关系。', 'méi guānxi.', 'Ce n’est pas grave.', 'It is okay.');
  }
  if (text.includes('再见') || text.includes('明天见')) {
    return generatedLine('再见！', 'zàijiàn!', 'Au revoir !', 'Goodbye!');
  }
  if (text.includes('我叫') || text.includes('我是')) {
    return generatedLine('很高兴认识你。', 'hěn gāoxìng rènshi nǐ.', 'Ravi de te rencontrer.', 'Nice to meet you.');
  }
  if (text.includes('我想') || text.includes('我要')) {
    return generatedLine('好的。', 'hǎo de.', 'D’accord.', 'Okay.');
  }

  return generatedLine('我明白了。', 'wǒ míngbai le.', 'Je vois.', 'I see.');
};

const buildGeneratedFollowUpAnswer = (contextLine: DialogueSeedLine): DialogueSeedLine => {
  const text = contextLine.text;

  if (text.includes('好') || text.includes('吗')) {
    return generatedLine('我也很好，谢谢。', 'wǒ yě hěn hǎo, xièxie.', 'Moi aussi, je vais bien, merci.', 'I am fine too, thanks.');
  }
  if (text.includes('哪里') || text.includes('哪儿')) {
    return generatedLine('我去学校。', 'wǒ qù xuéxiào.', 'Je vais à l’école.', 'I am going to school.');
  }
  if (text.includes('什么时候') || text.includes('几点')) {
    return generatedLine('我明天下午去。', 'wǒ míngtiān xiàwǔ qù.', 'J’y vais demain après-midi.', 'I will go tomorrow afternoon.');
  }
  if (text.includes('做什么')) {
    return generatedLine('我在学习中文。', 'wǒ zài xuéxí Zhōngwén.', 'J’étudie le chinois.', 'I am studying Chinese.');
  }

  return generatedLine('我也这么觉得。', 'wǒ yě zhème juéde.', 'Je pense pareil.', 'I think so too.');
};

const isCompatibleReply = (question: DialogueSeedLine, statement: DialogueSeedLine): boolean => {
  if (isQuestionLine(statement.text)) return false;

  const questionText = question.text;
  const statementText = statement.text;

  if (questionText.includes('吗')) {
    if (/(是|不|没|很|可以|能|当然|对)/.test(statementText)) return true;
  }
  if (questionText.includes('谁')) {
    if (/(我|他|她|老师|朋友|妈妈|爸爸)/.test(statementText)) return true;
  }
  if (/(哪里|哪儿|在哪)/.test(questionText)) {
    if (/(在|这里|那里|前面|后面|旁边)/.test(statementText)) return true;
  }
  if (/(什么时候|几点|哪天|几号)/.test(questionText)) {
    if (/(今天|明天|下午|上午|晚上|点|月|号)/.test(statementText)) return true;
  }
  if (/(多少|几)/.test(questionText)) {
    if (/[一二三四五六七八九十两0-9]/.test(statementText)) return true;
  }
  if (/(什么|做什么|怎么样|怎么)/.test(questionText)) {
    if (/(是|我|很好|不错|可以|在|去|做|看|吃|喝|学习|工作)/.test(statementText)) return true;
  }

  return hasSharedTopic(questionText, statementText);
};

const takeMatchingReply = (
  question: DialogueSeedLine,
  statementsPool: DialogueSeedLine[]
): DialogueSeedLine | null => {
  const matchedIndex = statementsPool.findIndex((candidate) => isCompatibleReply(question, candidate));
  if (matchedIndex === -1) return null;
  const [matched] = statementsPool.splice(matchedIndex, 1);
  return matched ?? null;
};

const buildTemplateDialogueLines = (lessonId: string, sourceLines: DialogueSeedLine[]): DialogueSeedLine[] | null => {
  const pick = (...candidates: string[]) => {
    for (const candidate of candidates) {
      const normalizedCandidate = normalizeDialogueText(candidate);
      const found = sourceLines.find((line) => normalizeDialogueText(line.text) === normalizedCandidate);
      if (found) return found;
    }
    return null;
  };

  const lineOrFallback = (candidates: string[], fallback: DialogueSeedLine) => pick(...candidates) ?? fallback;

  if (lessonId === 'phrases-1-greetings') {
    return [
      lineOrFallback(['你好吗？'], generatedLine('你好吗？', 'nǐ hǎo ma?', 'Comment vas-tu ?', 'How are you?')),
      generatedLine('很好，你呢？', 'hěn hǎo, nǐ ne?', 'Très bien, et toi ?', 'Very well, and you?'),
      lineOrFallback(['早上好！'], generatedLine('早上好！', 'zǎoshang hǎo!', 'Bonjour !', 'Good morning!')),
      generatedLine('早上好！', 'zǎoshang hǎo!', 'Bonjour !', 'Good morning!')
    ];
  }

  if (lessonId === 'phrases-2-introductions') {
    return [
      lineOrFallback(['你叫什么名字？'], generatedLine('你叫什么名字？', 'nǐ jiào shénme míngzi?', 'Comment tu t’appelles ?', 'What is your name?')),
      lineOrFallback(['我叫李华。'], generatedLine('我叫李华。', 'wǒ jiào Lǐ Huá.', 'Je m’appelle Lihua.', 'My name is Lihua.')),
      lineOrFallback(['我是法国人。'], generatedLine('我是法国人。', 'wǒ shì Fǎguó rén.', 'Je suis français.', 'I am French.')),
      lineOrFallback(['很高兴认识你。'], generatedLine('很高兴认识你。', 'hěn gāoxìng rènshi nǐ.', 'Ravi de te rencontrer.', 'Nice to meet you.'))
    ];
  }

  if (lessonId === 'phrases-3-politeness') {
    return [
      lineOrFallback(['谢谢。', '谢谢你。'], generatedLine('谢谢你。', 'xièxie nǐ.', 'Merci.', 'Thank you.')),
      lineOrFallback(['不客气。'], generatedLine('不客气。', 'bú kèqi.', 'De rien.', 'You are welcome.')),
      lineOrFallback(['对不起。'], generatedLine('对不起，我来晚了。', 'duìbuqǐ, wǒ lái wǎn le.', 'Désolé, je suis en retard.', 'Sorry, I am late.')),
      lineOrFallback(['没关系。'], generatedLine('没关系。', 'méi guānxi.', 'Ce n’est pas grave.', 'It is okay.'))
    ];
  }

  if (lessonId === 'phrases-4-questions') {
    return [
      lineOrFallback(['洗手间在哪里？'], generatedLine('洗手间在哪里？', 'xǐshǒujiān zài nǎlǐ?', 'Où sont les toilettes ?', 'Where is the restroom?')),
      generatedLine('在那边。', 'zài nàbiān.', 'C’est là-bas.', 'It is over there.'),
      lineOrFallback(['你什么时候回家？'], generatedLine('你什么时候回家？', 'nǐ shénme shíhou huí jiā?', 'Tu rentres quand à la maison ?', 'When do you go home?')),
      generatedLine('我晚上八点回家。', 'wǒ wǎnshang bā diǎn huí jiā.', 'Je rentre à 20h.', 'I go home at 8 PM.')
    ];
  }

  if (lessonId === 'phrases-5-yes-no') {
    return [
      lineOrFallback(['你是老师吗？'], generatedLine('你是老师吗？', 'nǐ shì lǎoshī ma?', 'Es-tu professeur ?', 'Are you a teacher?')),
      generatedLine('不是，我是学生。', 'bú shì, wǒ shì xuésheng.', 'Non, je suis étudiant.', 'No, I am a student.'),
      lineOrFallback(['你会说汉语吗？'], generatedLine('你会说汉语吗？', 'nǐ huì shuō Hànyǔ ma?', 'Tu sais parler chinois ?', 'Can you speak Chinese?')),
      generatedLine('会一点儿。', 'huì yìdiǎnr.', 'Un peu.', 'A little.')
    ];
  }

  if (lessonId === 'phrases-6-numbers-1-10') {
    return [
      generatedLine('你有几个苹果？', 'nǐ yǒu jǐ ge píngguǒ?', 'Tu as combien de pommes ?', 'How many apples do you have?'),
      lineOrFallback(['我有三个苹果。'], generatedLine('我有三个苹果。', 'wǒ yǒu sān ge píngguǒ.', 'J’ai trois pommes.', 'I have three apples.')),
      lineOrFallback(['现在几点？'], generatedLine('现在几点？', 'xiànzài jǐ diǎn?', 'Il est quelle heure ?', 'What time is it now?')),
      generatedLine('现在九点。', 'xiànzài jiǔ diǎn.', 'Il est 9 heures.', 'It is 9 o’clock.')
    ];
  }

  if (lessonId === 'phrases-7-time') {
    return [
      lineOrFallback(['现在几点？'], generatedLine('现在几点？', 'xiànzài jǐ diǎn?', 'Il est quelle heure ?', 'What time is it now?')),
      lineOrFallback(['现在三点。'], generatedLine('现在三点。', 'xiànzài sān diǎn.', 'Il est 3 heures.', 'It is 3 o’clock.')),
      generatedLine('我们明天几点见？', 'wǒmen míngtiān jǐ diǎn jiàn?', 'On se voit demain à quelle heure ?', 'What time shall we meet tomorrow?'),
      generatedLine('十点见。', 'shí diǎn jiàn.', 'À 10 heures.', 'See you at 10.')
    ];
  }

  if (lessonId === 'phrases-8-family') {
    return [
      generatedLine('你家有几口人？', 'nǐ jiā yǒu jǐ kǒu rén?', 'Combien de personnes dans ta famille ?', 'How many people are in your family?'),
      generatedLine('我家有四口人。', 'wǒ jiā yǒu sì kǒu rén.', 'Il y a quatre personnes dans ma famille.', 'There are four people in my family.'),
      generatedLine('你爸爸做什么工作？', 'nǐ bàba zuò shénme gōngzuò?', 'Quel travail fait ton père ?', 'What job does your father do?'),
      generatedLine('他是老师。', 'tā shì lǎoshī.', 'Il est professeur.', 'He is a teacher.')
    ];
  }

  if (lessonId === 'phrases-9-food-drinks') {
    return [
      lineOrFallback(['你想喝什么？'], generatedLine('你想喝什么？', 'nǐ xiǎng hē shénme?', 'Tu veux boire quoi ?', 'What would you like to drink?')),
      lineOrFallback(['我想喝茶。'], generatedLine('我想喝茶。', 'wǒ xiǎng hē chá.', 'Je veux boire du thé.', 'I want to drink tea.')),
      generatedLine('你喜欢吃什么？', 'nǐ xǐhuan chī shénme?', 'Tu aimes manger quoi ?', 'What do you like to eat?'),
      generatedLine('我喜欢吃面条。', 'wǒ xǐhuan chī miàntiáo.', 'J’aime manger des nouilles.', 'I like to eat noodles.')
    ];
  }

  if (lessonId === 'phrases-10-wants-needs') {
    return [
      generatedLine('你需要什么？', 'nǐ xūyào shénme?', 'De quoi as-tu besoin ?', 'What do you need?'),
      lineOrFallback(['我需要一杯水。', '我想买水。'], generatedLine('我需要一杯水。', 'wǒ xūyào yì bēi shuǐ.', 'J’ai besoin d’un verre d’eau.', 'I need a glass of water.')),
      generatedLine('你想去超市吗？', 'nǐ xiǎng qù chāoshì ma?', 'Tu veux aller au supermarché ?', 'Do you want to go to the supermarket?'),
      generatedLine('想，我们一起去吧。', 'xiǎng, wǒmen yìqǐ qù ba.', 'Oui, allons-y ensemble.', 'Yes, let us go together.')
    ];
  }

  if (lessonId === 'phrases-11-common-verbs') {
    return [
      generatedLine('你喜欢看书吗？', 'nǐ xǐhuan kàn shū ma?', 'Tu aimes lire ?', 'Do you like reading?'),
      generatedLine('喜欢，我每天都看书。', 'xǐhuan, wǒ měitiān dōu kàn shū.', 'Oui, je lis tous les jours.', 'Yes, I read every day.'),
      generatedLine('你会开车吗？', 'nǐ huì kāichē ma?', 'Tu sais conduire ?', 'Can you drive?'),
      generatedLine('会。', 'huì.', 'Oui.', 'Yes.')
    ];
  }

  if (lessonId === 'phrases-12-daily-actions') {
    return [
      generatedLine('你每天几点起床？', 'nǐ měitiān jǐ diǎn qǐchuáng?', 'Tu te lèves à quelle heure chaque jour ?', 'What time do you get up every day?'),
      generatedLine('我早上七点起床。', 'wǒ zǎoshang qī diǎn qǐchuáng.', 'Je me lève à 7h du matin.', 'I get up at 7 AM.'),
      generatedLine('晚上你做什么？', 'wǎnshang nǐ zuò shénme?', 'Que fais-tu le soir ?', 'What do you do in the evening?'),
      generatedLine('我听音乐，也看书。', 'wǒ tīng yīnyuè, yě kàn shū.', 'J’écoute de la musique et je lis.', 'I listen to music and read books.')
    ];
  }

  if (lessonId === 'conv-hsk3-1-meeting-friends') {
    return [
      generatedLine('好久不见，最近怎么样？', 'hǎojiǔ bú jiàn, zuìjìn zěnmeyàng?', 'Ça fait longtemps, comment vas-tu ?', 'Long time no see, how have you been?'),
      generatedLine('挺好的，你呢？', 'tǐng hǎo de, nǐ ne?', 'Très bien, et toi ?', 'Pretty good, and you?'),
      generatedLine('我最近在准备考试。', 'wǒ zuìjìn zài zhǔnbèi kǎoshì.', 'Je prépare des examens en ce moment.', 'I am preparing for exams lately.'),
      generatedLine('加油，我们周末一起复习吧。', 'jiāyóu, wǒmen zhōumò yìqǐ fùxí ba.', 'Courage, révisons ensemble ce week-end.', 'Keep it up, let us review together this weekend.')
    ];
  }

  if (lessonId === 'conv-hsk3-2-shopping') {
    return [
      generatedLine('这件衣服多少钱？', 'zhè jiàn yīfu duōshao qián?', 'Combien coûte ce vêtement ?', 'How much is this piece of clothing?'),
      generatedLine('一百八十块。', 'yìbǎi bāshí kuài.', '180 yuans.', '180 yuan.'),
      generatedLine('能试一下吗？', 'néng shì yíxià ma?', 'Puis-je l’essayer ?', 'Can I try it on?'),
      generatedLine('当然可以，试衣间在那边。', 'dāngrán kěyǐ, shìyījiān zài nàbiān.', 'Bien sûr, la cabine est là-bas.', 'Of course, the fitting room is over there.')
    ];
  }

  if (lessonId === 'conv-hsk3-3-travel') {
    return [
      generatedLine('你打算什么时候出发？', 'nǐ dǎsuàn shénme shíhou chūfā?', 'Quand comptes-tu partir ?', 'When do you plan to leave?'),
      generatedLine('下周二早上。', 'xià zhōu èr zǎoshang.', 'Mardi matin prochain.', 'Next Tuesday morning.'),
      generatedLine('你想坐火车还是飞机？', 'nǐ xiǎng zuò huǒchē háishi fēijī?', 'Tu veux prendre le train ou l’avion ?', 'Do you want to take the train or the plane?'),
      generatedLine('我想坐高铁，更方便。', 'wǒ xiǎng zuò gāotiě, gèng fāngbiàn.', 'Je préfère le TGV, c’est plus pratique.', 'I want to take high-speed rail, it is more convenient.')
    ];
  }

  if (lessonId === 'conv-hsk3-4-restaurant') {
    return [
      generatedLine('你想点什么菜？', 'nǐ xiǎng diǎn shénme cài?', 'Tu veux commander quels plats ?', 'What dishes do you want to order?'),
      generatedLine('来一份宫保鸡丁，再来一碗米饭。', 'lái yí fèn gōngbǎo jīdīng, zài lái yì wǎn mǐfàn.', 'Un poulet gongbao et un bol de riz.', 'One kung pao chicken and one bowl of rice.'),
      generatedLine('要不要喝点什么？', 'yào bú yào hē diǎn shénme?', 'Tu veux boire quelque chose ?', 'Would you like something to drink?'),
      generatedLine('一杯热茶就可以。', 'yì bēi rè chá jiù kěyǐ.', 'Un thé chaud, ça ira.', 'A cup of hot tea is fine.')
    ];
  }

  if (lessonId === 'conv-hsk4-1-workplace') {
    return [
      generatedLine('这个项目进展得怎么样？', 'zhège xiàngmù jìnzhǎn de zěnmeyàng?', 'Comment avance ce projet ?', 'How is this project progressing?'),
      generatedLine('基本按计划进行，不过时间有点紧。', 'jīběn àn jìhuà jìnxíng, búguò shíjiān yǒudiǎn jǐn.', 'Globalement selon le plan, mais le timing est serré.', 'It is basically on schedule, but the timeline is tight.'),
      generatedLine('需要我帮你协调资源吗？', 'xūyào wǒ bāng nǐ xiétiáo zīyuán ma?', 'Tu as besoin que je coordonne des ressources ?', 'Do you need me to help coordinate resources?'),
      generatedLine('太好了，如果能再多两个人就更顺利了。', 'tài hǎo le, rúguǒ néng zài duō liǎng ge rén jiù gèng shùnlì le.', 'Super, avec deux personnes en plus ce serait plus fluide.', 'Great, with two more people it would go more smoothly.')
    ];
  }

  if (lessonId === 'conv-hsk4-2-health') {
    return [
      generatedLine('你最近看起来有点累。', 'nǐ zuìjìn kàn qǐlái yǒudiǎn lèi.', 'Tu as l’air un peu fatigué ces jours-ci.', 'You look a bit tired lately.'),
      generatedLine('是啊，最近总是睡不好。', 'shì a, zuìjìn zǒng shì shuì bù hǎo.', 'Oui, je dors mal en ce moment.', 'Yeah, I have not been sleeping well lately.'),
      generatedLine('你最好早点休息，别太大压力。', 'nǐ zuì hǎo zǎodiǎn xiūxi, bié tài dà yālì.', 'Tu devrais te reposer plus tôt et moins stresser.', 'You had better rest earlier and avoid too much stress.'),
      generatedLine('你说得对，我会调整作息。', 'nǐ shuō de duì, wǒ huì tiáozhěng zuòxī.', 'Tu as raison, je vais ajuster mon rythme.', 'You are right, I will adjust my routine.')
    ];
  }

  if (lessonId === 'conv-hsk4-3-education') {
    return [
      generatedLine('你为什么想学这个专业？', 'nǐ wèishénme xiǎng xué zhège zhuānyè?', 'Pourquoi veux-tu étudier cette spécialité ?', 'Why do you want to study this major?'),
      generatedLine('因为我对教育技术很感兴趣。', 'yīnwèi wǒ duì jiàoyù jìshù hěn gǎn xìngqù.', 'Parce que la techno éducative m’intéresse beaucoup.', 'Because I am very interested in educational technology.'),
      generatedLine('课程难吗？', 'kèchéng nán ma?', 'Les cours sont difficiles ?', 'Are the courses difficult?'),
      generatedLine('有挑战，但老师讲得很清楚。', 'yǒu tiǎozhàn, dàn lǎoshī jiǎng de hěn qīngchu.', 'C’est exigeant, mais les profs expliquent bien.', 'It is challenging, but the teachers explain clearly.')
    ];
  }

  if (lessonId === 'conv-hsk4-4-culture') {
    return [
      generatedLine('周末你想去看展览吗？', 'zhōumò nǐ xiǎng qù kàn zhǎnlǎn ma?', 'Tu veux aller voir une expo ce week-end ?', 'Do you want to visit an exhibition this weekend?'),
      generatedLine('好啊，听说那个摄影展很不错。', 'hǎo a, tīngshuō nàge shèyǐng zhǎn hěn búcuò.', 'Oui, j’ai entendu que cette expo photo est super.', 'Sure, I heard that photography exhibition is great.'),
      generatedLine('我们下午两点在地铁站见。', 'wǒmen xiàwǔ liǎng diǎn zài dìtiě zhàn jiàn.', 'On se retrouve à 14h à la station de métro.', 'Let us meet at the subway station at 2 PM.'),
      generatedLine('没问题，我会准时到。', 'méi wèntí, wǒ huì zhǔnshí dào.', 'Pas de souci, je serai à l’heure.', 'No problem, I will be on time.')
    ];
  }

  if (lessonId === 'debate-hsk5-1-social-issues') {
    return [
      generatedLine('你觉得城市房价为什么一直上涨？', 'nǐ juéde chéngshì fángjià wèishénme yìzhí shàngzhǎng?', 'Pourquoi les prix de l’immobilier montent-ils sans arrêt ?', 'Why do urban housing prices keep rising?'),
      generatedLine('供需失衡是主要原因，还有投资需求。', 'gōngxū shīhéng shì zhǔyào yuányīn, háiyǒu tóuzī xūqiú.', 'Le déséquilibre offre-demande est principal, avec la pression d’investissement.', 'Supply-demand imbalance is the main reason, along with investment demand.'),
      generatedLine('那政府应该怎么做？', 'nà zhèngfǔ yīnggāi zěnme zuò?', 'Alors, que devrait faire le gouvernement ?', 'Then what should the government do?'),
      generatedLine('我认为应增加保障性住房并规范市场。', 'wǒ rènwéi yīng zēngjiā bǎozhàngxìng zhùfáng bìng guīfàn shìchǎng.', 'Il faut accroître le logement abordable et mieux réguler le marché.', 'It should increase affordable housing and regulate the market.')
    ];
  }

  if (lessonId === 'debate-hsk5-2-technology') {
    return [
      generatedLine('人工智能会取代很多工作吗？', 'réngōng zhìnéng huì qǔdài hěn duō gōngzuò ma?', 'L’IA va-t-elle remplacer beaucoup d’emplois ?', 'Will AI replace many jobs?'),
      generatedLine('部分岗位会变化，但也会创造新职业。', 'bùfèn gǎngwèi huì biànhuà, dàn yě huì chuàngzào xīn zhíyè.', 'Certains postes changeront, mais de nouveaux métiers apparaîtront.', 'Some roles will change, but new jobs will be created.'),
      generatedLine('那我们该怎么准备？', 'nà wǒmen gāi zěnme zhǔnbèi?', 'Alors, comment se préparer ?', 'So how should we prepare?'),
      generatedLine('关键是提升数字能力和终身学习。', 'guānjiàn shì tíshēng shùzì nénglì hé zhōngshēn xuéxí.', 'L’essentiel est de renforcer les compétences numériques et l’apprentissage continu.', 'The key is improving digital skills and lifelong learning.')
    ];
  }

  if (lessonId === 'debate-hsk5-3-environment') {
    return [
      generatedLine('你支持限制一次性塑料吗？', 'nǐ zhīchí xiànzhì yícìxìng sùliào ma?', 'Tu soutiens la limitation du plastique jetable ?', 'Do you support limiting single-use plastics?'),
      generatedLine('支持，但要给商家过渡时间。', 'zhīchí, dàn yào gěi shāngjiā guòdù shíjiān.', 'Oui, mais il faut laisser du temps de transition aux commerces.', 'Yes, but businesses need transition time.'),
      generatedLine('个人还能做什么？', 'gèrén hái néng zuò shénme?', 'Que peut faire une personne individuellement ?', 'What else can individuals do?'),
      generatedLine('从自带水杯和垃圾分类开始最实际。', 'cóng zìdài shuǐbēi hé lājī fēnlèi kāishǐ zuì shíjì.', 'Le plus concret: gourde réutilisable et tri des déchets.', 'The most practical start is reusable cups and waste sorting.')
    ];
  }

  if (lessonId === 'debate-hsk5-4-cultural') {
    return [
      generatedLine('跨文化沟通最容易出现什么问题？', 'kuà wénhuà gōutōng zuì róngyì chūxiàn shénme wèntí?', 'Quel problème revient le plus en communication interculturelle ?', 'What problem appears most in cross-cultural communication?'),
      generatedLine('常见的是语境误解和表达方式不同。', 'chángjiàn de shì yǔjìng wùjiě hé biǎodá fāngshì bùtóng.', 'Souvent, c’est un malentendu de contexte et de style d’expression.', 'Often it is context misunderstanding and different expression styles.'),
      generatedLine('怎么避免这些误会？', 'zěnme bìmiǎn zhèxiē wùhuì?', 'Comment éviter ces malentendus ?', 'How can we avoid these misunderstandings?'),
      generatedLine('先确认对方意思，再解释自己的立场。', 'xiān quèrèn duìfāng yìsi, zài jiěshì zìjǐ de lìchǎng.', 'Il faut d’abord vérifier le sens, puis clarifier sa position.', 'First confirm the other person’s meaning, then explain your own stance.')
    ];
  }

  if (lessonId === 'prof-hsk6-1-business') {
    return [
      generatedLine('这份季度报告的核心结论是什么？', 'zhè fèn jìdù bàogào de héxīn jiélùn shì shénme?', 'Quelle est la conclusion clé de ce rapport trimestriel ?', 'What is the key conclusion of this quarterly report?'),
      generatedLine('成本下降了8%，但海外收入低于预期。', 'chéngběn xiàjiàng le bā fēnzhī, dàn hǎiwài shōurù dīyú yùqī.', 'Les coûts ont baissé de 8%, mais les revenus offshore sont sous les attentes.', 'Costs dropped by 8%, but overseas revenue is below expectations.'),
      generatedLine('下一步建议呢？', 'xià yíbù jiànyì ne?', 'Quelle recommandation pour la suite ?', 'What is the next-step recommendation?'),
      generatedLine('优化供应链，同时调整海外定价策略。', 'yōuhuà gōngyìngliàn, tóngshí tiáozhěng hǎiwài dìngjià cèlüè.', 'Optimiser la supply chain et ajuster le pricing à l’international.', 'Optimize the supply chain and adjust overseas pricing strategy.')
    ];
  }

  if (lessonId === 'prof-hsk6-2-technical') {
    return [
      generatedLine('这个系统为什么会出现延迟峰值？', 'zhège xìtǒng wèishénme huì chūxiàn yánchí fēngzhí?', 'Pourquoi ce système a-t-il des pics de latence ?', 'Why does this system show latency spikes?'),
      generatedLine('主要瓶颈在数据库写入和缓存失效。', 'zhǔyào píngjǐng zài shùjùkù xiěrù hé huǎncún shīxiào.', 'Le principal goulot est sur les écritures DB et l’invalidation cache.', 'The main bottleneck is database writes and cache invalidation.'),
      generatedLine('解决方案确定了吗？', 'jiějué fāngàn quèdìng le ma?', 'La solution est-elle arrêtée ?', 'Has the solution been finalized?'),
      generatedLine('先做分片和异步队列，再压测验证。', 'xiān zuò fēnpiàn hé yìbù duìliè, zài yācè yànzhèng.', 'On commence par sharding + file asynchrone, puis tests de charge.', 'First do sharding and async queues, then validate with load testing.')
    ];
  }

  if (lessonId === 'prof-hsk6-3-academic') {
    return [
      generatedLine('你的研究方法为什么选择纵向追踪？', 'nǐ de yánjiū fāngfǎ wèishénme xuǎnzé zòngxiàng zhuīzōng?', 'Pourquoi avoir choisi une étude longitudinale ?', 'Why did you choose a longitudinal method?'),
      generatedLine('因为它能更准确观察变量变化趋势。', 'yīnwèi tā néng gèng zhǔnquè guānchá biànliàng biànhuà qūshì.', 'Parce qu’elle permet d’observer plus précisément l’évolution des variables.', 'Because it can more accurately observe variable trends.'),
      generatedLine('样本代表性足够吗？', 'yàngběn dàibiǎoxìng zúgòu ma?', 'L’échantillon est-il suffisamment représentatif ?', 'Is the sample representative enough?'),
      generatedLine('我们做了分层抽样，并进行了稳健性检验。', 'wǒmen zuò le fēncéng chōuyàng, bìng jìnxíng le wěnjiànxìng jiǎnyàn.', 'Nous avons fait un échantillonnage stratifié et des tests de robustesse.', 'We used stratified sampling and performed robustness checks.')
    ];
  }

  if (lessonId === 'prof-hsk6-4-legal') {
    return [
      generatedLine('合同里最需要注意哪一条？', 'hétong lǐ zuì xūyào zhùyì nǎ yì tiáo?', 'Quelle clause du contrat faut-il surveiller en priorité ?', 'Which contract clause needs the most attention?'),
      generatedLine('违约责任和争议解决条款最关键。', 'wéiyuē zérèn hé zhēngyì jiějué tiáokuǎn zuì guānjiàn.', 'La responsabilité en cas de défaut et la résolution des litiges sont cruciales.', 'Breach liability and dispute resolution clauses are the most critical.'),
      generatedLine('如果出现争议怎么办？', 'rúguǒ chūxiàn zhēngyì zěnme bàn?', 'Que faire en cas de litige ?', 'What if a dispute occurs?'),
      generatedLine('先按合同协商，必要时再进入仲裁程序。', 'xiān àn hétong xiéshāng, bìyào shí zài jìnrù zhòngcái chéngxù.', 'On négocie d’abord selon le contrat, puis arbitrage si nécessaire.', 'First negotiate according to the contract, then enter arbitration if needed.')
    ];
  }

  if (lessonId === 'rhet-hsk6-1-persuasion') {
    return [
      generatedLine('你怎么说服团队接受这个方案？', 'nǐ zěnme shuōfú tuánduì jiēshòu zhège fāngàn?', 'Comment convaincs-tu l’équipe d’accepter ce plan ?', 'How do you persuade the team to accept this plan?'),
      generatedLine('先展示数据，再回应他们最担心的风险。', 'xiān zhǎnshì shùjù, zài huíyìng tāmen zuì dānxīn de fēngxiǎn.', 'Je montre d’abord les données, puis je traite leurs risques majeurs.', 'I first present data, then address their main concerns.'),
      generatedLine('只靠数据够吗？', 'zhǐ kào shùjù gòu ma?', 'Les données seules suffisent-elles ?', 'Is relying on data alone enough?'),
      generatedLine('不够，还要给出可执行的落地步骤。', 'bù gòu, hái yào gěichū kě zhíxíng de luòdì bùzhòu.', 'Non, il faut aussi un plan d’exécution concret.', 'No, we also need executable implementation steps.')
    ];
  }

  if (lessonId === 'rhet-hsk6-2-debate') {
    return [
      generatedLine('你的论点核心是什么？', 'nǐ de lùndiǎn héxīn shì shénme?', 'Quel est le cœur de ton argument ?', 'What is the core of your argument?'),
      generatedLine('效率提升必须以公平分配为前提。', 'xiàolǜ tíshēng bìxū yǐ gōngpíng fēnpèi wéi qiántí.', 'Le gain d’efficacité doit reposer sur une répartition équitable.', 'Efficiency gains must be based on fair distribution.'),
      generatedLine('对方反驳说成本太高。', 'duìfāng fǎnbó shuō chéngběn tài gāo.', 'La partie adverse dit que le coût est trop élevé.', 'The other side argues that the cost is too high.'),
      generatedLine('我会证明长期收益能覆盖短期投入。', 'wǒ huì zhèngmíng chángqī shōuyì néng fùgài duǎnqī tóurù.', 'Je montrerai que le long terme couvre l’investissement initial.', 'I will show that long-term benefits cover short-term costs.')
    ];
  }

  if (lessonId === 'rhet-hsk6-3-public-speaking') {
    return [
      generatedLine('公开演讲时你最重视什么？', 'gōngkāi yǎnjiǎng shí nǐ zuì zhòngshì shénme?', 'En prise de parole, tu privilégies quoi ?', 'What do you value most in public speaking?'),
      generatedLine('结构清晰和节奏控制。', 'jiégòu qīngxī hé jiézòu kòngzhì.', 'La clarté de structure et le contrôle du rythme.', 'Clear structure and pacing control.'),
      generatedLine('临场紧张怎么处理？', 'línchǎng jǐnzhāng zěnme chǔlǐ?', 'Comment gérer le stress sur scène ?', 'How do you handle stage anxiety?'),
      generatedLine('开场前做呼吸训练，并准备过渡句。', 'kāichǎng qián zuò hūxī xùnliàn, bìng zhǔnbèi guòdùjù.', 'Respiration avant de commencer, et transitions prêtes.', 'Do breathing exercises before starting and prepare transition lines.')
    ];
  }

  if (lessonId === 'rhet-hsk6-4-critical-thinking') {
    return [
      generatedLine('你判断一个观点是否可靠的标准是什么？', 'nǐ pànduàn yí ge guāndiǎn shìfǒu kěkào de biāozhǔn shì shénme?', 'Quels critères utilises-tu pour juger une idée fiable ?', 'What criteria do you use to judge whether a view is reliable?'),
      generatedLine('先看证据来源，再看推理是否严密。', 'xiān kàn zhèngjù láiyuán, zài kàn tuīlǐ shìfǒu yánmì.', 'D’abord la source des preuves, puis la solidité du raisonnement.', 'First check evidence sources, then examine reasoning rigor.'),
      generatedLine('如果数据彼此矛盾呢？', 'rúguǒ shùjù bǐcǐ máodùn ne?', 'Et si les données se contredisent ?', 'What if the data contradict each other?'),
      generatedLine('比较方法差异，优先采用可复现结论。', 'bǐjiào fāngfǎ chāyì, yōuxiān cǎiyòng kě fùxiàn jiélùn.', 'On compare les méthodes et on privilégie les conclusions reproductibles.', 'Compare methodological differences and prioritize reproducible conclusions.')
    ];
  }

  if (lessonId === 'convo-1-restaurant') {
    return [
      lineOrFallback(['你喜欢吃什么？'], generatedLine('你喜欢吃什么？', 'nǐ xǐhuan chī shénme?', 'Qu’aimes-tu manger ?', 'What do you like to eat?')),
      lineOrFallback(['我想学做中国菜。'], generatedLine('我想学做中国菜。', 'wǒ xiǎng xué zuò Zhōngguó cài.', 'Je veux apprendre à cuisiner chinois.', 'I want to learn to cook Chinese food.')),
      lineOrFallback(['我可以教你。'], generatedLine('我可以教你。', 'wǒ kěyǐ jiāo nǐ.', 'Je peux t’apprendre.', 'I can teach you.')),
      generatedLine('谢谢你！', 'xièxie nǐ!', 'Merci !', 'Thank you!')
    ];
  }

  if (lessonId === 'convo-2-shopping') {
    return [
      lineOrFallback(['我要一张票。', '我想买水。'], generatedLine('我要一张票。', 'wǒ yào yì zhāng piào.', 'Je voudrais un billet.', 'I would like one ticket.')),
      generatedLine('一张票十块钱。', 'yì zhāng piào shí kuài qián.', 'Un billet coûte 10 yuans.', 'One ticket costs 10 yuan.'),
      lineOrFallback(['能便宜一点吗？', '多少钱？'], generatedLine('能便宜一点吗？', 'néng piányi yìdiǎn ma?', 'Pouvez-vous baisser un peu le prix ?', 'Can it be a little cheaper?')),
      generatedLine('可以，九块钱。', 'kěyǐ, jiǔ kuài qián.', 'D’accord, 9 yuans.', 'Okay, 9 yuan.')
    ];
  }

  if (lessonId === 'convo-3-directions') {
    return [
      lineOrFallback(['你要去哪儿？'], generatedLine('你要去哪儿？', 'nǐ yào qù nǎr?', 'Où veux-tu aller ?', 'Where do you want to go?')),
      lineOrFallback(['我想去火车站。'], generatedLine('我想去火车站。', 'wǒ xiǎng qù huǒchē zhàn.', 'Je veux aller à la gare.', 'I want to go to the train station.')),
      lineOrFallback(['医院在哪里？'], generatedLine('医院在哪里？', 'yīyuàn zài nǎlǐ?', 'Où est l’hôpital ?', 'Where is the hospital?')),
      lineOrFallback(['一直往前走。'], generatedLine('一直往前走。', 'yìzhí wǎng qián zǒu.', 'Continuez tout droit.', 'Go straight ahead.'))
    ];
  }

  if (lessonId === 'convo-4-making-plans') {
    return [
      lineOrFallback(['我们什么时候见面？'], generatedLine('我们什么时候见面？', 'wǒmen shénme shíhou jiànmiàn?', 'Quand se voit-on ?', 'When shall we meet?')),
      lineOrFallback(['下午三点怎么样？'], generatedLine('下午三点怎么样？', 'xiàwǔ sān diǎn zěnmeyàng?', 'Que dis-tu de 15 h ?', 'How about 3 PM?')),
      lineOrFallback(['明天我有时间。'], generatedLine('明天我有时间。', 'míngtiān wǒ yǒu shíjiān.', 'Demain j’ai du temps.', 'I have time tomorrow.')),
      generatedLine('好，没问题。', 'hǎo, méi wèntí.', 'D’accord, pas de problème.', 'Okay, no problem.')
    ];
  }

  if (lessonId === 'convo-5-phone-call') {
    return [
      lineOrFallback(['你在做什么？'], generatedLine('你在做什么？', 'nǐ zài zuò shénme?', 'Tu fais quoi ?', 'What are you doing?')),
      lineOrFallback(['我正在看书。'], generatedLine('我正在看书。', 'wǒ zhèngzài kàn shū.', 'Je suis en train de lire.', 'I am reading.')),
      lineOrFallback(['我听不懂。'], generatedLine('我听不懂。', 'wǒ tīng bù dǒng.', 'Je ne comprends pas.', 'I do not understand.')),
      lineOrFallback(['请说慢一点。'], generatedLine('请说慢一点。', 'qǐng shuō màn yìdiǎn.', 'Parlez plus lentement, s’il vous plaît.', 'Please speak slower.'))
    ];
  }

  if (lessonId === 'convo-6-doctor') {
    return [
      lineOrFallback(['我身体不舒服。'], generatedLine('我身体不舒服。', 'wǒ shēntǐ bù shūfu.', 'Je ne me sens pas bien.', 'I do not feel well.')),
      lineOrFallback(['你应该去看医生。'], generatedLine('你应该去看医生。', 'nǐ yīnggāi qù kàn yīshēng.', 'Tu devrais consulter un médecin.', 'You should see a doctor.')),
      lineOrFallback(['医院在哪里？'], generatedLine('医院在哪里？', 'yīyuàn zài nǎlǐ?', 'Où est l’hôpital ?', 'Where is the hospital?')),
      generatedLine('在前面，不远。', 'zài qiánmiàn, bù yuǎn.', 'C’est devant, pas loin.', 'It is ahead, not far.')
    ];
  }

  if (lessonId === 'convo-7-weather-talk') {
    return [
      lineOrFallback(['天气怎么样？'], generatedLine('天气怎么样？', 'tiānqì zěnmeyàng?', 'Quel temps fait-il ?', 'How is the weather?')),
      lineOrFallback(['我觉得很冷。'], generatedLine('我觉得很冷。', 'wǒ juéde hěn lěng.', 'Je trouve qu’il fait très froid.', 'I feel very cold.')),
      lineOrFallback(['外面下雨了。'], generatedLine('外面下雨了。', 'wàimiàn xià yǔ le.', 'Il pleut dehors.', 'It is raining outside.')),
      lineOrFallback(['别忘了带伞。'], generatedLine('别忘了带伞。', 'bié wàng le dài sǎn.', 'N’oublie pas de prendre un parapluie.', 'Do not forget to bring an umbrella.'))
    ];
  }

  if (lessonId === 'convo-8-complaints') {
    return [
      lineOrFallback(['你能帮我吗？'], generatedLine('你能帮我吗？', 'nǐ néng bāng wǒ ma?', 'Peux-tu m’aider ?', 'Can you help me?')),
      lineOrFallback(['当然可以。'], generatedLine('当然可以。', 'dāngrán kěyǐ.', 'Bien sûr.', 'Of course.')),
      lineOrFallback(['我想换一个房间。'], generatedLine('我想换一个房间。', 'wǒ xiǎng huàn yí ge fángjiān.', 'Je veux changer de chambre.', 'I want to change rooms.')),
      generatedLine('好的，我来帮你。', 'hǎo de, wǒ lái bāng nǐ.', 'D’accord, je vais t’aider.', 'Okay, I will help you.')
    ];
  }

  if (lessonId === 'convo-9-invitations') {
    return [
      lineOrFallback(['周末你有什么打算？'], generatedLine('周末你有什么打算？', 'zhōumò nǐ yǒu shénme dǎsuàn?', 'Quels sont tes projets pour le week-end ?', 'What are your plans for the weekend?')),
      lineOrFallback(['我打算去爬山。'], generatedLine('我打算去爬山。', 'wǒ dǎsuàn qù páshān.', 'Je prévois d’aller randonner.', 'I plan to go hiking.')),
      lineOrFallback(['我们一起努力吧。'], generatedLine('我们一起努力吧。', 'wǒmen yìqǐ nǔlì ba.', 'Travaillons ensemble dessus.', 'Let us work on it together.')),
      lineOrFallback(['没问题。'], generatedLine('没问题。', 'méi wèntí.', 'Pas de problème.', 'No problem.'))
    ];
  }

  if (lessonId === 'convo-10-opinions') {
    return [
      lineOrFallback(['你的工作怎么样？'], generatedLine('你的工作怎么样？', 'nǐ de gōngzuò zěnmeyàng?', 'Comment va ton travail ?', 'How is your work?')),
      lineOrFallback(['工作很有意思。'], generatedLine('工作很有意思。', 'gōngzuò hěn yǒu yìsi.', 'Le travail est très intéressant.', 'Work is very interesting.')),
      lineOrFallback(['这个问题很难。'], generatedLine('这个问题很难。', 'zhège wèntí hěn nán.', 'Cette question est très difficile.', 'This question is very difficult.')),
      generatedLine('我们一起看看吧。', 'wǒmen yìqǐ kànkan ba.', 'Regardons ensemble.', 'Let us look at it together.')
    ];
  }

  return null;
};

const buildFallbackDialogueLines = (sourceLines: DialogueSeedLine[]): DialogueSeedLine[] => {
  const questionsPool = sourceLines.filter((line) => isQuestionLine(line.text));
  const statementsPool = sourceLines.filter((line) => !isQuestionLine(line.text));
  const dialogue: DialogueSeedLine[] = [];

  if (questionsPool.length > 0) {
    const firstQuestion = questionsPool.shift()!;
    const firstReply = takeMatchingReply(firstQuestion, statementsPool) ?? buildGeneratedReply(firstQuestion);
    dialogue.push(firstQuestion, firstReply);

    const secondQuestion = questionsPool.shift() ?? generatedLine('你呢？', 'nǐ ne?', 'Et toi ?', 'And you?');
    const secondReply = isQuestionLine(secondQuestion.text)
      ? takeMatchingReply(secondQuestion, statementsPool) ?? buildGeneratedReply(secondQuestion)
      : buildGeneratedFollowUpAnswer(firstQuestion);

    dialogue.push(secondQuestion, secondReply);
    return dialogue.slice(0, 4);
  }

  if (statementsPool.length > 0) {
    const firstStatement = statementsPool.shift()!;
    const firstResponse = buildGeneratedResponseToStatement(firstStatement);
    const secondStatement = statementsPool.shift() ?? generatedLine('你呢？', 'nǐ ne?', 'Et toi ?', 'And you?');
    const secondResponse = secondStatement.text === '你呢？'
      ? buildGeneratedFollowUpAnswer(firstStatement)
      : buildGeneratedResponseToStatement(secondStatement);

    return [firstStatement, firstResponse, secondStatement, secondResponse].slice(0, 4);
  }

  return [
    generatedLine('你好！', 'nǐ hǎo!', 'Bonjour !', 'Hello!'),
    generatedLine('你好！', 'nǐ hǎo!', 'Bonjour !', 'Hello!'),
    generatedLine('最近怎么样？', 'zuìjìn zěnmeyàng?', 'Comment ça va ces jours-ci ?', 'How have you been lately?'),
    generatedLine('挺好的，谢谢。', 'tǐng hǎo de, xièxie.', 'Très bien, merci.', 'Pretty good, thanks.')
  ];
};

const buildAutoDialogueExercise = (lesson: LessonModule, words: LessonItem[]): LessonExerciseDialogue | null => {
  if (!words[0]) return null;

  const sourceLines = collectSourceDialogueLines(words);
  if (sourceLines.length === 0) return null;

  const seededLines = buildTemplateDialogueLines(lesson.id, sourceLines) ?? buildFallbackDialogueLines(sourceLines);
  const lines: DialogueLine[] = seededLines.map((line, index) => {
    const speaker: 'A' | 'B' = index % 2 === 0 ? 'A' : 'B';
    return {
      ...line,
      speaker,
      speakerName: speaker === 'A' ? '小明' : '小红'
    };
  });

  return {
    id: `${lesson.id}-auto-dialogue`,
    type: 'dialogue',
    mode: 'display',
    promptFr: 'Dialogue de mise en contexte',
    promptEn: 'Contextual dialogue',
    context: `Mini-scène guidée avec les expressions de la leçon « ${lesson.title} »`,
    contextEn: `Guided mini-scene using expressions from lesson “${lesson.titleEn}”`,
    dialogue: lines,
  };
};

function LessonExerciseSection({ exercise, language, onAnswer }: LessonExerciseSectionProps) {
  if (exercise.type === 'writing') {
    return <WritingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'dialogue') {
    return <DialogueExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'reading') {
    return <ReadingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'speaking') {
    return <SpeakingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'dictation') {
    return <DictationExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'grammar') {
    return <GrammarQuizComponent key={exercise.id} quiz={exercise.quiz} language={language} onAnswer={onAnswer} />;
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const explanation = language === 'fr' ? exercise.explanationFr : exercise.explanationEn;

  const handleChoice = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    onAnswer(index === exercise.correctChoiceIndex);
  };

  return (
    <div className="quiz-container quiz-container-modern lesson-exercise-card">
      <h2 className="quiz-question">{prompt}</h2>

      {exercise.type === 'listening' && (
        <div className="quiz-word quiz-audio-only">
          <AudioButton src={`/${exercise.audio}`} label={language === 'fr' ? 'Écouter' : 'Listen'} />
        </div>
      )}

      {answered && explanation && (
        <div className={`answer-feedback ${selectedIndex === exercise.correctChoiceIndex ? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">{selectedIndex === exercise.correctChoiceIndex ? '✓' : '✗'}</span>
          <div>{explanation}</div>
        </div>
      )}

      <div className="quiz-options">
        {exercise.choices.map((choice, index) => {
          const isCorrect = index === exercise.correctChoiceIndex;
          const isSelected = index === selectedIndex;
          const optionState = answered && isCorrect ? 'correct' : answered && isSelected ? 'incorrect' : '';

          return (
            <button
              key={`${exercise.id}-${index}`}
              className={`quiz-option quiz-option-modern ${optionState}`}
              onClick={() => handleChoice(index)}
              disabled={answered}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="quiz-option-text">{exercise.choiceLabels?.[index] ?? choice}</span>
              {answered && isCorrect && <span className="quiz-option-status">✓</span>}
              {answered && isSelected && !isCorrect && <span className="quiz-option-status">✗</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StructuredLessonPage({ lesson, language, onComplete, onExit }: StructuredLessonPageProps) {
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [explanationIndex, setExplanationIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizSelections, setQuizSelections] = useState<Record<number, string>>({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});

  const lessonWords = useMemo<LessonItem[]>(() => {
    const simpleLesson = getSimpleLessonById(lesson.id);
    if (simpleLesson) {
      if (simpleLesson.customWords && simpleLesson.customWords.length > 0) {
        return simpleLesson.customWords;
      }
      if (simpleLesson.words && simpleLesson.words.length > 0) {
        return getLessonsByHanziList(simpleLesson.words);
      }
    }

    const level1Words = level1LessonWordBank[lesson.id];
    if (level1Words && level1Words.length > 0) {
      return level1Words;
    }

    return lesson.flashcards
      .map((identifier) => {
        const grammarLesson = getGrammarLessonById(identifier);
        if (grammarLesson) return grammarLesson;
        const words = getLessonsByHanziList([identifier]);
        return words.length > 0 ? words[0] : null;
      })
      .filter((word): word is LessonItem => Boolean(word));
  }, [lesson.flashcards, lesson.id]);

  const shouldAutoGenerateDialogue = useMemo(() => {
    const normalizedTags = (lesson.tags ?? []).map((tag) => tag.toLowerCase());

    if (normalizedTags.includes('no-dialogue')) return false;
    return lesson.category === 'conversation';
  }, [lesson.category, lesson.tags]);

  const customExercises = useMemo(() => {
    const baseExercises = lessonExercises[lesson.id] ?? [];
    const filteredExercises = baseExercises;

    const orderDialogueFirst = (exercises: LessonExercise[]) => {
      const dialogueExercises = exercises.filter((exercise) => exercise.type === 'dialogue');
      const questionExercises = exercises.filter((exercise) => exercise.type !== 'dialogue');
      return [...dialogueExercises, ...questionExercises];
    };

    if (filteredExercises.some((exercise) => exercise.type === 'dialogue')) {
      return orderDialogueFirst(filteredExercises);
    }
    if (!shouldAutoGenerateDialogue) return orderDialogueFirst(filteredExercises);

    const generatedDialogue = buildAutoDialogueExercise(lesson, lessonWords);
    if (!generatedDialogue) return orderDialogueFirst(filteredExercises);

    return [generatedDialogue, ...filteredExercises];
  }, [lesson, lesson.id, lessonWords, shouldAutoGenerateDialogue]);

  const explanationSteps = useMemo<LessonExplanationStep[]>(() => {
    const steps: LessonExplanationStep[] = [];
    const introContent = language === 'fr'
      ? lesson.introduction.lessonIntro ?? lesson.introduction.content
      : lesson.introduction.lessonIntroEn ?? lesson.introduction.contentEn;
    const introObjectives = language === 'fr' ? lesson.introduction.objectives : lesson.introduction.objectivesEn;

    steps.push({
      id: 'intro',
      title: language === 'fr' ? 'Introduction' : 'Introduction',
      content: introContent,
      bullets: introObjectives.slice(0, 5)
    });

    const grammarWord = lessonWords.find((word) => Boolean(word.grammarExplanation));
    const grammarExplanation = grammarWord?.grammarExplanation;
    if (grammarExplanation) {
      const whenToUse = language === 'fr' ? grammarExplanation.whenToUse : grammarExplanation.whenToUseEn;
      const howToUse = language === 'fr' ? grammarExplanation.howToUse : grammarExplanation.howToUseEn;
      const commonMistakes = language === 'fr' ? grammarExplanation.commonMistakes : grammarExplanation.commonMistakesEn;
      const tips = language === 'fr' ? grammarExplanation.tips : grammarExplanation.tipsEn;

      steps.push({
        id: 'grammar-rules',
        title: language === 'fr' ? 'Règles de grammaire' : 'Grammar rules',
        content: howToUse,
        bullets: [whenToUse, commonMistakes, tips].filter((item): item is string => Boolean(item))
      });
    }

    return steps;
  }, [
    language,
    lesson.introduction.lessonIntro,
    lesson.introduction.lessonIntroEn,
    lesson.introduction.content,
    lesson.introduction.contentEn,
    lesson.introduction.objectives,
    lesson.introduction.objectivesEn,
    lessonWords
  ]);

  const totalCustomExercises = customExercises.length;
  const estimatedXp = Math.max(20, lesson.quizQuestions * 10);
  const desiredQuizCount = Math.min(lesson.quizQuestions, lessonWords.length);
  const currentWord = lessonWords[currentCardIndex];

  const quizData = useMemo<QuizEntry[]>(() => {
    if (desiredQuizCount === 0) return [];

    return Array.from({ length: desiredQuizCount })
      .map((_, idx) => {
        const word = lessonWords[idx];
        if (!word) return null;
        return { word, options: buildQuizOptions(word, lessonWords, language) };
      })
      .filter(
        (entry): entry is QuizEntry =>
          Boolean(entry?.word) && (Boolean(entry?.word.grammarQuiz) || (entry?.options.length ?? 0) >= 2)
      );
  }, [desiredQuizCount, language, lessonWords]);

  const totalQuizQuestions = quizData.length;
  const totalExplanationSteps = explanationSteps.length;
  const totalLearnSteps = totalExplanationSteps + lessonWords.length;
  const isOnExplanationStep = explanationIndex < totalExplanationSteps;
  const learnedStep = isOnExplanationStep
    ? explanationIndex + 1
    : totalExplanationSteps + currentCardIndex + 1;
  const customStep = totalLearnSteps + exerciseIndex + 1;
  const quizStep = totalLearnSteps + totalCustomExercises + currentCardIndex + 1;
  const totalSteps = Math.max(totalLearnSteps + totalCustomExercises + totalQuizQuestions, 1);

  const resetQuizState = () => {
    setCurrentCardIndex(0);
    setExplanationIndex(totalExplanationSteps);
    setQuizAnswers({});
    setQuizSelections({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const renderTopProgress = (currentStep: number, onBack: () => void) => {
    const boundedStep = Math.max(1, Math.min(currentStep, totalSteps));
    const progress = (boundedStep / totalSteps) * 100;

    return (
      <div className="lesson-top-progress">
        <button className="lesson-close-btn" onClick={onBack} aria-label={language === 'fr' ? 'Fermer' : 'Close'}>
          ×
        </button>
        <div className="lesson-top-progress-track">
          <div className="lesson-top-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="lesson-top-progress-count">
          {boundedStep}/{totalSteps}
        </span>
      </div>
    );
  };

  if (lessonWords.length === 0) {
    return (
      <div className="structured-lesson">
        <div className="lesson-empty-state">
          {language === 'fr'
            ? 'Aucun contenu disponible pour cette leçon pour le moment.'
            : 'No content available for this lesson yet.'}
        </div>
      </div>
    );
  }

  if (phase === 'intro') {
    const categoryLabel = lesson.category.toUpperCase();
    const introContent = language === 'fr'
      ? lesson.introduction.quickIntro ?? lesson.introduction.content
      : lesson.introduction.quickIntroEn ?? lesson.introduction.contentEn;

    return (
      <div className="structured-lesson">
        <div className="lesson-intro-container lesson-intro-centered">
          <div className="lesson-intro-hero">
            <div className="lesson-intro-icon">{CATEGORY_ICON[lesson.category] ?? '📘'}</div>
            <p className="lesson-badge">{categoryLabel}</p>
            <h1 className="intro-title">{language === 'fr' ? lesson.title : lesson.titleEn}</h1>
            <div className="intro-text intro-text-rich">
              {parseMarkdown(normalizeLessonRichText(introContent))}
            </div>
            <div className="lesson-intro-meta">
              <span>⏱ {lesson.duration} min</span>
              <span>•</span>
              <span>✨ +{estimatedXp} XP</span>
            </div>
          </div>

          <div className="lesson-intro-actions">
            <button className="btn-secondary" onClick={onExit}>
              {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <button
              className="start-lesson-btn"
              onClick={() => {
                setCurrentCardIndex(0);
                setIsCardFlipped(false);
                setExplanationIndex(0);
                setPhase('learn');
              }}
            >
              {language === 'fr' ? 'Commencer' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'learn') {
    if (isOnExplanationStep) {
      const step = explanationSteps[explanationIndex];
      if (!step) {
        return (
          <div className="structured-lesson">
            <div className="lesson-empty-state">
              {language === 'fr' ? 'Explications indisponibles.' : 'Explanation unavailable.'}
            </div>
          </div>
        );
      }

      return (
        <div className="structured-lesson">
          {renderTopProgress(learnedStep, onExit)}

          <div className="lesson-phase-shell lesson-phase-shell--explanation">
            <div className="lesson-explanation-header">
              <span className="lesson-explanation-header-icon" aria-hidden="true">
                📘
              </span>
              <h3 className="lesson-explanation-header-title">{step.title}</h3>
            </div>

            <div className="lesson-explanation-card">
              <div className="lesson-explanation-content lesson-explanation-rich">
                {parseMarkdown(normalizeLessonRichText(step.content))}
              </div>

              {step.bullets.length > 0 && (
                <ul className="lesson-explanation-list">
                  {step.bullets.map((bullet, index) => (
                    <li key={`${step.id}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lesson-flashcard-actions lesson-nav-modern">
              {explanationIndex > 0 ? (
                <button className="btn-secondary" onClick={() => setExplanationIndex((prev) => prev - 1)}>
                  {language === 'fr' ? 'Précédent' : 'Previous'}
                </button>
              ) : (
                <span />
              )}

              <button
                className="btn-primary"
                onClick={() => {
                  if (explanationIndex < totalExplanationSteps - 1) {
                    setExplanationIndex((prev) => prev + 1);
                    return;
                  }
                  setExplanationIndex(totalExplanationSteps);
                  setCurrentCardIndex(0);
                }}
              >
                {language === 'fr' ? 'Suivant' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!currentWord) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr' ? 'Aucun mot à apprendre.' : 'No words to learn.'}
          </div>
        </div>
      );
    }

    return (
      <div className="structured-lesson">
        {renderTopProgress(learnedStep, onExit)}

        <div className="lesson-phase-shell">
          <p className="lesson-step-label">
            {language === 'fr' ? 'Mot' : 'Word'} {currentCardIndex + 1} {language === 'fr' ? 'sur' : 'of'} {lessonWords.length}
          </p>

          <div
            className={`lesson-flip-card ${isCardFlipped ? 'flipped' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => setIsCardFlipped((prev) => !prev)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsCardFlipped((prev) => !prev);
              }
            }}
          >
            {(currentWord.audioLetter || currentWord.audio) && (
              <div className="lesson-flip-audio" onClick={(event) => event.stopPropagation()}>
                <AudioButton src={`/${currentWord.audioLetter || currentWord.audio}`} label={language === 'fr' ? 'Audio' : 'Audio'} />
              </div>
            )}

            <div className="lesson-flip-hanzi">{currentWord.hanzi}</div>
            {!isCardFlipped ? (
              <div className="lesson-flip-hint">{language === 'fr' ? 'Touchez pour retourner' : 'Tap to flip'}</div>
            ) : (
              <>
                <div className="lesson-flip-pinyin">{currentWord.pinyin}</div>
                <div className="lesson-flip-translation">
                  {language === 'fr' ? currentWord.translationFr : currentWord.translation}
                </div>
                {currentWord.explanation && <div className="lesson-flip-explanation">{currentWord.explanation}</div>}
              </>
            )}
          </div>

          <div className="lesson-learn-toolbar">
            <button className="lesson-flip-reset" onClick={() => setIsCardFlipped(false)} aria-label={language === 'fr' ? 'Retourner' : 'Reset'}>
              ↻
            </button>
          </div>

          {currentWord.grammarExplanation && isCardFlipped && (
            <GrammarExplanationCard explanation={currentWord.grammarExplanation} language={language} />
          )}

          <div className="lesson-flashcard-actions lesson-nav-modern">
            {currentCardIndex > 0 || totalExplanationSteps > 0 ? (
              <button
                className="btn-secondary"
                onClick={() => {
                  if (currentCardIndex === 0 && totalExplanationSteps > 0) {
                    setExplanationIndex(totalExplanationSteps - 1);
                    return;
                  }
                  setCurrentCardIndex((prev) => prev - 1);
                  setIsCardFlipped(false);
                }}
              >
                {language === 'fr' ? 'Précédent' : 'Previous'}
              </button>
            ) : (
              <span />
            )}

            {currentCardIndex < lessonWords.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => {
                  setCurrentCardIndex((prev) => prev + 1);
                  setIsCardFlipped(false);
                }}
              >
                {language === 'fr' ? 'Suivant' : 'Next'}
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => {
                  setPhase('quiz');
                  resetQuizState();
                }}
              >
                {language === 'fr' ? 'Passer au quiz' : 'Go to quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    if (lessonWords.length < 2 && totalCustomExercises === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr' ? 'Il faut au moins 2 mots pour faire un quiz.' : 'At least 2 words are needed for a quiz.'}
          </div>
        </div>
      );
    }

    const safeTotalSteps = Math.max(totalCustomExercises + totalQuizQuestions, 1);

    const handleCustomAnswered = (exercise: LessonExercise, correct: boolean) => {
      setExerciseResults((prev) => ({ ...prev, [exercise.id]: correct }));

      setTimeout(() => {
        const nextIndex = exerciseIndex + 1;
        if (nextIndex < totalCustomExercises) {
          setExerciseIndex(nextIndex);
          return;
        }
        if (totalQuizQuestions > 0) {
          setExerciseIndex(nextIndex);
          setCurrentCardIndex(0);
          return;
        }
        setPhase('complete');
      }, exercise.type === 'grammar' ? 1700 : 900);
    };

    if (exerciseIndex < totalCustomExercises) {
      const exercise = customExercises[exerciseIndex];
      return (
        <div className="structured-lesson">
          {renderTopProgress(customStep, () => setPhase('learn'))}
          <div className="lesson-phase-shell lesson-exercise-shell">
            <LessonExerciseSection key={exercise.id} exercise={exercise} language={language} onAnswer={(result) => handleCustomAnswered(exercise, result)} />
          </div>
        </div>
      );
    }

    if (totalQuizQuestions === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Les exercices sont terminés.'
              : 'Exercises are complete.'}
          </div>
        </div>
      );
    }

    const currentQuiz = quizData[currentCardIndex];
    const quizWord = currentQuiz?.word;
    const options = currentQuiz?.options ?? [];

    if (!quizWord || options.length < 2) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Impossible de créer un quiz avec les données actuelles.'
              : 'Unable to build a quiz with the current data.'}
          </div>
        </div>
      );
    }

    const answered = quizAnswers[currentCardIndex] !== undefined;
    const correctTranslation = language === 'fr' ? quizWord.translationFr : quizWord.translation;
    const hasGrammarQuiz = Boolean(quizWord.grammarQuiz);

    const goToNextQuizQuestion = () => {
      if (currentCardIndex < totalQuizQuestions - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        return;
      }
      setPhase('complete');
    };

    const handleWordAnswer = (answer: string) => {
      if (answered) return;
      const isCorrect = answer === correctTranslation;
      setQuizSelections((prev) => ({ ...prev, [currentCardIndex]: answer }));
      setQuizAnswers((prev) => ({ ...prev, [currentCardIndex]: isCorrect }));
    };

    const handleGrammarAnswer = (isCorrect: boolean) => {
      setQuizAnswers((prev) => ({ ...prev, [currentCardIndex]: isCorrect }));
    };

    return (
      <div className="structured-lesson">
        {renderTopProgress(quizStep, () => setPhase('learn'))}

        {hasGrammarQuiz && quizWord.grammarQuiz ? (
          <div className="lesson-phase-shell lesson-exercise-shell">
            <GrammarQuizComponent
              key={`${quizWord.id}-grammar-${currentCardIndex}`}
              quiz={quizWord.grammarQuiz}
              language={language}
              onAnswer={handleGrammarAnswer}
            />
            <div className="lesson-bottom-actions">
              {currentCardIndex > 0 && !answered ? (
                <button className="btn-secondary lesson-quiz-nav-btn" onClick={() => setCurrentCardIndex((prev) => prev - 1)}>
                  {language === 'fr' ? 'Précédent' : 'Previous'}
                </button>
              ) : (
                <span />
              )}
              {answered && (
                <button className="btn-primary lesson-quiz-nav-btn" onClick={goToNextQuizQuestion}>
                  {currentCardIndex < totalQuizQuestions - 1
                    ? language === 'fr'
                      ? 'Suivant'
                      : 'Next'
                    : language === 'fr'
                      ? 'Terminer'
                      : 'Finish'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="lesson-phase-shell">
            <div className="quiz-container quiz-container-modern">
              <p className="quiz-question-counter">
                {language === 'fr' ? 'Question' : 'Question'} {currentCardIndex + 1}/{safeTotalSteps - totalCustomExercises}
              </p>
              <h2 className="quiz-question">
                {quizWord.theme === 'pinyin'
                  ? language === 'fr'
                    ? 'Quel son entendez-vous ?'
                    : 'Which sound do you hear?'
                  : language === 'fr'
                    ? 'Quelle est la traduction de :'
                    : 'What is the translation of:'}
              </h2>

              <div className={`quiz-word ${quizWord.theme === 'pinyin' ? 'quiz-audio-only' : ''}`}>
                {quizWord.theme !== 'pinyin' && (
                  <>
                    <div className="quiz-hanzi">{quizWord.hanzi}</div>
                    <div className="quiz-pinyin">{quizWord.pinyin}</div>
                  </>
                )}
                <AudioButton src={`/${quizWord.audioLetter || quizWord.audio}`} label={language === 'fr' ? 'Écouter' : 'Listen'} />
              </div>

              {answered && (
                <div className={`quiz-answer-banner ${quizAnswers[currentCardIndex] ? 'success' : 'warning'}`}>
                  {quizAnswers[currentCardIndex]
                    ? language === 'fr'
                      ? 'Bonne réponse'
                      : 'Correct answer'
                    : language === 'fr'
                      ? 'La bonne réponse est en vert ci-dessous'
                      : 'Correct answer is highlighted in green'}
                </div>
              )}

              <div className="quiz-options">
                {options.map((option, index) => {
                  const isCorrect = option === correctTranslation;
                  const isSelected = quizSelections[currentCardIndex] === option;
                  const optionClass =
                    answered && isCorrect ? 'correct' : answered && isSelected && !isCorrect ? 'incorrect' : '';

                  return (
                    <button
                      key={`${option}-${index}`}
                      className={`quiz-option quiz-option-modern ${optionClass}`}
                      onClick={() => handleWordAnswer(option)}
                      disabled={answered}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="quiz-option-text">{option}</span>
                      {answered && isCorrect && <span className="quiz-option-status">✓</span>}
                      {answered && isSelected && !isCorrect && <span className="quiz-option-status">✗</span>}
                    </button>
                  );
                })}
              </div>

              <div className="lesson-bottom-actions">
                {currentCardIndex > 0 && !answered ? (
                  <button className="btn-secondary lesson-quiz-nav-btn" onClick={() => setCurrentCardIndex((prev) => prev - 1)}>
                    {language === 'fr' ? 'Précédent' : 'Previous'}
                  </button>
                ) : (
                  <span />
                )}
                {answered && (
                  <button className="btn-primary lesson-quiz-nav-btn" onClick={goToNextQuizQuestion}>
                    {currentCardIndex < totalQuizQuestions - 1
                      ? language === 'fr'
                        ? 'Suivant'
                        : 'Next'
                      : language === 'fr'
                        ? 'Terminer'
                        : 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const restartLesson = () => {
    setPhase('learn');
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setExplanationIndex(0);
    setQuizAnswers({});
    setQuizSelections({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const retryQuiz = () => {
    setPhase('quiz');
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setQuizSelections({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const quizScore = Object.values(quizAnswers).filter(Boolean).length;
  const exerciseScore = Object.values(exerciseResults).filter(Boolean).length;
  const score = quizScore + exerciseScore;
  const totalQuestions = totalQuizQuestions + totalCustomExercises;
  const safeTotal = Math.max(totalQuestions, 1);
  const percentage = Math.round((score / safeTotal) * 100);
  const passed = percentage >= 80;

  return (
    <div className="structured-lesson">
      {renderTopProgress(totalSteps, onExit)}
      <div className="lesson-phase-shell">
        <div className="completion-container completion-container-modern">
          <div className="completion-icon">⭐</div>
          <h1 className="completion-title">
            {passed
              ? language === 'fr'
                ? 'Excellent travail !'
                : 'Great work!'
              : language === 'fr'
                ? 'Bon effort !'
                : 'Good effort!'}
          </h1>
          <p className="completion-lesson-name">{language === 'fr' ? lesson.title : lesson.titleEn}</p>

          <div className="completion-score">
            <div className="completion-metric">
              <span>{percentage}%</span>
              <small>{language === 'fr' ? 'Score' : 'Score'}</small>
            </div>
            <div className="completion-metric xp">
              <span>+{estimatedXp}</span>
              <small>XP</small>
            </div>
            <div className="completion-metric correct">
              <span>{score}/{safeTotal}</span>
              <small>{language === 'fr' ? 'Correct' : 'Correct'}</small>
            </div>
          </div>

          {!passed && (
            <p className="completion-warning">
              {language === 'fr'
                ? 'Atteignez au moins 80% pour débloquer la prochaine leçon.'
                : 'Reach at least 80% to unlock the next lesson.'}
            </p>
          )}

          <div className="completion-actions">
            <button className="btn-secondary" onClick={onExit}>
              {language === 'fr' ? 'Retour aux leçons' : 'Back to lessons'}
            </button>
            {passed ? (
              <button
                className="btn-primary"
                onClick={() => {
                  const learnedIds = Array.from(new Set(lessonWords.map((word) => word.id)));
                  onComplete({ learnedWordIds: learnedIds, duration: lesson.duration });
                }}
              >
                {language === 'fr' ? 'Terminer' : 'Finish'} →
              </button>
            ) : (
              <>
                <button className="btn-secondary" onClick={restartLesson}>
                  {language === 'fr' ? 'Revoir la leçon' : 'Review lesson'}
                </button>
                <button className="btn-primary" onClick={retryQuiz}>
                  {language === 'fr' ? 'Reprendre le quiz' : 'Retry quiz'} →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
