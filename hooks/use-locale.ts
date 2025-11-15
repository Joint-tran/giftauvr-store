"use client";

import { useState, useEffect } from "react";
import { type Locale, getTranslations } from "@/lib/localization";

const LOCALE_STORAGE_KEY = "giftauvr_locale";

export function useLocale() {
  // Always start with "en" to match SSR
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync with localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "ru") {
      setLocaleState("ru");
    }
    setIsHydrated(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  const t = getTranslations(locale);

  return {
    locale,
    setLocale,
    t,
    isHydrated,
  };
}
