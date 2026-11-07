import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCode,
  BookOpen,
  Bot
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function UploadSection({
  activeTab = "academic similarity",
  setActiveTab,
  onUploadFile,
  onSubmitManualText,
  onSelectSample,
  faculties,
  studentInfo,
  setStudentInfo,
  options,
  setOptions,
  loading
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [activeMode, setActiveMode] = useState("file"); // "file" | "paste"
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const isAiMode = activeTab === "ai";

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setErrorMessage("");
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["docx", "doc", "pdf", "txt"].includes(ext)) {
      setErrorMessage(
        isEn
          ? "Unsupported file format. Please upload .docx, .pdf, or .txt file."
          : "Format file tidak didukung. Mohon gunakan file .docx, .pdf, atau .txt."
      );
      return;
    }
    setSelectedFile(file);
    // Auto-fill title if empty
    if (!studentInfo.title) {
      const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]+/g, " ");
      setStudentInfo((prev) => ({ ...prev, title: cleanTitle }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (activeMode === "file") {
      if (!selectedFile) {
        setErrorMessage(
          isEn
            ? "Please select a manuscript file (.docx / .pdf) first."
            : "Silakan pilih berkas skripsi (.docx / .pdf) terlebih dahulu."
        );
        return;
      }
      onUploadFile(selectedFile);
    } else {
      if (!pastedText.trim() || pastedText.trim().length < 50) {
        setErrorMessage(
          isEn
            ? "Manuscript text is too short (minimum 50 characters required)."
            : "Teks naskah skripsi terlalu pendek (minimal 50 karakter)."
        );
        return;
      }
      onSubmitManualText(pastedText);
    }
  };

  const facultyObj = faculties.find((f) => f.id === studentInfo.facultyId) || faculties[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Primary Testing Focus Switcher: Academic Similarity vs AI Writing Integrity */}
      <div className="flex justify-center px-1">
        <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1 sm:p-1.5 rounded-2xl bg-slate-200/90 border border-slate-300 shadow-inner gap-1">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("academic similarity")}
            className={`px-2.5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              !isAiMode
                ? "bg-white text-[#002266] shadow-md scale-[1.01]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">{isEn ? "1. Upload " : "1. Unggah "}</span>
              {isEn ? "Academic Similarity" : "Academic Similarity"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("ai")}
            className={`px-2.5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              isAiMode
                ? "bg-cyan-600 text-white shadow-md scale-[1.01]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">{isEn ? "2. Upload " : "2. Unggah "}</span>
              {isEn ? "AI Writing" : "AI Writing"}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-black shrink-0 ${
                isAiMode ? "bg-[#FFCC00] text-[#002266]" : "bg-cyan-100 text-cyan-800"
              }`}
            >
              AI
            </span>
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="text-center space-y-2 sm:space-y-3 pt-1 pb-2 px-2">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold shadow-2xs max-w-full ${
            isAiMode
              ? "bg-cyan-50 border-cyan-200 text-cyan-900"
              : "bg-blue-50 border-blue-200 text-[#002266]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 animate-pulse ${
              isAiMode ? "bg-cyan-500" : "bg-emerald-500"
            }`}
          ></span>
          <span className="truncate">
            {isAiMode
              ? (isEn
                  ? "AI Writing Integrity Standard & Generative Classifier"
                  : "Standar AI Writing Integrity & Generative Content Classifier")
              : (isEn
                  ? "Academic Integrity & Similarity Verification Framework"
                  : "Pusat Integritas Karya Ilmiah & Academic Similarity Framework")}
          </span>
        </div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#002266] tracking-tight">
          {isAiMode
            ? (isEn ? "Academic AI Writing Detector" : "Deteksi AI Writing Karya Ilmiah")
            : (isEn ? "Plagiarism & Similarity Testing" : "Pengujian Plagiarisme & Similarity")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isAiMode
            ? (isEn
                ? "Upload your research manuscript (.docx or .pdf) or paste text to detect AI-generated sentences (ChatGPT, Claude, Gemini, DeepSeek), perplexity metrics, and hallucinated citations."
                : "Unggah berkas naskah Anda (.docx atau .pdf) atau tempel teks untuk memindai kalimat buatan AI (ChatGPT, Claude, Gemini, DeepSeek), metrik perplexity, dan sitasi fiktif.")
            : (isEn
                ? "Upload your manuscript (.docx or .pdf). The engine extracts text, computes multi-gram academic similarity indices, and verifies institutional tolerance thresholds."
                : "Unggah berkas naskah Anda (.docx atau .pdf). Sistem akan mengekstrak teks, menghitung persentase kemiripan naskah, dan memeriksa toleransi ambang batas kampus.")}
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Card Header & Mode Switcher */}
        <div
          className={`text-white p-3.5 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b-2 ${
            isAiMode
              ? "bg-gradient-to-r from-[#001744] via-cyan-950 to-[#002266] border-cyan-400"
              : "bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-cyan-500/50"
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 font-mono shadow-sm ${
                isAiMode
                  ? "bg-cyan-900/80 border-cyan-400 text-cyan-300"
                  : "bg-slate-900/90 border-cyan-400/50 text-cyan-300"
              }`}
            >
              {isAiMode ? "AI" : "RC"}
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-base font-bold truncate">
                {isAiMode
                  ? (isEn ? "Upload Portal • AI Writing Detection" : "Portal Unggah • Deteksi AI Writing")
                  : (isEn ? "Upload Portal • Academic Similarity" : "Portal Unggah • Academic Similarity")}
              </h2>
              <p className="text-[11px] sm:text-xs text-blue-200 truncate">
                {isAiMode
                  ? (isEn ? "AI Writing Integrity Studio Standard • Sentence Breakdown" : "Standar AI Writing Integrity Studio • Analisis Kalimat")
                  : (isEn ? "Official No-Repository Mode • 100% Protected" : "No-Repository Mode Resmi • Dokumen Terproteksi")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex rounded-lg bg-blue-950/60 p-1 border border-blue-800 text-xs gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveMode("file");
                setErrorMessage("");
              }}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === "file"
                  ? isAiMode
                    ? "bg-cyan-400 text-slate-950 shadow-xs"
                    : "bg-[#FFCC00] text-[#002266] shadow-xs"
                  : "text-blue-200 hover:text-white"
              }`}
            >
              <Upload className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isEn ? "Upload File" : "Unggah Berkas"}
                <span className="hidden sm:inline"> (.docx / .pdf)</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveMode("paste");
                setErrorMessage("");
              }}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === "paste"
                  ? isAiMode
                    ? "bg-cyan-400 text-slate-950 shadow-xs"
                    : "bg-[#FFCC00] text-[#002266] shadow-xs"
                  : "text-blue-200 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isEn ? "Paste Text" : "Tempel Teks"}
                <span className="hidden sm:inline">{isEn ? " (Direct)" : " (Paste)"}</span>
              </span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode 1: File Upload Dropzone */}
          {activeMode === "file" && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.doc,.pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? isAiMode
                      ? "border-cyan-500 bg-cyan-50/80 scale-[1.01]"
                      : "border-blue-600 bg-blue-50/80 scale-[1.01]"
                    : selectedFile
                    ? "border-emerald-500 bg-emerald-50/40"
                    : isAiMode
                    ? "border-cyan-200 hover:border-cyan-500 hover:bg-cyan-50/50"
                    : "border-slate-300 hover:border-blue-500 hover:bg-slate-50/80"
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shadow-xs">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-800">{selectedFile.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {isEn ? "Size: " : "Ukuran: "}
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {isEn ? "Extension: ." : "Ekstensi: ."}
                        {selectedFile.name.split(".").pop()}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-100/80 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {isEn
                          ? "File ready for inspection. Click the button below to start."
                          : "Berkas siap diuji. Klik tombol di bawah untuk mulai."}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center shadow-xs ${
                        isAiMode
                          ? "bg-cyan-50 border-cyan-200 text-cyan-700"
                          : "bg-blue-50 border-blue-200 text-[#002266]"
                      }`}
                    >
                      {isAiMode ? (
                        <Bot className="w-8 h-8 animate-bounce text-cyan-600" />
                      ) : (
                        <Upload className="w-8 h-8 animate-bounce" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-bold text-slate-800">
                        {isAiMode
                          ? (isEn
                              ? "Drag & Drop Thesis File (.docx / .pdf) for AI Writing Detection"
                              : "Tarik & Lepaskan Berkas Skripsi (.docx / .pdf) untuk Deteksi AI Writing")
                          : (isEn
                              ? "Drag & Drop Thesis File (.docx / .pdf) for Similarity Testing"
                              : "Tarik & Lepaskan Berkas Skripsi (.docx / .pdf) untuk Uji Similarity")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {isEn ? "Supported formats: " : "Format yang didukung: "}
                        <span className="font-semibold text-blue-700">Microsoft Word (.docx, .doc)</span>,{" "}
                        <span className="font-semibold text-red-700">Adobe PDF (.pdf)</span>,{" "}
                        {isEn ? "or Plain Text (.txt)" : "atau Plain Text (.txt)"}
                      </p>
                    </div>
                    <div className="pt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-xs transition ${
                          isAiMode ? "bg-cyan-700 hover:bg-cyan-800" : "bg-[#002266] hover:bg-blue-800"
                        }`}
                      >
                        {isAiMode ? <Bot className="w-3.5 h-3.5" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>
                          {isEn ? "Choose File from Device" : "Pilih Berkas dari Komputer / HP"}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mode 2: Paste Text Area */}
          {activeMode === "paste" && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                {isAiMode
                  ? (isEn
                      ? "Paste Paragraphs or Thesis Chapters to Check for AI Writing:"
                      : "Tempelkan Paragraf atau Bab Skripsi untuk Diperiksa AI Writing:")
                  : (isEn
                      ? "Paste Your Thesis / Manuscript Text Below:"
                      : "Tempelkan Teks Naskah Skripsi Anda di Bawah Ini:")}
              </label>
              <textarea
                rows={9}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={
                  isAiMode
                    ? (isEn
                        ? "Paste your manuscript sentences or paragraphs here to inspect AI probability..."
                        : "Tempelkan kalimat atau paragraf skripsi Anda di sini untuk memindai probabilitas buatan AI...")
                    : (isEn
                        ? "Paste Chapter 1 to Chapter 5 or your research manuscript here..."
                        : "Tempelkan Bab 1 sampai Bab 5 atau naskah skripsi Anda di sini...")
                }
                className="w-full rounded-xl border border-slate-300 p-3.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{isEn ? "Minimum 50 characters" : "Minimal 50 karakter"}</span>
                <span>
                  {pastedText.split(/\s+/).filter(Boolean).length} {isEn ? "Words" : "Kata"} •{" "}
                  {pastedText.length} {isEn ? "Characters" : "Karakter"}
                </span>
              </div>
            </div>
          )}

          {/* Student & Faculty Metadata (Quick Config) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">
                {isEn ? "Academic Faculty / Discipline" : "Fakultas Mahasiswa"}
              </label>
              <select
                value={studentInfo.facultyId}
                onChange={(e) => {
                  const f = faculties.find((x) => x.id === e.target.value);
                  setStudentInfo({
                    ...studentInfo,
                    facultyId: e.target.value,
                    facultyName: f?.name || "",
                    studyProgram: f?.programs?.[0] || ""
                  });
                }}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.id} - {isEn ? (f.nameEn || f.name) : f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">
                {isEn ? "Similarity & AI Limit" : "Toleransi Similarity & AI"}
              </label>
              <div className="px-2.5 py-1.5 rounded-lg bg-blue-100/70 text-blue-900 font-bold border border-blue-200 flex items-center justify-between">
                <span>{isEn ? "Max. " : "Maks. "}{facultyObj.maxSimilarity}%</span>
                <span className="text-[10px] text-blue-700 font-normal">AI ≤ {facultyObj.maxAiAllowed}%</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">
                {isEn ? "Student / Author Name (Optional)" : "Nama Mahasiswa (Opsional)"}
              </label>
              <input
                type="text"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                placeholder={isEn ? "e.g. John Doe / Researcher" : "Contoh: Nama Mahasiswa / Penulis"}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">
                {isEn ? "Student ID / NIM (Optional)" : "NIM (Opsional)"}
              </label>
              <input
                type="text"
                value={studentInfo.nim}
                onChange={(e) => setStudentInfo({ ...studentInfo, nim: e.target.value })}
                placeholder={isEn ? "e.g. 2024010001" : "Contoh: 2024010001"}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Academic Similarity Filter Options Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
            <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
              <input
                type="checkbox"
                checked={options.noRepository}
                onChange={(e) => setOptions({ ...options, noRepository: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 shrink-0 cursor-pointer"
              />
              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">
                {isEn ? "No-Repository (Protected)" : "No-Repository (Aman)"}
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
              <input
                type="checkbox"
                checked={options.excludeQuotes}
                onChange={(e) => setOptions({ ...options, excludeQuotes: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 shrink-0 cursor-pointer"
              />
              <span className="text-[11px] sm:text-xs text-slate-700">
                {isEn ? 'Exclude Quotes ("...")' : 'Kecualikan Kutipan ("...")'}
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
              <input
                type="checkbox"
                checked={options.excludeBibliography}
                onChange={(e) => setOptions({ ...options, excludeBibliography: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 shrink-0 cursor-pointer"
              />
              <span className="text-[11px] sm:text-xs text-slate-700">
                {isEn ? "Exclude Bibliography / References" : "Kecualikan Daftar Pustaka"}
              </span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isAiMode
                  ? "bg-gradient-to-r from-cyan-600 via-blue-700 to-cyan-800 hover:from-cyan-700 hover:to-blue-800"
                  : "bg-gradient-to-r from-[#002266] via-[#003399] to-[#002266] hover:from-[#001744] hover:to-[#002266]"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>
                    {isAiMode
                      ? (isEn
                          ? "Extracting Manuscript & Scanning AI Writing..."
                          : "Sedang Mengekstrak Naskah & Memindai Kalimat AI...")
                      : (isEn
                          ? "Extracting Text & Computing Academic Similarity..."
                          : "Sedang Mengekstrak Teks & Menganalisis Similarity...")}
                  </span>
                </>
              ) : (
                <>
                  {isAiMode ? (
                    <Bot className="w-5 h-5 text-cyan-300" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#FFCC00]" />
                  )}
                  <span>
                    {isAiMode
                      ? (isEn
                          ? "Run AI Writing Inspection (AI Writing Detector)"
                          : "Uji Kandungan AI Naskah Sekarang (AI Writing Integrity)")
                      : (isEn
                          ? "Run Academic Similarity Check (.DOCX / .PDF)"
                          : "Uji Academic Similarity Sekarang (.DOCX / .PDF)")}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Secondary Quick Action: Try Demo Samples */}
          <div className="text-center pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>
              {isEn ? "Don't have a test manuscript file ready?" : "Belum memiliki file .docx siap uji?"}
            </span>
            <button
              type="button"
              onClick={() => onSelectSample && onSelectSample(isAiMode ? 1 : 0)}
              className="font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
            >
              {isAiMode
                ? (isEn
                    ? "Try Sample AI-Flagged Manuscript (~65% AI Writing) →"
                    : "Coba Contoh Naskah Terindikasi AI (~65% AI Writing) →")
                : (isEn
                    ? "Try Sample Research Thesis Demo (~12% Similarity) →"
                    : "Coba Contoh Naskah Skripsi Demo (~12% Similarity) →")}
            </button>
          </div>
        </form>
      </div>

      {/* Feature Guarantee Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            {isAiMode ? <Bot className="w-4 h-4 text-cyan-600" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-bold text-slate-800">
              {isAiMode
                ? (isEn ? "Accurate Multi-LLM Detection" : "Deteksi Multi-LLM Akurat")
                : (isEn ? "100% No-Repository Guarantee" : "100% No Repository")}
            </div>
            <p className="text-slate-500 mt-0.5">
              {isAiMode
                ? (isEn
                    ? "Accurately detects syntactic markers from ChatGPT-4o, Claude 3.5 Sonnet, Gemini Pro, and DeepSeek."
                    : "Mendeteksi secara akurat pola sintaksis model ChatGPT-4o, Claude 3.5 Sonnet, Gemini Pro, dan DeepSeek.")
                : (isEn
                    ? "Your paper is never indexed to public repositories, protecting you against self-plagiarism in your official defense."
                    : "Naskah Anda tidak akan terindeks ke database publik repositori, sehingga terhindar dari self-plagiarism saat sidang resmi.")}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            {isAiMode ? <Sparkles className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-bold text-slate-800">
              {isAiMode
                ? (isEn ? "Cyan Per-Sentence Highlights" : "Sorotan Sian Per-Kalimat")
                : (isEn ? "Automatic DOCX & PDF Parsing" : "Ekstraksi DOCX & PDF Otomatis")}
            </div>
            <p className="text-slate-500 mt-0.5">
              {isAiMode
                ? (isEn
                    ? "Every sentence flagged as AI is highlighted in cyan with detailed perplexity confidence scores and reasons."
                    : "Setiap kalimat yang terindikasi AI diberi sorotan sian lengkap dengan probabilitas kepastian dan alasannya.")
                : (isEn
                    ? "Parses authentic Microsoft Word files, preserves chapter breakdown (Chapters I–V), and cleans page headers/footers."
                    : "Membaca file Microsoft Word asli, mempertahankan pemisahan bab (BAB I–V), dan membersihkan footer nomor halaman.")}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            {isAiMode ? <AlertCircle className="w-4 h-4 text-purple-600" /> : <BookOpen className="w-4 h-4" />}
          </div>
          <div>
            <div className="font-bold text-slate-800">
              {isAiMode
                ? (isEn ? "Hallucinated Citation Detection" : "Deteksi Sitasi Fiktif")
                : (isEn ? "Defense Committee Simulation" : "Simulasi Dewan Penguji")}
            </div>
            <p className="text-slate-500 mt-0.5">
              {isAiMode
                ? (isEn
                    ? "Identifies fabricated academic references (LLM hallucinations) in bibliographies before thesis examination."
                    : "Mengidentifikasi rujukan jurnal fiktif (halusinasi AI) pada daftar pustaka sebelum diuji oleh Dewan Penguji.")
                : (isEn
                    ? "Anticipates tough faculty questions based on vulnerable manuscript sections and matched citations."
                    : "Memprediksi pertanyaan kritis dosen penguji skripsi berdasarkan bab yang terdeteksi ada kemiripan teks.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
