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

// 16位说唱歌手人格库
const rappers = [
  {
    name: "Kanye West",
    icon: "👑",
    quote: "I am a God",
    desc: "自信到极致的创意天才，总是走在潮流前沿，敢于挑战传统，拥有改变游戏规则的能力。",
    style: "Experimental, Bold, Visionary",
    careers: ["音乐制作人", "时尚设计师", "企业家"],
    partners: ["独立自信的伴侣", "有创意的灵魂"],
    matches: ["Travis Scott", "Kid Cudi"]
  },
  {
    name: "Drake",
    icon: "🦉",
    quote: "Started from the bottom now we here",
    desc: "情感细腻的旋律大师，擅长将个人经历转化为共鸣，商业与艺术的完美平衡。",
    style: "Melodic, Emotional, Commercial",
    careers: ["歌手", "演员", "制作人"],
    partners: ["善解人意的伴侣", "有才华的同行"],
    matches: ["Rihanna", "Future"]
  },
  {
    name: "Kendrick Lamar",
    icon: "🎤",
    quote: "We gon' be alright",
    desc: "深刻的叙事者，用音乐探讨社会议题，文字功力深厚，是当代最具思想深度的说唱歌手。",
    style: "Conscious, Narrative, Lyrically Driven",
    careers: ["说唱歌手", "诗人", "社会活动家"],
    partners: ["有思想深度的伴侣", "文化爱好者"],
    matches: ["J. Cole", "SZA"]
  },
  {
    name: "Travis Scott",
    icon: "🌌",
    quote: "别问，感受就完事了",
    desc: "氛围营造大师，现场表现力极强，音乐风格独特，擅长创造沉浸式体验。",
    style: "Atmospheric, Energetic, Cinematic",
    careers: ["说唱歌手", "音乐制作人", "活动策划"],
    partners: ["喜欢冒险的伴侣", "音乐爱好者"],
    matches: ["Kanye West", "Young Thug"]
  },
  {
    name: "J. Cole",
    icon: "📚",
    quote: "No role models, just me myself and I",
    desc: "自律的创作人，注重歌词质量，音乐风格真实，传递积极向上的信息。",
    style: "Lyrical, Conscious, Authentic",
    careers: ["说唱歌手", "音乐制作人", "企业家"],
    partners: ["成熟稳重的伴侣", "有目标的人"],
    matches: ["Kendrick Lamar", "Bas"]
  },
  {
    name: "Lil Uzi Vert",
    icon: "🌈",
    quote: "I'm a rockstar",
    desc: "充满活力的潮流先锋，音乐风格大胆创新，个性张扬，是年轻一代的偶像。",
    style: "Energetic, Experimental, Trendy",
    careers: ["说唱歌手", "时尚 icon", "社交媒体影响者"],
    partners: ["同样个性张扬的伴侣", "潮流爱好者"],
    matches: ["Playboi Carti", "Trippie Redd"]
  },
  {
    name: "Playboi Carti",
    icon: "🦋",
    quote: "Whole Lotta Red",
    desc: "风格独特的潮流引领者，音乐充满实验性，视觉效果强烈，拥有忠实的粉丝群体。",
    style: "Experimental, Aesthetic, Trendsetting",
    careers: ["说唱歌手", "时尚设计师", "文化 icon"],
    partners: ["有艺术感的伴侣", "时尚爱好者"],
    matches: ["Lil Uzi Vert", "A$AP Rocky"]
  },
  {
    name: "Future",
    icon: "🔮",
    quote: "I'm the Future",
    desc: "旋律陷阱的代表人物，声音独特，音乐风格充满未来感，擅长创造热门单曲。",
    style: "Melodic Trap, Autotune, Futuristic",
    careers: ["说唱歌手", "音乐制作人", "label executive"],
    partners: ["独立自信的伴侣", "音乐爱好者"],
    matches: ["Drake", "Young Thug"]
  },
  {
    name: "Tyler, The Creator",
    icon: "🍒",
    quote: "I am the creator",
    desc: "多才多艺的创意天才，音乐风格多样，同时涉足时尚和影视领域，个性鲜明。",
    style: "Eclectic, Creative, Versatile",
    careers: ["说唱歌手", "音乐制作人", "时尚设计师"],
    partners: ["有创意的伴侣", "艺术爱好者"],
    matches: ["Frank Ocean", "Earl Sweatshirt"]
  },
  {
    name: "21 Savage",
    icon: "🔫",
    quote: "Issa knife",
    desc: "冷静沉稳的街头诗人，歌词真实反映生活，音乐风格硬核但不失深度。",
    style: "Hardcore, Authentic, Storytelling",
    careers: ["说唱歌手", "企业家", "慈善家"],
    partners: ["忠诚可靠的伴侣", "现实主义者"],
    matches: ["Metro Boomin", "Offset"]
  },
  {
    name: "Lil Tjay",
    icon: "🌟",
    quote: "Forever young",
    desc: "年轻有活力的旋律说唱歌手，音乐风格现代，情感表达直接，深受年轻听众喜爱。",
    style: "Melodic, Youthful, Emotional",
    careers: ["说唱歌手", "音乐制作人"],
    partners: ["年轻活力的伴侣", "音乐爱好者"],
    matches: ["Polo G", "Lil Baby"]
  },
  {
    name: "Juice WRLD",
    icon: "💔",
    quote: "All girls are the same",
    desc: "情感丰富的旋律天才，音乐风格融合了说唱和流行，歌词真实感人。",
    style: "Melodic, Emotional, Genre-bending",
    careers: ["说唱歌手", "词曲作者"],
    partners: ["情感细腻的伴侣", "音乐爱好者"],
    matches: ["Trippie Redd", "Polo G"]
  },
  {
    name: "Eminem",
    icon: "🐐",
    quote: "Lose yourself in the music",
    desc: "技术流说唱的代表人物，歌词犀利，flow复杂多变，是说唱史上的传奇。",
    style: "Technical, Lyrically Driven, Intense",
    careers: ["说唱歌手", "音乐制作人", "演员"],
    partners: ["坚强独立的伴侣", "音乐爱好者"],
    matches: ["Dr. Dre", "50 Cent"]
  },
  {
    name: "Nicki Minaj",
    icon: "👸",
    quote: "I'm the queen",
    desc: "充满自信的女性力量代表，音乐风格多样，舞台表现力极强，是女性说唱的领军人物。",
    style: "Versatile, Confident, Theatrical",
    careers: ["说唱歌手", "演员", "企业家"],
    partners: ["支持尊重的伴侣", "事业型人士"],
    matches: ["Lil Wayne", "Drake"]
  },
  {
    name: "Cardi B",
    icon: "💋",
    quote: "Okurrr",
    desc: "直率真实的街头女王，音乐风格充满能量，个性鲜明，深受粉丝喜爱。",
    style: "Energetic, Authentic, Charismatic",
    careers: ["说唱歌手", "社交媒体影响者", "演员"],
    partners: ["同样直率的伴侣", "生活爱好者"],
    matches: ["Offset", "Migos"]
  },
  {
    name: "A$AP Rocky",
    icon: "🧢",
    quote: "Fashion Killa",
    desc: "时尚与音乐的完美结合，风格独特，是街头文化的代表人物。",
    style: "Stylish, Experimental, Cultural",
    careers: ["说唱歌手", "时尚 icon", "演员"],
    partners: ["有品味的伴侣", "时尚爱好者"],
    matches: ["Playboi Carti", "Rihanna"]
  }
];

// 维度
const dimensions = ["气场与态度", "表达与真实", "自由与反叛", "节奏与舞台", "野心与坚持"];

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [rapper, setRapper] = useState<any>(null);

  useEffect(() => {
    // 从本地存储获取结果
    const storedResult = localStorage.getItem('rapPersonalityResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      
      // 根据得分选择对应的说唱歌手
      const totalScore = parsedResult.scores.reduce((sum: number, score: number) => sum + score, 0);
      const rapperIndex = totalScore % rappers.length;
      setRapper(rappers[rapperIndex]);
    } else {
      // 没有结果，返回测试页面
      navigate('/');
    }
  }, [navigate]);

  if (!result || !rapper) {
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

  // 生成朋友圈文案
  const generateCaption = () => {
    return `测出来我是 ${rapper.name}：${rapper.desc.split('，')[0]}，${rapper.quote}。`;
  };

  // 复制文案到剪贴板
  const copyCaption = () => {
    const caption = generateCaption();
    navigator.clipboard.writeText(caption).then(() => {
      alert('文案已复制到剪贴板！');
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {/* 匹配度提示 */}
        <div className="bg-purple-100 text-purple-800 rounded-lg p-3 mb-6 text-center">
          ⚠️ 你是极少数匹配度极高的人
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-5xl mb-4">
            {rapper.icon}
          </div>
          <h3 className="text-lg text-gray-500 mb-2">你的主类型</h3>
          <h2 className="text-3xl font-bold mb-2">{rapper.name}</h2>
          <p className="text-gray-600 italic mb-4">"{rapper.quote}"</p>
          <p className="text-gray-600 text-center leading-relaxed mb-4">
            {rapper.desc}
          </p>
          <p className="text-gray-500">风格：{rapper.style}</p>
        </div>

        {/* 朋友圈文案 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">朋友圈装逼文案</h3>
          <p className="text-gray-600 mb-4">{generateCaption()}</p>
          <button 
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={copyCaption}
          >
            复制文案
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">维度评分</h3>
        <div className="h-64 mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">🎯 职业适配推荐</h3>
            <ul className="space-y-2">
              {rapper.careers.map((career: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {career}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">❤️ 理想伴侣类型</h3>
            <ul className="space-y-2">
              {rapper.partners.map((partner: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {partner}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">🎭 同频说唱歌手</h3>
            <ul className="space-y-2">
              {rapper.matches.map((match: string, index: number) => (
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