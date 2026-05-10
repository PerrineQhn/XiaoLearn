/**
 * quizGeneratorService.ts — Phase 3B IA.
 * Demande à Gemini de générer un quiz de N questions (QCM 4 choix) sur un
 * thème + niveau donné. Format JSON strict pour parsing fiable côté client.
 *
 * Le quiz généré est éphémère (pas persisté). L'utilisateur peut en générer
 * un nouveau autant de fois qu'il veut.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface AiQuizQuestion {
  /** Question en français (consigne pédagogique). */
  prompt: string;
  /** Phrase chinoise / contexte si applicable (avec ___ pour les fill). */
  sentence?: string;
  /** 4 options de réponse. */
  choices: string[];
  /** Index (0-3) de la bonne réponse. */
  correctIndex: number;
  /** Brève explication pédagogique de la bonne réponse. */
  explanation: string;
}

export interface AiQuiz {
  topic: string;
  level: string;
  questions: AiQuizQuestion[];
}

const QUIZ_PROMPT = (topic: string, level: string, count: number) => `Tu es un concepteur d'exercices pour apprenants francophones de chinois mandarin de niveau ${level} (CECR).

Génère un quiz de ${count} questions à choix multiples (QCM, 4 choix par question) sur le thème suivant :
"""
${topic}
"""

Réponds UNIQUEMENT par un objet JSON valide, sans markdown, sans backticks, exactement dans ce format :

{
  "topic": "${topic}",
  "level": "${level}",
  "questions": [
    {
      "prompt": "Consigne en français (ex: 'Choisis la bonne traduction de…' ou 'Complète la phrase avec…')",
      "sentence": "Phrase en chinois si pertinente, peut contenir ___ pour fill, sinon vide ou omise",
      "choices": ["choix1", "choix2", "choix3", "choix4"],
      "correctIndex": 0,
      "explanation": "Brève explication pédagogique en français (1-2 phrases)"
    }
  ]
}

RÈGLES :
- Génère exactement ${count} questions.
- Mélange types : vocabulaire, grammaire, choix de mots, ordre des mots, traduction.
- Adapte la difficulté STRICTEMENT au niveau ${level}.
- Les choix doivent être PLAUSIBLES (pas évident, pas absurde) pour forcer la réflexion.
- L'index correct doit être ALÉATOIRE (varie 0/1/2/3 entre les questions, pas toujours 0).
- Les choix peuvent être en hanzi seul, ou en hanzi + pinyin entre parenthèses. Sois consistant dans une même question.
- L'explication doit ENSEIGNER (pourquoi c'est juste, ou la règle), pas juste répéter la réponse.
- JSON STRICT : pas de virgule traînante, guillemets droits, échappements corrects.`;

export async function generateAiQuiz(
  topic: string,
  level: string,
  count: number = 10
): Promise<AiQuiz> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }
  const trimmedTopic = topic.trim();
  if (!trimmedTopic) {
    throw new Error('Empty topic');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: QUIZ_PROMPT(trimmedTopic, level, count) }]
        }
      ],
      generationConfig: {
        temperature: 0.7, // un peu de variabilité pour des questions diverses
        topK: 40,
        topP: 0.95,
        // 10 questions × ~150 tokens = ~1500. On donne de la marge pour éviter
        // les troncatures qui invalident le JSON.
        maxOutputTokens: 4096,
        responseMimeType: 'application/json'
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error('Gemini quiz error:', errorBody);
    throw new Error(
      errorBody?.error?.message || `Gemini API error: ${response.status}`
    );
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  let parsed: Partial<AiQuiz>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    console.warn('Quiz: invalid JSON from Gemini:', text);
    throw new Error('Format de réponse invalide. Réessaie.');
  }

  // Validation défensive : s'assure que chaque question est bien formée.
  const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : [];
  const validQuestions: AiQuizQuestion[] = rawQuestions
    .filter((q): q is AiQuizQuestion => {
      if (!q || typeof q !== 'object') return false;
      if (typeof q.prompt !== 'string' || !q.prompt) return false;
      if (!Array.isArray(q.choices) || q.choices.length !== 4) return false;
      if (typeof q.correctIndex !== 'number') return false;
      if (q.correctIndex < 0 || q.correctIndex > 3) return false;
      if (!q.choices.every((c) => typeof c === 'string')) return false;
      return true;
    })
    .map((q) => ({
      prompt: q.prompt,
      sentence: typeof q.sentence === 'string' ? q.sentence : undefined,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: typeof q.explanation === 'string' ? q.explanation : ''
    }));

  if (validQuestions.length === 0) {
    throw new Error('Aucune question valide générée. Réessaie.');
  }

  return {
    topic: typeof parsed.topic === 'string' ? parsed.topic : trimmedTopic,
    level: typeof parsed.level === 'string' ? parsed.level : level,
    questions: validQuestions
  };
}
