import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface GrammarExample {
  chinese: string;
  french: string;
  pinyin?: string;
}

export interface GrammarPoint {
  id: string;
  slug: string;
  level: number;
  levelLabel: string;
  title: string;
  sourceTitle: string;
  normalizedTitle: string;
  category: string;
  categorySource: string;
  subcategory: string;
  subcategorySource: string;
  detail: string;
  objective: string;
  structure: string;
  usage: string[];
  elements: string[];
  examples: GrammarExample[];
  termVariations: string[];
  notes: string[];
  commonMistakes: string[];
  searchableText: string;
}

export interface GrammarGroup {
  slug: string;
  title: string;
  summary: string;
  levelSet: number[];
  pointIds: string[];
}

interface GroupDefinition {
  slug: string;
  title: string;
  summary: string;
  matchTokens: string[];
  categorySource?: string;
  subcategorySource?: string;
}

interface SectionBlock {
  heading: string;
  normalizedHeading: string;
  content: string;
}

interface HSKTermInfo {
  term: string;
  translationFr: string;
  explanationFr: string;
}

const SOURCE_FILE = 'hsk_grammar_hsk1_to_hsk7_9_articles.html';
const HSK_EXAMPLE_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json'];
const NON_LEXICAL_TERMS = new Set([
  '语法',
  '结构',
  '句子',
  '短语',
  '主语',
  '谓语',
  '宾语',
  '补语',
  '动词',
  '名词',
  '副词',
  '形容词',
  '代词',
  '连词',
  '助词',
  '时间',
  '处所',
  '方向',
  '数量',
  '状态',
  '可能',
  '结果',
  '程度',
]);

const PARTICLE_HINT_LABELS: Array<[string, string]> = [
  ['了', '了 (aspect/changement)'],
  ['着', '着 (duratif)'],
  ['过', '过 (expérience)'],
  ['吗', '吗 (interrogation)'],
  ['呢', '呢 (progressif/insistance)'],
  ['不', '不 (négation générale)'],
  ['没', '没/没有 (négation du passé)'],
  ['把', '把 (mise en avant de l’objet)'],
  ['被', '被 (passif)'],
  ['得', '得 (degré/complément)'],
];

const TERM_CONTRAST_HINTS: Record<string, string[]> = {
  '在|正在': [
    '在 + verbe et 正在 + verbe indiquent une action en cours.',
    '正在 insiste davantage sur l’action en cours (souvent plus explicite/formel).',
    'Pour la localisation, on utilise 在 + lieu (pas *正在 + lieu).',
  ],
  '会|能': [
    '会 met l’accent sur une capacité acquise (savoir-faire).',
    '能 exprime surtout la possibilité/capacité concrète selon la situation.',
  ],
  '会|能|可以': [
    '会 : compétence apprise.',
    '能 : possibilité/capacité concrète.',
    '可以 : permission / autorisation.',
  ],
  '不|没': [
    '不 sert surtout pour le présent/futur, les habitudes et les états.',
    '没/没有 sert surtout pour nier un fait passé ou l’existence/possession.',
  ],
  '不|没有': [
    '不 sert surtout pour le présent/futur, les habitudes et les états.',
    '没有 sert surtout pour nier un fait passé ou la possession/existence.',
  ],
  '没|没有': [
    '没 est la forme courte fréquente à l’oral.',
    '没有 est la forme complète, souvent plus explicite.',
  ],
  '想|要': [
    '想 exprime plutôt une intention, une envie ou une pensée.',
    '要 est généralement plus direct (volonté, besoin, exigence imminente).',
  ],
  '再|又': [
    '又 renvoie souvent à une répétition déjà réalisée.',
    '再 renvoie plus souvent à une répétition future/à venir.',
  ],
  '快|快要': [
    '快 + adjectif/verbe peut exprimer la rapidité ou l’imminence selon le contexte.',
    '快要 + verbe insiste sur “sur le point de”.',
  ],
};

const GROUP_DEFINITIONS: GroupDefinition[] = [
  {
    slug: 'directions-gauche-droite',
    title: '左 / 右',
    summary: 'Repères directionnels gauche et droite, mêmes patrons de phrase.',
    matchTokens: ['左', '右'],
    categorySource: '词类',
    subcategorySource: '名词',
  },
  {
    slug: 'directions-haut-bas',
    title: '上 / 下',
    summary: 'Repères directionnels haut et bas pour localiser objets et actions.',
    matchTokens: ['上', '下'],
    categorySource: '词类',
    subcategorySource: '名词',
  },
  {
    slug: 'directions-avant-arriere',
    title: '前 / 后',
    summary: 'Repères avant et arrière pour la position relative.',
    matchTokens: ['前', '后'],
    categorySource: '词类',
    subcategorySource: '名词',
  },
  {
    slug: 'negation-bu-mei',
    title: '不 / 没（有）',
    summary: 'Différence clé entre négation générale et négation du passé/possession.',
    matchTokens: ['不', '没（有）'],
    categorySource: '词类',
    subcategorySource: '副词',
  },
  {
    slug: 'modaux-hui-neng-keyi',
    title: '会 / 能 / 可以',
    summary: 'Nuances entre capacité apprise, possibilité et permission.',
    matchTokens: ['会', '能', '可以'],
    categorySource: '词类',
    subcategorySource: '动词',
  },
];

const FEATURED_TOKEN_CANDIDATES = [
  '不',
  '没（有）',
  '了',
  '吗',
  '的',
  '在',
  '把',
  '被',
  '比',
  '会',
  '能',
  '可以',
  '左',
  '右',
  '因为',
  '所以',
];

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  '语素': 'Morphèmes',
  '词类': 'Classes de mots',
  '短语': 'Groupes syntaxiques',
  '句子成分': 'Composants de phrase',
  '句类': 'Types de phrases',
  '句型': 'Patrons de phrase',
  '特殊句型': 'Structures particulières',
  '时间表示法': 'Expression du temps',
  '数的表达法': 'Expression des nombres',
  '数的表示法': 'Expression des nombres',
  '特殊表达法': 'Expressions spéciales',
  '语义功能语法结构': 'Structures sémantiques',
  '常用语法格式': 'Formats usuels',
  '动作的态': 'Aspects du verbe',
  '句子的类型': 'Types de phrases',
  '固定格式': 'Formules fixes',
  '复句': 'Phrases complexes',
  '语段（句群）': 'Organisation du discours',
};

const SUBCATEGORY_TRANSLATIONS: Record<string, string> = {
  '名词': 'nom',
  '动词': 'verbe',
  '形容词': 'adjectif',
  '代词': 'pronom',
  '数词': 'numéral',
  '量词': 'classificateur',
  '副词': 'adverbe',
  '介词': 'préposition',
  '连词': 'conjonction',
  '助词': 'particule',
  '叹词': 'interjection',
  '短语': 'groupe syntaxique',
  '句子': 'phrase',
  '前缀': 'préfixe',
  '后缀': 'suffixe',
  '类前缀': 'pseudo-préfixe',
  '类后缀': 'pseudo-suffixe',
  '结构类型': 'type de structure',
  '功能类型': 'type fonctionnel',
  '主语': 'sujet',
  '谓语': 'prédicat',
  '宾语': 'objet',
  '定语': 'épithète',
  '状语': 'complément circonstanciel',
  '补语': 'complément',
  '句类': 'type de phrase',
  '句型': 'patron de phrase',
  '特殊句型': 'structure particulière',
  '简单复句': 'phrase complexe simple',
  '多重复句': 'phrase complexe multiple',
  '复句': 'phrase complexe',
};

const TITLE_HEAD_TRANSLATIONS: Record<string, string> = {
  '前缀': 'Prefixes',
  '后缀': 'Suffixes',
  '类前缀': 'Pseudo-préfixes',
  '类后缀': 'Pseudo-suffixes',
  '方位名词': 'Noms de position',
  '能愿动词': 'Verbes modaux',
  '离合词': 'Verbes séparables',
  '疑问代词': 'Pronoms interrogatifs',
  '人称代词': 'Pronoms personnels',
  '指示代词': 'Démonstratifs',
  '数量代词': 'Pronoms quantitatifs',
  '数词': 'Numéraux',
  '名量词': 'Classificateurs nominaux',
  '时量词': 'Classificateurs de temps',
  '动量词': "Classificateurs d'action",
  '语气副词': "Adverbes d'attitude",
  '程度副词': 'Adverbes de degré',
  '范围副词': 'Adverbes de portée',
  '时间副词': 'Adverbes de temps',
  '频率副词': 'Adverbes de fréquence',
  '关联副词': 'Adverbes corrélatifs',
  '否定副词': 'Adverbes de négation',
  '方式副词': 'Adverbes de manière',
  '情态副词': 'Adverbes modaux',
  '引出时间、处所': 'Introduire le temps / lieu',
  '引出对象': "Marqueur d'objet",
  '引出方向、路径': 'Introduire direction / trajet',
  '引出原因': 'Introduire la cause',
  '引出目的、原因': 'Introduire but / cause',
  '引出施事、受事': "Introduire agent / patient",
  '引出凭借、依据': 'Introduire moyen / base',
  '连接词语或短语': 'Connecter mots / groupes',
  '连接词或词组': 'Connecter mots / groupes',
  '连接词或短语': 'Connecter mots / groupes',
  '连接词或者短语': 'Connecter mots / groupes',
  '连接词或词组以及 分句或句子': 'Connecter mots / propositions',
  '连接分句或句子': 'Connecter propositions / phrases',
  '连接分句或者句子': 'Connecter propositions / phrases',
  '连接词或词组以及分句或句子': 'Connecter mots / propositions',
  '结构助词': 'Particules structurelles',
  '动态助词': "Particules d'aspect",
  '语气助词': 'Particules finales',
  '其他助词': 'Autres particules',
  '叹词': 'Interjections',
  '基本结构类型': 'Structures de base',
  '其他结构类型': 'Autres structures',
  '结构类型': 'Types de structure',
  '主语': 'Sujet',
  '谓语': 'Prédicat',
  '宾语': 'Objet',
  '定语': 'Épithète / expansion du nom',
  '状语': 'Complément circonstanciel',
  '形容词性短语': 'Groupes adjectivaux',
  '固定短语': 'Expressions fixes',
  '主谓句': 'Phrase sujet-prédicat',
  '单句': 'Phrase simple',
  '陈述句': 'Phrase déclarative',
  '疑问句': 'Phrase interrogative',
  '祈使句': 'Phrase impérative',
  '感叹句': 'Phrase exclamative',
  '反问句': 'Question rhétorique',
  '重动句': 'Phrase à verbe redoublé',
  '连动句': 'Verbes en série',
  '兼语句': 'Construction pivot',
  '双宾语句': 'Double objet',
  '“是”字句': 'Structure 是',
  '“有”字句': 'Structure 有',
  '“把”字句': 'Structure 把',
  '存现句': "Phrases d'existence",
  '被动句': 'Voix passive',
  '比较句': 'Phrases comparatives',
  '进行态': "Aspect progressif",
  '持续态': 'Aspect duratif',
  '完成态': 'Aspect accompli',
  '经历态': "Aspect d'expérience",
  '趋向补语': 'Complément directionnel',
  '程度补语': 'Complément de degré',
  '结果补语': 'Complément de résultat',
  '状态补语': "Complément d'état",
  '可能补语': 'Complément de possibilité',
  '数量补语': 'Complément quantitatif',
  '不用关联词语的复句': 'Phrases complexes sans connecteur',
  '并列复句': 'Phrases complexes de coordination',
  '承接复句': 'Phrases complexes de succession',
  '递进复句': 'Phrases complexes de progression',
  '选择复句': 'Phrases complexes de choix',
  '转折复句': 'Phrases complexes de contraste',
  '因果复句': 'Phrases complexes de cause-conséquence',
  '条件复句': 'Phrases complexes conditionnelles',
  '假设复句': 'Phrases complexes hypothétiques',
  '让步复句': 'Phrases complexes concessives',
  '目的复句': 'Phrases complexes de but',
  '紧缩复句': 'Phrases complexes condensées',
  '解说复句': "Phrases complexes explicatives",
  '多重复句': 'Phrases complexes multiples',
  '四字格': 'Formules en quatre caractères',
  '其他': 'Autres',
  '其 他': 'Autres',
};

const HSK_PINYIN_LEXICON = buildHSKPinyinLexicon();
const HSK_PINYIN_MAX_KEY_LENGTH = getMaxLexiconKeyLength(HSK_PINYIN_LEXICON);
const HSK_EXAMPLE_INDEX = buildHSKExampleIndex();
const HSK_TERM_INFO_INDEX = buildHSKTermInfoIndex();
const HSK_SENTENCE_INDEX = buildHSKSentenceIndex(HSK_EXAMPLE_INDEX);
const CATALOG = buildCatalog();

function buildCatalog() {
  const points = parseGrammarFile(SOURCE_FILE)
    .sort((a, b) => (a.level === b.level ? a.id.localeCompare(b.id) : a.level - b.level));
  const pointsById = new Map(points.map((point) => [point.id, point]));
  const groups = buildGroups(points);
  const pointGroups = buildPointGroupMap(groups);
  const featuredPoints = buildFeaturedPoints(points);

  return {
    points,
    pointsById,
    groups,
    pointGroups,
    featuredPoints,
  };
}

function parseGrammarFile(fileName: string): GrammarPoint[] {
  const sourceUrl = new URL(`../../grammar_articles/${fileName}`, import.meta.url);
  if (!existsSync(sourceUrl)) {
    return [];
  }

  const html = readFileSync(sourceUrl, 'utf-8');
  const articleRegex = /<article\s+class="gp"\s+id="([^"]+)"\s+data-level="([^"]+)"\s+data-cat="([^"]*)"\s+data-sub="([^"]*)"\s+data-detail="([^"]*)"\s*>([\s\S]*?)<\/article>/g;

  const points: GrammarPoint[] = [];
  let match: RegExpExecArray | null;

  while ((match = articleRegex.exec(html)) !== null) {
    const [, id, levelRaw, categoryRaw, subRaw, detailRaw, body] = match;
    const level = parseLevel(levelRaw);
    const levelLabel = normalizeLevelLabel(levelRaw);
    const h2Title = cleanText((body.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1] || '');
    const sourceTitle = h2Title || id;
    const title = buildDisplayTitle(sourceTitle, categoryRaw, subRaw);
    const normalizedTitle = normalizeToken(sourceTitle);
    const sections = extractSections(body);
    const objectiveRaw = getSectionParagraph(sections, ['idee generale', 'objectif']);
    const structure = getSectionStructure(sections);
    const usage = getSectionList(sections, ['comment lutiliser', 'emploi', 'usage']);
    const elements = getSectionElements(sections, sourceTitle);
    const objective = buildObjective(objectiveRaw, sourceTitle, categoryRaw, subRaw, elements);
    const examples = buildRelevantExamples(extractExamples(body), elements, sourceTitle);
    const termVariations = buildTermVariations(elements, sourceTitle, examples);
    const notes = dedupe(getSectionList(sections, ['notes', 'remarques', 'attention']).concat(termVariations));
    const effectiveUsage = usage.length > 0 ? usage : buildFallbackUsage(elements, sourceTitle, examples);
    const commonMistakes = getSectionList(sections, ['pieges frequents', 'erreurs frequentes']);

    const category = buildCategoryLabel(categoryRaw, subRaw);
    const subcategorySource = cleanText(subRaw);
    const subcategory = findTranslation(subcategorySource, SUBCATEGORY_TRANSLATIONS) || subcategorySource;
    const detail = cleanText(detailRaw);

    const searchableText = [
      title,
      sourceTitle,
      normalizedTitle,
      levelLabel,
      category,
      categoryRaw,
      subcategory,
      detail,
      stripInlineMarkdown(objective),
      structure,
      effectiveUsage.map((item) => stripInlineMarkdown(item)).join(' '),
      elements.join(' '),
      termVariations.map((item) => stripInlineMarkdown(item)).join(' '),
      notes.map((item) => stripInlineMarkdown(item)).join(' '),
      commonMistakes.map((item) => stripInlineMarkdown(item)).join(' '),
      examples.map((example) => `${example.chinese} ${example.french}`).join(' '),
    ]
      .join(' ')
      .toLowerCase();

    points.push({
      id,
      slug: id,
      level,
      levelLabel,
      title,
      sourceTitle,
      normalizedTitle,
      category,
      categorySource: cleanText(categoryRaw),
      subcategory,
      subcategorySource,
      detail,
      objective,
      structure,
      usage: effectiveUsage,
      elements,
      examples,
      termVariations,
      notes,
      commonMistakes,
      searchableText,
    });
  }

  return points;
}

function buildCategoryLabel(categoryRaw: string, subRaw: string): string {
  const cat = cleanText(categoryRaw);
  const sub = cleanText(subRaw);
  const translated = findTranslation(cat, CATEGORY_TRANSLATIONS);
  const translatedSub = findTranslation(sub, SUBCATEGORY_TRANSLATIONS) || sub;

  if (translated && translatedSub) {
    return `${translated} (${translatedSub})`;
  }

  if (translated) {
    return translated;
  }

  if (cat && translatedSub) {
    return `${cat} / ${translatedSub}`;
  }

  return cat || translatedSub || 'Autres';
}

function findTranslation(value: string, dictionary: Record<string, string>): string | null {
  const cleaned = cleanText(value);
  if (!cleaned) {
    return null;
  }

  if (dictionary[cleaned]) {
    return dictionary[cleaned];
  }

  const compact = cleaned.replace(/\s+/g, '');
  if (dictionary[compact]) {
    return dictionary[compact];
  }

  for (const [key, translated] of Object.entries(dictionary)) {
    if (compact.includes(key) || key.includes(compact)) {
      return translated;
    }
  }

  return null;
}

function parseLevel(levelRaw: string): number {
  const firstNumber = Number.parseInt((levelRaw.match(/\d+/) || [])[0] || '1', 10);
  return Number.isFinite(firstNumber) ? firstNumber : 1;
}

function normalizeLevelLabel(levelRaw: string): string {
  const compact = cleanText(levelRaw).replace(/\s+/g, '');
  if (/^HSK\d+$/.test(compact)) {
    return compact.replace(/^HSK(\d+)$/, 'HSK $1');
  }
  if (/^HSK\d+-\d+$/.test(compact)) {
    return compact.replace(/^HSK(\d+-\d+)$/, 'HSK $1');
  }
  return compact || 'HSK 1';
}

function buildDisplayTitle(sourceTitle: string, categoryRaw: string, subRaw: string): string {
  const [headRaw, tailRaw] = splitTitleParts(sourceTitle);
  const head = cleanText(headRaw);
  const tail = cleanText(tailRaw);
  const translatedHead = translateTitleHead(head, categoryRaw, subRaw);

  if (tail && translatedHead) {
    return `${translatedHead} - ${tail}`;
  }
  if (tail) {
    const fallback = buildCategoryLabel(categoryRaw, subRaw);
    if (fallback && fallback !== 'Autres') {
      return `${fallback} - ${tail}`;
    }
    return tail;
  }
  if (translatedHead) {
    return translatedHead;
  }

  return sourceTitle;
}

function splitTitleParts(title: string): [string, string] {
  const parts = title.split(/\s*[—–-]\s*/);
  if (parts.length <= 1) {
    return [title, ''];
  }
  return [parts[0], parts.slice(1).join(' - ')];
}

function translateTitleHead(headRaw: string, categoryRaw: string, subRaw: string): string {
  const head = cleanText(headRaw);
  if (!head) {
    return '';
  }

  const direct = findTranslation(head, TITLE_HEAD_TRANSLATIONS);
  if (direct) {
    return direct;
  }

  const indexedPatterns: Array<[RegExp, string]> = [
    [/^比较句(\d+)$/, 'Phrases comparatives (type $1)'],
    [/^“把”字句(\d+)$/, 'Structure 把 (type $1)'],
    [/^“有”字句(\d+)$/, 'Structure 有 (type $1)'],
    [/^“是”字句(\d+)$/, 'Structure 是 (type $1)'],
    [/^存现句(\d+)$/, "Phrases d'existence (type $1)"],
    [/^连动句(\d+)$/, 'Verbes en série (type $1)'],
    [/^兼语句(\d+)$/, 'Construction pivot (type $1)'],
    [/^被动句(\d+)$/, 'Voix passive (type $1)'],
    [/^反问句(\d+)$/, 'Question rhétorique (type $1)'],
    [/^趋向补语(\d+)$/, 'Complément directionnel (type $1)'],
    [/^程度补语(\d+)$/, 'Complément de degré (type $1)'],
    [/^结果补语(\d+)$/, 'Complément de résultat (type $1)'],
    [/^状态补语(\d+)$/, "Complément d'état (type $1)"],
    [/^可能补语(\d+)$/, 'Complément de possibilité (type $1)'],
    [/^数量补语(\d+)$/, 'Complément quantitatif (type $1)'],
    [/^主谓句(\d+)$/, 'Phrase sujet-prédicat (type $1)'],
  ];

  for (const [pattern, replacement] of indexedPatterns) {
    if (pattern.test(head)) {
      return head.replace(pattern, replacement);
    }
  }

  const fallbackCategory = buildCategoryLabel(categoryRaw, subRaw);
  return fallbackCategory !== 'Autres' ? fallbackCategory : head;
}

function buildObjective(
  value: string,
  sourceTitle: string,
  categoryRaw: string,
  subRaw: string,
  elements: string[],
): string {
  const objective = cleanText(value);
  if (!objective || isTemplateObjective(objective)) {
    return buildFallbackObjective(sourceTitle, categoryRaw, subRaw, elements);
  }
  return objective;
}

function isTemplateObjective(value: string): boolean {
  const normalized = normalizeHeading(stripInlineMarkdown(value));
  return normalized.includes('ici on regroupe des mots')
    && normalized.includes('meme comportement grammatical');
}

function buildFallbackObjective(
  sourceTitle: string,
  categoryRaw: string,
  subRaw: string,
  elements: string[],
): string {
  const [headRaw] = splitTitleParts(sourceTitle);
  const translatedHead = translateTitleHead(headRaw, categoryRaw, subRaw);
  const tokens = elements.filter(Boolean).slice(0, 4);

  if (tokens.length > 0) {
    return `Comprendre l'emploi de **${tokens.join(' / ')}** et leur place dans la phrase.`;
  }

  if (translatedHead) {
    return `${translatedHead}: formes essentielles, usage et position dans la phrase.`;
  }

  return 'Point de grammaire essentiel à maîtriser pour produire des phrases correctes.';
}

function extractSections(body: string): SectionBlock[] {
  return Array.from(body.matchAll(/<section\s+class="sec">([\s\S]*?)<\/section>/g))
    .map((sectionMatch) => {
      const content = sectionMatch[1];
      const heading = cleanText((content.match(/<h3>([\s\S]*?)<\/h3>/) || [])[1] || '');
      return {
        heading,
        normalizedHeading: normalizeHeading(heading),
        content,
      };
    })
    .filter((section) => section.heading.length > 0);
}

function normalizeHeading(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getMatchingSections(sections: SectionBlock[], headingTokens: string[]): SectionBlock[] {
  return sections.filter((section) => headingTokens.some((token) => section.normalizedHeading.includes(token)));
}

function getSectionParagraph(sections: SectionBlock[], headingTokens: string[]): string {
  const section = getMatchingSections(sections, headingTokens)[0];
  if (!section) return '';

  const paragraphMatch = section.content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  return paragraphMatch ? cleanText(paragraphMatch[1]) : '';
}

function getSectionStructure(sections: SectionBlock[]): string {
  const section = getMatchingSections(sections, ['structure', 'schema'])[0];
  if (!section) return '';

  const codeMatch = section.content.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)
    || section.content.match(/<code>([\s\S]*?)<\/code>/)
    || section.content.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  return codeMatch ? cleanText(codeMatch[1]).replace(/\s+/g, ' ') : '';
}

function getSectionList(sections: SectionBlock[], headingTokens: string[]): string[] {
  const matching = getMatchingSections(sections, headingTokens);
  const values: string[] = [];

  for (const section of matching) {
    const listItems = Array.from(section.content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g))
      .map((item) => cleanText(item[1]))
      .filter(Boolean);

    if (listItems.length > 0) {
      values.push(...listItems);
      continue;
    }

    const paragraphMatch = section.content.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (paragraphMatch) {
      const paragraph = cleanText(paragraphMatch[1]);
      if (paragraph && paragraph !== '—') {
        values.push(paragraph);
      }
    }
  }

  return dedupe(values);
}

function getSectionElements(sections: SectionBlock[], title: string): string[] {
  const section = getMatchingSections(sections, ['elements concernes', 'elements'])[0];
  const fromPills = section
    ? Array.from(section.content.matchAll(/<span\s+class=['"]pill['"]>([\s\S]*?)<\/span>/g))
      .map((item) => cleanText(item[1]))
      .filter(Boolean)
    : [];

  if (fromPills.length > 0) {
    return dedupe(fromPills);
  }

  const tail = title.includes('—') ? title.split('—').slice(1).join('—') : title;
  const fallback = tail
    .replace(/\.\.\.|…/g, '')
    .split(/[、,，/]/g)
    .map((item) => cleanText(item))
    .filter(Boolean);

  return dedupe(fallback);
}

function extractExamples(body: string): GrammarExample[] {
  return Array.from(
    body.matchAll(/<div\s+class=['"]ex['"]>[\s\S]*?<div\s+class=['"]zh['"]>([\s\S]*?)<\/div>[\s\S]*?<div\s+class=['"]fr['"]>([\s\S]*?)<\/div>[\s\S]*?<\/div>/g),
  )
    .map((example) => {
      const chinese = cleanText(example[1]);
      const french = cleanText(example[2]);
      const fallback = HSK_SENTENCE_INDEX.get(chinese)
        || HSK_SENTENCE_INDEX.get(normalizeChineseSentence(chinese));
      const guessedPinyin = guessExamplePinyin(chinese);
      return {
        chinese,
        french,
        pinyin: fallback?.pinyin || guessedPinyin || undefined,
      };
    })
    .filter((example) => example.chinese || example.french);
}

function buildHSKPinyinLexicon(): Map<string, string> {
  const lexicon = new Map<string, string>();

  for (const fileName of HSK_EXAMPLE_FILES) {
    const fileCandidates: Array<string | URL> = [
      new URL(`./${fileName}`, import.meta.url),
      resolve(process.cwd(), 'src', 'data', fileName),
      resolve(process.cwd(), 'xiaolearn_reference', 'src', 'data', fileName),
    ];
    const existingFile = fileCandidates.find((candidate) => existsSync(candidate));
    if (!existingFile) continue;

    let records: unknown;
    try {
      records = JSON.parse(readFileSync(existingFile, 'utf-8'));
    } catch {
      continue;
    }

    if (!Array.isArray(records)) continue;

    for (const record of records) {
      if (!record || typeof record !== 'object') continue;

      const rawHanzi = cleanText(String((record as { hanzi?: unknown }).hanzi || ''));
      const basePinyin = cleanText(String((record as { pinyin?: unknown }).pinyin || ''));
      if (rawHanzi && basePinyin) {
        for (const term of extractHanziVariants(rawHanzi)) {
          setBestPinyin(lexicon, term, basePinyin);
        }
      }

      const examplesRaw = (record as { examples?: unknown }).examples;
      if (!Array.isArray(examplesRaw)) continue;
      for (const example of examplesRaw) {
        if (!example || typeof example !== 'object') continue;
        const chinese = cleanText(String((example as { chinese?: unknown }).chinese || ''));
        const pinyin = cleanText(String((example as { pinyin?: unknown }).pinyin || ''));
        if (chinese && pinyin) {
          setBestPinyin(lexicon, chinese, pinyin);
        }
      }
    }
  }

  return lexicon;
}

function getMaxLexiconKeyLength(lexicon: Map<string, string>): number {
  let max = 1;
  for (const key of lexicon.keys()) {
    if (key.length > max) max = key.length;
  }
  return max;
}

function pinyinQualityScore(value: string): number {
  return value.replace(/\s+/g, ' ').trim().length;
}

function setBestPinyin(lexicon: Map<string, string>, hanzi: string, pinyin: string): void {
  if (!hanzi || !pinyin) return;
  const existing = lexicon.get(hanzi);
  if (!existing || pinyinQualityScore(pinyin) > pinyinQualityScore(existing)) {
    lexicon.set(hanzi, pinyin);
  }
}

function guessExamplePinyin(chinese: string): string {
  const text = cleanText(chinese);
  if (!text) return '';

  const tokens: string[] = [];
  let index = 0;
  let totalHanzi = 0;
  let matchedHanzi = 0;

  while (index < text.length) {
    const char = text[index];
    if (/[，,。.!！？?、；;：:“”"'’‘（）()【】\[\]\s]/.test(char)) {
      tokens.push(char);
      index += 1;
      continue;
    }

    if (!/[\u3400-\u9fff]/.test(char)) {
      index += 1;
      continue;
    }

    totalHanzi += 1;
    let matchedLength = 0;
    let matchedPinyin = '';
    const maxLength = Math.min(HSK_PINYIN_MAX_KEY_LENGTH, text.length - index);
    for (let length = maxLength; length >= 1; length -= 1) {
      const segment = text.slice(index, index + length);
      const pinyin = HSK_PINYIN_LEXICON.get(segment);
      if (!pinyin) continue;
      matchedLength = length;
      matchedPinyin = pinyin;
      break;
    }

    if (matchedLength > 0) {
      tokens.push(matchedPinyin);
      matchedHanzi += matchedLength;
      if (matchedLength > 1) {
        totalHanzi += matchedLength - 1;
      }
      index += matchedLength;
      continue;
    }

    index += 1;
  }

  if (totalHanzi === 0 || matchedHanzi === 0) return '';
  if (matchedHanzi / totalHanzi < 0.65) return '';

  return tokens
    .join(' ')
    .replace(/\s+([,.;!?，。！？；：])/g, '$1')
    .replace(/([（(])\s+/g, '$1')
    .replace(/\s+([）)])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildHSKExampleIndex(): Map<string, GrammarExample[]> {
  const index = new Map<string, GrammarExample[]>();

  for (const fileName of HSK_EXAMPLE_FILES) {
    const fileCandidates: Array<string | URL> = [
      new URL(`./${fileName}`, import.meta.url),
      resolve(process.cwd(), 'src', 'data', fileName),
      resolve(process.cwd(), 'xiaolearn_reference', 'src', 'data', fileName),
    ];
    const existingFile = fileCandidates.find((candidate) => existsSync(candidate));
    if (!existingFile) continue;

    let records: unknown;
    try {
      records = JSON.parse(readFileSync(existingFile, 'utf-8'));
    } catch {
      continue;
    }

    if (!Array.isArray(records)) continue;

    for (const record of records) {
      if (!record || typeof record !== 'object') continue;
      const hanzi = typeof (record as { hanzi?: unknown }).hanzi === 'string'
        ? cleanText(String((record as { hanzi: string }).hanzi))
        : '';
      if (!hanzi) continue;

      const examplesRaw = (record as { examples?: unknown }).examples;
      if (!Array.isArray(examplesRaw) || examplesRaw.length === 0) continue;

      const entryExamples = examplesRaw
        .map((example) => {
          if (!example || typeof example !== 'object') return null;
          const chinese = cleanText(String((example as { chinese?: unknown }).chinese || ''));
          const french = cleanText(
            String(
              (example as { translationFr?: unknown }).translationFr
                || (example as { translation?: unknown }).translation
                || '',
            ),
          );
          const pinyin = cleanText(String((example as { pinyin?: unknown }).pinyin || ''));
          if (!chinese || !french) return null;
          return {
            chinese,
            french,
            pinyin: pinyin || guessExamplePinyin(chinese) || undefined,
          };
        })
        .filter((example): example is GrammarExample => example !== null);

      if (entryExamples.length === 0) continue;

      const terms = extractHanziVariants(hanzi);
      for (const term of terms) {
        const relatedExamples = entryExamples.filter((example) => example.chinese.includes(term));
        if (relatedExamples.length === 0) continue;

        const previous = index.get(term) ?? [];
        index.set(term, dedupeExamples(previous.concat(relatedExamples)));
      }
    }
  }

  return index;
}

function buildHSKSentenceIndex(termIndex: Map<string, GrammarExample[]>): Map<string, GrammarExample> {
  const sentenceIndex = new Map<string, GrammarExample>();
  for (const examples of termIndex.values()) {
    for (const example of examples) {
      if (!sentenceIndex.has(example.chinese)) {
        sentenceIndex.set(example.chinese, example);
      }
      const normalizedChinese = normalizeChineseSentence(example.chinese);
      if (normalizedChinese && !sentenceIndex.has(normalizedChinese)) {
        sentenceIndex.set(normalizedChinese, example);
      }
    }
  }
  return sentenceIndex;
}

function normalizeChineseSentence(value: string): string {
  return value
    .replace(/[，,。.!！？?、；;：:“”"'’‘（）()【】\[\]\s]/g, '')
    .trim();
}

function buildHSKTermInfoIndex(): Map<string, HSKTermInfo> {
  const infoIndex = new Map<string, HSKTermInfo>();

  for (const fileName of HSK_EXAMPLE_FILES) {
    const fileCandidates: Array<string | URL> = [
      new URL(`./${fileName}`, import.meta.url),
      resolve(process.cwd(), 'src', 'data', fileName),
      resolve(process.cwd(), 'xiaolearn_reference', 'src', 'data', fileName),
    ];
    const existingFile = fileCandidates.find((candidate) => existsSync(candidate));
    if (!existingFile) continue;

    let records: unknown;
    try {
      records = JSON.parse(readFileSync(existingFile, 'utf-8'));
    } catch {
      continue;
    }

    if (!Array.isArray(records)) continue;

    for (const record of records) {
      if (!record || typeof record !== 'object') continue;
      const rawHanzi = typeof (record as { hanzi?: unknown }).hanzi === 'string'
        ? cleanText(String((record as { hanzi: string }).hanzi))
        : '';
      if (!rawHanzi) continue;

      const variants = extractHanziVariants(rawHanzi);
      if (variants.length === 0) continue;

      const translationFr = cleanText(
        String(
          (record as { translationFr?: unknown }).translationFr
            || (record as { translation?: unknown }).translation
            || '',
        ),
      );
      const explanationFrRaw = cleanText(String((record as { explanationFr?: unknown }).explanationFr || ''));
      const explanationFr = shortFrenchExplanation(explanationFrRaw);

      for (const variant of variants) {
        const existing = infoIndex.get(variant);
        const candidate: HSKTermInfo = {
          term: variant,
          translationFr,
          explanationFr,
        };
        if (!existing) {
          infoIndex.set(variant, candidate);
          continue;
        }

        // Prefer entries with richer French metadata.
        const existingScore = Number(Boolean(existing.translationFr)) + Number(Boolean(existing.explanationFr));
        const candidateScore = Number(Boolean(candidate.translationFr)) + Number(Boolean(candidate.explanationFr));
        if (candidateScore > existingScore) {
          infoIndex.set(variant, candidate);
        }
      }
    }
  }

  return infoIndex;
}

function shortFrenchExplanation(value: string): string {
  if (!value) return '';
  const firstSentence = value.split(/(?<=[.!?])\s+/)[0]?.trim() || value.trim();
  if (!firstSentence) return '';

  const compact = firstSentence.replace(/\s+/g, ' ');
  if (compact.length <= 140) return compact;
  return `${compact.slice(0, 137).trim()}...`;
}

function normalizeGrammarTerm(value: string): string {
  return cleanText(value)
    .replace(/[0-9]+$/g, '')
    .replace(/[（(][^)）]*[)）]/g, '')
    .replace(/\s+/g, '');
}

function displayGrammarTerm(value: string): string {
  const normalized = normalizeGrammarTerm(value);
  return normalized || cleanText(value);
}

function findTermInfo(variants: string[]): HSKTermInfo | null {
  let best: HSKTermInfo | null = null;

  for (const variant of variants) {
    const info = HSK_TERM_INFO_INDEX.get(variant);
    if (!info) continue;
    if (!best) {
      best = info;
      continue;
    }

    const bestScore = Number(Boolean(best.translationFr)) + Number(Boolean(best.explanationFr));
    const infoScore = Number(Boolean(info.translationFr)) + Number(Boolean(info.explanationFr));
    if (infoScore > bestScore) {
      best = info;
    }
  }

  return best;
}

function buildParticleHintsForTerm(variants: string[], examples: GrammarExample[]): string {
  const related = examples.filter((example) => variants.some((variant) => example.chinese.includes(variant)));
  if (related.length === 0) return '';

  const foundLabels = PARTICLE_HINT_LABELS
    .filter(([token]) => related.some((example) => example.chinese.includes(token)))
    .map(([, label]) => label)
    .slice(0, 5);

  if (foundLabels.length === 0) return '';
  return `Combinaisons fréquentes observées : ${foundLabels.join(', ')}.`;
}

function buildTermVariations(elements: string[], sourceTitle: string, examples: GrammarExample[]): string[] {
  const terms = collectExampleTerms(elements, sourceTitle);
  if (terms.length === 0) return [];

  const normalizedTerms = dedupe(terms.map((term) => normalizeGrammarTerm(term)).filter(Boolean));
  const cappedTerms = normalizedTerms.slice(0, 8);
  const key = cappedTerms.slice().sort((a, b) => a.localeCompare(b)).join('|');
  const guidance: string[] = [];

  if (TERM_CONTRAST_HINTS[key]) {
    guidance.push(...TERM_CONTRAST_HINTS[key]);
  }

  for (const term of cappedTerms) {
    const variants = extractHanziVariants(term);
    const info = findTermInfo(variants.length > 0 ? variants : [term]);
    const particleHint = buildParticleHintsForTerm(variants.length > 0 ? variants : [term], examples);

    let line = `**${term}**`;
    if (info?.translationFr) {
      line += ` : ${info.translationFr}.`;
    } else {
      line += ' : emploi à distinguer selon le contexte.';
    }
    if (info?.explanationFr) {
      line += ` ${info.explanationFr}`;
    }
    if (particleHint) {
      line += ` ${particleHint}`;
    }

    guidance.push(line.trim());
  }

  if (normalizedTerms.length > cappedTerms.length) {
    guidance.push('D’autres termes de cette leçon suivent le même principe : compare-les avec les exemples pour valider le contexte.');
  }

  return dedupe(guidance);
}

function buildFallbackUsage(elements: string[], sourceTitle: string, examples: GrammarExample[]): string[] {
  const terms = collectExampleTerms(elements, sourceTitle).map((term) => normalizeGrammarTerm(term)).filter(Boolean);
  const uniqueTerms = dedupe(terms);
  if (uniqueTerms.length <= 1) return [];

  const key = uniqueTerms.slice(0, 8).sort((a, b) => a.localeCompare(b)).join('|');
  if (TERM_CONTRAST_HINTS[key]) {
    return TERM_CONTRAST_HINTS[key].slice(0, 3);
  }

  const firstTerm = uniqueTerms[0];
  const secondTerm = uniqueTerms[1];
  const hasParticleContrast = examples.some((example) => /[了吗不没把被]/.test(example.chinese));

  const generic = [
    `Comparer **${firstTerm}** et **${secondTerm}** avant de remplacer un terme par un autre dans une même phrase.`,
    'Vérifier la position dans la phrase (avant le verbe, après le verbe, ou dans le groupe nominal).',
  ];

  if (hasParticleContrast) {
    generic.push('Tester aussi la compatibilité avec les particules visibles dans les exemples (了, 吗, 不/没, etc.).');
  }

  return generic;
}

function extractHanziVariants(value: string): string[] {
  const text = cleanText(value);
  if (!text) return [];

  const chunks = text.match(/[\u4e00-\u9fff]+/g) ?? [];
  if (chunks.length === 0) return [];

  const hasListDelimiter = /[、,，/]/.test(text);
  const hasOptionalMarker = /[（(].*[）)]/.test(text);
  const variants = new Set<string>();

  chunks.forEach((chunk, index) => {
    if (hasOptionalMarker && !hasListDelimiter && chunks.length > 1 && chunk.length === 1 && index > 0) {
      return;
    }
    variants.add(chunk);
  });

  if (hasOptionalMarker && !hasListDelimiter && chunks.length > 1) {
    const compact = chunks.join('');
    if (compact.length > 1) {
      variants.add(compact);
    }
  }

  return Array.from(variants);
}

function collectExampleTerms(elements: string[], sourceTitle: string): string[] {
  const titleTokens = extractTitleTokens(sourceTitle).flatMap((token) => extractHanziVariants(token));
  const rawTerms = dedupe(elements.flatMap((term) => extractHanziVariants(term)).concat(titleTokens));

  return rawTerms.filter((term) => {
    if (!term) return false;
    if (NON_LEXICAL_TERMS.has(term)) return false;
    return /[\u4e00-\u9fff]/.test(term);
  });
}

function dedupeExamples(examples: GrammarExample[]): GrammarExample[] {
  const seen = new Set<string>();
  const output: GrammarExample[] = [];

  for (const example of examples) {
    const key = `${example.chinese}|||${example.french}`;
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(example);
  }

  return output;
}

function countExamplesForTerm(examples: GrammarExample[], term: string): number {
  return examples.reduce((count, example) => (example.chinese.includes(term) ? count + 1 : count), 0);
}

function buildRelevantExamples(rawExamples: GrammarExample[], elements: string[], sourceTitle: string): GrammarExample[] {
  const terms = collectExampleTerms(elements, sourceTitle);
  const baseExamples = dedupeExamples(rawExamples);
  if (terms.length === 0) {
    return baseExamples.map(attachPinyinToExample);
  }

  const termFilteredBase = baseExamples.filter((example) => terms.some((term) => example.chinese.includes(term)));
  const fromLexicon = dedupeExamples(
    terms.flatMap((term) => HSK_EXAMPLE_INDEX.get(term) ?? []),
  );
  const candidatePool = dedupeExamples(fromLexicon.concat(termFilteredBase))
    .sort((a, b) => Number(Boolean(b.pinyin)) - Number(Boolean(a.pinyin)));
  const desiredPerTerm = terms.length === 1 ? 2 : 1;
  const selected: GrammarExample[] = [];

  for (const term of terms) {
    for (const example of candidatePool) {
      if (!example.chinese.includes(term)) continue;
      if (selected.some((item) => item.chinese === example.chinese && item.french === example.french)) continue;

      selected.push(example);
      if (countExamplesForTerm(selected, term) >= desiredPerTerm) break;
    }
  }

  // Keep a little extra context when available, while prioritizing term coverage.
  const targetMin = Math.max(terms.length * desiredPerTerm, 2);
  for (const example of candidatePool) {
    if (selected.length >= targetMin + 2) break;
    if (selected.some((item) => item.chinese === example.chinese && item.french === example.french)) continue;
    selected.push(example);
  }

  return (selected.length > 0 ? selected : baseExamples).map(attachPinyinToExample);
}

function attachPinyinToExample(example: GrammarExample): GrammarExample {
  if (example.pinyin) return example;
  const guessedPinyin = guessExamplePinyin(example.chinese);
  if (!guessedPinyin) return example;
  return { ...example, pinyin: guessedPinyin };
}

function buildGroups(points: GrammarPoint[]): GrammarGroup[] {
  return GROUP_DEFINITIONS.map((group) => {
    const tokenSet = new Set(group.matchTokens.map((token) => normalizeToken(token)));
    const tokenCoverage = new Set<string>();

    const matchedPoints = points.filter((point) => {
      if (group.categorySource && point.categorySource !== group.categorySource) {
        return false;
      }
      if (group.subcategorySource && point.subcategorySource !== group.subcategorySource) {
        return false;
      }

      const candidates = new Set<string>([
        ...point.elements.map((value) => normalizeToken(value)),
        ...extractTitleTokens(point.sourceTitle).map((value) => normalizeToken(value)),
      ]);

      let hasMatch = false;
      for (const token of tokenSet) {
        if (candidates.has(token)) {
          hasMatch = true;
          tokenCoverage.add(token);
        }
      }

      return hasMatch;
    });

    if (tokenCoverage.size < 2 || matchedPoints.length === 0) {
      return null;
    }

    const levelSet = Array.from(new Set(matchedPoints.map((point) => point.level))).sort((a, b) => a - b);

    return {
      slug: group.slug,
      title: group.title,
      summary: group.summary,
      levelSet,
      pointIds: matchedPoints.map((point) => point.id),
    };
  }).filter((group): group is GrammarGroup => group !== null);
}

function buildPointGroupMap(groups: GrammarGroup[]): Map<string, GrammarGroup[]> {
  const map = new Map<string, GrammarGroup[]>();

  for (const group of groups) {
    for (const pointId of group.pointIds) {
      const existing = map.get(pointId) ?? [];
      existing.push(group);
      map.set(pointId, existing);
    }
  }

  return map;
}

function buildFeaturedPoints(points: GrammarPoint[]): GrammarPoint[] {
  const selected: GrammarPoint[] = [];
  const used = new Set<string>();

  for (const token of FEATURED_TOKEN_CANDIDATES) {
    const normalized = normalizeToken(token);
    const found = points.find((point) => {
      if (used.has(point.id)) return false;
      if (normalizeToken(point.sourceTitle).includes(normalized)) return true;
      return point.elements.some((element) => normalizeToken(element).includes(normalized));
    });

    if (!found) continue;
    selected.push(found);
    used.add(found.id);

    if (selected.length >= 12) {
      return selected;
    }
  }

  const fallback = points.filter((point) => !used.has(point.id)).slice(0, 12 - selected.length);
  return selected.concat(fallback).slice(0, 12);
}

function extractTitleTokens(title: string): string[] {
  const tail = title.includes('—') ? title.split('—').slice(1).join('—') : title;
  return tail
    .replace(/\\.\\.\\.|…/g, '')
    .split(/[、,，/]/g)
    .map((item) => cleanText(item))
    .filter(Boolean);
}

function normalizeToken(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[0-9]+$/g, '')
    .replace(/[（）()：:，,。.!?？、·\s]/g, '')
    .toLowerCase()
    .trim();
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/__/g, '');
}

function cleanText(value: string): string {
  return decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatInlineGrammarText(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
    .replace(/\*\*/g, '')
    .replace(/__/g, '');
}

export function toPlainGrammarText(value: string): string {
  return stripInlineMarkdown(value).replace(/\s+/g, ' ').trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(normalized);
  }

  return output;
}

export function getGrammarPoints(): GrammarPoint[] {
  return CATALOG.points;
}

export function getGrammarPointById(id: string): GrammarPoint | undefined {
  return CATALOG.pointsById.get(id);
}

export function getGrammarGroups(): GrammarGroup[] {
  return CATALOG.groups;
}

export function getGroupsForPoint(pointId: string): GrammarGroup[] {
  return CATALOG.pointGroups.get(pointId) ?? [];
}

export function getFeaturedGrammarPoints(): GrammarPoint[] {
  return CATALOG.featuredPoints;
}

export function formatHSKLevelLabel(value: string): string {
  return value
    .replace(/^HSK(?=\d)/, 'HSK ')
    .replace(/HSK\s*(\d+)\s*-\s*(\d+)/, 'HSK $1-$2');
}
