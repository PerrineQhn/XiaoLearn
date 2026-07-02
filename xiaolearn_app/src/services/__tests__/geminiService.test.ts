/**
 * Tests de geminiService.parseCorrectionsBlock — parse les réponses brutes
 * du LLM pour en extraire les corrections structurées.
 *
 * Cas couverts :
 *   - Réponse sans bloc CORRECTIONS (cas le plus fréquent)
 *   - Bloc présent et bien formé
 *   - Bloc avec JSON malformé (robustesse)
 *   - Bloc vide
 *   - Champs manquants dans les corrections
 *   - Strip du bloc dans le texte visible
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseCorrectionsBlock } from '../geminiService';

describe('parseCorrectionsBlock', () => {
  // Mute les warnings JSON parse — on les teste explicitement plus bas
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('sans bloc CORRECTIONS', () => {
    it('retourne le texte brut + corrections vides', () => {
      const raw = 'Bonjour ! Voici comment dire merci en chinois.';
      const result = parseCorrectionsBlock(raw);
      expect(result.text).toBe(raw);
      expect(result.corrections).toEqual([]);
    });

    it('trim le texte', () => {
      const result = parseCorrectionsBlock('   Hello   ');
      expect(result.text).toBe('Hello');
    });

    it('gère une chaîne vide', () => {
      const result = parseCorrectionsBlock('');
      expect(result.text).toBe('');
      expect(result.corrections).toEqual([]);
    });
  });

  describe('avec bloc CORRECTIONS bien formé', () => {
    it('extrait une correction simple', () => {
      const raw = `Voici ta phrase.
<<<CORRECTIONS>>>
{"corrections":[{"category":"particule","wrong":"帮忙我","correct":"帮我","explanation":"帮忙 est intransitif."}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toHaveLength(1);
      expect(result.corrections[0]).toMatchObject({
        category: 'particule',
        wrong: '帮忙我',
        correct: '帮我',
        explanation: '帮忙 est intransitif.'
      });
    });

    it('retire le bloc du texte visible', () => {
      const raw = `Voici ta phrase.
<<<CORRECTIONS>>>
{"corrections":[{"category":"x","wrong":"a","correct":"b","explanation":"c"}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.text).toBe('Voici ta phrase.');
      expect(result.text).not.toContain('CORRECTIONS');
      expect(result.text).not.toContain('END');
    });

    it('extrait plusieurs corrections', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[
  {"category":"ton","wrong":"妈","correct":"骂","explanation":"ton 4 vs ton 1"},
  {"category":"mesure","wrong":"一书","correct":"一本书","explanation":"manque le classificateur"}
]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toHaveLength(2);
    });

    it('défaut severity = importante', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[{"category":"x","wrong":"a","correct":"b","explanation":"c"}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections[0].severity).toBe('importante');
    });

    it('préserve severity explicite', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[{"category":"x","wrong":"a","correct":"b","severity":"mineure","explanation":"c"}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections[0].severity).toBe('mineure');
    });

    it('défaut category = autre si absent', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[{"wrong":"a","correct":"b","explanation":"c"}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections[0].category).toBe('autre');
    });

    it('extrait pinyin et translation optionnels', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[{"category":"x","wrong":"a","correct":"b","pinyin":"bāng wǒ","translation":"aide-moi","explanation":"c"}]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections[0].pinyin).toBe('bāng wǒ');
      expect(result.corrections[0].translation).toBe('aide-moi');
    });
  });

  describe('robustesse aux JSON malformés', () => {
    it('JSON malformé → corrections vides', () => {
      const raw = `Texte.
<<<CORRECTIONS>>>
{not valid json}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toEqual([]);
      // Le texte visible doit quand même être strippé du bloc
      expect(result.text).toBe('Texte.');
    });

    it('JSON sans clé "corrections" → vide', () => {
      const raw = `<<<CORRECTIONS>>>
{"other": "thing"}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toEqual([]);
    });

    it('corrections pas un array → vide', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections": "not an array"}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toEqual([]);
    });

    it('filtre les corrections sans wrong/correct/explanation', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[
  {"category":"x","wrong":"a","correct":"b","explanation":"c"},
  {"category":"y","wrong":"","correct":"b","explanation":"c"},
  {"category":"z","wrong":"a","correct":"","explanation":"c"},
  {"category":"w","wrong":"a","correct":"b","explanation":""}
]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      // Seule la première correction est valide
      expect(result.corrections).toHaveLength(1);
      expect(result.corrections[0].category).toBe('x');
    });
  });

  describe('cas avec bloc vide', () => {
    it('corrections array vide → []', () => {
      const raw = `<<<CORRECTIONS>>>
{"corrections":[]}
<<<END>>>`;
      const result = parseCorrectionsBlock(raw);
      expect(result.corrections).toEqual([]);
    });
  });
});
