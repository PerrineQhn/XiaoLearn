#!/usr/bin/env python3
"""Suggère des flashcards appropriées pour chaque leçon basées sur les fichiers audio HSK disponibles."""

import re
from pathlib import Path
from collections import defaultdict

# Dictionnaire de suggestions basé sur les titres de leçons
LESSON_SUGGESTIONS = {
    # Phrases de base
    'phrases-2-introductions': ['你好', '我', '你', '叫', '名字', '是'],
    'phrases-3-politeness': ['谢谢', '对不起', '请', '不客气', '没关系'],
    'phrases-4-questions': ['什么', '谁', '哪', '怎么', '几', '多少', '吗', '哪儿'],
    'phrases-5-yes-no': ['是', '不是', '对', '好', '可以', '行'],
    'phrases-6-numbers-1-10': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    'phrases-7-time': ['点', '分', '小时', '现在', '今天', '明天', '昨天', '时间'],
    'phrases-8-family': ['爸爸', '妈妈', '哥哥', '姐姐', '弟弟', '妹妹'],
    'phrases-9-food-drinks': ['吃', '喝', '饭', '菜', '茶', '水', '咖啡', '牛奶'],
    'phrases-10-wants-needs': ['想', '要', '需要', '喜欢', '爱'],

    # Grammaire de base
    'grammar-3-questions': ['吗', '呢', '吧'],
    'grammar-8-time-expressions': ['的时候', '以前', '以后', '刚才', '马上'],

    # Vocabulaire
    'vocab-3-weather': ['天气', '晴天', '雨', '雪', '冷', '热', '风', '云'],
    'vocab-4-clothing': ['衣服', '裤子', '裙子', '鞋', '帽子', '外套'],
    'vocab-5-body-parts': ['头', '眼睛', '耳朵', '鼻子', '嘴', '手', '脚'],
    'vocab-6-places': ['学校', '医院', '商店', '家', '公园', '饭店', '机场', '车站'],
    'vocab-7-transport': ['车', '火车', '飞机', '出租车', '自行车', '地铁', '公交车'],
    'vocab-8-food': ['米饭', '面条', '饺子', '包子', '鸡蛋', '肉', '鱼', '蔬菜'],
    'vocab-9-fruits': ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓'],
    'vocab-10-occupations': ['老师', '医生', '学生', '工人', '司机', '经理'],
    'vocab-11-hobbies': ['看书', '听音乐', '运动', '旅游', '看电影', '游泳'],
    'vocab-12-emotions': ['高兴', '难过', '生气', '累', '紧张', '害怕', '开心'],
    'vocab-13-rooms': ['客厅', '卧室', '厨房', '卫生间', '房间', '阳台'],
    'vocab-14-electronics': ['电脑', '手机', '电视', '相机', '电话'],
    'vocab-15-money-shopping': ['钱', '块', '元', '便宜', '贵', '买', '卖'],

    # Conversations
    'convo-1-restaurant': ['菜单', '点菜', '服务员', '好吃', '买单', '结账'],
    'convo-2-shopping': ['买', '多少钱', '便宜', '贵', '这个', '那个'],
    'convo-3-directions': ['在哪儿', '左', '右', '前', '后', '旁边', '对面'],
    'convo-4-making-plans': ['见面', '时间', '地方', '一起', '约'],
    'convo-5-phone-call': ['电话', '打电话', '接电话', '号码', '喂'],
    'convo-6-doctor': ['医生', '病', '疼', '药', '医院'],
    'convo-7-weather-talk': ['天气', '晴', '雨', '冷', '热', '怎么样'],
    'convo-8-complaints': ['问题', '坏了', '不行', '修理', '换'],
    'convo-9-invitations': ['请', '邀请', '参加', '来', '去'],
    'convo-10-opinions': ['觉得', '认为', '同意', '看法', '意见'],

    # Grammaire intermédiaire
    'grammar2-1-aspect-le': ['了', '过', '着'],
    'grammar2-2-duration': ['小时', '天', '年', '月', '星期'],
    'grammar2-3-comparison': ['比', '更', '最', '一样'],
    'grammar2-6-resultative': ['完', '好', '到', '懂', '见'],
    'grammar2-7-conjunctions': ['因为', '所以', '虽然', '但是', '如果', '就'],

    # Nombres
    'numbers-1-large': ['百', '千', '万', '亿'],
    'numbers-2-ordinals': ['第一', '第二', '第三', '第四', '第五'],
    'numbers-3-dates': ['年', '月', '日', '号', '星期'],
    'numbers-4-money-prices': ['块', '元', '毛', '分', '钱'],

    # Caractères
    'chars-1-radicals': ['人', '手', '口', '心', '木', '水', '火', '土'],
    'chars-2-strokes': ['一', '二', '三', '人', '大', '小'],
    'chars-3-pictographs': ['日', '月', '山', '水', '火', '木', '人', '口'],
    'chars-4-compounds': ['明', '好', '看', '想', '听', '说'],
    'chars-5-phonetic': ['妈', '吗', '马', '们', '问', '闻'],
    'chars-6-writing-practice': ['一', '二', '三', '人', '大', '小', '中', '国'],

    # Pinyin
    'pinyin-1-initials': ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l'],
}

def get_available_words():
    """Récupère tous les mots disponibles dans les fichiers audio HSK."""
    audio_dir = Path('public/audio')
    words = set()

    for hsk_dir in audio_dir.glob('hsk*/'):
        for audio_file in hsk_dir.glob('*.wav'):
            # Extraire le mot du nom de fichier (format: hsk1_word.wav)
            filename = audio_file.stem
            if '_' in filename:
                word = filename.split('_', 1)[1]
                words.add(word)

    return words

def main():
    available_words = get_available_words()
    print(f"✅ Mots disponibles dans les fichiers audio: {len(available_words)}\n")

    print("📝 SUGGESTIONS DE FLASHCARDS PAR LEÇON")
    print("="*80)

    for lesson_id, suggested_words in sorted(LESSON_SUGGESTIONS.items()):
        # Vérifier quels mots sont disponibles
        available = [w for w in suggested_words if w in available_words]
        missing = [w for w in suggested_words if w not in available_words]

        print(f"\n{lesson_id}:")
        print(f"  ✅ Disponibles ({len(available)}): {available}")
        if missing:
            print(f"  ❌ Manquants  ({len(missing)}): {missing}")

    print(f"\n{'='*80}")
    print(f"Total de leçons avec suggestions: {len(LESSON_SUGGESTIONS)}")

if __name__ == '__main__':
    main()
