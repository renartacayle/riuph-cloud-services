import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../i18n/translations.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("checker_lang");
      if (saved === "id" || saved === "en") return saved;
      const browserLang = navigator.language || navigator.userLanguage || "id";
      return browserLang.toLowerCase().startsWith("en") ? "en" : "id";
    } catch (e) {
      return "id";
    }
  });

  const setLang = (newLang) => {
    if (newLang === "id" || newLang === "en") {
      setLangState(newLang);
      try {
        localStorage.setItem("checker_lang", newLang);
      } catch (e) {}
    }
  };

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.id;
    return dict[key] || TRANSLATIONS.id[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
