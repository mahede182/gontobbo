import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslations } from "./locales/en";
import { bnTranslations } from "./locales/bn";

const LANGUAGE_STORAGE_KEY = "gontobbo-admin-lang";

function getStoredLanguage(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "bn";
  }
  return "bn";
}

export const resources = {
  en: { translation: enTranslations },
  bn: { translation: bnTranslations },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Persist language changes to localStorage
i18n.on("languageChanged", (lng: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
