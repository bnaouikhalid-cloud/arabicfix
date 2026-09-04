export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://arabicfix.com'
).replace(/\/+$/, '');

export const SITE_NAME = 'ArabicFix';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
