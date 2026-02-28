export interface CPlayerLyricLine {
  time: number;
  hanzi: string;
  pinyin?: string;
  translationFr?: string;
  translationEn?: string;
}

export interface CPlayerSong {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  lyrics: CPlayerLyricLine[];
}

export const cplayerSongs: CPlayerSong[] = [
  {
    id: 'xiaolearn-demo',
    title: 'XiaoLearn Demo C-Pop',
    artist: 'XiaoLearn',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: [
      {
        time: 12,
        hanzi: '今天我们一起学中文',
        pinyin: 'jintian women yiqi xue zhongwen',
        translationFr: "Aujourd'hui, on apprend le chinois ensemble",
        translationEn: 'Today, we learn Chinese together'
      },
      {
        time: 18,
        hanzi: '听一遍再说一遍',
        pinyin: 'ting yi bian zai shuo yi bian',
        translationFr: 'Écoute une fois puis répète une fois',
        translationEn: 'Listen once, then repeat once'
      },
      {
        time: 24,
        hanzi: '看着汉字读拼音',
        pinyin: 'kan zhe hanzi du pinyin',
        translationFr: 'Lis le pinyin en regardant les sinogrammes',
        translationEn: 'Read pinyin while looking at hanzi'
      },
      {
        time: 30,
        hanzi: '每天进步一点点',
        pinyin: 'meitian jinbu yi diandian',
        translationFr: 'Progressons un petit peu chaque jour',
        translationEn: 'Make a little progress every day'
      }
    ]
  },
  {
    id: 'cpop-template-1',
    title: 'C-Pop Track 1 (Template)',
    artist: 'Custom',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: []
  },
  {
    id: 'cpop-template-2',
    title: 'C-Pop Track 2 (Template)',
    artist: 'Custom',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: []
  }
];
