#!/usr/bin/env python3
"""Corrige les leçons avec une approche robuste ligne par ligne."""

from pathlib import Path
import re

# Dictionnaire des flashcards à utiliser
FLASHCARDS = {
    'phrases-2-introductions': "['你好', '我', '你', '叫', '名字', '是']",
    'phrases-3-politeness': "['谢谢', '对不起', '请', '不客气', '没关系', '麻烦']",
    'phrases-4-questions': "['什么', '谁', '哪', '怎么', '几', '多少', '吗', '哪儿']",
    'phrases-5-yes-no': "['是', '不是', '对', '好', '可以', '行']",
    'phrases-6-numbers-1-10': "['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']",
    'phrases-7-time': "['点', '分', '小时', '现在', '今天', '明天', '昨天', '时间']",
    'phrases-8-family': "['爸爸', '妈妈', '哥哥', '姐姐', '弟弟', '妹妹']",
    'phrases-9-food-drinks': "['吃', '喝', '饭', '菜', '茶', '水', '咖啡', '牛奶']",
    'phrases-10-wants-needs': "['想', '要', '需要', '喜欢', '爱', '希望']",
    'grammar-3-questions': "['吗', '呢', '吧', '什么', '谁', '哪']",
    'grammar-8-time-expressions': "['时候', '以前', '以后', '刚才', '马上', '现在']",
    'vocab-3-weather': "['天气', '晴', '雨', '雪', '冷', '热', '风', '云']",
    'vocab-4-clothing': "['衣服', '裤子', '裙子', '鞋', '帽子', '外套']",
    'vocab-5-body-parts': "['头', '眼睛', '耳朵', '鼻子', '嘴', '手', '脚', '腿']",
    'vocab-6-places': "['学校', '医院', '商店', '家', '公园', '饭店', '机场', '车站']",
    'vocab-7-transport': "['车', '火车', '飞机', '出租车', '自行车', '地铁', '公交车', '船']",
    'vocab-8-food': "['米饭', '面条', '饺子', '包子', '鸡蛋', '肉', '鱼', '蔬菜']",
    'vocab-9-fruits': "['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓']",
    'vocab-10-occupations': "['老师', '医生', '学生', '工人', '司机', '经理']",
    'vocab-11-hobbies': "['看书', '听音乐', '运动', '旅游', '看电影', '游泳']",
    'vocab-12-emotions': "['高兴', '难过', '生气', '累', '紧张', '害怕', '开心', '兴奋']",
    'vocab-13-rooms': "['客厅', '卧室', '厨房', '卫生间', '房间', '阳台']",
    'vocab-14-electronics': "['电脑', '手机', '电视', '相机', '电话', '平板']",
    'vocab-15-money-shopping': "['钱', '块', '元', '便宜', '贵', '买', '卖', '价格']",
    'convo-1-restaurant': "['菜单', '服务员', '好吃', '买单', '饭', '菜']",
    'convo-2-shopping': "['买', '便宜', '贵', '钱', '这', '那']",
    'convo-3-directions': "['左', '右', '前', '后', '旁边', '对面']",
    'convo-4-making-plans': "['见面', '时间', '地方', '一起', '约', '安排']",
    'convo-5-phone-call': "['电话', '打电话', '号码', '喂', '找']",
    'convo-6-doctor': "['医生', '病', '疼', '药', '医院', '感冒']",
    'convo-7-weather-talk': "['天气', '晴', '雨', '冷', '热', '怎么样']",
    'convo-8-complaints': "['问题', '不行', '修理', '换', '坏']",
    'convo-9-invitations': "['请', '邀请', '参加', '来', '去', '聚会']",
    'convo-10-opinions': "['觉得', '认为', '同意', '看法', '意见', '想']",
    'grammar2-1-aspect-le': "['了', '过', '着', '正在']",
    'grammar2-2-duration': "['小时', '天', '年', '月', '星期', '分钟']",
    'grammar2-3-comparison': "['比', '更', '最', '一样', '没有']",
    'grammar2-6-resultative': "['完', '好', '到', '懂', '见', '清楚']",
    'grammar2-7-conjunctions': "['因为', '所以', '虽然', '但是', '如果', '就']",
    'numbers-1-large': "['百', '千', '万', '亿', '十', '一']",
    'numbers-2-ordinals': "['第一', '第二', '第三', '第四', '第五', '第六']",
    'numbers-3-dates': "['年', '月', '日', '号', '星期', '今天']",
    'numbers-4-money-prices': "['块', '元', '毛', '分', '钱', '便宜']",
    'chars-1-radicals': "['人', '手', '口', '心', '水', '火', '土', '日']",
    'chars-2-strokes': "['一', '二', '三', '人', '大', '小']",
    'chars-3-pictographs': "['日', '月', '山', '水', '火', '人', '口', '木']",
    'chars-4-compounds': "['好', '看', '想', '听', '说', '明']",
    'chars-5-phonetic': "['妈', '吗', '马', '们', '问', '闻']",
    'chars-6-writing-practice': "['一', '二', '三', '人', '大', '小', '中', '国']",
    'pinyin-1-initials': "['爸', '朋', '妈', '饭', '大', '他', '你', '老']",
}

def fix_lessons():
    file_path = Path('src/data/lesson-paths.ts')
    lines = file_path.read_text().splitlines(keepends=True)

    current_lesson_id = None
    corrections = 0

    for i, line in enumerate(lines):
        # Détecter l'ID de la leçon
        id_match = re.search(r"id: '([^']+)'", line)
        if id_match:
            current_lesson_id = id_match.group(1)

        # Si on a un ID actif et qu'on trouve les flashcards génériques
        if current_lesson_id and current_lesson_id in FLASHCARDS:
            if "flashcards: ['的', '一', '是', '了']" in line:
                # Remplacer
                new_flashcards = FLASHCARDS[current_lesson_id]
                lines[i] = line.replace(
                    "flashcards: ['的', '一', '是', '了']",
                    f"flashcards: {new_flashcards}"
                )
                print(f"✅ Corrigé: {current_lesson_id}")
                corrections += 1
                current_lesson_id = None  # Réinitialiser pour éviter les doublons

    # Écrire le fichier
    file_path.write_text(''.join(lines))

    print(f"\n{'='*80}")
    print(f"✅ Total de corrections: {corrections}")
    print(f"📝 Fichier mis à jour: {file_path}")

    # Vérifier ce qui reste
    remaining = ''.join(lines).count("flashcards: ['的', '一', '是', '了']")
    if remaining > 0:
        print(f"⚠️  Il reste {remaining} leçons avec flashcards génériques")
    else:
        print(f"🎉 Toutes les leçons ont été corrigées!")

if __name__ == '__main__':
    fix_lessons()
