import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"} alt="XiaoLearn Logo" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
  </div>
);

// --- DONNÉES SEMAINE 7 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - La Maison 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🏠", title: "LA MAISON", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1-2", content: "5 mots pour parler de chez vous.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "家", pinyin: "Jiā", meaning: "Maison / Famille / Chez soi", hsk: 1, example: "我在家。", exPinyin: "Wǒ zài jiā.", exTrans: "Je suis à la maison.", radicals: "宀 (toit) + 豕 (cochon) → Un toit avec un animal = foyer !" },
      { type: 'vocab', hanzi: "门", pinyin: "Mén", meaning: "Porte", hsk: 2, example: "请关门。", exPinyin: "Qǐng guān mén.", exTrans: "Fermez la porte s'il vous plaît.", radicals: "Pictogramme de deux battants de porte. On le retrouve dans 问(demander), 间(espace), 闻(entendre)..." },
      { type: 'vocab', hanzi: "桌子", pinyin: "Zhuōzi", meaning: "Table", hsk: 1, example: "桌子上有一本书。", exPinyin: "Zhuōzi shàng yǒu yī běn shū.", exTrans: "Il y a un livre sur la table.", radicals: "木 (bois) + composants → meuble en bois" },
      { type: 'vocab', hanzi: "椅子", pinyin: "Yǐzi", meaning: "Chaise", hsk: 2, example: "请坐椅子。", exPinyin: "Qǐng zuò yǐzi.", exTrans: "Asseyez-vous sur la chaise.", radicals: "木 (bois) + 奇 (étrange) → chaise en bois à formes étranges" },
      { type: 'vocab', hanzi: "窗户", pinyin: "Chuānghù", meaning: "Fenêtre", hsk: 2, example: "打开窗户吧。", exPinyin: "Dǎkāi chuānghù ba.", exTrans: "Ouvrons la fenêtre.", radicals: "穴 (cavité) + 囱 (cheminée) + 户 (foyer)" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"家 Jiā", sub:"Maison / Famille", icon:"🏠"},
        {char:"门 Mén", sub:"Porte", icon:"🚪"},
        {char:"桌子 Zhuōzi", sub:"Table", icon:"🪵"},
        {char:"椅子 Yǐzi", sub:"Chaise", icon:"🪑"},
        {char:"窗户 Chuānghù", sub:"Fenêtre", icon:"🪟"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : Le De 的 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🔗", title: "LE MOT", subtitle: "N°1 DU CHINOIS", tagline: "GRAMMAIRE HSK 1", content: "La particule 的 : simple mais indispensable.", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "FONCTION", gesture: "🔗", title: "的 (De)", desc: "La colle entre deux mots", tip: "的 sert à relier un possesseur à son objet, ou un adjectif à un nom. C'est l'équivalent du 'de' français ou du 's anglais." },
      { type: 'formula', title: "POSSESSION", part1: "Possesseur", part2: "+ 的 + Objet", result: "Mon / Ton / Son...", desc: "我的书 = Mon livre (litt. Moi DE livre)" },
      { type: 'example', hanzi: "我的书", pinyin: "Wǒ de shū", trans: "Mon livre", label: "POSSESSION", highlight: true },
      { type: 'formula', title: "DESCRIPTION", part1: "Adjectif", part2: "+ 的 + Nom", result: "Adjectif + Nom", desc: "红色的车 = Une voiture rouge (litt. Rouge DE voiture)" },
      { type: 'example', hanzi: "红色的车", pinyin: "Hóngsè de chē", trans: "Une voiture rouge", label: "DESCRIPTION", highlight: true },
      { type: 'hack', topLabel: "EXCEPTION", gesture: "❤️", title: "Avec les proches", desc: "On supprime souvent 的", tip: "Pour la famille et les amis proches, 的 est souvent omis. On dit 我妈妈 (Wǒ māma) plutôt que 我的妈妈. C'est une question d'affection !" },
    ]
  },
  vendredi: {
    title: "Vendredi : Festival des Bateaux-Dragons 🐉",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🐉", title: "端午节", subtitle: "DUĀNWǓJIÉ", tagline: "FESTIVAL DES BATEAUX-DRAGONS", content: "La fête du poète immortel et des dragons.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LA DATE", gesture: "📅", title: "5e jour du 5e mois lunaire", desc: "En mai ou juin", tip: "Un des 3 grands festivals nationaux chinois avec 春节 et 中秋节. Jour férié en Chine, Taïwan, Corée et Vietnam." },
      { type: 'hack', topLabel: "LE HÉROS", gesture: "📜", title: "屈原 (Qū Yuán)", desc: "Le poète patriote (340–278 av. J.-C.)", tip: "Grand poète et ministre, il fut exilé par le roi. Désespéré de voir son pays envahi, il se noya dans la rivière Miluo. Le peuple, pour sauver son corps des poissons, lança des boulettes de riz dans l'eau." },
      { type: 'hack', topLabel: "LA NOURRITURE", gesture: "🫕", title: "粽子 (Zòngzi)", desc: "Gâteaux de riz glutineux", tip: "Du riz gluant enveloppé dans des feuilles de bambou ou de roseau, ficelé et cuit à la vapeur. Farci à la viande (Nord) ou aux haricots rouges (Sud). On en offre à la famille." },
      { type: 'hack', topLabel: "LE SPECTACLE", gesture: "🚣", title: "龙舟 (Lóngzhōu)", desc: "Courses de bateaux-dragons", tip: "Des équipes de 20 pagayeurs synchronisés sur des bateaux ornés d'une tête et d'une queue de dragon. Un batteur de tambour donne le rythme. Spectacle époustouflant !" },
      { type: 'hack', topLabel: "LA PROTECTION", gesture: "🌿", title: "艾草 (Àicǎo)", desc: "L'armoise, plante protectrice", tip: "On accroche de l'armoise et du calamus sur les portes pour éloigner les mauvais esprits et les insectes nuisibles. Le 5e mois est considéré néfaste en Chine ancienne." },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"端午节", sub:"Duānwǔjié - Festival", icon:"🐉"},
        {char:"粽子", sub:"Zòngzi - Gâteau de riz", icon:"🫕"},
        {char:"龙舟", sub:"Lóngzhōu - Bateau-dragon", icon:"🚣"},
        {char:"屈原", sub:"Qū Yuán - Le poète", icon:"📜"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 入乡随俗 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🌏", title: "成语", subtitle: "CHÉNGYǓ", tagline: "S'ADAPTER PARTOUT", content: "Le conseil ultime pour le voyageur.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "入乡随俗", pinyin: "Rù xiāng suí sú", literal: "Entrer • Village • Suivre • Coutumes", meaning: "S'adapter aux coutumes locales", equivalent: "Équivalent : À Rome, fais comme les Romains" },
      { type: 'hack', topLabel: "L'USAGE", gesture: "🧳", title: "Le conseil du voyageur", desc: "Conseil fondamental en Chine", tip: "Très utilisé pour encourager les expatriés et les voyageurs à respecter les habitudes locales. En Chine, ne pas s'adapter peut être vécu comme du mépris." },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "入(entrer) 乡(village/région) 随(suivre) 俗(coutumes/mœurs)", tip: "Quand tu entres dans un village, suis ses coutumes. Une sagesse universelle qui s'applique autant au voyage qu'aux relations professionnelles." },
      { type: 'example', hanzi: "到了中国就要入乡随俗。", pinyin: "Dào le Zhōngguó jiù yào rù xiāng suí sú.", trans: "Une fois en Chine, il faut s'adapter aux coutumes locales.", label: "UTILISATION", highlight: true },
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
          if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.download = `xiaolearn-S7-${day}-${index + 1}.png`; link.href = url; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }
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
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 7</h1>
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
