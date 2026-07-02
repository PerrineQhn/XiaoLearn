export interface CultureSource {
  label: string;
  url: string;
}

export interface CultureFestival {
  slug: string;
  name: string;
  hanzi: string;
  pinyin: string;
  summary: string;
  detailedSummary: string;
  periodLabel: string;
  monthStart: number;
  monthEnd: number;
  traditions: string[];
  keyPoints: string[];
  vocabulary: string[];
  sources: CultureSource[];
}

export interface CultureHighlight {
  slug: string;
  title: string;
  summary: string;
  detailedSummary: string;
  icon: string;
  keyPoints: string[];
  sources: CultureSource[];
}

const FESTIVALS: CultureFestival[] = [
  {
    slug: 'spring-festival',
    name: 'Nouvel An chinois (Fete du Printemps)',
    hanzi: '春节',
    pinyin: 'chunjie',
    summary:
      'Grande periode de reunion familiale, voeux et rituels de prosperite qui ouvre la nouvelle annee lunaire.',
    detailedSummary:
      'Le Nouvel An chinois ouvre l annee traditionnelle et se deploie sur environ quinze jours, jusqu a la Fete des lanternes. Les pratiques incluent le menage d avant-fete, le repas du reveillon, les visites aux proches, les voeux, les decorations rouges et les enveloppes rouges (hongbao).',
    periodLabel: 'Fin janvier a fevrier (1er mois lunaire)',
    monthStart: 1,
    monthEnd: 2,
    traditions: [
      'Repas de reunion familiale au reveillon',
      'Decorations rouges, voeux et hongbao',
      'Feux d artifice, danses du dragon et du lion selon les regions',
    ],
    keyPoints: [
      'Debute avec la nouvelle lune entre le 21 janvier et le 20 fevrier selon le calendrier gregorien.',
      'Le terme Chunjie (Fete du Printemps) est aussi utilise en Chine continentale.',
      'La dimension familiale et intergenerationnelle est centrale.',
    ],
    vocabulary: [
      '过年 guonian : passer au nouvel an',
      '红包 hongbao : enveloppe rouge',
      '拜年 bainian : presenter ses voeux',
      '年夜饭 nianye fan : repas du reveillon',
    ],
    sources: [
      {
        label: 'Britannica - Chinese New Year',
        url: 'https://www.britannica.com/topic/Chinese-New-Year',
      },
      {
        label: 'UNESCO - Spring festival (inscrit en 2024)',
        url: 'https://ich.unesco.org/en/RL/spring-festival-social-practices-of-the-chinese-people-in-celebration-of-traditional-new-year-02126',
      },
    ],
  },
  {
    slug: 'lantern-festival',
    name: 'Fete des lanternes',
    hanzi: '元宵节',
    pinyin: 'yuanxiao jie',
    summary:
      'Cloture du cycle du Nouvel An avec lanternes, devinettes et boulettes de riz gluant (yuanxiao/tangyuan).',
    detailedSummary:
      'Celebree le quinzieme jour du premier mois lunaire, la Fete des lanternes marque la premiere pleine lune de l annee et la fin des festivites du Nouvel An. Les rues et les temples se parent de lanternes, des enigmes sont proposees au public, et les familles partagent des boulettes rondes symbole d unite.',
    periodLabel: 'Fevrier a mars (15e jour du 1er mois lunaire)',
    monthStart: 2,
    monthEnd: 3,
    traditions: [
      'Promenades et expositions de lanternes',
      'Devinettes sur lanternes (caidengmi)',
      'Degustation de yuanxiao ou tangyuan',
    ],
    keyPoints: [
      'Correspond a la premiere pleine lune du calendrier lunaire.',
      'Conclut la sequence des celebrations du Nouvel An.',
      'La forme ronde des tangyuan est associee a la cohesion familiale.',
    ],
    vocabulary: [
      '灯笼 denglong : lanterne',
      '猜灯谜 cai dengmi : deviner une enigme de lanterne',
      '元宵 yuanxiao : boulette de riz gluant (nord)',
      '汤圆 tangyuan : boulette de riz gluant (sud)',
    ],
    sources: [
      {
        label: 'Britannica - Lantern Festival',
        url: 'https://www.britannica.com/topic/Lantern-Festival',
      },
    ],
  },
  {
    slug: 'qingming',
    name: 'Qingming (Tomb Sweeping Day)',
    hanzi: '清明节',
    pinyin: 'qingming jie',
    summary:
      'Moment de memoire familiale et d entretien des tombes, associe aussi aux sorties printanieres.',
    detailedSummary:
      'Qingming est celebre environ quinze jours apres l equinoxe de printemps, generalement debut avril. La pratique la plus connue est le nettoyage des tombes et les offrandes aux ancetres. En parallele, la periode est liee aux sorties dans la nature (taqing), d ou son image de fete a la fois recueillie et printaniere.',
    periodLabel: 'Debut avril (autour du 4 ou 5 avril)',
    monthStart: 4,
    monthEnd: 4,
    traditions: [
      'Nettoyage des tombes et offrandes',
      'Rituels de memoire familiale',
      'Sorties de printemps (taqing)',
    ],
    keyPoints: [
      'Le terme Qingming signifie clair et lumineux.',
      'Le festival s inscrit dans la logique des 24 termes solaires.',
      'Il articule pietes familiales, histoire locale et saisonnalite.',
    ],
    vocabulary: [
      '扫墓 saomu : balayer/entretenir une tombe',
      '祭祖 jizu : rendre hommage aux ancetres',
      '踏青 taqing : sortie printaniere',
      '清明 Qingming : clair et lumineux',
    ],
    sources: [
      {
        label: 'Britannica - Qingming Festival',
        url: 'https://www.britannica.com/topic/Qingming-Festival',
      },
    ],
  },
  {
    slug: 'dragon-boat',
    name: 'Fete des bateaux-dragons',
    hanzi: '端午节',
    pinyin: 'duanwu jie',
    summary:
      'Fete du 5e jour du 5e mois lunaire, celebre pour ses courses de bateaux-dragons et ses zongzi.',
    detailedSummary:
      'La Fete des bateaux-dragons est ancree dans des traditions regionales diverses et des recits heroiques, dont celui du poete Qu Yuan. Elle combine ceremonies commemoratives, sports collectifs sur l eau, cuisine rituelle et pratiques de protection symbolique. Les courses de bateaux-dragons sont aujourd hui une pratique culturelle et sportive internationale.',
    periodLabel: 'Mai a juin (5e jour du 5e mois lunaire)',
    monthStart: 5,
    monthEnd: 6,
    traditions: [
      'Courses de bateaux-dragons',
      'Preparation et partage de zongzi',
      'Rituels locaux lies a la protection et a la sante',
    ],
    keyPoints: [
      'Festival appele aussi Double Fifth Festival.',
      'Celebre le 5e jour du 5e mois lunaire.',
      'Inscrit par l UNESCO sur la Liste representative du patrimoine culturel immateriel de l humanite (2009).',
    ],
    vocabulary: [
      '龙舟 longzhou : bateau-dragon',
      '赛龙舟 sai longzhou : course de bateaux-dragons',
      '粽子 zongzi : riz gluant emballe dans des feuilles',
      '端午 Duanwu : nom de la fete',
    ],
    sources: [
      {
        label: 'Britannica - Dragon Boat Festival',
        url: 'https://www.britannica.com/topic/Dragon-Boat-Festival',
      },
      {
        label: 'UNESCO - Dragon Boat festival (inscrit en 2009)',
        url: 'https://ich.unesco.org/en/RL/dragon-boat-festival-00225',
      },
    ],
  },
  {
    slug: 'qixi',
    name: 'Qixi (Double Sept)',
    hanzi: '七夕',
    pinyin: 'qixi',
    summary:
      'Fete du 7e jour du 7e mois lunaire, associee a la legende de Niulang et Zhinu.',
    detailedSummary:
      'Qixi est souvent presente comme la fete chinoise des amoureux. Elle s appuie sur le recit de la Tisserande et du Bouvier, symboliquement relies aux etoiles Vega et Altair. Selon les regions, la fete a ete associee a des pratiques artisanales, des voeux lies a l adresse feminine traditionnelle et, aujourd hui, a des formes plus modernes de celebration romantique.',
    periodLabel: 'Aout (7e jour du 7e mois lunaire)',
    monthStart: 8,
    monthEnd: 8,
    traditions: [
      'Recits et imagerie autour du pont des pies',
      'Observations symboliques du ciel (Vega et Altair)',
      'Cadeaux et gestes romantiques dans les usages contemporains',
    ],
    keyPoints: [
      'Date traditionnelle: 7e jour du 7e mois lunaire.',
      'Reliee a la legende de Niulang (Bouvier) et Zhinu (Tisserande).',
      'Comparable a Tanabata au Japon et a d autres variantes est-asiatiques.',
    ],
    vocabulary: [
      '牛郎 Niulang : le Bouvier',
      '织女 Zhinu : la Tisserande',
      '银河 yinhe : la Voie lactee',
      '鹊桥 queqiao : le pont des pies',
    ],
    sources: [
      {
        label: 'Hong Kong Space Museum - Chinese Valentine s Day (Qixi)',
        url: 'https://hk.space.museum/en/web/spm/resources/curators-blog/2020/08/chinese-valentine-s-day-when-altair-and-vega-meet.html',
      },
      {
        label: 'People s Daily - Qixi Festival overview',
        url: 'https://en.people.cn/n3/2019/0807/c90000-9604161.html',
      },
    ],
  },
  {
    slug: 'mid-autumn',
    name: 'Fete de la mi-automne',
    hanzi: '中秋节',
    pinyin: 'zhongqiu jie',
    summary:
      'Fete de reunion celebre a la pleine lune du 8e mois lunaire, associee aux mooncakes.',
    detailedSummary:
      'La Fete de la mi-automne est celebree le quinzieme jour du huitieme mois lunaire, au moment de la pleine lune. Dans de nombreuses familles, elle est consacree a la reunion, a l observation de la lune et au partage de mooncakes. Elle est aussi liee a des recits mythologiques, notamment celui de Chang e.',
    periodLabel: 'Septembre a octobre (15e jour du 8e mois lunaire)',
    monthStart: 9,
    monthEnd: 10,
    traditions: [
      'Reunion familiale et repas du soir',
      'Observation de la lune',
      'Partage de mooncakes',
    ],
    keyPoints: [
      'Tombe le 15e jour du 8e mois lunaire.',
      'Le caractere circulaire des mooncakes renvoie a l idee de reunion.',
      'Tres presente dans les pratiques familiales urbaines et diasporiques.',
    ],
    vocabulary: [
      '中秋节 Zhongqiu jie : fete de la mi-automne',
      '月饼 yuebing : mooncake',
      '赏月 shangyue : admirer la lune',
      '团圆 tuanyuan : reunion familiale',
    ],
    sources: [
      {
        label: 'Britannica - Zhongqiu Jie',
        url: 'https://www.britannica.com/topic/Zhongqiu-Jie',
      },
      {
        label: 'Britannica - Shine On, Harvest Moon Festival',
        url: 'https://www.britannica.com/story/shine-on-harvest-moon-festival',
      },
    ],
  },
];

const CULTURE_HIGHLIGHTS: CultureHighlight[] = [
  {
    slug: 'calendrier-fetes',
    title: 'Calendrier lunaire et fetes',
    summary:
      'Comprendre la logique des mois lunaires, des phases de lune et des grands temps festifs.',
    detailedSummary:
      'Une partie importante de la culture chinoise repose sur le calendrier traditionnel: certaines fetes suivent la lune, d autres les termes solaires. Pour l apprenant, cela eclaire le vocabulaire des saisons, des reunions familiales et des rituels publics.',
    icon: '历',
    keyPoints: [
      'Les grandes fetes varient chaque annee en calendrier gregorien.',
      'Les reperes saisonniers (comme Qingming) restent tres presents dans la vie sociale.',
      'Le vocabulaire du temps et de la famille y est tres frequemment mobilise.',
    ],
    sources: [
      {
        label: 'Britannica - Chinese New Year',
        url: 'https://www.britannica.com/topic/Chinese-New-Year',
      },
      {
        label: 'Britannica - Qingming Festival',
        url: 'https://www.britannica.com/topic/Qingming-Festival',
      },
    ],
  },
  {
    slug: 'rituels-famille',
    title: 'Rituels familiaux et memoire',
    summary:
      'Le lien aux ancetres, la reunion et les gestes de respect structurent de nombreuses fetes.',
    detailedSummary:
      'Des fetes comme Qingming ou le Nouvel An accordent une place majeure a la famille, aux ancetres et aux gestes de respect entre generations. Les pratiques changent selon les regions, mais la logique de transmission et de continuite demeure un point culturel essentiel.',
    icon: '家',
    keyPoints: [
      'La piete filiale reste un cadre d interpretation central de nombreuses pratiques.',
      'Les rituels se vivent a l echelle du foyer comme de la communaute.',
      'Le lexique de parentes et de politesse est donc prioritaire pour l apprenant.',
    ],
    sources: [
      {
        label: 'Britannica - Qingming Festival',
        url: 'https://www.britannica.com/topic/Qingming-Festival',
      },
      {
        label: 'UNESCO - Spring festival',
        url: 'https://ich.unesco.org/en/RL/spring-festival-social-practices-of-the-chinese-people-in-celebration-of-traditional-new-year-02126',
      },
    ],
  },
  {
    slug: 'calligraphie',
    title: 'Calligraphie et ecriture',
    summary:
      'Les caracteres ne sont pas qu un systeme graphique: ils portent aussi une tradition artistique.',
    detailedSummary:
      'La calligraphie chinoise articule lisibilite, geste et esthetique. Sa pratique historique et contemporaine en fait un pont entre apprentissage linguistique, culture visuelle et education artistique. Pour progresser en chinois, observer la structure des traits et les styles d ecriture aide aussi la memorisation.',
    icon: '书',
    keyPoints: [
      'Cinq styles majeurs sont souvent distingues (seal, official, cursive, running, regular).',
      'La transmission combine apprentissage scolaire et relation maitre-apprenti.',
      'La calligraphie est reconnue comme patrimoine culturel immateriel.',
    ],
    sources: [
      {
        label: 'UNESCO - Chinese calligraphy (inscrit en 2009)',
        url: 'https://ich.unesco.org/en/RL/chinese-calligraphy-00216',
      },
    ],
  },
  {
    slug: 'culture-du-the',
    title: 'The, hospitalite et sociabilite',
    summary:
      'Le the est a la fois boisson quotidienne, pratique sociale et vecteur d identite culturelle.',
    detailedSummary:
      'Les techniques traditionnelles de production et de consommation du the relient savoir-faire agricoles, pratiques domestiques, artisanat et ceremonies. Dans de nombreux contextes, offrir le the est une forme d accueil et de relation sociale. Comprendre ces usages aide a decoder les interactions ordinaires.',
    icon: '茶',
    keyPoints: [
      'La Chine distingue plusieurs grandes familles de the (vert, jaune, blanc, oolong, noir, sombre).',
      'La pratique du the intervient dans la vie quotidienne comme dans des ceremonies.',
      'Le the est reconnu par l UNESCO comme patrimoine culturel immateriel.',
    ],
    sources: [
      {
        label: 'UNESCO - Traditional tea processing techniques (inscrit en 2022)',
        url: 'https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884',
      },
    ],
  },
];

function getNextFestivalDistance(monthStart: number, fromMonth: number): number {
  if (monthStart >= fromMonth) return monthStart - fromMonth;
  return 12 - fromMonth + monthStart;
}

export function getUpcomingFestivals(count = 4, referenceDate = new Date()): CultureFestival[] {
  const currentMonth = referenceDate.getMonth() + 1;
  return [...FESTIVALS]
    .sort((a, b) => {
      const distanceA = getNextFestivalDistance(a.monthStart, currentMonth);
      const distanceB = getNextFestivalDistance(b.monthStart, currentMonth);
      if (distanceA !== distanceB) return distanceA - distanceB;
      return a.monthStart - b.monthStart;
    })
    .slice(0, count);
}

export function getAllFestivals(): CultureFestival[] {
  return FESTIVALS;
}

export function getFestivalBySlug(slug: string): CultureFestival | undefined {
  return FESTIVALS.find((festival) => festival.slug === slug);
}

export function getCultureHighlights(): CultureHighlight[] {
  return CULTURE_HIGHLIGHTS;
}

export function getHighlightBySlug(slug: string): CultureHighlight | undefined {
  return CULTURE_HIGHLIGHTS.find((highlight) => highlight.slug === slug);
}
