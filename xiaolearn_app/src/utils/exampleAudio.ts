import { dictationPhrases } from '../data/dictation-phrases';
import type { LessonExample } from '../types';

const cleanupPattern = /[\s！？!？。．,.，、；;："“”'’`´·…-]/g;

const audioMap = new Map<string, string>();

const normalizeText = (text: string) =>
  text.replace(cleanupPattern, '').trim();

dictationPhrases.forEach((phrase) => {
  const key = normalizeText(phrase.hanzi);
  if (key && !audioMap.has(key)) {
    audioMap.set(key, phrase.audio);
  }
});

export const findExampleAudio = (text?: string) => {
  if (!text) return undefined;
  const normalized = normalizeText(text);
  return normalized ? audioMap.get(normalized) : undefined;
};

export const enrichExamplesWithAudio = (examples: LessonExample[]): LessonExample[] =>
  examples.map((example) => {
    if (example.audio) return example;
    const audio = findExampleAudio(example.hanzi);
    return audio ? { ...example, audio } : example;
  });
