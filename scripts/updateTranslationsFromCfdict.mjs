import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.resolve('data');
const cfdictPath = path.join(dataDir, 'cfdict.xml');
const themeRules = [
  { id: 'salutations', keywords: ['hello','hi','goodbye','bye','thanks','thank','sorry','bonjour','salut','merci','désolé','pardon','bienvenue','au revoir'] },
  { id: 'famille', keywords: ['family','father','mother','sister','brother','parent','child','son','daughter','grand','aunt','uncle','père','mère','frère','soeur','fils','fille','famille','parents','mari','épouse'] },
  { id: 'nourriture', keywords: ['eat','food','meal','drink','rice','soup','vegetable','fruit','water','tea','coffee','cook','restaurant','manger','repas','boire','riz','soupe','légume','fruit','eau','thé','café','cuisine'] },
  { id: 'voyage', keywords: ['travel','trip','journey','hotel','vacation','voyage','séjour','hôtel','vacances'] },
  { id: 'transport', keywords: ['car','bus','train','bike','subway','plane','airport','road','street','station','taxi','ticket','voiture','bus','train','vélo','métro','avion','aéroport','route','rue','station','billet'] },
  { id: 'logement', keywords: ['house','home','room','bedroom','kitchen','bathroom','floor','building','maison','logement','chambre','cuisine','salle de bain','immeuble'] },
  { id: 'école', keywords: ['school','teacher','student','class','homework','lesson','exam','university','école','professeur','enseignant','élève','devoir','leçon','examen','université'] },
  { id: 'travail', keywords: ['work','job','office','boss','company','salary','business','travail','emploi','bureau','entreprise','patron','salaire'] },
  { id: 'loisirs', keywords: ['play','sport','music','movie','film','book','game','song','hobby','loisir','sport','musique','film','livre','jeu','chanson'] },
  { id: 'santé', keywords: ['doctor','hospital','medicine','sick','ill','healthy','santé','médecin','hôpital','malade','guérir'] },
  { id: 'nature', keywords: ['weather','rain','snow','wind','sun','cloud','river','mountain','tree','nature','pluie','neige','vent','soleil','nuage','rivière','montagne','arbre'] },
  { id: 'temps', keywords: ['day','month','year','week','hour','minute','time','yesterday','tomorrow','season','jour','mois','année','semaine','heure','minute','temps','hier','demain','saison'] },
  { id: 'émotions', keywords: ['happy','sad','love','angry','afraid','interested','emotion','émotion','heureux','triste','amour','colère','peur','intéressé'] },
  { id: 'corps', keywords: ['body','hand','head','eye','ear','mouth','face','leg','foot','heart','corps','main','tête','oeil','oreille','bouche','visage','jambe','pied','coeur'] },
  { id: 'shopping', keywords: ['buy','sell','shop','store','price','money','market','shopping','acheter','vendre','magasin','prix','argent','marché'] },
  { id: 'technologie', keywords: ['computer','phone','internet','email','television','radio','technology','ordinateur','téléphone','internet','email','télévision','radio'] },
  { id: 'animaux', keywords: ['dog','cat','animal','cow','horse','bird','fish','chien','chat','animal','vache','cheval','oiseau','poisson'] }
];
const themeIds = themeRules.map((rule) => rule.id);

function extractTag(block, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const match = block.match(regex);
  return match ? match[1].trim() : '';
}

function extractCdataList(block, tag) {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'g');
  const results = [];
  let match;
  while ((match = regex.exec(block)) !== null) {
    const value = match[1].trim();
    if (value) results.push(value);
  }
  return results;
}

async function parseCfdict(filePath) {
  const xml = await fs.readFile(filePath, 'utf-8');
  const map = new Map();
  const wordRegex = /<word>([\s\S]*?)<\/word>/g;
  let match;
  while ((match = wordRegex.exec(xml)) !== null) {
    const block = match[1];
    const simp = extractTag(block, 'simp');
    if (!simp) continue;
    const translations = extractCdataList(block, 'fr');
    if (translations.length === 0) continue;
    const existing = map.get(simp) ?? [];
    const merged = Array.from(new Set([...existing, ...translations]));
    map.set(simp, merged);
  }
  return map;
}

function inferTheme(en = '', fr = '', hanzi = '') {
  const haystack = `${hanzi} ${en || ''} ${fr || ''}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\p{ASCII}]/gu, ' ')
    .replace(/[^a-z\s]/g, ' ');
  const tokens = new Set(haystack.split(/\s+/).filter(Boolean));
  for (const rule of themeRules) {
    if (rule.keywords.some((keyword) => tokens.has(keyword))) {
      return rule.id;
    }
  }
  return 'général';
}

async function updateFiles() {
  const dict = await parseCfdict(cfdictPath);
  const files = await fs.readdir(dataDir);
  const targetFiles = files.filter((name) => /^hsk[1-7]\.json$/.test(name));

  for (const file of targetFiles) {
    const filePath = path.join(dataDir, file);
    const payload = await fs.readFile(filePath, 'utf-8');
    const lessons = JSON.parse(payload);
    let updated = false;

    for (const entry of lessons) {
      const frList = dict.get(entry.hanzi);
      if (frList && frList.length > 0) {
        const newFr = frList[0];
        if (entry.translationFr !== newFr) {
          entry.translationFr = newFr;
          updated = true;
        }
        if (frList.length > 1) {
          entry.translationFrAlt = frList.slice(1);
        }
      }

      const newTheme = inferTheme(entry.translation, entry.translationFr, entry.hanzi);
      if (entry.theme !== newTheme) {
        entry.theme = newTheme;
        updated = true;
        if (Array.isArray(entry.tags)) {
          entry.tags = entry.tags.filter((tag) => !themeIds.includes(tag));
          if (!entry.tags.includes(newTheme)) {
            entry.tags.push(newTheme);
          }
        }
      }
    }

    if (updated) {
      await fs.writeFile(filePath, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
      console.log(`Mise à jour: ${file}`);
    } else {
      console.log(`Aucun changement: ${file}`);
    }
  }
}

updateFiles().catch((err) => {
  console.error('Erreur pendant la mise à jour:', err);
  process.exit(1);
});
