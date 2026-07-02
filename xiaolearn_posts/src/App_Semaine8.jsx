import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"} alt="XiaoLearn Logo" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
  </div>
);

// --- DONNÉES SEMAINE 8 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Le Travail 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "💼", title: "LE TRAVAIL", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 2-3", content: "5 mots essentiels pour parler de votre vie professionnelle.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "工作", pinyin: "Gōngzuò", meaning: "Travail / Travailler", hsk: 2, example: "你的工作怎么样？", exPinyin: "Nǐ de gōngzuò zěnmeyàng?", exTrans: "Comment va ton travail ?", radicals: "工 (travail/ouvrier) + 作 (faire) → faire un travail" },
      { type: 'vocab', hanzi: "公司", pinyin: "Gōngsī", meaning: "Entreprise / Société", hsk: 2, example: "我在一家大公司工作。", exPinyin: "Wǒ zài yī jiā dà gōngsī gōngzuò.", exTrans: "Je travaille dans une grande entreprise.", radicals: "公 (public) + 司 (gérer) → gérer des affaires publiques" },
      { type: 'vocab', hanzi: "老板", pinyin: "Lǎobǎn", meaning: "Patron / Chef", hsk: 3, example: "我们的老板很好。", exPinyin: "Wǒmen de lǎobǎn hěn hǎo.", exTrans: "Notre patron est très bien.", radicals: "老 (vieux/expérimenté) + 板 (planche/patron) → le vieux sage qui dirige" },
      { type: 'vocab', hanzi: "同事", pinyin: "Tóngshì", meaning: "Collègue", hsk: 3, example: "我的同事都很友好。", exPinyin: "Wǒ de tóngshì dōu hěn yǒuhǎo.", exTrans: "Mes collègues sont tous très sympas.", radicals: "同 (même) + 事 (affaire) → ceux qui partagent les mêmes affaires" },
      { type: 'vocab', hanzi: "会议", pinyin: "Huìyì", meaning: "Réunion / Conférence", hsk: 3, example: "明天上午有一个会议。", exPinyin: "Míngtiān shàngwǔ yǒu yī gè huìyì.", exTrans: "Il y a une réunion demain matin.", radicals: "会 (rencontrer/rassembler) + 议 (discuter) → se rassembler pour discuter" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"工作 Gōngzuò", sub:"Travail", icon:"💼"},
        {char:"公司 Gōngsī", sub:"Entreprise", icon:"🏢"},
        {char:"老板 Lǎobǎn", sub:"Patron", icon:"👔"},
        {char:"同事 Tóngshì", sub:"Collègue", icon:"🤝"},
        {char:"会议 Huìyì", sub:"Réunion", icon:"📋"}
      ]}
    ]
  },
  mercredi: {
    title: "Mercredi : La Comparaison 比 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "⚖️", title: "COMPARER", subtitle: "AVEC 比", tagline: "GRAMMAIRE HSK 3", content: "Comment comparer deux choses en chinois ? Plus simple qu'en français !", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "LA STRUCTURE", gesture: "⚖️", title: "A 比 B + Adjectif", desc: "La formule de base de la comparaison", tip: "En français : A est plus [adj] que B. En chinois : A 比 B [adj]. Pas besoin de '更' (plus) — l'adjectif seul suffit après 比 !" },
      { type: 'formula', title: "COMPARAISON DE BASE", part1: "A + 比 + B", part2: "+ Adjectif", result: "A est plus [adj] que B", desc: "他比我高 = Il est plus grand que moi (litt. Lui COMPARER moi grand)" },
      { type: 'example', hanzi: "他比我高。", pinyin: "Tā bǐ wǒ gāo.", trans: "Il est plus grand que moi.", label: "EXEMPLE", highlight: true },
      { type: 'formula', title: "AVEC UN ÉCART PRÉCIS", part1: "A + 比 + B + Adj", part2: "+ Mesure", result: "A est plus [adj] de [X] que B", desc: "他比我高两厘米 = Il est plus grand que moi de 2 cm" },
      { type: 'example', hanzi: "北京比上海冷。", pinyin: "Běijīng bǐ Shànghǎi lěng.", trans: "Pékin est plus froid que Shanghai.", label: "COMPARAISON DE VILLES", highlight: true },
      { type: 'hack', topLabel: "PIÈGE !", gesture: "🚫", title: "N'ajoutez PAS 更", desc: "Erreur très fréquente !", tip: "❌ 他比我更高 est incorrect en comparaison simple. ✅ 他比我高 est correct. 更 (gèng = encore plus) s'utilise seul, sans 比 : 今天更冷 = Aujourd'hui il fait encore plus froid." },
    ]
  },
  vendredi: {
    title: "Vendredi : Arts Martiaux 武术 🥋",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🥋", title: "武术", subtitle: "WǓSHÙ", tagline: "ARTS MARTIAUX CHINOIS", content: "Kung fu, Tai-chi, Wushu... bien plus qu'un sport.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LES ORIGINES", gesture: "📜", title: "5 000 ans d'histoire", desc: "Les arts martiaux chinois", tip: "武术 (Wǔshù) désigne l'ensemble des arts martiaux chinois. 武 signifie 'martial/militaire', 术 signifie 'art/technique'. Les premières traces remontent à la Chine préhistorique, pour la chasse et la guerre." },
      { type: 'hack', topLabel: "KUNG FU", gesture: "👊", title: "功夫 (Gōngfu)", desc: "L'art du travail et de la maîtrise", tip: "功夫 signifie littéralement 'temps et effort'. C'est un terme générique pour les arts martiaux chinois. Il existe des centaines de styles : le style Shaolin (少林), l'aile-chun (咏春), le style du poing ivre..." },
      { type: 'hack', topLabel: "TAI CHI", gesture: "🌊", title: "太极拳 (Tàijí quán)", desc: "La méditation en mouvement", tip: "太极 = 'la grande polarité' (yin/yang). 拳 = 'poing/boxe'. Le Tai-chi est pratiqué tous les matins dans les parcs chinois. Excellente pour la santé, pratiqué par plus de 300 millions de personnes dans le monde." },
      { type: 'hack', topLabel: "SHAOLIN", gesture: "⛩️", title: "少林寺 (Shàolín Sì)", desc: "Le temple berceau des arts martiaux", tip: "Fondé au 5e siècle dans la province du Henan, le monastère Shaolin est considéré comme la source du Chan (Zen) et des arts martiaux. Les moines guerriers (武僧) y pratiquent depuis 1 500 ans." },
      { type: 'hack', topLabel: "LE 气 QÌ", gesture: "✨", title: "L'énergie vitale", desc: "气 : le souffle, l'énergie de vie", tip: "Concept central de la philosophie chinoise et des arts martiaux. Le Qigong (气功) est la pratique de cultivation du Qi. En maîtrisant sa respiration et son énergie intérieure, le pratiquant développe force, santé et longévité." },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"武术", sub:"Wǔshù - Arts martiaux", icon:"🥋"},
        {char:"功夫", sub:"Gōngfu - Kung Fu", icon:"👊"},
        {char:"太极拳", sub:"Tàijí quán - Tai Chi", icon:"🌊"},
        {char:"少林寺", sub:"Shàolín Sì - Temple Shaolin", icon:"⛩️"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 熟能生巧 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🎯", title: "成语", subtitle: "CHÉNGYǓ", tagline: "LA PRATIQUE REND PARFAIT", content: "Le secret de toute maîtrise, en 4 caractères.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "熟能生巧", pinyin: "Shú néng shēng qiǎo", literal: "Maîtrisé • Peut • Engendrer • Habileté", meaning: "La pratique rend parfait", equivalent: "Équivalent : C'est en forgeant qu'on devient forgeron" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "🏹", title: "Chen Yaozu, l'archer", desc: "Époque des Song (960–1279)", tip: "Un vieil homme vendait de l'huile. Il vit un soldat archer très fier de ses talents. Il plaça une pièce trouée sur le goulot d'une bouteille et versa l'huile au travers sans en répandre une seule goutte." },
      { type: 'hack', topLabel: "LA LEÇON", gesture: "💡", title: "熟能生巧", desc: "Le secret de l'excellence", tip: "Le vieil homme dit : '我亦无他，惟手熟尔' — 'Je n'ai pas de secret, mes mains sont juste habituées.' La maîtrise n'est pas un don : c'est le résultat de la pratique répétée et patiente." },
      { type: 'example', hanzi: "只要坚持练习，熟能生巧。", pinyin: "Zhǐyào jiānchí liànxí, shú néng shēng qiǎo.", trans: "Du moment qu'on persévère dans la pratique, l'habileté viendra.", label: "UTILISATION", highlight: true },
    ]
  }
};

const dayLogos = {
  lundi: "/logos/logo_asian-red.png",
  mercredi: "/logos/logo_jade-green.png",
  vendredi: "/logos/logo_sunset-orange.png",
  dimanche: "/logos/logo_ocean-blue.png"
};

export default function App() {
  const [day, setDay] = useState('lundi');
  const [activeSlide, setActiveSlide] = useState(0);
  const [logoUrl, setLogoUrl] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const currentData = contentData[day];
  const themeColor = currentData.color;
  const currentLogo = logoUrl || dayLogos[day] || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO";

  useEffect(() => {
    if (window.html2canvas) { setScriptLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleLogoUpload = (e) => { const f = e.target.files[0]; if (f) setLogoUrl(URL.createObjectURL(f)); };

  const handleDownload = async (index, e) => {
    e.preventDefault(); e.stopPropagation();
    if (!scriptLoaded || !window.html2canvas) { alert("Chargement en cours..."); return; }
    setIsDownloading(index);
    const element = document.getElementById(`slide-${index}`);
    if (element) {
      try {
        const canvas = await window.html2canvas(element, { useCORS: true, scale: 2.16, width: 500, height: 500, backgroundColor: '#ffffff', logging: false, scrollX: 0, scrollY: 0, windowWidth: 500, windowHeight: 500 });
        canvas.toBlob((blob) => {
          if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.download = `xiaolearn-S8-${day}-${index + 1}.png`; link.href = url; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }
          setIsDownloading(false);
        }, 'image/png');
      } catch (err) { console.error(err); setIsDownloading(false); }
    } else { setIsDownloading(false); }
  };

  return (
    <div className="xiao-posts-theme min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      <div className="xiao-control-panel bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <PandaLogo className="w-12 h-12 border shadow-sm" src={currentLogo}/>
            {!logoUrl && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 8</h1>
            <label className="cursor-pointer text-xs text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1 mt-1">
              <Upload size={12} />{logoUrl ? "Changer le logo" : "Importer votre logo ici"}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 bg-gray-50 rounded-lg p-1.5 border border-gray-100">
          {Object.keys(contentData).map(k => (
            <button key={k} onClick={() => { setDay(k); setActiveSlide(0); }} className={`xiao-day-pill px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${day === k ? 'bg-white shadow text-gray-800 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}>{k}</button>
          ))}
        </div>
      </div>
      <div className="max-w-2xl text-center mb-6">
        <p className="xiao-hint text-xs text-gray-500 flex items-center justify-center gap-1"><Info size={12}/> Téléchargement calibré pour Instagram (1080x1080px).</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {currentData.slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center group/slide relative">
            <div id={`slide-${index}`} onClick={() => setActiveSlide(index)}
              className={`xiao-slide relative bg-white shadow-lg overflow-hidden flex flex-col cursor-pointer ${activeSlide === index ? 'is-active' : ''}`}
              style={{ width: '500px', height: '500px', border: activeSlide === index ? `3px solid ${themeColor}` : '1px solid rgba(148,163,184,0.4)', '--theme-color': themeColor, '--theme-soft': `${themeColor}22` }}>

              <div className="absolute top-6 left-6 flex items-center gap-2 opacity-90 z-20">
                <PandaLogo className="w-8 h-8 shadow-sm rounded-full bg-white p-0.5" src={currentLogo} />
                <span className="xiao-brand text-[10px] font-bold tracking-widest">XIAOLEARN</span>
              </div>

              {slide.type === 'cover' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center relative">
                  <div className="absolute top-0 right-0 w-36 h-36 opacity-10 rounded-bl-full" style={{background: themeColor}}></div>
                  <div className="text-6xl mb-5">{slide.icon}</div>
                  <h2 className="text-4xl font-black text-gray-800 leading-tight mb-2">{slide.title}</h2>
                  <h2 className="text-2xl font-black mb-6 leading-none" style={{color: themeColor}}>{slide.subtitle}</h2>
                  <div className="w-14 h-1.5 mb-6 rounded" style={{background: themeColor}}></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{slide.tagline}</p>
                  <p className="text-gray-600 font-medium text-base">{slide.content}</p>
                  <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
                    <span className="font-bold text-xs px-4 py-2 rounded-full border bg-gray-50 whitespace-nowrap" style={{color: themeColor, borderColor: themeColor+'40'}}>{slide.footer}</span>
                  </div>
                </div>
              )}

              {slide.type === 'vocab' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                  <div className="absolute top-6 right-6 z-20">
                    <span className="xiao-vocab-badge text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{background: themeColor}}>HSK {slide.hsk}</span>
                  </div>
                  <h2 className="xiao-vocab-hanzi text-7xl text-gray-800 mb-2">{slide.hanzi}</h2>
                  <p className="text-lg font-medium text-gray-500 mb-1">{slide.pinyin}</p>
                  <p className="text-xl font-bold text-gray-800 mb-4">{slide.meaning}</p>
                  {slide.radicals && <p className="xiao-vocab-radical text-xs mb-4 px-3 py-1 rounded-full bg-red-50 border border-red-100">{slide.radicals}</p>}
                  <div className="w-full bg-gray-50 p-4 rounded-xl border-l-4 text-left shadow-sm" style={{borderColor: themeColor}}>
                    <p className="font-bold text-base text-gray-800 mb-1">{slide.example}</p>
                    <p className="text-sm text-gray-500 italic mb-1">{slide.exPinyin}</p>
                    <p className="text-sm font-medium" style={{color: themeColor}}>{slide.exTrans}</p>
                  </div>
                </div>
              )}

              {slide.type === 'chengyu' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                  <h2 className="xiao-chengyu-chars text-6xl text-gray-800 mb-4">{slide.chars}</h2>
                  <p className="text-base font-medium text-gray-500 mb-3">{slide.pinyin}</p>
                  <div className="w-12 h-1 rounded mb-4" style={{background: themeColor}}></div>
                  <p className="xiao-chengyu-literal text-sm text-gray-400 mb-3">{slide.literal}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-3">{slide.meaning}</p>
                  <p className="text-sm font-medium px-4 py-2 rounded-full bg-gray-50 border border-gray-100" style={{color: themeColor}}>{slide.equivalent}</p>
                </div>
              )}

              {slide.type === 'formula' && (
                <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-8">{slide.title}</h3>
                  <div className="flex items-center gap-2 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-600">{slide.part1}</span>
                    <span className="font-bold text-xl" style={{color: themeColor}}>{slide.part2}</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">👇</div>
                  <div className="font-black text-2xl text-gray-800 bg-red-50 px-6 py-2 rounded-full border border-red-100">{slide.result}</div>
                  <p className="mt-8 text-xs text-gray-400 italic">{slide.desc}</p>
                </div>
              )}

              {slide.type === 'example' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{slide.label}</span>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h2>
                  <p className="text-gray-500 italic mb-5 text-base">{slide.pinyin}</p>
                  <p className={`font-bold text-base px-5 py-2.5 rounded-lg ${slide.highlight ? 'text-white' : 'text-gray-600 bg-gray-50'}`} style={slide.highlight ? {background: themeColor} : {}}>{slide.trans}</p>
                </div>
              )}

              {slide.type === 'list' && (
                <div className="flex-1 flex flex-col px-7 pt-12 pb-6">
                  <h3 className="text-lg font-black text-center text-gray-800 mb-4">{slide.title}</h3>
                  <div className="flex flex-col gap-1.5">
                    {slide.items.map((it, i) => (
                      <div key={i} className="flex items-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-xl w-9 text-center mr-3">{it.icon}</span>
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-800 block text-base">{it.char}</span>
                          <span className="text-xs text-gray-400">{it.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'hack' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                  {slide.topLabel && <h3 className="xiao-toplabel text-xs font-bold uppercase tracking-widest mb-4 border-b-2 pb-1.5" style={{color: themeColor, borderColor: themeColor+'30'}}>{slide.topLabel}</h3>}
                  <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center text-6xl mb-5 border-4 border-white shadow-lg font-bold">{slide.gesture}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{slide.title}</h2>
                  <p className="text-gray-500 font-medium mb-4 text-base">{slide.desc}</p>
                  <p className="bg-white text-gray-600 text-sm italic p-4 rounded-xl border-l-4 shadow-sm text-left w-full" style={{borderColor: themeColor}}>{slide.tip}</p>
                </div>
              )}

              {slide.type === 'cta' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center" style={{background: themeColor}}>
                  <div className="bg-white p-4 rounded-full mb-6 shadow-2xl"><PandaLogo className="w-16 h-16" src={currentLogo} /></div>
                  <h2 className="text-2xl font-black text-white mb-2">{slide.title}</h2>
                  <h3 className="text-xl font-bold text-white opacity-90 mb-6">{slide.subtitle}</h3>
                  <div className="bg-white px-6 py-2.5 rounded-full font-bold shadow-lg uppercase text-xs" style={{color: themeColor}}>{slide.button}</div>
                </div>
              )}

              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
                {currentData.slides.map((_, dotIndex) => {
                  const isCta = slide.type === 'cta'; const isActive = dotIndex === index;
                  return <div key={dotIndex} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: isCta ? (isActive ? 'white' : 'rgba(255,255,255,0.4)') : (isActive ? themeColor : '#e5e7eb') }}></div>;
                })}
              </div>
            </div>
            <button onClick={(e) => handleDownload(index, e)} disabled={isDownloading !== false}
              className="xiao-download mt-3 flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all opacity-0 group-hover/slide:opacity-100 disabled:opacity-50">
              {isDownloading === index ? <Loader className="animate-spin" size={16} /> : <Download size={16} />}
              {isDownloading === index ? "Génération..." : "Télécharger"}
            </button>
            <p className="mt-2 text-xs font-bold text-gray-400 group-hover/slide:opacity-0 transition-opacity">SLIDE {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
