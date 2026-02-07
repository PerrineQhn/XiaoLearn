import React, { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image-more';
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

// --- DONNÉES DE CONTENU SEMAINE 2 (VERSIONS LONGUES) ---
const contentData = {
  lundi: {
    title: "Lundi : Grammaire (Ext.) 🎓",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "❓", title: "POSER UNE", subtitle: "QUESTION", tagline: "GRAMMAIRE HSK 1", content: "La méthode la plus simple au monde.", footer: "SWIPE 👉" },
      { type: 'formula', title: "LA FORMULE", part1: "Affirmation", part2: "+ 吗 (Ma)", result: "Question", desc: "En chinois, on ne change pas l'ordre des mots !" },
      // Exemple 1
      { type: 'example', hanzi: "你是中国人", pinyin: "Nǐ shì Zhōngguó rén", trans: "Tu es Chinois.", label: "AFFIRMATION 1" },
      { type: 'example', hanzi: "你是中国人 吗 ?", pinyin: "Nǐ shì Zhōngguó rén ma?", trans: "Es-tu Chinois ?", label: "QUESTION 1", highlight: true },
      // Exemple 2 (Nouveau)
      { type: 'example', hanzi: "他吃饭", pinyin: "Tā chī fàn", trans: "Il mange.", label: "AFFIRMATION 2" },
      { type: 'example', hanzi: "他吃饭 吗 ?", pinyin: "Tā chī fàn ma?", trans: "Mange-t-il ?", label: "QUESTION 2", highlight: true },
      // Exemple 3 (Nouveau)
      { type: 'example', hanzi: "你好", pinyin: "Nǐ hǎo", trans: "Tu vas bien (Bonjour)", label: "AFFIRMATION 3" },
      { type: 'example', hanzi: "你好 吗 ?", pinyin: "Nǐ hǎo ma?", trans: "Comment vas-tu ?", label: "QUESTION 3", highlight: true },
      
      { type: 'hack', icon: "💡", title: "ASTUCE", desc: "C'est comme ajouter 'est-ce que' à la fin de la phrase.", tip: "Ça marche pour TOUT : Tu viens ? Il fait beau ?" },
      { type: 'cta', title: "EXERCE-TOI", subtitle: "SUR XIAOLEARN", button: "QUIZ GRATUIT 🔗" }
    ]
  },
  mercredi: {
    title: "Mercredi : Fun (Ext.) 😳",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "💔", title: "AMI(E) OU", subtitle: "AMOUR ?", tagline: "ATTENTION AUX QUIPROQUOS", content: "Ne déclare pas ta flamme par erreur !", footer: "SWIPE 👉" },
      // Version Garçon
      { type: 'vs', icon: "👫", header: "AMI (MASCULIN)", hanzi: "男性朋友", pinyin: "Nánxìng Péngyǒu", meaning: "AMI (Pote)", bg: "#2F9D8A", note: "Précis & clair." },
      { type: 'vs', icon: "❤️", header: "PETIT COPAIN", hanzi: "男朋友", pinyin: "Nán Péngyǒu", meaning: "PETIT COPAIN", bg: "#F43F5E", note: "Relation amoureuse !" },
      // Version Fille (Nouveau)
      { type: 'vs', icon: "👭", header: "AMIE (FÉMININ)", hanzi: "女性朋友", pinyin: "Nǚxìng Péngyǒu", meaning: "AMIE (Pote)", bg: "#2F9D8A", note: "Juste une amie." },
      { type: 'vs', icon: "💖", header: "PETITE COPINE", hanzi: "女朋友", pinyin: "Nǚ Péngyǒu", meaning: "PETITE COPINE", bg: "#F43F5E", note: "Ta chérie !" },
      
      { type: 'list', title: "LA RÈGLE", items: [
        {char:"Péngyǒu", sub:"Ami tout court", icon:"🙂"},
        {char:"Nán Péngyǒu", sub:"Boyfriend", icon:"❤️"},
        {char:"Nǚ Péngyǒu", sub:"Girlfriend", icon:"💖"}
      ]},
      { type: 'cta', title: "PARLE COMME", subtitle: "UN NATIF", button: "REJOINS-NOUS 🔗" }
    ]
  },
  vendredi: {
    title: "Vendredi : Culture (Ext.) 🖐️",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🤙", title: "COMPTER", subtitle: "AVEC 1 MAIN", tagline: "GESTES CHINOIS", content: "Oubliez la façon occidentale de compter.", footer: "DÉCOUVRIR 👉" },
      // Chiffres clés
      { type: 'hack', topLabel: "CHIFFRE 6", gesture: "🤙", gestureImage: "/gestures/6.png", title: "Liù (Six)", desc: "Le Téléphone", tip: "Pouce et petit doigt sortis. Ressemble au caractère 六 inversé." },
      { type: 'hack', topLabel: "CHIFFRE 7", gesture: "🤏", gestureImage: "/gestures/7.png", title: "Qī (Sept)", desc: "Le Bec de Canard", tip: "On joint le pouce et les deux premiers doigts ensemble." },
      { type: 'hack', topLabel: "CHIFFRE 8", gesture: "👆", gestureImage: "/gestures/8.png", title: "Bā (Huit)", desc: "Le Pistolet", tip: "Pouce et index ouverts. Ressemble au caractère 八." },
      { type: 'hack', topLabel: "CHIFFRE 9", gesture: "☝️", gestureImage: "/gestures/9.png", title: "Jiǔ (Neuf)", desc: "Le Crochet", tip: "L'index replié comme un crochet (pirate)." },
      { type: 'hack', topLabel: "CHIFFRE 10", gesture: "✊", gestureImage: "/gestures/10_poing.png", title: "Shí (Dix)", desc: "Le Poing", tip: "Parfois aussi représenté en croisant les index comme un '+'. " },

      { type: 'list', title: "RÉCAP", items: [
        {char:"1 à 5", sub:"Comme chez nous", icon:"🖐️"},
        {char:"6 à 10", sub:"Symbolique des doigts", icon:"🤯"}
      ]},
      { type: 'cta', title: "GUIDE CULTURE", subtitle: "SUR XIAOLEARN", button: "LIEN EN BIO 🔗" }
    ]
  },
  dimanche: {
    title: "Dimanche : Astuce (Ext.) 🗣️",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "⚠️", title: "PIÈGES", subtitle: "DU PINYIN", tagline: "PRONONCIATION", content: "Ne lisez pas comme en français !", footer: "LES PIÈGES 👉" },
      // Q
      { type: 'bigchar', char: "Q", sound: "Tsi", example: "Comme 'Tchin-Tchin'", word: "Qù (Aller)", icon: "🚶" },
      { type: 'example', hanzi: "七", pinyin: "Qī", trans: "Sept (Chiffre)", label: "PRATIQUE LE Q", highlight: true },
      // X
      { type: 'bigchar', char: "X", sound: "Si", example: "Entre 'Si' et 'Shi'", word: "Xièxie (Merci)", icon: "🙏" },
      { type: 'example', hanzi: "谢谢", pinyin: "Xièxie", trans: "Merci", label: "PRATIQUE LE X", highlight: true },
      // C
      { type: 'bigchar', char: "C", sound: "Tseu", example: "Comme 'Tsé-Tsé'", word: "Cèsuǒ (Toilettes)", icon: "🚽" },
      { type: 'example', hanzi: "厕所", pinyin: "Cèsuǒ", trans: "Toilettes", label: "PRATIQUE LE C", highlight: true },

      { type: 'cta', title: "ENTRAÎNE TON", subtitle: "OREILLE", button: "ÉCOUTER MAINTENANT 🔗" }
    ]
  }
};

// Mapping des logos par jour (couleurs demandées)
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
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = (err) => {
      console.warn("Impossible de charger html2canvas, on utilisera la méthode de secours.", err);
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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

    if (!scriptLoaded) {
        alert("Outil de téléchargement en cours de chargement...");
        return;
    }
    
    setIsDownloading(index);
    const element = document.getElementById(`slide-${index}`);
    
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 80));

      // Dimensions Instagram Carré : 1080x1080px (ratio 1:1)
      const baseWidth = 400;
      const baseHeight = 400;
      const exportWidth = 1080;
      const exportHeight = 1080;
      const scale = exportWidth / baseWidth; // 2.7
      const html2canvasInstance = window.html2canvas;

      if (html2canvasInstance) {
        const canvas = await html2canvasInstance(element, {
          backgroundColor: '#ffffff',
          scale,
          useCORS: true,
          logging: false,
          width: baseWidth,
          height: baseHeight,
          windowWidth: document.documentElement.clientWidth,
          windowHeight: document.documentElement.clientHeight,
          scrollX: 0,
          scrollY: 0
        });

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `xiaolearn-${day}-slide-${index + 1}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          } else {
            alert("Impossible de créer l'image.");
          }
          setIsDownloading(false);
        }, 'image/png');
        return;
      }

      // Fallback dom-to-image (moins précis mais garde une sortie)
      const blob = await domtoimage.toBlob(element, {
        width: baseWidth,
        height: baseHeight,
        bgcolor: '#ffffff',
        cacheBust: true,
        scale
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `xiaolearn-${day}-slide-${index + 1}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    } catch (err) {
      console.error("Erreur téléchargement", err);
      alert("Erreur lors du téléchargement. Vérifiez que toutes les images sont chargées.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      
      {/* MENU */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-4">
            <div className="relative group">
                <PandaLogo className="w-12 h-12 border shadow-sm" src={currentLogo}/>
                 {!logoUrl && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Générateur Semaine 2 (Final)</h1>
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
              className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${day === k ? 'bg-white shadow text-gray-800 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl text-center mb-6">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Info size={12}/> Téléchargement calibré pour Instagram carré (1080x1080px).
          </p>
      </div>

      {/* GRILLE SLIDES */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {currentData.slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center group/slide relative">
            
            <div 
              id={`slide-${index}`}
              onClick={() => setActiveSlide(index)}
              className="relative bg-white shadow-lg overflow-hidden flex flex-col cursor-pointer"
              style={{
                width: '400px',
                height: '400px',
                border: activeSlide === index ? `4px solid ${themeColor}` : '1px solid #eee'
              }}
            >
              {/* HEADER */}
              <div className="absolute top-5 left-5 flex items-center gap-2 opacity-90 z-20">
                <PandaLogo className="w-8 h-8 shadow-sm rounded-full bg-white p-0.5" src={currentLogo} />
                <span className="text-[10px] font-bold tracking-widest text-gray-500">XIAOLEARN</span>
              </div>

              {/* COVER */}
              {slide.type === 'cover' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full" style={{background: themeColor}}></div>
                  <div className="text-6xl mb-4">{slide.icon}</div>
                  <h2 className="text-4xl font-black text-gray-800 leading-none mb-1">{slide.title}</h2>
                  <h2 className="text-2xl font-black mb-6 leading-none" style={{color: themeColor}}>{slide.subtitle}</h2>
                  <div className="w-12 h-1 mb-6 rounded" style={{background: themeColor}}></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{slide.tagline}</p>
                  <p className="text-gray-600 font-medium">{slide.content}</p>
                  
                  {/* Correction Footer Centré */}
                  <div className="absolute bottom-8 left-0 w-full flex justify-center">
                    <div className="font-bold text-xs px-4 py-2 rounded-full border bg-gray-50 whitespace-nowrap" style={{color: themeColor, borderColor: themeColor+'40'}}>
                      {slide.footer}
                    </div>
                  </div>
                </div>
              )}

              {/* FORMULA (Lundi) */}
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

              {/* EXAMPLE (Lundi) */}
              {slide.type === 'example' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{slide.label}</span>
                   <h2 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h2>
                   <p className="text-gray-500 italic mb-6">{slide.pinyin}</p>
                   <p className={`font-bold text-lg px-6 py-3 rounded-lg ${slide.highlight ? 'text-white' : 'text-gray-600 bg-gray-50'}`} style={slide.highlight ? {background: themeColor} : {}}>
                     {slide.trans}
                   </p>
                </div>
              )}

              {/* VS (Mercredi) */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-7xl mb-4">{slide.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{slide.hanzi}</h3>
                  <p className="text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-lg text-white font-bold text-xl shadow mb-2" style={{background: slide.bg}}>{slide.meaning}</div>
                  <p className="text-xs text-gray-400">{slide.note}</p>
                </div>
              )}

              {/* LIST (Mercredi) */}
              {slide.type === 'list' && (
                <div className="flex-1 flex flex-col p-8 pt-16">
                  <h3 className="text-xl font-black text-center text-gray-800 mb-6">{slide.title}</h3>
                  <div className="flex flex-col gap-3">
                    {slide.items.map((it, i) => (
                      <div key={i} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="text-xl w-8 text-center mr-2">{it.icon}</span>
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-800 block text-lg">{it.char}</span>
                          <span className="text-xs text-gray-400">{it.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HACK (Vendredi & Lundi Astuce) */}
              {slide.type === 'hack' && (
                <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 text-center">
                   {slide.topLabel && <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 pb-1" style={{color: themeColor, borderColor: themeColor+'30'}}>{slide.topLabel}</h3>}

                   {slide.gestureImage ? (
                      <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner border-4 border-white shadow-lg overflow-hidden">
                        <img
                          src={slide.gestureImage}
                          alt={slide.title}
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover"
                        />
                      </div>
                   ) : slide.gesture ? (
                      <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center text-5xl mb-4 shadow-inner text-gray-800 border-4 border-white shadow-lg font-bold">
                        {slide.gesture}
                      </div>
                   ) : (
                      <div className="text-5xl mb-4">{slide.icon}</div>
                   )}

                   <h2 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{slide.title}</h2>
                   <p className="text-gray-500 font-medium mb-3 text-sm">{slide.desc}</p>
                   <p className="bg-white text-gray-600 text-xs italic p-3 rounded-xl border-l-4 shadow-sm text-left w-full" style={{borderColor: themeColor}}>
                     💡 {slide.tip}
                   </p>
                </div>
              )}

              {/* BIG CHAR (Dimanche) */}
              {slide.type === 'bigchar' && (
                <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                   <div className="text-9xl font-black text-gray-100 absolute top-10 right-0 -z-0 pointer-events-none">{slide.char}</div>
                   <div className="bg-white shadow-xl rounded-2xl w-32 h-32 flex items-center justify-center text-6xl font-black text-gray-800 mb-6 border-2 border-gray-50 relative z-10">
                     {slide.char}
                   </div>
                   <div className="text-2xl font-bold mb-1" style={{color: themeColor}}>= "{slide.sound}"</div>
                   <p className="text-gray-400 text-sm mb-6">Ex: {slide.example}</p>
                   
                   <div className="bg-gray-50 p-3 rounded-lg w-full flex items-center gap-3">
                      <span className="text-2xl">{slide.icon}</span>
                      <div className="text-left">
                        <div className="font-bold text-gray-800">{slide.word}</div>
                        <div className="text-xs text-gray-400">Exemple concret</div>
                      </div>
                   </div>
                </div>
              )}

              {/* CTA */}
              {slide.type === 'cta' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center" style={{background: themeColor}}>
                  <div className="bg-white p-3 rounded-full mb-6 shadow-xl"><PandaLogo className="w-12 h-12" src={currentLogo} /></div>
                  <h2 className="text-2xl font-black text-white mb-1">{slide.title}</h2>
                  <h3 className="text-xl font-bold text-white opacity-90 mb-6">{slide.subtitle}</h3>
                  <div className="bg-white px-6 py-2 rounded-full font-bold shadow uppercase text-xs" style={{color: themeColor}}>{slide.button}</div>
                </div>
              )}

              {/* DOTS */}
              <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-20">
                  {currentData.slides.map((_, dotIndex) => {
                     const isCta = slide.type === 'cta';
                     const isActive = dotIndex === index;
                     let bgColor;
                     if (isCta) { bgColor = isActive ? 'white' : 'rgba(255,255,255, 0.4)'; } 
                     else { bgColor = isActive ? themeColor : '#e5e7eb'; }
                     return (<div key={dotIndex} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: bgColor }}></div>);
                  })}
              </div>

            </div>
            
            {/* BOUTON DE TÉLÉCHARGEMENT */}
            <button
               onClick={(e) => handleDownload(index, e)}
               disabled={isDownloading !== false}
               className="mt-3 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all opacity-0 group-hover/slide:opacity-100 disabled:opacity-50"
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
