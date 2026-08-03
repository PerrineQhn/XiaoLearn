/**
 * Correction des rédactions HSK 5 et 6.
 *
 * L'expression écrite de ces deux niveaux ne se corrige pas par QCM : HSK 5
 * demande un texte d'environ 80 caractères sur un thème, HSK 6 un résumé
 * (缩写) d'environ 400 caractères. Un simulateur qui sauterait cette section,
 * ou qui la noterait au forfait, mentirait sur le score final — la rédaction
 * pèse 100 des 300 points.
 *
 * On la soumet donc au moteur de langue déjà utilisé par Prof. Xiao, avec la
 * grille officielle. La note obtenue est **indicative** : elle vaut comme
 * retour pédagogique, pas comme barème certifiant, et l'écran le dit.
 *
 * En cas d'échec réseau, on ne bloque pas la copie : la section est rendue avec
 * une note nulle et un message explicite. Perdre l'ensemble de l'épreuve parce
 * qu'une requête a échoué serait pire que l'absence de note.
 */
import { callLlmProxy } from './llmProxyClient';

export interface EssayGrade {
  /** 0 à 100, à l'échelle de la section d'expression écrite. */
  score: number;
  /** Retour rédigé dans la langue de l'interface. */
  feedback: string;
  /** false si la correction n'a pas pu aboutir — score non significatif. */
  graded: boolean;
}

const CRITERIA = `Critères officiels du HSK pour l'expression écrite :
- CONTENU : le sujet est traité, les idées sont pertinentes et développées.
- LANGUE : lexique et grammaire du niveau visé, correction des caractères.
- STRUCTURE : organisation, connecteurs, longueur demandée respectée.`;

export async function gradeEssay(opts: {
  level: 'hsk5' | 'hsk6';
  /** Thème (HSK 5) ou texte à résumer (HSK 6). */
  subject: string;
  answer: string;
  lang: 'fr' | 'en';
}): Promise<EssayGrade> {
  const { level, subject, answer, lang } = opts;
  const expected = level === 'hsk6' ? 400 : 80;

  if (answer.trim().length === 0) {
    return { score: 0, graded: true, feedback: lang === 'en' ? 'No answer submitted.' : 'Aucune réponse rendue.' };
  }

  const system = `Tu es correcteur officiel du HSK ${level === 'hsk6' ? 6 : 5}.
${CRITERIA}
Longueur attendue : environ ${expected} caractères chinois.
${level === 'hsk6'
    ? "L'exercice est un 缩写 : le candidat doit RÉSUMER le texte fourni, sans y ajouter d'opinion."
    : "L'exercice est une rédaction courte sur le thème fourni."}

Réponds UNIQUEMENT par un objet JSON, sans texte autour :
{"score": <entier 0-100>, "feedback": "<3 à 5 phrases en ${lang === 'en' ? 'anglais' : 'français'}, ce qui va et ce qui ne va pas, avec un exemple précis tiré de la copie>"}`;

  try {
    const { text } = await callLlmProxy({
      systemPrompt: system,
      history: [],
      userMessage: `SUJET :\n${subject}\n\nCOPIE DU CANDIDAT :\n${answer}`,
      generationConfig: { temperature: 0.2, maxOutputTokens: 700, topK: 40, topP: 0.9 },
    });

    // Le modèle encadre parfois le JSON de balises Markdown.
    const raw = text.replace(/```json|```/g, '').trim();
    const start = raw.indexOf('{');
    const parsed = JSON.parse(raw.slice(start >= 0 ? start : 0, raw.lastIndexOf('}') + 1));
    const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score))));
    if (!Number.isFinite(score)) throw new Error('score absent');

    return { score, graded: true, feedback: String(parsed.feedback ?? '') };
  } catch {
    return {
      score: 0,
      graded: false,
      feedback: lang === 'en'
        ? 'The essay could not be marked (network or service issue). The rest of your paper is unaffected.'
        : "La rédaction n'a pas pu être corrigée (réseau ou service). Le reste de ta copie n'est pas affecté.",
    };
  }
}
