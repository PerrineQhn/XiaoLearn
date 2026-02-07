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

// --- DONNÉES SEMAINE 7 (Avec Hanzi & Pinyin) ---
const contentData = {
  lundi: {
    title: "Lundi : Le De (的) 🎯",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "🎯", title: "LE MOT", subtitle: "N°1", tagline: "GRAMMAIRE HSK 1", content: "La particule la plus utilisée en chinois.", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "FONCTION", gesture: "🔗", title: "的 (De)", desc: "Possession & Description", tip: "Il sert de 'colle' entre deux mots. C'est l'équivalent de 'de' ou de l'apostrophe 's'." },
      { type: 'formula', title: "POSSESSION", part1: "Possesseur", part2: "+ 的 (De)", result: "+ Objet", desc: "Ex: Le livre DE moi." },
      { type: 'example', hanzi: "我的书", pinyin: "(Wǒ de shū)", trans: "Mon livre", label: "EXEMPLE CLASSIQUE", highlight: true },
      { type: 'formula', title: "DESCRIPTION", part1: "Adjectif", part2: "+ 的 (De)", result: "+ Nom", desc: "Ex: Une ROUGE voiture." },
      { type: 'example', hanzi: "红色的车", pinyin: "(Hóngsè de chē)", trans: "Une voiture rouge", label: "ADJECTIF + NOM", highlight: true },
      { type: 'hack', topLabel: "EXCEPTION", gesture: "❤️", title: "我妈妈", desc: "(Wǒ māma)", tip: "Pour les proches, on supprime le 'De'. On ne dit pas forcément 'Wǒ de māma'." },
      { type: 'cta', title: "MAÎTRISE LE DE", subtitle: "SUR XIAOLEARN", button: "EXERCICES 🔗" }
    ]
  },
  mercredi: {
    title: "Mercredi : Hot Water 🚰",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🚰", title: "LE REMÈDE", subtitle: "MIRACLE", tagline: "MÈME CHINOIS", content: "Un seul conseil pour tous vos problèmes.", footer: "LA SOLUTION 👉" },
      { type: 'hack', topLabel: "LA PHRASE CULTE", gesture: "🗣️", title: "多喝热水", desc: "(Duō hē rè shuǐ)", tip: "Littéralement : 'Bois plus d'eau chaude'." },
      { type: 'vs', icon: "🤒", header: "TU AS UN RHUME ?", hanzi: "多喝热水", pinyin: "(Duō hē rè shuǐ)", meaning: "Ça va passer.", bg: "#2F9D8A" },
      { type: 'vs', icon: "🤢", header: "MAL AU VENTRE ?", hanzi: "多喝热水", pinyin: "(Duō hē rè shuǐ)", meaning: "C'est bon pour la digestion.", bg: "#F43F5E" },
      { type: 'vs', icon: "😫", header: "TU ES FATIGUÉ ?", hanzi: "多喝热水", pinyin: "(Duō hē rè shuǐ)", meaning: "Ça détend.", bg: "#3b82f6" },
      { type: 'hack', topLabel: "RÉALITÉ", gesture: "😂", title: "敷衍 (Fūyǎn)", desc: "Réponse bâclée", tip: "Les filles détestent cette réponse ! C'est vu comme un manque d'effort émotionnel." },
      { type: 'cta', title: "ARGOT CHINOIS", subtitle: "SUR XIAOLEARN", button: "APPRENDRE + 🔗" }
    ]
  },
  vendredi: {
    title: "Vendredi : La Face 🎭",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🎭", title: "AVOIR DE", subtitle: "LA FACE", tagline: "CULTURE & SOCIÉTÉ", content: "Le concept le plus important en Chine (Miànzi).", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "DÉFINITION", gesture: "😎", title: "面子 (Miànzi)", desc: "La Face / Réputation", tip: "C'est votre image publique et votre statut social." },
      { type: 'hack', topLabel: "RÈGLE N°1", gesture: "🎁", title: "给面子", desc: "(Gěi miànzi) Donner la face", tip: "Complimenter en public, payer l'addition... Vous grandissez l'autre." },
      { type: 'hack', topLabel: "RÈGLE N°2", gesture: "😱", title: "丢面子", desc: "(Diū miànzi) Perdre la face", tip: "Être critiqué ou contredit en public. La pire chose qui puisse arriver." },
      { type: 'hack', topLabel: "AU TRAVAIL", gesture: "👔", title: "不 (Bù)", desc: "Jamais de 'Non' direct", tip: "Un Chinois dira rarement 'Non' pour ne pas vous faire perdre la face. Il dira 'On va réfléchir'." },
      { type: 'list', title: "EN BREF", items: [
        {char:"Critique", sub:"Jamais en public !", icon:"🚫"},
        {char:"Compliment", sub:"Toujours devant les autres", icon:"✅"},
        {char:"Refus", sub:"Contourner le sujet", icon:"🔄"}
      ]},
      { type: 'cta', title: "GUIDE BUSINESS", subtitle: "SUR XIAOLEARN", button: "LIEN EN BIO 🔗" }
    ]
  },
  dimanche: {
    title: "Dimanche : Ton 3+3 📉",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "📉", title: "LA RÈGLE", subtitle: "DU 3+3", tagline: "PRONONCIATION AVANCÉE", content: "Pourquoi 'Nǐ Hǎo' ne se prononce pas comme on l'apprend.", footer: "LE SECRET 👉" },
      { type: 'hack', topLabel: "LE PROBLÈME", gesture: "😫", title: "3ème Ton (v)", desc: "Trop long !", tip: "Le 3ème ton descend et remonte. En faire deux de suite est fatiguant." },
      { type: 'formula', title: "LA RÈGLE MAGIQUE", part1: "3ème Ton", part2: "+ 3ème Ton", result: "= 2ème + 3ème", desc: "Le premier change, le deuxième reste !" },
      { type: 'example', hanzi: "你好", pinyin: "Nǐ (3) + Hǎo (3)", trans: "Se prononce : Ní Hǎo (2+3)", label: "BONJOUR", highlight: true },
      { type: 'example', hanzi: "老虎", pinyin: "Lǎo (3) + Hǔ (3)", trans: "Se prononce : Láo Hǔ (2+3)", label: "TIGRE", highlight: true },
      { type: 'hack', topLabel: "ATTENTION", gesture: "✍️", title: "À l'écrit", desc: "Ça ne change pas", tip: "On écrit toujours les tons d'origine (Nǐ Hǎo). Le changement se fait uniquement à l'oral." },
      { type: 'cta', title: "ENTRAÎNE TON", subtitle: "OREILLE", button: "ÉCOUTER MAINTENANT 🔗"}
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
                link.download = `xiaolearn-S7-${day}-carré-${index + 1}.png`;
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
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 7 (Avec Hanzi)</h1>
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
                <div className="flex-1 flex flex-col justify-center items-center p-10 text-center relative">
                  <div className="absolute top-0 right-0 w-36 h-36 opacity-10 rounded-bl-full" style={{background: themeColor}}></div>
                  <div className="text-6xl mb-5">{slide.icon}</div>
                  <h2 className="text-5xl font-black text-gray-800 leading-tight mb-2">{slide.title}</h2>
                  <h2 className="text-3xl font-black mb-8 leading-none" style={{color: themeColor}}>{slide.subtitle}</h2>
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

              {/* VS (Lundi) */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-10 text-center">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-8xl mb-6">{slide.icon}</div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
                  <p className="text-lg text-gray-500 italic mb-6">{slide.pinyin}</p>
                  <div className="w-full py-3 rounded-xl text-white font-bold text-xl shadow-lg" style={{background: slide.bg}}>{slide.meaning}</div>
                </div>
              )}

              {/* EXAMPLE */}
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

              {/* HACK */}
              {slide.type === 'hack' && (
                <div className="flex-1 flex flex-col justify-center items-center px-8 py-6 text-center">
                   {slide.topLabel && <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 pb-1.5" style={{color: themeColor, borderColor: themeColor+'30'}}>{slide.topLabel}</h3>}

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

              {/* FORMULA (Lundi & Dimanche) */}
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

              {/* LIST (Vendredi Récap) */}
              {slide.type === 'list' && (
                <div className="flex-1 flex flex-col p-10 pt-20">
                  <h3 className="text-2xl font-black text-center text-gray-800 mb-8">{slide.title}</h3>
                  <div className="flex flex-col gap-4">
                    {slide.items.map((it, i) => (
                      <div key={i} className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-3xl w-12 text-center mr-4">{it.icon}</span>
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-800 block text-xl mb-1">{it.char}</span>
                          <span className="text-sm text-gray-400 font-mono">{it.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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