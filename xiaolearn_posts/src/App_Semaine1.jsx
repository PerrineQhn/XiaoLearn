import React, { useState, useEffect } from 'react';
import { Upload, Download, Loader, Info } from 'lucide-react';

// --- LOGO PANDA (IMAGE) ---
const PandaLogo = ({ className, src }) => (
  <div className={`${className} rounded-full bg-white overflow-hidden flex items-center justify-center`}>
    <img
      src={src || "https://placehold.co/150x150/E84A4A/ffffff?text=LOGO"}
      alt="XiaoLearn Logo"
      crossOrigin="anonymous"
      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
    />
  </div>
);

// --- DONNÉES SEMAINE 1 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - Se Pr\u00e9senter 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🤝", title: "SE PRÉSENTER", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1", content: "Les 5 mots essentiels pour dire bonjour.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "你好", pinyin: "N\u01d0 h\u01ceo", meaning: "Bonjour", hsk: 1, example: "你好，我是小明。", exPinyin: "N\u01d0 h\u01ceo, w\u01d2 sh\u00ec Xi\u01ceo M\u00edng.", exTrans: "Bonjour, je suis Xiao Ming.", radicals: "你 (tu) + 好 (bien)" },
      { type: 'vocab', hanzi: "谢谢", pinyin: "Xi\u00e8xie", meaning: "Merci", hsk: 1, example: "谢谢你的帮助！", exPinyin: "Xi\u00e8xie n\u01d0 de b\u0101ngzh\u00f9!", exTrans: "Merci pour ton aide !", radicals: "谢 = 讠(parole) + 射 (tirer)" },
      { type: 'vocab', hanzi: "再见", pinyin: "Z\u00e0iji\u00e0n", meaning: "Au revoir", hsk: 1, example: "明天再见！", exPinyin: "M\u00edngti\u0101n z\u00e0iji\u00e0n!", exTrans: "À demain !", radicals: "再 (encore) + 见 (voir)" },
      { type: 'vocab', hanzi: "请", pinyin: "Q\u01d0ng", meaning: "S'il vous pla\u00eet", hsk: 1, example: "请坐。", exPinyin: "Q\u01d0ng zu\u00f2.", exTrans: "Asseyez-vous, s'il vous pla\u00eet.", radicals: "讠(parole) + 青 (vert/jeune)" },
      { type: 'vocab', hanzi: "对不起", pinyin: "Du\u00ecbuq\u01d0", meaning: "Pardon / D\u00e9sol\u00e9", hsk: 1, example: "对不起，我迟到了。", exPinyin: "Du\u00ecbuq\u01d0, w\u01d2 ch\u00edd\u00e0o le.", exTrans: "Pardon, je suis en retard.", radicals: "对 (correct) + 不起 (ne peut pas)" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"你好", sub:"Bonjour", icon:"👋"},
        {char:"谢谢", sub:"Merci", icon:"🙏"},
        {char:"再见", sub:"Au revoir", icon:"👋"},
        {char:"请", sub:"S'il vous pla\u00eet", icon:"🙂"},
        {char:"对不起", sub:"Pardon", icon:"😅"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : L'ordre SVO 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🧩", title: "L'ORDRE", subtitle: "DES MOTS", tagline: "GRAMMAIRE HSK 1", content: "Le chinois est plus logique que le fran\u00e7ais !", footer: "SWIPE 👉" },
      { type: 'formula', title: "LA R\u00c8GLE D'OR", part1: "Sujet", part2: "+ Verbe + Objet", result: "S + V + O", desc: "Comme en fran\u00e7ais : Je mange du riz." },
      { type: 'example', hanzi: "我吃饭", pinyin: "W\u01d2 ch\u012b f\u00e0n", trans: "Je mange (du riz).", label: "SUJET + VERBE + OBJET", highlight: true },
      { type: 'example', hanzi: "他喝茶", pinyin: "T\u0101 h\u0113 ch\u00e1", trans: "Il boit du th\u00e9.", label: "S + V + O", highlight: true },
      { type: 'example', hanzi: "她学中文", pinyin: "T\u0101 xu\u00e9 Zh\u014dngw\u00e9n", trans: "Elle apprend le chinois.", label: "S + V + O", highlight: true },
      { type: 'hack', topLabel: "DIFF\u00c9RENCE CL\u00c9", gesture: "⏰", title: "Le Temps avant", desc: "Le temps se place AVANT le verbe", tip: "我今天吃饭 (W\u01d2 j\u012bnti\u0101n ch\u012b f\u00e0n) = Je mange aujourd'hui. Le temps passe avant le verbe, pas apr\u00e8s !" },
      { type: 'hack', topLabel: "PIÈGE", gesture: "📍", title: "Le Lieu aussi avant", desc: "Le lieu se place AVANT le verbe", tip: "我在家吃饭 (W\u01d2 z\u00e0i ji\u0101 ch\u012b f\u00e0n) = Je mange \u00e0 la maison. Lieu avant le verbe !" },
    ]
  },
  vendredi: {
    title: "Vendredi : Nouvel An Chinois 🧧",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🧧", title: "春节", subtitle: "CH\u016aNJI\u0112", tagline: "NOUVEL AN CHINOIS", content: "La f\u00eate la plus importante de Chine.", footer: "D\u00c9COUVRIR 👉" },
      { type: 'hack', topLabel: "LA DATE", gesture: "📅", title: "Calendrier lunaire", desc: "Entre fin janvier et mi-f\u00e9vrier", tip: "Ce n'est pas le 1er janvier ! La date change chaque ann\u00e9e selon le calendrier lunaire." },
      { type: 'hack', topLabel: "LES ENVELOPPES", gesture: "🧧", title: "红包 (H\u00f3ngb\u0101o)", desc: "Enveloppes rouges avec argent", tip: "Les a\u00een\u00e9s donnent des enveloppes rouges aux plus jeunes. Le rouge \u00e9loigne les mauvais esprits." },
      { type: 'hack', topLabel: "LE REPAS", gesture: "🥟", title: "年夜饭 (Ni\u00e1ny\u00e8f\u00e0n)", desc: "Le r\u00e9veillon en famille", tip: "Toute la famille se r\u00e9unit pour un festin : raviolis au Nord, poisson (homophone de 'surplus') partout." },
      { type: 'hack', topLabel: "LA L\u00c9GENDE", gesture: "🐉", title: "年 (Ni\u00e1n)", desc: "Le monstre Nian", tip: "Un monstre attaquait les villages. On d\u00e9couvrit qu'il craignait le rouge, le bruit et le feu : d'o\u00f9 les p\u00e9tards et d\u00e9corations !" },
      { type: 'hack', topLabel: "LES P\u00c9TARDS", gesture: "🧨", title: "鞭炮 (Bi\u0101np\u00e0o)", desc: "Feux d'artifice et p\u00e9tards", tip: "Le bruit chasse les mauvais esprits. La Chine utilise plus de feux d'artifice \u00e0 春节 que le monde entier en un an !" },
      { type: 'list', title: "MOTS CL\u00c9S", items: [
        {char:"春节", sub:"Ch\u016bnji\u0113 - Nouvel An", icon:"🧧"},
        {char:"红包", sub:"H\u00f3ngb\u0101o - Enveloppe rouge", icon:"💰"},
        {char:"年夜饭", sub:"Ni\u00e1ny\u00e8f\u00e0n - R\u00e9veillon", icon:"🍽️"},
        {char:"鞭炮", sub:"Bi\u0101np\u00e0o - P\u00e9tards", icon:"🧨"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 一见钟情 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "💘", title: "成语", subtitle: "CH\u00c9NGY\u01d3", tagline: "PROVERBE CHINOIS", content: "Un proverbe d'amour vieux de 2000 ans.", footer: "D\u00c9COUVRIR 👉" },
      { type: 'chengyu', chars: "一见钟情", pinyin: "Y\u012b ji\u00e0n zh\u014dng q\u00edng", literal: "Un \u2022 Regard \u2022 Frapper \u2022 Sentiment", meaning: "Le coup de foudre", equivalent: "\u00c9quivalent : Love at first sight" },
      { type: 'hack', topLabel: "ORIGINE", gesture: "📜", title: "L'histoire", desc: "Litt\u00e9rature classique", tip: "Ce proverbe vient de r\u00e9cits anciens o\u00f9 deux personnes tombent amoureuses d\u00e8s le premier regard, comme dans le 'R\u00eave dans le Pavillon Rouge'." },
      { type: 'hack', topLabel: "D\u00c9COMPOSITION", gesture: "🔍", title: "Caract\u00e8re par caract\u00e8re", desc: "一 (un) 见 (voir) 钟 (cloche/frapper) 情 (sentiment)", tip: "Un seul regard frappe le sentiment = Coup de foudre instantan\u00e9." },
      { type: 'example', hanzi: "他们一见钟情", pinyin: "T\u0101men y\u012b ji\u00e0n zh\u014dng q\u00edng", trans: "Ils ont eu le coup de foudre.", label: "UTILISATION", highlight: true },
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
        alert("Outil de t\u00e9l\u00e9chargement en cours de chargement...");
        return;
    }

    setIsDownloading(index);
    const element = document.getElementById(`slide-${index}`);

    if (element) {
      try {
        const canvas = await window.html2canvas(element, {
          useCORS: true,
          scale: 2.16,
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
                link.download = `xiaolearn-S1-${day}-${index + 1}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
            setIsDownloading(false);
        }, 'image/png');

      } catch (err) {
        console.error("Erreur t\u00e9l\u00e9chargement", err);
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
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 1</h1>
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
              <Info size={12}/> T\u00e9l\u00e9chargement calibr\u00e9 pour Instagram (1080x1080px).
          </p>
      </div>

      {/* GRILLE SLIDES */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {currentData.slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center group/slide relative">

            <div
              id={`slide-${index}`}
              onClick={() => setActiveSlide(index)}
              className={`xiao-slide relative bg-white shadow-lg overflow-hidden flex flex-col cursor-pointer ${activeSlide === index ? 'is-active' : ''}`}
              style={{
                width: '500px',
                height: '500px',
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
                  <div className="text-6xl mb-5">{slide.icon}</div>
                  <h2 className="text-4xl font-black text-gray-800 leading-tight mb-2">{slide.title}</h2>
                  <h2 className="text-2xl font-black mb-6 leading-none" style={{color: themeColor}}>{slide.subtitle}</h2>
                  <div className="w-14 h-1.5 mb-6 rounded" style={{background: themeColor}}></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{slide.tagline}</p>
                  <p className="text-gray-600 font-medium text-base">{slide.content}</p>
                  <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
                     <span className="font-bold text-xs px-4 py-2 rounded-full border bg-gray-50 whitespace-nowrap" style={{color: themeColor, borderColor: themeColor+'40'}}>
                        {slide.footer}
                     </span>
                  </div>
                </div>
              )}

              {/* VOCAB - style @hsklevel */}
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
                   <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center text-6xl mb-5 shadow-inner text-gray-800 border-4 border-white shadow-lg font-bold">
                     {slide.gesture}
                   </div>
                   <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{slide.title}</h2>
                   <p className="text-gray-500 font-medium mb-4 text-base">{slide.desc}</p>
                   <p className="bg-white text-gray-600 text-sm italic p-4 rounded-xl border-l-4 shadow-sm text-left w-full" style={{borderColor: themeColor}}>
                     {slide.tip}
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

            {/* BOUTON DE T\u00c9L\u00c9CHARGEMENT */}
            <button
               onClick={(e) => handleDownload(index, e)}
               disabled={isDownloading !== false}
               className="xiao-download mt-3 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all opacity-0 group-hover/slide:opacity-100 disabled:opacity-50"
            >
               {isDownloading === index ? <Loader className="animate-spin" size={16} /> : <Download size={16} />}
               {isDownloading === index ? "G\u00e9n\u00e9ration..." : "T\u00e9l\u00e9charger"}
            </button>

            <p className="mt-2 text-xs font-bold text-gray-400 group-hover/slide:opacity-0 transition-opacity">SLIDE {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
