import React, { useState } from "react";
import Header from "./components/Header.jsx";
import InputSection from "./components/InputSection.jsx";
import ScoreOverview from "./components/ScoreOverview.jsx";
import KnockoutBanner from "./components/KnockoutBanner.jsx";
import MultiAtsBreakdown from "./components/MultiAtsBreakdown.jsx";
import SkillsGapMatrix from "./components/SkillsGapMatrix.jsx";
import ImpactAnalysis from "./components/ImpactAnalysis.jsx";
import BulletOptimizer from "./components/BulletOptimizer.jsx";
import ClichésAndHygiene from "./components/ClichésAndHygiene.jsx";
import DocumentInspector from "./components/DocumentInspector.jsx";
import ExportReportModal from "./components/ExportReportModal.jsx";
import AdBanner from "./components/AdBanner.jsx";
import { useIsDesktop } from "./hooks/useIsDesktop.js";

import { Award, Layers, Tag, TrendingUp, Sparkles, MessageSquareWarning, FileCode, AlertCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "./context/LanguageContext.jsx";

export default function App() {
  const isDesktop = useIsDesktop(1280);
  const { lang, t } = useLanguage();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showExportModal, setShowExportModal] = useState(false);
  const [lastCvText, setLastCvText] = useState("");

  const handleScanText = async (cvText, jdText) => {
    setIsLoading(true);
    setError(null);
    setLastCvText(cvText);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jdText, options: { lang } })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (lang === "en" ? "Failed to process CV analysis." : "Gagal memproses analisis CV."));
      }

      setResult(data);
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanFile = async (file, jdText) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jdText", jdText);
      formData.append("options", JSON.stringify({ lang }));

      const res = await fetch("/api/scan-file", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (lang === "en" ? "Failed to process document file." : "Gagal memproses file dokumen."));
      }

      setResult(data);
      setLastCvText(data.document?.extractedText || (data.document ? `File: ${data.document.filename}` : ""));
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setActiveTab("overview");
  };

  const tabs = [
    { id: "overview", label: t("tabOverview"), icon: <Award className="w-4 h-4" /> },
    { id: "keywords", label: t("tabKeywords"), icon: <Tag className="w-4 h-4" /> },
    { id: "impact", label: t("tabImpact"), icon: <TrendingUp className="w-4 h-4" /> },
    { id: "multi_ats", label: t("tabMultiAts"), icon: <Layers className="w-4 h-4" /> },
    { id: "optimizer", label: t("tabOptimizer"), icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: "hygiene", label: t("tabHygiene"), icon: <MessageSquareWarning className="w-4 h-4" /> },
    { id: "inspector", label: t("tabInspector"), icon: <FileCode className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Header onReset={handleReset} hasResult={!!result} />

      {/* Responsive 3-Column Layout: Left/Right ads on Desktop, Top/Bottom ads on Mobile */}
      <div className="flex-1 w-full max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6 py-6 flex justify-center items-start gap-4 2xl:gap-8">
        {/* Left Skyscraper (Desktop Only: hidden on mobile) */}
        {isDesktop && (
          <aside className="hidden xl:flex flex-col items-center w-[160px] shrink-0 sticky top-6 self-start">
            <AdBanner position="left" slotKey="LEFT_SKYSCRAPER" />
          </aside>
        )}

        {/* Center Main App Container */}
        <main className="flex-1 max-w-5xl min-w-0 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs font-bold text-rose-700 hover:underline"
              >
                {lang === "en" ? "Close" : "Tutup"}
              </button>
            </div>
          )}

          {/* Top Leaderboard Ad Slot (Mobile Only: hidden on desktop) */}
          {!isDesktop && (
            <div className="xl:hidden w-full">
              <AdBanner position="top" slotKey="TOP_LEADERBOARD" />
            </div>
          )}

        {!result ? (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-3 pt-2 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t("heroTitle")}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t("heroDesc")}
              </p>
            </div>

            <InputSection
              onScanText={handleScanText}
              onScanFile={handleScanFile}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Knockout Banner always on top */}
            <KnockoutBanner knockout={result.knockout} />

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-slate-200/80 rounded-xl border border-slate-300/80 text-xs font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? "bg-white text-slate-900 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Views */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <ScoreOverview
                  result={result}
                  onExportClick={() => setShowExportModal(true)}
                />
                <SkillsGapMatrix keywords={result.keywords} />
                <ImpactAnalysis impact={result.impact} />
              </div>
            )}

            {activeTab === "keywords" && (
              <SkillsGapMatrix keywords={result.keywords} />
            )}

            {activeTab === "impact" && (
              <ImpactAnalysis impact={result.impact} />
            )}

            {activeTab === "multi_ats" && (
              <MultiAtsBreakdown
                multiAts={result.multiAts}
                recruiterScan={result.recruiterScan}
              />
            )}

            {activeTab === "optimizer" && (
              <BulletOptimizer suggestions={result.suggestions} />
            )}

            {activeTab === "hygiene" && (
              <ClichésAndHygiene
                hygiene={result.hygiene}
                format={result.format}
              />
            )}

            {activeTab === "inspector" && (
              <DocumentInspector
                format={result.format}
                cvRawText={lastCvText}
              />
            )}
          </div>
        )}

          {/* Bottom Banner Ad Slot (Mobile Only: hidden on desktop) */}
          {!isDesktop && (
            <div className="xl:hidden w-full mt-6">
              <AdBanner position="bottom" slotKey="BOTTOM_BANNER" />
            </div>
          )}
        </main>

        {/* Right Skyscraper (Desktop Only: hidden on mobile) */}
        {isDesktop && (
          <aside className="hidden xl:flex flex-col items-center w-[160px] shrink-0 sticky top-6 self-start">
            <AdBanner position="right" slotKey="RIGHT_SKYSCRAPER" />
          </aside>
        )}
      </div>

      {/* Export Report Modal */}
      {showExportModal && result && (
        <ExportReportModal
          result={result}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-semibold text-slate-700">ATS Master HRD</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              🔒 Jaminan Privasi: Dokumen & Data CV Sama Sekali Tidak Disimpan
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Replikasi: Jobscan, Workday, Greenhouse, Glints/Jobstreet</span>
            <span className="text-slate-300">•</span>
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-medium flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Kebijakan Privasi (Privacy Policy)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
