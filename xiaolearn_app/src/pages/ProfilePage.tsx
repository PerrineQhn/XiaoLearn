/**
 * ProfilePage
 * -----------
 * V9.12.2 — Calque fidèle de Seonsaengnim (/dashboard/profile/:id).
 *
 * Structure vue sur la référence (capture écran) :
 *   1. Hero cream (#f0f0ec) avec :
 *      - Avatar cercle 160px (gauche).
 *      - Ligne 1 : <h1> pseudo  +  Niv. X (pill rouge accent)  +  Lifetime
 *        (pill ambre)   |   [Modifier le profil] (pill outlined, top right).
 *      - Ligne 2 : 🌱 Apprenti · Membre depuis XX YYYY.
 *      - 4 tuiles stats blanches (⚡ EXP / 🔥 JOURS / ⭐ NIVEAU / 📚 MOTS).
 *      - "Progression Niveau X" + "Y/Z XP → Niv. X+1" + barre XP.
 *   2. Section "⚔️ Batailles" (placeholder local, pas de backend pour l'instant).
 *   3. Section "📊 Statistiques" (Leçons / Vocabulaire / Posts / Réponses).
 *   4. Calendrier d'activité (déplacé en bas, optionnel).
 */
import { useMemo } from 'react';
import type { Language } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import type { DashboardApi } from '../hooks/useDashboardState';

interface ProfilePageProps {
  language: Language;
  dashboard: DashboardApi;
  wordsMasteredCount: number;
  lessonsCompletedCount: number;
  onOpenSettings: () => void;
}

const MONTH_LABELS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
];
const MONTH_LABELS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const formatMemberSince = (dateStr: string | null | undefined, language: Language): string => {
  if (!dateStr) return language === 'fr' ? 'récemment' : 'recently';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return language === 'fr' ? 'récemment' : 'recently';
  const months = language === 'fr' ? MONTH_LABELS_FR : MONTH_LABELS_EN;
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const getRankLabel = (level: number, language: Language): { icon: string; label: string } => {
  const ranks = language === 'fr'
    ? [
        { icon: '🌱', label: 'Apprenti' },
        { icon: '🌿', label: 'Étudiant' },
        { icon: '🎋', label: 'Explorateur' },
        { icon: '🐼', label: 'Maître' },
        { icon: '🏮', label: 'Légende' }
      ]
    : [
        { icon: '🌱', label: 'Beginner' },
        { icon: '🌿', label: 'Student' },
        { icon: '🎋', label: 'Explorer' },
        { icon: '🐼', label: 'Master' },
        { icon: '🏮', label: 'Legend' }
      ];
  if (level < 3) return ranks[0];
  if (level < 6) return ranks[1];
  if (level < 10) return ranks[2];
  if (level < 15) return ranks[3];
  return ranks[4];
};

const ProfilePage = ({
  language,
  dashboard,
  wordsMasteredCount,
  lessonsCompletedCount,
  onOpenSettings
}: ProfilePageProps) => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const photoURL = user?.photoURL;
  const userInitial = displayName.charAt(0).toUpperCase();
  const memberSince = formatMemberSince(user?.metadata?.creationTime, language);

  const { xp, streak, activity } = dashboard;
  const rank = getRankLabel(xp.level, language);
  const progressPct = Math.max(0, Math.min(100, xp.progressPct));

  // Calendrier du mois en cours
  const calendarCells = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay();
    const days: ({ date: string; day: number; xp: number; isToday: boolean } | null)[] = [];
    for (let i = 0; i < startPad; i += 1) days.push(null);
    const todayIso = new Date().toISOString().slice(0, 10);
    for (let d = 1; d <= lastDay.getDate(); d += 1) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        date: iso,
        day: d,
        xp: activity[iso] || 0,
        isToday: iso === todayIso
      });
    }
    return days;
  }, [activity]);

  const monthLabel =
    (language === 'fr' ? MONTH_LABELS_FR : MONTH_LABELS_EN)[new Date().getMonth()] +
    ' ' +
    new Date().getFullYear();

  const stats = [
    { key: 'xp', icon: '⚡', label: 'EXP', value: xp.xp.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US') },
    {
      key: 'days',
      icon: '🔥',
      label: language === 'fr' ? 'JOURS' : 'DAYS',
      value: String(streak.current)
    },
    {
      key: 'level',
      icon: '⭐',
      label: language === 'fr' ? 'NIVEAU' : 'LEVEL',
      value: String(xp.level)
    },
    {
      key: 'words',
      icon: '📚',
      label: language === 'fr' ? 'MOTS' : 'WORDS',
      value: String(wordsMasteredCount)
    }
  ];

  const kpiStats = [
    {
      key: 'lessons',
      icon: '📖',
      label: language === 'fr' ? 'LEÇONS' : 'LESSONS',
      value: lessonsCompletedCount
    },
    {
      key: 'vocab',
      icon: '📝',
      label: language === 'fr' ? 'VOCABULAIRE' : 'VOCABULARY',
      value: wordsMasteredCount
    },
    {
      key: 'current',
      icon: '🔥',
      label: language === 'fr' ? 'SÉRIE ACTUELLE' : 'CURRENT STREAK',
      value: streak.current
    },
    {
      key: 'best',
      icon: '🏆',
      label: language === 'fr' ? 'MEILLEURE SÉRIE' : 'BEST STREAK',
      value: streak.best
    }
  ];

  const weekdayLabels =
    language === 'fr'
      ? ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Heuristique : considérer l'utilisateur "Lifetime" (inspiration 👑 Lifetime de
  // Seonsaengnim). Pour XiaoLearn on n'a pas encore de distinction payée/gratuite
  // ici ; on utilise une const pour préparer le plumbing futur.
  const isLifetime = false;

  return (
    <div className="profile-page">
      <div className="profile-grid">
        <div className="profile-main">
      {/* ------------------------------------------------------------- */}
      {/*  HERO card                                                    */}
      {/* ------------------------------------------------------------- */}
      <section className="profile-hero">
        <div className="profile-hero-row">
          <div className="profile-avatar-wrap">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="profile-avatar" />
            ) : (
              <div className="profile-avatar profile-avatar--placeholder">{userInitial}</div>
            )}
          </div>

          <div className="profile-hero-body">
            <div className="profile-hero-head">
              <div className="profile-hero-nameline">
                <h1 className="profile-name">{displayName}</h1>
                <span className="profile-badge profile-badge--level">
                  {language === 'fr' ? `Niv. ${xp.level}` : `Lv. ${xp.level}`}
                </span>
                {isLifetime && (
                  <span className="profile-badge profile-badge--lifetime">👑 Lifetime</span>
                )}
                {streak.isAliveToday && !isLifetime && (
                  <span className="profile-badge profile-badge--alive">
                    🔥 {language === 'fr' ? 'Actif' : 'Active'}
                  </span>
                )}
                <button
                  type="button"
                  className="profile-edit-btn"
                  onClick={onOpenSettings}
                  title={language === 'fr' ? 'Modifier le profil' : 'Edit profile'}
                >
                  <span aria-hidden>✏️</span>
                  <span>{language === 'fr' ? 'Modifier le profil' : 'Edit profile'}</span>
                </button>
              </div>
              <p className="profile-hero-subline">
                <span className="profile-rank">
                  <span aria-hidden>{rank.icon}</span> {rank.label}
                </span>
                <span className="profile-sub-dot" aria-hidden>·</span>
                <span className="profile-since">
                  {language === 'fr' ? 'Membre depuis ' : 'Member since '}
                  <strong>{memberSince}</strong>
                </span>
              </p>
            </div>

            <div className="profile-hero-stats">
              {stats.map((s) => (
                <div key={s.key} className="profile-stat-tile">
                  <div className="profile-stat-icon" aria-hidden>
                    {s.icon}
                  </div>
                  <div className="profile-stat-value">{s.value}</div>
                  <div className="profile-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="profile-hero-xp">
              <div className="profile-hero-xp-head">
                <span className="profile-xp-title">
                  {language === 'fr' ? `Progression Niveau ${xp.level}` : `Level ${xp.level} progress`}
                </span>
                <span className="profile-xp-sub">
                  {xp.xpInLevel} / {xp.xpNeededForNext} XP →{' '}
                  {language === 'fr' ? `Niv. ${xp.level + 1}` : `Lv. ${xp.level + 1}`}
                </span>
              </div>
              <div className="profile-hero-xp-bar">
                <div className="profile-hero-xp-bar-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/*  📊 Statistiques                                              */}
      {/* ------------------------------------------------------------- */}
      <section className="profile-section-card">
        <h2 className="profile-section-title">
          <span aria-hidden>📊</span> {language === 'fr' ? 'Statistiques' : 'Statistics'}
        </h2>
        <div className="profile-kpi-grid">
          {kpiStats.map((k) => (
            <div key={k.key} className="profile-kpi-tile">
              <div className="profile-kpi-icon" aria-hidden>
                {k.icon}
              </div>
              <div className="profile-kpi-value">{k.value}</div>
              <div className="profile-kpi-label">{k.label}</div>
            </div>
          ))}
        </div>
      </section>

        </div>
        {/* ------------------------------------------------------------- */}
        {/*  Colonne de droite : Streak + XP + Calendrier (comme Seonsaengnim) */}
        {/* ------------------------------------------------------------- */}
        <aside className="profile-sidebar">
          <section className="profile-sidebar-card">
            <div className="profile-sidebar-streak">
              <div className="profile-sidebar-streak-icon" aria-hidden>🔥</div>
              <div className="profile-sidebar-streak-num">{streak.current}</div>
              <div className="profile-sidebar-streak-label">
                {language === 'fr' ? (streak.current > 1 ? 'jours' : 'jour') : (streak.current > 1 ? 'days' : 'day')}
              </div>
            </div>

            <div className="profile-sidebar-xp">
              <div className="profile-sidebar-xp-top">
                <span className="profile-sidebar-xp-icon" aria-hidden>⭐</span>
                <span className="profile-sidebar-xp-value">
                  {xp.xp.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}
                </span>
                <span className="profile-sidebar-xp-suffix">XP</span>
                <span className="profile-sidebar-level-pill">
                  {language === 'fr' ? `Niveau ${xp.level}` : `Level ${xp.level}`}
                </span>
              </div>
              <div className="profile-sidebar-xp-bar">
                <div
                  className="profile-sidebar-xp-bar-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="profile-sidebar-xp-sub">
                {xp.xpInLevel}/{xp.xpNeededForNext} XP
                {language === 'fr' ? ` pour le niveau ${xp.level + 1}` : ` for level ${xp.level + 1}`}
              </div>
            </div>

            <div className="profile-sidebar-calendar">
              <div className="profile-sidebar-calendar-header">
                <span aria-hidden>📅</span> <strong>{monthLabel}</strong>
              </div>
              <div className="profile-calendar-weekdays">
                {weekdayLabels.map((w, i) => (
                  <span key={i} className="profile-calendar-weekday">
                    {w}
                  </span>
                ))}
              </div>
              <div className="profile-calendar-grid">
                {calendarCells.map((cell, i) => {
                  if (!cell)
                    return (
                      <span
                        key={`empty-${i}`}
                        className="profile-calendar-cell profile-calendar-cell--empty"
                      />
                    );
                  const level =
                    cell.xp === 0
                      ? 0
                      : cell.xp < 20
                      ? 1
                      : cell.xp < 50
                      ? 2
                      : cell.xp < 100
                      ? 3
                      : 4;
                  return (
                    <span
                      key={cell.date}
                      className={`profile-calendar-cell profile-calendar-cell--lvl${level} ${
                        cell.isToday ? 'profile-calendar-cell--today' : ''
                      }`}
                      title={`${cell.date} — ${cell.xp} XP`}
                    >
                      {cell.day}
                    </span>
                  );
                })}
              </div>
              <div className="profile-calendar-legend">
                <span className="profile-calendar-legend-cell profile-calendar-cell--lvl0" />
                <span className="profile-calendar-legend-hint">0</span>
                <span className="profile-calendar-legend-cell profile-calendar-cell--lvl1" />
                <span className="profile-calendar-legend-hint">20+</span>
                <span className="profile-calendar-legend-cell profile-calendar-cell--lvl2" />
                <span className="profile-calendar-legend-hint">50+</span>
                <span className="profile-calendar-legend-cell profile-calendar-cell--lvl3" />
                <span className="profile-calendar-legend-hint">100+</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
