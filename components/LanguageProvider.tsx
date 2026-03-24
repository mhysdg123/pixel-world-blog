"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

export type AppLanguage = "en" | "zh";

const LANG_KEY = "bobo_app_lang";

type LanguageContextValue = {
  language: AppLanguage;
  isChinese: boolean;
  setLanguage: (next: AppLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>("en");
  const [timeZone, setTimeZone] = useState("UTC");
  const messages = language === "zh" ? zhMessages : enMessages;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "zh") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANG_KEY, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.body.classList.toggle("lang-zh", language === "zh");
    document.body.classList.toggle("lang-en", language === "en");
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) {
      setTimeZone(detected);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isChinese: language === "zh",
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "zh" : "en")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      <NextIntlClientProvider locale={language} messages={messages} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}
