import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const I18nInited = i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init()