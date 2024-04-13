export const TOKEN = 'KOTUB_TOKEN';
export const REFRESH_TOKEN = 'KOTUB_REFRESH_TOKEN';
export const PROFILE = 'BAL_PROFILE';
export const POSITION = 'BAL_POSITION';
export const LANGUAGE = 'BAL_LANGUAGE';
export const HAS_COMPANY = 'BAL_HAS_COMPANY';
export const THEME_COLOR = 'BAL_THEME_COLOR';

export const token = localStorage.getItem(TOKEN);
export const refreshToken = localStorage.getItem(REFRESH_TOKEN);
export const profile = localStorage.getItem(PROFILE);
export const position = localStorage.getItem(POSITION);
export const language = localStorage.getItem(LANGUAGE);
export const hasCompany = localStorage.getItem(HAS_COMPANY) === 'created';
export const isDarkTheme = localStorage.getItem(THEME_COLOR) === 'dark';
