import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslations } from "./EN/en";
import { bnTranslations } from "./BN/bn";

const resources = {
  en: {
    translation: enTranslations,
  },
  bn: {
    translation: bnTranslations,
  },
};

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: "bn",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; // Ensure i18n is exported if needed elsewhere
