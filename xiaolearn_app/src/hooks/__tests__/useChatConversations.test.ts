/**
 * Tests des helpers de sanitisation de useChatConversations.
 *
 * On NE TESTE PAS le hook lui-même (il dépend de localStorage + Firestore,
 * il faudrait des mocks lourds). On teste juste les helpers purs
 * sanitizeMessage / sanitizeConv qui sont responsables de retirer les
 * blocs <<<CORRECTIONS>>>...<<<END>>> des anciens messages stockés en
 * historique (migration silencieuse côté load).
 */

import { describe, it, expect } from 'vitest';
import {
  sanitizeMessage,
  sanitizeConv,
  type ChatConversation,
  type ChatMessage
} from '../useChatConversations';

const buildMessage = (overrides: Partial<ChatMessage> = {}): ChatMessage => ({
  id: 'msg-1',
  role: 'assistant',
  content: '',
  createdAt: Date.now(),
  ...overrides
});

const buildConv = (
  messages: ChatMessage[],
  overrides: Partial<ChatConversation> = {}
): ChatConversation => ({
  id: 'conv-1',
  title: 'Test',
  messages,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides
});

describe('sanitizeMessage', () => {
  it('strippe le bloc CORRECTIONS dans un message assistant', () => {
    const msg = buildMessage({
      role: 'assistant',
      content: 'Bonjour ! Voici ta correction.\n<<<CORRECTIONS>>>{"corrections":[]}<<<END>>>'
    });
    const cleaned = sanitizeMessage(msg);
    expect(cleaned.content).toBe('Bonjour ! Voici ta correction.');
    expect(cleaned.content).not.toContain('CORRECTIONS');
    expect(cleaned.content).not.toContain('END');
  });

  it("préserve un message assistant sans bloc CORRECTIONS (référence identique)", () => {
    const msg = buildMessage({
      role: 'assistant',
      content: 'Texte propre sans marqueur.'
    });
    const cleaned = sanitizeMessage(msg);
    // Optimisation : retourne la même référence quand pas de changement
    expect(cleaned).toBe(msg);
  });

  it('ne touche pas un message user (même avec marqueur dans le contenu)', () => {
    // Cas pathologique : le user a copié-collé du contenu LLM dans sa question.
    // On laisse intact (c'est le contenu user, on ne sait pas si c'est volontaire).
    const msg = buildMessage({
      role: 'user',
      content: 'Pourquoi tu me mets <<<CORRECTIONS>>>{}<<<END>>> ?'
    });
    const cleaned = sanitizeMessage(msg);
    expect(cleaned).toBe(msg);
    expect(cleaned.content).toContain('CORRECTIONS');
  });

  it('strippe plusieurs blocs CORRECTIONS dans le même message', () => {
    const msg = buildMessage({
      role: 'assistant',
      content:
        'Avant.\n<<<CORRECTIONS>>>{}<<<END>>>\nMilieu.\n<<<CORRECTIONS>>>{}<<<END>>>\nAprès.'
    });
    const cleaned = sanitizeMessage(msg);
    expect(cleaned.content).not.toContain('CORRECTIONS');
    expect(cleaned.content).toContain('Avant.');
    expect(cleaned.content).toContain('Milieu.');
    expect(cleaned.content).toContain('Après.');
  });

  it('strippe un bloc multi-lignes avec JSON formaté', () => {
    const msg = buildMessage({
      role: 'assistant',
      content: `Voici ta phrase corrigée.

<<<CORRECTIONS>>>
{
  "corrections": [
    {"wrong": "妈", "correct": "骂", "explanation": "ton 4"}
  ]
}
<<<END>>>`
    });
    const cleaned = sanitizeMessage(msg);
    expect(cleaned.content).toBe('Voici ta phrase corrigée.');
  });

  it('strippe même si le bloc est tout seul (message ne contenait que ça)', () => {
    const msg = buildMessage({
      role: 'assistant',
      content: '<<<CORRECTIONS>>>{}<<<END>>>'
    });
    const cleaned = sanitizeMessage(msg);
    expect(cleaned.content).toBe('');
  });
});

describe('sanitizeConv', () => {
  it("applique sanitizeMessage à tous les messages de la conv", () => {
    const conv = buildConv([
      buildMessage({
        id: 'm1',
        role: 'user',
        content: 'Comment dit-on bonjour ?'
      }),
      buildMessage({
        id: 'm2',
        role: 'assistant',
        content: '你好.\n<<<CORRECTIONS>>>{}<<<END>>>'
      }),
      buildMessage({
        id: 'm3',
        role: 'assistant',
        content: 'Pas de marqueur ici.'
      })
    ]);

    const cleaned = sanitizeConv(conv);
    expect(cleaned.messages).toHaveLength(3);
    expect(cleaned.messages[0].content).toBe('Comment dit-on bonjour ?'); // user, intact
    expect(cleaned.messages[1].content).toBe('你好.'); // assistant, strippé
    expect(cleaned.messages[2].content).toBe('Pas de marqueur ici.'); // assistant, intact
  });

  it("préserve les autres champs de la conv (id, title, dates, pinned)", () => {
    const conv = buildConv(
      [
        buildMessage({
          role: 'assistant',
          content: 'Test.\n<<<CORRECTIONS>>>{}<<<END>>>'
        })
      ],
      {
        id: 'special-id',
        title: 'Quick chat',
        pinned: 'quick-chat',
        createdAt: 1234,
        updatedAt: 5678
      }
    );

    const cleaned = sanitizeConv(conv);
    expect(cleaned.id).toBe('special-id');
    expect(cleaned.title).toBe('Quick chat');
    expect(cleaned.pinned).toBe('quick-chat');
    expect(cleaned.createdAt).toBe(1234);
    expect(cleaned.updatedAt).toBe(5678);
  });

  it("gère une conv sans messages", () => {
    const conv = buildConv([]);
    const cleaned = sanitizeConv(conv);
    expect(cleaned.messages).toEqual([]);
  });
});
