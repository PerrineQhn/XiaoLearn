import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"} alt="XiaoLearn Logo" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
  </div>
);

// --- DONNÉES SEMAINE 3 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Les Émotions 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "😊", title: "LES ÉMOTIONS", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1-2", content: "5 mots pour exprimer ce que vous ressentez.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "高兴", pinyin: "Gāoxìng", meaning: "Content / Joyeux", hsk: 1, example: "我很高兴认识你。", exPinyin: "Wǒ hěn gāoxìng rènshi nǐ.", exTrans: "Enchanté de vous connaître.", radicals: "高 (haut) + 兴 (enthousiasme)" },
      { type: 'vocab', hanzi: "难过", pinyin: "Nánguò", meaning: "Triste", hsk: 2, example: "他很难过。", exPinyin: "Tā hěn nánguò.", exTrans: "Il est très triste.", radicals: "难 (difficile) + 过 (passer)" },
      { type: 'vocab', hanzi: "生气", pinyin: "Shēngqì", meaning: "En colère", hsk: 2, example: "妈妈生气了。", exPinyin: "Māma shēngqì le.", exTrans: "Maman est en colère.", radicals: "生 (naître) + 气 (énergie/air)" },
      { type: 'vocab', hanzi: "害怕", pinyin: "Hàipà", meaning: "Avoir peur", hsk: 2, example: "我害怕蛇。", exPinyin: "Wǒ hàipà shé.", exTrans: "J'ai peur des serpents.", radicals: "害 (nuire) + 怕 (craindre)" },
      { type: 'vocab', hanzi: "累", pinyin: "Lèi", meaning: "Fatigué", hsk: 2, example: "今天我很累。", exPinyin: "Jīntiān wǒ hěn lèi.", exTrans: "Aujourd'hui je suis très fatigué.", radicals: "田 (champ) + 糸 (fil) → travailler jusqu'à l'épuisement" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"高兴", sub:"Gāoxìng - Joyeux", icon:"😊"},
        {char:"难过", sub:"Nánguò - Triste", icon:"😢"},
        {char:"生气", sub:"Shēngqì - En colère", icon:"😠"},
        {char:"害怕", sub:"Hàipà - Avoir peur", icon:"😱"},
        {char:"累", sub:"Lèi - Fatigué", icon:"😴"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : Bù 不 vs Méi 没 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🚫", title: "DIRE NON", subtitle: "BÙ OU MÉI ?", tagline: "GRAMMAIRE HSK 1", content: "L'erreur n°1 des francophones.", footer: "SWIPE 👉" },
      { type: 'vs', icon: "🙅", header: "PRÉSENT / FUTUR / VOLONTÉ", hanzi: "不 (Bù)", pinyin: "Négation standard", meaning: "Ne pas (vouloir / être / habitude)", bg: "#2F9D8A" },
      { type: 'example', hanzi: "我不吃肉", pinyin: "Wǒ bù chī ròu", trans: "Je ne mange pas de viande (habitude/volonté).", label: "UTILISATION DE BÙ", highlight: true },
      { type: 'vs', icon: "⏪", header: "PASSÉ / POSSESSION", hanzi: "没 (Méi)", pinyin: "Négation du passé ou de 有", meaning: "Ne pas avoir (fait) / Ne pas avoir", bg: "#F43F5E" },
      { type: 'example', hanzi: "我没吃肉", pinyin: "Wǒ méi chī ròu", trans: "Je n'ai pas mangé de viande (ce midi).", label: "UTILISATION DE MÉI", highlight: true },
      { type: 'hack', topLabel: "RÈGLE D'OR", gesture: "💰", title: "Avoir (有 Yǒu)", desc: "Toujours avec 没 !", tip: "我没有钱 (Wǒ méi yǒu qián) = Je n'ai pas d'argent. On dit jamais 不有 !" },
      { type: 'list', title: "RÉSUMÉ", items: [
        {char:"不 (Bù)", sub:"Présent / Futur / Habitude", icon:"🙅"},
        {char:"没 (Méi)", sub:"Passé / Possession", icon:"📭"}
      ]},
    ]
  },
  vendredi: {
    title: "Vendredi : Fête de la Lune 🌕",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🌕", title: "中秋节", subtitle: "ZHŌNGQIŪJIÉ", tagline: "FÊTE DE LA MI-AUTOMNE", content: "La fête des familles réunies sous la lune.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LA DATE", gesture: "📅", title: "Calendrier lunaire", desc: "15e jour du 8e mois lunaire", tip: "En septembre ou octobre selon l'année. La nuit où la lune est la plus ronde et brillante de l'année." },
      { type: 'hack', topLabel: "LE SYMBOLE", gesture: "🥮", title: "月饼 (Yuèbǐng)", desc: "Gâteaux de lune", tip: "Ronds comme la pleine lune, fourrés aux graines de lotus, pâte de haricots rouges ou jaune d'œuf salé. On les offre à la famille et aux amis." },
      { type: 'hack', topLabel: "LA LÉGENDE", gesture: "🧝‍♀️", title: "嫦娥 (Cháng'é)", desc: "La femme qui vit sur la lune", tip: "Cháng'é a avalé l'élixir d'immortalité de son mari pour le sauver. Elle s'est envolée vers la lune où elle vit seule avec le lapin de jade." },
      { type: 'hack', topLabel: "LE LAPIN", gesture: "🐇", title: "玉兔 (Yùtù)", desc: "Le lapin de jade", tip: "Compagnon de Cháng'é, il prépare l'élixir d'immortalité sur la lune. On peut voir sa silhouette dans les ombres de la pleine lune !" },
      { type: 'hack', topLabel: "LA VALEUR", gesture: "👨‍👩‍👧", title: "团圆 (Tuányuán)", desc: "Réunion familiale", tip: "La lune pleine symbolise la complétude et l'unité. Toute la famille se réunit pour contempler la lune ensemble. Moment de nostalgie pour les expatriés." },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"中秋节", sub:"Zhōngqiūjié - Fête de la Lune", icon:"🌕"},
        {char:"月饼", sub:"Yuèbǐng - Gâteau de lune", icon:"🥮"},
        {char:"嫦娥", sub:"Cháng'é - La fée de la lune", icon:"🧝‍♀️"},
        {char:"团圆", sub:"Tuányuán - Réunion familiale", icon:"👨‍👩‍👧"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 画蛇添足 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🐍", title: "成语", subtitle: "CHÉNGYǓ", tagline: "QUAND ON EN FAIT TROP", content: "Une leçon vieille de 2000 ans.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "画蛇添足", pinyin: "Huà shé tiān zú", literal: "Dessiner • Serpent • Ajouter • Pattes", meaning: "En faire trop / Gâcher en voulant bien faire", equivalent: "Équivalent : La perfection gâche l'œuvre" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "Le concours de dessin", desc: "Texte de Zhànguócè (IIIe s. av. J.-C.)", tip: "Lors d'un concours : le premier à dessiner un serpent gagnerait une jarre de vin. Le gagnant était si rapide qu'il ajouta des pattes... L'arbitre lui retira la victoire : un serpent n'a pas de pattes !" },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "画(dessiner) 蛇(serpent) 添(ajouter) 足(pieds/pattes)", tip: "Dessiner un serpent et lui ajouter des pattes = faire quelque chose d'inutile qui ruine le résultat." },
      { type: 'example', hanzi: "你说得够了，别画蛇添足。", pinyin: "Nǐ shuō de gòu le, bié huà shé tiān zú.", trans: "Tu en as assez dit, n'en rajoute pas.", label: "UTILISATION", highlight: true },
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
          if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.download = `xiaolearn-S3-${day}-${index + 1}.png`; link.href = url; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }
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
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 3</h1>
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

              {/* HEADER */}
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
