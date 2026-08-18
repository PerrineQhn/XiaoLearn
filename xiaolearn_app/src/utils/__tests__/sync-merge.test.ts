/**
 * Ce que ce fichier vérifie, et pourquoi ces propriétés-là.
 *
 * Une fusion sûre pour de la synchronisation multi-appareils doit satisfaire
 * trois propriétés. Elles ne sont pas décoratives : chacune correspond à un
 * scénario qui a réellement fait perdre des données.
 *
 *   idempotence   f(x, x) = x
 *                 Deux appareils déjà d'accord ne doivent pas produire
 *                 d'écriture. Sans ça, chaque reconcile repousse une valeur
 *                 « nouvelle », les onSnapshot se répondent, et la boucle
 *                 tourne indéfiniment.
 *
 *   commutativité f(a, b) = f(b, a)
 *                 Le résultat ne doit pas dépendre de qui parle en premier.
 *                 C'est ce qui rend l'ordre d'arrivée des appareils sans
 *                 importance — et donc les courses inoffensives.
 *
 *   croissance    f(a, b) ⊇ a  et  f(a, b) ⊇ b
 *                 Le résultat n'est jamais plus pauvre que ce qu'on avait.
 *                 C'est la propriété qui aurait empêché le 18 août : une
 *                 liste vide fusionnée avec 49 leçons rend 49 leçons.
 *
 * Le cas nommé « vide contre plein » rejoue littéralement l'incident, avec
 * les valeurs relevées dans le document de production.
 */
import { describe, it, expect } from 'vitest';
import { MERGERS, estVide } from '../sync-merge';

/** Nombre de feuilles porteuses d'information — mesure de « richesse ». */
function richesse(raw: string | null): number {
  if (raw == null) return 0;
  let v: unknown;
  try { v = JSON.parse(raw); } catch { return 1; }
  const compte = (x: unknown, d = 0): number => {
    if (d > 12) return 1;
    if (x === null || x === undefined || x === false || x === 0 || x === '') return 0;
    if (Array.isArray(x)) return x.reduce<number>((n, y) => n + compte(y, d + 1), 0);
    if (typeof x === 'object') {
      return Object.values(x as Record<string, unknown>)
        .reduce<number>((n, y) => n + compte(y, d + 1), 0);
    }
    return 1;
  };
  return compte(v);
}

/**
 * Forme canonique : clés d'objet triées, éléments de tableau triés par leur
 * sérialisation. Deux résultats qui ne diffèrent que par l'ordre deviennent
 * identiques — ce qui est exactement la notion d'égalité qui nous intéresse,
 * puisque aucune de ces structures n'est ordonnée de façon signifiante.
 */
function canonique(raw: string | null): unknown {
  if (raw == null) return null;
  let v: unknown;
  try { v = JSON.parse(raw); } catch { return raw; }
  const c = (x: unknown): unknown => {
    if (Array.isArray(x)) return x.map(c).sort((p, q) => JSON.stringify(p) < JSON.stringify(q) ? -1 : 1);
    if (x && typeof x === 'object') {
      return Object.fromEntries(
        Object.entries(x as Record<string, unknown>).sort(([p], [q]) => p < q ? -1 : 1).map(([k, y]) => [k, c(y)]),
      );
    }
    return x;
  };
  return c(v);
}

/** Paires (clé, deux valeurs plausibles) couvrant chaque fusion du registre. */
const ECHANTILLONS: Array<[string, string, string]> = [
  ['cl_completed_lessons', '["cecr-a1-hello-m1","cecr-a1-pinyin-m1"]', '["cecr-a1-pinyin-m1","cecr-a2-city-m1"]'],
  ['cl_learned_words', '["hsk1-0001","hsk1-0002"]', '["hsk1-0002","hsk1-0003"]'],
  ['xl_study_days', '["2026-07-29","2026-08-03"]', '["2026-08-13"]'],
  ['xl_notif_tombstones_v1', '["a","b"]', '["b","c"]'],
  ['cl_personal_flashcards_v7',
    '[{"id":"pf-1","hanzi":"爱","updatedAt":"2026-06-21T12:57:39.655Z"}]',
    '[{"id":"pf-1","hanzi":"愛","updatedAt":"2026-07-01T00:00:00.000Z"},{"id":"pf-2","hanzi":"好","updatedAt":"2026-06-01T00:00:00.000Z"}]'],
  ['cl_custom_lists', '[{"id":"l1","updatedAt":"2026-06-01T00:00:00.000Z"}]', '[]'],
  ['xl_chat_conversations_v1',
    '[{"id":"c1","title":"Salut","messages":[{"r":"user"}],"updatedAt":1785000000000}]',
    '[{"id":"c2","title":"Grammaire","messages":[],"updatedAt":1786000000000}]'],
  ['xl_error_journal_v1',
    '[{"id":"e1","category":"ton","wrongText":"ma","createdAt":"2026-08-01T00:00:00.000Z"}]',
    '[{"id":"e2","category":"particule","wrongText":"le","createdAt":"2026-08-05T00:00:00.000Z"}]'],
  ['cl_bilans_v7',
    '{"a1":{"level":"a1","bestScore":10,"passed":true,"attempts":3,"firstPassedAt":"2026-06-30T17:23:23.340Z"}}',
    '{"a1":{"level":"a1","bestScore":7,"passed":false,"attempts":1},"a2":{"level":"a2","bestScore":5,"passed":false,"attempts":1}}'],
  ['cl_lesson_mastery_v7',
    '{"cecr-a1-numbers-m1":{"lessonId":"cecr-a1-numbers-m1","mastery":81,"reviewCount":4,"lastReviewedAt":"2026-06-01T18:53:23.017Z"}}',
    '{"cecr-a1-numbers-m1":{"lessonId":"cecr-a1-numbers-m1","mastery":60,"reviewCount":2,"lastReviewedAt":"2026-05-01T00:00:00.000Z"}}'],
  ['cl_word_srs_v1',
    '{"hsk1-0112":{"id":"hsk1-0112","level":4,"reviewCount":4,"lastReviewedAt":1779007143277}}',
    '{"hsk1-0112":{"id":"hsk1-0112","level":2,"reviewCount":2,"lastReviewedAt":1770000000000}}'],
  ['cl_learning_stats_v1',
    '{"dailyMinutes":{"2026-08-01":12},"totalMinutes":12,"streak":3,"lastDate":"2026-08-01"}',
    '{"dailyMinutes":{"2026-08-02":7},"totalMinutes":7,"streak":1,"lastDate":"2026-08-02"}'],
  ['cl_flashcard_activity_v4',
    '{"2026-08-01":{"date":"2026-08-01","cardsReviewed":20,"xpEarned":100,"sessionsCompleted":2}}',
    '{"2026-08-01":{"date":"2026-08-01","cardsReviewed":5,"xpEarned":30,"sessionsCompleted":1}}'],
  ['xl_activity_v2', '{"2026-08-01":40}', '{"2026-08-01":10,"2026-08-02":25}'],
  ['xl_achievements_v1',
    '{"lesson_first":{"unlockedAt":"2026-07-29T10:36:43.854Z","xpClaimed":true}}',
    '{"lesson_first":{"unlockedAt":"2026-08-01T00:00:00.000Z","xpClaimed":false},"lesson_ten":{"unlockedAt":"2026-07-29T10:36:43.854Z","xpClaimed":false}}'],
  ['xl_battle_stats_v1',
    '{"played":4,"won":3,"draw":0,"xpFromBattles":120,"recent":["m1"]}',
    '{"played":2,"won":1,"draw":1,"xpFromBattles":60,"recent":["m2"]}'],
  ['xl_announcements_read_v1',
    '{"ids":["ann-1","ann-2"],"updatedAt":"2026-06-08T10:21:20.441Z"}',
    '{"ids":["ann-2","ann-3"],"updatedAt":"2026-05-01T00:00:00.000Z"}'],
  ['xl_streak_bonus_v1',
    '{"milestonesClaimed":[3,7],"lastDailyBonusAt":"2026-08-01T00:00:00.000Z"}',
    '{"milestonesClaimed":[7,14],"lastDailyBonusAt":null}'],
  ['xl_xp_total', '"5208"', '"120"'],
  ['xl_xp_v2', '0', '5208'],
  ['xl_streak_days', '"1"', '"9"'],
  ['xl_streak_v2',
    '{"current":1,"best":1,"lastDay":"2026-08-18"}',
    '{"current":9,"best":9,"lastDay":"2026-08-13"}'],
];

describe('registre de fusions', () => {
  it('couvre chaque clé du registre', () => {
    const testees = new Set(ECHANTILLONS.map(([k]) => k));
    const manquantes = Object.keys(MERGERS).filter(
      (k) => !testees.has(k) && k !== 'cl_word_srs_v2', // même fusion que v1
    );
    expect(manquantes).toEqual([]);
  });

  for (const [cle, a, b] of ECHANTILLONS) {
    describe(cle, () => {
      const f = MERGERS[cle];

      it('idempotence : f(x, x) = x', () => {
        expect(f(a, a)).toBe(a);
        expect(f(b, b)).toBe(b);
      });

      it('commutativité : f(a, b) équivaut à f(b, a)', () => {
        // L'ordre des éléments d'une union et celui des clés d'un objet ne
        // sont pas signifiants : on compare des formes canoniques.
        expect(canonique(f(a, b))).toEqual(canonique(f(b, a)));
      });

      it('croissance : la fusion n’appauvrit ni l’un ni l’autre', () => {
        const r = richesse(f(a, b));
        expect(r).toBeGreaterThanOrEqual(richesse(a));
        expect(r).toBeGreaterThanOrEqual(richesse(b));
      });

      it('vide contre plein : le plein l’emporte, dans les deux sens', () => {
        // Rejoue l'incident du 18 août 2026 : un appareil au stockage neuf
        // rencontre un compte plein. Le vide prend la forme attendue par la
        // clé pour que la fusion s'applique vraiment (et non le repli).
        const vide = Array.isArray(JSON.parse(a)) ? '[]'
          : typeof JSON.parse(a) === 'object' ? '{}' : '0';
        expect(richesse(f(vide, a))).toBe(richesse(a));
        expect(richesse(f(a, vide))).toBe(richesse(a));
      });

      it('tolère l’absence de valeur d’un côté', () => {
        expect(() => f(null, b)).not.toThrow();
        expect(() => f(a, null)).not.toThrow();
        expect(richesse(f(null, b))).toBeGreaterThanOrEqual(richesse(b));
      });

      it('tolère une valeur illisible', () => {
        expect(() => f('{pas du json', b)).not.toThrow();
      });
    });
  }
});

describe('estVide — filet des clés sans fusion', () => {
  it('reconnaît les défauts nus et structurés', () => {
    for (const v of ['[]', '{}', '0', 'null', '""', '',
      '{"dailyMinutes":{},"totalMinutes":0,"streak":0,"lastDate":null}',
      '{"played":0,"won":0,"draw":0,"xpFromBattles":0,"recent":[]}',
      '{"milestonesClaimed":[],"lastDailyBonusAt":null}']) {
      expect(estVide(v), v).toBe(true);
    }
  });

  it('ne confond pas un réglage volontaire avec un défaut', () => {
    for (const v of ['{"xpTarget":50,"minutesTarget":10,"cardsTarget":0,"lessonsTarget":0}',
      '"fr"', '"500"', '["cecr-a1-hello-m1"]',
      '{"current":1,"best":1,"lastDay":"2026-08-18"}']) {
      expect(estVide(v), v).toBe(false);
    }
  });
});
