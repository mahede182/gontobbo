import "i18next";
import { defaultNS } from "../localization/i18n";
import { enTranslations, bnTranslations } from "../localization/EN/en";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      en: typeof enTranslations;
      bn: typeof bnTranslations;
    };
  }
}
