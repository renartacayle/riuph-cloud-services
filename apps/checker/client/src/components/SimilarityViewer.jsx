import React, { useState } from "react";
import { ExternalLink, Filter, Info, ShieldAlert, CheckCircle2, ChevronRight, Sliders, BookOpen, Download, FileDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function SimilarityViewer({
  fullText,
  plagiarismResult,
  options,
  setOptions,
  onApplyFilters,
  loading,
  studentInfo
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadDocx = async () => {
    if (!fullText) return;
    setDownloadingDocx(true);
    try {
      const title = studentInfo?.title || "Naskah_Karya_Ilmiah";
      const res = await fetch("/api/export/docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText,
          title,
          author: studentInfo?.name || "Penulis Karya Ilmiah"
        })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^a-zA-Z0-9_\-]/g, "_")}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mengunduh file DOCX:", err);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!fullText) return;
    setDownloadingPdf(true);
    try {
      const title = studentInfo?.title || "Naskah_Karya_Ilmiah";
      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText,
          title,
          author: studentInfo?.name || "Penulis Karya Ilmiah"
        })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^a-zA-Z0-9_\-]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mengunduh file PDF:", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const matches = plagiarismResult?.matches || [];
  const sources = plagiarismResult?.sources || [];
  const overallSimilarity = plagiarismResult?.overallSimilarity || 0;
  const breakdown = plagiarismResult?.breakdown || { internet: 0, publications: 0, studentPapers: 0 };

  // Render document text with color-coded highlight spans
  const renderHighlightedDocument = () => {
    if (!fullText) {
      return (
        <p className="text-slate-400 italic">
          {isEn ? "No manuscript text loaded." : "Tidak ada naskah yang dimuat."}
        </p>
      );
    }
    if (matches.length === 0) {
      return (
        <div className="whitespace-pre-wrap font-academic text-slate-800 leading-relaxed text-sm sm:text-base">
          {fullText}
        </div>
      );
    }

    // Build slices based on match ranges
    const segments = [];
    let lastIndex = 0;

    for (let i = 0; i < matches.length; i++) {
      const m = matches[i];
      if (m.docStartChar > lastIndex) {
        segments.push({
          type: "text",
          content: fullText.substring(lastIndex, m.docStartChar)
        });
      }

      segments.push({
        type: "match",
        match: m,
        content: fullText.substring(m.docStartChar, m.docEndChar)
      });

      lastIndex = m.docEndChar;
    }

    if (lastIndex < fullText.length) {
      segments.push({
        type: "text",
        content: fullText.substring(lastIndex)
      });
    }

    return (
      <div className="whitespace-pre-wrap font-academic text-slate-800 leading-relaxed text-sm sm:text-base select-text">
        {segments.map((seg, idx) => {
          if (seg.type === "text") {
            return <span key={idx}>{seg.content}</span>;
          }

          const m = seg.match;
          const isSelected = selectedSourceId === m.sourceId;

          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSourceId(m.sourceId);
                setActiveTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  match: m
                });
              }}
              style={{
                backgroundColor: `${m.sourceColor}33`, // 20% opacity
                borderBottom: `2px solid ${m.sourceColor}`
              }}
              className={`relative cursor-pointer transition-all duration-150 rounded-xs px-0.5 hover:ring-2 hover:ring-offset-1 hover:ring-blue-400 ${
                isSelected ? "ring-2 ring-blue-600 bg-opacity-40" : ""
              }`}
            >
              <sup
                style={{ backgroundColor: m.sourceColor }}
                className="text-[10px] text-white font-bold px-1 rounded-full mx-0.5 select-none shadow-xs"
              >
                {m.sourceIndex || 1}
              </sup>
              {seg.content}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative" onClick={() => setActiveTooltip(null)}>
      {/* Floating Tooltip for clicked match */}
      {activeTooltip && (
        <div
          style={{
            top: window.innerWidth < 640 ? "auto" : Math.min(window.innerHeight - 200, activeTooltip.y + 10),
            bottom: window.innerWidth < 640 ? 16 : "auto",
            left: window.innerWidth < 640 ? "5%" : Math.min(window.innerWidth - 340, activeTooltip.x),
            width: window.innerWidth < 640 ? "90%" : "20rem"
          }}
          className="fixed z-50 bg-white border border-slate-300 rounded-xl shadow-2xl p-4 text-xs animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span
              style={{ backgroundColor: activeTooltip.match.sourceColor }}
              className="text-white font-bold px-2 py-0.5 rounded text-[11px]"
            >
              {isEn ? `Source #${activeTooltip.match.sourceIndex}` : `Sumber #${activeTooltip.match.sourceIndex}`}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {activeTooltip.match.sourceType}
            </span>
          </div>

          <h5 className="font-bold text-slate-800 text-sm line-clamp-2 mb-1">
            {activeTooltip.match.sourceTitle}
          </h5>
          <p className="text-slate-600 text-[11px] mb-2">
            {activeTooltip.match.sourceAuthor || activeTooltip.match.sourceInstitution}
          </p>

          <div className="bg-slate-50 p-2 rounded border border-slate-200 text-slate-600 mb-2 font-mono text-[10px]">
            Domain: {activeTooltip.match.sourceDomain}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500 text-[10px]">
              {activeTooltip.match.matchedWordsCount} {isEn ? "matching words" : "kata cocok"}
            </span>
            <button
              onClick={() => setSelectedSourceId(activeTooltip.match.sourceId)}
              className="text-blue-600 font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>{isEn ? "View Source Details" : "Lihat Detail Sumber"}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Document Pane (Left - 8 Cols on Desktop, Order 2 on Mobile) */}
      <div className="order-2 lg:order-1 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800 text-sm sm:text-lg">
                  {isEn ? "Research Manuscript / Thesis" : "Naskah Skripsi / Tugas Akhir"}
                </h3>
                <span className="bg-slate-100 text-slate-600 text-[11px] sm:text-xs px-2 py-0.5 rounded font-mono font-medium">
                  {plagiarismResult?.totalWords || 0} {isEn ? "Words" : "Kata"}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {isEn
                  ? "Matched passages are highlighted with color-coded indices and repository sources."
                  : "Kutipan yang terindikasi plagiat disorot dengan warna dan nomor sumber referensi."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleDownloadDocx}
                disabled={downloadingDocx || !fullText}
                title={isEn ? "Download manuscript in DOCX format" : "Unduh Naskah dalam format DOCX"}
                className="flex items-center space-x-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 text-blue-600" />
                <span>.DOCX</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf || !fullText}
                title={isEn ? "Download manuscript in official PDF format" : "Unduh Naskah Skripsi dalam format PDF Resmi"}
                className="flex items-center space-x-1 text-xs font-semibold px-2 py-1.5 rounded-lg border border-red-600 bg-red-50 text-red-700 hover:bg-red-100 transition cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-red-600" />
                <span>.PDF</span>
              </button>

              <button
                onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                  showFiltersDrawer
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{isEn ? "Filters" : "Filter Uji"}</span>
                <span className="sm:hidden">{isEn ? "Filters" : "Filter"}</span>
              </button>
            </div>
          </div>

          {/* Document Content View */}
          <div className="min-h-[350px] max-h-[600px] sm:max-h-[850px] overflow-y-auto pr-1 sm:pr-2">
            {renderHighlightedDocument()}
          </div>
        </div>
      </div>

      {/* Right Drawer: Academic Similarity Match Overview (4 Cols on Desktop, Order 1 on Mobile) */}
      <div className="order-1 lg:order-2 lg:col-span-4 space-y-4">
        {/* Academic Similarity Gauge Card */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm tracking-wide">
                MATCH OVERVIEW (SIMILARITY INDEX)
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEn ? "Academic Originality Verification" : "Hasil Cek Orisinalitas Akademik"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400">
                {isEn ? "OFFICIAL" : "RESMI"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center py-5">
            <div className="relative flex items-center justify-center">
              {/* Outer Circular Ring */}
              <div
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-8 shadow-inner ${
                  overallSimilarity <= 20
                    ? "border-emerald-500 bg-emerald-50/50 text-emerald-700"
                    : overallSimilarity <= 25
                    ? "border-amber-500 bg-amber-50/50 text-amber-700"
                    : "border-red-500 bg-red-50/50 text-red-700"
                }`}
              >
                <span className="text-4xl font-black tracking-tight">{overallSimilarity}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Similarity Index</span>
              </div>
            </div>
          </div>

          {/* Status Alert Badge */}
          <div
            className={`p-3 rounded-lg flex items-start space-x-2 text-xs mb-4 ${
              overallSimilarity <= 20
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : overallSimilarity <= 25
                ? "bg-amber-50 border border-amber-200 text-amber-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {overallSimilarity <= 20 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">
                {overallSimilarity <= 20
                  ? (isEn ? "PLAGIARISM THRESHOLD PASSED" : "MEMENUHI SYARAT BEBAS PLAGIASI")
                  : overallSimilarity <= 25
                  ? (isEn ? "AT MAXIMUM TOLERANCE THRESHOLD" : "AMBANG BATAS MAKSIMAL")
                  : (isEn ? "EXCEEDS TOLERANCE THRESHOLD" : "MELEBIHI AMBANG BATAS TOLERANSI")}
              </span>
              <p className="text-[11px] mt-0.5 leading-snug opacity-90">
                {overallSimilarity <= 20
                  ? (isEn
                      ? "Score is within institution tolerance (≤ 20%). Eligible for Official Plagiarism Clearance."
                      : "Skor berada di bawah batas toleransi (≤ 20%). Berhak mengajukan Surat Keterangan Bebas Plagiasi.")
                  : overallSimilarity <= 25
                  ? (isEn
                      ? "Score is in the borderline range (20-25%). Some faculties mandate revision below 20%."
                      : "Skor berada pada rentang 20-25%. Beberapa institusi/program studi mewajibkan revisi hingga di bawah 20%.")
                  : (isEn
                      ? "Score exceeds maximum tolerance. Paraphrasing recommended before defense committee."
                      : "Skor melebihi toleransi maksimal. Naskah disarankan diparafrase ulang sebelum diajukan ke dewan penguji.")}
              </p>
            </div>
          </div>

          {/* Source Types Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              {isEn ? "Source Type Distribution:" : "Distribusi Tipe Sumber:"}
            </span>

            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-slate-600 mb-0.5 text-[11px]">
                  <span>Internet Sources</span>
                  <span className="font-bold">{breakdown.internet}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${breakdown.internet}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-0.5 text-[11px]">
                  <span>{isEn ? "Publications / Journals" : "Publications / Jurnal"}</span>
                  <span className="font-bold">{breakdown.publications}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${breakdown.publications}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-0.5 text-[11px]">
                  <span>{isEn ? "Student Papers (Theses)" : "Student Papers (Skripsi)"}</span>
                  <span className="font-bold">{breakdown.studentPapers}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${breakdown.studentPapers}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Settings Panel */}
        {showFiltersDrawer && (
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <span className="font-bold text-blue-900 flex items-center space-x-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-700" />
                <span>{isEn ? "Academic Similarity Filters & Exclusions" : "Filter & Pengecualian Similarity"}</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">
                {isEn ? "Academic Standard" : "Standar Integritas Akademik"}
              </span>
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 font-medium">
                {isEn ? 'Exclude Quotes ("...")' : 'Kecualikan Kutipan ("...")'}
              </span>
              <input
                type="checkbox"
                checked={options.excludeQuotes}
                onChange={(e) => setOptions({ ...options, excludeQuotes: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 font-medium">
                {isEn ? "Exclude Bibliography / References" : "Kecualikan Daftar Pustaka"}
              </span>
              <input
                type="checkbox"
                checked={options.excludeBibliography}
                onChange={(e) => setOptions({ ...options, excludeBibliography: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <div className="pt-2 border-t border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-700 font-medium">
                  {isEn ? 'No-Repository Mode' : 'Mode "No Repository"'}
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {isEn ? "ACTIVE" : "AKTIF"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                {isEn
                  ? "Prevents the manuscript from being saved to permanent public databases, avoiding 100% self-plagiarism flags during graduation."
                  : "Mencegah naskah tersimpan ke database publik global agar tidak terdeteksi 100% plagiat saat sidang atau yudisium."}
              </p>
            </div>

            <button
              onClick={onApplyFilters}
              disabled={loading}
              className="w-full bg-[#003399] hover:bg-blue-900 text-white font-bold py-2 rounded-lg transition text-xs shadow-xs cursor-pointer"
            >
              {isEn ? "Apply Filters" : "Terapkan Filter"}
            </button>
          </div>
        )}

        {/* Primary Sources List (Ranked 1..N) */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              {isEn ? `Detected Sources (${sources.length})` : `Daftar Sumber Terdeteksi (${sources.length})`}
            </h5>
            <span className="text-[10px] text-slate-400">
              {isEn ? "Ranked by Percentage" : "Diurutkan Berdasarkan %"}
            </span>
          </div>

          {sources.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-xs">
              {isEn
                ? "No significant similarity detected against repository corpus."
                : "Tidak ditemukan kemiripan signifikan dengan korpus repository."}
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {sources.map((src) => {
                const isSelected = selectedSourceId === src.sourceId;
                return (
                  <div
                    key={src.sourceId}
                    onClick={() => setSelectedSourceId(isSelected ? null : src.sourceId)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/50 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2">
                        <span
                          style={{ backgroundColor: src.color }}
                          className="w-5 h-5 rounded-full text-white font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                        >
                          {src.displayIndex}
                        </span>
                        <div>
                          <h6 className="font-bold text-slate-800 text-xs line-clamp-2 leading-snug">
                            {src.title}
                          </h6>
                          <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                            {src.domain}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-black text-slate-800 text-sm">{src.percentage}%</span>
                        <span className="block text-[9px] text-slate-400">
                          {src.matchedWords} {isEn ? "words" : "kata"}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px] space-y-1.5 animate-in fade-in duration-100">
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {isEn ? "Institution / Author:" : "Institusi / Penulis:"}
                          </span>{" "}
                          {src.institution || src.author}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {isEn ? "Category:" : "Kategori:"}
                          </span>{" "}
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-700">
                            {src.sourceType}
                          </span>
                        </p>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-blue-600 hover:underline font-semibold mt-1"
                        >
                          <span>{isEn ? "Open Source Link" : "Buka Tautan Sumber"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
