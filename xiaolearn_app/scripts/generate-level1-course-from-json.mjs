import fs from 'node:fs';
import path from 'node:path';

const sourcePath = process.argv[2];
const outputPath = process.argv[3] ?? path.resolve('xiaolearn_app/src/data/level1-course.ts');

if (!sourcePath) {
  console.error('Usage: node generate-level1-course-from-json.mjs <source-json-path> [output-ts-path]');
  process.exit(1);
}

const raw = fs.readFileSync(sourcePath, 'utf8');
const data = JSON.parse(raw);

const trackMetaById = {
  'zh-l1-track-alphabet': {
    icon: '🔤',
    color: '#8b5cf6',
    category: 'pronunciation',
    description: 'Maitriser les bases du pinyin : voyelles, consonnes et tons.'
  },
  'zh-l1-track-conversation': {
    icon: '💬',
    color: '#ec4899',
    category: 'conversation',
    description: 'Expressions essentielles pour les interactions du quotidien.'
  },
  'zh-l1-track-grammar': {
    icon: '📘',
    color: '#3b82f6',
    category: 'grammar',
    description: 'Construire des phrases correctes avec les structures fondamentales.'
  },
  'zh-l1-track-numbers': {
    icon: '🔢',
    color: '#f59e0b',
    category: 'vocabulary',
    description: 'Compter, donner l heure, l age et les dates.'
  },
  'zh-l1-track-verbs': {
    icon: '⚙️',
    color: '#10b981',
    category: 'grammar',
    description: 'Exprimer present, passe et futur avec les verbes et modaux.'
  }
};

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const asString = (value) => (typeof value === 'string' ? value.trim() : '');
const pad2 = (n) => String(n).padStart(2, '0');

const trackOrder = [...(data.tracks ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const level1LessonWordBank = {};
const level1LessonExercises = {};

const buildEntries = (lesson) => {
  const content = lesson.content ?? {};
  const items = Array.isArray(content.items) ? content.items : [];
  const examples = Array.isArray(content.examples) ? content.examples : [];
  const entries = [];

  for (const item of items) {
    const hanzi = asString(item.hanzi);
    const pinyin = asString(item.pinyin);
    const translationFr = asString(item.translationFr);
    if (!hanzi && !pinyin) continue;
    entries.push({
      hanzi: hanzi || pinyin,
      pinyin,
      translationFr: translationFr || hanzi || pinyin,
      notes: asString(item.notes)
    });
  }

  for (const example of examples) {
    const hanzi = asString(example.chinese || example.hanzi);
    const pinyin = asString(example.pinyin);
    const translationFr = asString(example.translationFr || example.translation);
    if (!hanzi && !pinyin) continue;
    entries.push({
      hanzi: hanzi || pinyin,
      pinyin,
      translationFr: translationFr || hanzi || pinyin,
      notes: asString(example.notes)
    });
  }

  if (entries.length === 0 && Array.isArray(content.patterns)) {
    for (const pattern of content.patterns) {
      const hanzi = asString(pattern.example || pattern.pattern);
      const translationFr = asString(pattern.pattern || pattern.example);
      if (!hanzi) continue;
      entries.push({ hanzi, pinyin: '', translationFr, notes: '' });
    }
  }

  return entries;
};

const buildChoices = (correct, pool) => {
  const distractors = uniq(pool.filter((choice) => choice !== correct)).slice(0, 3);
  return [correct, ...distractors];
};

const level1LessonPaths = trackOrder.map((track) => {
  const trackMeta = trackMetaById[track.id] ?? {
    icon: '📚',
    color: '#64748b',
    category: 'conversation',
    description: track.title
  };

  const sortedLessons = [...(track.lessons ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const pathLessons = sortedLessons.map((lesson) => {
    const quickIntro = asString(lesson.quickIntro || lesson.introduction || lesson.lessonIntro);
    const lessonIntro = asString(lesson.lessonIntro || lesson.introduction || lesson.quickIntro);
    const keyPoints = Array.isArray(lesson.content?.keyPoints)
      ? lesson.content.keyPoints.map((point) => asString(point)).filter(Boolean)
      : [];

    const entries = buildEntries(lesson);
    const translationPool = entries.map((entry) => entry.translationFr);
    const lessonTags = uniq([...(lesson.tags ?? []), track.id]).map((tag) => String(tag));

    const wordBank = entries.map((entry, index) => {
      const itemId = `${lesson.id}-w${pad2(index + 1)}`;
      const translation = entry.translationFr;
      const choices = buildChoices(translation, translationPool);
      return {
        id: itemId,
        level: 'hsk1',
        hanzi: entry.hanzi,
        pinyin: entry.pinyin,
        translation,
        translationFr: translation,
        category: trackMeta.category,
        ...(entry.notes ? { explanation: entry.notes } : {}),
        examples: [
          {
            hanzi: entry.hanzi,
            pinyin: entry.pinyin,
            translation,
            translationFr: translation
          }
        ],
        quiz: {
          prompt: `Selectionne la bonne traduction pour « ${entry.hanzi} »`,
          choices,
          correctChoiceIndex: 0
        },
        tags: [...lessonTags, `lesson:${lesson.id}`],
        theme: track.title
      };
    });

    level1LessonWordBank[lesson.id] = wordBank;

    const exercises = [];
    if (wordBank.length > 0) {
      const first = wordBank[0];
      exercises.push({
        id: `${lesson.id}-mcq-meaning`,
        type: 'text-mcq',
        promptFr: `Que signifie « ${first.hanzi} » ?`,
        promptEn: `What does "${first.hanzi}" mean?`,
        choices: first.quiz.choices,
        correctChoiceIndex: 0,
        explanationFr: `« ${first.hanzi} » signifie « ${first.translationFr} » .`,
        explanationEn: `"${first.hanzi}" means "${first.translation}".`
      });

      const target = wordBank[Math.min(1, wordBank.length - 1)];
      const formChoices = uniq([target.hanzi, ...wordBank.map((item) => item.hanzi).filter((hanzi) => hanzi !== target.hanzi)]).slice(0, 4);
      exercises.push({
        id: `${lesson.id}-mcq-form`,
        type: 'text-mcq',
        promptFr: `Quelle expression correspond a « ${target.translationFr} » ?`,
        promptEn: `Which expression matches "${target.translation}"?`,
        choices: formChoices,
        correctChoiceIndex: 0,
        explanationFr: `La bonne reponse est « ${target.hanzi} » .`,
        explanationEn: `The correct answer is "${target.hanzi}".`
      });

      const sourceExample = (Array.isArray(lesson.content?.examples) && lesson.content.examples[0]) || null;
      const sentence = asString(sourceExample?.chinese || sourceExample?.hanzi || target.hanzi);
      const sentencePinyin = asString(sourceExample?.pinyin || target.pinyin);
      const sentenceTranslation = asString(sourceExample?.translationFr || sourceExample?.translation || target.translationFr);
      const sentenceTokens = sentence.includes(' ') ? sentence.split(/\s+/).filter(Boolean) : Array.from(sentence).filter(Boolean);
      exercises.push({
        id: `${lesson.id}-rebuild`,
        type: 'grammar',
        quiz: {
          type: 'sentence-reconstruction',
          translation: sentenceTranslation || target.translationFr,
          translationEn: sentenceTranslation || target.translation,
          words: sentenceTokens,
          correctOrder: sentenceTokens,
          pinyin: sentencePinyin
        }
      });
    }

    level1LessonExercises[lesson.id] = exercises;

    const flashcards = wordBank.map((entry) => entry.hanzi);

    return {
      id: lesson.id,
      title: lesson.title,
      titleEn: lesson.title,
      duration: Number(lesson.durationMin || data.course?.defaultLessonDurationMin || 15),
      completed: false,
      locked: false,
      hskLevel: 1,
      category: trackMeta.category,
      difficulty: 'beginner',
      tags: lessonTags,
      introduction: {
        title: lesson.title,
        titleEn: lesson.title,
        content: quickIntro,
        contentEn: quickIntro,
        quickIntro,
        quickIntroEn: quickIntro,
        lessonIntro,
        lessonIntroEn: lessonIntro,
        objectives: keyPoints,
        objectivesEn: keyPoints
      },
      flashcards,
      quizQuestions: flashcards.length > 0 ? flashcards.length : 3
    };
  });

  return {
    id: track.id,
    name: track.title,
    nameEn: track.title,
    description: trackMeta.description,
    descriptionEn: trackMeta.description,
    icon: trackMeta.icon,
    color: trackMeta.color,
    lessons: pathLessons
  };
});

const fileContent = `import type { LessonExercise, LessonItem } from '../types';\nimport type { LessonPath } from '../types/lesson-structure';\n\nexport const level1LessonPaths: LessonPath[] = ${JSON.stringify(level1LessonPaths, null, 2)};\n\nexport const level1LessonWordBank: Record<string, LessonItem[]> = ${JSON.stringify(level1LessonWordBank, null, 2)};\n\nexport const level1LessonExercises: Record<string, LessonExercise[]> = ${JSON.stringify(level1LessonExercises, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Generated ${outputPath}`);
