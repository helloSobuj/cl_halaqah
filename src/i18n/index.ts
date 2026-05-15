import bn from "./bn";
import en from "./en";

export type Locale = "bn" | "en";
export type Translations = typeof en;

const translations: Record<Locale, Translations> = { bn, en };

export function getT(locale: Locale): Translations {
  return translations[locale] ?? translations.bn;
}

export { bn, en };
