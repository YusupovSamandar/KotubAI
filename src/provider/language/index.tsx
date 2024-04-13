import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languageUz } from 'src/language/uz';
import { languageRu } from 'src/language/ru';
import { languageEn } from 'src/language/en';
import { ProviderProps } from 'src/provider/type';
import { language } from 'src/constants/storage';

function LanguageProvider({ children }: ProviderProps) {
  i18n.use(initReactI18next).init({
    resources: {
      uz: { translation: languageUz },
      ru: { translation: languageRu },
      en: { translation: languageEn },
    },
    fallbackLng: language || 'uz',
    interpolation: { escapeValue: false },
  });
  return children;
}

export default LanguageProvider;
