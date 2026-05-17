/**
 * ErrorBoundary.tsx — barrière de capture d'erreur React générique.
 * -----------------------------------------------------------------
 * À envelopper autour de chaque "view" pour qu'un crash dans une sous-page
 * (ex: Hanzi Writer KO, Gemini réponse cassée, etc.) ne tue pas toute l'app.
 *
 * Comportement :
 *   - Catche les erreurs JS et de rendu via getDerivedStateFromError +
 *     componentDidCatch (API React class).
 *   - Affiche un fallback UI minimaliste (titre, message, bouton "Réessayer"
 *     qui reset l'état de la boundary).
 *   - Logue dans la console pour debug (ou plus tard, dans un service type
 *     Sentry via la prop `onError`).
 *
 * Usage typique :
 *   <ErrorBoundary onReset={() => setView('home')}>
 *     <SomeViewThatMightCrash />
 *   </ErrorBoundary>
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Callback déclenché par le bouton "Réessayer" en plus du reset interne. */
  onReset?: () => void;
  /** Hook pour reporter à un service externe (Sentry, Logrocket, etc.). */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** UI personnalisée. Si fournie, remplace le fallback par défaut. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Locale du fallback par défaut. */
  language?: 'fr' | 'en';
  /**
   * Clé qui, quand elle change, reset automatiquement la boundary.
   * Utile pour ne pas laisser le user coincé sur une page d'erreur quand
   * il navigue vers une autre view (ex: passer `view` en `resetKey`).
   */
  resetKey?: string | number;
}

interface ErrorBoundaryState {
  error: Error | null;
}

const COPY = {
  fr: {
    title: 'Oups, une erreur est survenue',
    body:
      "Cette section a planté. Tu peux réessayer, ou revenir au tableau de bord. Si le problème persiste, signale-le via le bouton dans la barre latérale.",
    retry: 'Réessayer',
    back: 'Retour au tableau de bord',
    details: 'Voir les détails techniques'
  },
  en: {
    title: 'Oops, something went wrong',
    body:
      "This section crashed. You can retry or go back to the dashboard. If it keeps happening, report it via the sidebar.",
    retry: 'Retry',
    back: 'Back to dashboard',
    details: 'Show technical details'
  }
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught', error, info);
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prev: ErrorBoundaryProps): void {
    // Si la resetKey change (ex: navigation vers une autre view), on remet
    // la boundary à zéro pour ne pas afficher l'erreur sur la nouvelle page.
    if (
      prev.resetKey !== this.props.resetKey &&
      this.state.error !== null
    ) {
      this.setState({ error: null });
    }
  }

  reset = (): void => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    const { fallback, language = 'fr' } = this.props;
    if (fallback) return fallback(error, this.reset);

    const copy = COPY[language];
    return (
      <div className="xl-error-boundary" role="alert">
        <div className="xl-error-boundary-icon" aria-hidden>
          ⚠️
        </div>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <div className="xl-error-boundary-actions">
          <button
            type="button"
            className="xl-error-boundary-btn xl-error-boundary-btn--primary"
            onClick={this.reset}
          >
            {copy.retry}
          </button>
          {this.props.onReset && (
            <button
              type="button"
              className="xl-error-boundary-btn"
              onClick={() => {
                this.setState({ error: null });
                this.props.onReset?.();
              }}
            >
              {copy.back}
            </button>
          )}
        </div>
        <details className="xl-error-boundary-details">
          <summary>{copy.details}</summary>
          <pre>
            {error.name}: {error.message}
            {'\n\n'}
            {error.stack}
          </pre>
        </details>
      </div>
    );
  }
}

export default ErrorBoundary;
