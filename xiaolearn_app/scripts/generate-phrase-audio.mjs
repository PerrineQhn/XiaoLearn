import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Données des phrases de dictée
const dictationPhrases = [
  // HSK1 Phrases (50)
  { id: 'hsk1-phrase-001', hanzi: '你好', audio: 'audio/phrases/hsk1-phrase-001.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-002', hanzi: '我是学生', audio: 'audio/phrases/hsk1-phrase-002.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-003', hanzi: '你好吗', audio: 'audio/phrases/hsk1-phrase-003.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-004', hanzi: '谢谢你', audio: 'audio/phrases/hsk1-phrase-004.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-005', hanzi: '不客气', audio: 'audio/phrases/hsk1-phrase-005.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-006', hanzi: '再见', audio: 'audio/phrases/hsk1-phrase-006.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-007', hanzi: '今天很好', audio: 'audio/phrases/hsk1-phrase-007.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-008', hanzi: '我叫小明', audio: 'audio/phrases/hsk1-phrase-008.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-009', hanzi: '你叫什么名字', audio: 'audio/phrases/hsk1-phrase-009.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-010', hanzi: '我爱你', audio: 'audio/phrases/hsk1-phrase-010.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-011', hanzi: '这是我的书', audio: 'audio/phrases/hsk1-phrase-011.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-012', hanzi: '那是什么', audio: 'audio/phrases/hsk1-phrase-012.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-013', hanzi: '我想喝水', audio: 'audio/phrases/hsk1-phrase-013.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-014', hanzi: '他是我爸爸', audio: 'audio/phrases/hsk1-phrase-014.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-015', hanzi: '她是我妈妈', audio: 'audio/phrases/hsk1-phrase-015.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-016', hanzi: '我有一个弟弟', audio: 'audio/phrases/hsk1-phrase-016.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-017', hanzi: '几点了', audio: 'audio/phrases/hsk1-phrase-017.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-018', hanzi: '现在三点', audio: 'audio/phrases/hsk1-phrase-018.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-019', hanzi: '我去学校', audio: 'audio/phrases/hsk1-phrase-019.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-020', hanzi: '你在哪儿', audio: 'audio/phrases/hsk1-phrase-020.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-021', hanzi: '我在家', audio: 'audio/phrases/hsk1-phrase-021.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-022', hanzi: '今天星期几', audio: 'audio/phrases/hsk1-phrase-022.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-023', hanzi: '今天星期一', audio: 'audio/phrases/hsk1-phrase-023.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-024', hanzi: '明天见', audio: 'audio/phrases/hsk1-phrase-024.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-025', hanzi: '我很累', audio: 'audio/phrases/hsk1-phrase-025.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-026', hanzi: '他不在', audio: 'audio/phrases/hsk1-phrase-026.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-027', hanzi: '我会说中文', audio: 'audio/phrases/hsk1-phrase-027.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-028', hanzi: '多少钱', audio: 'audio/phrases/hsk1-phrase-028.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-029', hanzi: '五块钱', audio: 'audio/phrases/hsk1-phrase-029.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-030', hanzi: '我想买水', audio: 'audio/phrases/hsk1-phrase-030.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-031', hanzi: '请坐', audio: 'audio/phrases/hsk1-phrase-031.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-032', hanzi: '对不起', audio: 'audio/phrases/hsk1-phrase-032.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-033', hanzi: '没关系', audio: 'audio/phrases/hsk1-phrase-033.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-034', hanzi: '你几岁', audio: 'audio/phrases/hsk1-phrase-034.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-035', hanzi: '我十岁', audio: 'audio/phrases/hsk1-phrase-035.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-036', hanzi: '你吃饭了吗', audio: 'audio/phrases/hsk1-phrase-036.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-037', hanzi: '我吃了', audio: 'audio/phrases/hsk1-phrase-037.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-038', hanzi: '天气很好', audio: 'audio/phrases/hsk1-phrase-038.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-039', hanzi: '今天很热', audio: 'audio/phrases/hsk1-phrase-039.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-040', hanzi: '我喜欢你', audio: 'audio/phrases/hsk1-phrase-040.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-041', hanzi: '这个很大', audio: 'audio/phrases/hsk1-phrase-041.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-042', hanzi: '那个很小', audio: 'audio/phrases/hsk1-phrase-042.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-043', hanzi: '我不知道', audio: 'audio/phrases/hsk1-phrase-043.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-044', hanzi: '我认识他', audio: 'audio/phrases/hsk1-phrase-044.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-045', hanzi: '我们是朋友', audio: 'audio/phrases/hsk1-phrase-045.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-046', hanzi: '他们都很好', audio: 'audio/phrases/hsk1-phrase-046.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-047', hanzi: '我要回家', audio: 'audio/phrases/hsk1-phrase-047.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-048', hanzi: '你来我家', audio: 'audio/phrases/hsk1-phrase-048.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-049', hanzi: '我们一起去', audio: 'audio/phrases/hsk1-phrase-049.mp3', level: 'hsk1' },
  { id: 'hsk1-phrase-050', hanzi: '祝你好运', audio: 'audio/phrases/hsk1-phrase-050.mp3', level: 'hsk1' },

  // HSK2 Phrases (50)
  { id: 'hsk2-phrase-001', hanzi: '你在做什么', audio: 'audio/phrases/hsk2-phrase-001.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-002', hanzi: '我正在看书', audio: 'audio/phrases/hsk2-phrase-002.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-003', hanzi: '天气怎么样', audio: 'audio/phrases/hsk2-phrase-003.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-004', hanzi: '我觉得很冷', audio: 'audio/phrases/hsk2-phrase-004.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-005', hanzi: '你喜欢吃什么', audio: 'audio/phrases/hsk2-phrase-005.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-006', hanzi: '我喜欢吃中国菜', audio: 'audio/phrases/hsk2-phrase-006.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-007', hanzi: '请给我一杯咖啡', audio: 'audio/phrases/hsk2-phrase-007.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-008', hanzi: '我已经吃过了', audio: 'audio/phrases/hsk2-phrase-008.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-009', hanzi: '你去过北京吗', audio: 'audio/phrases/hsk2-phrase-009.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-010', hanzi: '我去过很多次', audio: 'audio/phrases/hsk2-phrase-010.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-011', hanzi: '这件衣服太贵了', audio: 'audio/phrases/hsk2-phrase-011.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-012', hanzi: '能便宜一点吗', audio: 'audio/phrases/hsk2-phrase-012.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-013', hanzi: '我需要帮助', audio: 'audio/phrases/hsk2-phrase-013.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-014', hanzi: '你能帮我吗', audio: 'audio/phrases/hsk2-phrase-014.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-015', hanzi: '当然可以', audio: 'audio/phrases/hsk2-phrase-015.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-016', hanzi: '我听不懂', audio: 'audio/phrases/hsk2-phrase-016.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-017', hanzi: '请说慢一点', audio: 'audio/phrases/hsk2-phrase-017.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-018', hanzi: '你的汉语说得很好', audio: 'audio/phrases/hsk2-phrase-018.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-019', hanzi: '我在学习中文', audio: 'audio/phrases/hsk2-phrase-019.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-020', hanzi: '这个问题很难', audio: 'audio/phrases/hsk2-phrase-020.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-021', hanzi: '我们一起努力吧', audio: 'audio/phrases/hsk2-phrase-021.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-022', hanzi: '医院在哪里', audio: 'audio/phrases/hsk2-phrase-022.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-023', hanzi: '一直往前走', audio: 'audio/phrases/hsk2-phrase-023.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-024', hanzi: '你要去哪儿', audio: 'audio/phrases/hsk2-phrase-024.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-025', hanzi: '我想去火车站', audio: 'audio/phrases/hsk2-phrase-025.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-026', hanzi: '坐地铁很方便', audio: 'audio/phrases/hsk2-phrase-026.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-027', hanzi: '今天我很忙', audio: 'audio/phrases/hsk2-phrase-027.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-028', hanzi: '明天我有时间', audio: 'audio/phrases/hsk2-phrase-028.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-029', hanzi: '我们什么时候见面', audio: 'audio/phrases/hsk2-phrase-029.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-030', hanzi: '下午三点怎么样', audio: 'audio/phrases/hsk2-phrase-030.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-031', hanzi: '没问题', audio: 'audio/phrases/hsk2-phrase-031.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-032', hanzi: '我身体不舒服', audio: 'audio/phrases/hsk2-phrase-032.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-033', hanzi: '你应该去看医生', audio: 'audio/phrases/hsk2-phrase-033.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-034', hanzi: '这是你的房间', audio: 'audio/phrases/hsk2-phrase-034.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-035', hanzi: '房间很干净', audio: 'audio/phrases/hsk2-phrase-035.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-036', hanzi: '我想换一个房间', audio: 'audio/phrases/hsk2-phrase-036.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-037', hanzi: '我要一张票', audio: 'audio/phrases/hsk2-phrase-037.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-038', hanzi: '你会游泳吗', audio: 'audio/phrases/hsk2-phrase-038.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-039', hanzi: '我会一点儿', audio: 'audio/phrases/hsk2-phrase-039.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-040', hanzi: '外面下雨了', audio: 'audio/phrases/hsk2-phrase-040.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-041', hanzi: '别忘了带伞', audio: 'audio/phrases/hsk2-phrase-041.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-042', hanzi: '我想休息一下', audio: 'audio/phrases/hsk2-phrase-042.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-043', hanzi: '你在哪个公司工作', audio: 'audio/phrases/hsk2-phrase-043.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-044', hanzi: '我是老师', audio: 'audio/phrases/hsk2-phrase-044.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-045', hanzi: '你的工作怎么样', audio: 'audio/phrases/hsk2-phrase-045.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-046', hanzi: '工作很有意思', audio: 'audio/phrases/hsk2-phrase-046.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-047', hanzi: '我想学做中国菜', audio: 'audio/phrases/hsk2-phrase-047.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-048', hanzi: '我可以教你', audio: 'audio/phrases/hsk2-phrase-048.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-049', hanzi: '周末你有什么打算', audio: 'audio/phrases/hsk2-phrase-049.mp3', level: 'hsk2' },
  { id: 'hsk2-phrase-050', hanzi: '我打算去爬山', audio: 'audio/phrases/hsk2-phrase-050.mp3', level: 'hsk2' },

  // HSK3 Phrases (50)
  { id: 'hsk3-phrase-001', hanzi: '你对这个城市的印象怎么样', audio: 'audio/phrases/hsk3-phrase-001.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-002', hanzi: '我觉得这里的环境非常好', audio: 'audio/phrases/hsk3-phrase-002.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-003', hanzi: '虽然工作很累，但是我很开心', audio: 'audio/phrases/hsk3-phrase-003.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-004', hanzi: '如果明天不下雨，我们就去公园', audio: 'audio/phrases/hsk3-phrase-004.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-005', hanzi: '因为太累了，所以我想早点睡觉', audio: 'audio/phrases/hsk3-phrase-005.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-006', hanzi: '我已经习惯了这里的生活', audio: 'audio/phrases/hsk3-phrase-006.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-007', hanzi: '你能不能帮我检查一下这份文件', audio: 'audio/phrases/hsk3-phrase-007.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-008', hanzi: '我希望能找到一份好工作', audio: 'audio/phrases/hsk3-phrase-008.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-009', hanzi: '他的汉语水平提高得很快', audio: 'audio/phrases/hsk3-phrase-009.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-010', hanzi: '我打算明年去中国留学', audio: 'audio/phrases/hsk3-phrase-010.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-011', hanzi: '这本书的内容很有意思', audio: 'audio/phrases/hsk3-phrase-011.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-012', hanzi: '我需要准备一下考试', audio: 'audio/phrases/hsk3-phrase-012.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-013', hanzi: '你应该注意身体健康', audio: 'audio/phrases/hsk3-phrase-013.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-014', hanzi: '这家餐厅的菜味道不错', audio: 'audio/phrases/hsk3-phrase-014.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-015', hanzi: '我对中国文化很感兴趣', audio: 'audio/phrases/hsk3-phrase-015.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-016', hanzi: '昨天我参加了一个聚会', audio: 'audio/phrases/hsk3-phrase-016.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-017', hanzi: '我们应该保护环境', audio: 'audio/phrases/hsk3-phrase-017.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-018', hanzi: '他比我高一点儿', audio: 'audio/phrases/hsk3-phrase-018.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-019', hanzi: '这个城市越来越漂亮了', audio: 'audio/phrases/hsk3-phrase-019.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-020', hanzi: '我把钱包忘在家里了', audio: 'audio/phrases/hsk3-phrase-020.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-021', hanzi: '我们一边吃饭一边聊天', audio: 'audio/phrases/hsk3-phrase-021.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-022', hanzi: '他向我借了一本书', audio: 'audio/phrases/hsk3-phrase-022.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-023', hanzi: '我对这个结果很满意', audio: 'audio/phrases/hsk3-phrase-023.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-024', hanzi: '你最好早点出发', audio: 'audio/phrases/hsk3-phrase-024.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-025', hanzi: '我想了解一下中国历史', audio: 'audio/phrases/hsk3-phrase-025.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-026', hanzi: '除了工作以外，我还喜欢运动', audio: 'audio/phrases/hsk3-phrase-026.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-027', hanzi: '他们正在讨论这个问题', audio: 'audio/phrases/hsk3-phrase-027.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-028', hanzi: '我决定接受这份工作', audio: 'audio/phrases/hsk3-phrase-028.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-029', hanzi: '我们应该互相帮助', audio: 'audio/phrases/hsk3-phrase-029.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-030', hanzi: '这次旅行让我印象深刻', audio: 'audio/phrases/hsk3-phrase-030.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-031', hanzi: '我需要找一个安静的地方学习', audio: 'audio/phrases/hsk3-phrase-031.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-032', hanzi: '他的态度让我很生气', audio: 'audio/phrases/hsk3-phrase-032.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-033', hanzi: '我相信你一定能成功', audio: 'audio/phrases/hsk3-phrase-033.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-034', hanzi: '这个问题需要仔细考虑', audio: 'audio/phrases/hsk3-phrase-034.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-035', hanzi: '我们应该尊重不同的文化', audio: 'audio/phrases/hsk3-phrase-035.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-036', hanzi: '他的表现超出了我的预期', audio: 'audio/phrases/hsk3-phrase-036.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-037', hanzi: '我终于完成了这个项目', audio: 'audio/phrases/hsk3-phrase-037.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-038', hanzi: '为了学好汉语，我每天都练习', audio: 'audio/phrases/hsk3-phrase-038.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-039', hanzi: '他不但聪明而且很努力', audio: 'audio/phrases/hsk3-phrase-039.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-040', hanzi: '我们的意见基本一致', audio: 'audio/phrases/hsk3-phrase-040.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-041', hanzi: '这个方法很有效', audio: 'audio/phrases/hsk3-phrase-041.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-042', hanzi: '我们需要更多的时间来准备', audio: 'audio/phrases/hsk3-phrase-042.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-043', hanzi: '他的话让我很感动', audio: 'audio/phrases/hsk3-phrase-043.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-044', hanzi: '我们应该珍惜现在的生活', audio: 'audio/phrases/hsk3-phrase-044.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-045', hanzi: '这个经验对我很有帮助', audio: 'audio/phrases/hsk3-phrase-045.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-046', hanzi: '无论遇到什么困难，都不要放弃', audio: 'audio/phrases/hsk3-phrase-046.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-047', hanzi: '我打算利用假期去旅游', audio: 'audio/phrases/hsk3-phrase-047.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-048', hanzi: '他的成绩比以前进步了很多', audio: 'audio/phrases/hsk3-phrase-048.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-049', hanzi: '我们应该养成良好的习惯', audio: 'audio/phrases/hsk3-phrase-049.mp3', level: 'hsk3' },
  { id: 'hsk3-phrase-050', hanzi: '通过这次经历，我学到了很多', audio: 'audio/phrases/hsk3-phrase-050.mp3', level: 'hsk3' }
];

// Initialisation du client Google Cloud TTS
const client = new TextToSpeechClient();

async function generateAudio(text, outputPath) {
  const request = {
    input: { text },
    voice: {
      languageCode: 'cmn-CN',
      name: 'cmn-CN-Wavenet-A',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.9,
      pitch: 0,
      volumeGainDb: 0,
    },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    if (response.audioContent) {
      fs.writeFileSync(outputPath, response.audioContent, 'binary');
      console.log(`✓ Créé: ${outputPath}`);
    }
  } catch (error) {
    console.error(`✗ Erreur pour ${outputPath}:`, error.message);
  }
}

async function main() {
  console.log('🎵 Génération des fichiers audio pour les phrases de dictée...\n');

  // Créer les dossiers nécessaires
  const audioDir = path.join(process.cwd(), 'public', 'audio', 'phrases');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  let totalGenerated = 0;
  let totalSkipped = 0;

  // Générer l'audio pour chaque phrase
  for (const phrase of dictationPhrases) {
    const outputPath = path.join(process.cwd(), 'public', phrase.audio);

    // Vérifier si le fichier existe déjà
    if (fs.existsSync(outputPath)) {
      console.log(`⊘ Existe déjà: ${phrase.audio}`);
      totalSkipped++;
      continue;
    }

    // Générer l'audio
    await generateAudio(phrase.hanzi, outputPath);
    totalGenerated++;

    // Petit délai pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✨ Génération terminée!`);
  console.log(`   - ${totalGenerated} fichiers créés`);
  console.log(`   - ${totalSkipped} fichiers déjà existants`);
  console.log(`   - ${dictationPhrases.length} fichiers au total\n`);
}

main().catch(console.error);
