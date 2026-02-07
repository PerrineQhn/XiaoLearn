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

// --- DONNÉES SEMAINE 3 ---
const contentData = {
  lundi: {
    title: "Lundi : Bù vs Méi ⛔",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🚫", title: "DIRE NON", subtitle: "BÙ ou MÉI ?", tagline: "GRAMMAIRE HSK 1", content: "L'erreur n°1 des francophones.", footer: "SWIPE 👉" },
      { type: 'vs', icon: "🙅", header: "LE PRÉSENT / FUTUR", hanzi: "不 (Bù)", pinyin: "Négation standard", meaning: "Ne pas (vouloir / être)", bg: "#E84A4A" },
      { type: 'example', hanzi: "我不吃肉", pinyin: "Wǒ bù chī ròu", trans: "Je ne mange pas de viande (Habitude/Volonté).", label: "UTILISATION DE BÙ" },
      { type: 'vs', icon: "⏪", header: "LE PASSÉ", hanzi: "没 (Méi)", pinyin: "Négation du passé", meaning: "Ne pas avoir (fait)", bg: "#F43F5E" },
      { type: 'example', hanzi: "我没吃肉", pinyin: "Wǒ méi chī ròu", trans: "Je n'ai pas mangé de viande (Ce midi).", label: "UTILISATION DE MÉI" },
      { type: 'hack', topLabel: "ASTUCE POSSESSION", gesture: "👜", title: "Avoir (Yǒu)", desc: "On utilise TOUJOURS Méi", tip: "Wǒ méi yǒu qián (Je n'ai pas d'argent). Jamais 'Bù yǒu' !" },
      { type: 'list', title: "RÉSUMÉ", items: [
        {char:"Bù", sub:"Je ne veux pas / Je ne suis pas", icon:"🙅"},
        {char:"Méi", sub:"Je n'ai pas fait / Je n'ai pas", icon:"📭"}
      ]},
      { type: 'cta', title: "TESTE-TOI", subtitle: "SUR XIAOLEARN", button: "QUIZ GRATUIT 🔗" }
    ]
  },
  mercredi: {
    title: "Mercredi : Kiss vs Ask 💋",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "💋", title: "EMBRASSER", subtitle: "OU DEMANDER ?", tagline: "ATTENTION AUX TONS", content: "Ne soyez pas trop direct !", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "TON 4 (SEC)", gesture: "🗣️", title: "Wèn (Demander)", desc: "Descendant sec", tip: "Comme une question qu'on pose fermement." },
      { type: 'hack', topLabel: "TON 3 (CREUX)", gesture: "😚", title: "Wěn (Embrasser)", desc: "Descend et remonte", tip: "Un mouvement de tête sensuel..." },
      { type: 'example', hanzi: "我可以问你吗?", pinyin: "Wǒ kěyǐ wèn nǐ ma?", trans: "Puis-je te poser une question ?", label: "LA PHRASE SÛRE", highlight: true },
      { type: 'example', hanzi: "我可以吻你吗?", pinyin: "Wǒ kěyǐ wěn nǐ ma?", trans: "Puis-je t'embrasser ?", label: "LA PHRASE DANGEREUSE", highlight: false },
      { type: 'vs', icon: "😱", header: "LE RÉSULTAT", hanzi: "Une gifle ?", pinyin: "Si tu te trompes de ton...", meaning: "Gêne absolue", bg: "#F43F5E" },
      { type: 'cta', title: "ÉVITE LA HONTE", subtitle: "AVEC XIAOLEARN", button: "COURS DE TONS 🔗" }
    ]
  },
  vendredi: {
    title: "Vendredi : Couleurs 🎨",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🎨", title: "SENS DES", subtitle: "COULEURS", tagline: "CULTURE & TABOUS", content: "Le vert n'est pas ce que tu crois.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "ROUGE (HÓNG)", gesture: "🧧", title: "Chance & Fête", desc: "Mariage, Nouvel an", tip: "La couleur porte-bonheur par excellence." },
      { type: 'hack', topLabel: "BLANC (BÁI)", gesture: "👻", title: "Deuil & Mort", desc: "Funérailles", tip: "N'offrez jamais de fleurs blanches ou d'enveloppes blanches !" },
      { type: 'hack', topLabel: "VERT (LǛ)", gesture: "🧢", title: "Le Cocu !", desc: "Chapeau Vert", tip: "'Porter un chapeau vert' (Dài lǜ mào) signifie être trompé par sa femme." },
      { type: 'hack', topLabel: "JAUNE (HUÁNG)", gesture: "👑", title: "Impérial... ou X", desc: "Empereur", tip: "Attention, 'Films jaunes' veut dire films pour adultes en Chine." },
      { type: 'list', title: "RÉCAP", items: [
        {char:"Rouge", sub:"Oui ! Mariage, Argent", icon:"✅"},
        {char:"Vert", sub:"Pas sur la tête !", icon:"⚠️"},
        {char:"Blanc", sub:"Tristesse, Deuil", icon:"⚰️"}
      ]},
      { type: 'cta', title: "GUIDE CULTURE", subtitle: "SUR XIAOLEARN", button: "LIEN EN BIO 🔗" }
    ]
  },
  dimanche: {
    title: "Dimanche : Pictos 🏔️",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🖼️", title: "ORIGINE", subtitle: "DES HANZI", tagline: "ÉVOLUTION VISUELLE", content: "Du dessin à l'écriture moderne.", footer: "VOIR L'ÉVOLUTION 👉" },
      { type: 'hack', topLabel: "LE SOLEIL", gesture: "☀️", title: "Rì (日)", desc: "Un rond avec un point", tip: "Est devenu un rectangle avec un trait au milieu." },
      { type: 'hack', topLabel: "LA LUNE", gesture: "🌙", title: "Yuè (月)", desc: "Un croissant", tip: "On reconnait encore la forme courbée de la lune." },
      { type: 'hack', topLabel: "LA MONTAGNE", gesture: "⛰️", title: "Shān (山)", desc: "Trois pics", tip: "Le pic central est le plus haut. Très visuel !" },
      { type: 'hack', topLabel: "L'EAU", gesture: "💧", title: "Shuǐ (水)", desc: "Le courant", tip: "Imaginez les remous d'une rivière qui coule." },
      { type: 'hack', topLabel: "L'HOMME", gesture: "🚶", title: "Rén (人)", desc: "Deux jambes", tip: "Un homme qui marche de profil." },
      { type: 'hack', topLabel: "LA BOUCHE", gesture: "👄", title: "Kǒu (口)", desc: "Une ouverture", tip: "Un simple carré pour symboliser la bouche ouverte." },
      { type: 'cta', title: "APPRENDS VITE", subtitle: "MÉTHODE VISUELLE", button: "TESTER L'APP 🔗" }
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
                link.download = `xiaolearn-S3-${day}-carré-${index + 1}.png`;
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
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      
      {/* MENU */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-4">
            <div className="relative group">
                <PandaLogo className="w-12 h-12 border shadow-sm" src={currentLogo}/>
                 {!logoUrl && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 3 (Format Carré)</h1>
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
              className="relative bg-white shadow-lg overflow-hidden flex flex-col cursor-pointer"
              style={{ 
                width: '500px', 
                height: '500px', // CARRÉ
                border: activeSlide === index ? `4px solid ${themeColor}` : '1px solid #eee'
              }}
            >
              {/* HEADER */}
              <div className="absolute top-6 left-6 flex items-center gap-2 opacity-90 z-20">
                <PandaLogo className="w-8 h-8 shadow-sm rounded-full bg-white p-0.5" src={currentLogo} />
                <span className="text-[10px] font-bold tracking-widest text-gray-500">XIAOLEARN</span>
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

                  {/* FOOTER */}
                  <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
                     <span className="font-bold text-xs px-4 py-2 rounded-full border bg-gray-50 whitespace-nowrap" style={{color: themeColor, borderColor: themeColor+'40'}}>
                        {slide.footer}
                     </span>
                  </div>
                </div>
              )}

              {/* VS (Lundi & Mercredi) - Adapté Carré */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-7xl mb-5">{slide.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
                  <p className="text-lg text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-xl text-white font-bold text-xl shadow-lg" style={{background: slide.bg}}>{slide.meaning}</div>
                </div>
              )}

              {/* EXAMPLE (Lundi & Mercredi) */}
              {slide.type === 'example' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{slide.label}</span>
                   <h2 className="text-3xl font-bold text-gray-800 mb-2">{slide.hanzi}</h2>
                   <p className="text-gray-500 italic mb-5 text-base">{slide.pinyin}</p>
                   <p className={`font-bold text-base px-5 py-2.5 rounded-lg ${slide.highlight ? 'text-white' : 'text-gray-600 bg-gray-50'}`} style={slide.highlight ? {background: themeColor} : {}}>
                     {slide.trans}
                   </p>
                </div>
              )}

              {/* LIST (Lundi & Vendredi) */}
              {slide.type === 'list' && (
                <div className="flex-1 flex flex-col p-8 pt-14">
                  <h3 className="text-xl font-black text-center text-gray-800 mb-6">{slide.title}</h3>
                  <div className="flex flex-col gap-3">
                    {slide.items.map((it, i) => (
                      <div key={i} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-2xl w-10 text-center mr-3">{it.icon}</span>
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-800 block text-lg mb-0.5">{it.char}</span>
                          <span className="text-xs text-gray-400">{it.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HACK (Vendredi, Dimanche, Lundi) */}
              {slide.type === 'hack' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                   {slide.topLabel && <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 pb-1.5" style={{color: themeColor, borderColor: themeColor+'30'}}>{slide.topLabel}</h3>}

                   <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center text-6xl mb-5 shadow-inner text-gray-800 border-4 border-white shadow-lg font-bold">
                     {slide.gesture}
                   </div>

                   <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{slide.title}</h2>
                   <p className="text-gray-500 font-medium mb-4 text-base">{slide.desc}</p>
                   <p className="bg-white text-gray-600 text-sm italic p-4 rounded-xl border-l-4 shadow-sm text-left w-full" style={{borderColor: themeColor}}>
                     💡 {slide.tip}
                   </p>
                </div>
              )}

              {/* CTA - Adapté Carré */}
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