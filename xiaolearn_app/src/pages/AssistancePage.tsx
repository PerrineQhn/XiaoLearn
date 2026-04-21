import { FormEvent, useMemo, useState } from 'react';
import type { Language } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import { sendSupportReport } from '../services/support';

interface AssistancePageProps {
  language: Language;
  onBackHome: () => void;
}

type Severity = 'low' | 'medium' | 'high' | 'critical';

const INITIAL_FORM = {
  title: '',
  description: '',
  severity: 'medium' as Severity
};

export default function AssistancePage({ language, onBackHome }: AssistancePageProps) {
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const copy = useMemo(
    () =>
      language === 'fr'
        ? {
            title: 'Signaler un bug',
            subtitle: 'Aidez-nous à améliorer XiaoLearn',
            sectionTitle: 'Décrivez le problème',
            sectionSubtitle: 'Plus vous êtes précis, plus vite nous pourrons le résoudre.',
            titleLabel: 'Titre du problème',
            titlePlaceholder: 'Ex: Impossible de compléter la leçon 3',
            descLabel: 'Description détaillée',
            descPlaceholder:
              "Décrivez ce qui s'est passé, les étapes pour reproduire le bug, et ce que vous attendiez...",
            detailHint:
              "Incluez autant de détails que possible : page concernée, actions effectuées, messages d'erreur, etc.",
            severityLabel: 'Gravité',
            send: 'Envoyer le signalement',
            sending: 'Envoi en cours...',
            cancel: 'Annuler',
            sent: 'Signalement envoyé. Merci !',
            sendError: "Impossible d'envoyer le signalement pour le moment.",
            backAriaLabel: "Retour à l'accueil",
            tipsTitle: 'Conseils pour un bon signalement',
            tips: [
              'Décrivez les étapes exactes pour reproduire le bug',
              'Indiquez sur quelle page ou fonctionnalité le problème se produit',
              "Mentionnez le navigateur et l'appareil que vous utilisez",
              "Copiez les messages d'erreur si vous en voyez"
            ],
            severityOptions: {
              low: 'Faible - Gêne légère',
              medium: "Moyenne - Gêne l'utilisation",
              high: 'Élevée - Bloque une action importante',
              critical: 'Critique - Application inutilisable'
            }
          }
        : {
            title: 'Report a bug',
            subtitle: 'Help us improve XiaoLearn',
            sectionTitle: 'Describe the problem',
            sectionSubtitle: 'The more precise you are, the faster we can fix it.',
            titleLabel: 'Issue title',
            titlePlaceholder: 'Ex: Unable to complete lesson 3',
            descLabel: 'Detailed description',
            descPlaceholder: 'Describe what happened, the steps to reproduce, and what you expected...',
            detailHint:
              'Include as many details as possible: impacted page, actions taken, error messages, etc.',
            severityLabel: 'Severity',
            send: 'Send report',
            sending: 'Sending...',
            cancel: 'Cancel',
            sent: 'Report sent. Thank you!',
            sendError: 'Unable to send report right now.',
            backAriaLabel: 'Back to home',
            tipsTitle: 'Tips for a good report',
            tips: [
              'List exact steps to reproduce the bug',
              'Specify the page or feature where it happens',
              'Mention browser and device',
              'Copy any error messages you see'
            ],
            severityOptions: {
              low: 'Low - Minor inconvenience',
              medium: 'Medium - Usage impact',
              high: 'High - Blocks important action',
              critical: 'Critical - App unusable'
            }
          },
    [language]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    if (!title || !description || isSubmitting) return;

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await sendSupportReport({
        title,
        description,
        severity: form.severity,
        language: language === 'en' ? 'en' : 'fr',
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent,
        reporterEmail: user?.email || undefined,
        reporterName: user?.displayName || undefined,
        reporterUid: user?.uid || undefined,
        occurredAt: new Date().toISOString()
      });
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setSubmitError(message || copy.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setSubmitError('');
  };

  return (
    <div className="support-page">
      <header className="support-page-header">
        <button
          type="button"
          className="support-page-back"
          onClick={onBackHome}
          aria-label={copy.backAriaLabel}
        >
          ←
        </button>
        <div className="support-page-heading">
          <h1 className="page-title">{copy.title}</h1>
          <p className="page-subtitle">{copy.subtitle}</p>
        </div>
      </header>

      <section className="support-form-card">
        <h2>{copy.sectionTitle}</h2>
        <p className="support-form-subtitle">{copy.sectionSubtitle}</p>

        <form className="support-form" onSubmit={handleSubmit}>
          <label className="support-field">
            <span>{copy.titleLabel}</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder={copy.titlePlaceholder}
              required
            />
          </label>

          <label className="support-field">
            <span>{copy.descLabel}</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder={copy.descPlaceholder}
              required
            />
          </label>

          <p className="support-field-hint">{copy.detailHint}</p>

          <label className="support-field support-severity-field">
            <span>{copy.severityLabel}</span>
            <select
              value={form.severity}
              onChange={(event) => setForm((prev) => ({ ...prev, severity: event.target.value as Severity }))}
            >
              <option value="low">{copy.severityOptions.low}</option>
              <option value="medium">{copy.severityOptions.medium}</option>
              <option value="high">{copy.severityOptions.high}</option>
              <option value="critical">{copy.severityOptions.critical}</option>
            </select>
          </label>

          <div className="support-form-actions">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? copy.sending : copy.send}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              {copy.cancel}
            </button>
          </div>

          {submitted && <p className="support-success-message">{copy.sent}</p>}
          {submitError && <p className="support-error-message">{submitError}</p>}
        </form>
      </section>

      <section className="support-tips-card">
        <h3>{copy.tipsTitle}</h3>
        <ul>
          {copy.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
