import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 题库
const questions = [
  // 50 道是/否题
  { q:"我经常主动在社交场合破冰", type:"bool", value:0 },
  { q:"别人说我气场很强", type:"bool", value:0 },
  { q:"我喜欢自由胜过规则", type:"bool", value:0 },
  { q:"我看问题喜欢抓本质", type:"bool", value:0 },
  { q:"我做事常凭直觉", type:"bool", value:0 },
  { q:"我会为了梦想坚持很久", type:"bool", value:0 },
  { q:"我喜欢表达自己的观点", type:"bool", value:0 },
  { q:"我容易被情绪感染", type:"bool", value:0 },
  { q:"我喜欢舞台和被关注", type:"bool", value:0 },
  { q:"我偶尔会有点叛逆", type:"bool", value:0 },
  { q:"我喜欢有节奏的东西", type:"bool", value:0 },
  { q:"我做决定很快", type:"bool", value:0 },
  { q:"我不喜欢被束缚", type:"bool", value:0 },
  { q:"我容易上头", type:"bool", value:0 },
  { q:"我对潮流很敏感", type:"bool", value:0 },
  { q:"我不太擅长妥协", type:"bool", value:0 },
  { q:"我喜欢用态度说话", type:"bool", value:0 },
  { q:"我创意很多", type:"bool", value:0 },
  { q:"我面对冲突不愿退缩", type:"bool", value:0 },
  { q:"我喜欢讲故事", type:"bool", value:0 },
  { q:"我会把情绪写进歌里", type:"bool", value:0 },
  { q:"我对生活有自己的理解", type:"bool", value:0 },
  { q:"我不喜欢被定义", type:"bool", value:0 },
  { q:"我喜欢反差感", type:"bool", value:0 },
  { q:"我偶尔会表现得很酷", type:"bool", value:0 },
  { q:"我对音乐有很强的共鸣", type:"bool", value:0 },
  { q:"我喜欢深夜思考", type:"bool", value:0 },
  { q:"我对新事物充满好奇", type:"bool", value:0 },
  { q:"我追求刺激", type:"bool", value:0 },
  { q:"我有时候会冲动消费", type:"bool", value:0 },
  { q:"我喜欢表达真实的自己", type:"bool", value:0 },
  { q:"我在意别人的看法", type:"bool", value:0 },
  { q:"我会为了目标拼尽全力", type:"bool", value:0 },
  { q:"我喜欢挑战权威", type:"bool", value:0 },
  { q:"我喜欢有张力的画面", type:"bool", value:0 },
  { q:"我表演时会完全投入", type:"bool", value:0 },
  { q:"我喜欢押韵的文字", type:"bool", value:0 },
  { q:"我容易被氛围感染", type:"bool", value:0 },
  { q:"我喜欢炸场的感觉", type:"bool", value:0 },
  { q:"我喜欢把想法落地", type:"bool", value:0 },
  { q:"我不太喜欢等待", type:"bool", value:0 },
  { q:"我容易被一句话戳中", type:"bool", value:0 },
  { q:"我喜欢即兴发挥", type:"bool", value:0 },
  { q:"我对世界有点反叛精神", type:"bool", value:0 },
  { q:"我经常给自己定目标", type:"bool", value:0 },
  { q:"我喜欢力量感的东西", type:"bool", value:0 },
  { q:"我能理解不同的声音", type:"bool", value:0 },
  { q:"我喜欢表达态度", type:"bool", value:0 },
  { q:"我对未来有野心", type:"bool", value:0 },

  // 10 道情景题
  { q:"第一次见前辈，你会", type:"scene", options:[
    { t:"主动打招呼，表达欣赏", s:3 },
    { t:"保持礼貌但不太主动", s:1 },
    { t:"等对方先说话", s:0 },
    { t:"直接开始聊音乐观点", s:2 }
  ]},
  { q:"团队创作时你意见不同，你会", type:"scene", options:[
    { t:"坚持想法并说服大家", s:3 },
    { t:"保留意见但配合团队", s:1 },
    { t:"避免冲突，听大家的", s:0 },
    { t:"直接换方案重新做", s:2 }
  ]},
  { q:"演出紧张时你会", type:"scene", options:[
    { t:"越紧张越兴奋，直接炸场", s:3 },
    { t:"深呼吸稳住", s:1 },
    { t:"想逃掉", s:0 },
    { t:"靠节奏撑住", s:2 }
  ]},
  { q:"歌被喷不够真实，你会", type:"scene", options:[
    { t:"回怼，坚持自我", s:3 },
    { t:"解释创作初衷", s:2 },
    { t:"不在意", s:1 },
    { t:"想改歌迎合大众", s:0 }
  ]},
  { q:"制作人说你的flow不够商业，你会", type:"scene", options:[
    { t:"坚持风格，拒绝妥协", s:3 },
    { t:"尝试调整但保留特点", s:2 },
    { t:"直接改商业flow", s:0 },
    { t:"想换个制作人", s:1 }
  ]},
  { q:"朋友找你写feat，你会", type:"scene", options:[
    { t:"爽快答应，全力配合", s:2 },
    { t:"看关系亲疏决定", s:1 },
    { t:"不太愿意，怕被同化", s:0 },
    { t:"主动提出更有亮点的部分", s:3 }
  ]},
  { q:"粉丝质疑你转型，你会", type:"scene", options:[
    { t:"坦然接受并解释转变", s:2 },
    { t:"觉得被误解，有点生气", s:1 },
    { t:"想证明自己", s:3 },
    { t:"不在乎，继续做", s:0 }
  ]},
  { q:"你在意的人不喜欢你的音乐品味，你会", type:"scene", options:[
    { t:"试图让对方理解", s:2 },
    { t:"有点受伤但保持沉默", s:1 },
    { t:"无所谓", s:0 },
    { t:"感到被冒犯", s:3 }
  ]},
  { q:"比赛时对手很强，你会", type:"scene", options:[
    { t:"蓄势待发，准备反杀", s:3 },
    { t:"尽力但不紧张", s:2 },
    { t:"担心发挥不好", s:1 },
    { t:"直接摆烂", s:0 }
  ]},
  { q:"创作卡壳时，你会", type:"scene", options:[
    { t:"换情绪/环境继续冲", s:3 },
    { t:"暂停休息", s:1 },
    { t:"查资料找灵感", s:2 },
    { t:"焦虑到放弃", s:0 }
  ]}
];

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(60).fill(-1));
  const [showHint, setShowHint] = useState(false);

  // 计算进度
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // 处理答案选择
  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    setShowHint(false);

    // 自动跳转到下一题
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 测试完成，计算结果
      calculateResult(newAnswers);
    }
  };

  // 上一题
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
    }
  };

  // 计算测试结果
  const calculateResult = (answers: number[]) => {
    // 计算各维度得分
    const scores = [0, 0, 0, 0, 0];
    
    // 是/否题得分
    for (let i = 0; i < 50; i++) {
      if (answers[i] === 1) {
        // 分配到不同维度
        const dimensionIndex = i % 5;
        scores[dimensionIndex] += 10;
      }
    }

    // 情景题得分
    for (let i = 50; i < 60; i++) {
      const score = answers[i];
      if (score >= 0) {
        // 分配到不同维度
        const dimensionIndex = (i - 50) % 5;
        scores[dimensionIndex] += score * 2;
      }
    }

    // 确定人格类型
    const personality = determinePersonality(scores);

    // 存储结果到本地存储
    localStorage.setItem('rapPersonalityResult', JSON.stringify({
      scores,
      personality
    }));

    // 跳转到结果页面
    navigate('/result');
  };

  // 确定人格类型
  const determinePersonality = (scores: number[]) => {
    // 简化的人格判断逻辑
    const maxScore = Math.max(...scores);
    const maxIndex = scores.indexOf(maxScore);

    const personalities = [
      { type: "STREET 街头王者", icon: "🔥" },
      { type: "POET 诗意叙述者", icon: "📖" },
      { type: "SWAG 潇洒自在派", icon: "✨" },
      { type: "ANGRY 情绪释放机", icon: "💥" },
      { type: "DREAM 幻想家", icon: "☁️" }
    ];

    return personalities[maxIndex];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div 
            className="h-full bg-indigo-300 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          第 {currentQuestion + 1} / {questions.length} 题
        </h2>

        <div className="mb-8">
          <p className="text-lg mb-6">{questions[currentQuestion].q}</p>

          <div className="space-y-4">
            {questions[currentQuestion].type === "bool" ? (
              // 是/否选项
              <>
                <div 
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${answers[currentQuestion] === 1 ? 'bg-blue-100' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                  onClick={() => handleAnswer(1)}
                >
                  是
                </div>
                <div 
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${answers[currentQuestion] === 0 ? 'bg-blue-100' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                  onClick={() => handleAnswer(0)}
                >
                  否
                </div>
              </>
            ) : (
              // 情景题选项
              (questions[currentQuestion].options as any[]).map((option, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${answers[currentQuestion] === index ? 'bg-blue-100' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                  onClick={() => handleAnswer(index)}
                >
                  {option.t}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="px-6 py-3 bg-indigo-300 text-gray-800 rounded-xl hover:bg-indigo-400 transition-all duration-200 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            上一题
          </button>
          <div className={`text-red-500 text-sm ${showHint ? 'block' : 'hidden'}`}>
            请选择一个答案
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;