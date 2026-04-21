const DEFAULT_PAYMENTS_BASE_URL = 'https://payments.xiaolearn.com';

const PAYMENTS_BASE_URL = import.meta.env.VITE_PAYMENTS_BASE_URL || DEFAULT_PAYMENTS_BASE_URL;

export type SupportSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface SupportReportPayload {
  title: string;
  description: string;
  severity: SupportSeverity;
  language: 'fr' | 'en';
  pageUrl?: string;
  userAgent?: string;
  reporterEmail?: string;
  reporterName?: string;
  reporterUid?: string;
  occurredAt?: string;
}

export const sendSupportReport = async (payload: SupportReportPayload) => {
  const response = await fetch(`${PAYMENTS_BASE_URL}/api/support-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Erreur lors de l'envoi du signalement");
  }

  return response.json().catch(() => ({ ok: true }));
};
