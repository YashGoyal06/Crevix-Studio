export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDate = (value, options = {}) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    ...options,
  }).format(new Date(value));
};

export const formatTime = (value) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', {
    timeStyle: 'medium',
    hour12: true,
  }).format(new Date(value));
};

export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

export const buildBrowserInfo = () => {
  const parts = [
    navigator.userAgent,
    navigator.language,
    `${window.screen.width}x${window.screen.height}`,
  ];
  return parts.filter(Boolean).join(' | ');
};
