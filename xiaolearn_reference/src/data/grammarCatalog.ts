import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const SOURCE_POINTS_DIR = 'points';
const FALLBACK_GRAMMAR_FILE = 'hsk_grammar_hsk1_to_hsk7_9_articles.html';
const HSK_EXAMPLE_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json'];
const NON_LEXICAL_TERMS = new Set([
  '语法',
  '结构',
  '句子',
  '短语',
  '主语',
  '谓语',
  '宾语',
  '施事',
  '受事',
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
const NON_EXAMPLE_TERM_SUFFIXES = ['表示法', '表达法', '句型', '结构', '语法', '格式'];
const META_DESCRIPTOR_FRAGMENTS = ['表示', '动作', '行为', '意义', '用法', '开始', '持续', '引申', '伴随', '施事', '受事'];
const CONTEXTUAL_TERM_TRANSLATIONS: Record<string, string> = {
  小数: 'décimal',
  分数: 'fraction',
  百分数: 'pourcentage',
  倍数: 'multiple',
};

const PARTICLE_HINT_LABELS: Array<[string, string]> = [
  ['了', '了 (aspect/changement)'],
  ['着', '着 (duratif)'],
  ['过', '过 (expérience)'],
  ['吗', '吗 (interrogation)'],
  ['呢', '呢 (progressif/insistance)'],
  ['不', '不 (négation générale)'],
  ['没', '没/没有 (négation du passé)'],
  ["把", "把 (mise en avant de l'objet)"],
  ['被', '被 (passif)'],
  ['得', '得 (degré/complément)'],
];

const TERM_CONTRAST_HINTS: Record<string, string[]> = {
  '在|正在': [
    '在 + verbe et 正在 + verbe indiquent une action en cours.',
    "正在 insiste davantage sur l'action en cours (souvent plus explicite/formel).",
    'Pour la localisation, on utilise 在 + lieu (pas *正在 + lieu).',
  ],
  '会|能': [
    "会 met l'accent sur une capacité acquise (savoir-faire).",
    '能 exprime surtout la possibilité/capacité concrète selon la situation.',
  ],
  '会|能|可以': [
    '会 : compétence apprise.',
    '能 : possibilité/capacité concrète.',
    '可以 : permission / autorisation.',
  ],
  '不|没': [
    '不 sert surtout pour le présent/futur, les habitudes et les états.',
    "没/没有 sert surtout pour nier un fait passé ou l'existence/possession.",
  ],
  '不|没有': [
    '不 sert surtout pour le présent/futur, les habitudes et les états.',
    '没有 sert surtout pour nier un fait passé ou la possession/existence.',
  ],
  '没|没有': [
    "没 est la forme courte fréquente à l'oral.",
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
    "快 + adjectif/verbe peut exprimer la rapidité ou l'imminence selon le contexte.",
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
const GRAMMAR_ARTICLES_DIR = resolveGrammarArticlesDir();
const GRAMMAR_POINTS_DIR = GRAMMAR_ARTICLES_DIR
  ? resolve(GRAMMAR_ARTICLES_DIR, SOURCE_POINTS_DIR)
  : null;
const CATALOG = buildCatalog();

function buildCatalog() {
  const pointFiles = listGrammarPointFiles(GRAMMAR_POINTS_DIR);
  const sourceFiles = pointFiles.length > 0
    ? pointFiles
    : listFallbackGrammarFiles(GRAMMAR_ARTICLES_DIR);

  if (sourceFiles.length === 0) {
    throw new Error(
      `Aucun fichier de fiche trouvé dans grammar_articles/${SOURCE_POINTS_DIR} (attendu: 1 fiche = 1 fichier HTML).`,
    );
  }

  if (pointFiles.length === 0) {
    console.warn(
      `Aucun fichier trouvé dans grammar_articles/${SOURCE_POINTS_DIR}; fallback sur ${FALLBACK_GRAMMAR_FILE}.`,
    );
  }

  const points = sourceFiles
    .flatMap((fileName) => parseGrammarFile(fileName))
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

function resolveGrammarArticlesDir(): string | null {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    resolve(process.cwd(), 'grammar_articles'),
    resolve(process.cwd(), 'xiaolearn_reference', 'grammar_articles'),
    resolve(moduleDir, '../../grammar_articles'),
    resolve(moduleDir, '../../../grammar_articles'),
    resolve(moduleDir, '../../../../grammar_articles'),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function listGrammarPointFiles(pointsDir: string | null): string[] {
  if (!pointsDir || !existsSync(pointsDir)) {
    return [];
  }

  return readdirSync(pointsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => resolve(pointsDir, entry.name))
    .sort((a, b) => a.localeCompare(b, 'en'));
}

function listFallbackGrammarFiles(grammarDir: string | null): string[] {
  if (!grammarDir || !existsSync(grammarDir)) {
    return [];
  }

  const preferredPath = resolve(grammarDir, FALLBACK_GRAMMAR_FILE);
  if (existsSync(preferredPath)) {
    return [preferredPath];
  }

  return readdirSync(grammarDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => resolve(grammarDir, entry.name))
    .sort((a, b) => a.localeCompare(b, 'en'));
}

function parseGrammarFile(filePath: string): GrammarPoint[] {
  if (!existsSync(filePath)) {
    return [];
  }

  const html = readFileSync(filePath, 'utf-8');
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
    const usage = getSectionList(sections, ['comment lutiliser', 'comment l utiliser', 'emploi', 'usage'])
      .filter((item) => !isTemplateUsage(item));
    const elements = getSectionElements(sections, sourceTitle);
    const rawExamples = extractExamples(body);
    const filteredExamples = rawExamples.filter((example) => !isTemplateExample(example));
    const fixedExpressionPoint = isFixedExpressionStylePoint(sourceTitle);
    const hasFixedExpressionExamples = fixedExpressionPoint
      ? hasFixedExpressionContextExample(filteredExamples, sourceTitle, elements)
      : true;
    const isTemplatePoint = isTemplateObjective(objectiveRaw)
      || filteredExamples.length < rawExamples.length
      || (fixedExpressionPoint && filteredExamples.length > 0 && !hasFixedExpressionExamples);
    const numericNotationPoint = isNumericNotationTitle(sourceTitle);
    const objective = buildObjective(objectiveRaw, sourceTitle, categoryRaw, subRaw, elements);
    const generatedTemplateExamples = isTemplatePoint
      ? buildTemplateExamplesFromStructure(structure, sourceTitle, elements)
      : [];
    let examples = dedupeExamples(
      generatedTemplateExamples.concat(
        buildRelevantExamples(filteredExamples, elements, sourceTitle, { preferSentences: isTemplatePoint }),
      ),
    ).slice(0, 6);
    if (numericNotationPoint) {
      const filteredNumericExamples = examples.filter(
        (example) => isSentenceLikeExample(example) || /(?:百分之|分之|点[零一二三四五六七八九十百千万两0-9]|倍)/.test(example.chinese),
      );
      if (filteredNumericExamples.length >= 3) {
        examples = filteredNumericExamples.slice(0, 6);
      }
    }
    const termVariations = isTemplatePoint ? [] : buildTermVariations(elements, sourceTitle, examples);
    const noteContextTerms = new Set(collectExampleTerms(elements, sourceTitle));
    const notesFromSections = getSectionList(sections, ['notes', 'remarques', 'attention'])
      .filter((item) => !isTemplateNote(item))
      .filter((item) => (isTemplatePoint ? isContextualTemplateNote(item, noteContextTerms, examples) : true));
    const notes = dedupe(notesFromSections.concat(termVariations));
    const effectiveUsage = usage.length > 0
      ? usage
      : (
          isTemplatePoint
            ? buildTemplateUsageFromStructure(structure, elements, sourceTitle, examples)
            : buildFallbackUsage(elements, sourceTitle, examples, structure)
        );
    const rawMistakes = getSectionList(sections, ['pieges frequents', 'erreurs frequentes'])
      .filter((item) => !isTemplateMistake(item));
    const commonMistakes = rawMistakes.length > 0
      ? rawMistakes
      : (isTemplatePoint ? buildFallbackCommonMistakes(elements, sourceTitle, structure) : []);

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
  return (
    normalized.includes('ici on regroupe des mots') && normalized.includes('meme comportement grammatical')
  ) || normalized.includes('ici on traite d un schema fige')
    || normalized.includes('ici on traite d une expression structuree')
    || normalized.includes('ici on traite d un type de phrase')
    || normalized.includes('ici on traite des elements morphologiques');
}

function isTemplateExample(example: GrammarExample): boolean {
  const zh = normalizeHeading(example.chinese);
  const fr = normalizeHeading(example.french);
  return zh === normalizeHeading('我今天学习中文')
    && fr.includes(normalizeHeading("Aujourd'hui j'étudie le chinois"));
}

function isTemplateUsage(value: string): boolean {
  const normalized = normalizeHeading(stripInlineMarkdown(value));
  return normalized.includes('verifier la position dans la phrase')
    || normalized.includes('verifier la position des blocs')
    || normalized.includes('tester aussi la compatibilite avec les particules visibles')
    || normalized.includes('tester la compatibilite avec les particules')
    || normalized.includes('avant le verbe apres le verbe ou dans le groupe nominal')
    || (normalized.includes('comparer') && normalized.includes('avant de remplacer'))
    || (normalized.includes('comparer') && normalized.includes('dans une meme phrase') && normalized.includes('remplacer'))
    || normalized.includes('partir du patron')
    || normalized.includes('reprends une phrase modele')
    || normalized.includes('copier une phrase modele')
    || normalized.includes('remplace seulement les informations variables')
    || normalized.includes('en gardant la meme charpente')
    || normalized.includes('ne pas permuter');
}

function isTemplateNote(value: string): boolean {
  const normalized = normalizeHeading(stripInlineMarkdown(value));
  return (
    normalized.includes('de determination')
    && normalized.includes('relie un modifieur a un nom')
  ) || normalized.includes('emploi a distinguer selon le contexte')
    || normalized.includes('emploi a distingeur selon le contexte')
    || normalized.includes('attention a la place des groupes longs');
}

function isTemplateMistake(value: string): boolean {
  const normalized = normalizeHeading(stripInlineMarkdown(value));
  return normalized.includes('ne pas confondre la fonction categorie structure avec le vocabulaire')
    || normalized.includes('verifier la place dans la phrase')
    || normalized.includes('eviter une phrase trop courte qui sonne artificielle')
    || normalized.includes('ne pas intervertir')
    || normalized.includes('verifier l ordre des elements')
    || normalized.includes('utiliser une phrase complete pour valider la structure');
}

interface StructureEntry {
  label: string;
  pattern: string;
  raw: string;
}

function parseStructureEntries(structure: string): StructureEntry[] {
  const seen = new Set<string>();
  return structure
    .split('\n')
    .map((line) => cleanText(line))
    .filter(Boolean)
    .map((line) => {
      const [left, ...right] = line.split(/[：:]/);
      if (right.length === 0) {
        return { label: '', pattern: cleanText(left), raw: line };
      }
      return {
        label: cleanText(left),
        pattern: cleanText(right.join(':')),
        raw: line,
      };
    })
    .filter((entry) => {
      const key = `${entry.label}|${entry.pattern}|${entry.raw}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function extractPatternSlots(pattern: string): string[] {
  const rawSlots = cleanText(pattern).match(/[A-Z甲乙丙丁]/g) ?? [];
  return dedupe(rawSlots);
}

function buildTemplateUsageFromStructure(
  structure: string,
  elements: string[],
  sourceTitle: string,
  examples: GrammarExample[],
): string[] {
  const entries = parseStructureEntries(structure);
  const usage: string[] = [];

  for (const entry of entries) {
    const normalized = entry.pattern.replace(/\s+/g, '');
    if (normalized.includes('点')) {
      usage.push('Pour les décimaux (点), lire chaque chiffre après 点 séparément.');
    }
    if (normalized.includes('分之')) {
      usage.push("En fraction, l'ordre est dénominateur puis numérateur : B分之A.");
    }
    if (normalized.includes('百分之')) {
      usage.push('Pour un pourcentage, utiliser 百分之 + nombre.');
    }
    if (normalized.includes('倍')) {
      usage.push('Pour les multiples, utiliser la comparaison complète avec 倍 (ex. A是B的X倍).');
    }
  }

  if (entries.length > 0) {
    const primaryPattern = entries[0]?.pattern || entries[0]?.raw || '';
    usage.push(`Partir du patron : **${primaryPattern}**.`);
    const slots = extractPatternSlots(primaryPattern);
    if (slots.length > 0) {
      usage.push(`Remplacer ${slots.map((slot) => `**${slot}**`).join(', ')} selon le sens, sans changer l'ordre.`);
    }
    const placementHint = buildStructurePlacementHint(primaryPattern);
    const structureContextHint = buildStructureContextHint(primaryPattern);
    const contextHint = buildUsageContextHint(examples, sourceTitle, false);
    if (placementHint) usage.push(placementHint);
    if (structureContextHint) usage.push(structureContextHint);
    else if (contextHint) usage.push(contextHint);
  }

  const fallback = usage.length > 0 ? usage : buildFallbackUsage(elements, sourceTitle, examples, structure);
  if (fallback.length === 0 && entries.length > 0) {
    fallback.push(`Suivre la structure **${entries[0].pattern || entries[0].raw}** en conservant l'ordre des éléments.`);
  }
  return dedupe(fallback).slice(0, 6);
}

function buildTemplateExamplesFromStructure(
  structure: string,
  sourceTitle = '',
  elements: string[] = [],
): GrammarExample[] {
  const entries = parseStructureEntries(structure);
  const generated: GrammarExample[] = [];

  for (const entry of entries) {
    const normalized = entry.pattern.replace(/\s+/g, '');

    if (normalized.includes('百分之')) {
      generated.push({
        chinese: '这次调查的满意度是百分之八十。',
        french: 'Le taux de satisfaction de cette enquête est de 80 %.',
      });
      continue;
    }
    if (normalized.includes('分之')) {
      generated.push({
        chinese: '三分之二的学生选择了线上课程。',
        french: 'Deux tiers des étudiants ont choisi le cours en ligne.',
      });
      continue;
    }
    if (normalized.includes('点')) {
      generated.push({
        chinese: '今天的增长率是三点五。',
        french: "Le taux de croissance aujourd'hui est de 3,5.",
      });
      continue;
    }
    if (normalized.includes('倍')) {
      generated.push({
        chinese: '今年的销量是去年的两倍。',
        french: "Les ventes de cette année sont deux fois celles de l'année dernière.",
      });
    }
  }

  if (generated.length === 0 && isFixedExpressionStylePoint(sourceTitle)) {
    const expression = getFixedExpressionSeed(sourceTitle, elements);
    const variants = buildFixedExpressionVariants(expression).filter((value) => isConcreteFixedExpressionVariant(value));
    const primary = variants[0];
    const secondary = variants[1];

    if (primary) {
      generated.push({
        chinese: `在口语里，常听到“${primary}”这种说法。`,
        french: `À l'oral, on entend souvent la formule « ${primary} ».`,
      });
    }
    if (secondary && secondary !== primary) {
      generated.push({
        chinese: `有些场合也会说“${secondary}”。`,
        french: `Dans certains contextes, on utilise aussi « ${secondary} ».`,
      });
    }
  }

  return dedupeExamples(generated).map(attachPinyinToExample);
}

function buildFallbackCommonMistakes(elements: string[], sourceTitle: string, structure = ''): string[] {
  const terms = collectExampleTerms(elements, sourceTitle).slice(0, 3);
  const mistakes: string[] = [];
  const entries = parseStructureEntries(structure);
  const fixedExpressionPoint = isFixedExpressionStylePoint(sourceTitle) && entries.length === 0;

  if (fixedExpressionPoint) {
    const expression = getFixedExpressionSeed(sourceTitle, elements);
    mistakes.push("Ne pas découper l'expression en mots isolés : elle fonctionne comme un bloc.");
    mistakes.push("Éviter la traduction mot à mot et apprendre d'abord le sens global en contexte.");
    if (/[（(].+[）)]/.test(expression)) {
      mistakes.push('Quand une variante est entre parenthèses, mémoriser les deux formes possibles sans les mélanger.');
    }
    mistakes.push('Réutiliser la formule dans une phrase complète, pas comme un mot seul.');
    return dedupe(mistakes);
  }

  if (entries.some((entry) => entry.pattern.replace(/\s+/g, '').includes('分之'))) {
    mistakes.push("Dans une fraction, garder l'ordre dénominateur puis numérateur : 四分之三 = 3/4.");
  }
  if (entries.some((entry) => entry.pattern.replace(/\s+/g, '').includes('百分之'))) {
    mistakes.push('Ne pas supprimer 百分之 dans les pourcentages formels.');
  }
  if (entries.some((entry) => entry.pattern.replace(/\s+/g, '').includes('点'))) {
    mistakes.push('Après 点, lire les chiffres un par un (pas comme un entier).');
  }
  if (entries.some((entry) => entry.pattern.replace(/\s+/g, '').includes('倍'))) {
    mistakes.push('A是B的两倍 signifie A = 2 × B, pas A + 2.');
  }

  const key = terms.slice(0, 8).sort((a, b) => a.localeCompare(b)).join('|');
  const hasExplicitContrast = Boolean(TERM_CONTRAST_HINTS[key])
    || entries.some((entry) => /[、/或]|A|B|甲|乙/.test(entry.pattern));

  if (terms.length >= 2 && hasExplicitContrast) {
    mistakes.push(`Ne pas intervertir **${terms[0]}** et **${terms[1]}** sans vérifier la structure exacte.`);
  }

  mistakes.push("Vérifier l'ordre des éléments avant de parler ou d'écrire.");
  mistakes.push('Utiliser une phrase complète pour valider la structure en contexte réel.');
  return dedupe(mistakes);
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

  const preMatch = section.content.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
  if (preMatch) {
    return normalizeStructureLayout(cleanMultilineText(preMatch[1]));
  }

  const codeMatch = section.content.match(/<code>([\s\S]*?)<\/code>/)
    || section.content.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  return codeMatch ? normalizeStructureLayout(cleanMultilineText(codeMatch[1])) : '';
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
    return normalizeElementList(fromPills);
  }

  const tail = title.includes('—') ? title.split('—').slice(1).join('—') : title;
  const fallback = splitOutsideParentheses(
    tail.replace(/\.\.\.|…/g, ''),
    new Set(['、', ',', '，', '/']),
  )
    .map((item) => cleanText(item))
    .filter(Boolean);

  return normalizeElementList(fallback);
}

function normalizeStructureLayout(value: string): string {
  if (!value) return '';

  const normalizedLines = mergeBrokenChunks(
    value
      .split('\n')
      .map((line) => cleanText(line))
      .filter(Boolean),
  );
  if (normalizedLines.length > 1) {
    return normalizedLines.map((line) => repairCollapsedOptionalMarkers(line)).join('\n');
  }

  const compact = (normalizedLines[0] || value).replace(/\s+/g, ' ').trim();
  const colonCount = (compact.match(/[：:]/g) || []).length;
  if (colonCount < 2) return repairCollapsedOptionalMarkers(compact);

  const chunks = mergeBrokenChunks(
    compact
    .split(/\s+(?=[^：:\n]{1,24}[：:])/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean),
  );

  if (chunks.length < 2) return compact;
  return chunks.map((chunk) => repairCollapsedOptionalMarkers(chunk)).join('\n');
}

function normalizeElementList(values: string[]): string[] {
  const mergedValues = mergeBrokenChunks(values);
  return dedupe(
    mergedValues
      .flatMap((value) => splitElementValue(value))
      .map((value) => value.replace(/[0-9]+$/g, '').trim())
      .map((value) => repairCollapsedOptionalMarkers(value))
      .map((value) => value.replace(/[（(](施事|受事|主语|谓语|宾语|定语|状语|补语|其他成分|成分)[）)]/g, '').trim())
      .filter((value) => {
        if (!value) return false;
        if (NON_LEXICAL_TERMS.has(value)) return false;
        if (isMetaDescriptorTerm(value)) return false;
        return true;
      }),
  );
}

function splitElementValue(value: string): string[] {
  const cleaned = cleanText(value)
    .replace(/[“”"'`]/g, '')
    .replace(/^\s*[（(]\d+[）)]\s*/g, '')
    .trim();
  if (!cleaned) return [];

  const focused = /[：:]/.test(cleaned)
    ? cleanText(cleaned.split(/[：:]/g).slice(-1)[0] || cleaned)
    : cleaned;

  return splitOutsideParentheses(focused, new Set(['、', '，', ',', '/']))
    .map((segment) => cleanText(segment))
    .flatMap((segment) => splitOutsideParentheses(segment, new Set(['+'])).map((part) => cleanText(part)))
    .filter((segment) => segment !== '其他成分' && segment !== '表示');
}

function splitOutsideParentheses(value: string, delimiters: Set<string>): string[] {
  const output: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of value) {
    if (char === '（' || char === '(') {
      depth += 1;
      current += char;
      continue;
    }
    if ((char === '）' || char === ')') && depth > 0) {
      depth -= 1;
      current += char;
      continue;
    }
    if (depth === 0 && delimiters.has(char)) {
      const cleaned = cleanText(current);
      if (cleaned) output.push(cleaned);
      current = '';
      continue;
    }
    current += char;
  }

  const tail = cleanText(current);
  if (tail) output.push(tail);
  return output;
}

function parenthesisBalance(value: string): number {
  let balance = 0;
  for (const char of value) {
    if (char === '（' || char === '(') balance += 1;
    if ((char === '）' || char === ')') && balance > 0) balance -= 1;
  }
  return balance;
}

function mergeBrokenChunks(values: string[]): string[] {
  const merged: string[] = [];

  for (const rawValue of values) {
    const value = cleanText(rawValue);
    if (!value) continue;

    if (merged.length === 0) {
      merged.push(value);
      continue;
    }

    const previous = merged[merged.length - 1];
    const shouldMerge = parenthesisBalance(previous) > 0
      || /[+/:：]$/.test(previous)
      || /^[+)）]/.test(value)
      || /^\+/.test(value);

    if (shouldMerge) {
      merged[merged.length - 1] = `${previous}${value}`.replace(/\s+/g, ' ').trim();
    } else {
      merged.push(value);
    }
  }

  return merged;
}

function repairCollapsedOptionalMarkers(value: string): string {
  if (!value) return value;
  return value.replace(/([一二三四五六七八九十两])了(?=[）)])/g, '$1、了');
}

function isContextualTemplateNote(
  note: string,
  contextTerms: Set<string>,
  examples: GrammarExample[],
): boolean {
  const noteTerm = extractLeadingNoteTerm(note);
  if (!noteTerm) return true;
  if (contextTerms.has(noteTerm)) return true;
  return examples.some((example) => example.chinese.includes(noteTerm));
}

function extractLeadingNoteTerm(note: string): string {
  const plain = cleanText(stripInlineMarkdown(note));
  const match = plain.match(/^([\u4e00-\u9fff]{1,4})\s*[—:：-]/);
  return match ? match[1] : '';
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
    if (/[，,。.!！？?、；;：:“”"'''（）()【】\[\]\s]/.test(char)) {
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
    .replace(/[，,。.!！？?、；;：:“”"'''（）()【】\[\]\s]/g, '')
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

function resolveContextualTermTranslation(term: string, sourceTitle: string): string {
  if (/数的(?:表示法|表达法)/.test(sourceTitle) && CONTEXTUAL_TERM_TRANSLATIONS[term]) {
    return CONTEXTUAL_TERM_TRANSLATIONS[term];
  }
  return '';
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
    const contextualTranslation = resolveContextualTermTranslation(term, sourceTitle);
    const translation = contextualTranslation || info?.translationFr || '';
    const explanation = info?.explanationFr || '';

    if (!translation && !explanation && !particleHint) {
      continue;
    }

    let line = `**${term}**`;
    if (translation) {
      line += ` : ${translation}.`;
    }
    if (explanation) {
      line += ` ${explanation}`;
    }
    if (particleHint) {
      line += ` ${particleHint}`;
    }

    guidance.push(line.trim());
  }

  if (normalizedTerms.length > cappedTerms.length) {
    guidance.push("D'autres termes de cette leçon suivent le même principe : compare-les avec les exemples pour valider le contexte.");
  }

  return dedupe(guidance);
}

function buildFallbackUsage(
  elements: string[],
  sourceTitle: string,
  examples: GrammarExample[],
  structure = '',
): string[] {
  const terms = collectExampleTerms(elements, sourceTitle).map((term) => normalizeGrammarTerm(term)).filter(Boolean);
  const uniqueTerms = dedupe(terms);
  const entries = parseStructureEntries(structure);
  const structureLine = entries[0]?.pattern || entries[0]?.raw || '';
  const [headRaw] = splitTitleParts(sourceTitle);
  const titleHead = cleanText(headRaw);
  const fixedExpressionPoint = isFixedExpressionStylePoint(sourceTitle) && !structureLine;
  if (uniqueTerms.length === 0 && !structureLine && examples.length === 0) return [];

  const usage: string[] = [];

  if (fixedExpressionPoint) {
    const expression = getFixedExpressionSeed(sourceTitle, elements) || sourceTitle;
    const variants = buildFixedExpressionVariants(expression).filter((value) => isConcreteFixedExpressionVariant(value));
    const hasOptionalVariant = variants.length >= 2;
    usage.push(`Utiliser **${expression}** comme une expression figée, sans changer l'ordre des caractères.`);
    usage.push(`Placement : placer **${expression}** en tête de phrase ou en incise, juste avant l'idée que tu commentes.`);
    usage.push(buildUsageContextHint(examples, sourceTitle, true));
    usage.push('Commencer par mémoriser le sens global, puis réemployer la formule dans des phrases complètes.');
    if (hasOptionalVariant) {
      usage.push(`Mémoriser les variantes usuelles (**${variants[0]}** / **${variants[1]}**) et choisir une seule forme par phrase.`);
    }
    const contextualModel = examples.find((example) => hasFixedExpressionContextExample([example], sourceTitle, elements));
    if (contextualModel) {
      usage.push(
        `Prendre une phrase modèle (**${cleanText(contextualModel.chinese)}**) puis remplacer uniquement le contexte `
        + '(sujet, temps, situation).',
      );
    } else {
      usage.push('Insérer la formule en bloc dans une phrase complète, sans la découper ni la réordonner.');
    }
    if (titleHead === '四字格') {
      usage.push('Pour les 四字格, privilégier les contextes écrits/soutenus ou les citations.');
    }
    return dedupe(usage).slice(0, 7);
  }

  if (structureLine) {
    usage.push(`Partir du patron : **${structureLine}**.`);
    const placementHint = buildStructurePlacementHint(structureLine);
    if (placementHint) usage.push(placementHint);
    const slots = extractPatternSlots(structureLine);
    if (slots.length > 0) {
      usage.push(`Remplacer ${slots.map((slot) => `**${slot}**`).join(', ')} par tes mots/nombres, sans changer l'ordre.`);
    }
  }

  if (!usage.some((line) => line.startsWith('Placement :'))) {
    const categoryPlacement = buildCategoryPlacementHint(sourceTitle);
    if (categoryPlacement) usage.push(categoryPlacement);
  }

  for (const term of uniqueTerms.slice(0, 2)) {
    const model = examples.find((example) => exampleMatchesTerm(example.chinese, term, sourceTitle));
    if (!model) continue;

    usage.push(
      `Pour **${term}**, reprends une phrase modèle comme **${cleanText(model.chinese)}** `
      + `(${cleanText(model.french)}) puis remplace seulement les informations variables.`,
    );
  }

  if (usage.length <= 1 && examples.length > 0) {
    usage.push(
      `Copier une phrase modèle (**${cleanText(examples[0].chinese)}**) puis remplacer `
      + 'sujet/objet/temps en gardant la même charpente.',
    );
  }

  const hasExplicitContrast = entries.some((entry) => /[、/或]|A|B|甲|乙/.test(entry.pattern));
  if (uniqueTerms.length >= 2 && hasExplicitContrast) {
    usage.push(`Ne pas permuter **${uniqueTerms[0]}** et **${uniqueTerms[1]}** : choisir l'élément selon le sens visé.`);
  }

  const hasParticleContrast = examples.some((example) => /[了吗不没把被]/.test(example.chinese));
  if (hasParticleContrast) {
    usage.push('Après substitution, vérifier que 了 / 不 / 没 / 吗 restent cohérents avec le sens et le temps de la phrase.');
  }

  const structureContextHint = structureLine ? buildStructureContextHint(structureLine) : '';
  const contextHint = buildUsageContextHint(examples, sourceTitle, false);
  if (structureContextHint) usage.push(structureContextHint);
  else if (contextHint) usage.push(contextHint);

  return dedupe(usage).slice(0, 7);
}

function buildStructurePlacementHint(structureLine: string): string {
  const line = cleanText(structureLine);
  if (!line) return '';
  const normalized = line.replace(/\s+/g, '');

  if (normalized.includes('把') && normalized.includes('得')) {
    return 'Placement : mettre 把 + objet avant le verbe, puis laisser le complément en 得 en fin de segment verbal.';
  }
  if (normalized.includes('把') && normalized.includes('动词')) {
    return 'Placement : dans la structure 把, place 把 + complément avant le verbe principal, puis garde le résultat après le verbe.';
  }
  if (normalized.includes('被') && normalized.includes('动词')) {
    return "Placement : dans la passive en 被, place 被 avant le verbe, l'agent éventuel se met entre 被 et le verbe.";
  }
  if (normalized.includes('比') && (normalized.includes('形容词') || normalized.includes('动词'))) {
    return "Placement : dans une comparaison en 比, place A + 比 + B avant l'adjectif ou le verbe comparé.";
  }
  if (normalized.includes('主语') && normalized.includes('动词') && normalized.includes('宾语')) {
    return "Placement : suivre l'ordre sujet puis verbe puis objet indiqué par le patron, sans déplacer les blocs.";
  }
  if (normalized.includes('动词')) {
    return 'Placement : garder ce qui précède 动词 avant le verbe, et ce qui suit 动词 après le verbe.';
  }
  const blocks = line.split('+').map((block) => cleanText(block)).filter(Boolean);
  if (blocks.length >= 3) {
    const first = blocks[0];
    const last = blocks[blocks.length - 1];
    return `Placement : garder l'ordre fixe **${blocks.join(' → ')}** ; placer **${first}** au début du segment et **${last}** à la fin.`;
  }
  if (line.includes('+')) {
    return "Placement : suivre strictement l'ordre des blocs du patron, de gauche à droite.";
  }
  return '';
}

function buildStructureContextHint(structureLine: string): string {
  const normalized = cleanText(structureLine).replace(/\s+/g, '');
  if (!normalized) return '';

  if (normalized.includes('把') && normalized.includes('得') && (normalized.includes('看') || normalized.includes('瞧'))) {
    return "Contexte : surtout à l'oral pour commenter l'effet produit sur un objet, avec une nuance expressive.";
  }
  if (normalized.includes('把') && normalized.includes('得')) {
    return "Contexte : employer cette structure pour décrire le résultat concret d'une action sur un objet.";
  }
  if (normalized.includes('把')) {
    return "Contexte : utile quand on veut mettre en avant le traitement et l'issue liée à l'objet.";
  }
  if (normalized.includes('被')) {
    return 'Contexte : utiliser la forme passive quand on focalise sur ce qui est subi.';
  }
  if (normalized.includes('比')) {
    return 'Contexte : utiliser pour comparer explicitement deux éléments (niveau, qualité ou quantité).';
  }
  if (normalized.includes('百分之') || normalized.includes('分之') || normalized.includes('点') || normalized.includes('倍')) {
    return 'Contexte : employer cette structure pour exprimer des chiffres, des proportions ou des comparaisons quantitatives.';
  }
  return '';
}

function buildCategoryPlacementHint(sourceTitle: string): string {
  const title = cleanText(sourceTitle);
  if (!title) return '';

  if (/副词/.test(title)) {
    return "Placement : les adverbes se placent en général avant le verbe ou l'adjectif qu'ils modifient (souvent après le sujet).";
  }
  if (/连词/.test(title)) {
    return 'Placement : les connecteurs se mettent en tête de proposition ou entre deux propositions à relier.';
  }
  if (/介词/.test(title)) {
    return 'Placement : la préposition se place juste avant le groupe nominal (temps, lieu, moyen, destinataire).';
  }
  if (/助词/.test(title)) {
    return "Placement : la particule se place immédiatement après le mot ou le groupe qu'elle marque.";
  }
  if (/量词/.test(title)) {
    return 'Placement : la structure standard est nombre/démonstratif + classificateur + nom.';
  }
  if (/动词/.test(title)) {
    return "Placement : le verbe principal se place en général après le sujet et avant l'objet.";
  }
  if (/形容词/.test(title)) {
    return "Placement : l'adjectif est souvent prédicatif après 很/真/太, ou attributif avant le nom avec 的.";
  }
  if (/名词/.test(title)) {
    return "Placement : ce terme nominal s'emploie surtout comme sujet ou objet dans la phrase.";
  }
  return '';
}

function inferSourceContexts(sourceTitle: string): string[] {
  const title = cleanText(sourceTitle);
  if (!title) return [];

  const contexts: string[] = [];
  if (/口语|会话|对话|日常/.test(title)) {
    contexts.push('échange oral du quotidien');
  }
  if (/书面|书语|正式|公文|报道|新闻|报告/.test(title)) {
    contexts.push('registre écrit ou formel');
  }
  if (/数的表示法|表达法|小数|分数|百分数|倍数|数字/.test(title)) {
    contexts.push('chiffres, quantités et données');
  }
  if (/疑问|反问|设问|语气|感叹/.test(title)) {
    contexts.push('questions, réactions et modalité');
  }
  if (/副词/.test(title)) {
    contexts.push('nuance de degré, de temps ou de fréquence');
  }
  if (/连词/.test(title)) {
    contexts.push('liaison logique entre propositions');
  }
  if (/介词/.test(title)) {
    contexts.push('relation de temps, lieu, moyen ou destinataire');
  }

  return dedupe(contexts).slice(0, 2);
}

function buildUsageContextHint(
  examples: GrammarExample[],
  sourceTitle: string,
  fixedExpressionPoint: boolean,
): string {
  if (fixedExpressionPoint) {
    return 'Contexte : utiliser cette formule pour introduire un avis, une réaction ou une transition dans un échange.';
  }

  const sourceContexts = inferSourceContexts(sourceTitle);
  const chineseCorpus = examples.map((example) => cleanText(example.chinese)).join(' ');
  if (!chineseCorpus) {
    if (sourceContexts.length > 0) {
      return `Contexte : surtout en ${sourceContexts.join(' et ')}.`;
    }
    return 'Contexte : utiliser cette structure dans des phrases complètes liées à une situation concrète.';
  }

  const contexts: string[] = [];
  if (/[？?]/.test(chineseCorpus)) {
    contexts.push('questions et réponses');
  }
  if (/(因为|所以|如果|就|既然|因此|虽然|但是|尽管|即使)/.test(chineseCorpus)) {
    contexts.push('explication et argumentation');
  }
  if (/(请|吧|别|不要)/.test(chineseCorpus)) {
    contexts.push('interaction orale et consignes');
  }
  if (/(调查|报告|数据|比例|增长|下降|政策|法律)/.test(chineseCorpus)) {
    contexts.push('registre formel et information');
  }

  const merged = dedupe([...contexts, ...sourceContexts]).slice(0, 2);
  if (merged.length === 0) {
    return 'Contexte : employer cette structure pour décrire des faits ou des actions dans une phrase complète.';
  }

  return `Contexte : surtout en ${merged.join(' et ')}.`;
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
  if (isFixedExpressionStylePoint(sourceTitle)) {
    const expression = getFixedExpressionSeed(sourceTitle, elements);
    const fixedVariants = buildFixedExpressionVariants(expression)
      .filter((term) => isConcreteFixedExpressionVariant(term))
      .slice(0, 4);
    if (fixedVariants.length > 0) {
      return fixedVariants;
    }
  }

  const titleTokens = extractTitleTokens(sourceTitle).flatMap((token) => extractHanziVariants(token));
  const rawTerms = dedupe(elements.flatMap((term) => extractHanziVariants(term)).concat(titleTokens));

  return rawTerms.filter((term) => {
    if (!term) return false;
    if (NON_LEXICAL_TERMS.has(term)) return false;
    if (!isNumericNotationTitle(sourceTitle) && /^[一二三四五六七八九十两]+$/.test(term)) return false;
    if (/^[一二三四五六七八九十两]+了$/.test(term)) return false;
    if (isMetaDescriptorTerm(term)) return false;
    if (NON_EXAMPLE_TERM_SUFFIXES.some((suffix) => term.endsWith(suffix))) return false;
    return /[\u4e00-\u9fff]/.test(term);
  });
}

function isMetaDescriptorTerm(term: string): boolean {
  if (!term) return false;
  if (term.length >= 8) return true;
  return META_DESCRIPTOR_FRAGMENTS.some((fragment) => term.includes(fragment));
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

function isSentenceLikeExample(example: GrammarExample): boolean {
  const chinese = cleanText(example.chinese);
  if (chinese.length >= 8) return true;
  return /[。！？!?，,；;]/.test(chinese);
}

function scoreExampleQuality(example: GrammarExample): number {
  const chinese = cleanText(example.chinese);
  let score = 0;

  if (/[。！？!?]/.test(chinese)) score += 4;
  if (/[，,；;]/.test(chinese)) score += 1;
  if (chinese.length >= 8) score += 3;
  if (/[的是了在把被给比跟对向让将]/.test(chinese)) score += 2;
  if (chinese.length <= 4) score -= 3;
  if (example.pinyin) score += 1;

  return score;
}

interface ExampleBuildOptions {
  preferSentences?: boolean;
}

function isNumericNotationTitle(sourceTitle: string): boolean {
  return /数的(?:表示法|表达法)/.test(sourceTitle);
}

function isFixedExpressionStylePoint(sourceTitle: string): boolean {
  const [headRaw] = splitTitleParts(sourceTitle);
  const head = cleanText(headRaw);
  return head === '四字格' || head === '其他';
}

function getFixedExpressionSeed(sourceTitle: string, elements: string[] = []): string {
  const [, tailRaw] = splitTitleParts(sourceTitle);
  const fromTitle = cleanText(tailRaw).replace(/\s+/g, '');
  if (fromTitle) return fromTitle;

  const fromElements = dedupe(elements.map((value) => cleanText(value).replace(/\s+/g, '')).filter(Boolean));
  const firstChinese = fromElements.find((value) => /[\u4e00-\u9fff]/.test(value));
  return firstChinese || '';
}

function expandOptionalSegments(value: string): string[] {
  const text = cleanText(value).replace(/\s+/g, '');
  if (!text) return [];

  const match = text.match(/^(.*?)[（(]([^（）()]+)[）)](.*)$/);
  if (!match) return [text];

  const [, prefix, optional, suffix] = match;
  return dedupe(expandOptionalSegments(`${prefix}${optional}${suffix}`).concat(expandOptionalSegments(`${prefix}${suffix}`)));
}

function buildFixedExpressionVariants(expression: string): string[] {
  const seed = cleanText(expression).replace(/\s+/g, '');
  if (!seed) return [];

  const variants = new Set<string>();
  for (const expanded of expandOptionalSegments(seed)) {
    if (!expanded) continue;
    variants.add(expanded);
  }

  const prefixAlternative = seed.match(/^([\u4e00-\u9fff])(?:[（(]([\u4e00-\u9fff]{1,3})[）)])([\u4e00-\u9fff]{1,8})$/);
  const baseVariant = cleanText(seed.replace(/[（(][^）)]+[）)]/g, '')).replace(/\s+/g, '');
  const altVariant = prefixAlternative ? `${prefixAlternative[2]}${prefixAlternative[3]}` : '';
  if (prefixAlternative) {
    variants.add(altVariant);
  }

  const priority = (value: string): number => {
    if (value === baseVariant) return 0;
    if (altVariant && value === altVariant) return 1;
    if (baseVariant && value.startsWith(baseVariant[0] || '')) return 2;
    return 3;
  };

  return Array.from(variants)
    .map((value) => cleanText(value).replace(/\s+/g, ''))
    .filter(Boolean)
    .sort((a, b) => {
      const byPriority = priority(a) - priority(b);
      if (byPriority !== 0) return byPriority;
      const byLength = a.length - b.length;
      if (byLength !== 0) return byLength;
      return a.localeCompare(b, 'zh-Hans-CN');
    });
}

function isConcreteFixedExpressionVariant(value: string): boolean {
  const compact = cleanText(value).replace(/\s+/g, '');
  if (!compact) return false;
  if (!/[\u4e00-\u9fff]/.test(compact)) return false;
  if (/[A-Z甲乙丙丁XYZ]/.test(compact)) return false;
  if (/[…]/.test(compact)) return false;
  return compact.length >= 2 && compact.length <= 12;
}

function hasFixedExpressionContextExample(
  examples: GrammarExample[],
  sourceTitle: string,
  elements: string[],
): boolean {
  const expression = getFixedExpressionSeed(sourceTitle, elements);
  const variants = buildFixedExpressionVariants(expression).filter((value) => isConcreteFixedExpressionVariant(value));
  if (variants.length === 0) return false;
  return examples.some((example) => variants.some((variant) => example.chinese.includes(variant)));
}

function exampleMatchesTerm(exampleChinese: string, term: string, sourceTitle: string): boolean {
  if (exampleChinese.includes(term)) return true;
  if (!isNumericNotationTitle(sourceTitle)) return false;

  if (term === '小数') {
    return /点[零一二三四五六七八九十百千万两0-9]/.test(exampleChinese);
  }
  if (term === '分数') {
    return /分之/.test(exampleChinese) && !/百分之/.test(exampleChinese);
  }
  if (term === '百分数') {
    return /百分之/.test(exampleChinese);
  }
  if (term === '倍数') {
    return /倍/.test(exampleChinese);
  }

  return false;
}

function countExamplesForMatchedTerm(
  examples: GrammarExample[],
  term: string,
  sourceTitle: string,
): number {
  return examples.reduce(
    (count, example) => (exampleMatchesTerm(example.chinese, term, sourceTitle) ? count + 1 : count),
    0,
  );
}

function buildRelevantExamples(
  rawExamples: GrammarExample[],
  elements: string[],
  sourceTitle: string,
  options: ExampleBuildOptions = {},
): GrammarExample[] {
  const terms = collectExampleTerms(elements, sourceTitle);
  const baseExamples = dedupeExamples(rawExamples);

  if (isFixedExpressionStylePoint(sourceTitle)) {
    const contextualBase = baseExamples
      .filter((example) => hasFixedExpressionContextExample([example], sourceTitle, elements))
      .sort((a, b) => scoreExampleQuality(b) - scoreExampleQuality(a));
    if (contextualBase.length > 0) {
      return contextualBase.map(attachPinyinToExample);
    }
    return [];
  }

  if (terms.length === 0) {
    return baseExamples
      .slice()
      .sort((a, b) => scoreExampleQuality(b) - scoreExampleQuality(a))
      .map(attachPinyinToExample);
  }

  const termFilteredBase = baseExamples.filter(
    (example) => terms.some((term) => exampleMatchesTerm(example.chinese, term, sourceTitle)),
  );
  const fromLexicon = dedupeExamples(
    terms.flatMap((term) => HSK_EXAMPLE_INDEX.get(term) ?? []),
  );
  const fullCandidatePool = dedupeExamples(termFilteredBase.concat(fromLexicon))
    .sort((a, b) => scoreExampleQuality(b) - scoreExampleQuality(a));
  const sentencePreferredPool = options.preferSentences
    ? fullCandidatePool.filter((example) => isSentenceLikeExample(example))
    : fullCandidatePool;
  const candidatePool = sentencePreferredPool.length >= Math.min(2, fullCandidatePool.length)
    ? sentencePreferredPool
    : fullCandidatePool;
  const desiredPerTerm = terms.length === 1 ? 2 : 1;
  const selected: GrammarExample[] = [];

  for (const term of terms) {
    for (const example of candidatePool) {
      if (!exampleMatchesTerm(example.chinese, term, sourceTitle)) continue;
      if (selected.some((item) => item.chinese === example.chinese && item.french === example.french)) continue;

      selected.push(example);
      if (countExamplesForMatchedTerm(selected, term, sourceTitle) >= desiredPerTerm) break;
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
  return splitOutsideParentheses(
    tail.replace(/\\.\\.\\.|…/g, ''),
    new Set(['、', ',', '，', '/']),
  )
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

function cleanMultilineText(value: string): string {
  const normalized = decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r\n?/g, '\n'),
  );

  return normalized
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
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
