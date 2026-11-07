import React, { useState } from "react";
import { FileText, Bot, Award, GraduationCap, RefreshCw, Upload, ShieldCheck, Sparkles, Building2, Edit2, Check, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Header({
  activeTab,
  setActiveTab,
  studentInfo,
  setStudentInfo,
  faculties = [],
  onOpenUpload,
  onOpenDonate,
  similarityScore,
  aiScore,
  onRunCheck,
  loading,
  hasResult,
  onResetToUpload,
  customThresholds = { maxSimilarity: 20, maxAiAllowed: 20 }
}) {
  const { lang, t } = useLanguage();
  const [isEditingUniv, setIsEditingUniv] = useState(false);
  const [tempUniv, setTempUniv] = useState(studentInfo.universityName || (lang === "en" ? "University / Higher Education" : "Perguruan Tinggi / Universitas"));

  const handleSaveUniv = () => {
    setStudentInfo({ ...studentInfo, universityName: tempUniv });
    setIsEditingUniv(false);
  };

  return (
    <header className="bg-slate-950 text-white shadow-lg border-b border-slate-800 sticky top-0 z-40">
      {/* Top Banner with Universal Identity & Custom University */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* RIUPH Ecosystem Official Logo Emblem */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-indigo-600/20 border border-cyan-500/40 shadow-lg shadow-cyan-950/50 group shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-mono text-base sm:text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                {t("brandTitle")}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-950/90 text-cyan-400 border border-cyan-800/60 rounded">
                {t("brandSubtitle")}
              </span>
              <span className="hidden md:inline bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {t("brandBadge")}
              </span>
            </div>
            
            {/* Interactive University Name Editor */}
            <div className="flex items-center space-x-1 text-[11px] text-slate-300 truncate">
              <Building2 className="w-3 h-3 text-indigo-400 shrink-0" />
              {isEditingUniv ? (
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={tempUniv}
                    onChange={(e) => setTempUniv(e.target.value)}
                    placeholder={lang === "en" ? "University name..." : "Nama Universitas..."}
                    className="bg-slate-900 border border-indigo-500 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 w-32 sm:w-48"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSaveUniv()}
                  />
                  <button
                    onClick={handleSaveUniv}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white p-1 rounded cursor-pointer"
                    title={t("saveUniv")}
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-1 group cursor-pointer truncate" onClick={() => setIsEditingUniv(true)}>
                  <span className="font-semibold text-slate-200 hover:text-indigo-300 transition underline decoration-dotted truncate">
                    {studentInfo.universityName || t("univDefault")}
                  </span>
                  <Edit2 className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-300 shrink-0" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Student & Discipline Selector + Language Switcher + Donate */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs shrink-0">
          <LanguageSwitcher />

          <button
            onClick={onOpenDonate}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-md shadow-rose-500/20 transition transform hover:scale-105 cursor-pointer"
            title="Dukung Pengembang / Donate"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span className="hidden sm:inline">Dukung / Donasi</span>
          </button>

          <div className="bg-slate-900/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700/70 flex items-center space-x-1 sm:space-x-2 shadow-xs">
            <span className="text-slate-400 font-medium hidden md:inline">{lang === "en" ? "Field:" : "Bidang:"}</span>
            <select
              value={studentInfo.facultyId}
              onChange={(e) => {
                const selected = faculties.find(f => f.id === e.target.value);
                setStudentInfo({
                  ...studentInfo,
                  facultyId: e.target.value,
                  facultyName: selected ? (lang === "en" && selected.nameEn ? selected.nameEn : selected.name) : studentInfo.facultyName,
                  studyProgram: selected && selected.programs ? selected.programs[0] : studentInfo.studyProgram
                });
              }}
              className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer max-w-[85px] sm:max-w-none"
            >
              {faculties.map((f) => (
                <option key={f.id} value={f.id} className="bg-slate-900 text-white">
                  {f.id} (≤{f.maxSimilarity}%)
                </option>
              ))}
            </select>
          </div>

          {studentInfo.nim ? (
            <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-700/70 hidden lg:block shadow-xs">
              <span className="text-slate-400 font-medium">ID: </span>
              <span className="font-bold text-amber-300">{studentInfo.nim}</span>
            </div>
          ) : null}

          {hasResult && (
            <button
              onClick={onResetToUpload}
              className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition text-xs border border-slate-600 cursor-pointer shadow-xs"
              title={lang === "en" ? "Return to upload new paper" : "Kembali ke formulir upload naskah baru"}
            >
              <span className="hidden sm:inline">← {t("resetBtn")}</span>
              <span className="sm:hidden">↺ {lang === "en" ? "Reset" : "Ganti"}</span>
            </button>
          )}

          <button
            onClick={onOpenUpload}
            className="flex items-center space-x-1 sm:space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition text-xs shadow-md cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t("uploadDocBtn")}</span>
            <span className="sm:hidden font-black">Upload</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar with touch scroll support */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between">
        <nav className="flex space-x-1 py-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full">
          <button
            onClick={() => setActiveTab("academic similarity")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-xs transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "academic similarity"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
            <span><span className="hidden sm:inline">Academic Similarity </span>Similarity</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              hasResult
                ? (similarityScore <= customThresholds.maxSimilarity ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800")
                : "bg-slate-800 text-slate-400"
            }`}>
              {hasResult ? `${similarityScore}%` : "—"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-xs transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "ai"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
            <span><span className="hidden sm:inline">Academic Similarity </span>AI Writing</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              hasResult
                ? (aiScore <= customThresholds.maxAiAllowed ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800")
                : "bg-slate-800 text-slate-400"
            }`}>
              {hasResult ? `${aiScore}%` : "—"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("compliance")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-xs transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "compliance"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span>{lang === "en" ? "Academic Policy" : "Evaluasi Ambang Batas"}</span>
          </button>

          <button
            onClick={() => setActiveTab("defense")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-xs transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "defense"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span>{lang === "en" ? "Defense Simulator" : "Simulasi Dewan Penguji"}</span>
          </button>

          <button
            onClick={() => setActiveTab("paraphrase")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-semibold text-xs transition whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === "paraphrase"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>{lang === "en" ? "4S Paraphraser" : "Asisten Parafrase 4S"}</span>
          </button>
        </nav>

        <button
          onClick={onRunCheck}
          disabled={loading}
          className="flex items-center space-x-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded transition disabled:opacity-50 cursor-pointer shrink-0 ml-1"
          title={lang === "en" ? "Re-analyze Paper" : "Analisis Ulang Naskah"}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
          <span className="hidden md:inline">Refresh</span>
        </button>
      </div>
    </header>
  );
}

