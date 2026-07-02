#!/usr/bin/env python3
"""
Translate the French HSK 1 Anki TSV file to English.
Translates:
- Column 5 (Meaning): French definitions → English
- Column 6 (Examples): Only the French part (after last " - ") in each example
- Column 7 (Tags): French tags → English
"""

import csv
import re
import sys

INPUT_FILE = "/Users/petx/Library/Mobile Documents/com~apple~CloudDocs/Projets Dev/XiaoLearn/xiaolearn_anki/anki_mandarin_myway_hsk_1.tsv"
OUTPUT_FILE = "/Users/petx/Library/Mobile Documents/com~apple~CloudDocs/Projets Dev/XiaoLearn/xiaolearn_anki/anki_mandarin_myway_en_hsk_1.tsv"

# ─── Tag translations ───
TAG_MAP = {
    "émotion": "emotion",
    "quotidien": "daily",
    "grammaire": "grammar",
    "chiffre": "number",
    "famille": "family",
    "nom": "noun",
    "temps": "time",
    "quantité": "quantity",
    "nourriture": "food",
    "cuisine": "cooking",
    "boisson": "drink",
    "culture": "culture",
    "verbe": "verb",
    "loisir": "leisure",
    "lieu": "place",
    "shopping": "shopping",
    "transport": "transport",
    "voyage": "travel",
    "adjectif": "adjective",
    "politesse": "politeness",
    "salutation": "greeting",
    "négation": "negation",
    "communication": "communication",
    "technologie": "technology",
    "travail": "work",
    "pronom": "pronoun",
    "question": "question",
    "étude": "study",
    "profession": "profession",
    "relation": "relationship",
    "personne": "person",
    "direction": "direction",
    "déplacement": "movement",
    "adverbe": "adverb",
    "météo": "weather",
    "santé": "health",
    "argent": "money",
    "mesure": "measure",
    "vêtements": "clothing",
    "démonstratif": "demonstrative",
    "animal": "animal",
    "classificateur": "classifier",
    "éducation": "education",
    "commerce": "commerce",
    "fruit": "fruit",
    "genre": "genre",
    "position": "position",
    "musique": "music",
    "conjonction": "conjunction",
    "objet": "object",
    "concept": "concept",
    "impératif": "imperative",
    "transaction": "transaction",
    "âge": "age",
    "langue": "language",
    "degré": "degree",
    "perception": "perception",
    "action": "action",
    "médecine": "medicine",
    "modal": "modal",
    "capacité": "ability",
    "meuble": "furniture",
    "addition": "addition",
    "nombre": "number",
    "pays": "country",
    "nature": "nature",
    "jour": "day",
    "routine": "routine",
    "expression": "expression",
    "réponse": "response",
    "interjection": "interjection",
    "téléphone": "phone",
    "indéfini": "indefinite",
    "choix": "choice",
    "interrogatif": "interrogative",
    "pluriel": "plural",
    "mot": "word",
    "titre": "title",
}

# ─── Meaning translations (French definition → English definition) ───
# Keyed by the simplified Chinese character for uniqueness
MEANING_MAP = {
    "爱": "to love; love",
    "吧": "suggestion particle",
    "八": "eight",
    "爸爸": "dad",
    "百": "hundred",
    "白天": "daytime; day",
    "半": "half",
    "包子": "steamed stuffed buns",
    "杯子": "glass; cup",
    "本1": "classifier: volumes; books; notebook",
    "边": "side; edge",
    "病": "illness; sick",
    "不": "not",
    "不客气": "you're welcome",
    "不要": "don't (imperative)",
    "菜": "vegetables; dish",
    "茶": "tea",
    "唱": "to sing",
    "超市": "supermarket",
    "车": "vehicle",
    "吃": "to eat",
    "穿": "to wear (clothing)",
    "出租车": "taxi",
    "大": "big",
    "打电话": "to make a phone call",
    "大家": "everyone",
    "到": "to; until",
    "大学": "university",
    "大学生": "university student",
    "的": "possessive particle",
    "第": "ordinal prefix",
    "店": "shop; store",
    "点1": "point; a little; moment (hour)",
    "电话": "telephone",
    "电脑": "computer",
    "电视": "television",
    "电影": "movie",
    "电影院": "cinema",
    "弟弟": "younger brother",
    "东西": "thing; object",
    "都": "all; both",
    "读": "to read",
    "对": "correct; right",
    "对不起": "sorry; excuse me",
    "多": "many; much",
    "多少": "how many; how much",
    "读书": "to study; to read",
    "二": "two",
    "儿子": "son",
    "饭": "meal; cooked rice",
    "饭店": "restaurant; hotel",
    "房间": "room; bedroom",
    "非常": "very; extremely",
    "飞机": "airplane",
    "分": "minute; point",
    "分钟": "minute",
    "高兴": "happy; glad",
    "个": "(general classifier)",
    "歌": "song",
    "哥哥": "older brother",
    "给": "to give",
    "公司": "company",
    "工作": "to work; work",
    "狗": "dog",
    "贵": "expensive",
    "国": "country",
    "还1": "still; yet; also",
    "孩子": "child",
    "汉语": "Chinese (language)",
    "汉字": "Chinese character",
    "号": "number; date",
    "好": "good; well; OK",
    "好吃": "delicious",
    "好看": "good-looking; beautiful",
    "好听": "pleasant to hear",
    "好玩儿": "fun; amusing",
    "和1": "and; with",
    "喝": "to drink",
    "很": "very",
    "后": "behind; after",
    "回": "to return",
    "会1": "can; to know how; will; meeting",
    "火车": "train",
    "几": "how many (small number)",
    "家": "home; family",
    "见": "to see; to meet",
    "件": "classifier: clothing; matters",
    "叫": "to be called",
    "饺子": "dumplings",
    "家人": "family",
    "鸡蛋": "egg",
    "姐姐": "older sister",
    "今年": "this year",
    "今天": "today",
    "九": "nine",
    "觉得": "to think; to feel",
    "开": "to open; to drive",
    "开车": "to drive",
    "看1": "to look; to see; to read; to visit (doctor)",
    "看病": "to see a doctor",
    "看见": "to see",
    "课": "lesson; class",
    "可以": "can; may",
    "口": "mouth; classifier",
    "块": "yuan (currency)",
    "来": "to come",
    "老师": "teacher",
    "了": "completed action particle",
    "冷": "cold",
    "里": "inside",
    "两1": "two (before classifier)",
    "零": "zero",
    "六": "six",
    "吗": "question particle",
    "卖": "to sell",
    "买": "to buy",
    "妈妈": "mom",
    "忙": "busy",
    "猫": "cat",
    "没关系": "it doesn't matter",
    "妹妹": "younger sister",
    "没事": "it's nothing; no problem",
    "没（有）": "not have; did not",
    "们": "plural (suffix)",
    "面包": "bread",
    "面条儿": "noodles",
    "米饭": "rice (cooked)",
    "明年": "next year",
    "明天": "tomorrow",
    "名字": "name",
    "那": "that",
    "哪": "which",
    "那边": "over there",
    "那个": "that one",
    "哪个": "which one",
    "那里": "there",
    "哪里": "where",
    "男": "male",
    "男朋友": "boyfriend",
    "那儿": "there",
    "哪儿": "where",
    "那些": "those",
    "哪些": "which ones",
    "呢": "question particle",
    "能": "can; to be able to",
    "你": "you",
    "你好": "hello",
    "年": "year",
    "你们": "you (plural)",
    "您": "you (polite)",
    "牛奶": "milk",
    "女": "female",
    "女儿": "daughter",
    "女朋友": "girlfriend",
    "女士": "madam; lady",
    "朋友": "friend",
    "便宜": "cheap; inexpensive",
    "漂亮": "beautiful; pretty",
    "苹果": "apple",
    "七": "seven",
    "前": "front; before",
    "钱": "money",
    "千": "thousand",
    "起床": "to get up",
    "请": "please",
    "请问": "excuse me (to ask)",
    "去": "to go",
    "去年": "last year",
    "热": "hot",
    "人": "person; people",
    "认识": "to know (someone)",
    "日": "day; sun",
    "三": "three",
    "上": "above; up",
    "上班": "to go to work",
    "商店": "shop; store",
    "上课": "to attend class",
    "上午": "morning",
    "上学": "to go to school",
    "少": "few; little",
    "谁": "who",
    "生病": "to get sick",
    "什么": "what",
    "十": "ten",
    "事": "matter; thing",
    "是": "to be",
    "时候": "time; moment",
    "时间": "time",
    "手机": "mobile phone",
    "书": "book",
    "书店": "bookstore",
    "睡": "to sleep",
    "水": "water",
    "水果": "fruit",
    "睡觉": "to sleep",
    "说": "to say; to speak",
    "说话": "to speak; to talk",
    "四": "four",
    "岁": "years old (age)",
    "他": "he; him",
    "它": "it",
    "她": "she; her",
    "太": "too (much)",
    "他们": "they; them (male)",
    "它们": "they; them (things; animals)",
    "她们": "they; them (female)",
    "天": "day; sky",
    "天气": "weather",
    "听": "to listen",
    "听见": "to hear",
    "同学": "classmate",
    "外": "outside",
    "外边": "outside",
    "玩": "to play; to have fun",
    "晚": "late",
    "晚饭": "dinner",
    "晚上": "evening",
    "喂1": "hello; hey! (interjection)",
    "问": "to ask",
    "问题": "problem",
    "我": "I; me",
    "我们": "we; us",
    "五": "five",
    "午饭": "lunch",
    "下": "below; down",
    "下雨": "to rain",
    "下班": "to finish work",
    "下课": "to finish class",
    "想": "to want; to think",
    "先生": "Mr.; sir",
    "现在": "now",
    "小": "small",
    "小朋友": "little friend; child",
    "小时": "hour (duration)",
    "小学": "primary school",
    "小学生": "primary school student",
    "下午": "afternoon",
    "写": "to write",
    "些": "some (classifier)",
    "谢谢": "thank you",
    "喜欢": "to like",
    "新": "new",
    "星期": "week",
    "星期日": "Sunday",
    "星期天": "Sunday",
    "休息": "to rest",
    "学": "to study",
    "雪": "snow",
    "学生": "student",
    "学习": "to study; to learn",
    "学校": "school",
    "要": "to want; must",
    "也": "also",
    "一": "one",
    "一半": "half",
    "一点儿": "a little",
    "衣服": "clothes",
    "医生": "doctor",
    "一下": "a bit (brief action)",
    "一些": "some; a few",
    "医院": "hospital",
    "椅子": "chair",
    "有": "to have; there is",
    "有的": "some",
    "有些": "some; certain",
    "有（一）点儿": "a little (negative sense)",
    "雨": "rain",
    "元": "yuan",
    "月": "month",
    "再": "again; once more",
    "在": "to be at; (progressive marker)",
    "再见": "goodbye",
    "早": "early",
    "早饭": "breakfast",
    "早上": "morning",
    "怎么": "how",
    "怎么样": "how about; how is it",
    "找": "to look for",
    "这": "this",
    "这边": "this way; over here",
    "这个": "this one",
    "这里": "here",
    "真": "true; really",
    "正在": "in the process of; -ing",
    "这儿": "here",
    "这些": "these",
    "只": "classifier (animals; one of a pair...)",
    "知道": "to know",
    "中国": "China",
    "中文": "Chinese (language)",
    "中午": "noon",
    "中学": "middle school; high school",
    "中学生": "middle school student",
    "住": "to live; to stay",
    "桌子": "table",
    "字": "character; word",
    "坐": "to sit; to take (transport)",
    "做": "to do; to make",
    "做饭": "to cook",
    "昨天": "yesterday",
}

# ─── Example sentence French → English translations ───
# This maps each French sentence translation to its English equivalent.
# Organized by entry (simplified character) for maintainability.
EXAMPLE_MAP = {
    # 爱
    "Je t'aime": "I love you",
    "J'adore la cuisine chinoise": "I love Chinese food",
    "Maman nous aime beaucoup": "Mom loves us a lot",
    "J'aime ma famille": "I love my family",
    "Il adore étudier": "He loves to study",
    # 吧
    "Allons-y": "Let's go",
    "D'accord": "OK",
    "Ouais": "Yeah",
    "Allez, arrêtez-vous.": "Come on, stop it.",
    # 八
    "huit personnes": "eight people",
    "huit heures": "eight o'clock",
    "quatre-vingts": "eighty",
    "huit jours": "the eighth",
    "août": "August",
    # 爸爸
    "Mon père est professeur": "My dad is a teacher",
    "Papa, te voilà de retour !": "Dad, you're back!",
    "Papa va au travail en voiture chaque jour": "Dad drives to work every day",
    "La cuisine de papa est délicieuse": "Dad's cooking is delicious",
    "Mon père me manque": "I miss my dad",
    # 百
    "cent yuans": "one hundred yuan",
    "Plus de deux cents personnes sont venues": "More than two hundred people came",
    "Ce vêtement coûte trois cents yuans": "This garment costs three hundred yuan",
    "J'ai couru cinq cents mètres": "I ran five hundred meters",
    "Plusieurs centaines d'années d'histoire": "Several hundred years of history",
    # 白天
    "Il fait chaud pendant la journée": "It's hot during the day",
    "Je travaille pendant la journée": "I work during the day",
    "Il est au bureau pendant la journée": "He's at the office during the day",
    # 半
    "Attends-moi une demi-heure": "Wait for me half an hour",
    "J'ai mangé une moitié de pastèque": "I ate half a watermelon",
    "Une heure et demie": "An hour and a half",
    "Il est trois heures et demie": "It's half past three",
    "J'ai été réveillé en pleine nuit": "I was woken up in the middle of the night",
    # 包子
    "Manger des bao zi": "To eat baozi",
    "pains à la viande": "meat buns",
    "Le matin, j' mange des baozi.": "In the morning, I eat baozi.",
    "Quel type de baozi : aux légumes ou à la viande ?": "What kind of baozi: vegetable or meat?",
    "Les baozi sont très abordables.": "Baozi are very affordable.",
    # 杯子
    "Ton verre est sur la table": "Your glass is on the table",
    "Ce verre est le mien": "This glass is mine",
    "Il reste de l'eau dans le verre ?": "Is there still water in the glass?",
    "Attention, le verre est brûlant": "Careful, the glass is burning hot",
    "J'ai cassé un verre": "I broke a glass",
    # 本1
    "Ce livre est super": "This book is great",
    "J'ai acheté trois magazines": "I bought three magazines",
    "Où est ton cahier ?": "Where is your notebook?",
    "Ce manuel est trop cher": "This textbook is too expensive",
    "Un dictionnaire": "A dictionary",
    # 边
    "De ce côté": "On this side",
    "Il y a des arbres au bord de la route": "There are trees by the roadside",
    "Le bord de la rivière est beau": "The riverside is beautiful",
    # 病
    "Il est malade, il ne vient pas travailler": "He's sick, he's not coming to work",
    "Tu es guéri ?": "Are you better?",
    "Elle est malade et hospitalisée": "She's sick and hospitalized",
    "J'ai un rhume, je suis très malade": "I have a cold, I'm very sick",
    "Bois plus d'eau, tu guériras vite": "Drink more water, you'll recover quickly",
    # 不
    "Ce n'est pas vrai.": "That's not true.",
    "Je ne vais pas y aller.": "I'm not going.",
    "Il ne aime pas le café": "He doesn't like coffee",
    "Il n'est pas froid aujourd'hui.": "It's not cold today.",
    "Je ne sais pas.": "I don't know.",
    # 不客气
    "De rien !": "You're welcome!",
    "De rien, c'est normal": "You're welcome, it's nothing",
    "T'es trop poli, fallait rien apporter": "You're too polite, you didn't need to bring anything",
    "Fais pas de manières, mange encore": "Don't be shy, eat more",
    "Fais comme chez toi, assieds-toi où tu veux": "Make yourself at home, sit wherever you like",
    # 不要
    "Ne pars pas": "Don't leave",
    "Ne parle pas": "Don't talk",
    "Ne fumez pas ici s'il vous plaît": "Please don't smoke here",
    # 菜
    "La cuisine chinoise": "Chinese food",
    "Commander l'entrée": "To order a dish",
    "Ce plat est très bon.": "This dish is very good.",
    "Acheter des légumes": "To buy vegetables",
    "Quelle cuisine faire aujourd'hui ?": "What shall we cook today?",
    # 茶
    "Bois du thé": "Drink tea",
    "J'aime le thé": "I like tea",
    "Donne-moi un verre de thé": "Give me a cup of tea",
    "Quel thé bois-tu ?": "What tea do you drink?",
    "Le thé chinois est très réputé": "Chinese tea is very famous",
    # 唱
    "Elle chante très bien": "She sings very well",
    "Tu sais chanter en chinois ?": "Can you sing in Chinese?",
    "Chantons ensemble !": "Let's sing together!",
    "Il a chanté 3h au karaoké": "He sang for 3 hours at karaoke",
    "Arrête de chanter, il est trop tard": "Stop singing, it's too late",
    # 超市
    "Aller au supermarché": "To go to the supermarket",
    "Acheter des articles au supermarché": "To buy things at the supermarket",
    "Où est le supermarché ?": "Where is the supermarket?",
    "Ce supermarché est très grand.": "This supermarket is very big.",
    "Quelle heure ferme le supermarché ?": "What time does the supermarket close?",
    # 车
    "Je prends la voiture pour aller au travail": "I take the car to go to work",
    "Tu sais conduire ?": "Can you drive?",
    "La voiture devant est trop lente": "The car ahead is too slow",
    "On est arrivés, descendons": "We've arrived, let's get off",
    "Où est le parking ?": "Where is the parking lot?",
    # 吃
    "Je mange": "I eat",
    "Que mangez-vous ?": "What are you eating?",
    "Je veux manger de la cuisine chinoise": "I want to eat Chinese food",
    "Avez-vous déjà mangé du canard de Pékin ?": "Have you ever eaten Peking duck?",
    "Je n'aime pas trop les aliments épicés": "I don't really like spicy food",
    # 穿
    "Se vêtir": "To get dressed",
    "Quoi porter aujourd'hui ?": "What to wear today?",
    "Elle est très bien habillée.": "She is very well dressed.",
    "Porte des chaussures.": "Put on shoes.",
    "Il fait froid, porte plus.": "It's cold, wear more.",
    # 出租车
    "Prendre un taxi": "To take a taxi",
    "Appeler un taxi": "To call a taxi",
    "Où est le taxi ?": "Where is the taxi?",
    "Le taxi est cher": "The taxi is expensive",
    # 大
    "C'est grand": "It's big",
    "C'est trop grand": "It's too big",
    "Combien d'années as-tu ?": "How old are you?",
    "Beijing est grand": "Beijing is big",
    "Mon frère a trois ans de plus que moi": "My brother is three years older than me",
    # 打电话
    "Je t'appelle": "I'll call you",
    "Maman m'a téléphoné": "Mom called me",
    "Tu peux l'appeler ?": "Can you call him?",
    "Je suis en réunion, je ne peux pas téléphoner": "I'm in a meeting, I can't make a call",
    "Attends, je finis mon appel": "Wait, I'm finishing my call",
    # 大家
    "Bonjour à tous, je m'appelle Xiaoming": "Hello everyone, my name is Xiaoming",
    "Tout le monde est prêt ?": "Is everyone ready?",
    "Allons tous manger ensemble": "Let's all eat together",
    "Attention tout le monde !": "Attention everyone!",
    "Bon travail à tous": "Good job everyone",
    # 到
    "Arrivé": "Arrived",
    "À Beijing": "To Beijing",
    "De la maison à l'école": "From home to school",
    "À la maison": "At home",
    "À l'heure": "When the time comes",
    # 大学
    "Tu es dans quelle université ?": "Which university are you at?",
    "J'entre à l'université l'année prochaine": "I'm entering university next year",
    "L'université de Pékin est très réputée": "Peking University is very famous",
    "La vie universitaire est super": "University life is great",
    "Il a obtenu son diplôme universitaire": "He graduated from university",
    # 大学生
    "Je suis étudiant": "I'm a college student",
    "Les étudiants sont en vacances d'été": "The students are on summer vacation",
    "Beaucoup d'étudiants font des petits boulots": "Many students have part-time jobs",
    "C'est un étudiant de l'université de Pékin": "He's a student at Peking University",
    "La pression des étudiants est forte": "The pressure on students is high",
    # 的
    "Mes livres": "My books",
    "Des aliments délicieux": "Delicious food",
    "Un pomme rouge": "A red apple",
    "C'est ce que j'ai acheté": "This is what I bought",
    "Le nouveau professeur": "The new teacher",
    # 第
    "C'est ma première fois en Chine": "It's my first time in China",
    "Il a eu la deuxième place à l'examen": "He got second place on the exam",
    "Tournez à gauche au troisième carrefour": "Turn left at the third intersection",
    "Tu habites à quel étage ?": "What floor do you live on?",
    "C'est la première fois que je mange des raviolis": "It's the first time I eat dumplings",
    # 店
    "Les trucs dans cette boutique sont pas chers": "The stuff in this shop is cheap",
    "Un nouveau magasin vient d'ouvrir dans le coin": "A new shop just opened nearby",
    "Ce magasin ferme à quelle heure ?": "What time does this shop close?",
    "Je fais souvent mes courses là-bas": "I often shop there",
    "Le patron de ce magasin est sympa": "The owner of this shop is nice",
    # 点1
    "Il est quelle heure ?": "What time is it?",
    "Je suis un peu fatigué": "I'm a little tired",
    "Le cours commence à 8h30": "Class starts at 8:30",
    "Commandons": "Let's order",
    "Un peu moins cher ?": "A little cheaper?",
    # 电话
    "C'est quoi ton numéro ?": "What's your number?",
    "Le téléphone sonne, réponds vite !": "The phone is ringing, answer quickly!",
    "Pourquoi tu réponds pas quand je t'appelle ?": "Why don't you answer when I call you?",
    "Le téléphone du bureau est en panne": "The office phone is broken",
    "Il est au téléphone": "He's on the phone",
    # 电脑
    "Utiliser un ordinateur": "To use a computer",
    "Mon ordinateur": "My computer",
    "Mon ordinateur est en panne": "My computer is broken",
    "Acheter un ordinateur": "To buy a computer",
    "Ordinateur portable": "Laptop",
    # 电视
    "Regarder la télévision": "To watch television",
    "Programme de télévision": "Television program",
    "Allumer la télévision": "To turn on the television",
    "Éteins la télé": "Turn off the TV",
    "Série télévisée": "TV series",
    # 电影
    "Regarder un film": "To watch a movie",
    "J'aime regarder des films.": "I like to watch movies.",
    "Cinéma": "Cinema",
    "Ce film est très beau": "This movie is very good",
    "Aller au cinéma": "To go to the cinema",
    # 电影院
    "Aller au cinéma": "To go to the cinema",
    "Regarder un film au cinéma": "To watch a movie at the cinema",
    "Où se trouve le cinéma ?": "Where is the cinema?",
    "Allons au cinéma": "Let's go to the cinema",
    "Le cinéma est grand": "The cinema is big",
    # 弟弟
    "Mon petit frère a quinze ans cette année": "My younger brother is fifteen this year",
    "Mon frère a trois ans de moins que moi": "My brother is three years younger than me",
    "Mon frère est au collège": "My brother is in middle school",
    "Mon frère et moi on se ressemble beaucoup": "My brother and I look a lot alike",
    "Petit frère, viens manger !": "Little brother, come eat!",
    # 东西
    "Je vais au supermarché faire des courses": "I'm going to the supermarket to shop",
    "Combien coûtent ces articles ?": "How much do these items cost?",
    "N'oublie pas tes affaires": "Don't forget your stuff",
    "Il y a trop de choses, je ne peux pas tout porter": "There are too many things, I can't carry them all",
    "À qui est cet objet ?": "Whose object is this?",
    # 都
    "Nous sommes tous chinois": "We are all Chinese",
    "Tout le monde aime la fondue": "Everyone loves hot pot",
    "Je ne sais rien du tout": "I don't know anything at all",
    "On ne le trouve nulle part": "He can't be found anywhere",
    "Il est occupé chaque jour": "He is busy every day",
    # 读
    "Lire des livres": "To read books",
    "Lisez s'il vous plaît": "Please read",
    "Je lis le chinois tous les jours.": "I read Chinese every day.",
    "Comment se prononce ce caractère ?": "How do you pronounce this character?",
    "Avez-vous lu ce livre ?": "Have you read this book?",
    # 对
    "Oui.": "Yes.",
    "Non.": "No.",
    "Vous avez raison.": "You are right.",
    "Désolé.": "Sorry.",
    "C'est gentil pour moi.": "It's kind to me.",
    # 对不起
    "Désolé, je suis en retard": "Sorry, I'm late",
    "Désolé, je ne comprends pas": "Sorry, I don't understand",
    "Je suis vraiment désolé": "I'm really sorry",
    "Pardon, je me suis trompé de chemin": "Sorry, I took the wrong way",
    "Pardon, pouvez-vous répéter ?": "Sorry, could you repeat that?",
    # 多
    "Beaucoup": "A lot",
    "Combien c'est ?": "How much is it?",
    "Il y a beaucoup de monde": "There are a lot of people",
    "Combien de livres as-tu ?": "How many books do you have?",
    "Mange un peu plus": "Eat a little more",
    # 多少
    "Ça coûte combien ?": "How much does it cost?",
    "Il y a combien d'élèves dans ta classe ?": "How many students are in your class?",
    "C'est quoi ton numéro de téléphone ?": "What's your phone number?",
    "Combien de km d'ici à l'école ?": "How many km from here to school?",
    "Tu as appris combien de caractères ?": "How many characters have you learned?",
    # 读书
    "J'aime lire à la maison": "I like reading at home",
    "Il est en train de lire à la bibliothèque": "He's reading at the library",
    "Quand j'étais petit je n'aimais pas lire": "When I was little I didn't like reading",
    "La lecture apprend beaucoup de choses": "Reading teaches you a lot of things",
    "Tu lis quoi en ce moment ?": "What are you reading right now?",
    # 二
    "février": "February",
    "deuxième": "second",
    "mardi": "Tuesday",
    "vingt": "twenty",
    "deux": "two",
    # 儿子
    "Mon fils": "My son",
    "Son fils": "His son",
    "Mon fils est très intelligent": "My son is very smart",
    "Le grand fils": "The eldest son",
    "Le petit fils": "The youngest son",
    # 饭
    "T'as mangé ? (salutation courante)": "Have you eaten? (common greeting)",
    "Qui fait la cuisine aujourd'hui ?": "Who's cooking today?",
    "Au petit-déj' j'ai mangé du pain": "For breakfast I had bread",
    "C'est prêt, viens manger": "It's ready, come eat",
    "On mange quoi ce midi ?": "What are we eating for lunch?",
    # 饭店
    "Allons au resto aujourd'hui": "Let's go to the restaurant today",
    "La cuisine de ce restaurant est très bonne": "The food at this restaurant is very good",
    "Il y a un restaurant dans le coin ?": "Is there a restaurant nearby?",
    "Il y a beaucoup de monde au restaurant": "There are a lot of people at the restaurant",
    "L'hôtel où on loge est très confortable": "The hotel where we're staying is very comfortable",
    # 房间
    "Ma chambre est très petite": "My room is very small",
    "Aidez-moi à nettoyer la chambre": "Help me clean the room",
    "Quel est ton numéro de chambre ?": "What is your room number?",
    "Je voudrais une chambre simple": "I'd like a single room",
    "Il y a la climatisation dans la chambre ?": "Is there air conditioning in the room?",
    # 非常
    "Il fait vraiment beau aujourd'hui": "It's really nice weather today",
    "Merci beaucoup pour ton aide": "Thank you very much for your help",
    "Ce film est vraiment super": "This movie is really great",
    "Il adore la culture chinoise": "He loves Chinese culture",
    "Cet endroit est magnifique": "This place is magnificent",
    # 飞机
    "Prendre l'avion": "To take a plane",
    "Billet d'avion": "Plane ticket",
    "Prendre l'avion pour Shanghai": "To fly to Shanghai",
    "L'avion décolle à quelle heure ?": "What time does the plane take off?",
    "aéroport": "airport",
    # 分
    "Le cours commence dans cinq minutes": "Class starts in five minutes",
    "Je suis extrêmement content": "I'm extremely happy",
    "Attendez-moi quelques minutes": "Wait for me a few minutes",
    "Trois heures quinze": "Three fifteen",
    "Chaque minute compte": "Every minute counts",
    # 分钟
    "dix minutes": "ten minutes",
    "cinq minutes": "five minutes",
    "attends-moi cinq minutes": "wait for me five minutes",
    "il reste dix minutes": "ten minutes left",
    "on est à cinq minutes": "we're five minutes away",
    # 高兴
    "Je suis ravi": "I'm delighted",
    "C'est agréable de vous connaître": "Nice to meet you",
    "Il est content aujourd'hui": "He's happy today",
    "J'ai appris la nouvelle avec joie": "I was happy to hear the news",
    "Joyeux anniversaire": "Happy birthday",
    # 个
    "Je veux une pomme": "I want an apple",
    "Tu as combien d'enfants ?": "How many children do you have?",
    "Tout le monde doit venir": "Everyone has to come",
    "Celui-là n'est pas le mien": "That one is not mine",
    # 歌
    "Cette chanson est trop belle !": "This song is so beautiful!",
    "Tu connais des chansons chinoises ?": "Do you know any Chinese songs?",
    "C'est quoi ma chanson préférée ?": "What's my favorite song?",
    "Il a écrit une nouvelle chanson": "He wrote a new song",
    "Comment s'appelle cette chanson ?": "What's this song called?",
    # 哥哥
    "Mon grand frère": "My older brother",
    "Le frère aîné est très grand": "The older brother is very tall",
    "Grand frère": "Big brother",
    "Le frère aîné est plus âgé que moi.": "The older brother is older than me.",
    "Appelez le frère aîné": "Call the older brother",
    # 给
    "Tiens, prends": "Here, take it",
    "Donne-moi un verre d'eau": "Give me a glass of water",
    "C'est un cadeau pour toi": "It's a gift for you",
    "Maman me prépare à manger": "Mom makes food for me",
    # 公司
    "aller au bureau": "to go to the office",
    "travailler au bureau": "to work at the office",
    "notre entreprise est très grande": "our company is very big",
    "où se trouve l'entreprise ?": "where is the company?",
    "quelle entreprise ?": "which company?",
    # 工作
    "Je travaille": "I'm working",
    "Où travailles-tu ?": "Where do you work?",
    "Mon travail est très chargé": "My job is very busy",
    "Il travaille huit heures chaque jour": "He works eight hours every day",
    "Il n'est pas facile de trouver un emploi": "It's not easy to find a job",
    # 狗
    "Tu as un chien chez toi ?": "Do you have a dog at home?",
    "Ce chien est vraiment mignon": "This dog is really cute",
    "Mon chien s'appelle Xiaobai": "My dog is called Xiaobai",
    "Allons promener le chien": "Let's walk the dog",
    "Attention, ce chien mord": "Careful, this dog bites",
    # 贵
    "C'est cher": "It's expensive",
    "Trop cher": "Too expensive",
    "Ce n'est pas cher": "It's not expensive",
    "Les maisons à Beijing sont chères": "Houses in Beijing are expensive",
    "Un peu plus cher ne fait rien": "A little more expensive doesn't matter",
    # 国
    "Tu es de quel pays ?": "What country are you from?",
    "La Chine est un grand pays": "China is a big country",
    "J'ai visité beaucoup de pays": "I've visited many countries",
    "C'est un étranger": "He's a foreigner",
    "Tu es rentré au pays ?": "Have you returned to your country?",
    # 还
    "J'ai pas encore mangé": "I haven't eaten yet",
    "Tu en veux encore ?": "Do you want more?",
    "Il dort encore": "He's still sleeping",
    "Il y a encore des questions ?": "Are there still questions?",
    "J'aimerais encore aller en Chine": "I'd like to go to China again",
    # 孩子
    "Tu as combien d'enfants ?": "How many children do you have?",
    "Les enfants jouent dehors": "The children are playing outside",
    "Cet enfant est vraiment malin": "This child is really smart",
    "C'est l'heure pour les enfants de dormir": "It's time for the children to sleep",
    "Ne laisse pas les enfants regarder trop la télé": "Don't let the children watch too much TV",
    # 汉语
    "J'apprends le chinois": "I'm learning Chinese",
    "Tu parles très bien chinois !": "You speak Chinese very well!",
    "L'examen de chinois s'appelle le HSK": "The Chinese exam is called HSK",
    "Plus on étudie le chinois, plus c'est intéressant": "The more you study Chinese, the more interesting it gets",
    "Il nous enseigne le chinois": "He teaches us Chinese",
    # 汉字
    "Comment on écrit ce caractère ?": "How do you write this character?",
    "Je connais deux mille caractères": "I know two thousand characters",
    "Les caractères chinois sont trop durs à écrire": "Chinese characters are too hard to write",
    "Ce caractère veut dire quoi ?": "What does this character mean?",
    "Apprendre cinq caractères par jour": "To learn five characters a day",
    # 号
    "Quelle date ?": "What date?",
    "Quelle date est-ce aujourd'hui ?": "What's today's date?",
    "numéro de téléphone": "phone number",
    # 好
    "C'est très bien": "It's very good",
    "C'est délicieux": "It's delicious",
    "C'est très bon": "It's very good",
    "Comment vas-tu ?": "How are you?",
    "bon ami": "good friend",
    "beau, intéressant": "beautiful, interesting",
    # 好吃
    "Ce plat est trop bon !": "This dish is so good!",
    "Tu trouves ça bon ?": "Do you find it good?",
    "La cuisine de maman est la meilleure": "Mom's cooking is the best",
    "La fondue c'est délicieux, goûte": "Hot pot is delicious, try it",
    "Si c'est pas bon, mange pas": "If it's not good, don't eat it",
    # 好看
    "Beaucoup de beauté": "Very beautiful",
    "Ce film est très beau": "This movie is very good",
    "Tu es très beau aujourd'hui": "You look very nice today",
    "Cette livre est très beau": "This book is very good",
    "Pas beau": "Not good-looking",
    # 好听
    "Cette chanson est magnifique !": "This song is wonderful!",
    "Elle a une très belle voix": "She has a very beautiful voice",
    "Tu trouves ça beau ?": "Do you think it sounds nice?",
    "Ton prénom sonne bien": "Your name sounds nice",
    "Les chansons chinoises sont vraiment belles": "Chinese songs are really beautiful",
    # 好玩儿
    "Shanghai c'est vraiment fun !": "Shanghai is really fun!",
    "Ce jeu est amusant ?": "Is this game fun?",
    "Qu'est-ce qu'il y a de fun ce week-end ?": "What's fun to do this weekend?",
    "La Chine c'est génial, tu devrais y aller": "China is great, you should go",
    "Cet endroit n'est pas du tout amusant": "This place is not fun at all",
    # 和
    "Toi et moi": "You and me",
    "Café et thé": "Coffee and tea",
    "Je vais voir un film avec un ami": "I'm going to see a movie with a friend",
    # 喝
    "Je bois de l'eau": "I drink water",
    "Je bois du thé": "I drink tea",
    "Que voulez-vous boire ?": "What would you like to drink?",
    "Je bois du café chaque matin": "I drink coffee every morning",
    "Boire trop est nocif pour le corps": "Drinking too much is bad for your health",
    # 很
    "Il fait très beau aujourd'hui": "The weather is very nice today",
    "Ce plat est très bon": "This dish is very good",
    "Je suis très occupé ces temps-ci": "I've been very busy lately",
    "Il est grand et beau": "He is tall and handsome",
    "Le chinois est difficile mais intéressant": "Chinese is difficult but interesting",
    # 后
    "derrière": "behind",
    "à derrière": "in the back",
    "marchez vers l'arrière": "walk backward",
    "dorénavant": "from now on",
    "après-demain": "the day after tomorrow",
    # 回
    "Je vais rentrer à la maison": "I'm going home",
    "Tu reviens quand ?": "When are you coming back?",
    "Il est retourné en Chine": "He went back to China",
    "Fais attention sur le chemin du retour": "Be careful on the way back",
    "Papa est rentré !": "Dad is home!",
    # 会
    "Je sais parler chinois": "I can speak Chinese",
    "Il sait faire de la cuisine chinoise": "He can cook Chinese food",
    # 火车
    "Prendre le train": "To take the train",
    "Billet de train": "Train ticket",
    "Prendre le train pour Beijing": "To take the train to Beijing",
    "Le train part à quelle heure ?": "What time does the train leave?",
    "Train à grande vitesse": "High-speed train",
    # 几
    "combien ?": "how many?",
    "quelle heure est-il ?": "what time is it?",
    "combien y en a-t-il ?": "how many are there?",
    # 家
    "À la maison": "At home",
    "Retourner à la maison": "To go home",
    "Où habites-tu ?": "Where do you live?",
    "Bienvenue chez moi": "Welcome to my home",
    "Mon domicile est proche de l'entreprise": "My home is close to the office",
    # 见
    "À demain !": "See you tomorrow!",
    "Ravi de te voir": "Glad to see you",
    "On se retrouve où ?": "Where shall we meet?",
    "Ça fait longtemps !": "Long time no see!",
    "Je l'ai aperçu": "I spotted him",
    # 件
    "une veste": "a piece of clothing",
    "deux choses": "two things",
    "trois bagages": "three pieces of luggage",
    "cette chose": "this matter",
    # 叫
    "Je m'appelle...": "My name is...",
    "Quel est ton nom ?": "What is your name?",
    "appelle-le": "call him",
    "appelle-un-taxi": "call a taxi",
    "ça s'appelle quoi ?": "what is it called?",
    # 饺子
    "Manger des dumplings": "To eat dumplings",
    "Les dumplings chinois sont très bons": "Chinese dumplings are very good",
    "Je sais faire des dumplings.": "I know how to make dumplings.",
    "Fêter le printemps en mangeant des dumplings": "Celebrating Spring Festival by eating dumplings",
    "Prenez vingt rouleaux de pâtes.": "Give me twenty dumplings.",
    # 家人
    "Ma famille me manque beaucoup": "I miss my family a lot",
    "Au Nouvel An je rentre voir ma famille": "For New Year I go home to see my family",
    "Toute la famille va bien": "The whole family is doing well",
    "Manger avec la famille c'est super": "Eating with family is great",
    "Ta famille est au courant ?": "Does your family know?",
    # 鸡蛋
    "Manger des œufs": "To eat eggs",
    "Je mange des œufs le matin": "I eat eggs in the morning",
    "Achète une livre d'œufs": "Buy a pound of eggs",
    "Œufs durs ou œufs brouillés ?": "Boiled eggs or scrambled eggs?",
    "Je veux deux œufs au plat": "I want two fried eggs",
    # 姐姐
    "Ma sœur": "My older sister",
    "La sœur aînée est très belle.": "The older sister is very beautiful.",
    "Aînée": "Eldest sister",
    "La fille aînée est plus âgée que moi.": "The older sister is older than me.",
    "Appelez sœur.": "Call her sister.",
    # 今年
    "combien d'années as-tu cette année ?": "how old are you this year?",
    "cet été": "this summer",
    "ce sera cet été que je vais en Chine": "I'm going to China this summer",
    # 今天
    "quel jour est-ce aujourd'hui ?": "what day is it today?",
    "il fait très chaud aujourd'hui": "it's very hot today",
    "Quelle est ta journée d'aujourd'hui ?": "What are you doing today?",
    "Aujourd'hui, c'est mon anniversaire": "Today is my birthday",
    "Il fait vraiment beau aujourd'hui": "The weather is really nice today",
    # 九
    "neuf personnes": "nine people",
    "neuf heures": "nine o'clock",
    "quatre-vingt-dix": "ninety",
    "neuf jours": "the ninth",
    "septembre": "September",
    # 觉得
    "Je trouve ça bien": "I think it's good",
    "Qu'en penses-tu ?": "What do you think?",
    "Je trouve que c'est un peu cher": "I think it's a bit expensive",
    "Je me sens fatigué": "I feel tired",
    # 开
    "Ouvrir la porte": "To open the door",
    "Conduire": "To drive",
    "Tenir une réunion": "To hold a meeting",
    "Pouvez-vous conduire ?": "Can you drive?",
    "Nous avons une réunion demain": "We have a meeting tomorrow",
    # 开车
    "Ne regarde pas ton téléphone au volant": "Don't look at your phone while driving",
    "Je te ramène en voiture": "I'll drive you home",
    "Il faut être prudent au volant": "You need to be careful when driving",
    "C'est à deux heures en voiture d'ici": "It's a two-hour drive from here",
    # 看
    "Tu regardes quoi ?": "What are you watching?",
    "Je suis en train de lire": "I'm reading",
    "Allons voir un film ce week-end": "Let's go see a movie this weekend",
    "Regarde ça, c'est intéressant": "Look at this, it's interesting",
    "Tu as l'air fatigué": "You look tired",
    # 看病
    "Aller voir le médecin": "To see a doctor",
    "Je dois aller chez le médecin": "I need to go to the doctor",
    "Il faut prendre rendez-vous pour consulter": "You need to make an appointment to see a doctor",
    # 看见
    "T'as vu mon téléphone ?": "Have you seen my phone?",
    "Je ne l'ai pas vu": "I didn't see him",
    "Tu as vu cette personne ?": "Did you see that person?",
    "Je viens de voir ton camarade": "I just saw your classmate",
    "Tu vois le restaurant devant ?": "Do you see the restaurant ahead?",
    # 课
    "Tu as combien de cours aujourd'hui ?": "How many classes do you have today?",
    "Notre cours commence à 8h": "Our class starts at 8",
    "Le cours d'aujourd'hui était intéressant": "Today's class was interesting",
    "Le cours est fini, allons-y": "Class is over, let's go",
    "J'ai eu un cours de chinois": "I had a Chinese class",
    # 可以
    "Puis-je entrer ?": "May I come in?",
    "On peut prendre des photos ici ?": "Can we take photos here?",
    "Tu peux t'asseoir ici": "You can sit here",
    "Peut-on utiliser des cartes de crédit ?": "Can we use credit cards?",
    # 口
    "une gorgée d'eau": "a sip of water",
    "devant l'entrée": "at the entrance",
    "sortie": "exit",
    # 块
    "cinq yuans": "five yuan",
    "combien de billets ?": "how many yuan?",
    "un gâteau": "a piece of cake",
    "trois yuans et cinq fen": "three yuan and fifty cents",
    "moins deux yuans": "two yuan cheaper",
    # 来
    "Viens ici": "Come here",
    "Il est venu": "He came",
    "Quand viens-tu ?": "When are you coming?",
    "J'ai été en Chine l'an dernier.": "I came to China last year.",
    # 老师
    "Il est professeur": "He is a teacher",
    "Professeur, bonjour": "Hello, teacher",
    "Professeur de chinois": "Chinese teacher",
    "Notre professeur": "Our teacher",
    "Le professeur nous enseigne": "The teacher teaches us",
    # 了
    "j'ai mangé": "I ate",
    "c'est tard": "it's late",
    "j'ai acheté trois livres": "I bought three books",
    "il fait noir": "it's dark",
    "Il est allé à Beijing.": "He went to Beijing.",
    # 冷
    "Très froid": "Very cold",
    "Il fait très froid aujourd'hui": "It's very cold today",
    "Le temps est très froid": "The weather is very cold",
    "Je me sens froid": "I feel cold",
    "Eau froide": "Cold water",
    # 里
    "à l'intérieur": "inside",
    "chez soi": "at home",
    "dans la chambre": "in the room",
    "dans le cœur": "in the heart",
    "dans le sac à dos": "in the backpack",
    # 两
    "Deux personnes": "Two people",
    "J'ai deux livres": "I have two books",
    "J'ai vécu deux ans en Chine": "I lived in China for two years",
    # 零
    "minuit": "midnight",
    "cent et un": "one hundred and one",
    "petit change": "small change",
    # 六
    "six personnes": "six people",
    "six heures": "six o'clock",
    "samedi": "Saturday",
    "soixante": "sixty",
    # 吗
    "Comment ça va ?": "How are you?",
    "C'est le tien ?": "Is it yours?",
    "Aimes-tu la cuisine chinoise ?": "Do you like Chinese food?",
    "Demain, tu as du temps libre ?": "Are you free tomorrow?",
    "Avez-vous déjà été en Chine ?": "Have you been to China?",
    # 卖
    "Vendre des choses": "To sell things",
    "Que vend ce magasin ?": "What does this shop sell?",
    "Il a vendu sa maison": "He sold his house",
    # 买
    "Acheter des choses": "To buy things",
    "Je veux acheter ça.": "I want to buy this.",
    "Où as-tu acheté ?": "Where did you buy it?",
    "Combien coûte cela ? Je veux en acheter deux.": "How much is this? I want to buy two.",
    "Hier, j'ai acheté un nouveau vêtement.": "Yesterday, I bought a new piece of clothing.",
    # 妈妈
    "Maman, je suis rentré !": "Mom, I'm home!",
    "La cuisine de maman est la meilleure": "Mom's cooking is the best",
    "Ma mère est médecin": "My mom is a doctor",
    "Maman, tu me manques": "Mom, I miss you",
    "Maman me dit de dormir tôt": "Mom tells me to go to bed early",
    # 忙
    "Très occupé.": "Very busy.",
    "Je suis très occupé.": "I'm very busy.",
    "Le travail est très occupé.": "Work is very busy.",
    "Tu es occupé ?": "Are you busy?",
    "Occupe-toi ?": "Are you busy?",
    # 猫
    "On a un chat à la maison": "We have a cat at home",
    "Ce chaton est vraiment mignon": "This kitten is really cute",
    "Les chats aiment dormir": "Cats love to sleep",
    "Tu préfères les chats ou les chiens ?": "Do you prefer cats or dogs?",
    "Mon chat ne mange pas de poisson": "My cat doesn't eat fish",
    # 没关系
    "C'est pas grave, t'inquiète pas": "It's OK, don't worry",
    "Pas de souci, ça me dérange pas": "No worries, I don't mind",
    "En retard ? C'est pas grave !": "Late? No problem!",
    "Tu as cassé le verre ? C'est rien": "You broke the glass? It's nothing",
    "C'est rien, fais attention la prochaine fois": "It's nothing, be careful next time",
    # 妹妹
    "Ma sœur": "My younger sister",
    "La sœur est très petite.": "My sister is very young.",
    "Petite sœur": "Little sister",
    "Ma sœur est plus jeune que moi": "My sister is younger than me",
    "Appelez votre sœur": "Call your sister",
    # 没事
    "Ce n'est rien !": "It's nothing!",
    "Tu vas bien ?": "Are you OK?",
    "Pas de problème, je t'aide": "No problem, I'll help you",
    # 没有
    "Je n'ai pas d'argent": "I don't have money",
    "Il n'est pas venu": "He didn't come",
    "Je n'ai pas compris": "I didn't understand",
    # 们
    "nous": "we",
    "vous": "you",
    "eux": "them",
    # 面包
    "Manger du pain": "To eat bread",
    "Manger du pain pour le petit déjeuner": "To eat bread for breakfast",
    "Achetez un pain": "Buy a loaf of bread",
    "pain et lait": "bread and milk",
    "Ce pain est très frais.": "This bread is very fresh.",
    # 面条儿
    "Manger des nouilles": "To eat noodles",
    "Un bol de nouilles": "A bowl of noodles",
    "Faire cuire les nouilles": "To cook noodles",
    # 米饭
    "Je mange du riz": "I eat rice",
    "Veux-tu du riz ?": "Do you want rice?",
    "Une cuillère de riz": "A bowl of rice",
    "Je n'aime pas trop le riz.": "I don't really like rice.",
    "Ce plat se marie bien avec du riz.": "This dish goes well with rice.",
    # 明年
    "L'été prochain": "Next summer",
    "Je vais en Chine l'année prochaine": "I'm going to China next year",
    "À la prochaine": "See you next time",
    # 明天
    "À demain": "See you tomorrow",
    "Demain, je vais à Pékin.": "Tomorrow, I'm going to Beijing.",
    "Demain, tu as du temps ?": "Do you have time tomorrow?",
    "Comment sera le temps demain ?": "What will the weather be like tomorrow?",
    "Je dois me lever tôt demain": "I have to get up early tomorrow",
    # 名字
    "mon nom": "my name",
    "écris-mon-nom": "write my name",
    "le-nom-est-beau": "the name sounds nice",
    "nom-chinois": "Chinese name",
    # 那
    "Qu'est-ce que c'est ?": "What is that?",
    "celui-là": "that one",
    "où": "there",
    "J'aime celui-là": "I like that one",
    "autant de personnes": "so many people",
    # 哪
    "lequel ?": "which one?",
    "où es-tu ?": "where are you?",
    "de quel pays es-tu ?": "what country are you from?",
    "n'importe où": "anywhere",
    # 那边
    "À côté-là": "Over there",
    "Aller de ce côté-ci": "Go over there",
    "celui-là": "that one",
    # 那个
    "celui-ci n'est pas bon": "that one is not good",
    "je veux celui-ci": "I want that one",
    # 哪个
    "Lequel est le tien ?": "Which one is yours?",
    "Lequel veux-tu ?": "Which one do you want?",
    "Quelle couleur est belle ?": "Which color is nice?",
    # 那里
    "là-bas": "over there",
    "y aller": "to go there",
    "d'où": "from there",
    # 哪里
    "où vas-tu ?": "where are you going?",
    "où ?": "where?",
    "là, là": "oh, not at all",
    # 男
    "C'est qui ce garçon ?": "Who is that guy?",
    "Où sont les toilettes pour hommes ?": "Where is the men's restroom?",
    "Il a un garçon et une fille": "He has a boy and a girl",
    "petit ami": "boyfriend",
    "Hommes et femmes sont égaux": "Men and women are equal",
    # 男朋友
    "Mon copain est chinois": "My boyfriend is Chinese",
    "T'as un copain ?": "Do you have a boyfriend?",
    "Elle est partie en voyage avec son copain": "She went on a trip with her boyfriend",
    "Mon copain cuisine très bien": "My boyfriend cooks very well",
    "Ils sont en couple": "They are a couple",
    # 那儿
    "Il y était": "Over there",
    "Y allez-vous": "Go there",
    "Venir d'ici": "From there",
    # 哪儿
    "Où allez-vous ?": "Where are you going?",
    "où habites-tu ?": "where do you live?",
    # 那些
    "Ces personnes": "Those people",
    "Ces choses": "Those things",
    "ces livres": "those books",
    # 哪些
    "qui sont ces personnes ?": "which people?",
    "quelles choses ?": "which things?",
    "tu veux quoi ?": "which ones do you want?",
    # 呢
    "Toi, alors ?": "And you?",
    "Je vais bien, toi ?": "I'm fine, and you?",
    "Il lit un livre.": "He's reading a book.",
    "Où est mon livre ?": "Where is my book?",
    "Il pleut dehors.": "It's raining outside.",
    # 能
    "Je peux y aller": "I can go",
    "Puis-je t'aider ?": "Can you help me?",
    "On ne peut pas fumer ici": "You can't smoke here",
    "Peut-on avoir un prix plus bas ?": "Can it be a little cheaper?",
    "Je ne peux pas venir aujourd'hui": "I can't come today",
    # 你
    "Bonjour": "Hello",
    "Où travailles-tu ?": "Where do you work?",
    "Tu donnes": "Here you go",
    # 你好
    "Comment ça va ?": "How are you?",
    "Salut": "Hi",
    "Bonjour à tous": "Hello everyone",
    # 年
    "Cette année": "This year",
    "L'an prochain": "Next year",
    "L'année dernière": "Last year",
    "Combien d'années as-tu ? Dix-huit ans": "How old are you? Eighteen",
    "Joyeux Nouvel An": "Happy New Year",
    # 你们
    "Vous êtes étudiants ?": "Are you students?",
    "Où allez-vous ?": "Where are you going?",
    "Vous êtes tous présents": "You're all here",
    "C'est pour vous": "It's for you",
    # 您
    "Votre nom est ?": "What is your name?",
    "Merci à vous": "Thank you",
    # 牛奶
    "Boire du lait": "To drink milk",
    "Je bois du lait tous les jours": "I drink milk every day",
    "Veux-tu du lait ou du café ?": "Do you want milk or coffee?",
    "Un litre de lait": "A bottle of milk",
    "Du lait ajouté au café": "Milk added to coffee",
    # 女
    "C'est une fille": "She's a girl",
    "Les filles chantent": "The girls are singing",
    "Ce sont les toilettes pour femmes": "These are the women's restrooms",
    "petite amie": "girlfriend",
    "Hommes et femmes peuvent": "Men and women can",
    # 女儿
    "Ma fille": "My daughter",
    "Sa fille": "Her daughter",
    "Ma fille est très jolie": "My daughter is very pretty",
    "Première fille ainée": "Eldest daughter",
    "petite fille": "youngest daughter",
    # 女朋友
    "Ma copine est française": "My girlfriend is French",
    "T'as une copine ?": "Do you have a girlfriend?",
    "Il veut se trouver une copine chinoise": "He wants to find a Chinese girlfriend",
    "L'anniversaire de ma copine arrive bientôt": "My girlfriend's birthday is coming soon",
    "J'apprends le chinois avec ma copine": "I'm learning Chinese with my girlfriend",
    # 女士
    "Bonjour mesdames": "Hello ladies",
    "Qui est cette dame ?": "Who is this lady?",
    "Les dames d'abord": "Ladies first",
    # 朋友
    "Mon ami": "My friend",
    "Meilleur ami": "Best friend",
    "Faire des amis": "To make friends",
    "Ancien ami": "Old friend",
    "Il est mon copain": "He's my boyfriend",
    # 便宜
    "Très bon marché": "Very cheap",
    "Ce est très bon marché": "This is very cheap",
    "Peux-tu être un peu moins cher ?": "Can it be a little cheaper?",
    "Achète-le en ligne, c'est encore moins cher": "Buy it online, it's even cheaper",
    "Pas cher n'a pas de bonne qualité": "Cheap things aren't good quality",
    # 漂亮
    "Très joli": "Very pretty",
    "Elle est très jolie": "She is very pretty",
    "Cela est très joli": "This is very pretty",
    "Il s'habille très bien": "She dresses very nicely",
    "Il écrit très bien": "He writes very nicely",
    # 苹果
    "Un pomme": "An apple",
    "Je veux acheter de la pomme": "I want to buy apples",
    "La pomme est très sucrée": "The apple is very sweet",
    "J'ai apporté quelques pommes pour toi": "I brought some apples for you",
    "Rouge ou verte, la pomme ?": "Red or green apple?",
    # 七
    "sept personnes": "seven people",
    "sept heures": "seven o'clock",
    "soixante-dix": "seventy",
    "sept jours": "the seventh",
    "juillet": "July",
    # 前
    "Il y a un restaurant devant": "There's a restaurant ahead",
    "Avancez de deux cents mètres": "Walk two hundred meters ahead",
    "Avant j'habitais à Shanghai": "I used to live in Shanghai",
    "Avant-hier je suis allé voir un film": "The day before yesterday I went to see a movie",
    "Passe devant, je te suis": "Go ahead, I'll follow you",
    # 钱
    "J'ai pas pris d'argent": "I didn't bring money",
    "Ne dépense pas trop": "Don't spend too much",
    "L'argent ne suffit pas": "There's not enough money",
    "On peut payer par téléphone ?": "Can we pay by phone?",
    # 千
    "mille yuans": "one thousand",
    "deux mille": "two thousand",
    "trois mille": "three thousand",
    "cinq mille yuans": "five thousand yuan",
    "quelques milliers": "a few thousand",
    # 起床
    "Je me suis levé": "I got up",
    "À quelle heure tu te lèves ?": "What time do you get up?",
    "Aujourd'hui, je me suis levé très tôt.": "Today I got up very early.",
    "Je me lève à 6 heures demain matin.": "I'm getting up at 6 tomorrow morning.",
    "Le week-end, je me réveille généralement à 10 heures.": "On weekends, I usually wake up at 10.",
    # 请
    "Asseyez-vous, s'il vous plaît.": "Please have a seat.",
    "Pouvez-vous me aider ?": "Excuse me? (Can I ask...)",
    "Veuillez entrer": "Please come in",
    "S'il vous plaît, aidez-moi.": "Please help me.",
    "Attendez s'il vous plaît": "Please wait",
    # 请问
    "Pouvez-vous me dire, ... est où ?": "Excuse me, where is...?",
    "Pourriez-vous m'aider": "Could you help me",
    # 去
    "Aller à l'école": "To go to school",
    "Je vais au magasin.": "I'm going to the store.",
    "Demain, je vais à Pékin.": "Tomorrow I'm going to Beijing.",
    # 去年
    "l'an dernier en été": "last summer",
    "l'an dernier, j'ai été en Chine": "last year I went to China",
    "depuis l'an dernier": "since last year",
    # 热
    "Très chaud": "Very hot",
    "il fait très chaud aujourd'hui": "it's very hot today",
    "Le temps est très chaud": "The weather is very hot",
    "Je me sens chaud": "I feel hot",
    "Eau chaude": "Hot water",
    # 人
    "Il y a trop de monde ici": "There are too many people here",
    "C'est quelqu'un de bien": "He's a good person",
    "T'es d'où ?": "Where are you from?",
    "Chacun est différent": "Everyone is different",
    "Quelqu'un te cherche": "Someone is looking for you",
    # 认识
    "Ravi de vous connaître": "Nice to meet you",
    "Nous nous connaissons": "We know each other",
    "Connais-tu cet homme ?": "Do you know him?",
    "Je neconnais pas ce caractère": "I don't know this character",
    "Nous nous sommes rencontrés l'an dernier": "We met last year",
    # 日
    "aujourd'hui": "today",
    "jour de naissance": "birthday",
    "années d'école": "days",
    # 三
    "trois personnes": "three people",
    "trois heures": "three o'clock",
    "mercredi": "Wednesday",
    "trente": "thirty",
    "trois": "three",
    # 上
    "en haut": "on top",
    "Sur le bureau": "On the desk",
    "monter dans": "to get on",
    "aller au travail": "to go to work",
    "aller en classe": "to go to class",
    # 上班
    "Aller au travail": "To go to work",
    "À quelle heure commence le travail ?": "What time does work start?",
    "Je suis au travail": "I'm at work",
    # 商店
    "À la boutique": "To the shop",
    "Cette boutique est vaste": "This shop is very big",
    "Quelle heure est-ce que la boutique ouvre ?": "What time does the shop open?",
    "Y a-t-il une boutique dans les environs ?": "Is there a shop nearby?",
    "Cette boutique vend des marchandises à un prix abordable": "This shop sells things at affordable prices",
    # 上课
    "aller en classe": "to go to class",
    "à quelle heure as-tu cours ?": "what time do you have class?",
    "je suis en cours": "I'm in class",
    # 上午
    "Bonjour le matin": "Good morning",
    "Je cours des cours ce matin": "I have class this morning",
    "Quelle est ta journée d'aujourd'hui le matin ?": "What are you doing this morning?",
    "Chaque matin, je travaille": "Every morning, I work",
    "Rendez-vous à 10 heures du matin": "Let's meet at 10 in the morning",
    # 上学
    "aller à l'école": "to go to school",
    "aller à l'école tous les jours": "to go to school every day",
    "il va à l'école": "he goes to school",
    # 少
    "Peu": "Few",
    "Il y a peu de personnes": "There are few people",
    "Mange un peu moins": "Eat a little less",
    "Je regarde rarement la télévision": "I rarely watch television",
    "Il n'y a pas beaucoup de temps, parle moins": "There's not much time, talk less",
    # 谁
    "Qui est-il ?": "Who is he?",
    "qui est-ce que c'est ?": "whose is it?",
    "Qui cherchez-vous ?": "Who are you looking for?",
    "n'importe qui peut venir": "anyone can come",
    "c'est qui qui a dit ça ?": "who said that?",
    # 生病
    "j'ai la maladie": "I'm sick",
    "Il est malade, il ne peut pas venir": "He's sick, he can't come",
    "Facile à tomber malade": "Easy to get sick",
    # 什么
    "que veux-tu manger ?": "what do you want to eat?",
    "quand ?": "when?",
    "y a-t-il un problème ?": "is there a problem?",
    # 十
    "dix personnes": "ten people",
    "dix heures": "ten o'clock",
    "dix yuans": "ten yuan",
    "le dix": "the tenth",
    "octobre": "October",
    # 事
    "Tu as quelque chose à me dire ?": "Is there something you need?",
    "C'est rien, je demandais juste": "It's nothing, I was just asking",
    "Il a un empêchement, il peut pas venir": "Something came up, he can't come",
    "Cette affaire est très importante": "This matter is very important",
    "Qu'est-ce qui s'est passé ?": "What happened?",
    # 是
    "Je suis étudiant": "I'm a student",
    "il n'est pas professeur": "he's not a teacher",
    "aujourd'hui c'est lundi": "today is Monday",
    "tu me l'as dit": "you told me",
    "Il est étudiant": "He is a student",
    # 时候
    "quand ?": "when?",
    "à l'époque": "at that time",
    "parfois": "sometimes",
    # 时间
    "il y a du temps": "there is time",
    "quelle heure est-il ?": "what time is it?",
    "pas de temps": "no time",
    # 手机
    "Mon téléphone": "My phone",
    "numéro de téléphone": "phone number",
    "Quel est ton numéro de téléphone ?": "What's your phone number?",
    "J'ai oublié mon téléphone": "I forgot my phone",
    "Où est mon téléphone ?": "Where is my phone?",
    # 书
    "Lire des livres": "To read books",
    "un livre": "a book",
    "Acheter des livres": "To buy books",
    "Bibliothèque": "Library",
    # 书店
    "Aller à la librairie": "To go to the bookstore",
    "Où est la librairie ?": "Where is the bookstore?",
    "Y a-t-il une librairie nearby ?": "Is there a bookstore nearby?",
    # 睡
    "Tu as bien dormi hier soir ?": "Did you sleep well last night?",
    "L'enfant s'est déjà endormi": "The child has already fallen asleep",
    "Je n'arrive pas à dormir": "I can't fall asleep",
    "Ne parle pas, il dort": "Don't talk, he's sleeping",
    "Tu dors combien d'heures par jour ?": "How many hours do you sleep per day?",
    # 水
    "Une tasse d'eau": "A glass of water",
    "Je veux une bouteille d'eau": "I want a bottle of water",
    "Bois plus d'eau": "Drink more water",
    "Thermale ou froide ?": "Hot or cold water?",
    # 水果
    "mange des fruits": "eat fruit",
    "Quel fruit préfères-tu ?": "What fruit do you like?",
    "Je mange des fruits tous les jours": "I eat fruit every day",
    "Ce fruit coûte combien le kilo ?": "How much is this fruit per jin?",
    "Les fruits sont chers": "Fruit is expensive",
    # 睡觉
    "Je veux dormir": "I want to sleep",
    "À quelle heure tu dors ?": "What time do you go to sleep?",
    "Hier, j'ai dormi très tard": "Yesterday I went to bed very late",
    "Le soir, je ne peux pas dormir": "At night, I can't sleep",
    "Le week-end, j'aime dormir tard": "On weekends, I like to sleep in",
    # 说
    "Parler": "To speak",
    "Qu'est-ce que tu dis ?": "What are you saying?",
    "Je peux parler un peu de chinois.": "I can speak a little Chinese.",
    "Il parle vite.": "He speaks fast.",
    "Le professeur dit qu'il n'y aura pas de cours demain.": "The teacher says there's no class tomorrow.",
    # 说话
    "On ne peut pas parler en cours": "You can't talk in class",
    "Il parle très vite": "He talks very fast",
    "Tu parles à qui ?": "Who are you talking to?",
    "Parle tout bas, l'enfant dort": "Speak quietly, the child is sleeping",
    "Il parle de manière intéressante": "He speaks in an interesting way",
    # 四
    "quatre personnes": "four people",
    "quatre heures": "four o'clock",
    "jeudi": "Thursday",
    "quarante": "forty",
    "quatre": "four",
    # 岁
    "j'ai-18-ans": "I'm 18 years old",
    "il-a-20-ans": "he's 20 years old",
    "combien-d'années-as-tu ?": "how old are you?",
    "un-an": "one year old",
    # 他
    "Qui est-il ?": "Who is he?",
    "Il est très occupé": "He is very busy",
    "Ils sont des étudiants": "They are students",
    "Il ne aime pas le café": "He doesn't like coffee",
    "Il est plus grand que moi": "He is taller than me",
    # 它
    "Où est-ce ?": "Where is it?",
    "Il est très mignon": "It's very cute",
    # 她
    "Qui est elle ?": "Who is she?",
    "Elle est très jolie": "She is very pretty",
    "Elles sont étudiantes": "They are students",
    "Elle n'aime pas le café": "She doesn't like coffee",
    "Elle est plus grande que moi": "She is taller than me",
    # 太
    "Super, allons-y !": "Great, let's go!",
    "Trop cher, un peu moins ?": "Too expensive, a little less?",
    "Il fait trop chaud, j'ai pas envie de sortir": "It's too hot, I don't feel like going out",
    "T'es trop aimable": "You're too kind",
    "Ce plat est beaucoup trop épicé !": "This dish is way too spicy!",
    # 他们
    "Qui sont eux ?": "Who are they?",
    "Ils sont très occupés": "They are all very busy",
    "Où étaient-ils allés ?": "Where did they go?",
    "C'est à eux": "It's theirs",
    # 它们
    "Ils sont très mignons": "They are very cute",
    "Où sont-ils ?": "Where are they?",
    "Ces livres, je les ai tous lus": "These books, I've read them all",
    # 她们
    "Elles ont toutes": "They all",
    "Demandez-leur": "Ask them",
    # 天
    "temps": "weather",
    "chaque jour": "every day",
    "un jour": "one day",
    "trois jours": "three days",
    # 天气
    "le temps est très bon": "the weather is very good",
    "Quel temps fait-il aujourd'hui ?": "How's the weather today?",
    "prévision météo": "weather forecast",
    "Le temps sera meilleur demain": "The weather will be better tomorrow",
    # 听
    "Écouter de la musique.": "To listen to music.",
    "Je ne comprends pas.": "I don't understand.",
    "Qu'est-ce que tu écoutes ?": "What are you listening to?",
    "J'aime écouter des chansons chinoises.": "I like listening to Chinese songs.",
    "J'ai entendu que tu vas à Shanghai.": "I heard you're going to Shanghai.",
    # 听见
    "T'as entendu ? On frappe à la porte": "Did you hear that? Someone's knocking",
    "C'est trop bruyant, j'ai pas entendu": "It's too noisy, I didn't hear",
    "J'ai entendu quelqu'un m'appeler": "I heard someone calling me",
    "T'as entendu ce qu'il a dit ?": "Did you hear what he said?",
    "Le son est trop faible, on n'entend pas": "The sound is too low, I can't hear",
    # 同学
    "C'est mon camarade de classe": "He's my classmate",
    "Mes camarades de classe": "My classmates",
    "Anciens camarades de classe": "Old classmates",
    "Camarades de l'université": "University classmates",
    "Salut les camarades": "Hi classmates",
    # 外
    "dehors": "outside",
    "étranger": "foreign",
    "à l'étranger": "abroad",
    "étrangère": "foreign language",
    # 外边
    "froid dehors": "cold outside",
    "sortir dehors": "to go outside",
    # 玩
    "jouer": "to play",
    "Sortir pour jouer": "To go out and play",
    "Je veux aller jouer": "I want to go have fun",
    "Où allez-vous jouer ce week-end ?": "Where are you going this weekend?",
    "S'amuser": "To have fun",
    # 晚
    "Très tard": "Very late",
    "soirée": "evening",
    "Dormir très tard": "To sleep very late",
    "Un peu plus tard": "A little later",
    "Souper": "Dinner",
    # 晚饭
    "Dîner": "To have dinner",
    "Qu'est-ce qu'on mange pour le dîner ?": "What are we having for dinner?",
    "Préparer le dîner": "To prepare dinner",
    # 晚上
    "Bonne soirée": "Good evening",
    "À demain": "See you tomorrow",
    "Le soir je suis à la maison": "In the evening I'm at home",
    "Tu as du temps le soir ?": "Are you free in the evening?",
    "Chaque soir, je lis une heure.": "Every evening, I read for an hour.",
    # 喂
    "Allô, bonjour !": "Hello!",
    "Allô, c'est Xiao Wang ?": "Hello, is this Xiao Wang?",
    "Allô, je cherche le professeur Li": "Hello, I'm looking for Teacher Li",
    # 问
    "Poser une question": "To ask a question",
    "J'ai envie de te poser une question": "I want to ask you a question",
    "Demander l'adresse": "To ask for directions",
    "Pouvez-vous me dire où se trouve les toilettes ?": "Excuse me, where is the restroom?",
    "Demandez-moi si vous avez des problèmes": "Ask me if you have any questions",
    # 问题
    "il y a des problèmes": "there are problems",
    "résoudre un problème": "to solve a problem",
    "le problème est grave": "the problem is serious",
    # 我
    "Je suis heureux": "I'm happy",
    "C'est moi qui l'ai fait": "I did it myself",
    # 我们
    "Nous sommes amis": "We are friends",
    "Allons-y ensemble": "Let's go together",
    "Nous aimons tous la cuisine chinoise": "We all like Chinese food",
    "Nous nous verrons demain": "We'll see each other tomorrow",
    "C'est notre salle de classe": "This is our classroom",
    # 五
    "cinq personnes": "five people",
    "cinq heures": "five o'clock",
    "vendredi": "Friday",
    "cinquante": "fifty",
    "cinq heures": "five o'clock",
    # 午饭
    "déjeuner": "to have lunch",
    "à quoi manger pour le déjeuner ?": "what to eat for lunch?",
    "heure du déjeuner": "lunchtime",
    # 下
    "en bas": "below",
    "sous la table": "under the table",
    "descendre": "to get off",
    "rentrer du travail": "to finish work",
    "sortir de classe": "to get out of class",
    # 下雨
    "il pleut": "it's raining",
    "Il pleut aujourd'hui": "It's raining today",
    "Il va pleuvoir": "It's going to rain",
    "il pleut fort": "it's raining hard",
    "pleuvra-t-il demain ?": "will it rain tomorrow?",
    # 下班
    "À quelle heure pars-tu du travail ?": "What time do you finish work?",
    "Il est temps de partir travailler": "Time to leave work",
    "Après le travail": "After work",
    # 下课
    "à quelle heure la classe est-elle terminée ?": "what time does class end?",
    "la classe est finie": "class is over",
    "après la classe": "after class",
    # 想
    "Je veux y aller.": "I want to go.",
    "J'aimerais apprendre le chinois.": "I'd like to learn Chinese.",
    "Je pense à ma mère.": "I miss my mom.",
    "Je ne veux pas y aller.": "I don't want to go.",
    # 先生
    "Monsieur Wang": "Mr. Wang",
    "bonjour monsieur": "hello sir",
    "ce monsieur": "this gentleman",
    # 现在
    "je suis très occupé maintenant": "I'm very busy right now",
    "où es-tu maintenant ?": "where are you now?",
    "je suis en train d'étudier maintenant": "I'm studying right now",
    "commençons à présent": "let's start now",
    # 小
    "C'est petit": "It's small",
    "Chien de compagnie": "Puppy",
    "Ce chambre est trop petite": "This room is too small",
    "Mon frère est petit": "My brother is small",
    "Depuis jeune, j'aime la musique": "Since I was young, I've loved music",
    # 小朋友
    "Les enfants": "The children",
    "Bonjour les enfants": "Hello children",
    "Ce petit enfant": "That little child",
    # 小时
    "une heure": "one hour",
    "deux heures": "two hours",
    "moitié d'heure": "half an hour",
    "combien d'heures ?": "how many hours?",
    "j'ai appris pendant trois heures": "I studied for three hours",
    # 小学
    "aller à l'école primaire": "to go to primary school",
    "Élève élémentaire": "Primary school student",
    "ma école primaire": "my primary school",
    # 小学生
    "je suis élève elementary": "I'm a primary school student",
    "de nombreux élèves elementary": "many primary school students",
    "la vie des élèves elementary": "the life of primary school students",
    # 下午
    "Bon après-midi": "Good afternoon",
    "Je vais au magasin cet après-midi": "I'm going to the store this afternoon",
    "Il y a une réunion cet après-midi": "There's a meeting this afternoon",
    "J'ai rendez-vous à 3 heures de l'après-midi": "I have an appointment at 3 PM",
    "Chaque après-midi, je me repose": "Every afternoon, I rest",
    # 写
    "Écrire.": "To write.",
    "Je fais mes devoirs.": "I'm doing my homework.",
    "Tu peux écrire des caractères chinois ?": "Can you write Chinese characters?",
    "Veuillez écrire votre nom": "Please write your name",
    "J'ai écrit une lettre à ma mère": "I wrote a letter to my mom",
    # 些
    "Un peu": "Some",
    "Ces derniers": "These",
    "Ceux-là": "Those",
    # 谢谢
    "Merci de m'avoir aidé": "Thank you for helping me",
    "Merci, c'est super !": "Thanks, that's great!",
    "Merci pour ton cadeau": "Thank you for your gift",
    "Merci patron !": "Thanks boss!",
    "Merci de m'avoir invité à manger": "Thank you for treating me to dinner",
    # 喜欢
    "Je t'aime": "I like you",
    "Qu'aimerais-tu ?": "What do you like?",
    "J'aime regarder des films.": "I like watching movies.",
    "Je ne l'aime pas trop": "I don't really like it",
    "Elle aime le rouge le mieux": "She likes red the most",
    # 新
    "très neuf": "very new",
    "nouveau": "new",
    "acheter de nouveaux vêtements": "to buy new clothes",
    "Nouvel an": "New Year",
    "neuf et frais": "new and fresh",
    # 星期
    "Lundi": "Monday",
    "dimanche": "Sunday",
    "cette semaine": "this week",
    "la semaine prochaine": "next week",
    "la semaine dernière": "last week",
    # 星期日
    "Aujourd'hui c'est dimanche": "Today is Sunday",
    "Je me repose le dimanche": "I rest on Sundays",
    "Les magasins ferment-ils dimanche ?": "Do shops close on Sunday?",
    # 星期天
    "Que fais-tu dimanche ?": "What are you doing on Sunday?",
    "Je vais au parc dimanche": "I'm going to the park on Sunday",
    "Mangeons ensemble dimanche": "Let's eat together on Sunday",
    # 休息
    "s'asseoir et se reposer": "to sit down and rest",
    "Je veux me reposer": "I want to rest",
    "As-tu bien dormi ?": "Did you rest well?",
    # 学
    "J'apprends le chinois": "I'm learning Chinese",
    "Tu apprends depuis combien de temps ?": "How long have you been learning?",
    "T'as appris ? T'y arrives ?": "Have you learned it? Can you do it?",
    "C'est dur à apprendre": "It's hard to learn",
    "Répète après moi !": "Follow me and learn!",
    # 雪
    "Il neige": "It's snowing",
    "La neige est très blanche": "The snow is very white",
    "Il neige souvent à Pékin en hiver": "It often snows in Beijing in winter",
    # 学生
    "Étudiant universitaire": "University student",
    "Étudiant secondaire": "Middle school student",
    # 学习
    "Apprendre le chinois": "To learn Chinese",
    "Je apprends à cuisiner": "I'm learning to cook",
    "Quelle spécialité étudiez-vous ?": "What major are you studying?",
    "Je étudie deux heures par jour.": "I study two hours a day.",
    "Il étudie très dur": "He studies very hard",
    # 学校
    "Aller à l'école": "To go to school",
    "À l'école": "At school",
    "Notre établissement d'enseignement est vaste": "Our school is very big",
    "Dans quel établissement d'enseignement travailles-tu ?": "Which school do you study at?",
    "Il faut environ trente minutes pour se rendre de la maison à l'école": "It takes about thirty minutes from home to school",
    # 要
    "Je veux celui-ci": "I want this one",
    "Qu'est-ce que tu veux ?": "What do you want?",
    "Je vais à Beijing": "I'm going to Beijing",
    "Il va pleuvoir": "It's going to rain",
    "Je ne veux pas": "I don't want it",
    # 也
    "Je aussi": "Me too",
    "Il y va aussi.": "He's going too.",
    "Moi aussi j'aime !": "I like it too!",
    "Lui non plus ne sait pas": "He doesn't know either",
    "Moi non plus je ne suis pas allé en Chine": "I haven't been to China either",
    # 一
    "un homme": "one person",
    "premier": "first",
    "ensemble": "together",
    "un peu": "a little",
    "en...en...": "while...while...",
    # 一半
    "Une moitié du temps": "Half the time",
    "Mangé la moitié": "Ate half",
    "La moitié des personnes": "Half the people",
    # 一点儿
    "un peu d'eau": "a little water",
    "pas du tout": "not at all",
    "un peu plus lentement": "a little slower",
    "un peu mieux": "a little better",
    "un peu plus cher": "a little more expensive",
    # 衣服
    "Acheter des vêtements": "To buy clothes",
    "Laver du linge.": "To do laundry.",
    "Nouvelles tenues": "New clothes",
    "Cette robe est très jolie": "This piece of clothing is very pretty",
    # 医生
    "Voir un médecin": "To see a doctor",
    "Il est médecin": "He's a doctor",
    "Le médecin dit": "The doctor says",
    "Trouver un médecin": "To find a doctor",
    "Meilleur médecin": "Good doctor",
    # 一下
    "regardons un peu": "take a look",
    "Attends un moment.": "Wait a moment.",
    "essayons un peu": "give it a try",
    "demandons un peu": "let me ask",
    "réfléchissons un peu": "let me think",
    # 一些
    "quelques personnes": "some people",
    "quelques problèmes": "some problems",
    "acheter des fruits": "to buy some fruit",
    # 医院
    "Au hôpital": "To the hospital",
    "Je vais au hôpital voir le médecin": "I'm going to the hospital to see a doctor",
    "Où se trouve le hôpital ?": "Where is the hospital?",
    "Il travaille à l'hôpital": "He works at the hospital",
    "Le plus proche hôpital est pas loin d'ici": "The nearest hospital isn't far from here",
    # 椅子
    "s'asseoir sur une chaise": "to sit on a chair",
    "une chaise": "a chair",
    "la chaise est confortable": "the chair is comfortable",
    "votre place, s'il vous plaît": "please sit in this chair",
    "chaise de bureau": "office chair",
    # 有
    "j'ai un ami": "I have a friend",
    "as-tu de l'argent ?": "do you have money?",
    "je n'ai pas de temps": "I don't have time",
    "il y a beaucoup de gens ici": "there are a lot of people here",
    "on a cours demain ?": "do we have class tomorrow?",
    # 有的
    "certains personnes": "some people",
    "certains...certains...": "some...some...",
    "certains sont bons, d'autres pas si bien": "some are good, some are not so good",
    # 有些
    "Certaines personnes": "Some people",
    "Certaines choses sont chères": "Some things are expensive",
    "Certaines questions je ne comprends pas": "Some questions I don't understand",
    # 有一点儿
    "Un peu fatigué": "A little tired",
    "Il fait un peu froid aujourd'hui": "It's a little cold today",
    "Ce plat est un peu épicé": "This dish is a little spicy",
    # 雨
    "la pluie": "rain",
    "une grande pluie": "heavy rain",
    "une petite pluie": "light rain",
    # 元
    "Cinq yuans": "Five yuan",
    "Dix yuans": "Ten yuan",
    "Cent yuans": "One hundred yuan",
    "Combien de dollars ?": "How many yuan?",
    "Trente yens": "Thirty yuan",
    # 月
    "Janvier": "January",
    "Ce mois-ci": "This month",
    "Le mois prochain": "Next month",
    "Le mois dernier": "Last month",
    "Il y a douze mois dans une année": "There are twelve months in a year",
    # 再
    "Pouvez-vous répéter ?": "Could you repeat that?",
    "Reviens la prochaine fois !": "Come back next time!",
    "Laisse-moi encore réfléchir": "Let me think about it some more",
    "Attends encore cinq minutes": "Wait five more minutes",
    "Au revoir !": "Goodbye!",
    # 在
    "je suis à la maison": "I'm at home",
    "je suis en train d'étudier": "I'm studying",
    "le livre est sur le bureau": "the book is on the desk",
    "il est en réunion maintenant": "he's in a meeting now",
    # 再见
    "Au revoir, fais attention sur la route !": "Goodbye, be careful on the road!",
    "J'y vais, au revoir !": "I'm leaving, goodbye!",
    "Au revoir, reviens la prochaine fois": "Goodbye, come back next time",
    "Au revoir professeur !": "Goodbye teacher!",
    "Super journée, au revoir !": "Great day, goodbye!",
    # 早
    "Très tôt": "Very early",
    "Matin": "Morning",
    "Se lever très tôt": "To get up very early",
    "Tôt un peu": "A little earlier",
    "petit-déjeuner": "breakfast",
    # 早饭
    "Manger le petit déjeuner": "To eat breakfast",
    "Qu'est-ce qu'on mange pour le petit déjeuner ?": "What's for breakfast?",
    "Préparer le petit déjeuner": "To prepare breakfast",
    # 早上
    "Bonjour le matin": "Good morning",
    "Je fais de l'exercice le matin": "I exercise in the morning",
    "À six heures du matin chaque jour, je me réveille.": "I wake up at six every morning.",
    "À demain le matin": "See you tomorrow morning",
    "Qu'est-ce que je mange le matin ?": "What should I eat in the morning?",
    # 怎么
    "comment fait-on ?": "how?",
    "comment y aller ?": "how to get there?",
    "comment écrire ce mot ?": "how to write this character?",
    "que se passe-t-il ?": "what's wrong?",
    "pourquoi ainsi ?": "why is it like this?",
    # 怎么样
    "Quel temps fait-il ?": "How's the weather?",
    "Quel goût ?": "How does it taste?",
    "Ça va": "It's fine",
    # 找
    "trouver quelqu'un": "to find someone",
    "Je cherche mon téléphone": "I'm looking for my phone",
    "Chercher un emploi": "To look for a job",
    "Je ne le trouve plus": "I can't find it anymore",
    # 这
    "Ceci": "This",
    "Ici": "Here",
    "Si cher": "So expensive",
    # 这边
    "Viens cette direction": "Come this way",
    "Aller ce côté.": "Go this way.",
    # 这个
    "c'est bien": "this is good",
    # 这里
    "ici": "here",
    "jusqu'ici": "up to here",
    "depuis ici": "from here",
    # 真
    "Vraiment ? J'y crois pas": "Really? I don't believe it",
    "T'es vraiment gentil !": "You're really nice!",
    "Elle est vraiment bien habillée": "She's really well dressed",
    "C'est vraiment délicieux": "It's really delicious",
    "Qu'est-ce qu'il fait froid aujourd'hui": "It's so cold today",
    # 正在
    "Je suis en train de manger": "I'm eating right now",
    "Il est en réunion, attends un peu": "He's in a meeting, wait a moment",
    "Je suis en train de réfléchir à ce problème": "I'm thinking about this problem",
    "Il est en train de pleuvoir dehors": "It's raining outside",
    "Quand tu as appelé j'étais en train de dormir": "When you called I was sleeping",
    # 这儿
    "arriver ici": "to arrive here",
    # 这些
    "ces gens": "these people",
    "ces choses": "these things",
    # 只
    "un chat": "a cat",
    "deux chaussures": "two shoes",
    "trois oiseaux": "three birds",
    # 知道
    "Je sais": "I know",
    "Sais-tu ?": "Do you know?",
    "Je sais son nom": "I know his name",
    "Qui sait ?": "Who knows?",
    # 中国
    "Je veux voyager en Chine": "I want to travel to China",
    "Il y a plein de bonnes choses à manger en Chine": "There's lots of good food in China",
    "Tu es déjà allé en Chine ?": "Have you been to China?",
    "Les Chinois sont très chaleureux": "Chinese people are very warm",
    # 中文
    "Tu parles chinois ?": "Do you speak Chinese?",
    "Mon chinois n'est pas très bon": "My Chinese isn't very good",
    "Il parle mieux chinois que moi": "He speaks Chinese better than me",
    "On peut parler en chinois ?": "Can we speak in Chinese?",
    # 中午
    "Je mange à midi": "I eat at noon",
    "Je repose à midi": "I rest at noon",
    "Il est douze heures à midi": "It's twelve noon",
    "À midi, on se voit": "See you at noon",
    "Qu'est-ce que je mange à midi ?": "What should I eat at noon?",
    # 中学
    "je suis en lycée": "I'm in middle school",
    "mon lycée": "my middle school",
    # 中学生
    "je suis un étudiant en seconde": "I'm a middle school student",
    "de nombreux étudiants en seconde": "many middle school students",
    "la vie des élèves": "the life of students",
    # 住
    "j'habite à Beijing": "I live in Beijing",
    "Loger dans un hôtel": "To stay at a hotel",
    # 桌子
    "Le téléphone est sur la table": "The phone is on the table",
    "Pose les affaires sur la table": "Put the things on the table",
    "Cette table est trop petite": "This table is too small",
    "Ne t'assieds pas sur la table": "Don't sit on the table",
    "Il y a beaucoup de livres sur la table": "There are many books on the table",
    # 字
    "Comment on prononce ce caractère ?": "How do you pronounce this character?",
    "Tes caractères sont bien écrits": "Your characters are well written",
    "Ce caractère veut dire quoi ?": "What does this character mean?",
    "Je ne connais pas ce caractère": "I don't know this character",
    "Aujourd'hui j'ai appris dix nouveaux caractères": "Today I learned ten new characters",
    # 坐
    "prendre le métro": "to take the subway",
    "Je prends le bus pour aller au travail.": "I take the bus to go to work.",
    "Où t'assieds-tu ?": "Where are you sitting?",
    "Prendre l'avion pour Pékin": "To fly to Beijing",
    # 做
    "Qu'est-ce que tu fais ?": "What are you doing?",
    "Quel est ton métier ?": "What is your job?",
    "Je cuisine": "I'm cooking",
    "Qu'est-ce que tu veux faire aujourd'hui ?": "What do you want to do today?",
    "Ce plat est de ma mère.": "This dish was made by my mom.",
    # 做饭
    "Qui fait la cuisine ?": "Who's cooking?",
    "Ma mère cuisine très bien": "My mom cooks very well",
    # 昨天
    "Hier, il faisait très froid": "Yesterday it was very cold",
    "Hier, j'ai vu un film": "Yesterday I watched a movie",
    "Où es-tu allé hier ?": "Where did you go yesterday?",
    "Hier soir, je suis allé au lit tard": "Last night I went to bed late",
    "C'est ce que j'ai acheté hier": "This is what I bought yesterday",
}

# ─── Context-aware overrides for duplicate French sentences ───
# Key: (simplified_char, french_text) → english_text
# These override EXAMPLE_MAP when the same French text has different meanings
# depending on which word entry it belongs to.
CONTEXT_OVERRIDES = {
    ("爱", "Je t'aime"): "I love you",
    ("喜欢", "Je t'aime"): "I like you",
    ("他", "Il ne aime pas le café"): "He doesn't like coffee",
    ("她", "Il ne aime pas le café"): "She doesn't like coffee",  # different pronoun context but same French
    ("到", "À la maison"): "At home",
    ("家", "À la maison"): "At home",
    ("大学生", "Je suis étudiant"): "I'm a college student",
    ("是", "Je suis étudiant"): "I'm a student",
    ("学生", "Je suis étudiant"): "I'm a student",  # same meaning
    ("电影", "J'aime regarder des films."): "I like to watch movies.",
    ("喜欢", "J'aime regarder des films."): "I like watching movies.",
    ("好看", "Ce film est très beau"): "This movie is very good",
    ("电影", "Ce film est très beau"): "This movie is very good",
    ("电影", "Aller au cinéma"): "To go to the cinema",
    ("电影院", "Aller au cinéma"): "To go to the cinema",
    ("读", "Lire des livres"): "To read books",
    ("书", "Lire des livres"): "To read books",
    ("非常", "Il fait vraiment beau aujourd'hui"): "It's really nice weather today",
    ("今天", "Il fait vraiment beau aujourd'hui"): "The weather is really nice today",
    ("孩子", "Tu as combien d'enfants ?"): "How many children do you have?",
    ("个", "Tu as combien d'enfants ?"): "How many children do you have?",
    ("工作", "Où travailles-tu ?"): "Where do you work?",
    ("你", "Où travailles-tu ?"): "Where do you work?",
    ("汉语", "J'apprends le chinois"): "I'm learning Chinese",
    ("学", "J'apprends le chinois"): "I'm learning Chinese",
    ("汉字", "Ce caractère veut dire quoi ?"): "What does this character mean?",
    ("字", "Ce caractère veut dire quoi ?"): "What does this character mean?",
    ("手机", "numéro de téléphone"): "phone number",
    ("号", "numéro de téléphone"): "phone number",
    ("好吃", "La cuisine de maman est la meilleure"): "Mom's cooking is the best",
    ("妈妈", "La cuisine de maman est la meilleure"): "Mom's cooking is the best",
    ("时间", "quelle heure est-il ?"): "what time is it?",
    ("几", "quelle heure est-il ?"): "what time is it?",
    ("姐姐", "Ma sœur"): "My older sister",
    ("妹妹", "Ma sœur"): "My younger sister",
    ("热", "il fait très chaud aujourd'hui"): "it's very hot today",
    ("今天", "il fait très chaud aujourd'hui"): "it's very hot today",
    ("你好", "Comment ça va ?"): "How are you?",
    ("吗", "Comment ça va ?"): "How are you?",
    ("晚上", "À demain"): "See you in the evening",
    ("明天", "À demain"): "See you tomorrow",
    ("明天", "Demain, je vais à Pékin."): "Tomorrow, I'm going to Beijing.",
    ("去", "Demain, je vais à Pékin."): "Tomorrow I'm going to Beijing.",
    ("那边", "celui-là"): "that one over there",
    ("那", "celui-là"): "that one",
    ("那个", "celui-là"): "that one",
    ("你们", "Où allez-vous ?"): "Where are you going?",
    ("哪儿", "Où allez-vous ?"): "Where are you going?",
    ("她", "Elle est très jolie"): "She is very pretty",
    ("漂亮", "Elle est très jolie"): "She is very pretty",
    ("学校", "Aller à l'école"): "To go to school",
    ("去", "Aller à l'école"): "To go to school",
    ("上课", "aller en classe"): "to go to class",
    ("上", "aller en classe"): "to go to class",
    ("上午", "Bonjour le matin"): "Good morning",
    ("早上", "Bonjour le matin"): "Good morning",
    ("他", "Qui est-il ?"): "Who is he?",
    ("谁", "Qui est-il ?"): "Who is he?",
    ("时候", "quand ?"): "when?",
    ("什么", "quand ?"): "when?",
    ("五", "cinq heures"): "five o'clock",
    ("分钟", "cinq heures"): "five o'clock",  # shouldn't appear but safe
    ("要", "Il va pleuvoir"): "It's going to rain",
    ("下雨", "Il va pleuvoir"): "It's going to rain",
}


def translate_tags(tags_str):
    """Translate comma-separated French tags to English."""
    if not tags_str.strip():
        return tags_str
    tags = tags_str.split(",")
    translated = []
    for tag in tags:
        tag = tag.strip()
        if tag in TAG_MAP:
            translated.append(TAG_MAP[tag])
        else:
            translated.append(tag)
            print(f"  WARNING: Unknown tag: '{tag}'", file=sys.stderr)
    return ",".join(translated)


def translate_example_sentence(french_part, simplified=""):
    """Translate the French part of an example sentence."""
    french_part = french_part.strip()
    # Check context-aware overrides first
    if (simplified, french_part) in CONTEXT_OVERRIDES:
        return CONTEXT_OVERRIDES[(simplified, french_part)]
    if french_part in EXAMPLE_MAP:
        return EXAMPLE_MAP[french_part]
    # Try without trailing punctuation variations
    for variant in [french_part.rstrip(".!? "), french_part + ".", french_part + "!"]:
        if (simplified, variant) in CONTEXT_OVERRIDES:
            return CONTEXT_OVERRIDES[(simplified, variant)]
        if variant in EXAMPLE_MAP:
            return EXAMPLE_MAP[variant]
    print(f"  WARNING: Untranslated example: '{french_part}'", file=sys.stderr)
    return french_part


def translate_examples(examples_str, simplified=""):
    """Translate the French parts of all examples in a cell."""
    if not examples_str.strip():
        return examples_str

    examples = examples_str.split("<br>")
    translated_examples = []

    for example in examples:
        if not example.strip():
            translated_examples.append(example)
            continue

        # Split by " - " to get parts: Chinese - Pinyin - French
        parts = example.split(" - ")
        if len(parts) >= 3:
            # The French translation is everything after the second " - "
            french_part = " - ".join(parts[2:])
            english_part = translate_example_sentence(french_part, simplified)
            translated_examples.append(" - ".join(parts[:2]) + " - " + english_part)
        else:
            # No French part, keep as-is
            translated_examples.append(example)

    return "<br>".join(translated_examples)


def translate_meaning(simplified, meaning_str):
    """Translate the meaning column."""
    if simplified in MEANING_MAP:
        return MEANING_MAP[simplified]
    print(f"  WARNING: Untranslated meaning for '{simplified}': '{meaning_str}'", file=sys.stderr)
    return meaning_str


def main():
    print(f"Reading: {INPUT_FILE}")

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()

    output_lines = []
    warnings = 0

    for i, line in enumerate(lines):
        line = line.rstrip("\n")
        if i == 0:
            # Header line
            output_lines.append(line)
            continue

        if not line.strip():
            output_lines.append(line)
            continue

        cols = line.split("\t")
        if len(cols) < 8:
            output_lines.append(line)
            continue

        # cols: ID, HSK_Level, Simplified, Pinyin, Meaning, Examples, Tags, Audio
        simplified = cols[2]  # Column 3 (0-indexed: 2)

        # Translate Meaning (column 5, index 4)
        cols[4] = translate_meaning(simplified, cols[4])

        # Translate Examples (column 6, index 5)
        cols[5] = translate_examples(cols[5], simplified)

        # Translate Tags (column 7, index 6)
        cols[6] = translate_tags(cols[6])

        output_lines.append("\t".join(cols))

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))
        if output_lines:
            f.write("\n")

    print(f"Written: {OUTPUT_FILE}")
    print(f"Translated {len(output_lines) - 1} entries.")


if __name__ == "__main__":
    main()
