import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"} alt="XiaoLearn Logo" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
  </div>
);

// --- DONNÉES SEMAINE 6 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Le Corps 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🫀", title: "LE CORPS", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1-2", content: "5 mots essentiels pour parler de votre corps.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "头", pinyin: "Tóu", meaning: "Tête", hsk: 1, example: "我头疼。", exPinyin: "Wǒ tóu téng.", exTrans: "J'ai mal à la tête.", radicals: "Pictogramme archaïque d'une tête humaine" },
      { type: 'vocab', hanzi: "手", pinyin: "Shǒu", meaning: "Main", hsk: 1, example: "请洗手。", exPinyin: "Qǐng xǐ shǒu.", exTrans: "Lavez-vous les mains s'il vous plaît.", radicals: "Pictogramme d'une main ouverte (5 traits = 5 doigts)" },
      { type: 'vocab', hanzi: "眼睛", pinyin: "Yǎnjing", meaning: "Yeux", hsk: 2, example: "她的眼睛很大。", exPinyin: "Tā de yǎnjing hěn dà.", exTrans: "Elle a de grands yeux.", radicals: "眼 = 目 (œil) + 艮 / 睛 = 目 + 青 (clair)" },
      { type: 'vocab', hanzi: "嘴", pinyin: "Zuǐ", meaning: "Bouche", hsk: 2, example: "请张开嘴。", exPinyin: "Qǐng zhāngkāi zuǐ.", exTrans: "Ouvrez la bouche s'il vous plaît.", radicals: "口 (bouche) + composants phonétiques" },
      { type: 'vocab', hanzi: "肚子", pinyin: "Dùzi", meaning: "Ventre / Estomac", hsk: 2, example: "我肚子饿了。", exPinyin: "Wǒ dùzi è le.", exTrans: "J'ai faim (litt. mon ventre a faim).", radicals: "月/肉 (chair) + 土 (terre)" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"头 Tóu", sub:"Tête", icon:"🧠"},
        {char:"手 Shǒu", sub:"Main", icon:"✋"},
        {char:"眼睛 Yǎnjing", sub:"Yeux", icon:"👀"},
        {char:"嘴 Zuǐ", sub:"Bouche", icon:"👄"},
        {char:"肚子 Dùzi", sub:"Ventre", icon:"🫃"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : Le 了 (Le) 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🔄", title: "LE MYSTÈRE", subtitle: "DU 了 (LE)", tagline: "GRAMMAIRE HSK 1", content: "Ce n'est pas seulement le passé !", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "FONCTION 1", gesture: "🆕", title: "Changement d'état", desc: "Nouvelle situation qui vient de se produire", tip: "Il ne pleuvait pas, maintenant il pleut → la situation a changé. 了 marque ce moment de bascule." },
      { type: 'example', hanzi: "下雨了", pinyin: "Xià yǔ le", trans: "Il pleut maintenant (ça vient de commencer).", label: "CHANGEMENT D'ÉTAT", highlight: true },
      { type: 'example', hanzi: "我饿了", pinyin: "Wǒ è le", trans: "J'ai faim (je suis devenu affamé).", label: "CHANGEMENT D'ÉTAT", highlight: true },
      { type: 'hack', topLabel: "FONCTION 2", gesture: "✅", title: "Action accomplie", desc: "C'est terminé, c'est fait", tip: "Proche du passé composé français. L'action est complète. 了 peut se mettre après le verbe ou à la fin de la phrase." },
      { type: 'example', hanzi: "我吃了饭", pinyin: "Wǒ chī le fàn", trans: "J'ai mangé (c'est fait).", label: "ACTION ACCOMPLIE", highlight: true },
      { type: 'hack', topLabel: "PIÈGE", gesture: "🚫", title: "Pas pour les habitudes", desc: "Ne l'utilisez pas partout", tip: "Pour les habitudes passées ('Je mangeais souvent'), on n'utilise PAS 了. Ex: 我以前每天跑步 (Je courais chaque jour avant) → pas de 了 !" },
    ]
  },
  vendredi: {
    title: "Vendredi : Médecine Traditionnelle 🏥",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🌿", title: "中医", subtitle: "ZHŌNGYĪ", tagline: "MÉDECINE TRADITIONNELLE CHINOISE", content: "2500 ans de sagesse médicale.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LES BASES", gesture: "⚡", title: "气 (Qì)", desc: "L'énergie vitale", tip: "Le Qì circule dans le corps à travers des méridiens (经络 jīngluò). La maladie est un déséquilibre du Qì. Le traitement vise à rétablir cette circulation." },
      { type: 'hack', topLabel: "L'ÉQUILIBRE", gesture: "☯️", title: "阴阳 (Yīn Yáng)", desc: "Le fondement de la MTC", tip: "Yin (froid, repos, nuit, féminin) et Yang (chaud, activité, jour, masculin). La santé = équilibre parfait. La maladie = excès d'un côté." },
      { type: 'hack', topLabel: "TRAITEMENT 1", gesture: "🪡", title: "针灸 (Zhēnjiǔ)", desc: "Acupuncture", tip: "Des aiguilles très fines insérées sur des points précis des méridiens. Reconnue par l'OMS pour traiter la douleur, les maux de tête, l'anxiété et bien plus." },
      { type: 'hack', topLabel: "TRAITEMENT 2", gesture: "🌱", title: "草药 (Cǎoyào)", desc: "Herbes médicinales", tip: "Des milliers de plantes utilisées depuis des millénaires : goji (枸杞), ginseng (人参), angélique (当归)... En infusion, soupe ou gélule." },
      { type: 'hack', topLabel: "TRAITEMENT 3", gesture: "⭕", title: "拔罐 (Báguàn)", desc: "Ventouses", tip: "Des coupelles chauffées créent une dépression sur la peau. Les marques rondes rouges que vous voyez sur des sportifs olympiques ? C'est ça !" },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"中医", sub:"Zhōngyī - Médecine trad. chinoise", icon:"🌿"},
        {char:"气", sub:"Qì - Énergie vitale", icon:"⚡"},
        {char:"针灸", sub:"Zhēnjiǔ - Acupuncture", icon:"🪡"},
        {char:"阴阳", sub:"Yīn Yáng - Équilibre", icon:"☯️"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 守株待兔 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🐇", title: "成语", subtitle: "CHÉNGYǓ", tagline: "L'ART DE NE RIEN FAIRE", content: "Attendre une chance qui ne reviendra jamais.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "守株待兔", pinyin: "Shǒu zhū dài tù", literal: "Garder • Souche • Attendre • Lapin", meaning: "Attendre sans rien faire en espérant un coup de chance", equivalent: "Équivalent : Attendre que le rôti tombe dans la bouche" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "Le fermier et le lapin", desc: "Texte de Hán Fēizǐ (~IIIe s. av. J.-C.)", tip: "Un fermier voit un lapin se fracasser la tête contre une souche et mourir. Il abandonne ses champs et attend chaque jour qu'un autre lapin vienne faire de même. Il attend en vain, ses champs tombent en friche." },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "守(garder) 株(souche d'arbre) 待(attendre) 兔(lapin)", tip: "Garder une souche en attendant un lapin = compter sur une chance qui ne se reproduira pas. Critique de la passivité et du refus de s'adapter." },
      { type: 'example', hanzi: "不要守株待兔，要自己努力。", pinyin: "Bùyào shǒu zhū dài tù, yào zìjǐ nǔlì.", trans: "N'attends pas les bras croisés, fais tes propres efforts.", label: "UTILISATION", highlight: true },
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
          if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.download = `xiaolearn-S6-${day}-${index + 1}.png`; link.href = url; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }
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
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 6</h1>
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
