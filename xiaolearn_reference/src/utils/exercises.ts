export interface ExerciseQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface GrammarPointLike {
  title: string;
  elements: string[];
  examples: Array<{ chinese: string; french: string }>;
  usage: string[];
}

interface NuanceLike {
  words: string[];
  pinyin: string[];
  html: string;
}

const GENERIC_CHINESE_OPTIONS = ['不', '没', '的', '了', '在', '是', '会', '能', '可以', '就'];

function cleanText(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function extractChineseTokens(value: string): string[] {
  const chunks = value.match(/[\u4e00-\u9fff]+/g) ?? [];
  return dedupe(chunks).filter((chunk) => chunk.length <= 4);
}

function buildOptions(
  answer: string,
  candidates: string[],
  questionIndex: number,
  includeGenericOptions = true,
): string[] {
  const pool = dedupe([answer].concat(candidates.filter((candidate) => candidate !== answer)).concat(
    includeGenericOptions ? GENERIC_CHINESE_OPTIONS.filter((candidate) => candidate !== answer) : [],
  ));
  const size = Math.min(Math.max(2, pool.length), 4);
  const base = pool.slice(0, size);
  if (base.length <= 1) return base;
  const shift = questionIndex % base.length;
  return base.slice(shift).concat(base.slice(0, shift));
}

function buildClozeQuestion(
  sentence: string,
  translation: string,
  answer: string,
  optionsPool: string[],
  questionIndex: number,
  includeGenericOptions = true,
): ExerciseQuestion | null {
  if (!sentence.includes(answer)) return null;
  const clozeSentence = sentence.replace(answer, '____');
  const options = buildOptions(answer, optionsPool, questionIndex, includeGenericOptions);
  const correctIndex = options.indexOf(answer);
  if (correctIndex === -1) return null;

  return {
    prompt: `${clozeSentence}\n(${translation})`,
    options,
    correctIndex,
    explanation: `Phrase complète : ${sentence}`,
  };
}

function extractNuanceExamples(html: string): Array<{ chinese: string; french: string }> {
  const matches = Array.from(
    html.matchAll(
      /<div\s+class=["']ex["'][\s\S]*?<div\s+class=["']zh["']>([\s\S]*?)<\/div>(?:[\s\S]*?<div\s+class=["'](?:py|pinyin)["']>[\s\S]*?<\/div>)?[\s\S]*?<div\s+class=["']fr["']>([\s\S]*?)<\/div>[\s\S]*?<\/div>/gi,
    ),
  );

  return matches
    .map((match) => ({
      chinese: cleanText(match[1]),
      french: cleanText(match[2]),
    }))
    .filter((item) => item.chinese && item.french);
}

export function buildNuanceExercises(nuance: NuanceLike): ExerciseQuestion[] {
  const words = dedupe(nuance.words);
  const examples = extractNuanceExamples(nuance.html);
  const questions: ExerciseQuestion[] = [];

  for (const example of examples) {
    for (const word of words) {
      if (!example.chinese.includes(word)) continue;
      const question = buildClozeQuestion(
        example.chinese,
        example.french,
        word,
        words,
        questions.length,
        false,
      );
      if (!question) continue;
      if (!questions.some((item) => item.prompt === question.prompt)) {
        questions.push(question);
      }
      break;
    }
    if (questions.length >= 6) break;
  }

  // Fallback: quick recognition if the file has too few exploitable examples.
  if (questions.length < 3) {
    for (let i = 0; i < words.length; i += 1) {
      const answer = words[i];
      const options = buildOptions(answer, words, questions.length, false);
      const correctIndex = options.indexOf(answer);
      if (correctIndex === -1) continue;

      const pinyin = nuance.pinyin[i] || '';
      const prompt = pinyin
        ? `Quel mot correspond au pinyin « ${pinyin} » ?`
        : `Quel mot est correct dans cette nuance ?`;

      questions.push({
        prompt,
        options,
        correctIndex,
        explanation: `${answer}${pinyin ? ` (${pinyin})` : ''}`,
      });

      if (questions.length >= 4) break;
    }
  }

  return questions.slice(0, 6);
}

export function buildGrammarPointExercises(point: GrammarPointLike): ExerciseQuestion[] {
  const elementTokens = dedupe(point.elements.flatMap((element) => extractChineseTokens(element)));
  const titleTokens = extractChineseTokens(point.title);
  const optionsPool = dedupe(elementTokens.concat(titleTokens));
  const questions: ExerciseQuestion[] = [];

  for (const example of point.examples) {
    const answer = optionsPool.find((token) => example.chinese.includes(token));
    if (!answer) continue;
    const question = buildClozeQuestion(
      example.chinese,
      example.french,
      answer,
      optionsPool,
      questions.length,
    );
    if (!question) continue;
    if (!questions.some((item) => item.prompt === question.prompt)) {
      questions.push(question);
    }
    if (questions.length >= 6) break;
  }

  if (questions.length < 3) {
    const fallbackOptions = optionsPool.length > 0 ? optionsPool : ['在', '了', '不', '没'];
    const usage = point.usage.length > 0 ? point.usage : ['Appliquer la règle de la fiche.'];

    usage.slice(0, 4).forEach((item, index) => {
      const answer = fallbackOptions[index % fallbackOptions.length];
      const options = buildOptions(answer, fallbackOptions, questions.length);
      const correctIndex = options.indexOf(answer);
      if (correctIndex === -1) return;

      questions.push({
        prompt: `Quel élément complète le mieux cette règle ?\n${item}`,
        options,
        correctIndex,
        explanation: `Élément attendu : ${answer}`,
      });
    });
  }

  return questions.slice(0, 6);
}
