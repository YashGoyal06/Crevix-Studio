const RATE_LIMIT_PREFIX = 'crevix_agreement_rate_';
const CSRF_PREFIX = 'crevix_agreement_csrf_';

export const getCsrfToken = (token) => {
  const key = `${CSRF_PREFIX}${token}`;
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const next = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  sessionStorage.setItem(key, next);
  return next;
};

export const assertCsrfToken = (token, submittedToken) => {
  if (!submittedToken || submittedToken !== getCsrfToken(token)) {
    throw new Error('Security token mismatch. Refresh the agreement link and try again.');
  }
};

export const assertSigningRateLimit = (token) => {
  const key = `${RATE_LIMIT_PREFIX}${token}`;
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(key) || '[]').filter(
    (timestamp) => now - timestamp < 1000 * 60 * 10,
  );

  if (attempts.length >= 5) {
    throw new Error('Too many signing attempts. Please wait a few minutes and try again.');
  }

  attempts.push(now);
  localStorage.setItem(key, JSON.stringify(attempts));
};

export const isExpired = (agreement) =>
  Boolean(agreement?.expires_at && new Date(agreement.expires_at).getTime() < Date.now());
