#!/usr/bin/env python3
"""
Ajoute ~100 pays au fichier src/data/hors-hsk.json (idempotent).

- Charge hors-hsk.json (79 MB) en mémoire
- Pour chaque pays de la liste : si le hanzi est déjà présent, skip ; sinon
  ajoute une nouvelle entrée à la fin avec un ID incrémental.
- Sauvegarde en réécrivant le fichier complet (~30s pour 79 MB).

Usage : python3 scripts/add-countries-to-hors-hsk.py
"""

import json
import os
import sys

PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'hors-hsk.json')

# Liste curée : ~100 pays + dépendances. Format : (hanzi, pinyin, fr, en)
COUNTRIES = [
    # ASIE
    ('中国',       'zhōng guó',         'Chine',                      'China'),
    ('朝鲜',       'cháo xiǎn',         'Corée du Nord',              'North Korea'),
    ('越南',       'yuè nán',           'Vietnam',                    'Vietnam'),
    ('泰国',       'tài guó',           'Thaïlande',                  'Thailand'),
    ('印度',       'yìn dù',            'Inde',                       'India'),
    ('印度尼西亚',  'yìn dù ní xī yà',   'Indonésie',                  'Indonesia'),
    ('菲律宾',     'fēi lǜ bīn',        'Philippines',                'Philippines'),
    ('马来西亚',    'mǎ lái xī yà',      'Malaisie',                   'Malaysia'),
    ('新加坡',     'xīn jiā pō',        'Singapour',                  'Singapore'),
    ('缅甸',       'miǎn diàn',         'Birmanie (Myanmar)',         'Myanmar'),
    ('柬埔寨',     'jiǎn pǔ zhài',      'Cambodge',                   'Cambodia'),
    ('老挝',       'lǎo wō',            'Laos',                       'Laos'),
    ('蒙古',       'méng gǔ',           'Mongolie',                   'Mongolia'),
    ('巴基斯坦',    'bā jī sī tǎn',      'Pakistan',                   'Pakistan'),
    ('孟加拉国',    'mèng jiā lā guó',   'Bangladesh',                 'Bangladesh'),
    ('斯里兰卡',    'sī lǐ lán kǎ',      'Sri Lanka',                  'Sri Lanka'),
    ('尼泊尔',     'ní bó ěr',          'Népal',                      'Nepal'),
    ('不丹',       'bù dān',            'Bhoutan',                    'Bhutan'),
    ('阿富汗',     'ā fù hàn',          'Afghanistan',                'Afghanistan'),
    ('伊朗',       'yī lǎng',           'Iran',                       'Iran'),
    ('伊拉克',     'yī lā kè',          'Irak',                       'Iraq'),
    ('沙特阿拉伯',  'shā tè ā lā bó',    'Arabie saoudite',            'Saudi Arabia'),
    ('阿联酋',     'ā lián qiú',        'Émirats arabes unis',        'UAE'),
    ('以色列',     'yǐ sè liè',         'Israël',                     'Israel'),
    ('土耳其',     'tǔ ěr qí',          'Turquie',                    'Turkey'),
    ('叙利亚',     'xù lì yà',          'Syrie',                      'Syria'),
    ('黎巴嫩',     'lí bā nèn',         'Liban',                      'Lebanon'),
    ('约旦',       'yuē dàn',           'Jordanie',                   'Jordan'),
    ('卡塔尔',     'kǎ tǎ ěr',          'Qatar',                      'Qatar'),
    ('科威特',     'kē wēi tè',         'Koweït',                     'Kuwait'),
    ('阿曼',       'ā màn',             'Oman',                       'Oman'),
    ('也门',       'yě mén',            'Yémen',                      'Yemen'),
    ('哈萨克斯坦',  'hā sà kè sī tǎn',   'Kazakhstan',                 'Kazakhstan'),
    ('乌兹别克斯坦','wū zī bié kè sī tǎn','Ouzbékistan',               'Uzbekistan'),

    # EUROPE
    ('葡萄牙',     'pú táo yá',         'Portugal',                   'Portugal'),
    ('荷兰',       'hé lán',            'Pays-Bas',                   'Netherlands'),
    ('比利时',     'bǐ lì shí',         'Belgique',                   'Belgium'),
    ('瑞士',       'ruì shì',           'Suisse',                     'Switzerland'),
    ('奥地利',     'ào dì lì',          'Autriche',                   'Austria'),
    ('瑞典',       'ruì diǎn',          'Suède',                      'Sweden'),
    ('挪威',       'nuó wēi',           'Norvège',                    'Norway'),
    ('丹麦',       'dān mài',           'Danemark',                   'Denmark'),
    ('芬兰',       'fēn lán',           'Finlande',                   'Finland'),
    ('冰岛',       'bīng dǎo',          'Islande',                    'Iceland'),
    ('爱尔兰',     'ài ěr lán',         'Irlande',                    'Ireland'),
    ('希腊',       'xī là',             'Grèce',                      'Greece'),
    ('波兰',       'bō lán',            'Pologne',                    'Poland'),
    ('捷克',       'jié kè',            'République tchèque',         'Czech Republic'),
    ('斯洛伐克',    'sī luò fá kè',      'Slovaquie',                  'Slovakia'),
    ('匈牙利',     'xiōng yá lì',       'Hongrie',                    'Hungary'),
    ('罗马尼亚',    'luó mǎ ní yà',      'Roumanie',                   'Romania'),
    ('保加利亚',    'bǎo jiā lì yà',     'Bulgarie',                   'Bulgaria'),
    ('乌克兰',     'wū kè lán',         'Ukraine',                    'Ukraine'),
    ('白俄罗斯',    'bái é luó sī',      'Biélorussie',                'Belarus'),
    ('塞尔维亚',    'sài ěr wéi yà',     'Serbie',                     'Serbia'),
    ('克罗地亚',    'kè luó dì yà',      'Croatie',                    'Croatia'),
    ('斯洛文尼亚',  'sī luò wén ní yà',  'Slovénie',                   'Slovenia'),
    ('卢森堡',     'lú sēn bǎo',        'Luxembourg',                 'Luxembourg'),
    ('马耳他',     'mǎ ěr tā',          'Malte',                      'Malta'),
    ('塞浦路斯',    'sài pǔ lù sī',      'Chypre',                     'Cyprus'),
    ('立陶宛',     'lì táo wǎn',        'Lituanie',                   'Lithuania'),
    ('拉脱维亚',    'lā tuō wéi yà',     'Lettonie',                   'Latvia'),
    ('爱沙尼亚',    'ài shā ní yà',      'Estonie',                    'Estonia'),
    ('阿尔巴尼亚',  'ā ěr bā ní yà',     'Albanie',                    'Albania'),
    ('梵蒂冈',     'fàn dì gāng',       'Vatican',                    'Vatican City'),
    ('摩纳哥',     'mó nà gē',          'Monaco',                     'Monaco'),

    # AMÉRIQUES
    ('加拿大',     'jiā ná dà',         'Canada',                     'Canada'),
    ('墨西哥',     'mò xī gē',          'Mexique',                    'Mexico'),
    ('巴西',       'bā xī',             'Brésil',                     'Brazil'),
    ('阿根廷',     'ā gēn tíng',        'Argentine',                  'Argentina'),
    ('智利',       'zhì lì',            'Chili',                      'Chile'),
    ('秘鲁',       'bì lǔ',             'Pérou',                      'Peru'),
    ('哥伦比亚',    'gē lún bǐ yà',      'Colombie',                   'Colombia'),
    ('委内瑞拉',    'wěi nèi ruì lā',    'Venezuela',                  'Venezuela'),
    ('乌拉圭',     'wū lā guī',         'Uruguay',                    'Uruguay'),
    ('巴拉圭',     'bā lā guī',         'Paraguay',                   'Paraguay'),
    ('厄瓜多尔',    'è guā duō ěr',      'Équateur',                   'Ecuador'),
    ('玻利维亚',    'bō lì wéi yà',      'Bolivie',                    'Bolivia'),
    ('古巴',       'gǔ bā',             'Cuba',                       'Cuba'),
    ('牙买加',     'yá mǎi jiā',        'Jamaïque',                   'Jamaica'),
    ('巴拿马',     'bā ná mǎ',          'Panama',                     'Panama'),
    ('哥斯达黎加',  'gē sī dá lí jiā',   'Costa Rica',                 'Costa Rica'),
    ('多米尼加',    'duō mǐ ní jiā',     'République dominicaine',     'Dominican Republic'),
    ('海地',       'hǎi dì',            'Haïti',                      'Haiti'),

    # AFRIQUE
    ('埃及',       'āi jí',             'Égypte',                     'Egypt'),
    ('南非',       'nán fēi',           'Afrique du Sud',             'South Africa'),
    ('尼日利亚',    'ní rì lì yà',       'Nigeria',                    'Nigeria'),
    ('肯尼亚',     'kěn ní yà',         'Kenya',                      'Kenya'),
    ('摩洛哥',     'mó luò gē',         'Maroc',                      'Morocco'),
    ('阿尔及利亚',  'ā ěr jí lì yà',     'Algérie',                    'Algeria'),
    ('突尼斯',     'tū ní sī',          'Tunisie',                    'Tunisia'),
    ('利比亚',     'lì bǐ yà',          'Libye',                      'Libya'),
    ('苏丹',       'sū dān',            'Soudan',                     'Sudan'),
    ('埃塞俄比亚',  'āi sè é bǐ yà',     'Éthiopie',                   'Ethiopia'),
    ('加纳',       'jiā nà',            'Ghana',                      'Ghana'),
    ('塞内加尔',    'sài nèi jiā ěr',    'Sénégal',                    'Senegal'),
    ('科特迪瓦',    'kē tè dí wǎ',       'Côte d’Ivoire',              'Ivory Coast'),
    ('安哥拉',     'ān gē lā',          'Angola',                     'Angola'),
    ('喀麦隆',     'kā mài lóng',       'Cameroun',                   'Cameroon'),
    ('刚果',       'gāng guǒ',          'Congo',                      'Congo'),
    ('马达加斯加',  'mǎ dá jiā sī jiā',  'Madagascar',                 'Madagascar'),
    ('坦桑尼亚',    'tǎn sāng ní yà',    'Tanzanie',                   'Tanzania'),
    ('乌干达',     'wū gān dá',         'Ouganda',                    'Uganda'),
    ('津巴布韦',    'jīn bā bù wéi',     'Zimbabwe',                   'Zimbabwe'),
    ('莫桑比克',    'mò sāng bǐ kè',     'Mozambique',                 'Mozambique'),
    ('卢旺达',     'lú wàng dá',        'Rwanda',                     'Rwanda'),
    ('马里',       'mǎ lǐ',             'Mali',                       'Mali'),

    # OCÉANIE
    ('澳大利亚',    'ào dà lì yà',       'Australie',                  'Australia'),
    ('新西兰',     'xīn xī lán',        'Nouvelle-Zélande',           'New Zealand'),
    ('斐济',       'fěi jì',            'Fidji',                      'Fiji'),
]

def main():
    print(f"Loading {PATH}…")
    with open(PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"  {len(data)} entries loaded.")

    existing_hanzi = {e['hanzi'] for e in data}
    last_id_num = max(int(e['id'].rsplit('-', 1)[1]) for e in data if e['id'].startswith('hors-hsk-'))
    print(f"  Last ID number : hors-hsk-{last_id_num:06d}")

    skipped = 0
    added = 0
    next_id = last_id_num + 1

    for (hanzi, pinyin, fr, en) in COUNTRIES:
        if hanzi in existing_hanzi:
            skipped += 1
            continue
        new_id = f"hors-hsk-{next_id:06d}"
        next_id += 1
        entry = {
            "id": new_id,
            "level": "hors-hsk",
            "hanzi": hanzi,
            "pinyin": pinyin,
            "translationFr": fr,
            "category": "pays",
            "audio": "",
            "examples": [],
            "quiz": {
                "prompt": f"Sélectionne la bonne traduction pour « {hanzi} »",
                "choices": [fr, "(distracteur 1)", "(distracteur 2)", "(distracteur 3)"],
                "correctChoiceIndex": 0
            },
            "tags": ["pays", "géographie", "level:hors-hsk"],
            "theme": "géographie",
            "translationEn": en,
            "explanationFr": f"{fr} ({hanzi}, {pinyin}) est un pays."
        }
        data.append(entry)
        added += 1

    print(f"\n  Added   : {added}")
    print(f"  Skipped (existing) : {skipped}")
    print(f"  New total : {len(data)}")

    if added == 0:
        print("\n  Nothing to write.")
        return

    print(f"\nWriting back to {PATH}…")
    with open(PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("  Done.")

if __name__ == '__main__':
    main()
