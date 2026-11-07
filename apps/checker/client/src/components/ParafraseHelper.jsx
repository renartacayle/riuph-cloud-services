import React, { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Lightbulb, RefreshCw, Wand2, FileDown, Download, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ParafraseHelper({
  initialSentence = "",
  onApplyParaphrase,
  fullText = "",
  studentInfo = {},
  onApplyToMainDoc,
  hasResult = false,
  onTrySample,
  onOpenUpload
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [activeSubTab, setActiveSubTab] = useState("full"); // "full" | "sentence"

  // Sentence-level state
  const [inputText, setInputText] = useState(initialSentence || "");
  const [sentenceResult, setSentenceResult] = useState(null);
  const [sentenceCopied, setSentenceCopied] = useState(false);
  const [sentenceLoading, setSentenceLoading] = useState(false);

  // Full-doc humanizer state
  const [fullLoading, setFullLoading] = useState(false);
  const [humanizeResult, setHumanizeResult] = useState(null);
  const [docCopied, setDocCopied] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Handle single sentence paraphrase
  const handleParaphrase = async () => {
    setSentenceLoading(true);
    try {
      const response = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, lang })
      });
      const data = await response.json();
      setSentenceResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSentenceLoading(false);
    }
  };

  const handleCopySentence = () => {
    if (!sentenceResult?.paraphrased) return;
    navigator.clipboard.writeText(sentenceResult.paraphrased);
    setSentenceCopied(true);
    setTimeout(() => setSentenceCopied(false), 2000);
  };

  // Handle full doc humanize
  const handleHumanizeFullDoc = async () => {
    if (!fullText) return;
    setFullLoading(true);
    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText,
          facultyId: studentInfo?.facultyId || "FIK",
          lang
        })
      });
      const data = await response.json();
      setHumanizeResult(data);
    } catch (err) {
      console.error("Gagal humanisasi dokumen:", err);
    } finally {
      setFullLoading(false);
    }
  };

  const handleCopyDoc = () => {
    if (!humanizeResult?.transformed) return;
    navigator.clipboard.writeText(humanizeResult.transformed);
    setDocCopied(true);
    setTimeout(() => setDocCopied(false), 2000);
  };

  const handleDownloadDocx = async (textToDownload) => {
    if (!textToDownload) return;
    setDownloadingDocx(true);
    try {
      const title = (studentInfo?.title || "Naskah_Karya_Ilmiah") + "_BebasPlagiasi";
      const res = await fetch("/api/export/docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToDownload,
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

  const handleDownloadPdf = async (textToDownload) => {
    if (!textToDownload) return;
    setDownloadingPdf(true);
    try {
      const title = (studentInfo?.title || "Naskah_Karya_Ilmiah") + "_BebasPlagiasi";
      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToDownload,
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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6">
        <div className="flex items-center space-x-2 text-emerald-600 mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {isEn
              ? "Humanization Engine & Plagiarism Bypass Assistant (4S Method)"
              : "Generator Humanisasi & Asisten Bebas Plagiasi (Metode 4S)"}
          </span>
        </div>
        <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl">
          {isEn
            ? "Lower Academic Similarity (≤ 15%) & Clear AI Writing Detection (≤ 10%)"
            : "Turunkan Skor Similarity Naskah (≤ 15%) & Bebaskan dari Deteksi AI (≤ 10%)"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          {isEn
            ? "Automatically eliminates repetitive AI linguistic clichés and breaks academic similarity k-grams using the 4S Method (Synonym, Shuffle, Separate, Substantiate). Export clean manuscripts directly to Microsoft Word (.DOCX) or PDF."
            : "Sistem otomatis mengeliminasi klise kalimat AI dan merekonstruksi rantai kesamaan Academic Similarity dengan repositori karya ilmiah menggunakan metode 4S (Synonym, Shuffle, Separate, Substantiate). Hasil dapat langsung diekspor ke Microsoft Word (.DOCX) standar margin 4-4-3-3 cm dan PDF."}
        </p>

        {/* Sub-Tabs Selector */}
        <div className="grid grid-cols-2 sm:flex border-b border-slate-200 mt-6 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveSubTab("full")}
            className={`py-2 px-2 sm:py-2.5 sm:px-4 border-b-2 transition cursor-pointer flex items-center justify-center space-x-1.5 text-center ${
              activeSubTab === "full"
                ? "border-emerald-600 text-emerald-700 bg-emerald-50/40"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              {isEn ? "Full Document Humanizer" : "Humanisasi Naskah"}
              <span className="hidden sm:inline"> (.DOCX/.PDF)</span>
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab("sentence")}
            className={`py-2 px-2 sm:py-2.5 sm:px-4 border-b-2 transition cursor-pointer flex items-center justify-center space-x-1.5 text-center ${
              activeSubTab === "sentence"
                ? "border-emerald-600 text-emerald-700 bg-emerald-50/40"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              {isEn ? "Sentence-Level Paraphraser" : "Parafrase Per Kalimat"}
            </span>
          </button>
        </div>

        {/* TAB 1: FULL DOCUMENT HUMANIZER */}
        {activeSubTab === "full" && (
          <div className="mt-6 space-y-6">
            {!fullText && (
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-emerald-900">
                      {isEn ? "No Research Manuscript Loaded" : "Belum Ada Naskah Dokumen yang Dipilih"}
                    </p>
                    <p className="text-emerald-800 mt-0.5">
                      {isEn
                        ? 'To humanize and paraphrase entire thesis chapters at once, upload your file or click "⚡ Try Sample Paper". You can also test individual sentences in the adjacent tab.'
                        : 'Untuk humanisasi dan parafrase seluruh bab skripsi sekaligus, unggah file Anda atau klik "⚡ Coba Contoh Naskah". Anda juga bisa langsung mencoba parafrase kalimat di tab sebelah.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {onTrySample && (
                    <button
                      type="button"
                      onClick={onTrySample}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
                    >
                      {isEn ? "⚡ Try Sample Paper" : "⚡ Coba Contoh Naskah"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveSubTab("sentence")}
                    className="bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    {isEn ? "Open Sentence Paraphraser →" : "Buka Parafrase Per Kalimat →"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-800 block">
                  {isEn ? "Active Research Manuscript:" : "Naskah Skripsi Saat Ini:"}
                </span>
                <p className="text-slate-600">
                  {isEn ? "Title:" : "Judul:"} <strong>{studentInfo?.title || (isEn ? "Research Manuscript" : "Naskah Skripsi")}</strong> • {isEn ? "Faculty:" : "Fakultas:"} <strong>{studentInfo?.facultyId || "FIK"}</strong>
                </p>
                <p className="text-slate-400 font-mono text-[11px]">
                  {fullText.length.toLocaleString(isEn ? "en-US" : "id-ID")} {isEn ? "characters" : "karakter"} • {fullText.split(/\s+/).filter(Boolean).length.toLocaleString(isEn ? "en-US" : "id-ID")} {isEn ? "words" : "kata"}
                </p>
              </div>

              <button
                onClick={handleHumanizeFullDoc}
                disabled={fullLoading || !fullText}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-xs shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Wand2 className={`w-4 h-4 ${fullLoading ? "animate-spin" : ""}`} />
                <span>
                  {fullLoading
                    ? (isEn ? "Executing 4S Transformation..." : "Sedang Menjalankan Transformasi 4S...")
                    : (isEn ? "Run Full Academic Humanizer & 4S Bypass" : "Jalankan Generator Humanisasi Bebas Plagiasi")}
                </span>
              </button>
            </div>

            {/* Results Display */}
            {humanizeResult && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Score Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Academic Similarity</span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-3xl font-black text-emerald-800">{humanizeResult.plagiarism?.overallSimilarity}%</span>
                      <span className="text-xs font-semibold text-emerald-600">
                        {isEn ? "Safe ≤ 15% ✔" : "Aman ≤ 15% ✔"}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      {isEn
                        ? "Complies with strict academic defense threshold (≤ 15%)."
                        : "Lolos standar toleransi bebas plagiasi (≤ 15%)."}
                    </p>
                  </div>

                  <div className="bg-cyan-50 border border-cyan-300 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider block">AI Writing Integrity</span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-3xl font-black text-cyan-800">{humanizeResult.ai?.aiPercentage}%</span>
                      <span className="text-xs font-semibold text-cyan-600">
                        {isEn ? "Natural ≤ 10% ✔" : "Alami ≤ 10% ✔"}
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-700 mt-1">
                      {isEn
                        ? "Free from synthetic robotic AI language patterns."
                        : "Bebas dari klise robotik detektor AI."}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-300 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                      {isEn ? "4S Structural Rewrites" : "Pola Rekonstruksi 4S"}
                    </span>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-3xl font-black text-blue-800">{humanizeResult.modificationsCount}</span>
                      <span className="text-xs font-semibold text-blue-600">
                        {isEn ? "Critical Clauses" : "Klausa Kritis"}
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-700 mt-1">
                      {isEn
                        ? "Successfully remodeled syntax and academic terminology."
                        : "Struktur sintaksis dan diksi berhasil dirombak."}
                    </p>
                  </div>
                </div>

                {/* Transformed Text Viewer with Export Options */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-800">
                        {isEn
                          ? "Transformed Clean Manuscript (Ready for Submission):"
                          : "Naskah Hasil Transformasi (Siap Submit / Cetak):"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyDoc}
                        className="flex items-center space-x-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer"
                      >
                        {docCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{docCopied ? (isEn ? "Copied!" : "Tersalin!") : (isEn ? "Copy Manuscript" : "Salin Naskah")}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadDocx(humanizeResult.transformed)}
                        disabled={downloadingDocx}
                        className="flex items-center space-x-1.5 bg-[#003399] hover:bg-blue-900 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                        title={isEn ? "Download Microsoft Word (.DOCX) format standard margins 4-4-3-3 cm" : "Unduh format Microsoft Word (.DOCX) standar margin Dikti 4-4-3-3 cm, Times New Roman 12pt, Spasi 1.5"}
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>{downloadingDocx ? (isEn ? "Preparing..." : "Menyiapkan...") : (isEn ? "Download .DOCX (Word)" : "Unduh .DOCX (Word)")}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadPdf(humanizeResult.transformed)}
                        disabled={downloadingPdf}
                        className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                        title={isEn ? "Download official clean PDF format" : "Unduh format PDF standar nasional"}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingPdf ? (isEn ? "Preparing..." : "Menyiapkan...") : (isEn ? "Download .PDF" : "Unduh .PDF")}</span>
                      </button>

                      {onApplyToMainDoc && (
                        <button
                          onClick={() => onApplyToMainDoc(humanizeResult.transformed)}
                          className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-xs cursor-pointer"
                          title={isEn ? "Apply transformed text to primary Similarity view" : "Terapkan hasil transformasi ke tampilan utama Similarity"}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{isEn ? "Apply to Main Dashboard" : "Terapkan ke Dashboard Utama"}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 max-h-[500px] overflow-y-auto font-academic text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap select-text bg-white">
                    {humanizeResult.transformed}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SINGLE SENTENCE PARAPHRASE */}
        {activeSubTab === "sentence" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">
                  {isEn ? "Original Sentence (Flagged Plagiarism / AI):" : "Kalimat Asli (Terindikasi Plagiat / AI):"}
                </label>
                <span className="text-slate-400 font-mono">
                  {inputText.length} {isEn ? "characters" : "karakter"}
                </span>
              </div>
              <textarea
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isEn ? "Paste sentence highlighted in Academic Similarity here..." : "Tempel kalimat yang disorot kemiripan di sini..."}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-academic leading-relaxed"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] text-slate-500 font-semibold">
                  {isEn ? "Try Sample:" : "Coba Kalimat:"}
                </span>
                <button
                  type="button"
                  onClick={() => setInputText(
                    isEn
                      ? "The K-Means clustering algorithm is an unsupervised learning method that aims to partition given data points into distinct clusters based on Euclidean distance."
                      : "Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk beberapa cluster berdasarkan jarak euclidean distance."
                  )}
                  className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-2 py-0.5 rounded border border-slate-200 transition cursor-pointer"
                >
                  {isEn ? "Sample 1: Methodology Definition" : "Contoh 1: Definisi Metodologi"}
                </button>
                <button
                  type="button"
                  onClick={() => setInputText(
                    isEn
                      ? "In today's rapidly evolving digital landscape, artificial intelligence plays an undeniably crucial role in revolutionizing modern business operations across diverse sectors."
                      : "Dalam era digital yang terus berkembang pesat saat ini, kecerdasan buatan memainkan peranan yang sangat krusial dalam mentransformasi operasional bisnis secara komprehensif."
                  )}
                  className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-2 py-0.5 rounded border border-slate-200 transition cursor-pointer"
                >
                  {isEn ? "Sample 2: Cliché AI Phrase" : "Contoh 2: Frasa Klise AI"}
                </button>
              </div>
              <button
                onClick={handleParaphrase}
                disabled={sentenceLoading || !inputText.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition text-xs shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Wand2 className={`w-4 h-4 ${sentenceLoading ? "animate-spin" : ""}`} />
                <span>
                  {sentenceLoading
                    ? (isEn ? "Paraphrasing..." : "Sedang Memparafrase...")
                    : (isEn ? "Paraphrase Sentence Automatically" : "Parafrase Kalimat Secara Otomatis")}
                </span>
              </button>
            </div>

            {/* Output Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-emerald-800 flex items-center space-x-1">
                  <span>{isEn ? "Original Paraphrase (Similarity & AI Safe):" : "Hasil Parafrase Orisinal (Aman Similarity):"}</span>
                </label>
                {sentenceResult && (
                  <button
                    onClick={handleCopySentence}
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {sentenceCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{sentenceCopied ? (isEn ? "Copied!" : "Tersalin!") : (isEn ? "Copy Text" : "Salin Teks")}</span>
                  </button>
                )}
              </div>

              <div className="min-h-[148px] p-3 bg-emerald-50/50 border border-emerald-300 rounded-lg text-xs font-academic leading-relaxed text-slate-800">
                {sentenceResult ? (
                  <p className="select-text">{sentenceResult.paraphrased}</p>
                ) : (
                  <p className="text-slate-400 italic">
                    {isEn
                      ? 'Click the "Paraphrase Sentence Automatically" button to generate an original academic phrasing free from similarity and AI detection.'
                      : 'Klik tombol "Parafrase Kalimat" di samping untuk menghasilkan versi kalimat yang aman dari deteksi plagiasi dan AI.'}
                  </p>
                )}
              </div>

              {sentenceResult && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{isEn ? "Academic Writing Tip:" : "Tips Penulisan Skripsi:"}</span>
                    <p className="mt-0.5 leading-snug">{sentenceResult.tip}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Guide: The 4S Method for Academic Similarity Plagiarism Reduction */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6 space-y-4">
        <h4 className="font-extrabold text-slate-800 text-sm">
          {isEn
            ? "The 4S Method: Lawfully Lowering Similarity Index Under Academic Integrity Guidelines"
            : "Metode 4S: Teknik Menurunkan Skor Similarity Secara Sah Menurut Standar Integritas Akademik"}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-extrabold text-blue-600 text-sm block">1. Synonym</span>
            <span className="font-bold text-slate-700 block mt-0.5">
              {isEn ? "Substitute Formal Diction" : "Ganti Diksi Baku"}
            </span>
            <p className="text-slate-500 text-[11px] mt-1 leading-snug">
              {isEn
                ? 'Employ precise academic synonyms (e.g. replace "partition" with "categorize", "conducted" with "implemented").'
                : 'Gunakan padanan kata formal (misal: "mempartisi" diganti "mengelompokkan", "dilakukan" diganti "diterapkan").'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-extrabold text-emerald-600 text-sm block">2. Shuffle</span>
            <span className="font-bold text-slate-700 block mt-0.5">
              {isEn ? "Invert Sentence Structure" : "Ubah Struktur Kalimat"}
            </span>
            <p className="text-slate-500 text-[11px] mt-1 leading-snug">
              {isEn
                ? "Invert passive voice into active, or position adverbial subordinate clauses at the forefront of the sentence."
                : "Ubah pola kalimat pasif menjadi aktif, atau letakkan anak kalimat keterangan di posisi paling depan."}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-extrabold text-purple-600 text-sm block">3. Separate</span>
            <span className="font-bold text-slate-700 block mt-0.5">
              {isEn ? "Split Compound Clauses" : "Pecah Kalimat Majemuk"}
            </span>
            <p className="text-slate-500 text-[11px] mt-1 leading-snug">
              {isEn
                ? "Split sprawling multi-clause sentences into concise independent clauses to shatter similarity k-gram matches."
                : "Kalimat panjang yang terdiri dari 3 klausa dipecah menjadi 2 kalimat ringkas untuk mengacaukan k-gram similarity."}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-extrabold text-amber-600 text-sm block">4. Substantiate</span>
            <span className="font-bold text-slate-700 block mt-0.5">
              {isEn ? "Embed Empirical Context" : "Beri Konteks Riil"}
            </span>
            <p className="text-slate-500 text-[11px] mt-1 leading-snug">
              {isEn
                ? "Incorporate unique field data markers, empirical metrics, and site-specific findings from your study."
                : "Sematkan konteks unik studi kasus Anda (misal: indikator data empiris primer pada lokasi penelitian Anda)."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
