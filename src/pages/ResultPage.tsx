import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 人格库
const personalities = [
  {
    type:"STREET 街头王者",
    icon:"🔥",
    desc:"你自带气场，态度拉满。真实、敢说、敢冲，你把每段flow都写成生活的刀枪。适合做硬核、Old School、地下说唱，是天生的圈中焦点。",
    careers:["地下Battle歌手", "硬核说唱制作人", "街头文化内容创作者"],
    partners:["敢爱敢恨型伴侣", "同样追求真实的HipHop头"],
    matches:["RAW 原始能量型", "BOLD 态度炸裂型"]
  },
  {
    type:"POET 诗意叙述者",
    icon:"📖",
    desc:"你讲故事的能力极强，擅长用画面、意象、情绪构建歌曲。适合Trap情绪、BoomBap、叙事说唱。像电影镜头一样，把听众拉进你的世界。",
    careers:["叙事说唱歌手", "音乐故事创作者", "影视配乐作词人"],
    partners:["细腻共情型伴侣", "音乐审美同频者"],
    matches:["STORY 故事型", "VISION 画面感型"]
  },
  {
    type:"SWAG 潇洒自在派",
    icon:"✨",
    desc:"松弛、有范儿、不费力。你不是最炸的，但最有风格。适合Jazz、Chill Hop、轻旋律说唱。你的魅力在于不讨好、不迎合。",
    careers:["潮流说唱创作者", "Chill Hop制作人", "穿搭/文化内容博主"],
    partners:["随性但专一的伴侣", "审美独立的人"],
    matches:["CHILL 松弛型", "STYLE 风格型"]
  },
  {
    type:"ANGRY 情绪释放机",
    icon:"💥",
    desc:"你的歌像情绪的出口，直白、锋利、有力量。适合情绪Trap、朋克说唱、硬核内容。你的歌能戳中很多人心里的愤怒与渴望。",
    careers:["情绪说唱歌手", "主题型作词人", "现场能量型Rapper"],
    partners:["能理解你情绪的人", "热情且有耐心的伴侣"],
    matches:["EMO 情绪型", "POWER 力量型"]
  },
  {
    type:"DREAM 幻想家",
    icon:"☁️",
    desc:"你眼里的世界比别人浪漫。适合梦幻Trap、氛围说唱、轻电子。你的歌像一场梦，把听众带进另一个空间。",
    careers:["Ambient 说唱创作者", "音乐合成/氛围制作人", "视觉音乐内容创作者"],
    partners:["浪漫且温柔的伴侣", "同频想象力的人"],
    matches:["DREAM 梦幻型", "SOFT 柔软型"]
  }
];

// 维度
const dimensions = ["气场与态度", "表达与真实", "自由与反叛", "节奏与舞台", "野心与坚持"];

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [personality, setPersonality] = useState<any>(null);

  useEffect(() => {
    // 从本地存储获取结果
    const storedResult = localStorage.getItem('rapPersonalityResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      
      // 找到对应的人格类型
      const foundPersonality = personalities.find(p => p.type === parsedResult.personality.type);
      if (foundPersonality) {
        setPersonality(foundPersonality);
      } else {
        // 默认使用第一个人格类型
        setPersonality(personalities[0]);
      }
    } else {
      // 没有结果，返回测试页面
      navigate('/');
    }
  }, [navigate]);

  if (!result || !personality) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  // 图表数据
  const chartData = {
    labels: dimensions,
    datasets: [
      {
        label: '得分',
        data: result.scores,
        backgroundColor: 'rgba(125, 163, 255, 0.7)',
        borderColor: 'rgba(125, 163, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl mb-4">
            {personality.icon}
          </div>
          <h2 className="text-3xl font-bold mb-2">{personality.type}</h2>
          <p className="text-gray-600 text-center leading-relaxed">
            {personality.desc}
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-4">维度评分</h3>
        <div className="h-64 mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">🎯 职业适配推荐</h3>
            <ul className="space-y-2">
              {personality.careers.map((career: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {career}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">❤️ 说唱伴侣类型匹配</h3>
            <ul className="space-y-2">
              {personality.partners.map((partner: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {partner}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">🎭 同频人格推荐（说唱圈风格）</h3>
            <ul className="space-y-2">
              {personality.matches.map((match: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {match}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          className="w-full mt-8 px-6 py-3 bg-indigo-300 text-gray-800 rounded-xl hover:bg-indigo-400 transition-all duration-200"
          onClick={() => navigate('/')}
        >
          重新测试
        </button>
      </div>
    </div>
  );
};

export default ResultPage;