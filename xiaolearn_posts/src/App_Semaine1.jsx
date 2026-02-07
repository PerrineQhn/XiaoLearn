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

// --- GRAPHIQUE DES TONS SVG (Ajusté pour le carré) ---
const ToneGraph = ({ type }) => {
  const strokeColor = "#E84A4A";
  const strokeWidth = 6;
  
  const renderPath = () => {
    switch (type) {
      case 1: return <line x1="20" y1="40" x2="380" y2="40" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />;
      case 2: return <line x1="20" y1="110" x2="380" y2="40" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />;
      case 3: return <polyline points="20,70 190,130 380,30" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />;
      case 4: return <line x1="20" y1="40" x2="380" y2="110" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />;
      default: return null;
    }
  };

  return (
    <svg width="280" height="100" viewBox="0 0 400 150" className="mx-auto my-2">
      <line x1="20" y1="20" x2="20" y2="130" stroke="#f0f0f0" strokeWidth="3" />
      <line x1="20" y1="130" x2="380" y2="130" stroke="#f0f0f0" strokeWidth="3" />
      <text x="0" y="40" fontSize="14" fill="#ddd">5</text>
      <text x="0" y="130" fontSize="14" fill="#ddd">1</text>
      {renderPath()}
    </svg>
  );
};

// --- DONNÉES SEMAINE 1 (Version Étendue ~8-9 slides) ---
const contentData = {
  lundi: {
    title: "Lundi : Les Tons (Ext.) 🎓",
    color: "#E84A4A",
    slides: [
      { type: 'cover', title: "LES 4 TONS", subtitle: "DU MANDARIN", tagline: "GUIDE VISUEL", content: "Ne parlez pas comme un robot.", footer: "SWIPE 👉" },
      { type: 'tone', tone: 1, hanzi: "ā", title: "1er Ton", desc: "Haut et Plat", example: "Mā (Maman)", analogy: "Le 'Bip' continu." },
      { type: 'tone', tone: 2, hanzi: "á", title: "2ème Ton", desc: "Montant", example: "Má (Chanvre)", analogy: "Surprise : 'Quoi ?'" },
      { type: 'tone', tone: 3, hanzi: "ǎ", title: "3ème Ton", desc: "Descend/Monte", example: "Mǎ (Cheval)", analogy: "Hocher la tête." },
      { type: 'tone', tone: 4, hanzi: "à", title: "4ème Ton", desc: "Sec", example: "Mà (Insulter)", analogy: "Dire 'Non !'" },
      { type: 'hack', topLabel: "QUIZ RAPIDE", gesture: "🤔", title: "Le mot 'OUI'", desc: "Il se prononce 'Duì' (4e ton).", tip: "Il faut le dire de manière brève et affirmée !" },
      { type: 'hack', topLabel: "ASTUCE DE PRO", gesture: "☝️", title: "Le Doigt", desc: "Tracez le ton dans l'air", tip: "Connecter le geste à la voix aide à mémoriser 2x plus vite." },
      { type: 'cta', title: "MAÎTRISEZ-LES", subtitle: "SUR XIAOLEARN", button: "LIEN EN BIO 🔗" }
    ]
  },
  mercredi: {
    title: "Mercredi : Fun (Ext.) 🐴",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🐴", title: "OUPS...", subtitle: "DÉSOLÉ MAMAN !", tagline: "ERREUR CLASSIQUE", content: "Un ton change tout le sens.", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "TON 1 (PLAT)", gesture: "👩", title: "Mā = Maman", desc: "Doux et constant", tip: "Imaginez que vous appelez votre mère." },
      { type: 'hack', topLabel: "TON 2 (MONTANT)", gesture: "🌿", title: "Má = Chanvre", desc: "Comme une question", tip: "Utilisé pour le textile (ou autre...)." },
      { type: 'hack', topLabel: "TON 3 (CREUX)", gesture: "🐴", title: "Mǎ = Cheval", desc: "Ça descend et remonte", tip: "L'animal à ne pas confondre avec Maman !" },
      { type: 'hack', topLabel: "TON 4 (SEC)", gesture: "🤬", title: "Mà = Insulter", desc: "Sec et méchant", tip: "Attention à ne pas insulter votre cheval." },
      { type: 'vs', icon: "😱", header: "LE GROS PIÈGE", hanzi: "Wǒ ài wǒ de Mǎ", pinyin: "J'aime mon Cheval", meaning: "VS Maman (Mā)", bg: "#F43F5E" },
      { type: 'list', title: "RÉCAPITULATIF", items: [
        {char:"Mā", tone:"1", mean:"Maman", icon:"👩"},
        {char:"Má", tone:"2", mean:"Chanvre", icon:"🌿"},
        {char:"Mǎ", tone:"3", mean:"Cheval", icon:"🐴"},
        {char:"Mà", tone:"4", mean:"Insulter", icon:"🤬"}
      ]},
      { type: 'cta', title: "SAUVE TA VIE", subtitle: "APPRENDS TES TONS", button: "COMMENCER 🔗" }
    ]
  },
  vendredi: {
    title: "Vendredi : Culture (Ext.) 🧧",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🧧", title: "CHIFFRES", subtitle: "EN CHINE 🇨🇳", tagline: "CULTURE & SUPERSTITION", content: "Pourquoi éviter le 4 ? Pourquoi aimer le 8 ?", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LE PIRE CHIFFRE", gesture: "💀", title: "4 (Sì)", desc: "Homophone de 'Mort'", tip: "Pas de 4ème étage dans beaucoup d'immeubles !" },
      { type: 'hack', topLabel: "PORTE-BONHEUR", gesture: "💰", title: "8 (Bā)", desc: "Homophone de 'Fortune'", tip: "Les plaques d'immatriculation avec des 8 valent de l'or." },
      { type: 'hack', topLabel: "L'AMOUR", gesture: "❤️", title: "520", desc: "Wǔ Èr Líng", tip: "Sonne comme 'Je t'aime' (Wǒ ài nǐ). Code SMS populaire." },
      { type: 'hack', topLabel: "L'IDIOT", gesture: "🤪", title: "250", desc: "Èr Bǎi Wǔ", tip: "Si on vous traite de 250, ce n'est pas un compliment (Andouille) !" },
      { type: 'hack', topLabel: "GESTE DU 6", gesture: "🤙", title: "6 (Liù)", desc: "Le Téléphone", tip: "Signifie aussi 'Cool / Stylé' dans l'argot internet (666)." },
      { type: 'hack', topLabel: "GESTE DU 10", gesture: "✊", title: "10 (Shí)", desc: "Le Poing fermé", tip: "Ou parfois les deux index croisés en '+'." },
      { type: 'cta', title: "COMPRENDRE", subtitle: "LA CULTURE", button: "COURS DISPO 🔗" }
    ]
  },
  dimanche: {
    title: "Dimanche : Astuce (Ext.) 🧱",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "🧱", title: "ASTUCE", subtitle: "HANZI LEGO", tagline: "MÉTHODE EFFICACE", content: "N'apprends pas par cœur. Comprends la logique.", footer: "LA MÉTHODE 👉" },
      { type: 'hack', topLabel: "BRIQUE 1", gesture: "女", title: "Nǚ (Femme)", desc: "Radical de la féminité", tip: "On le retrouve dans Maman, Sœur, Elle..." },
      { type: 'hack', topLabel: "BRIQUE 2", gesture: "子", title: "Zǐ (Enfant)", desc: "Radical de l'enfant", tip: "Indique souvent un fils ou un petit objet." },
      { type: 'hack', topLabel: "ASSEMBLAGE 1", gesture: "好", title: "Hǎo (Bien)", desc: "Femme + Enfant", tip: "Une femme avec son enfant = Le Bonheur / Bien." },
      { type: 'hack', topLabel: "BRIQUE 3", gesture: "木", title: "Mù (Arbre)", desc: "Ressemble à un arbre", tip: "Un tronc central et deux branches." },
      { type: 'hack', topLabel: "ASSEMBLAGE 2", gesture: "林", title: "Lín (Forêt)", desc: "Arbre + Arbre", tip: "Deux arbres côte à côte font une forêt (ou un bois)." },
      { type: 'hack', topLabel: "ASSEMBLAGE 3", gesture: "森", title: "Sēn (Jungle)", desc: "3 Arbres !", tip: "Beaucoup d'arbres = Forêt dense / Jungle." },
      { type: 'cta', title: "RESTEZ MOTIVÉ", subtitle: "AVEC XIAOLEARN", button: "TESTER GRATUIT 🔗" }
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
                link.download = `xiaolearn-S1-${day}-carré-${index + 1}.png`;
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
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 1 (Format Carré - Étendu)</h1>
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

              {/* TONE (Lundi) - Adapté Carré */}
              {slide.type === 'tone' && (
                <div className="flex-1 flex flex-col p-8 pt-14 relative items-center">
                   <span className="absolute top-6 right-6 text-8xl font-serif text-gray-100">{slide.tone}</span>
                   <h3 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">{slide.title}</h3>
                   <div className="h-1 w-10 mb-4" style={{background: themeColor}}></div>

                   <span className="text-5xl font-bold text-gray-800 mb-2">{slide.hanzi}</span>
                   <ToneGraph type={slide.tone} />

                   <div className="w-full bg-gray-50 p-4 rounded-xl border-l-4 mt-3 text-center shadow-sm" style={{borderColor: themeColor}}>
                     <p className="font-bold text-base mb-1" style={{color: themeColor}}>{slide.desc}</p>
                     <p className="text-xs text-gray-500 italic">"{slide.analogy}"</p>
                   </div>
                   <div className="mt-4 px-5 py-2 rounded-full border text-sm font-bold text-gray-700">Ex: {slide.example}</div>
                </div>
              )}

              {/* VS (Mercredi) - Adapté Carré */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-7xl mb-5">{slide.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
                  <p className="text-lg text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-xl text-white font-bold text-xl shadow-lg" style={{background: slide.bg}}>{slide.meaning}</div>
                </div>
              )}

              {/* LIST (Mercredi) - Adapté Carré */}
              {slide.type === 'list' && (
                <div className="flex-1 flex flex-col p-8 pt-14">
                  <h3 className="text-xl font-black text-center text-gray-800 mb-6">{slide.title}</h3>
                  <div className="flex flex-col gap-3">
                    {slide.items.map((it, i) => (
                      <div key={i} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-2xl w-10 text-center mr-3">{it.icon}</span>
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-800 block text-lg mb-0.5">{it.char}</span>
                          <span className="text-xs text-gray-400 font-mono">Ton {it.tone}</span>
                        </div>
                        <span className="font-bold text-base text-gray-600">= {it.mean}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HACK (Vendredi & Dimanche & Lundi Astuce) - Adapté Carré */}
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