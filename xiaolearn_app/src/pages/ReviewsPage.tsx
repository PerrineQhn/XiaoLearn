/**
 * ReviewsPage.tsx — page Avis (note 5 étoiles + commentaire)
 * ----------------------------------------------------------
 * Sections :
 *   1. Header (titre + sous-titre + résumé moyenne/nombre)
 *   2. Bloc « Ton avis » : saisie étoiles + textarea (1000 chars max),
 *      Publier / Mettre à jour / Supprimer. Message si non connecté.
 *   3. Liste des avis (100 max, plus récents d'abord), le sien épinglé
 *      en haut avec un badge.
 *
 * Backend : useReviews() — collection `reviews/{uid}`, un doc par user.
 * Styles : ../styles/reviews.css (scoped sous .reviews-page).
 */

import { useEffect, useMemo, useState } from 'react';
import '../styles/reviews.css';
import { useReviews, REVIEW_TEXT_MAX, type Review } from '../hooks/useReviews';
import { useAuth } from '../contexts/AuthContext';

type Language = 'fr' | 'en';

interface ReviewsPageProps {
  language?: Language;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Avis',
    subtitle: 'Ce que pense la communauté',
    reviewsCount: (n: number) => (n <= 1 ? `${n} avis` : `${n} avis`),
    noRatingYet: 'Pas encore de note',
    yourReviewTitle: 'Ton avis',
    yourReviewBadge: 'Ton avis',
    signInPrompt: 'Connecte-toi pour laisser un avis.',
    textPlaceholder: 'Partage ton expérience avec XiaoLearn…',
    publish: 'Publier',
    update: 'Mettre à jour',
    saving: 'Envoi…',
    delete: 'Supprimer',
    confirmDelete: 'Supprimer ton avis ?',
    pickARating: 'Choisis une note',
    saved: 'Merci pour ton avis !',
    emptyState: 'Aucun avis pour le moment — sois le premier !',
    loading: 'Chargement des avis…',
    errorLoad: 'Impossible de charger les avis.',
    retry: 'Réessayer',
    anonymous: 'Apprenant',
    justNow: "à l'instant",
    minutesAgo: (n: number) => `il y a ${n} min`,
    hoursAgo: (n: number) => `il y a ${n} h`,
    daysAgo: (n: number) => (n === 1 ? 'il y a 1 jour' : `il y a ${n} jours`),
    monthsAgo: (n: number) => `il y a ${n} mois`,
    yearsAgo: (n: number) => (n === 1 ? 'il y a 1 an' : `il y a ${n} ans`),
    starAria: (n: number) => `${n} étoile${n > 1 ? 's' : ''}`
  },
  en: {
    title: 'Reviews',
    subtitle: 'What the community thinks',
    reviewsCount: (n: number) => (n === 1 ? '1 review' : `${n} reviews`),
    noRatingYet: 'No rating yet',
    yourReviewTitle: 'Your review',
    yourReviewBadge: 'Your review',
    signInPrompt: 'Sign in to leave a review.',
    textPlaceholder: 'Share your experience with XiaoLearn…',
    publish: 'Publish',
    update: 'Update',
    saving: 'Saving…',
    delete: 'Delete',
    confirmDelete: 'Delete your review?',
    pickARating: 'Pick a rating',
    saved: 'Thanks for your review!',
    emptyState: 'No reviews yet — be the first!',
    loading: 'Loading reviews…',
    errorLoad: 'Could not load reviews.',
    retry: 'Retry',
    anonymous: 'Learner',
    justNow: 'just now',
    minutesAgo: (n: number) => `${n} min ago`,
    hoursAgo: (n: number) => `${n} h ago`,
    daysAgo: (n: number) => (n === 1 ? '1 day ago' : `${n} days ago`),
    monthsAgo: (n: number) => `${n} months ago`,
    yearsAgo: (n: number) => (n === 1 ? '1 year ago' : `${n} years ago`),
    starAria: (n: number) => `${n} star${n > 1 ? 's' : ''}`
  }
} as const;

// ============================================================================
//  Helpers
// ============================================================================

const relativeDate = (iso: string, lang: Language): string => {
  const c = COPY[lang];
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return '';
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return c.justNow;
  if (minutes < 60) return c.minutesAgo(minutes);
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return c.hoursAgo(hours);
  const days = Math.floor(hours / 24);
  if (days < 31) return c.daysAgo(days);
  const months = Math.floor(days / 30);
  if (months < 12) return c.monthsAgo(months);
  return c.yearsAgo(Math.floor(months / 12));
};

/** Couleur d'avatar déterministe à partir de l'uid (initiale dans un rond). */
const AVATAR_COLORS = ['#c6302c', '#d97b29', '#3a7d5c', '#3b6ea5', '#7d5ba6', '#b5484d'];
const avatarColor = (uid: string): string => {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = (hash * 31 + uid.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

// ============================================================================
//  Composant étoiles réutilisable (affichage + saisie, entiers 1..5)
// ============================================================================

interface StarRatingProps {
  value: number; // 0..5 (0 = rien de sélectionné)
  /** Si fourni → mode saisie (étoiles cliquables + hover). */
  onChange?: (value: number) => void;
  size?: 'sm' | 'lg';
  ariaLabel?: (n: number) => string;
}

export function StarRating({ value, onChange, size = 'sm', ariaLabel }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const interactive = Boolean(onChange);
  const shown = interactive && hovered > 0 ? hovered : value;

  return (
    <div
      className={`star-rating star-rating--${size} ${interactive ? 'star-rating--input' : ''}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? undefined : `${value}/5`}
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            className={`star ${n <= shown ? 'star--filled' : ''} ${hovered > 0 && n <= hovered ? 'star--hovered' : ''}`}
            aria-label={ariaLabel ? ariaLabel(n) : String(n)}
            aria-pressed={n <= value}
            onMouseEnter={() => setHovered(n)}
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered(0)}
            onClick={() => onChange?.(n)}
          >
            ★
          </button>
        ) : (
          <span key={n} className={`star ${n <= shown ? 'star--filled' : ''}`} aria-hidden="true">
            ★
          </span>
        )
      )}
    </div>
  );
}

// ============================================================================
//  Carte d'un avis
// ============================================================================

interface ReviewCardProps {
  review: Review;
  lang: Language;
  isMine: boolean;
}

function ReviewCard({ review, lang, isMine }: ReviewCardProps) {
  const c = COPY[lang];
  const name = review.displayName.trim() || c.anonymous;
  const initial = name.charAt(0).toUpperCase();
  const [avatarBroken, setAvatarBroken] = useState(false);

  return (
    <article className={`review-card ${isMine ? 'review-card--mine' : ''}`}>
      <div className="review-card__head">
        {review.photoURL && !avatarBroken ? (
          <img
            className="review-card__avatar"
            src={review.photoURL}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setAvatarBroken(true)}
          />
        ) : (
          <span
            className="review-card__avatar review-card__avatar--initial"
            style={{ backgroundColor: avatarColor(review.uid) }}
            aria-hidden="true"
          >
            {initial}
          </span>
        )}
        <div className="review-card__meta">
          <div className="review-card__name-row">
            <span className="review-card__name">{name}</span>
            {isMine && <span className="review-card__badge">{c.yourReviewBadge}</span>}
          </div>
          <div className="review-card__rating-row">
            <StarRating value={review.rating} />
            <span className="review-card__date">{relativeDate(review.updatedAt, lang)}</span>
          </div>
        </div>
      </div>
      {review.text && <p className="review-card__text">{review.text}</p>}
    </article>
  );
}

// ============================================================================
//  Page
// ============================================================================

export default function ReviewsPage({ language = 'fr' }: ReviewsPageProps) {
  const lang: Language = language === 'en' ? 'en' : 'fr';
  const c = COPY[lang];
  const { user } = useAuth();
  const {
    reviews,
    myReview,
    loading,
    saving,
    error,
    averageRating,
    count,
    refresh,
    submitReview,
    deleteReview
  } = useReviews();

  // Brouillon local, pré-rempli avec l'avis existant dès qu'il est chargé.
  const [draftRating, setDraftRating] = useState(0);
  const [draftText, setDraftText] = useState('');
  const [draftTouched, setDraftTouched] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    // Ne pré-remplit que si l'utilisateur n'a pas commencé à éditer.
    if (myReview && !draftTouched) {
      setDraftRating(myReview.rating);
      setDraftText(myReview.text);
    }
  }, [myReview, draftTouched]);

  const handleSubmit = async () => {
    setJustSaved(false);
    const ok = await submitReview(draftRating, draftText, lang);
    if (ok) {
      setDraftTouched(false);
      setJustSaved(true);
    }
  };

  const handleDelete = async () => {
    if (typeof window !== 'undefined' && !window.confirm(c.confirmDelete)) return;
    const ok = await deleteReview();
    if (ok) {
      setDraftRating(0);
      setDraftText('');
      setDraftTouched(false);
      setJustSaved(false);
    }
  };

  // Son avis épinglé en haut, le reste trié updatedAt desc (déjà trié par la query).
  const orderedReviews = useMemo(() => {
    if (!myReview) return reviews;
    return [myReview, ...reviews.filter((r) => r.uid !== myReview.uid)];
  }, [reviews, myReview]);

  const canSubmit = draftRating >= 1 && draftRating <= 5 && !saving;

  return (
    <div className="reviews-page">
      {/* ------------------------------------------------ header ---------- */}
      <header className="reviews-header">
        <div className="reviews-header__titles">
          <h1>{c.title}</h1>
          <p className="reviews-header__subtitle">{c.subtitle}</p>
        </div>
        <div className="reviews-summary" aria-live="polite">
          {count > 0 ? (
            <>
              <span className="reviews-summary__average">
                {averageRating.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1
                })}
                <span className="reviews-summary__star">★</span>
              </span>
              <StarRating value={Math.round(averageRating)} />
              <span className="reviews-summary__count">{c.reviewsCount(count)}</span>
            </>
          ) : (
            <span className="reviews-summary__count">{c.noRatingYet}</span>
          )}
        </div>
      </header>

      {/* ------------------------------------------- bloc « Ton avis » ---- */}
      <section className="review-form-card">
        <h2>{c.yourReviewTitle}</h2>
        {user ? (
          <>
            <StarRating
              value={draftRating}
              size="lg"
              ariaLabel={c.starAria}
              onChange={(n) => {
                setDraftRating(n);
                setDraftTouched(true);
                setJustSaved(false);
              }}
            />
            <textarea
              className="review-form-card__textarea"
              value={draftText}
              maxLength={REVIEW_TEXT_MAX}
              rows={4}
              placeholder={c.textPlaceholder}
              onChange={(e) => {
                setDraftText(e.target.value);
                setDraftTouched(true);
                setJustSaved(false);
              }}
            />
            <div className="review-form-card__footer">
              <span className="review-form-card__counter">
                {draftText.length}/{REVIEW_TEXT_MAX}
              </span>
              <div className="review-form-card__actions">
                {myReview && (
                  <button
                    type="button"
                    className="review-form-card__delete"
                    disabled={saving}
                    onClick={handleDelete}
                  >
                    {c.delete}
                  </button>
                )}
                <button
                  type="button"
                  className="review-form-card__submit"
                  disabled={!canSubmit}
                  title={draftRating === 0 ? c.pickARating : undefined}
                  onClick={handleSubmit}
                >
                  {saving ? c.saving : myReview ? c.update : c.publish}
                </button>
              </div>
            </div>
            {justSaved && <p className="review-form-card__saved">{c.saved}</p>}
            {error && !loading && <p className="review-form-card__error">{error}</p>}
          </>
        ) : (
          <p className="review-form-card__signin">{c.signInPrompt}</p>
        )}
      </section>

      {/* ------------------------------------------------- liste ---------- */}
      <section className="reviews-list">
        {loading ? (
          <p className="reviews-list__state">{c.loading}</p>
        ) : error && reviews.length === 0 ? (
          <div className="reviews-list__state">
            <p>{c.errorLoad}</p>
            <button type="button" className="reviews-list__retry" onClick={() => void refresh()}>
              {c.retry}
            </button>
          </div>
        ) : orderedReviews.length === 0 ? (
          <p className="reviews-list__state">{c.emptyState}</p>
        ) : (
          orderedReviews.map((review) => (
            <ReviewCard
              key={review.uid}
              review={review}
              lang={lang}
              isMine={Boolean(user && review.uid === user.uid)}
            />
          ))
        )}
      </section>
    </div>
  );
}
