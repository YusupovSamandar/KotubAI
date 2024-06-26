export const TOKEN = 'KOTUB_TOKEN';
export const REFRESH_TOKEN = 'KOTUB_REFRESH_TOKEN';
export const POSITION = 'BAL_POSITION';
export const LANGUAGE = 'BAL_LANGUAGE';
export const KOTIB_LANGUAGE = 'KOTIB_LANGUAGE';
export const HAS_COMPANY = 'BAL_HAS_COMPANY';
export const THEME_COLOR = 'BAL_THEME_COLOR';

export const token = localStorage.getItem(TOKEN);
export const kotibLanguage =
  (localStorage.getItem(KOTIB_LANGUAGE) as 'en' | 'uz' | 'ru') || 'uz';
export const refreshToken = localStorage.getItem(REFRESH_TOKEN);
export const position = localStorage.getItem(POSITION);
export const language = localStorage.getItem(LANGUAGE);
export const hasCompany = localStorage.getItem(HAS_COMPANY) === 'created';
export const isDarkTheme = localStorage.getItem(THEME_COLOR) === 'dark';
