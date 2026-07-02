/*
 * Stub minimal pour hanzi-writer en attendant `npm install`.
 * Une fois la lib installée, ses propres types (livrés dans le package)
 * prennent le pas via la résolution `node_modules/hanzi-writer/index.d.ts`.
 * On peut alors supprimer ce fichier sans risque.
 */

declare module 'hanzi-writer' {
  export interface QuizCompleteSummary {
    character: string;
    totalMistakes: number;
    strokesMistakes?: number[];
  }

  export interface QuizOptions {
    onComplete?: (summary: QuizCompleteSummary) => void;
    onMistake?: (info: { strokeNum: number; mistakesOnStroke: number }) => void;
    onCorrectStroke?: (info: { strokeNum: number }) => void;
    leniency?: number;
    showHintAfterMisses?: number;
  }

  export interface HanziWriterInstance {
    cancelQuiz(): void;
    hideCharacter(): void;
    showCharacter(): void;
    animateCharacter(opts?: { onComplete?: () => void }): void;
    quiz(opts?: QuizOptions): void;
  }

  export interface HanziWriterOptions {
    width?: number;
    height?: number;
    padding?: number;
    showCharacter?: boolean;
    showOutline?: boolean;
    showHintAfterMisses?: number;
    strokeAnimationSpeed?: number;
    delayBetweenStrokes?: number;
    strokeColor?: string;
    outlineColor?: string;
    radicalColor?: string;
    drawingColor?: string;
    charDataLoader?: (
      char: string,
      onComplete: (data: unknown) => void
    ) => void;
  }

  const HanziWriter: {
    create(
      element: HTMLElement | string,
      character: string,
      options?: HanziWriterOptions
    ): HanziWriterInstance;
    loadCharacterData(char: string): Promise<unknown>;
  };
  export default HanziWriter;
}
