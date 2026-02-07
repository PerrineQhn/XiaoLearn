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
    title: "Lundi : La Date 📅",
    color: "#E84A4A",
    slides: [
      { type: 'cover', icon: "📅", title: "DIRE LA", subtitle: "DATE", tagline: "GRAMMAIRE HSK 1", content: "Oubliez la logique française !", footer: "SWIPE 👉" },
      { type: 'hack', topLabel: "LA LOGIQUE", gesture: "🔻", title: "L'Entonnoir", desc: "Du + Grand au + Petit", tip: "Imaginez un zoom : On part de l'année (large) pour arriver au jour (précis)." },
      { type: 'example', hanzi: "2023年", pinyin: "Èr líng èr sān nián", trans: "Année 2023", label: "ÉTAPE 1 : L'ANNÉE", highlight: false },
      { type: 'example', hanzi: "12月", pinyin: "Shí èr yuè", trans: "Décembre (12e mois)", label: "ÉTAPE 2 : LE MOIS", highlight: false },
      { type: 'example', hanzi: "25日", pinyin: "Èr shí wǔ rì", trans: "25ème jour", label: "ÉTAPE 3 : LE JOUR", highlight: false },
      { type: 'vs', icon: "🇨🇳", header: "RÉSULTAT FINAL", hanzi: "2023年 12月 25日", pinyin: "Année / Mois / Jour", meaning: "L'inverse du français !", bg: "#E84A4A" },
      { type: 'hack', topLabel: "POUR LE JOUR", gesture: "🗣️", title: "Rì (日) vs Hào (号)", desc: "Écrit vs Oral", tip: "À l'écrit on utilise Rì (日). À l'oral on dit souvent Hào (号). Ex: 25 Hào." },
      { type: 'hack', topLabel: "QUIZ RAPIDE", gesture: "❓", title: "14 Juillet 1789", desc: "Comment le dire ?", tip: "T'as trouvé ? Réponse en légende" },
      { type: 'cta', title: "EXERCE-TOI", subtitle: "SUR XIAOLEARN", button: "QUIZ GRATUIT 🔗" }
    ]
  },
  mercredi: {
    title: "Mercredi : Zodiaque (1/2) 🐲",
    color: "#2F9D8A",
    slides: [
      { type: 'cover', icon: "🐲", title: "TON SIGNE", subtitle: "CHINOIS (1/2)", tagline: "LES 6 PREMIERS", content: "Quel animal es-tu ?", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "1. LE RAT", gesture: "🐭", title: "鼠 (Shǔ)", desc: "Intelligent & Vif", tip: "Années : 1996, 2008, 2020. Le premier arrivé dans la légende !" },
      { type: 'hack', topLabel: "2. LE BŒUF", gesture: "🐮", title: "牛 (Niú)", desc: "Fiable & Travailleur", tip: "Années : 1997, 2009, 2021. Patient et déterminé." },
      { type: 'hack', topLabel: "3. LE TIGRE", gesture: "🐯", title: "虎 (Hǔ)", desc: "Courageux & Leader", tip: "Années : 1998, 2010, 2022. Charmeur et imprévisible." },
      { type: 'hack', topLabel: "4. LE LAPIN", gesture: "🐰", title: "兔 (Tù)", desc: "Doux & Élégant", tip: "Années : 1999, 2011, 2023. Déteste le conflit, très diplomate." },
      { type: 'hack', topLabel: "5. LE DRAGON", gesture: "🐉", title: "龙 (Lóng)", desc: "Puissant & Chanceux", tip: "Années : 2000, 2012, 2024. Le signe de l'Empereur." },
      { type: 'hack', topLabel: "6. LE SERPENT", gesture: "🐍", title: "蛇 (Shé)", desc: "Sage & Mystérieux", tip: "Années : 2001, 2013, 2025. Souvent appelé 'Petit Dragon'." },
      { type: 'hack', topLabel: "ATTENTION !", gesture: "⚠️", title: "本命年 (Běn Mìng Nián)", desc: "Ton année revient (tous les 12 ans)", tip: "Quand c'est l'année de TON animal, c'est l'année de tous les dangers ! Porte du rouge (ceinture, chaussettes...) pour te protéger de la malchance." },
      { type: 'cta', title: "LA SUITE...", subtitle: "LA SEMAINE PROCHAINE", button: "ABONNE-TOI 🔗" }
    ]
  },
  vendredi: {
    title: "Vendredi : Le Thé 🍵",
    color: "#F97316",
    slides: [
      { type: 'cover', icon: "🍵", title: "CULTURE", subtitle: "DU THÉ", tagline: "ÉTIQUETTE À TABLE", content: "Les codes secrets pour ne pas passer pour un touriste.", footer: "DÉCOUVRIR 👉" },
      { type: 'hack', topLabel: "LE GESTE SECRET", gesture: "👇", title: "Taper 2 doigts", desc: "Sur la table", tip: "Quand on vous sert, tapez deux fois l'index et le majeur pour dire merci." },
      { type: 'hack', topLabel: "L'ORIGINE", gesture: "🤴", title: "L'Empereur", desc: "Incognito", tip: "Un empereur servait ses serviteurs. Ils ont mimé une courbette avec les doigts pour le remercier." },
      { type: 'hack', topLabel: "SERVIR", gesture: "🫖", title: "Jamais à soi d'abord", desc: "Politesse", tip: "Servez toujours les invités les plus âgés en premier. Votre tasse en dernier !" },
      { type: 'hack', topLabel: "REMPLIR", gesture: "🌊", title: "70% Plein", desc: "Pas à ras bord", tip: "Le thé chaud brûle. On laisse de la place pour tenir la tasse ('Le vin plein, le thé à moitié')." },
      { type: 'hack', topLabel: "PLUS DE THÉ ?", gesture: "🔓", title: "Le Couvercle", desc: "Posez-le à l'envers", tip: "Au restaurant, si la théière est vide, retournez le couvercle ou posez-le sur l'anse. Le serveur comprendra." },
      { type: 'list', title: "RÉCAP", items: [
        {char:"Merci", sub:"Taper 2 doigts", icon:"✌️"},
        {char:"Respect", sub:"Aînés d'abord", icon:"👴"},
        {char:"Refill", sub:"Ouvrir couvercle", icon:"🫖"}
      ]},
      { type: 'cta', title: "GUIDE CULTURE", subtitle: "SUR XIAOLEARN", button: "LIEN EN BIO 🔗" }
    ]
  },
  dimanche: {
    title: "Dimanche : Classif. 📦",
    color: "#3b82f6",
    slides: [
      { type: 'cover', icon: "📦", title: "LES MOTS DE", subtitle: "MESURE", tagline: "GRAMMAIRE HSK 2", content: "Pourquoi on ne dit pas 'Un Chat' ?", footer: "LA LOGIQUE 👉" },
      { type: 'hack', topLabel: "LE CONCEPT", gesture: "🧱", title: "Pas de 'Un + Nom'", desc: "Il faut une boîte !", tip: "En chinois, on compte les 'paquets' d'objets, pas les objets eux-mêmes." },
      { type: 'formula', title: "LA FORMULE", part1: "Chiffre", part2: "+ Classificateur", result: "+ Objet", desc: "Ex: Un (bout de) papier." },
      { type: 'example', hanzi: "个 (Gè)", pinyin: "Le Passe-Partout", trans: "1 Personne = Yī gè rén", label: "POUR LES GENS / GÉNÉRAL", highlight: true },
      { type: 'example', hanzi: "只 (Zhī)", pinyin: "Pour les animaux", trans: "1 Chat = Yī zhī māo", label: "POUR LES PETITES BÊTES", highlight: true },
      { type: 'example', hanzi: "本 (Běn)", pinyin: "Objets reliés", trans: "1 Livre = Yī běn shū", label: "LIVRES / CAHIERS", highlight: true },
      { type: 'example', hanzi: "条 (Tiáo)", pinyin: "Objets longs & souples", trans: "1 Pantalon = Yī tiáo kùzi", label: "RIVIÈRES / PANTALONS / POISSONS", highlight: true },
      { type: 'example', hanzi: "张 (Zhāng)", pinyin: "Objets plats", trans: "1 Table = Yī zhāng zhuōzi", label: "PAPIER / TABLE / LIT", highlight: true },
      { type: 'cta', title: "APPRENDS VITE", subtitle: "AVEC XIAOLEARN", button: "TESTER L'APP 🔗" }
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
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      
      {/* MENU */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        <div className="flex items-center gap-4">
            <div className="relative group">
                <PandaLogo className="w-12 h-12 border shadow-sm" src={currentLogo}/>
                 {!logoUrl && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Semaine 5 (Format Carré - Étendu)</h1>
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

              {/* VS (Lundi & Mercredi) */}
              {slide.type === 'vs' && (
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{slide.header}</p>
                  <div className="text-7xl mb-5">{slide.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{slide.hanzi}</h3>
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
                   <h3 className="text-lg font-bold text-gray-800 mb-6">{slide.title}</h3>
                   <div className="flex items-center gap-2 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                     <span className="font-bold text-base text-gray-600">{slide.part1}</span>
                     <span className="font-bold text-lg" style={{color: themeColor}}>{slide.part2}</span>
                   </div>
                   <div className="text-xl font-bold mb-2">👇</div>
                   <div className="font-black text-xl text-gray-800 bg-red-50 px-5 py-2 rounded-full border border-red-100">{slide.result}</div>
                   <p className="mt-6 text-xs text-gray-400 italic">{slide.desc}</p>
                </div>
              )}

              {/* LIST (Vendredi Récap) */}
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