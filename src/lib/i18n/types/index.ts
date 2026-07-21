import en from "@/lib/i18n/locales/en.json";
import type { routing } from "@/lib/i18n/core/routing";

export type LangEN = typeof en;

declare module "next-intl" {
  interface AppConfig {
    Messages: LangEN;
    Locale: (typeof routing.locales)[number];
  }

  type I18nMessage = keyof LangEN["messages"];
  type I18nValidation = keyof LangEN["validation"];
}
