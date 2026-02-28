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

// --- DONNÉES SEMAINE 2 ---
const contentData = {
  lundi: {
    title: "Lundi : Vocabulaire - La Famille 📖",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "👨‍👩‍👧‍👦", title: "LA FAMILLE", subtitle: "EN CHINOIS", tagline: "VOCABULAIRE HSK 1", content: "Les 5 mots essentiels de la famille.", footer: "SWIPE 👉" },
      { type: 'vocab', hanzi: "爸爸", pinyin: "Bàba", meaning: "Papa", hsk: 1, example: "我爸爸是老师。", exPinyin: "Wǒ bàba shì lǎoshī.", exTrans: "Mon papa est professeur.", radicals: "爸 = 父 (père) + 巴" },
      { type: 'vocab', hanzi: "妈妈", pinyin: "Māma", meaning: "Maman", hsk: 1, example: "妈妈做饭很好吃。", exPinyin: "Māma zuòfàn hěn hǎochī.", exTrans: "Maman cuisine très bien.", radicals: "妈 = 女 (femme) + 马 (cheval)" },
      { type: 'vocab', hanzi: "哥哥", pinyin: "Gēge", meaning: "Grand frère", hsk: 1, example: "我哥哥在北京工作。", exPinyin: "Wǒ gēge zài Běijīng gōngzuò.", exTrans: "Mon grand frère travaille à Pékin.", radicals: "哥 = 可 (pouvoir) + 可" },
      { type: 'vocab', hanzi: "姐姐", pinyin: "Jiějie", meaning: "Grande sœur", hsk: 1, example: "姐姐喜欢看书。", exPinyin: "Jiějie xǐhuān kànshū.", exTrans: "Ma grande sœur aime lire.", radicals: "姐 = 女 (femme) + 且 (de plus)" },
      { type: 'vocab', hanzi: "弟弟", pinyin: "Dìdi", meaning: "Petit frère", hsk: 1, example: "弟弟今年五岁。", exPinyin: "Dìdi jīnnián wǔ suì.", exTrans: "Mon petit frère a cinq ans cette année.", radicals: "弟 = 弓 (arc) + 丷 + 丨" },
      { type: 'list', title: "RÉCAP", items: [
        {char:"爸爸", sub:"Bàba - Papa", icon:"👨"},
        {char:"妈妈", sub:"Māma - Maman", icon:"👩"},
        {char:"哥哥", sub:"Gēge - Grand frère", icon:"👦"},
        {char:"姐姐", sub:"Jiějie - Grande sœur", icon:"👧"},
        {char:"弟弟", sub:"Dìdi - Petit frère", icon:"🧒"}
      ]},
    ]
  },
  mercredi: {
    title: "Mercredi : La Question avec 吗 📝",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "❓", title: "POSER UNE", subtitle: "QUESTION", tagline: "GRAMMAIRE HSK 1", content: "La façon la plus simple de poser une question en chinois.", footer: "SWIPE 👉" },
      { type: 'formula', title: "LA RÈGLE D'OR", part1: "Affirmation", part2: "+ 吗 (Ma)", result: "= Question ？", desc: "C'est comme ajouter « est-ce que » à la fin d'une phrase." },
      { type: 'example', hanzi: "你是中国人。", pinyin: "Nǐ shì Zhōngguó rén.", trans: "Tu es chinois. (Affirmation)", label: "AFFIRMATION", highlight: false },
      { type: 'example', hanzi: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguó rén ma?", trans: "Es-tu chinois ? (Question)", label: "QUESTION AVEC 吗", highlight: true },
      { type: 'example', hanzi: "他吃饭。→ 他吃饭吗？", pinyin: "Tā chīfàn. → Tā chīfàn ma?", trans: "Il mange. → Est-ce qu'il mange ?", label: "AUTRE EXEMPLE", highlight: true },
      { type: 'example', hanzi: "你好。→ 你好吗？", pinyin: "Nǐ hǎo. → Nǐ hǎo ma?", trans: "Bonjour. → Comment vas-tu ?", label: "CLASSIQUE", highlight: true },
      { type: 'hack', topLabel: "ASTUCE", gesture: "💡", title: "Super simple !", desc: "C'est comme ajouter \"est-ce que\" à la fin", tip: "En chinois, pas besoin de changer l'ordre des mots pour poser une question. On ajoute juste 吗 à la fin. C'est la méthode la plus facile !" },
    ]
  },
  vendredi: {
    title: "Vendredi : La Cérémonie du Thé 🍵",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🍵", title: "茶道", subtitle: "CHÁDÀO", tagline: "LA CÉRÉMONIE DU THÉ", content: "Un art millénaire au cœur de la culture chinoise.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "L'HISTOIRE", gesture: "📜", title: "5000 ans de thé", desc: "Depuis l'Empereur Shennong", tip: "Selon la légende, l'Empereur Shennong a découvert le thé par hasard il y a 5000 ans quand des feuilles sont tombées dans son eau chaude." },
      { type: 'hack', topLabel: "THÉ VERT", gesture: "🍃", title: "绿茶 Lǜchá", desc: "Le thé le plus populaire en Chine", tip: "Le thé vert est le plus consommé en Chine. Il n'est pas fermenté et conserve ses antioxydants. Le Longjing (龙井) est le plus célèbre." },
      { type: 'hack', topLabel: "THÉ ROUGE", gesture: "🫖", title: "红茶 Hóngchá", desc: "Ce qu'on appelle « thé noir » en Occident", tip: "红茶 signifie littéralement « thé rouge ». C'est un thé entièrement fermenté, plus doux et corsé. Les Occidentaux l'appellent « thé noir »." },
      { type: 'hack', topLabel: "OOLONG", gesture: "🐉", title: "乌龙茶 Wūlóng chá", desc: "Entre le thé vert et le thé noir", tip: "Le thé Oolong est semi-fermenté : à mi-chemin entre le vert et le noir. Son nom signifie « dragon noir ». Idéal pour les amateurs de saveurs complexes." },
      { type: 'hack', topLabel: "L'ART DU THÉ", gesture: "🏮", title: "功夫茶 Gōngfū Chá", desc: "L'art de préparer le thé", tip: "Le Gōngfū Chá est une méthode de préparation minutieuse : petite théière, infusions courtes et répétées. 功夫 signifie « maîtrise » – le même mot que Kung Fu !" },
      { type: 'list', title: "LES THÉS CHINOIS", items: [
        {char:"绿茶", sub:"Lǜchá - Thé vert", icon:"🍃"},
        {char:"红茶", sub:"Hóngchá - Thé rouge/noir", icon:"🫖"},
        {char:"乌龙茶", sub:"Wūlóng chá - Oolong", icon:"🐉"},
        {char:"功夫茶", sub:"Gōngfū Chá - Art du thé", icon:"🏮"}
      ]},
    ]
  },
  dimanche: {
    title: "Dimanche : 成语 半途而废 🀄",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🏔️", title: "成语", subtitle: "CHÉNGYǓ", tagline: "PROVERBE SUR LA PERSÉVÉRANCE", content: "Un proverbe ancien sur l'abandon.", footer: "DÉCOUVRIR 👉" },
      { type: 'chengyu', chars: "半途而废", pinyin: "Bàn tú ér fèi", literal: "Moitié • Chemin • Et • Abandonner", meaning: "Abandonner à mi-chemin", equivalent: "Équivalent : Jeter l'éponge" },
      { type: 'hack', topLabel: "ORIGINE", gesture: "📜", title: "L'histoire", desc: "Textes anciens sur la persévérance", tip: "Ce proverbe vient de récits anciens où un étudiant abandonnait ses études à mi-parcours. Sa mère coupa un tissu qu'elle tissait pour lui montrer que tout effort inachevé est gâché." },
      { type: 'hack', topLabel: "DÉCOMPOSITION", gesture: "🔍", title: "Caractère par caractère", desc: "半 (moitié) 途 (chemin) 而 (et) 废 (abandonner)", tip: "半 = moitié, 途 = route/chemin, 而 = conjonction (et/alors), 废 = gâcher/abandonner. Ensemble : abandonner à mi-chemin." },
      { type: 'example', hanzi: "学中文不能半途而废", pinyin: "Xué Zhōngwén bù néng bàn tú ér fèi", trans: "On ne peut pas abandonner le chinois à mi-chemin.", label: "UTILISATION", highlight: true },
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
                link.download = `xiaolearn-S2-${day}-${index + 1}.png`;
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
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 2</h1>
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
