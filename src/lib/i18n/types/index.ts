import es from "@/lib/i18n/locales/es.json";
import type { routing } from "@/lib/i18n/core/routing";

export type LangES = typeof es;

declare module "next-intl" {
  interface AppConfig {
    Messages: LangES;
    Locale: (typeof routing.locales)[number];
  }

  type I18nMessage = keyof LangES["messages"];
  type I18nValidation = keyof LangES["validation"];
}
