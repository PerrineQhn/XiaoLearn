/**
 * Métadonnées des niveaux CECR — partagées entre cours.tsx et index.tsx
 */
import { type CecrLevelSlug } from './cecrBilans';

export interface CecrModule { id: string; name: string; nameEn: string }
export interface CecrLevel  { id: string; label: string; name: string; nameEn: string; icon: string; color: string; modules: CecrModule[] }

const LEVEL_COLOR: Record<string, string> = {
  green:'#4CAF50', yellow:'#F9A825', lime:'#8BC34A', emerald:'#2F9D8A',
  cyan:'#00BCD4', teal:'#009688', sky:'#03A9F4', indigo:'#3F51B5',
  purple:'#9C27B0', rose:'#E91E63',
};

export const CECR_LEVELS: CecrLevel[] = [
  { id:'cecr-a1',    label:'A1',    name:'Fondations', nameEn:'Foundations',         icon:'🌱', color:LEVEL_COLOR.green,
    modules:[
      {id:'cecr-a1-pinyin',       name:'Pinyin & tons', nameEn:'Pinyin & Tones'},
      {id:'cecr-a1-hello',        name:'Salutations & présentations', nameEn:'Greetings & Introductions'},
      {id:'cecr-a1-numbers',      name:'Nombres & temps', nameEn:'Numbers & Time'},
      {id:'cecr-a1-family',       name:'Famille & moi', nameEn:'Family & Me'},
      {id:'cecr-a1-grammar',      name:'Grammaire & vie quotidienne', nameEn:'Grammar & Daily Life'},
      {id:'cecr-a1-conversation', name:'Conversation : politesse et fluidité', nameEn:'Conversation: politeness and flow'},
      {id:'cecr-a1-nuances',      name:'Nuances : paires de mots qui troublent', nameEn:'Nuances: tricky word pairs'},
    ]},
  { id:'cecr-a2',    label:'A2',    name:'Survie', nameEn:'Survival',             icon:'🎒', color:LEVEL_COLOR.yellow,
    modules:[
      {id:'cecr-a2-city',         name:'En ville & transports', nameEn:'In town & transports'},
      {id:'cecr-a2-grammar',      name:'Grammaire A2', nameEn:'A2 Grammar'},
      {id:'cecr-a2-food-shopping',name:'Restaurants & courses', nameEn:'Dining & Shopping'},
      {id:'cecr-a2-day-phone',    name:'Journée & communication', nameEn:'Daily Routine & Communication'},
      {id:'cecr-a2-culture',      name:'Fêtes & traditions', nameEn:'Festivals & traditions'},
      {id:'cecr-a2-conversation', name:'Conversation : vie pratique', nameEn:'Conversation: practical life'},
      {id:'cecr-a2-nuances',      name:'Nuances : tôt/tard, encore, avec, en cours', nameEn:'Nuances: early/late, again, with, ongoing'},
    ]},
  { id:'cecr-b1-1',  label:'B1.1',  name:'Seuil débutant', nameEn:'Threshold Novice',    icon:'📖', color:LEVEL_COLOR.lime,
    modules:[
      {id:'cecr-b11-grammar',         name:'Grammaire B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的', nameEn:'Grammar B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的'},
      {id:'cecr-b11-work',            name:'Travail & carrière', nameEn:'Work & career'},
      {id:'cecr-b11-travel',          name:'Voyage en Chine', nameEn:'Traveling in China'},
      {id:'cecr-b11-emotions-health', name:'Émotions & santé', nameEn:'Feelings & Health'},
      {id:'cecr-b11-conversation',    name:'Conversation : opinion, récit, débat', nameEn:'Conversation: opinion, narrative, debate'},
      {id:'cecr-b11-nuances',         name:'Nuances : causatifs, prépositions, aspectuels', nameEn:'Nuances: causatives, prepositions, aspectuals'},
    ]},
  { id:'cecr-b1-2',  label:'B1.2',  name:'Seuil confirmé', nameEn:'Threshold Confirmed',    icon:'🔧', color:LEVEL_COLOR.emerald,
    modules:[
      {id:'cecr-b12-grammar',           name:'Grammaire B1.2 — modaux · négation · compléments', nameEn:'Grammar B1.2 — modals · negation · complements'},
      {id:'cecr-b12-narration',         name:'Récits & anecdotes', nameEn:'Stories & anecdotes'},
      {id:'cecr-b12-education-society', name:'Éducation & société', nameEn:'Education & Society'},
      {id:'cecr-b12-media',             name:'Médias & actualité', nameEn:'Media & news'},
      {id:'cecr-b12-conversation',      name:'Conversation : critique, nostalgie, débat', nameEn:'Conversation: critique, nostalgia, debate'},
      {id:'cecr-b12-nuances',           name:'Nuances : 刚/刚才, 完成/结束, 难道/不一定, 把/将', nameEn:'Nuances: 刚/刚才, 完成/结束, 难道/不一定, 把/将, 当/在 X 的时候'},
    ]},
  { id:'cecr-b2-1',  label:'B2.1',  name:'Avancé débutant', nameEn:'Advanced Novice',   icon:'🎯', color:LEVEL_COLOR.cyan,
    modules:[
      {id:'cecr-b21-grammar',      name:'Grammaire B2.1 — connecteurs & emphase', nameEn:'Grammar B2.1 — Connectors & Emphasis'},
      {id:'cecr-b21-tech',         name:'Technologie et internet', nameEn:'Technology and internet'},
      {id:'cecr-b21-env',          name:'Environnement et société', nameEn:'Environment and society'},
      {id:'cecr-b21-economics',    name:'Économie et travail', nameEn:'Economy and work'},
      {id:'cecr-b21-conversation', name:'Conversation pro avancée', nameEn:'Advanced pro conversation'},
      {id:'cecr-b21-nuances',      name:'Nuances : connecteurs et triplets subtils', nameEn:'Nuances: connectors and subtle triplets'},
    ]},
  { id:'cecr-b2-2',  label:'B2.2',  name:'Avancé confirmé', nameEn:'Advanced Confirmed',   icon:'⚖️', color:LEVEL_COLOR.teal,
    modules:[
      {id:'cecr-b22-grammar-structure', name:'Structures argumentatives fines', nameEn:'Fine argumentative structures'},
      {id:'cecr-b22-debate',            name:'Argumentation et débat', nameEn:'Argumentation and debate'},
      {id:'cecr-b22-arts',              name:'Arts et culture', nameEn:'Arts and culture'},
      {id:'cecr-b22-health',            name:'Santé et bien-être', nameEn:'Health and well-being'},
      {id:'cecr-b22-conversation',      name:'Conversation avancée', nameEn:'Advanced conversation'},
      {id:'cecr-b22-nuances',           name:'Nuances : paires de mots subtils', nameEn:'Nuances: subtle word pairs'},
    ]},
  { id:'cecr-c1-1',  label:'C1.1',  name:'Autonome débutant', nameEn:'Autonomous Novice', icon:'🏛️', color:LEVEL_COLOR.sky,
    modules:[
      {id:'cecr-c11-chengyu-basic',  name:'成语 : expressions à 4 caractères (essentiels)', nameEn:'成语: four-character expressions (essentials)'},
      {id:'cecr-c11-style-formal',   name:'Style formel et écrits professionnels', nameEn:'Formal style and professional writing'},
      {id:'cecr-c11-history',        name:'Histoire et patrimoine littéraire', nameEn:'History and literary heritage'},
      {id:'cecr-c11-media-discourse',name:'Presse et discours institutionnel', nameEn:'Press and institutional discourse'},
      {id:'cecr-c11-conversation',   name:'Conversation soutenue C1.1', nameEn:'Formal C1.1 conversation'},
      {id:'cecr-c11-nuances',        name:'Nuances soutenues C1.1', nameEn:'Formal C1.1 nuances'},
    ]},
  { id:'cecr-c1-2',  label:'C1.2',  name:'Autonome confirmé', nameEn:'Autonomous Confirmed', icon:'📚', color:LEVEL_COLOR.indigo,
    modules:[
      {id:'cecr-c12-chengyu-advanced', name:'成语 avancés et allusions classiques', nameEn:'Advanced chengyu and classical allusions'},
      {id:'cecr-c12-business',         name:'Monde des affaires : 关系, 面子, négociation', nameEn:'Business world: 关系, 面子, negotiation'},
      {id:'cecr-c12-education-system', name:'Système éducatif et 高考', nameEn:'Education system and the 高考'},
      {id:'cecr-c12-law-society',      name:'Droit et débats de société', nameEn:'Law and social debates'},
      {id:'cecr-c12-conversation',     name:'Conversation business / juridique C1.2', nameEn:'Business / legal conversation C1.2'},
      {id:'cecr-c12-nuances',          name:'Nuances pro/business C1.2', nameEn:'Pro/business nuances C1.2'},
    ]},
  { id:'cecr-c2-1',  label:'C2.1',  name:'Maîtrise débutante', nameEn:'Mastery Novice',icon:'🏮', color:LEVEL_COLOR.purple,
    modules:[
      {id:'cecr-c21-wenyan-intro',    name:'文言文 : initiation au chinois classique', nameEn:'文言文: introduction to classical Chinese'},
      {id:'cecr-c21-philo-classique', name:'Philosophie classique : 儒, 道, 法, 佛', nameEn:'Classical philosophy: 儒, 道, 法, 佛'},
      {id:'cecr-c21-poetry',          name:'Poésie Tang et formes classiques', nameEn:'Tang poetry and classical forms'},
      {id:'cecr-c21-conversation',    name:'Conversation lettrée C2.1', nameEn:'Literate C2.1 conversation'},
      {id:'cecr-c21-nuances',         name:'Nuances philosophiques C2.1', nameEn:'Philosophical nuances C2.1'},
    ]},
  { id:'cecr-c2-2',  label:'C2.2',  name:'Maîtrise', nameEn:'Mastery',          icon:'☯️', color:LEVEL_COLOR.rose,
    modules:[
      // `cecr-c22-discourse` portait ce libellé sans avoir jamais eu de leçon ;
      // `cecr-c22-rhetoric-translation`, qui en a six et traite exactement ce
      // sujet, n'était rattaché à aucun niveau. Le module vide est donc
      // remplacé par celui qui existe, plutôt que gardé à côté.
      {id:'cecr-c22-rhetoric-translation', name:'Rhétorique, style et traduction', nameEn:'Rhetoric, style and translation'},
      {id:'cecr-c22-modern-lit',      name:'Littérature moderne et contemporaine', nameEn:'Modern and contemporary literature'},
      {id:'cecr-c22-dialects',        name:'Langues et variétés du monde sinophone', nameEn:'Languages and varieties of the Sinophone world'},
      {id:'cecr-c22-global-china',    name:'La Chine dans le monde', nameEn:'China in the world'},
      {id:'cecr-c22-conversation',    name:'Conversation lettrée C2.2', nameEn:'Mastery conversation C2.2'},
      {id:'cecr-c22-nuances',         name:'Nuances ultimes C2.2', nameEn:'Ultimate C2.2 nuances'},
    ]},
];

export const LEVEL_SLUG: Record<string, CecrLevelSlug> = {
  'cecr-a1':   'a1',   'cecr-a2':   'a2',
  'cecr-b1-1': 'b1.1', 'cecr-b1-2': 'b1.2',
  'cecr-b2-1': 'b2.1', 'cecr-b2-2': 'b2.2',
  'cecr-c1-1': 'c1.1', 'cecr-c1-2': 'c1.2',
  'cecr-c2-1': 'c2.1', 'cecr-c2-2': 'c2.2',
};

/** Map moduleId → CecrLevel (pour lookup rapide depuis une leçon) */
export const MODULE_TO_LEVEL: Record<string, CecrLevel> = Object.fromEntries(
  CECR_LEVELS.flatMap(level => level.modules.map(m => [m.id, level]))
);
