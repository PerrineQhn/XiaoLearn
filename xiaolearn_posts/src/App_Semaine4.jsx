import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"} alt="XiaoLearn Logo" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
  </div>
);

// --- DONNÉES SEMAINE 4 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Au Restaurant 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🍜", title: "AU RESTAURANT", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1-2", content: "5 mots indispensables pour bien manger.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "米饭", pinyin: "Mǐfàn", meaning: "Riz (cuit)", hsk: 1, example: "我要一碗米饭。", exPinyin: "Wǒ yào yī wǎn mǐfàn.", exTrans: "Je voudrais un bol de riz.", radicals: "米 (grain de riz) + 饭 (repas)" },
      { type: 'vocab', hanzi: "面条", pinyin: "Miàntiáo", meaning: "Nouilles", hsk: 2, example: "这碗面条很好吃。", exPinyin: "Zhè wǎn miàntiáo hěn hǎochī.", exTrans: "Ces nouilles sont délicieuses.", radicals: "面 (farine/visage) + 条 (bande/longue)" },
      { type: 'vocab', hanzi: "筷子", pinyin: "Kuàizi", meaning: "Baguettes", hsk: 2, example: "你会用筷子吗？", exPinyin: "Nǐ huì yòng kuàizi ma?", exTrans: "Sais-tu utiliser les baguettes ?", radicals: "筷 = 竹 (bambou) + 快 (rapide)" },
      { type: 'vocab', hanzi: "菜单", pinyin: "Càidān", meaning: "Menu", hsk: 2, example: "请给我看菜单。", exPinyin: "Qǐng gěi wǒ kàn càidān.", exTrans: "Le menu, s'il vous plaît.", radicals: "菜 (légume/plat) + 单 (simple/liste)" },
      { type: 'vocab', hanzi: "好吃", pinyin: "Hǎochī", meaning: "Délicieux", hsk: 1, example: "这个菜很好吃！", exPinyin: "Zhège cài hěn hǎochī!", exTrans: "Ce plat est délicieux !", radicals: "好 (bien/bon) + 吃 (manger)" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"米饭", sub:"Mǐfàn - Riz cuit", icon:"🍚"},
        {char:"面条", sub:"Miàntiáo - Nouilles", icon:"🍜"},
        {char:"筷子", sub:"Kuàizi - Baguettes", icon:"🥢"},
        {char:"菜单", sub:"Càidān - Menu", icon:"📋"},
        {char:"好吃", sub:"Hǎochī - Délicieux", icon:"😋"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : Les Classificateurs 量词 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🔢", title: "量词", subtitle: "LIÀNGCÍ", tagline: "GRAMMAIRE HSK 1-2", content: "En chinois, on ne compte pas sans classificateur !", footer: "SWIPE 👉" },
      { type: 'formula', title: "LA RÈGLE", part1: "Nombre", part2: "+ 量词 + Nom", result: "= Correct ✓", desc: "On ne peut pas dire 'un livre' directement. Il faut 'un [volume] livre'." },
      { type: 'hack', topLabel: "UNIVERSEL", gesture: "👤", title: "个 (Gè)", desc: "Le classificateur passe-partout", tip: "一个人 (yī gè rén) = une personne. En cas de doute, utilisez 个 — il fonctionne pour presque tout !" },
      { type: 'hack', topLabel: "LIVRES & CAHIERS", gesture: "📚", title: "本 (Běn)", desc: "Pour les volumes reliés", tip: "两本书 (liǎng běn shū) = deux livres. 三本杂志 = trois magazines. 本 vient de 'racine d'arbre' → base → volume." },
      { type: 'hack', topLabel: "VERRES & TASSES", gesture: "☕", title: "杯 (Bēi)", desc: "Pour les liquides dans un contenant", tip: "一杯水 (yī bēi shuǐ) = un verre d'eau. 一杯茶 = une tasse de thé. 杯 signifie aussi 'coupe/tasse'." },
      { type: 'hack', topLabel: "SURFACES PLATES", gesture: "📄", title: "张 (Zhāng)", desc: "Pour les choses plates (papier, table, photo)", tip: "三张照片 (sān zhāng zhàopiàn) = trois photos. 一张桌子 = une table. 张 = étirer/déployer." },
      { type: 'list', title: "RÉCAP 量词", items: [
        {char:"个 Gè", sub:"Personnes, objets (universel)", icon:"👤"},
        {char:"本 Běn", sub:"Livres, cahiers", icon:"📚"},
        {char:"杯 Bēi", sub:"Verres, tasses", icon:"☕"},
        {char:"张 Zhāng", sub:"Papiers, tables, photos", icon:"📄"}
      ]},
    ]
  },
  vendredi: {
    title: "Vendredi : Calligraphie Chinoise ✍️",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "✍️", title: "书法", subtitle: "SHŪFǍ", tagline: "L'ART DE L'ÉCRITURE CHINOISE", content: "3000 ans de traits et de méditation.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "Un art millénaire", desc: "Plus de 3000 ans d'histoire", tip: "La calligraphie est considérée en Chine comme l'art suprême, au-dessus même de la peinture. Elle est indissociable de la culture lettrée chinoise." },
      { type: 'hack', topLabel: "LES 4 TRÉSORS", gesture: "🏮", title: "文房四宝 (Wénfáng Sìbǎo)", desc: "Les 4 trésors du bureau du lettré", tip: "笔 Bǐ (pinceau) + 墨 Mò (encre) + 纸 Zhǐ (papier) + 砚 Yàn (pierre à encre). Quatre outils sacrés transmis de génération en génération." },
      { type: 'hack', topLabel: "LES 5 STYLES", gesture: "🎨", title: "Les grands styles", desc: "De l'archaïque au moderne", tip: "篆书 (sceaux) → 隶书 (clercs) → 楷书 (régulier, idéal pour débuter) → 行书 (courant) → 草书 (herbe, ultra-cursif). Chaque style a son âme." },
      { type: 'hack', topLabel: "LE CARACTÈRE CLÉ", gesture: "永", title: "永 Yǒng (Éternité)", desc: "Le secret des 8 traits fondamentaux", tip: "Ce seul caractère contient les 8 coups de pinceau de base de la calligraphie. Les maîtres s'entraînent à écrire 永 pendant des années avant de passer à autre chose." },
      { type: 'hack', topLabel: "MÉDITATION", gesture: "🧘", title: "Art & Pleine conscience", desc: "Chaque trait = une respiration", tip: "La calligraphie n'est pas que de l'écriture : c'est une pratique méditative. Le calligraphe doit vider son esprit, maîtriser sa respiration et agir d'un seul geste." },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"书法", sub:"Shūfǎ - Calligraphie", icon:"✍️"},
        {char:"文房四宝", sub:"4 trésors du lettré", icon:"🏮"},
        {char:"永", sub:"Yǒng - Les 8 traits", icon:"💫"},
        {char:"笔墨纸砚", sub:"Pinceau, encre, papier, pierre", icon:"🖌️"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 对牛弹琴 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🐄", title: "成语", subtitle: "CHÉNGYǓ", tagline: "PARLER DANS LE VIDE", content: "Une leçon de communication vieille de 2000 ans.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "对牛弹琴", pinyin: "Duì niú tán qín", literal: "Face • Bœuf • Jouer • Luth", meaning: "Parler à un mur", equivalent: "Équivalent : C'est comme pisser dans un violon" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "Le musicien et le bœuf", desc: "Texte de Mouzi Lihuolun (~IIe s.)", tip: "Un musicien virtuose jouait du luth devant un bœuf. L'animal continuait de brouter tranquillement. Morale : peu importe la qualité du message, si le destinataire n'est pas réceptif." },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "对(face à) 牛(bœuf) 弹(jouer d'un instrument) 琴(instrument à cordes/luth)", tip: "Jouer du luth face à un bœuf. La beauté de la musique est perdue sur quelqu'un qui ne peut pas l'apprécier." },
      { type: 'example', hanzi: "跟他解释没用，对牛弹琴。", pinyin: "Gēn tā jiěshì méi yòng, duì niú tán qín.", trans: "Inutile de lui expliquer, c'est comme parler à un mur.", label: "UTILISATION", highlight: true },
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
          if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.download = `xiaolearn-S4-${day}-${index + 1}.png`; link.href = url; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }
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
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 4</h1>
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

              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-10 text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-8xl mb-6">{slide.icon}</div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
                  <p className="text-lg text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-xl text-white font-bold text-xl shadow-lg" style={{background: slide.bg}}>{slide.meaning}</div>
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
