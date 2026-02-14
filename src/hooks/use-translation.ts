"use client";

import { useState, useEffect } from "react";
import { usePreferences } from "./use-preferences";
import {
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/i18n/translations";

/**
 * Hook for translations
 * Uses language from user preferences with reactive updates
 */
export function useTranslation() {
  const { preferences } = usePreferences();
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  // Update language when preferences change
  useEffect(() => {
    if (preferences?.language) {
      setCurrentLanguage(preferences.language as Language);
    }
  }, [preferences?.language]);

  // Listen to localStorage changes for immediate updates
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("user-preferences");
        if (stored) {
          const prefs = JSON.parse(stored);
          if (prefs.language) {
            setCurrentLanguage(prefs.language as Language);
          }
        }
      } catch (error) {
        console.error("Failed to parse preferences:", error);
      }
    };

    // Listen to storage events (cross-tab)
    window.addEventListener("storage", handleStorageChange);

    // Listen to custom event (same-tab)
    window.addEventListener("preferences-changed", handleStorageChange);

    // Initial load from localStorage
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("preferences-changed", handleStorageChange);
    };
  }, []);

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return { t, language: currentLanguage };
}
