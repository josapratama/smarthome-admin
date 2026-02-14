"use client";

import { usePreferences } from "./use-preferences";
import {
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/i18n/translations";

/**
 * Hook for translations
 * Uses language from user preferences
 */
export function useTranslation() {
  const { preferences } = usePreferences();
  const language = (preferences?.language || "en") as Language;

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t, language };
}
