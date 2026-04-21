/**
 * PolitenessRegister.tsx — composants d'affichage des registres de politesse
 * ---------------------------------------------------------------------------
 * Surface la dimension « politesse » de façon explicite dans XiaoLearn
 * (demande NoComment V6).
 *
 * Exporte :
 *   - `PolitenessRegisterBadge` : chip coloré (casual / neutral-polite /
 *     formal / business) affichable n'importe où.
 *   - `PolitenessRegisterCheatsheet` : carte repliable qui explique les 4
 *     registres + exemples hanzi/pinyin, utilisable en fiche briefing ou
 *     en aide-mémoire de leçon.
 *
 * Styles : ./../styles/politeness-register.css (scoped sous .preg).
 */
import { useState } from 'react';
import type { PolitenessRegister } from '../types/simulator';
import '../styles/politeness-register.css';

// ============================================================================
//  META : label, couleur, explication courte par registre
// ============================================================================

export type RegisterLang = 'fr' | 'en';

interface RegisterMeta {
  key: PolitenessRegister;
  labelFr: string;
  labelEn: string;
  shortFr: string;
  shortEn: string;
  longFr: string;
  longEn: string;
  /** Exemple hanzi d'une même idée (« bonjour » / « merci ») pour contraste. */
  exampleHanzi: string;
  examplePinyin: string;
  exampleFr: string;
  exampleEn: string;
}

export const REGISTER_META: RegisterMeta[] = [
  {
    key: 'casual',
    labelFr: 'Familier',
    labelEn: 'Casual',
    shortFr: 'entre amis / famille',
    shortEn: 'friends / family',
    longFr:
      'Entre amis, famille proche ou pairs. On utilise 你 (nǐ), on peut couper les phrases, et les formules de politesse sont optionnelles.',
    longEn:
      'Friends, close family, peers. You use 你 (nǐ), sentences can be trimmed, politeness markers are optional.',
    exampleHanzi: '你好',
    examplePinyin: 'nǐ hǎo',
    exampleFr: 'Salut',
    exampleEn: 'Hi'
  },
  {
    key: 'neutral-polite',
    labelFr: 'Poli standard',
    labelEn: 'Polite (standard)',
    shortFr: 'inconnus, contextes quotidiens',
    shortEn: 'strangers, everyday contexts',
    longFr:
      'Registre par défaut : boutiques, restaurants, collègues, inconnus croisés dans la rue. 您 (nín) quand on veut marquer le respect, 请 (qǐng) ponctuellement.',
    longEn:
      'Default register: shops, restaurants, colleagues, strangers. 您 (nín) when showing respect, 请 (qǐng) occasionally.',
    exampleHanzi: '您好',
    examplePinyin: 'nín hǎo',
    exampleFr: 'Bonjour',
    exampleEn: 'Hello'
  },
  {
    key: 'formal',
    labelFr: 'Très poli',
    labelEn: 'Formal',
    shortFr: 'anciens, rituels, cérémonies',
    shortEn: 'seniors, rituals, ceremonies',
    longFr:
      'Très poli. 您 systématique, 请 en tête de demande, formules honorifiques (敬), vocabulaire soigné. À utiliser avec des aînés, dans des cérémonies, ou pour marquer une déférence particulière.',
    longEn:
      'Very polite. Systematic 您, 请 leading requests, honorific formulas (敬), careful vocabulary. Use with seniors, in ceremonies, or to mark special deference.',
    exampleHanzi: '您好，请问…',
    examplePinyin: 'nín hǎo, qǐng wèn…',
    exampleFr: 'Bonjour, puis-je vous demander…',
    exampleEn: 'Hello, may I ask…'
  },
  {
    key: 'business',
    labelFr: 'Professionnel',
    labelEn: 'Business',
    shortFr: 'bureau, titres, réunions',
    shortEn: 'office, titles, meetings',
    longFr:
      'Registre pro : on utilise les titres (经理 jīnglǐ « manager », 总 zǒng « chef »), 您 pour les supérieurs et clients, structures figées (敬请, 烦请). Mail et réunions de travail.',
    longEn:
      'Professional register: titles (经理 jīnglǐ "manager", 总 zǒng "chief"), 您 for superiors and clients, set structures (敬请, 烦请). Email and work meetings.',
    exampleHanzi: '王经理，您好',
    examplePinyin: 'Wáng jīnglǐ, nín hǎo',
    exampleFr: 'Bonjour, Directeur Wang',
    exampleEn: 'Hello, Manager Wang'
  }
];

function getMeta(reg: PolitenessRegister): RegisterMeta {
  return REGISTER_META.find((r) => r.key === reg) ?? REGISTER_META[1];
}

// ============================================================================
//  Badge
// ============================================================================

export interface PolitenessRegisterBadgeProps {
  register: PolitenessRegister;
  language?: RegisterLang;
  /** Si true, affiche uniquement le libellé court sans point de couleur. */
  compact?: boolean;
  /** Ajoute un title HTML (tooltip survol) avec l'explication courte. */
  withTooltip?: boolean;
  className?: string;
}

export function PolitenessRegisterBadge({
  register,
  language = 'fr',
  compact,
  withTooltip = true,
  className
}: PolitenessRegisterBadgeProps) {
  const meta = getMeta(register);
  const label = language === 'en' ? meta.labelEn : meta.labelFr;
  const short = language === 'en' ? meta.shortEn : meta.shortFr;
  return (
    <span
      className={`preg-badge preg-badge--${register}${compact ? ' preg-badge--compact' : ''}${className ? ' ' + className : ''}`}
      title={withTooltip ? `${label} — ${short}` : undefined}
    >
      {!compact && <span className="preg-badge-dot" aria-hidden />}
      <span className="preg-badge-label">{label}</span>
    </span>
  );
}

// ============================================================================
//  Cheatsheet
// ============================================================================

export interface PolitenessRegisterCheatsheetProps {
  language?: RegisterLang;
  /** Si true, démarre déplié. Par défaut replié (économie d'espace). */
  defaultExpanded?: boolean;
  /** Met un registre en avant (ex: celui du scénario en cours). */
  highlight?: PolitenessRegister;
}

const CHEATSHEET_COPY = {
  fr: {
    title: 'Registres de politesse',
    subtitle:
      "4 registres à connaître en chinois — clique pour voir les différences et des exemples.",
    expand: 'Voir le détail',
    collapse: 'Réduire',
    exampleLabel: 'Exemple'
  },
  en: {
    title: 'Politeness registers',
    subtitle:
      '4 registers to know in Chinese — click to see differences and examples.',
    expand: 'Show details',
    collapse: 'Collapse',
    exampleLabel: 'Example'
  }
} as const;

export function PolitenessRegisterCheatsheet({
  language = 'fr',
  defaultExpanded = false,
  highlight
}: PolitenessRegisterCheatsheetProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const copy = CHEATSHEET_COPY[language];
  return (
    <section className={`preg-cheatsheet ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="preg-cheatsheet-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="preg-cheatsheet-title">
          <span aria-hidden>🎚️</span> {copy.title}
        </span>
        <span className="preg-cheatsheet-toggle">
          {open ? copy.collapse : copy.expand}
        </span>
      </button>
      {!open && <p className="preg-cheatsheet-sub">{copy.subtitle}</p>}
      {open && (
        <ul className="preg-cheatsheet-list">
          {REGISTER_META.map((meta) => {
            const isHighlight = meta.key === highlight;
            return (
              <li
                key={meta.key}
                className={`preg-cheatsheet-item preg-cheatsheet-item--${meta.key}${isHighlight ? ' is-highlight' : ''}`}
              >
                <header className="preg-cheatsheet-item-head">
                  <PolitenessRegisterBadge
                    register={meta.key}
                    language={language}
                    withTooltip={false}
                  />
                  <span className="preg-cheatsheet-short">
                    {language === 'en' ? meta.shortEn : meta.shortFr}
                  </span>
                </header>
                <p className="preg-cheatsheet-long">
                  {language === 'en' ? meta.longEn : meta.longFr}
                </p>
                <div className="preg-cheatsheet-example">
                  <span className="preg-cheatsheet-example-label">
                    {copy.exampleLabel}
                  </span>
                  <span className="preg-cheatsheet-example-hanzi">
                    {meta.exampleHanzi}
                  </span>
                  <span className="preg-cheatsheet-example-pinyin">
                    {meta.examplePinyin}
                  </span>
                  <span className="preg-cheatsheet-example-tr">
                    {language === 'en' ? meta.exampleEn : meta.exampleFr}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default PolitenessRegisterBadge;
