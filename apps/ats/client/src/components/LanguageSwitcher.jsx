import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 text-xs font-semibold shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
          lang === "id"
            ? "bg-blue-600 text-white font-bold shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
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
            ? "bg-blue-600 text-white font-bold shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
        }`}
        title="English"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
