/**
 * pinyin-learn-sections.ts — contenu pédagogique manuel pour les 5 leçons
 * pinyin (phase "Apprentissage"). Ces sections sont injectées sur les
 * `LessonModule` correspondants avant d'être mappées vers `LessonV2Data`.
 *
 * Règle produit : tous les `audio` référencés pointent vers un MP3/WAV
 * pré-généré (Azure Neural TTS) — cf. xiaolearn_audio_policy.
 *
 * Conventions audio :
 *   - Lettres pinyin      : `audio/pinyin/{letter}.mp3`
 *   - Caractères HSK1..7  : `audio/hsk{N}/hsk{N}_{hanzi}.wav`
 *
 * Les chemins ont été vérifiés à l'écriture ; en cas de missing MP3/WAV,
 * le bouton 🔊 tombe silencieusement (pas de fallback Web Speech).
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ---------------------------------------------------------------------------
// Leçon 1 — Consonnes initiales
// ---------------------------------------------------------------------------

export const pinyinInitialsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'init-overview',
    title: 'Qu\'est-ce qu\'une initiale ?',
    titleEn: 'What is an initial?',
    body:
      'En pinyin, chaque syllabe est composée d\'une initiale (consonne au début) et d\'une finale (voyelle principale). Le mandarin compte 21 initiales. Certaines se prononcent comme en français, d\'autres demandent un placement de la langue inhabituel.\nOn les regroupe par zone d\'articulation. Écoute chaque lettre, puis répète à voix haute.',
    bodyEn:
      'In pinyin, every syllable has an initial (consonant at the start) and a final (main vowel). Mandarin has 21 initials. Some sound like French or English, others need unusual tongue placements.\nThey are grouped by articulation zone. Listen to each letter, then repeat out loud.',
    tip:
      'Les initiales b/d/g ne sont pas vraiment sonores comme en français — elles ressemblent plutôt à p/t/k atténués, sans souffle.',
    tipEn:
      'Initials b/d/g are not truly voiced like in English — they sound more like softened p/t/k, without aspiration.'
  },
  {
    id: 'init-labials',
    title: 'Labiales : b, p, m, f',
    titleEn: 'Labials: b, p, m, f',
    body:
      'b et p se distinguent par l\'aspiration : « p » est accompagné d\'un souffle d\'air, « b » est neutre. Vérifie avec la paume de ta main devant la bouche.',
    bodyEn:
      'b and p differ by aspiration: "p" carries a puff of air, "b" is neutral. Check with your palm in front of your mouth.',
    items: [
      { hanzi: 'b', pinyin: 'bo', meaning: 'neutre, proche du « p » français', meaningEn: 'neutral, close to French "p"', audio: 'audio/pinyin/b.mp3' },
      { hanzi: 'p', pinyin: 'po', meaning: 'aspiré, souffle marqué', meaningEn: 'aspirated, clear puff of air', audio: 'audio/pinyin/p.mp3' },
      { hanzi: 'm', pinyin: 'mo', meaning: 'comme le « m » français', meaningEn: 'like the French/English "m"', audio: 'audio/pinyin/m.mp3' },
      { hanzi: 'f', pinyin: 'fo', meaning: 'comme le « f » français', meaningEn: 'like the French/English "f"', audio: 'audio/pinyin/f.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'bā', hanzi: '八', meaning: 'huit', meaningEn: 'eight', audio: 'audio/hsk1/hsk1_八.wav' },
      { pinyin: 'pá', hanzi: '爬', meaning: 'grimper', meaningEn: 'to climb', audio: 'audio/hsk4/hsk4_爬.wav' },
      { pinyin: 'mā', hanzi: '妈', meaning: 'maman', meaningEn: 'mom', audio: 'audio/hsk1/hsk1_妈.wav' },
      { pinyin: 'fā', hanzi: '发', meaning: 'envoyer', meaningEn: 'to send', audio: 'audio/hsk1/hsk1_发.wav' }
    ]
  },
  {
    id: 'init-alveolars',
    title: 'Alvéolaires : d, t, n, l',
    titleEn: 'Alveolars: d, t, n, l',
    body:
      'Même logique : d (neutre) vs t (aspiré). n et l se prononcent comme en français, langue contre le palais juste derrière les dents.',
    bodyEn:
      'Same logic: d (neutral) vs t (aspirated). n and l are pronounced as in English, tongue on the alveolar ridge.',
    items: [
      { hanzi: 'd', pinyin: 'de', meaning: 'neutre, proche du « t » français', meaningEn: 'neutral, close to French/English "t"', audio: 'audio/pinyin/d.mp3' },
      { hanzi: 't', pinyin: 'te', meaning: 'aspiré, souffle marqué', meaningEn: 'aspirated, clear puff of air', audio: 'audio/pinyin/t.mp3' },
      { hanzi: 'n', pinyin: 'ne', meaning: 'comme en français', meaningEn: 'as in English', audio: 'audio/pinyin/n.mp3' },
      { hanzi: 'l', pinyin: 'le', meaning: 'comme en français', meaningEn: 'as in English', audio: 'audio/pinyin/l.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'dà', hanzi: '大', meaning: 'grand (d-)', meaningEn: 'big (d-)', audio: 'audio/hsk1/hsk1_大.wav' },
      { pinyin: 'tā', hanzi: '他', meaning: 'il / lui (t-)', meaningEn: 'he / him (t-)', audio: 'audio/hsk1/hsk1_他.wav' },
      { pinyin: 'nà', hanzi: '那', meaning: 'ce / cela (n-)', meaningEn: 'that (n-)', audio: 'audio/hsk1/hsk1_那.wav' },
      { pinyin: 'lā', hanzi: '拉', meaning: 'tirer (l-)', meaningEn: 'to pull (l-)', audio: 'audio/hsk2/hsk2_拉.wav' }
    ]
  },
  {
    id: 'init-velars',
    title: 'Vélaires : g, k, h',
    titleEn: 'Velars: g, k, h',
    body:
      'Trio produit à l\'arrière de la bouche. « h » est plus rauque qu\'en français, il vient de la gorge (proche du « j » espagnol).',
    bodyEn:
      'Three sounds made at the back of the mouth. "h" is raspier than in English, produced in the throat (close to Spanish "j").',
    items: [
      { hanzi: 'g', pinyin: 'ge', meaning: 'neutre, proche du « k » français', meaningEn: 'neutral, close to English "k"', audio: 'audio/pinyin/g.mp3' },
      { hanzi: 'k', pinyin: 'ke', meaning: 'aspiré, souffle marqué', meaningEn: 'aspirated, clear puff of air', audio: 'audio/pinyin/k.mp3' },
      { hanzi: 'h', pinyin: 'he', meaning: 'fricative gutturale', meaningEn: 'guttural fricative', audio: 'audio/pinyin/h.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'gē', hanzi: '哥', meaning: 'grand frère (g-)', meaningEn: 'elder brother (g-)', audio: 'audio/hsk1/hsk1_哥.wav' },
      { pinyin: 'kè', hanzi: '课', meaning: 'cours (k-)', meaningEn: 'class (k-)', audio: 'audio/hsk1/hsk1_课.wav' },
      { pinyin: 'hē', hanzi: '喝', meaning: 'boire (h-)', meaningEn: 'to drink (h-)', audio: 'audio/hsk1/hsk1_喝.wav' }
    ]
  },
  {
    id: 'init-palatals',
    title: 'Palatales : j, q, x',
    titleEn: 'Palatals: j, q, x',
    body:
      'Trio totalement absent du français. Langue plaquée contre le palais, lèvres étirées en sourire. j ≈ « dj » doux, q ≈ « tch » aspiré, x ≈ « ch » léger.\nCes trois sons ne se combinent qu\'avec i ou ü.',
    bodyEn:
      'Three sounds absent from English. Tongue pressed against the hard palate, lips stretched in a smile. j ≈ soft "dj", q ≈ aspirated "tch", x ≈ light "sh".\nThese only combine with i or ü.',
    items: [
      { hanzi: 'j', pinyin: 'ji', meaning: 'proche de « dj » doux', meaningEn: 'close to soft "dj"', audio: 'audio/pinyin/j.mp3' },
      { hanzi: 'q', pinyin: 'qi', meaning: 'proche de « tch » aspiré', meaningEn: 'close to aspirated "tch"', audio: 'audio/pinyin/q.mp3' },
      { hanzi: 'x', pinyin: 'xi', meaning: 'proche de « ch » français léger', meaningEn: 'close to light English "sh"', audio: 'audio/pinyin/x.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'jǐ', hanzi: '几', meaning: 'combien (j-)', meaningEn: 'how many (j-)', audio: 'audio/hsk1/hsk1_几.wav' },
      { pinyin: 'qī', hanzi: '七', meaning: 'sept (q-)', meaningEn: 'seven (q-)', audio: 'audio/hsk1/hsk1_七.wav' },
      { pinyin: 'xī', hanzi: '西', meaning: 'ouest (x-)', meaningEn: 'west (x-)', audio: 'audio/hsk1/hsk1_西.wav' }
    ],
    tip:
      'j/q/x ne peuvent jamais précéder a, o, e, u (sauf ü). Si tu lis « ju », c\'est en fait « jü ».',
    tipEn:
      'j/q/x never appear before a, o, e, u (except ü). When you read "ju", it is actually "jü".'
  },
  {
    id: 'init-retroflex-preview',
    title: 'Rétroflexes et sifflantes (aperçu)',
    titleEn: 'Retroflexes and sibilants (preview)',
    body:
      'zh, ch, sh, r, z, c, s sont les plus exigeantes. On les étudie en détail dans la leçon 4 (combinaisons complexes) car elles demandent un placement précis de la langue. Écoute-les une première fois pour te familiariser.',
    bodyEn:
      'zh, ch, sh, r, z, c, s are the trickiest. They are covered in detail in Lesson 4 (complex combinations) because they need precise tongue placement. Listen to them once to get familiar.',
    items: [
      { hanzi: 'zh', pinyin: 'zhi', meaning: 'rétroflexe neutre', meaningEn: 'neutral retroflex', audio: 'audio/pinyin/zh.mp3' },
      { hanzi: 'ch', pinyin: 'chi', meaning: 'rétroflexe aspiré', meaningEn: 'aspirated retroflex', audio: 'audio/pinyin/ch.mp3' },
      { hanzi: 'sh', pinyin: 'shi', meaning: 'rétroflexe fricatif', meaningEn: 'retroflex fricative', audio: 'audio/pinyin/sh.mp3' },
      { hanzi: 'r', pinyin: 'ri', meaning: 'rétroflexe vibré', meaningEn: 'voiced retroflex', audio: 'audio/pinyin/r.mp3' },
      { hanzi: 'z', pinyin: 'zi', meaning: 'sifflante neutre', meaningEn: 'neutral sibilant', audio: 'audio/pinyin/z.mp3' },
      { hanzi: 'c', pinyin: 'ci', meaning: 'sifflante aspirée', meaningEn: 'aspirated sibilant', audio: 'audio/pinyin/c.mp3' },
      { hanzi: 's', pinyin: 'si', meaning: 'sifflante fricative', meaningEn: 'sibilant fricative', audio: 'audio/pinyin/s.mp3' }
    ]
  }
];

// ---------------------------------------------------------------------------
// Leçon 2 — Voyelles finales
// ---------------------------------------------------------------------------

export const pinyinFinalsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'final-overview',
    title: 'Les 6 voyelles fondamentales',
    titleEn: 'The 6 core vowels',
    body:
      'Le pinyin repose sur 6 voyelles simples : a, o, e, i, u, ü. Elles se combinent pour former des diphtongues (ai, ou…) ou s\'allongent avec n/ng. Commence par maîtriser leur son isolé.',
    bodyEn:
      'Pinyin relies on 6 simple vowels: a, o, e, i, u, ü. They combine into diphthongs (ai, ou…) or lengthen with n/ng. Start by mastering their isolated sound.',
    items: [
      { hanzi: 'a', pinyin: 'a', meaning: 'ouverte, bouche grande ouverte', meaningEn: 'open, mouth wide open', audio: 'audio/pinyin/a.mp3' },
      { hanzi: 'o', pinyin: 'o', meaning: 'lèvres arrondies vers l\'avant', meaningEn: 'rounded lips, pushed forward', audio: 'audio/pinyin/o.mp3' },
      { hanzi: 'e', pinyin: 'e', meaning: 'entre « e » et « eu » français', meaningEn: 'between "uh" and "er"', audio: 'audio/pinyin/e.mp3' },
      { hanzi: 'i', pinyin: 'i', meaning: 'lèvres étirées, comme « ee »', meaningEn: 'lips stretched, like "ee"', audio: 'audio/pinyin/i.mp3' },
      { hanzi: 'u', pinyin: 'u', meaning: 'lèvres très arrondies, comme « ou »', meaningEn: 'very rounded lips, like "oo"', audio: 'audio/pinyin/u.mp3' },
      { hanzi: 'ü', pinyin: 'ü', meaning: 'dites « i » en arrondissant les lèvres', meaningEn: 'say "ee" while rounding your lips', audio: 'audio/pinyin/v.mp3' }
    ],
    tip:
      'Le son « e » isolé ne ressemble PAS au « e » français. Il est plus en arrière de la bouche, comme le son au milieu de « bird ».',
    tipEn:
      'The isolated "e" does NOT sound like French "e". It is further back, similar to the sound in English "bird".'
  },
  {
    id: 'final-i-variants',
    title: 'Le « i » a trois visages',
    titleEn: 'The three faces of "i"',
    body:
      'Attention piège : la lettre « i » se prononce de trois façons selon la consonne qui précède.\n1) Après z/c/s → son « z » long, un bourdonnement.\n2) Après zh/ch/sh/r → son rétroflexe, langue recourbée.\n3) Partout ailleurs → vrai « i » étiré, comme « ee ».',
    bodyEn:
      'Watch out: the letter "i" has three distinct pronunciations depending on the preceding consonant.\n1) After z/c/s → a buzzed "z" sound.\n2) After zh/ch/sh/r → a retroflex sound, tongue curled.\n3) Everywhere else → a true stretched "i", like "ee".',
    minimalPairs: [
      { pinyin: 'zì', hanzi: '字', meaning: 'caractère', meaningEn: 'character', audio: 'audio/hsk1/hsk1_字.wav' },
      { pinyin: 'shì', hanzi: '是', meaning: 'être', meaningEn: 'to be', audio: 'audio/hsk1/hsk1_是.wav' },
      { pinyin: 'yī', hanzi: '一', meaning: 'un', meaningEn: 'one', audio: 'audio/hsk1/hsk1_一.wav' }
    ]
  },
  {
    id: 'final-diphthongs',
    title: 'Diphtongues : ai, ei, ao, ou',
    titleEn: 'Diphthongs: ai, ei, ao, ou',
    body:
      'Deux voyelles enchaînées rapidement. Pense-les comme un glissement, pas comme deux sons séparés.',
    bodyEn:
      'Two vowels strung together quickly. Think of them as a glide, not two separate sounds.',
    items: [
      { hanzi: '爱', pinyin: 'ài', meaning: 'aimer (ai = « aï »)', meaningEn: 'to love (ai = "eye")', audio: 'audio/hsk1/hsk1_爱.wav' },
      { hanzi: '杯', pinyin: 'bēi', meaning: 'tasse (ei = « ey »)', meaningEn: 'cup (ei = "ay")', audio: 'audio/hsk1/hsk1_杯.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bon (ao = « a-ô »)', meaningEn: 'good (ao = "ah-oh")', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous (ou = « o-ou »)', meaningEn: 'all (ou = "oh")', audio: 'audio/hsk1/hsk1_都.wav' }
    ]
  },
  {
    id: 'final-nasals',
    title: 'Finales nasales : -n vs -ng',
    titleEn: 'Nasal finals: -n vs -ng',
    body:
      'Distinction critique pour être compris. -n se termine langue contre les dents (comme dans « mon nom » bien articulé). -ng se termine bouche ouverte, son qui résonne dans le nez (comme « ng » en anglais « sing »).',
    bodyEn:
      'Critical distinction for being understood. -n ends with the tongue touching the teeth. -ng ends with the mouth open, sound resonating in the nose (like English "sing").',
    minimalPairs: [
      { pinyin: 'shān', hanzi: '山', meaning: 'montagne (-n)', meaningEn: 'mountain (-n)', audio: 'audio/hsk1/hsk1_山.wav' },
      { pinyin: 'shàng', hanzi: '上', meaning: 'au-dessus (-ng)', meaningEn: 'above (-ng)', audio: 'audio/hsk1/hsk1_上.wav' },
      { pinyin: 'fēn', hanzi: '分', meaning: 'minute (-n)', meaningEn: 'minute (-n)', audio: 'audio/hsk1/hsk1_分.wav' },
      { pinyin: 'fēng', hanzi: '风', meaning: 'vent (-ng)', meaningEn: 'wind (-ng)', audio: 'audio/hsk1/hsk1_风.wav' }
    ],
    tip:
      'Astuce : posez la main sur la gorge. Sur « -ng », la vibration continue après la voyelle. Sur « -n », elle s\'arrête net.',
    tipEn:
      'Tip: place a hand on your throat. For "-ng", the vibration continues after the vowel. For "-n", it stops abruptly.'
  },
  {
    id: 'final-compound',
    title: 'Finales composées : ia, ie, iao, iu, ua, uo…',
    titleEn: 'Compound finals: ia, ie, iao, iu, ua, uo…',
    body:
      'Un i ou u court vient se greffer devant la voyelle principale, créant un « y » ou un « w » de transition. L\'accent tonique reste sur la voyelle principale.',
    bodyEn:
      'A short i or u glides in before the main vowel, creating a "y"- or "w"-like transition. The tone still falls on the main vowel.',
    items: [
      { hanzi: '家', pinyin: 'jiā', meaning: 'maison (ia ≈ « ya »)', meaningEn: 'home (ia ≈ "ya")', audio: 'audio/hsk1/hsk1_家.wav' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'écrire (ie ≈ « yé »)', meaningEn: 'to write (ie ≈ "yeh")', audio: 'audio/hsk1/hsk1_写.wav' },
      { hanzi: '小', pinyin: 'xiǎo', meaning: 'petit (iao ≈ « yaô »)', meaningEn: 'small (iao ≈ "yow")', audio: 'audio/hsk1/hsk1_小.wav' },
      { hanzi: '多', pinyin: 'duō', meaning: 'beaucoup (uo ≈ « wô »)', meaningEn: 'many (uo ≈ "woh")', audio: 'audio/hsk1/hsk1_多.wav' }
    ]
  }
];

// ---------------------------------------------------------------------------
// Leçon 3 — Les 4 tons
// ---------------------------------------------------------------------------

export const pinyinTonesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'tones-intro',
    title: 'Pourquoi les tons ?',
    titleEn: 'Why tones?',
    body:
      'En mandarin, la hauteur de la voix change le sens du mot. mā (maman), má (chanvre), mǎ (cheval), mà (insulter) s\'écrivent pareil en pinyin mais désignent 4 choses différentes !\nChaque ton a un contour mélodique précis — on les numérote de 1 à 4. Il existe aussi un « ton neutre » (5), léger et bref, utilisé sur certaines syllabes non accentuées.',
    bodyEn:
      'In Mandarin, voice pitch changes word meaning. mā (mom), má (hemp), mǎ (horse), mà (to scold) spell the same in pinyin but mean 4 different things!\nEach tone has a precise melodic contour — numbered 1 to 4. There is also a "neutral tone" (5), light and short, used on unstressed syllables.',
    tip:
      'Les diacritiques sur les voyelles indiquent le ton : ā (1), á (2), ǎ (3), à (4), a (neutre).',
    tipEn:
      'The marks over vowels indicate the tone: ā (1), á (2), ǎ (3), à (4), a (neutral).'
  },
  {
    id: 'tones-1',
    title: '1ᵉʳ ton — haut et plat',
    titleEn: '1st tone — high and flat',
    tone: 1,
    body:
      'Voix haute et stable, comme si tu tenais une note de musique. Contour 5–5 dans l\'échelle de Chao (1 = grave, 5 = aigu).\nAstuce : chante un « laaa » tenu à hauteur constante.',
    bodyEn:
      'High and stable voice, as if holding a musical note. Contour 5–5 on the Chao pitch scale (1 = low, 5 = high).\nTip: sing a sustained "laaa" at constant pitch.',
    items: [
      { hanzi: '妈', pinyin: 'mā', meaning: 'maman', meaningEn: 'mom', audio: 'audio/hsk1/hsk1_妈.wav' },
      { hanzi: '他', pinyin: 'tā', meaning: 'il / lui', meaningEn: 'he / him', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '八', pinyin: 'bā', meaning: 'huit', meaningEn: 'eight', audio: 'audio/hsk1/hsk1_八.wav' },
      { hanzi: '花', pinyin: 'huā', meaning: 'fleur', meaningEn: 'flower', audio: 'audio/hsk1/hsk1_花.wav' }
    ],
    tip:
      'Garde la voix en tension continue — le 1ᵉʳ ton ne fléchit jamais, même brièvement.',
    tipEn:
      'Keep the voice in continuous tension — tone 1 never dips, not even briefly.'
  },
  {
    id: 'tones-2',
    title: '2ᵉ ton — montant',
    titleEn: '2nd tone — rising',
    tone: 2,
    body:
      'Voix qui monte rapidement, comme quand tu poses une question surprise en français : « Quoi ? ». Contour 3–5.',
    bodyEn:
      'Voice rising quickly, like when you ask a surprised question in English: "What?". Contour 3–5.',
    items: [
      { hanzi: '麻', pinyin: 'má', meaning: 'chanvre / engourdi', meaningEn: 'hemp / numb', audio: 'audio/hsk7/hsk7_麻.wav' },
      { hanzi: '茶', pinyin: 'chá', meaning: 'thé', meaningEn: 'tea', audio: 'audio/hsk1/hsk1_茶.wav' },
      { hanzi: '拿', pinyin: 'ná', meaning: 'prendre', meaningEn: 'to take', audio: 'audio/hsk1/hsk1_拿.wav' },
      { hanzi: '爬', pinyin: 'pá', meaning: 'grimper', meaningEn: 'to climb', audio: 'audio/hsk2/hsk2_爬.wav' }
    ],
    tip:
      'Attention : un 2ᵉ ton raté sonne comme un 3ᵉ ton. Ne baisse jamais la voix avant de monter.',
    tipEn:
      'Careful: a flubbed tone 2 sounds like tone 3. Never lower the voice before rising.'
  },
  {
    id: 'tones-3',
    title: '3ᵉ ton — descendant puis montant',
    titleEn: '3rd tone — dipping',
    tone: 3,
    body:
      'Le plus exotique. Voix qui descend d\'abord au plancher (hauteur 1), puis remonte (hauteur 4). Contour 2–1–4.\nEn pratique, seuls les tons 3 isolés ou finaux gardent la remontée entière. Devant un autre ton, la remontée est souvent écourtée (« demi-troisième »).',
    bodyEn:
      'The most exotic. The voice dips down to pitch 1, then rises to pitch 4. Contour 2–1–4.\nIn practice, only isolated or final tone 3 keeps the full dip-and-rise. Before another tone, the rise is usually clipped (the "half third").',
    items: [
      { hanzi: '马', pinyin: 'mǎ', meaning: 'cheval', meaningEn: 'horse', audio: 'audio/hsk3/hsk3_马.wav' },
      { hanzi: '打', pinyin: 'dǎ', meaning: 'frapper, faire', meaningEn: 'to hit, to do', audio: 'audio/hsk1/hsk1_打.wav' },
      { hanzi: '哪', pinyin: 'nǎ', meaning: 'quel, lequel', meaningEn: 'which', audio: 'audio/hsk1/hsk1_哪.wav' },
      { hanzi: '假', pinyin: 'jiǎ', meaning: 'faux, factice', meaningEn: 'fake', audio: 'audio/hsk2/hsk2_假.wav' }
    ],
    tip:
      'Règle de sandhi : deux 3ᵉ tons collés → le premier devient un 2ᵉ ton. Ex : nǐ hǎo se prononce ní hǎo.',
    tipEn:
      'Sandhi rule: two tone 3 in a row → the first becomes tone 2. Ex: nǐ hǎo is pronounced ní hǎo.'
  },
  {
    id: 'tones-4',
    title: '4ᵉ ton — descendant brusque',
    titleEn: '4th tone — sharp falling',
    tone: 4,
    body:
      'Voix qui chute d\'un coup, haut → grave. Contour 5–1. Imagine un ordre bref et sec : « Non ! ».\nC\'est souvent le plus facile pour un francophone car il coïncide avec notre intonation d\'insistance.',
    bodyEn:
      'Voice falling sharply, high → low. Contour 5–1. Picture a short, firm command: "No!".\nOften the easiest for English speakers, since it matches our insistent intonation.',
    items: [
      { hanzi: '骂', pinyin: 'mà', meaning: 'insulter, gronder', meaningEn: 'to scold', audio: 'audio/hsk5/hsk5_骂.wav' },
      { hanzi: '大', pinyin: 'dà', meaning: 'grand', meaningEn: 'big', audio: 'audio/hsk1/hsk1_大.wav' },
      { hanzi: '爸', pinyin: 'bà', meaning: 'papa', meaningEn: 'dad', audio: 'audio/hsk1/hsk1_爸.wav' },
      { hanzi: '那', pinyin: 'nà', meaning: 'cela', meaningEn: 'that', audio: 'audio/hsk1/hsk1_那.wav' }
    ]
  },
  {
    id: 'tones-minimal-pair',
    title: 'Paire minimale de référence : ma',
    titleEn: 'Reference minimal set: ma',
    body:
      'La syllabe « ma » change totalement de sens selon son ton. Entraîne-toi à discriminer les 4 versions : écoute, devine le ton, vérifie.',
    bodyEn:
      'The syllable "ma" completely changes meaning with the tone. Train yourself to tell them apart: listen, guess the tone, check.',
    minimalPairs: [
      { pinyin: 'mā', hanzi: '妈', meaning: 'maman', meaningEn: 'mom', tone: 1, audio: 'audio/hsk1/hsk1_妈.wav' },
      { pinyin: 'má', hanzi: '麻', meaning: 'chanvre', meaningEn: 'hemp', tone: 2, audio: 'audio/hsk7/hsk7_麻.wav' },
      { pinyin: 'mǎ', hanzi: '马', meaning: 'cheval', meaningEn: 'horse', tone: 3, audio: 'audio/hsk3/hsk3_马.wav' },
      { pinyin: 'mà', hanzi: '骂', meaning: 'insulter', meaningEn: 'to scold', tone: 4, audio: 'audio/hsk5/hsk5_骂.wav' }
    ],
    tip:
      'Écoute dans l\'ordre, puis mélange : reconnaître un ton sans contexte est le meilleur exercice.',
    tipEn:
      'Listen in order first, then shuffle: recognizing a tone without context is the best exercise.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 4 — Combinaisons complexes (rétroflexes + sifflantes)
// ---------------------------------------------------------------------------

export const pinyinCombinationsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'combo-intro',
    title: 'Deux familles à différencier',
    titleEn: 'Two families to tell apart',
    body:
      'Les 7 initiales z/c/s et zh/ch/sh/r sont le cauchemar des débutants. Elles diffèrent par la position de la langue :\n• z/c/s → langue en avant, touchant les dents. Sons sifflants, proches de « ts/dz/s » français.\n• zh/ch/sh/r → langue recourbée en arrière (rétroflexe), ne touche rien. Sons « plus sourds », avec un effet de caisse de résonance.',
    bodyEn:
      'The 7 initials z/c/s and zh/ch/sh/r are every beginner\'s nightmare. They differ by tongue position:\n• z/c/s → tongue forward, touching the teeth. Sibilant sounds, close to English "ts/dz/s".\n• zh/ch/sh/r → tongue curled backward (retroflex), touching nothing. Duller sounds with a chest-resonance effect.',
    tip:
      'Exercice : prononce alternativement « sī » (quatre = sì) et « shī » (maître = shī). Tu dois sentir ta langue bouger.',
    tipEn:
      'Drill: alternate "sī" (four = sì) and "shī" (master = shī). You should feel your tongue move.'
  },
  {
    id: 'combo-retroflex',
    title: 'Rétroflexes : zh, ch, sh, r',
    titleEn: 'Retroflexes: zh, ch, sh, r',
    body:
      'Recourbe la langue vers le palais sans la toucher. zh (neutre) et ch (aspiré) forment une paire. sh est la version fricative (friction de l\'air). r est vibré, entre le « j » français et le « r » anglais.',
    bodyEn:
      'Curl the tongue up toward the palate without touching. zh (neutral) and ch (aspirated) form a pair. sh is the fricative version (airflow friction). r is voiced, halfway between French "j" and English "r".',
    items: [
      { hanzi: 'zh', pinyin: 'zhi', meaning: 'rétroflexe neutre', meaningEn: 'neutral retroflex', audio: 'audio/pinyin/zh.mp3' },
      { hanzi: 'ch', pinyin: 'chi', meaning: 'rétroflexe aspiré', meaningEn: 'aspirated retroflex', audio: 'audio/pinyin/ch.mp3' },
      { hanzi: 'sh', pinyin: 'shi', meaning: 'rétroflexe fricatif', meaningEn: 'retroflex fricative', audio: 'audio/pinyin/sh.mp3' },
      { hanzi: 'r', pinyin: 'ri', meaning: 'rétroflexe vibré', meaningEn: 'voiced retroflex', audio: 'audio/pinyin/r.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'zhīdào', hanzi: '知道', meaning: 'savoir (zh-)', meaningEn: 'to know (zh-)', audio: 'audio/hsk1/hsk1_知道.wav' },
      { pinyin: 'chī', hanzi: '吃', meaning: 'manger (ch-)', meaningEn: 'to eat (ch-)', audio: 'audio/hsk1/hsk1_吃.wav' },
      { pinyin: 'shì', hanzi: '是', meaning: 'être (sh-)', meaningEn: 'to be (sh-)', audio: 'audio/hsk1/hsk1_是.wav' },
      { pinyin: 'rì', hanzi: '日', meaning: 'jour (r-)', meaningEn: 'day (r-)', audio: 'audio/hsk1/hsk1_日.wav' }
    ]
  },
  {
    id: 'combo-sibilant',
    title: 'Sifflantes : z, c, s',
    titleEn: 'Sibilants: z, c, s',
    body:
      'Langue en avant, pointe juste derrière les dents. z (neutre) = d+z collé, c (aspiré) = t+s collé avec souffle, s = simple s français.',
    bodyEn:
      'Tongue forward, tip just behind the teeth. z (neutral) = d+z fused, c (aspirated) = t+s fused with aspiration, s = plain English "s".',
    items: [
      { hanzi: 'z', pinyin: 'zi', meaning: 'sifflante neutre (d+z)', meaningEn: 'neutral sibilant (d+z)', audio: 'audio/pinyin/z.mp3' },
      { hanzi: 'c', pinyin: 'ci', meaning: 'sifflante aspirée (t+s)', meaningEn: 'aspirated sibilant (t+s)', audio: 'audio/pinyin/c.mp3' },
      { hanzi: 's', pinyin: 'si', meaning: 'sifflante simple', meaningEn: 'plain sibilant', audio: 'audio/pinyin/s.mp3' }
    ],
    minimalPairs: [
      { pinyin: 'zì', hanzi: '字', meaning: 'caractère (z-)', meaningEn: 'character (z-)', audio: 'audio/hsk1/hsk1_字.wav' },
      { pinyin: 'cì', hanzi: '次', meaning: 'fois (c-)', meaningEn: 'time, occurrence (c-)', audio: 'audio/hsk1/hsk1_次.wav' },
      { pinyin: 'sì', hanzi: '四', meaning: 'quatre (s-)', meaningEn: 'four (s-)', audio: 'audio/hsk1/hsk1_四.wav' }
    ]
  },
  {
    id: 'combo-discriminate',
    title: 'Discrimination : zh vs z, sh vs s',
    titleEn: 'Discrimination: zh vs z, sh vs s',
    body:
      'Le test ultime : savoir reconnaître à l\'oreille. Écoute chaque paire, identifie quelle famille (rétroflexe ou sifflante) tu entends.',
    bodyEn:
      'The ultimate test: recognizing by ear. Listen to each pair, identify which family (retroflex vs sibilant) you hear.',
    minimalPairs: [
      { pinyin: 'zhū', hanzi: '猪', meaning: 'cochon (zh-)', meaningEn: 'pig (zh-)', audio: 'audio/hsk1/hsk1_猪.wav' },
      { pinyin: 'zǔ', hanzi: '祖', meaning: 'ancêtre (z-)', meaningEn: 'ancestor (z-)', audio: 'audio/hsk5/hsk5_祖.wav' },
      { pinyin: 'shān', hanzi: '山', meaning: 'montagne (sh-)', meaningEn: 'mountain (sh-)', audio: 'audio/hsk1/hsk1_山.wav' },
      { pinyin: 'sān', hanzi: '三', meaning: 'trois (s-)', meaningEn: 'three (s-)', audio: 'audio/hsk1/hsk1_三.wav' }
    ]
  },
  {
    id: 'combo-special',
    title: 'Le « r » spécial',
    titleEn: 'The special "r"',
    body:
      'Le « r » mandarin ne roule pas comme en français, et il n\'est pas exactement le « r » anglais non plus. Langue recourbée comme pour « sh », mais avec une vibration légère des cordes vocales. Écoute plusieurs fois avant de tenter.',
    bodyEn:
      'Mandarin "r" is neither a French rolled r nor exactly an English r. Curl the tongue like for "sh", but add slight vocal-cord vibration. Listen several times before trying.',
    items: [
      { hanzi: '热', pinyin: 'rè', meaning: 'chaud', meaningEn: 'hot', audio: 'audio/hsk1/hsk1_热.wav' },
      { hanzi: '人', pinyin: 'rén', meaning: 'personne', meaningEn: 'person', audio: 'audio/hsk1/hsk1_人.wav' },
      { hanzi: '日', pinyin: 'rì', meaning: 'jour, soleil', meaningEn: 'day, sun', audio: 'audio/hsk1/hsk1_日.wav' }
    ],
    tip:
      'En fin de syllabe, un « r » peut aussi apparaître (-r / érisation pékinoise) : cela colore la voyelle précédente avec un timbre rétroflexe.',
    tipEn:
      'At the end of a syllable, "r" can also appear (-r / Beijing rhotacization): it colors the preceding vowel with a retroflex timbre.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 5 — Pratique complète
// ---------------------------------------------------------------------------

export const pinyinPracticeLearnSections: LessonV2LearnSection[] = [
  {
    id: 'practice-recap',
    title: 'Ce que tu sais maintenant',
    titleEn: 'What you know now',
    body:
      'Tu as vu les initiales (21), les finales (+ diphtongues et nasales), les 4 tons, et les combinaisons rétroflexes/sifflantes. Cette leçon consolide tout avec des mots du quotidien.\nObjectif : lire correctement une syllabe inconnue en décomposant initiale + finale + ton.',
    bodyEn:
      'You have seen the initials (21), the finals (+ diphthongs and nasals), the 4 tones, and the retroflex/sibilant combinations. This lesson consolidates everything with everyday words.\nGoal: correctly read an unknown syllable by breaking it down into initial + final + tone.'
  },
  {
    id: 'practice-common-words',
    title: 'Mots du quotidien',
    titleEn: 'Everyday words',
    body:
      'Décompose chaque mot mentalement avant d\'écouter : initiale + finale + ton. Vérifie ensuite avec l\'audio.',
    bodyEn:
      'Break down each word mentally before listening: initial + final + tone. Then check with the audio.',
    items: [
      { hanzi: '妈', pinyin: 'mā', meaning: 'maman (m + a + ton 1)', meaningEn: 'mom (m + a + tone 1)', audio: 'audio/hsk1/hsk1_妈.wav' },
      { hanzi: '爸', pinyin: 'bà', meaning: 'papa (b + a + ton 4)', meaningEn: 'dad (b + a + tone 4)', audio: 'audio/hsk1/hsk1_爸.wav' },
      { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'ami·e', meaningEn: 'friend', audio: 'audio/hsk1/hsk1_朋友.wav' },
      { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'professeur', meaningEn: 'teacher', audio: 'audio/hsk1/hsk1_老师.wav' },
      { hanzi: '茶', pinyin: 'chá', meaning: 'thé (ch + a + ton 2)', meaningEn: 'tea (ch + a + tone 2)', audio: 'audio/hsk1/hsk1_茶.wav' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'boire (h + e + ton 1)', meaningEn: 'to drink (h + e + tone 1)', audio: 'audio/hsk1/hsk1_喝.wav' },
      { hanzi: '吃', pinyin: 'chī', meaning: 'manger (ch + i + ton 1)', meaningEn: 'to eat (ch + i + tone 1)', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '中国', pinyin: 'Zhōngguó', meaning: 'Chine', meaningEn: 'China', audio: 'audio/hsk1/hsk1_中国.wav' }
    ]
  },
  {
    id: 'practice-tone-mix',
    title: 'Mix de tons — à quel ton correspond chaque mot ?',
    titleEn: 'Tone mix — which tone for each word?',
    body:
      'Quatre mots, quatre tons. Écoute et essaie de dire le ton avant de regarder.',
    bodyEn:
      'Four words, four tones. Listen and try to guess the tone before looking.',
    minimalPairs: [
      { pinyin: 'huā', hanzi: '花', meaning: 'fleur', meaningEn: 'flower', tone: 1, audio: 'audio/hsk1/hsk1_花.wav' },
      { pinyin: 'chá', hanzi: '茶', meaning: 'thé', meaningEn: 'tea', tone: 2, audio: 'audio/hsk1/hsk1_茶.wav' },
      { pinyin: 'mǎ', hanzi: '马', meaning: 'cheval', meaningEn: 'horse', tone: 3, audio: 'audio/hsk3/hsk3_马.wav' },
      { pinyin: 'dà', hanzi: '大', meaning: 'grand', meaningEn: 'big', tone: 4, audio: 'audio/hsk1/hsk1_大.wav' }
    ]
  },
  {
    id: 'practice-tricky',
    title: 'Pièges classiques',
    titleEn: 'Classic traps',
    body:
      'Trois paires que les francophones confondent souvent. Écoute attentivement et marque la différence.',
    bodyEn:
      'Three pairs that English/French speakers often confuse. Listen carefully and mark the difference.',
    minimalPairs: [
      { pinyin: 'sì', hanzi: '四', meaning: 'quatre (s, pas sh)', meaningEn: 'four (s, not sh)', audio: 'audio/hsk1/hsk1_四.wav' },
      { pinyin: 'shì', hanzi: '是', meaning: 'être (sh)', meaningEn: 'to be (sh)', audio: 'audio/hsk1/hsk1_是.wav' },
      { pinyin: 'jī', hanzi: '机', meaning: 'machine (j, pas ch)', meaningEn: 'machine (j, not ch)', audio: 'audio/hsk1/hsk1_飞机.wav' },
      { pinyin: 'qī', hanzi: '七', meaning: 'sept (q aspiré)', meaningEn: 'seven (aspirated q)', audio: 'audio/hsk1/hsk1_七.wav' }
    ],
    tip:
      'Enregistre-toi et compare avec l\'audio. L\'oreille française a du mal à détecter certaines nuances — la voir sur un spectrogramme mental aide.',
    tipEn:
      'Record yourself and compare with the audio. English/French ears struggle with some nuances — picturing a mental spectrogram helps.'
  },
  {
    id: 'practice-next',
    title: 'Et maintenant ?',
    titleEn: 'What next?',
    body:
      'La prononciation se travaille par l\'oreille, pas par la théorie. Pour la suite : écoute 10 minutes par jour des dialogues simples, répète à voix haute, et enregistre-toi. En 2 à 3 semaines, les tons deviennent automatiques.',
    bodyEn:
      'Pronunciation is trained by ear, not by theory. Going forward: listen to simple dialogues 10 minutes a day, repeat out loud, record yourself. Tones become automatic within 2–3 weeks.',
    tip:
      'Les leçons Dialogue et Lecture de XiaoLearn sont faites pour ça — tous les audios sont des MP3/WAV natifs (Azure Neural TTS).',
    tipEn:
      'XiaoLearn\'s Dialogue and Reading lessons are built for this — every audio is native MP3/WAV (Azure Neural TTS).'
  }
];
