/**
 * Tests de pronunciationService.compareTranscript — la fonction qui donne
 * le verdict après reconnaissance vocale. C'est la logique critique qui
 * impacte le feedback utilisateur, donc on couvre les cas tordus :
 *   - Égalité parfaite (hanzi exact)
 *   - Égalité avec ponctuation/espaces (normalisation)
 *   - Sous-chaîne (le user a dit le mot dans une phrase)
 *   - Fallback pinyin quand la transcription est en latin
 *   - Aucun match
 *   - Inputs vides ou pathologiques
 */

import { describe, it, expect } from 'vitest';
import { compareTranscript } from '../pronunciationService';

describe('compareTranscript', () => {
  describe('match exact en hanzi', () => {
    it('retourne match quand transcript == expectedHanzi', () => {
      const result = compareTranscript('你好', '你好');
      expect(result.verdict).toBe('match');
      expect(result.transcript).toBe('你好');
    });

    it('retourne match en ignorant la ponctuation et les espaces', () => {
      // Web Speech API ajoute parfois de la ponctuation chinoise
      const result = compareTranscript('你好。', '你好');
      expect(result.verdict).toBe('match');
    });

    it('retourne match en ignorant les espaces internes', () => {
      const result = compareTranscript('你 好', '你好');
      expect(result.verdict).toBe('match');
    });
  });

  describe('close (sous-chaîne)', () => {
    it('retourne close si le user a dit le mot dans une phrase', () => {
      // User attendu "你好", a dit "你好朋友"
      const result = compareTranscript('你好朋友', '你好');
      expect(result.verdict).toBe('close');
    });

    it('retourne close si le user a dit un fragment du mot attendu', () => {
      // User attendu "中国人", a dit "中国" (un préfixe valide mais incomplet)
      const result = compareTranscript('中国', '中国人');
      expect(result.verdict).toBe('close');
    });
  });

  describe('fallback pinyin', () => {
    it('matche via pinyin quand le hanzi diffère', () => {
      // Le moteur a peut-être transcrit en latin ; on tombe sur pinyin
      const result = compareTranscript('ni hao', '你好', 'nǐ hǎo');
      expect(result.verdict).toBe('match');
    });

    it('matche pinyin en ignorant les tons et la casse', () => {
      const result = compareTranscript('NI HAO', '你好', 'nǐ hǎo');
      expect(result.verdict).toBe('match');
    });

    it('matche pinyin en ignorant les espaces', () => {
      const result = compareTranscript('nihao', '你好', 'nǐ hǎo');
      expect(result.verdict).toBe('match');
    });

    it('retourne close si le pinyin est un préfixe du pinyin attendu', () => {
      const result = compareTranscript('ni', '你好', 'nǐ hǎo');
      expect(result.verdict).toBe('close');
    });
  });

  describe('mismatch', () => {
    it('retourne mismatch si transcript totalement différent', () => {
      const result = compareTranscript('再见', '你好');
      expect(result.verdict).toBe('mismatch');
    });

    it('retourne mismatch si pas de pinyin de fallback et hanzi différents', () => {
      const result = compareTranscript('zai jian', '你好');
      expect(result.verdict).toBe('mismatch');
    });
  });

  describe('cas pathologiques', () => {
    it('retourne mismatch si transcript vide', () => {
      const result = compareTranscript('', '你好');
      expect(result.verdict).toBe('mismatch');
      expect(result.transcript).toBe('');
    });

    it('retourne mismatch si expectedHanzi vide', () => {
      const result = compareTranscript('你好', '');
      expect(result.verdict).toBe('mismatch');
    });

    it('préserve la confidence brute', () => {
      const result = compareTranscript('你好', '你好', undefined, 0.95);
      expect(result.confidence).toBe(0.95);
    });

    it('retourne 0 par défaut pour la confidence', () => {
      const result = compareTranscript('你好', '你好');
      expect(result.confidence).toBe(0);
    });
  });

  describe('normalisation hanzi', () => {
    it('strippe les guillemets chinois', () => {
      const result = compareTranscript('"你好"', '你好');
      expect(result.verdict).toBe('match');
    });

    it('strippe les virgules chinoises', () => {
      const result = compareTranscript('你,好', '你好');
      expect(result.verdict).toBe('match');
    });

    it('expose la version normalisée pour debug', () => {
      const result = compareTranscript('你好。', '你 好');
      expect(result.expectedNormalized).toBe('你好');
      expect(result.actualNormalized).toBe('你好');
    });
  });
});
