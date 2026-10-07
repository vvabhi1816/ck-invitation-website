"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content } from "@/config/content";

// =============================================================================
// LanguageContext
// -----------------------------------------------------------------------------
// Holds the active language ("en" default | "ta") and shares it across the whole
// site. The choice is remembered in localStorage, and `data-lang` is set on
// <html> so globals.css can swap to the Tamil font automatically.
//
//   useLang()    → { lang, setLang, toggle }   (for the menu toggle)
//   useContent() → the localized content object for the active language
// =============================================================================

const LanguageContext = createContext(null);
const STORAGE_KEY = "ck-lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // English by default

  // Restore a previously chosen language on first load.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ta") setLang(saved);
    } catch {
      /* localStorage unavailable — stay on English */
    }
  }, []);

  // Reflect the language on <html> (drives the Tamil-font CSS) and persist it.
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore persistence failures */
    }
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ta" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}

// Convenience: the localized content object for the active language.
export function useContent() {
  const { lang } = useLang();
  return content[lang];
}
