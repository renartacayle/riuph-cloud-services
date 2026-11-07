import React from "react";
import { ShieldCheck, Cpu, Sparkles, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Header({ onReset, hasResult }) {
  const { t } = useLanguage();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                {t("appTitle")}
                <span className="text-xs bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                  Suite v1.0
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              {t("appSubtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs flex-wrap justify-center">
          <LanguageSwitcher />

          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t("precisionTag")}
          </div>

          {hasResult && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t("newTestButton")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

