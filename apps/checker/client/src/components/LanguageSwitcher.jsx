import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-700 text-xs font-semibold shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
          lang === "id"
            ? "bg-cyan-600 text-white font-bold shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
        title="Bahasa Indonesia"
      >
        <span className="text-xs">🇮🇩</span>
        <span>ID</span>
      </button>

      <button
        type="button"
        onClick={() => setLang("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
          lang === "en"
            ? "bg-cyan-600 text-white font-bold shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
        title="English"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
