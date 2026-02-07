#!/usr/bin/env python3
"""
Génère les fichiers audio pour les phrases de dictée avec Google Cloud TTS
"""

import os
import sys
from pathlib import Path
from google.cloud import texttospeech

# Données des phrases de dictée
phrases_data = [
    # HSK1 (50 phrases)
    ('hsk1-phrase-001', '你好'),
    ('hsk1-phrase-002', '我是学生'),
    ('hsk1-phrase-003', '你好吗'),
    ('hsk1-phrase-004', '谢谢你'),
    ('hsk1-phrase-005', '不客气'),
    ('hsk1-phrase-006', '再见'),
    ('hsk1-phrase-007', '今天很好'),
    ('hsk1-phrase-008', '我叫小明'),
    ('hsk1-phrase-009', '你叫什么名字'),
    ('hsk1-phrase-010', '我爱你'),
    ('hsk1-phrase-011', '这是我的书'),
    ('hsk1-phrase-012', '那是什么'),
    ('hsk1-phrase-013', '我想喝水'),
    ('hsk1-phrase-014', '他是我爸爸'),
    ('hsk1-phrase-015', '她是我妈妈'),
    ('hsk1-phrase-016', '我有一个弟弟'),
    ('hsk1-phrase-017', '几点了'),
    ('hsk1-phrase-018', '现在三点'),
    ('hsk1-phrase-019', '我去学校'),
    ('hsk1-phrase-020', '你在哪儿'),
    ('hsk1-phrase-021', '我在家'),
    ('hsk1-phrase-022', '今天星期几'),
    ('hsk1-phrase-023', '今天星期一'),
    ('hsk1-phrase-024', '明天见'),
    ('hsk1-phrase-025', '我很累'),
    ('hsk1-phrase-026', '他不在'),
    ('hsk1-phrase-027', '我会说中文'),
    ('hsk1-phrase-028', '多少钱'),
    ('hsk1-phrase-029', '五块钱'),
    ('hsk1-phrase-030', '我想买水'),
    ('hsk1-phrase-031', '请坐'),
    ('hsk1-phrase-032', '对不起'),
    ('hsk1-phrase-033', '没关系'),
    ('hsk1-phrase-034', '你几岁'),
    ('hsk1-phrase-035', '我十岁'),
    ('hsk1-phrase-036', '你吃饭了吗'),
    ('hsk1-phrase-037', '我吃了'),
    ('hsk1-phrase-038', '天气很好'),
    ('hsk1-phrase-039', '今天很热'),
    ('hsk1-phrase-040', '我喜欢你'),
    ('hsk1-phrase-041', '这个很大'),
    ('hsk1-phrase-042', '那个很小'),
    ('hsk1-phrase-043', '我不知道'),
    ('hsk1-phrase-044', '我认识他'),
    ('hsk1-phrase-045', '我们是朋友'),
    ('hsk1-phrase-046', '他们都很好'),
    ('hsk1-phrase-047', '我要回家'),
    ('hsk1-phrase-048', '你来我家'),
    ('hsk1-phrase-049', '我们一起去'),
    ('hsk1-phrase-050', '祝你好运'),

    # HSK2 (50 phrases)
    ('hsk2-phrase-001', '你在做什么'),
    ('hsk2-phrase-002', '我正在看书'),
    ('hsk2-phrase-003', '天气怎么样'),
    ('hsk2-phrase-004', '我觉得很冷'),
    ('hsk2-phrase-005', '你喜欢吃什么'),
    ('hsk2-phrase-006', '我喜欢吃中国菜'),
    ('hsk2-phrase-007', '请给我一杯咖啡'),
    ('hsk2-phrase-008', '我已经吃过了'),
    ('hsk2-phrase-009', '你去过北京吗'),
    ('hsk2-phrase-010', '我去过很多次'),
    ('hsk2-phrase-011', '这件衣服太贵了'),
    ('hsk2-phrase-012', '能便宜一点吗'),
    ('hsk2-phrase-013', '我需要帮助'),
    ('hsk2-phrase-014', '你能帮我吗'),
    ('hsk2-phrase-015', '当然可以'),
    ('hsk2-phrase-016', '我听不懂'),
    ('hsk2-phrase-017', '请说慢一点'),
    ('hsk2-phrase-018', '你的汉语说得很好'),
    ('hsk2-phrase-019', '我在学习中文'),
    ('hsk2-phrase-020', '这个问题很难'),
    ('hsk2-phrase-021', '我们一起努力吧'),
    ('hsk2-phrase-022', '医院在哪里'),
    ('hsk2-phrase-023', '一直往前走'),
    ('hsk2-phrase-024', '你要去哪儿'),
    ('hsk2-phrase-025', '我想去火车站'),
    ('hsk2-phrase-026', '坐地铁很方便'),
    ('hsk2-phrase-027', '今天我很忙'),
    ('hsk2-phrase-028', '明天我有时间'),
    ('hsk2-phrase-029', '我们什么时候见面'),
    ('hsk2-phrase-030', '下午三点怎么样'),
    ('hsk2-phrase-031', '没问题'),
    ('hsk2-phrase-032', '我身体不舒服'),
    ('hsk2-phrase-033', '你应该去看医生'),
    ('hsk2-phrase-034', '这是你的房间'),
    ('hsk2-phrase-035', '房间很干净'),
    ('hsk2-phrase-036', '我想换一个房间'),
    ('hsk2-phrase-037', '我要一张票'),
    ('hsk2-phrase-038', '你会游泳吗'),
    ('hsk2-phrase-039', '我会一点儿'),
    ('hsk2-phrase-040', '外面下雨了'),
    ('hsk2-phrase-041', '别忘了带伞'),
    ('hsk2-phrase-042', '我想休息一下'),
    ('hsk2-phrase-043', '你在哪个公司工作'),
    ('hsk2-phrase-044', '我是老师'),
    ('hsk2-phrase-045', '你的工作怎么样'),
    ('hsk2-phrase-046', '工作很有意思'),
    ('hsk2-phrase-047', '我想学做中国菜'),
    ('hsk2-phrase-048', '我可以教你'),
    ('hsk2-phrase-049', '周末你有什么打算'),
    ('hsk2-phrase-050', '我打算去爬山'),

    # HSK3 (50 phrases)
    ('hsk3-phrase-001', '你对这个城市的印象怎么样'),
    ('hsk3-phrase-002', '我觉得这里的环境非常好'),
    ('hsk3-phrase-003', '虽然工作很累，但是我很开心'),
    ('hsk3-phrase-004', '如果明天不下雨，我们就去公园'),
    ('hsk3-phrase-005', '因为太累了，所以我想早点睡觉'),
    ('hsk3-phrase-006', '我已经习惯了这里的生活'),
    ('hsk3-phrase-007', '你能不能帮我检查一下这份文件'),
    ('hsk3-phrase-008', '我希望能找到一份好工作'),
    ('hsk3-phrase-009', '他的汉语水平提高得很快'),
    ('hsk3-phrase-010', '我打算明年去中国留学'),
    ('hsk3-phrase-011', '这本书的内容很有意思'),
    ('hsk3-phrase-012', '我需要准备一下考试'),
    ('hsk3-phrase-013', '你应该注意身体健康'),
    ('hsk3-phrase-014', '这家餐厅的菜味道不错'),
    ('hsk3-phrase-015', '我对中国文化很感兴趣'),
    ('hsk3-phrase-016', '昨天我参加了一个聚会'),
    ('hsk3-phrase-017', '我们应该保护环境'),
    ('hsk3-phrase-018', '他比我高一点儿'),
    ('hsk3-phrase-019', '这个城市越来越漂亮了'),
    ('hsk3-phrase-020', '我把钱包忘在家里了'),
    ('hsk3-phrase-021', '我们一边吃饭一边聊天'),
    ('hsk3-phrase-022', '他向我借了一本书'),
    ('hsk3-phrase-023', '我对这个结果很满意'),
    ('hsk3-phrase-024', '你最好早点出发'),
    ('hsk3-phrase-025', '我想了解一下中国历史'),
    ('hsk3-phrase-026', '除了工作以外，我还喜欢运动'),
    ('hsk3-phrase-027', '他们正在讨论这个问题'),
    ('hsk3-phrase-028', '我决定接受这份工作'),
    ('hsk3-phrase-029', '我们应该互相帮助'),
    ('hsk3-phrase-030', '这次旅行让我印象深刻'),
    ('hsk3-phrase-031', '我需要找一个安静的地方学习'),
    ('hsk3-phrase-032', '他的态度让我很生气'),
    ('hsk3-phrase-033', '我相信你一定能成功'),
    ('hsk3-phrase-034', '这个问题需要仔细考虑'),
    ('hsk3-phrase-035', '我们应该尊重不同的文化'),
    ('hsk3-phrase-036', '他的表现超出了我的预期'),
    ('hsk3-phrase-037', '我终于完成了这个项目'),
    ('hsk3-phrase-038', '为了学好汉语，我每天都练习'),
    ('hsk3-phrase-039', '他不但聪明而且很努力'),
    ('hsk3-phrase-040', '我们的意见基本一致'),
    ('hsk3-phrase-041', '这个方法很有效'),
    ('hsk3-phrase-042', '我们需要更多的时间来准备'),
    ('hsk3-phrase-043', '他的话让我很感动'),
    ('hsk3-phrase-044', '我们应该珍惜现在的生活'),
    ('hsk3-phrase-045', '这个经验对我很有帮助'),
    ('hsk3-phrase-046', '无论遇到什么困难，都不要放弃'),
    ('hsk3-phrase-047', '我打算利用假期去旅游'),
    ('hsk3-phrase-048', '他的成绩比以前进步了很多'),
    ('hsk3-phrase-049', '我们应该养成良好的习惯'),
    ('hsk3-phrase-050', '通过这次经历，我学到了很多'),
]

def generate_audio(text, output_path):
    """Génère un fichier audio pour une phrase"""
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code="cmn-CN",
        name="cmn-CN-Wavenet-A",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.9,
        pitch=0.0,
        volume_gain_db=0.0
    )

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    with open(output_path, "wb") as out:
        out.write(response.audio_content)

def main():
    print("🎵 Génération des fichiers audio pour les phrases de dictée...\n")

    # Créer le dossier de destination
    audio_dir = Path("public/audio/phrases")
    audio_dir.mkdir(parents=True, exist_ok=True)

    total_generated = 0
    total_skipped = 0

    for phrase_id, hanzi in phrases_data:
        output_path = audio_dir / f"{phrase_id}.mp3"

        if output_path.exists():
            print(f"⊘ Existe déjà: {phrase_id}.mp3")
            total_skipped += 1
            continue

        try:
            generate_audio(hanzi, output_path)
            print(f"✓ Créé: {phrase_id}.mp3")
            total_generated += 1
        except Exception as e:
            print(f"✗ Erreur pour {phrase_id}.mp3: {e}")

    print(f"\n✨ Génération terminée!")
    print(f"   - {total_generated} fichiers créés")
    print(f"   - {total_skipped} fichiers déjà existants")
    print(f"   - {len(phrases_data)} fichiers au total\n")

if __name__ == "__main__":
    main()
