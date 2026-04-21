export interface CPlayerLyricLine {
  time: number;
  hanzi: string;
  pinyin?: string;
  translationFr?: string;
  translationEn?: string;
}

export type CPlayerCategory =
  | 'tendances'
  | 'ballades'
  | 'party_anthems'
  | 'cpop'          // C-Pop général (pop chinoise moderne)
  | 'guofeng'        // 国风 — Folk / traditionnel chinois
  | 'indie_rock'     // Indie, rock, alternative
  | 'rnb_soul'       // R&B, soul, urban
  | 'cdrama_ost';    // OST séries chinoises populaires

export interface CPlayerSong {
  id: string;
  category: CPlayerCategory;
  title: string;
  artist: string;
  youtubeUrl: string;
  lyrics: CPlayerLyricLine[];
}

export const cplayerSongs: CPlayerSong[] = [

  // ═══════════════════════════════════════════════════════════════════
  //  TENDANCES  — Charts récents 2024-2026
  //  Sources : 网易云2025年度TOP10, QQ音乐, Apple Music CN/TW, Douyin viral
  // ═══════════════════════════════════════════════════════════════════
  {
    // 网易云2025 #7 — 《歌手2025》第1期冠军, Apple Music China #1
    id: 'shanyichun-zhuyu',
    category: 'tendances',
    title: '珠玉',
    artist: '单依纯',
    youtubeUrl: 'https://www.youtube.com/watch?v=RRkpkyQoIVU',
    lyrics: []
  },
  {
    // 网易云2025 #6 — OST 《难哄》, Douyin viral 2024-2025
    id: 'wangsutong-qingtianyutian',
    category: 'tendances',
    title: '像晴天像雨天',
    artist: '汪苏泷',
    youtubeUrl: 'https://youtu.be/u3M15beKlQk?si=USyMyh4WXgsoI_OI',
    lyrics: []
  },
  {
    // 周深 — IFPI 2024全球畅销专辑华语唯一上榜, 腾讯音乐年度歌手
    id: 'zhoushen-xiaomeiman',
    category: 'tendances',
    title: '小美满',
    artist: '周深',
    youtubeUrl: 'https://youtu.be/9vT5ni5WDCY?si=yofe1JAAjkkSCFyo',
    lyrics: []
  },
  // {
  //   // 《王者荣耀》10周年主题曲 2025 — 腾讯音乐多榜冠军
  //   id: 'jjlin-mingrizhubiao',
  //   category: 'tendances',
  //   title: '明日坐标',
  //   artist: '林俊傑',
  //   youtubeUrl: 'https://youtu.be/Ra6tyMqBoss?si=oe6iGsYWR6_mNi12',
  //   lyrics: []
  // },
  {
    // Apple Music CN/TW dominant depuis des années, charts 2025 toujours top
    id: 'jaychou-gaobai',
    category: 'tendances',
    title: '告白气球',
    artist: '周杰伦',
    youtubeUrl: 'https://www.youtube.com/watch?v=bu7nU9Mhpyo',
    lyrics: []
  },
  {
    // G.E.M. — 年度女歌手网易云2025, toujours top charts streaming
    id: 'gem-guangnianzhiwai',
    category: 'tendances',
    title: '光年之外',
    artist: 'G.E.M. 邓紫棋',
    youtubeUrl: 'https://www.youtube.com/watch?v=T4SimnaiktU',
    lyrics: []
  },
  {
    // 陈奕迅 — OST LOL Arcane, viral 2022-2025, toujours dans les charts
    id: 'easonchan-guyongzhe',
    category: 'tendances',
    title: '孤勇者',
    artist: '陈奕迅',
    youtubeUrl: 'https://www.youtube.com/watch?v=Hlp8XD0R5qo',
    lyrics: []
  },
  {
    // 韦礼安 — indie Mandopop TW, viral 2023-2025
    id: 'weibird-ruguokeyi',
    category: 'tendances',
    title: '如果可以',
    artist: '韦礼安',
    youtubeUrl: 'https://www.youtube.com/watch?v=T8jJFEMKCuQ',
    lyrics: []
  },
  {
    // 告五人 — indie pop TW, très populaire 2023-2025
    id: 'accusefive-airencuoguo',
    category: 'tendances',
    title: '爱人错过',
    artist: '告五人',
    youtubeUrl: 'https://www.youtube.com/watch?v=6D79CYTxvOM',
    lyrics: []
  },
  {
    // 告五人 — outro mega-viral, 披星戴月的想你 Douyin trend 2023-2024
    id: 'accusefive-pixingdaiyue',
    category: 'tendances',
    title: '披星戴月的想你',
    artist: '告五人',
    youtubeUrl: 'https://youtu.be/VpwAq7hiij0?si=3uIjLqwSvIY4M8Iz',
    lyrics: []
  },
  {
    // 周兴哲 — 《几乎是爱情》2024, très populaire charts TW/CN
    id: 'ericchou-jihushiaiging',
    category: 'tendances',
    title: '几乎是爱情',
    artist: '周兴哲',
    youtubeUrl: 'https://youtu.be/ZlpxcCiCCP4?si=iwpQrMRbbzAHFtlZ',
    lyrics: []
  },
  {
    // 周杰伦 — 《最伟大的作品》2022, IFPI全球专辑冠军, toujours en tendance
    id: 'jaychou-zuiweida',
    category: 'tendances',
    title: '最伟大的作品',
    artist: '周杰伦',
    youtubeUrl: 'https://youtu.be/1emA1EFsPMM?si=-ict_Gsh8Q8txD6-',
    lyrics: []
  },
  {
    // 薛之谦 — viral Douyin 2024, dans tous les KTV/charts CN
    id: 'xueziqian-ai',
    category: 'tendances',
    title: 'AI',
    artist: '薛之谦',
    youtubeUrl: 'https://youtu.be/Lu8SxNm9h_k?si=emHIw1ae0z6xZ6yf',
    lyrics: []
  },
  {
    // 王赫野 — 《大风吹》2023, Apple Music CN #1, phénomène vocal
    id: 'wangheye-dafengchui',
    category: 'tendances',
    title: '大风吹',
    artist: '王赫野 & 刘惜君',
    youtubeUrl: 'https://youtu.be/nqDTWlZKGug?si=wuaaIXqYXhlsfqPn',
    lyrics: []
  },
  {
    // 林俊杰 — 《交换余生》2020, Apple Music CN top 2023 encore
    id: 'jjlin-jiaohuanyusheng',
    category: 'tendances',
    title: '交换余生',
    artist: '林俊杰',
    youtubeUrl: 'https://youtu.be/mNQwhIx_0CM?si=eAVnF9GcuIsewwcA',
    lyrics: []
  },
  {
    // LBI利比 — 《跳楼机》2024, Spotify CN #3 华语歌手 juillet 2025
    id: 'lbi-tiaoluoji',
    category: 'tendances',
    title: '跳楼机',
    artist: 'LBI利比',
    youtubeUrl: 'https://youtu.be/HegSBovl24I?si=JcgYliy-0r9rLIoY',
    lyrics: []
  },
  {
    // 揽佬 — 《大展鸿图》2025, Spotify #1 华语歌手 juillet 2025, TikTok/Douyin viral
    id: 'lanlao-dazhanhongtu',
    category: 'tendances',
    title: '大展鸿图',
    artist: '揽佬',
    youtubeUrl: 'https://youtu.be/mldcDidGJCg?si=4xryUv1WjDZTE1av',
    lyrics: []
  },
  {
    // 薛之谦 — 《天外来物》2023, Douyin viral, QQ音乐榜首
    id: 'xueziqian-tianwailaiwu',
    category: 'tendances',
    title: '天外来物',
    artist: '薛之谦',
    youtubeUrl: 'https://youtu.be/SfE6cG4KfHA?si=R2bbrEFkGUD4-mQc',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  BALLADES  — Romantiques, émotionnelles, intemporelles
  //  Sources : KTV必点TOP100, Spotify ballads playlists, charts CN/TW
  // ═══════════════════════════════════════════════════════════════════

  {
    // Ballade iconique 1999 — KTV #2 tous classements
    id: 'reneliu-houlai',
    category: 'ballades',
    title: '后来',
    artist: '刘若英',
    youtubeUrl: 'https://www.youtube.com/watch?v=t0igPuDjYUE',
    lyrics: []
  },
  {
    // 周兴哲 — ballade émotionnelle 2016, un des titres les plus streamés CN
    id: 'ericchou-nihaobuhao',
    category: 'ballades',
    title: '你，好不好？',
    artist: '周兴哲',
    youtubeUrl: 'https://www.youtube.com/watch?v=wSBXfzgqHtE',
    lyrics: []
  },
  {
    // 周兴哲 — OST romantique, très populaire
    id: 'ericchou-zenmele',
    category: 'ballades',
    title: '怎么了',
    artist: '周兴哲',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y2ge3KrdeWs',
    lyrics: []
  },
  {
    // G.E.M. — power ballad 2014, classique indémodable, KTV #4
    id: 'gem-paomo',
    category: 'ballades',
    title: '泡沫',
    artist: 'G.E.M. 邓紫棋',
    youtubeUrl: 'https://www.youtube.com/watch?v=mGeiABBB5f8',
    lyrics: []
  },
  {
    // 林俊杰 — KTV incontournable, très streamé QQ Music
    id: 'jjlin-keximeiruguo',
    category: 'ballades',
    title: '可惜没如果',
    artist: '林俊杰',
    youtubeUrl: 'https://www.youtube.com/watch?v=vsBf_0gDxSM',
    lyrics: []
  },
  {
    // 林俊杰 — ballade romantique KTV, très populaire
    id: 'jjlin-xiulianaiqing',
    category: 'ballades',
    title: '修炼爱情',
    artist: '林俊杰',
    youtubeUrl: 'https://www.youtube.com/watch?v=LWV-f6dMN3Q',
    lyrics: []
  },
  {
    // 林俊杰 — ballade intense, one of his best
    id: 'jjlin-jiangushixiewochengwomen',
    category: 'ballades',
    title: '将故事写成我们',
    artist: '林俊杰',
    youtubeUrl: 'https://youtu.be/AKjgg3I6HEQ?si=dDxTAYyw7hPX4joP',
    lyrics: []
  },
  {
    // 田馥甄 — OST 《我的少女时代》 2015, ballade symbole d'une génération
    id: 'hebe-xiaoxingyun',
    category: 'ballades',
    title: '小幸运',
    artist: '田馥甄',
    youtubeUrl: 'https://www.youtube.com/watch?v=Kg-mW8SyNVg',
    lyrics: []
  },
  {
    // 周杰伦 — ballade poétique, Apple Music CN top 2025
    id: 'jaychou-daoxiang',
    category: 'ballades',
    title: '稻香',
    artist: '周杰伦',
    youtubeUrl: 'https://www.youtube.com/watch?v=sHD_z90ZKV0',
    lyrics: []
  },
  {
    // 周杰伦 — classic tearjerker
    id: 'jaychou-qianliyizhi',
    category: 'ballades',
    title: '千里之外',
    artist: '周杰伦 feat. 费玉清',
    youtubeUrl: 'https://youtu.be/ocDo3ySyHSI?si=f5zG3r4davevbKxH',
    lyrics: []
  },
  {
    // 薛之谦 — ballade émotionnelle, très populaire CN, KTV #15
    id: 'xueziqian-yangyuan',
    category: 'ballades',
    title: '演员',
    artist: '薛之谦',
    youtubeUrl: 'https://youtu.be/XaN3kUz4KSw?si=EEb7H6NN5URG3xnD',
    lyrics: []
  },
  {
    // 陈奕迅 — KTV #1, ballade ultime de rupture
    id: 'easonchan-shinian',
    category: 'ballades',
    title: '十年',
    artist: '陈奕迅',
    youtubeUrl: 'https://youtu.be/JM9rx_hN1Ko?si=7MdVURQX0d8tNqwz',
    lyrics: []
  },
  {
    // 陈奕迅 — ballade nostalgique 富士山下, KTV classique
    id: 'easonchan-fushishanxia',
    category: 'ballades',
    title: '富士山下',
    artist: '陈奕迅',
    youtubeUrl: 'https://youtu.be/ghnT1uOwfrY?si=L3qKAAzBDo7X07Ws',
    lyrics: []
  },
  {
    // 孙燕姿 — ballade emblématique 2003
    id: 'stefaniesun-yujian',
    category: 'ballades',
    title: '遇见',
    artist: '孙燕姿',
    youtubeUrl: 'https://youtu.be/WObbdwgB41c?si=WrU3-TyZX7Pub5no',
    lyrics: []
  },
  {
    // 梁静茹 — ballade courage 2003, KTV #22
    id: 'fish-keximenishi',
    category: 'ballades',
    title: '可惜不是你',
    artist: '梁静茹',
    youtubeUrl: 'https://youtu.be/k_l7FVsqUyM?si=p4EiWH6ZcwzDcSUQ',
    lyrics: []
  },
  {
    // 张学友 — 歌神级 ballade 1993, KTV #19
    id: 'jcheng-wenbie',
    category: 'ballades',
    title: '吻别',
    artist: '张学友',
    youtubeUrl: 'https://youtu.be/ZRCr3sqePzg?si=DSiH66aoTaU-fxfS',
    lyrics: []
  },
  {
    // 光良 — ballade féerique KTV classique
    id: 'guangliang-tonghua',
    category: 'ballades',
    title: '童话',
    artist: '光良',
    youtubeUrl: 'https://youtu.be/bBcp_ljCBGU?si=pELT1IfYnzjhq_nr',
    lyrics: []
  },
  {
    // 于文文 — ballade 2017 OST 《前任3》, viral et très populaire
    id: 'yuwenwen-timian',
    category: 'ballades',
    title: '体面',
    artist: '于文文',
    youtubeUrl: 'https://youtu.be/-kfVp3tqYvc?si=6UHqNLVArkWLJGbG',
    lyrics: []
  },
  {
    // 赵雷 — folk ballade 2016, mega-viral CN, Spotify top
    id: 'zhaolei-chengdu',
    category: 'ballades',
    title: '成都',
    artist: '赵雷',
    youtubeUrl: 'https://youtu.be/EPyFeQcDSUY?si=y_XbpSqVQBEhICZz',
    lyrics: []
  },
  {
    // 五月天 — rock ballade nostalgique, KTV #53
    id: 'mayday-turanhaoxiangni',
    category: 'ballades',
    title: '突然好想你',
    artist: '五月天',
    youtubeUrl: 'https://youtu.be/GtDRcXtDg-4?si=NcADtTL71Y8Bj76K',
    lyrics: []
  },
  {
    // 王菲 & 陈奕迅 — duo légendaire 2011, KTV duo classique
    id: 'fayeeason-yinweiaiging',
    category: 'ballades',
    title: '因为爱情',
    artist: '王菲 & 陈奕迅',
    youtubeUrl: 'https://youtu.be/VdwAkhNdZi8?si=zc2WA3zAagwwsJ-x',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  PARTY ANTHEMS  — Festifs, KTV, dancefloor, up-tempo
  //  Sources : KTV必点TOP100, charts 凤凰传奇/蔡依林/周杰伦/五月天
  // ═══════════════════════════════════════════════════════════════════

  {
    // 周杰伦 — rap/hip-hop festif, KTV incontournable
    id: 'jaychou-bencaogangmu',
    category: 'party_anthems',
    title: '本草纲目',
    artist: '周杰伦',
    youtubeUrl: 'https://www.youtube.com/watch?v=8CD06hC1KGU',
    lyrics: []
  },
  {
    // 周杰伦 — nunchuck rap, anthem générationnel KTV
    id: 'jaychou-shuangjiegun',
    category: 'party_anthems',
    title: '双截棍',
    artist: '周杰伦',
    youtubeUrl: 'https://www.youtube.com/watch?v=OR-0wptI_u0',
    lyrics: []
  },
  {
    // 周杰伦 — pop festif familial
    id: 'jaychou-tingmamadehua',
    category: 'party_anthems',
    title: '听妈妈的话',
    artist: '周杰伦',
    youtubeUrl: 'https://www.youtube.com/watch?v=_B8RaLCNUZw',
    lyrics: []
  },
  {
    // 周杰伦 — Rap/R&B festif, crowd pleaser
    id: 'jaychou-aiizaiziqian',
    category: 'party_anthems',
    title: '爱在西元前',
    artist: '周杰伦',
    youtubeUrl: 'https://youtu.be/5XK2C9w6oVk?si=wkd1FEtUpJ7rBT6g',
    lyrics: []
  },
  {
    // 王心凌 — comeback viral 2022, hymne nostalgie festif
    id: 'cyndi-aini',
    category: 'party_anthems',
    title: '爱你',
    artist: '王心凌',
    youtubeUrl: 'https://www.youtube.com/watch?v=NAODcPQcy9U',
    lyrics: []
  },
  {
    // 筷子兄弟 — viral intemporel, KTV universel
    id: 'chopsticks-xiaopingguo',
    category: 'party_anthems',
    title: '小苹果',
    artist: '筷子兄弟',
    youtubeUrl: 'https://www.youtube.com/watch?v=QESBcjX-G9g',
    lyrics: []
  },
  {
    // 火箭少女101 — girl group pop festive
    id: 'rocketgirls-kaluli',
    category: 'party_anthems',
    title: '卡路里',
    artist: '火箭少女101',
    youtubeUrl: 'https://www.youtube.com/watch?v=CBNreMHhkfg',
    lyrics: []
  },
  {
    // 凤凰传奇 — mega-hit CN dancefloor, KTV #12
    id: 'phoenix-zuixuanminzufeng',
    category: 'party_anthems',
    title: '最炫民族风',
    artist: '凤凰传奇',
    youtubeUrl: 'https://youtu.be/Ynypvs5s75Y?si=61oXcgg27w7uGLTl',
    lyrics: []
  },
  {
    // 凤凰传奇 — autre anthem festif très populaire
    id: 'phoenix-ziyoufeixiang',
    category: 'party_anthems',
    title: '自由飞翔',
    artist: '凤凰传奇',
    youtubeUrl: 'https://youtu.be/FdxjeObg7y4?si=4d3lXigM6wRUSK6k',
    lyrics: []
  },
  {
    // 蔡依林 — dance pop anthem TW, KTV classique
    id: 'jolint-woniang',
    category: 'party_anthems',
    title: '舞娘',
    artist: '蔡依林',
    youtubeUrl: 'https://youtu.be/0EN3MnGEBXk?si=WVlJvjL1J241Siv4',
    lyrics: []
  },
  {
    // 蔡依林 — electro-pop, club anthem 2012
    id: 'jolint-dayishujia',
    category: 'party_anthems',
    title: '大艺术家',
    artist: '蔡依林',
    youtubeUrl: 'https://youtu.be/bWx-vtCSg0w?si=SNr_dnGzj2coqYYW',
    lyrics: []
  },
  {
    // 五月天 — rock anthem, KTV #54
    id: 'mayday-juejue',
    category: 'party_anthems',
    title: '倔强',
    artist: '五月天',
    youtubeUrl: 'https://youtu.be/R2s-H_crYkc?si=JbZNQVJkEuVbsvU0',
    lyrics: []
  },
  {
    // S.H.E — girl group pop festive, KTV #38
    id: 'she-superstar',
    category: 'party_anthems',
    title: 'Super Star',
    artist: 'S.H.E',
    youtubeUrl: 'https://youtu.be/gr5fNKK2FaA?si=-Fgy2TnPi5o4G_cM',
    lyrics: []
  },
  {
    // S.H.E — China talk pop, très populaire en soirée
    id: 'she-zhongguohua',
    category: 'party_anthems',
    title: '中国话',
    artist: 'S.H.E',
    youtubeUrl: 'https://youtu.be/tCKGoND0pS0?si=sSfgdVREDafW8oNw',
    lyrics: []
  },
  {
    // 陶喆 & 蔡依林 — duo festif, KTV #31
    id: 'daozhe-jintianniaojiajia',
    category: 'party_anthems',
    title: '今天你要嫁给我',
    artist: '陶喆 & 蔡依林',
    youtubeUrl: 'https://youtu.be/WRwarsqzZ_M?si=GzxgscJl_TweJSha',
    lyrics: []
  },
  {
    // 潘玮柏 & 张韶涵 — dance pop duo festif, KTV #23
    id: 'pgone-kuaichongbai',
    category: 'party_anthems',
    title: '快乐崇拜',
    artist: '潘玮柏 & 张韶涵',
    youtubeUrl: 'https://youtu.be/p3CBaikDft0?si=E6faUIlZ8q05uVC8',
    lyrics: []
  },
  {
    // TFBOYS — idol pop 2014, iconique pour les jeunes
    id: 'tfboys-qingchunxiulianshouce',
    category: 'party_anthems',
    title: '青春修炼手册',
    artist: 'TFBOYS',
    youtubeUrl: 'https://youtu.be/mpAV6LzoonA?si=OyiFiOW0Ah8u3LOs',
    lyrics: []
  },
  {
    // CORSAK — dance pop viral 2024, très populaire sur Douyin/TikTok
    id: 'corsak-reverse-su',
    category: 'party_anthems',
    title: 'Reverse 溯',
    artist: 'CORSAK & 马吟吟',
    youtubeUrl: 'https://youtu.be/CK_e1vWUdXY?si=01B8RpOoWYnhWU8o',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  国风 GUOFENG — Folk traditionnel, 古风, fusion opéra/instruments anciens
  //  Style emblématique CN : erhu, guzheng, pipa, dizi + pop moderne
  // ═══════════════════════════════════════════════════════════════════

  {
    // 刀郎 — 2023, phénomène absolu : 400 milliards de streams, fusion Ska+唢呐+戏曲
    id: 'daolang-luochahishi',
    category: 'guofeng',
    title: '罗刹海市',
    artist: '刀郎',
    youtubeUrl: 'https://youtu.be/sjstsUSgRIc?si=oKf4CXEaTRcgpbze',
    lyrics: []
  },
  {
    // 刀郎 — même album 《山歌寥哉》2023, 古风 + folk, top 网易云国风榜
    id: 'daolang-huayao',
    category: 'guofeng',
    title: '花妖',
    artist: '刀郎',
    youtubeUrl: 'https://youtu.be/qkOvwQS4S2Y?si=GAhyr861vKyzjEyl',
    lyrics: []
  },
  {
    // 周深 — 《大鱼》2017, OST 大鱼海棠, devenu hymne 国风 intemporel
    id: 'zhoushen-dayu',
    category: 'guofeng',
    title: '大鱼',
    artist: '周深',
    youtubeUrl: 'https://youtu.be/-aMdBA00Ijc?si=C4jcSDvtIRddTG7H',
    lyrics: []
  },
  {
    // 周杰伦 — 国风 emblématique, guzheng + rap, KTV 经典
    id: 'jaychou-dongfengpo',
    category: 'guofeng',
    title: '东风破',
    artist: '周杰伦',
    youtubeUrl: 'https://youtu.be/qct0JLjaHDc?si=D5vNsCTCczInbDga',
    lyrics: []
  },
  {
    // 周杰伦 — 青花瓷, 国风 porcelaine bleue, l'un des plus beaux titres CN
    id: 'jaychou-qinghuaci',
    category: 'guofeng',
    title: '青花瓷',
    artist: '周杰伦',
    youtubeUrl: 'https://youtu.be/Z8Mqw0b9ADs?si=pr9jP8rqBPAqhHuR',
    lyrics: []
  },
  {
    // 华晨宇 — rock 国风 《烟火里的尘埃》2014, Douyin intemporel, voix puissante
    id: 'huachengyu-yanhuolichencai',
    category: 'guofeng',
    title: '烟火里的尘埃',
    artist: '华晨宇',
    youtubeUrl: 'https://youtu.be/yJfRHVmTiLs?si=NQD0rHn7bmyUz4Tr',
    lyrics: []
  },
  {
    // 任然 — 《飞鸟和蝉》2022, Douyin viral persistant, 国风 lyrique moderne
    id: 'renran-feiniaoheChan',
    category: 'guofeng',
    title: '飞鸟和蝉',
    artist: '任然',
    youtubeUrl: 'https://youtu.be/Sdh16YlinNE?si=9cFbw69_fDizIuIs',
    lyrics: []
  },
  {
    // 邓紫棋 — 《超能力》2023, 国风 electroPop, très populaire
    id: 'gem-chaonengli',
    category: 'guofeng',
    title: '超能力',
    artist: 'G.E.M. 邓紫棋',
    youtubeUrl: 'https://youtu.be/-7uaa_ONFo0?si=n8JgeG7YnwRUhQoE',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  INDIE / ROCK — Alternative, folk rock, shoegaze, post-rock CN/TW
  // ═══════════════════════════════════════════════════════════════════

  {
    // 郭顶 — 《水星记》2016, viral 2023 Apple Music CN, dream pop/art pop
    id: 'guoding-shuixingji',
    category: 'indie_rock',
    title: '水星记',
    artist: '郭顶',
    youtubeUrl: 'https://youtu.be/ENKFTmJxBaY?si=kuclYDDUPzxG8wWg',
    lyrics: []
  },
  {
    // 郭顶 — 《凄美地》2016, viral 2023, space-age pop
    id: 'guoding-qimeidi',
    category: 'indie_rock',
    title: '凄美地',
    artist: '郭顶',
    youtubeUrl: 'https://youtu.be/NXpIQSdX_wQ?si=1BFHZz1Ake1BjFlq',
    lyrics: []
  },
  {
    // 毛不易 — 《消愁》2017, indie folk, 《明日之子》冠军曲, intemporel
    id: 'maobuyi-xiaochou',
    category: 'indie_rock',
    title: '消愁',
    artist: '毛不易',
    youtubeUrl: 'https://youtu.be/9C3Nd5dRin8?si=u5Fx1Ep9lmooF4Bk',
    lyrics: []
  },
  {
    // 毛不易 — 《平凡的一天》2018, indie folk, Douyin persistant
    id: 'maobuyi-pingfandeyitian',
    category: 'indie_rock',
    title: '平凡的一天',
    artist: '毛不易',
    youtubeUrl: 'https://youtu.be/hmJqC--g_as?si=J6xb-joF4Dn-8DiH',
    lyrics: []
  },
  {
    // 五月天 — rock alternatif TW, 《知足》2004, anthème des concerts
    id: 'mayday-zhizu',
    category: 'indie_rock',
    title: '知足',
    artist: '五月天',
    youtubeUrl: 'https://youtu.be/_o0oeyCtoFA?si=G9z16G-xJ_TFzCmW',
    lyrics: []
  },
  {
    // 陈粒 — 《奇妙能力歌》2015, indie folk, très populaire 网易云
    id: 'chenli-qimiaonengliGe',
    category: 'indie_rock',
    title: '奇妙能力歌',
    artist: '陈粒',
    youtubeUrl: 'https://youtu.be/Mq5nls19vDE?si=ywHlG6VA7tb2jcgo',
    lyrics: []
  },
  {
    // 苏打绿 Sodagreen — 《小情歌》2006, indie pop TW, hymne karaoke indie
    id: 'sodagreen-xiaoqingge',
    category: 'indie_rock',
    title: '小情歌',
    artist: '苏打绿',
    youtubeUrl: 'https://youtu.be/in8NNzwFa-s?si=l0_28KObI3CEZKnG',
    lyrics: []
  },
  {
    // 李荣浩 — 《年少有为》2018, indie pop/folk, très streamé CN
    id: 'lironghao-nianshao',
    category: 'indie_rock',
    title: '年少有为',
    artist: '李荣浩',
    youtubeUrl: 'https://youtu.be/Dnj5Tcpev0Q?si=4_jg3S0sl-K7p9GF',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  R&B / SOUL — Urbain, smooth, contemporain
  // ═══════════════════════════════════════════════════════════════════

  {
    // 方大同 Khalil Fong — R&B soul TW/HK, 《爱爱爱》2007, classique du genre
    id: 'khalil-aiaiai',
    category: 'rnb_soul',
    title: '爱爱爱',
    artist: '方大同',
    youtubeUrl: 'https://youtu.be/812omgU1tHs?si=hlWYJNVZsdPOa7lA',
    lyrics: []
  },
  {
    // 蔡健雅 Tanya Chua — 《红色高跟鞋》2011, soul pop, KTV & Douyin classic
    id: 'tanya-hongseGaogenxie',
    category: 'rnb_soul',
    title: '红色高跟鞋',
    artist: '蔡健雅',
    youtubeUrl: 'https://youtu.be/ATblV50Odx8?si=cOHsOMd8RrpUsjar',
    lyrics: []
  },
  {
    // 王力宏 — 《你不知道的事》R&B, 2011, très streamé
    id: 'wanglehom-nibuzhidao',
    category: 'rnb_soul',
    title: '你不知道的事',
    artist: '王力宏',
    youtubeUrl: 'https://youtu.be/eYQFKocqujc?si=aDqndbdSk-gQSs_h',
    lyrics: []
  },
  {
    // 周深 — 《起风了》2018 (reprise), R&B folk viral, 300M+ streams
    id: 'zhoushen-qifengle',
    category: 'rnb_soul',
    title: '起风了',
    artist: '周深',
    youtubeUrl: 'https://youtu.be/ortPei4S_cg?si=JMn_FvqowhoNZ1Fw',
    lyrics: []
  },
  {
    // 陈奕迅 — 《好久不见》2010, soul pop, un de ses plus beaux titres
    id: 'easonchan-haojiubujian',
    category: 'rnb_soul',
    title: '好久不见',
    artist: '陈奕迅',
    youtubeUrl: 'https://youtu.be/UsFQ9kbpQhw?si=Q3BN7Pk4ZBptWnCJ',
    lyrics: []
  },
  {
    // 李玟 CoCo Lee — R&B diva CN, 《Di Da Di》《数到三》《Perhaps Love》
    id: 'cocoLee-shudaosan',
    category: 'rnb_soul',
    title: '数到三',
    artist: '李玟',
    youtubeUrl: 'https://youtu.be/prql_WmamqY?si=C6Xd09SQUO2PhzJS',
    lyrics: []
  },

  // ═══════════════════════════════════════════════════════════════════
  //  CDRAMA OST — Bandes originales de séries chinoises populaires
  //  OST souvent indissociables des dramas qui les ont fait connaître
  // ═══════════════════════════════════════════════════════════════════

  {
    // 邓紫棋 — OST 《太空潜航者 Passengers》2016, ballade épique
    id: 'gem-guangnianzhiwai-ost',
    category: 'cdrama_ost',
    title: '多远都要在一起',
    artist: 'G.E.M. 邓紫棋',
    youtubeUrl: 'https://youtu.be/D9ksLn6hZ7Q?si=iHjDmpOxEDVBhZsk',
    lyrics: []
  },
  {
    // 毛不易 — OST 《以家人之名》2020, tearjerker drama CN
    id: 'maobuyi-yijiaxingzhiming',
    category: 'cdrama_ost',
    title: '一荤一素',
    artist: '毛不易',
    youtubeUrl: 'https://youtu.be/uRPOFwV2daY?si=wCs_zlRlIPII334D',
    lyrics: []
  },
  {
    // 张碧晨 & 杨宗纬 — OST 《三生三世十里桃花》2017, duo épique
    id: 'zhangbichen-liangliangshanguang',
    category: 'cdrama_ost',
    title: '凉凉',
    artist: '张碧晨 & 杨宗纬',
    youtubeUrl: 'https://youtu.be/M7GkL--nb5M?si=rANaa5q2I_6L1A_a',
    lyrics: []
  },
  {
    // 刘宇宁 — OST 《苍兰诀》2022, xianxia drama hit
    id: 'liuyuning-wuchang',
    category: 'cdrama_ost',
    title: '无常',
    artist: '刘宇宁',
    youtubeUrl: 'https://youtu.be/lQCRGJtCpVo?si=LjdwhFpQ6V3ACAms',
    lyrics: []
  },
  {
    // 张靓颖 — OST 《亲爱的，热爱的》2019, drama romantique
    id: 'janezhang-liangxing',
    category: 'cdrama_ost',
    title: '不沐春風不遇你',
    artist: '张靓颖 & 刘宇宁',
    youtubeUrl: 'https://youtu.be/Fs4_u3WM2f0?si=RlIOR4O0CNiWG3h4',
    lyrics: []
  },
  {
    // 周深 — OST 《有翡》2021 + viral xianxia ost
    id: 'zhoushen-guangliang',
    category: 'cdrama_ost',
    title: '光亮',
    artist: '周深',
    youtubeUrl: 'https://youtu.be/YU2nse4Ohe8?si=NUjtMMyFqRamIC_B',
    lyrics: []
  },
  {
    id: 'xukai-chengxiao-yidijiemo',
    category: 'cdrama_ost',
    title: '第一默契',
    artist: '许凯 & 程潇 ',
    youtubeUrl: 'https://youtu.be/nWeYKvW_ToI?si=kFnzyNlqeU8rcv5Q',
    lyrics: []
  },
  {
    id: 'sushiding-xing',
    category: 'cdrama_ost',
    title: '醒',
    artist: '苏诗丁 Juno Su',
    youtubeUrl: 'https://youtu.be/SemvxdQeJt0?si=xMHMkVhDsSNGvJZS',
    lyrics: []
  },
  {
    id: 'yexuanqing-jiuzhangji',
    category: 'cdrama_ost',
    title: '九张机',
    artist: '叶炫清',
    youtubeUrl: 'https://youtu.be/Eg91vls0obo?si=s_1p26BbLqBDHxLs',
    lyrics: []
  },


  // ═══════════════════════════════════════════════════════════════════
  //  POP TENDANCES  — Hits récents, viral sur Douyin/TikTok, charts CN/TW
  // Sources : Spotify Viral 50 CN, Douyin trending songs, Apple Music charts
  // ═══════════════════════════════════════════════════════════════════
  
  {
    //
    id: 'zhaolusi-mangzhong-ost',
    category: 'cpop',
    title: '芒种',
    artist: '赵露思',
    youtubeUrl: 'https://youtu.be/QhvfHdzxwvc?si=Mk-UhNGoJdLnwLAb',
    lyrics: []
  },
  {
    id: 'zhaofangjing-mangzhong',
    category: 'cpop',
    title: '芒种',
    artist: '赵方婧',
    youtubeUrl: 'https://youtu.be/q2WvTaqe9zU?si=BYPkQPBYaR-XiO7O',
    lyrics: []
  },
  {
    id: 'alecbenjamin-zhaolusi-waterfountain',
    category: 'cpop',
    title: 'water fountain',
    artist: 'Alec Benjamin & 赵露思',
    youtubeUrl: 'https://youtu.be/u_yiFPJF58o?si=MEUGizik8JK3PGd1',
    lyrics: []
  },
  {
    id: 'jujingyi-luo',
    category: 'cpop',
    title: '落',
    artist: '鞠婧祎',
    youtubeUrl: 'https://youtu.be/8Nh4ZPhYKEc?si=7fempuG4Gj1Et0u5',
    lyrics: []
  },
  {
    id: 'jujingyi-hongzhaoyuan',
    category: 'cpop',
    title: '红昭愿',
    artist: '鞠婧祎',
    youtubeUrl: 'https://youtu.be/6gFUB9eDFD0?si=UCsCpBTj2Gb0Kz-v',
    lyrics: []
  },
  {
    id: 'wangziyu-hongzhaoyuan',
    category: 'cpop',
    title: '红昭愿',
    artist: '王梓钰',
    youtubeUrl: 'https://youtu.be/bgpwCq6PRR0?si=UJOKIK2PsvapbdRO',
    lyrics: []
  },
  {
    id: 'jujingyi-wanfenggaobai',
    category: 'cpop',
    title: '晚风告白',
    artist: '鞠婧祎 & 米卡',
    youtubeUrl: 'https://youtu.be/3Vyqt1IDY24?si=RWGSk8D0MAJOlXn6',
    lyrics: []
  },
  {
    id: 'superluckyqi-shang-zinxxwangzixing-luvsong',
    category: 'cpop',
    title: 'Luv Song',
    artist: 'Superluckyqi & Shang & Z!NXX王紫行',
    youtubeUrl: 'https://youtu.be/R5FaQY5GUww?si=JhEyGFlCZhLNrrQ2',
    lyrics: []
  },
  {
    id: 'jujingyi-lianai-gaoji',
    category: 'cpop',
    title: '恋爱告急',
    artist: '鞠婧祎',
    youtubeUrl: 'https://youtu.be/qNhzEtVBE4c?si=qT8ZUfZlrqMLXuXu',
    lyrics: []
  },
  {
    id: 'haoletuan-goodband-tamen-shuo-wode',
    category: 'cpop',
    title: '他們說我是沒有用的年輕人',
    artist: '好樂團 GoodBand',
    youtubeUrl: 'https://youtu.be/FNJG6MsKO0k?si=3uNTe95Yjyhgv-LH',
    lyrics: []
  },
  {
    id: 'mayday-meiguiShaonian',
    category: 'cpop',
    title: '玫瑰少年',
    artist: 'MAYDAY五月天',
    youtubeUrl: 'https://youtu.be/65IKNssGRPI?si=dJPABRVvC0yR47OK',
    lyrics: []
  },
  {
    id: 'mayday-meiguiShaonian',
    category: 'cpop',
    title: '盛夏光年',
    artist: 'MAYDAY五月天 & G.E.M. 鄧紫棋',
    youtubeUrl: 'https://youtu.be/zsZMeEl6Gxk?si=r6kp98BG92x8ATA6',
    lyrics: []
  },
  {
    id: 'xmaswu-zhongyuwofaxian-shenjian-de-renhuizheji-jie-lunhuan',
    category: 'cpop',
    title: '終於我發現身邊的人會跟著季節輪換。',
    artist: 'XMASwu',
    youtubeUrl: 'https://youtu.be/nmtZ6SDB2ok?si=1CfLo790RYi5iN64',
    lyrics: []
  },

  {
    id: 'bufenhuahua-yifen',
    category: 'cpop',
    title: '分你一半',
    artist: '不是花火呀',
    youtubeUrl: 'https://youtu.be/Y1GF3vLBhQw?si=PVv0mP79pMHBWKU0',
    lyrics: []
  },

  {
    id: 'alin-yuhoucaihong',
    category: 'cpop',
    title: '雨後彩虹 Rainbow',
    artist: 'A-Lin',
    youtubeUrl: 'https://youtu.be/ua63bVAwfF4?si=_S7caF5tag0aNkPj',
    lyrics: []
  }
];