import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

// --- LOGO PANDA (IMAGE) ---
const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center shadow-sm`}>
    <img
      src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"}
      alt="XiaoLearn Logo"
      crossOrigin="anonymous"
      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
    />
  </div>
);

// --- DONNÉES SEMAINE 5 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Les Transports",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🚗", title: "Se Déplacer", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1-2", content: "Les 5 mots essentiels des transports.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "车", pinyin: "Chē", meaning: "Voiture", hsk: 1, example: "我坐车去上班。", exPinyin: "Wǒ zuò chē qù shàngbān.", exTrans: "Je prends la voiture pour aller au travail.", radicals: "Pictogramme ancien d'un char" },
      { type: 'vocab', hanzi: "火车", pinyin: "Huǒchē", meaning: "Train", hsk: 2, example: "火车很快。", exPinyin: "Huǒchē hěn kuài.", exTrans: "Le train est rapide.", radicals: "火(feu)+车(véhicule)" },
      { type: 'vocab', hanzi: "飞机", pinyin: "Fēijī", meaning: "Avion", hsk: 1, example: "我坐飞机去北京。", exPinyin: "Wǒ zuò fēijī qù Běijīng.", exTrans: "Je prends l'avion pour Pékin.", radicals: "飞(voler)+机(machine)" },
      { type: 'vocab', hanzi: "地铁", pinyin: "Dìtiě", meaning: "Métro", hsk: 2, example: "地铁很方便。", exPinyin: "Dìtiě hěn fāngbiàn.", exTrans: "Le métro est pratique.", radicals: "地(terre)+铁(fer)" },
      { type: 'vocab', hanzi: "出租车", pinyin: "Chūzūchē", meaning: "Taxi", hsk: 2, example: "我们打出租车吧。", exPinyin: "Wǒmen dǎ chūzūchē ba.", exTrans: "Prenons un taxi.", radicals: "出(sortir)+租(louer)+车(véhicule)" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"车", sub:"Chē - Voiture", icon:"🚗"},
        {char:"火车", sub:"Huǒchē - Train", icon:"🚄"},
        {char:"飞机", sub:"Fēijī - Avion", icon:"✈️"},
        {char:"地铁", sub:"Dìtiě - Métro", icon:"🚇"},
        {char:"出租车", sub:"Chūzūchē - Taxi", icon:"🚕"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : La Date & l'Heure",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "📅", title: "DIRE LA", subtitle: "DATE", tagline: "GRAMMAIRE HSK 1", content: "La logique de l'entonnoir chinois.", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "LA LOGIQUE", gesture: "🔻", title: "L'Entonnoir", desc: "Du + Grand au + Petit", tip: "Année → Mois → Jour. L'inverse du français !" },
      { type: 'example', hanzi: "2024年", pinyin: "Èr líng èr sì nián", trans: "Année 2024", label: "ÉTAPE 1" },
      { type: 'example', hanzi: "3月", pinyin: "Sān yuè", trans: "Mars / 3e mois", label: "ÉTAPE 2" },
      { type: 'example', hanzi: "15日", pinyin: "Shíwǔ rì", trans: "15e jour", label: "ÉTAPE 3" },
      { type: 'vs', icon: "🇨🇳", header: "RÉSULTAT FINAL", hanzi: "2024年3月15日", pinyin: "Année / Mois / Jour", meaning: "L'inverse du français !", bg: "#2F9D8A" },
      { type: 'hack', topLabel: "POUR LE JOUR", gesture: "🗣️", title: "Rì 日 vs Hào 号", desc: "Écrit vs Oral", tip: "À l'écrit: 日 (Rì). À l'oral: 号 (Hào). Ex: 15号" },
    ]
  },
  vendredi: {
    title: "Vendredi : 微信 & la Chine Connectée",
    color: "#F97316",
    slides: [
      { type: 'cover', iconImg: "/wechat-logo.png", title: "微信", subtitle: "WĒIXÌN", tagline: "LA VIE NUMÉRIQUE EN CHINE", content: "L'app qui remplace tout.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "L'APP REINE", gesture: "💬", title: "微信 (Wēixìn) WeChat", desc: "L'app incontournable", tip: "Messagerie, paiement, réseaux sociaux, tout-en-un. 1,3 milliard d'utilisateurs." },
      { type: 'hack', topLabel: "SCANNER", gesture: "📷", title: "扫码 (Sǎo mǎ)", desc: "Scanner un QR code", tip: "En Chine on scanne pour TOUT: payer, commander, prendre le métro, se faire des amis." },
      { type: 'hack', topLabel: "ARGENT", gesture: "🧧", title: "红包 (Hóngbāo)", desc: "Enveloppes rouges digitales", tip: "On s'envoie de l'argent par WeChat. Très populaire pendant le Nouvel An." },
      { type: 'hack', topLabel: "LIVRAISON", gesture: "🛵", title: "外卖 (Wàimài)", desc: "Livraison de repas", tip: "Tout se livre en 30 min. Les livreurs en jaune (Meituan) ou bleu (Ele.me) sont partout." },
      { type: 'hack', topLabel: "MOBILITÉ", gesture: "🚲", title: "共享单车 (Gòngxiǎng dānchē)", desc: "Vélos partagés", tip: "Des millions de vélos en libre-service dans toutes les villes chinoises." },
      { type: 'list', title: "MOTS CLÉS", items: [
        {char:"微信", sub:"WeChat", icon:"💬"},
        {char:"扫码", sub:"Scanner", icon:"📷"},
        {char:"外卖", sub:"Livraison", icon:"🛵"},
        {char:"共享", sub:"Partager", icon:"🤝"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 塞翁失马",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🐴", title: "成语", subtitle: "CHÉNGYǓ", tagline: "À QUELQUE CHOSE MALHEUR EST BON", content: "Un proverbe vieux de 2000 ans.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "塞翁失马", pinyin: "Sài wēng shī mǎ", literal: "Frontière • Vieillard • Perdre • Cheval", meaning: "À quelque chose malheur est bon", equivalent: "Équivalent : Every cloud has a silver lining" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "Le Vieillard à la Frontière", desc: "Qui sait si c'est un malheur ?", tip: "Un vieillard à la frontière perd son cheval. Ses voisins le plaignent. Il dit \"Qui sait si c'est un malheur ?\". Le cheval revient avec un autre. Son fils monte le nouveau cheval, tombe et se casse la jambe. \"Qui sait ?\". La guerre éclate, tous les jeunes partent, sauf le fils blessé." },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "塞(frontière) 翁(vieillard) 失(perdre) 马(cheval)", tip: "Chaque caractère raconte une partie de l'histoire du proverbe." },
      { type: 'example', hanzi: "塞翁失马，焉知非福。", pinyin: "Sài wēng shī mǎ, yān zhī fēi fú.", trans: "Le vieillard perd son cheval, qui sait si ce n'est pas une bénédiction ?", label: "UTILISATION", highlight: true },
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
    if (window.html2canvas) {
        setScriptLoaded(true);
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const handleDownload = async (index, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!scriptLoaded || !window.html2canvas) {
        alert("Outil de téléchargement en cours de chargement...");
        return;
    }

    setIsDownloading(index);
    const element = document.getElementById(`slide-${index}`);

    if (element) {
      try {
        const canvas = await window.html2canvas(element, {
          useCORS: true,
          scale: 2.16, // 500px * 2.16 = 1080px
          width: 500,
          height: 500,
          backgroundColor: '#ffffff',
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 500,
          windowHeight: 500
        });

        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `xiaolearn-S5-${day}-carré-${index + 1}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
            setIsDownloading(false);
        }, 'image/png');

      } catch (err) {
        console.error("Erreur téléchargement", err);
        setIsDownloading(false);
      }
    } else {
        setIsDownloading(false);
    }
  };

  return (
    <div className="xiao-posts-theme min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">

      {/* MENU */}
      <div className="xiao-control-panel bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-4">
            <div className="relative group">
                <PandaLogo className="w-12 h-12 border shadow-sm" src={currentLogo}/>
                 {!logoUrl && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 5 (Format Carré)</h1>
                 <label className="cursor-pointer text-xs text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1 mt-1">
                    <Upload size={12} />
                    {logoUrl ? "Changer le logo" : "Importer votre logo ici"}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
            </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 bg-gray-50 rounded-lg p-1.5 border border-gray-100">
          {Object.keys(contentData).map(k => (
            <button
              key={k}
              onClick={() => { setDay(k); setActiveSlide(0); }}
              className={`xiao-day-pill px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${day === k ? 'bg-white shadow text-gray-800 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl text-center mb-6">
          <p className="xiao-hint text-xs text-gray-500 flex items-center justify-center gap-1">
              <Info size={12}/> Téléchargement calibré pour Instagram (1080x1080px).
          </p>
      </div>

      {/* GRILLE SLIDES */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {currentData.slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center group/slide relative">

            {/* CONTAINER DU SLIDE CARRÉ (500x500) */}
            <div
              id={`slide-${index}`}
              onClick={() => setActiveSlide(index)}
              className={`xiao-slide relative bg-white shadow-lg overflow-hidden flex flex-col cursor-pointer ${activeSlide === index ? 'is-active' : ''}`}
              style={{
                width: '500px',
                height: '500px', // CARRÉ
                border: activeSlide === index ? `3px solid ${themeColor}` : '1px solid rgba(148, 163, 184, 0.4)',
                '--theme-color': themeColor,
                '--theme-soft': `${themeColor}22`
              }}
            >
              {/* HEADER */}
              <div className="absolute top-6 left-6 flex items-center gap-2 opacity-90 z-20">
                <PandaLogo className="w-8 h-8 shadow-sm rounded-full bg-white p-0.5" src={currentLogo} />
                <span className="xiao-brand text-[10px] font-bold tracking-widest text-gray-500">XIAOLEARN</span>
              </div>

              {/* COVER */}
              {slide.type === 'cover' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center relative">
                  <div className="absolute top-0 right-0 w-36 h-36 opacity-10 rounded-bl-full" style={{background: themeColor}}></div>
                  {slide.iconImg
                    ? <img src={slide.iconImg} alt="icon" crossOrigin="anonymous" className="w-20 h-20 mb-5 object-contain" />
                    : <div className="text-6xl mb-5">{slide.icon}</div>
                  }
                  <h2 className="text-4xl font-black text-gray-800 leading-tight mb-2">{slide.title}</h2>
                  <h2 className="text-2xl font-black mb-6 leading-none" style={{color: themeColor}}>{slide.subtitle}</h2>
                  <div className="w-14 h-1.5 mb-6 rounded" style={{background: themeColor}}></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{slide.tagline}</p>
                  <p className="text-gray-600 font-medium text-base">{slide.content}</p>

                  {/* FOOTER */}
                  <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
                     <span className="font-bold text-xs px-4 py-2 rounded-full border bg-gray-50 whitespace-nowrap" style={{color: themeColor, borderColor: themeColor+'40'}}>
                        {slide.footer}
                     </span>
                  </div>
                </div>
              )}

              {/* VOCAB */}
              {slide.type === 'vocab' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                  <div className="absolute top-6 right-6 z-20">
                    <span className="xiao-vocab-badge text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{background: themeColor}}>HSK {slide.hsk}</span>
                  </div>
                  <h2 className="xiao-vocab-hanzi text-7xl text-gray-800 mb-2">{slide.hanzi}</h2>
                  <p className="text-lg font-medium text-gray-500 mb-1">{slide.pinyin}</p>
                  <p className="text-xl font-bold text-gray-800 mb-4">{slide.meaning}</p>
                  {slide.radicals && (
                    <p className="xiao-vocab-radical text-xs mb-4 px-3 py-1 rounded-full bg-red-50 border border-red-100">{slide.radicals}</p>
                  )}
                  <div className="w-full bg-gray-50 p-4 rounded-xl border-l-4 text-left shadow-sm" style={{borderColor: themeColor}}>
                    <p className="font-bold text-base text-gray-800 mb-1">{slide.example}</p>
                    <p className="text-sm text-gray-500 italic mb-1">{slide.exPinyin}</p>
                    <p className="text-sm font-medium" style={{color: themeColor}}>{slide.exTrans}</p>
                  </div>
                </div>
              )}

              {/* CHENGYU */}
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

              {/* FORMULA */}
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

              {/* EXAMPLE */}
              {slide.type === 'example' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{slide.label}</span>
                   <h2 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h2>
                   <p className="text-gray-500 italic mb-5 text-base">{slide.pinyin}</p>
                   <p className={`font-bold text-base px-5 py-2.5 rounded-lg ${slide.highlight ? 'text-white' : 'text-gray-600 bg-gray-50'}`} style={slide.highlight ? {background: themeColor} : {}}>
                     {slide.trans}
                   </p>
                </div>
              )}

              {/* VS */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-10 text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-8xl mb-6">{slide.icon}</div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
                  <p className="text-lg text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-xl text-white font-bold text-xl shadow-lg" style={{background: slide.bg}}>{slide.meaning}</div>
                </div>
              )}

              {/* LIST */}
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

              {/* HACK */}
              {slide.type === 'hack' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                   {slide.topLabel && <h3 className="xiao-toplabel text-xs font-bold uppercase tracking-widest mb-4 border-b-2 pb-1.5" style={{color: themeColor, borderColor: themeColor+'30'}}>{slide.topLabel}</h3>}

                   {slide.gesture ? (
                      <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center text-6xl mb-5 shadow-inner text-gray-800 border-4 border-white shadow-lg font-bold">
                        {slide.gesture}
                      </div>
                   ) : (
                      <div className="text-6xl mb-5">{slide.icon}</div>
                   )}

                   <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{slide.title}</h2>
                   <p className="text-gray-500 font-medium mb-4 text-base">{slide.desc}</p>
                   <p className="bg-white text-gray-600 text-sm italic p-4 rounded-xl border-l-4 shadow-sm text-left w-full" style={{borderColor: themeColor}}>
                     💡 {slide.tip}
                   </p>
                </div>
              )}

              {/* CTA */}
              {slide.type === 'cta' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center" style={{background: themeColor}}>
                  <div className="bg-white p-4 rounded-full mb-6 shadow-2xl"><PandaLogo className="w-16 h-16" src={currentLogo} /></div>
                  <h2 className="text-2xl font-black text-white mb-2">{slide.title}</h2>
                  <h3 className="text-xl font-bold text-white opacity-90 mb-6">{slide.subtitle}</h3>
                  <div className="bg-white px-6 py-2.5 rounded-full font-bold shadow-lg uppercase text-xs cursor-pointer hover:bg-gray-50 transition-colors" style={{color: themeColor}}>{slide.button}</div>
                </div>
              )}

              {/* DOTS */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20">
                  {currentData.slides.map((_, dotIndex) => {
                     const isCta = slide.type === 'cta';
                     const isActive = dotIndex === index;
                     let bgColor;
                     if (isCta) { bgColor = isActive ? 'white' : 'rgba(255,255,255, 0.4)'; }
                     else { bgColor = isActive ? themeColor : '#e5e7eb'; }
                     return (<div key={dotIndex} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: bgColor }}></div>);
                  })}
              </div>

            </div>

            {/* BOUTON DE TÉLÉCHARGEMENT */}
            <button
               onClick={(e) => handleDownload(index, e)}
               disabled={isDownloading !== false}
               className="xiao-download mt-3 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all opacity-0 group-hover/slide:opacity-100 disabled:opacity-50"
            >
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
