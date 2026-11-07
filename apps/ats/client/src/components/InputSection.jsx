import React, { useState } from "react";
import { UploadCloud, FileText, Briefcase, Zap, CheckCircle2, AlertCircle, FileType, X, Check } from "lucide-react";
import { PRESET_JOBS, SAMPLE_CVS } from "../data/sampleJobDescriptions.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function InputSection({ onScanText, onScanFile, isLoading }) {
  const { lang, t } = useLanguage();
  const [inputMode, setInputMode] = useState("file"); // 'file' or 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cvText, setCvText] = useState("");
  const [selectedJobPreset, setSelectedJobPreset] = useState("senior_software_engineer");
  const [customJdText, setCustomJdText] = useState("");
  const [useCustomJd, setUseCustomJd] = useState(false);


  // Active Job Description
  const activeJdText = useCustomJd 
    ? customJdText 
    : (PRESET_JOBS.find(j => j.id === selectedJobPreset)?.text || "");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (["pdf", "docx", "txt"].includes(ext)) {
        setSelectedFile(file);
      } else {
        alert("Mohon pilih file berekstensi .pdf atau .docx (atau .txt)");
      }
    }
  };

  const handleLoadSampleCv = (sample) => {
    setInputMode("text");
    setCvText(sample.text);
    if (sample.targetJobId) {
      setSelectedJobPreset(sample.targetJobId);
      setUseCustomJd(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMode === "file") {
      if (!selectedFile) return;
      onScanFile(selectedFile, activeJdText);
    } else {
      if (!cvText.trim()) return;
      onScanText(cvText, activeJdText);
    }
  };

  const getFileBadge = () => {
    if (!selectedFile) return null;
    const ext = (selectedFile.name.split(".").pop() || "").toLowerCase();
    const sizeKb = (selectedFile.size / 1024).toFixed(1);

    if (ext === "pdf") {
      return {
        type: "PDF Document",
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        badgeBg: "bg-rose-600 text-white",
        size: `${sizeKb} KB`
      };
    }
    if (ext === "docx") {
      return {
        type: "Word (.docx)",
        bg: "bg-blue-50 border-blue-200 text-blue-800",
        badgeBg: "bg-blue-600 text-white",
        size: `${sizeKb} KB`
      };
    }
    return {
      type: "Text (.txt)",
      bg: "bg-slate-100 border-slate-300 text-slate-800",
      badgeBg: "bg-slate-600 text-white",
      size: `${sizeKb} KB`
    };
  };

  const fileInfo = getFileBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
      {/* Jaminan Privasi Data 100% Tidak Disimpan */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900 shadow-xs mb-6">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-emerald-950 flex items-center gap-2">
            <span>{lang === "en" ? "🔒 100% Privacy & Zero-Retention Policy" : "🔒 Jaminan Privasi: Data & Berkas CV Tidak Disimpan Sama Sekali"}</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            {lang === "en"
              ? "All CV documents, contact details, and career histories are processed purely in-memory in your local session. We DO NOT save, record, collect, or share your resume with any third-party database or recruiters."
              : "Seluruh berkas CV, data kontak, dan riwayat pekerjaan Anda diproses murni secara sementara di memori sesi browser. Kami SAMA SEKALI TIDAK MENYIMPAN, tidak merekam, tidak mengumpulkan, dan tidak membagikan dokumen Anda ke basis data manapun."}
          </p>
        </div>
      </div>

      {/* Sample Quick-Load Bar */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Zap className="w-4 h-4 text-amber-500" />
            {lang === "en" ? "Quick Sample CVs (1-Click):" : "Coba Contoh CV Praktis (1-Klik):"}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_CVS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSampleCv(sample)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition shadow-xs"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: CV Input */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                {lang === "en" ? "1. Candidate Resume / CV Document" : "1. Dokumen CV / Resume Kandidat"}
              </label>

              {/* Tabs: File vs Paste */}
              <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode("file")}
                  className={`px-3 py-1 font-medium rounded-md transition ${
                    inputMode === "file" 
                      ? "bg-white text-blue-600 shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t("modeUpload")}
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={`px-3 py-1 font-medium rounded-md transition ${
                    inputMode === "text" 
                      ? "bg-white text-blue-600 shadow-xs" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t("modePaste")}
                </button>
              </div>
            </div>

            {inputMode === "file" ? (
              <div className="space-y-3">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition ${
                    isDragging
                      ? "border-blue-600 bg-blue-50/60 scale-[1.01]"
                      : selectedFile
                      ? "border-emerald-400 bg-emerald-50/20"
                      : "border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs transition ${
                      selectedFile ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <div className="text-sm font-semibold text-slate-800">
                      {isDragging ? (
                        <span className="text-blue-600 font-bold">{lang === "en" ? "Drop PDF or DOCX file here..." : "Lepaskan file PDF atau DOCX ke sini..."}</span>
                      ) : selectedFile ? (
                        <span className="text-slate-900 font-bold">{selectedFile.name}</span>
                      ) : (
                        lang === "en" ? "Click to select or drag PDF / DOCX file here" : "Klik untuk memilih atau seret file PDF / DOCX ke sini"
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                        PDF
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                        DOCX (Word)
                      </span>
                      <span>{lang === "en" ? "Maximum 25 MB" : "Maksimal 25 MB"}</span>
                    </div>
                  </div>
                </div>

                {/* Selected File Card Details */}
                {selectedFile && fileInfo && (
                  <div className={`flex items-center justify-between p-3.5 rounded-xl border ${fileInfo.bg} shadow-2xs transition`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded shadow-2xs ${fileInfo.badgeBg}`}>
                        {fileInfo.type}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                          {selectedFile.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span>{lang === "en" ? `Size: ${fileInfo.size}` : `Ukuran: ${fileInfo.size}`}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> {lang === "en" ? "File ready for ATS machine audit" : "File siap diaudit oleh mesin ATS"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      title={lang === "en" ? "Remove file" : "Hapus file"}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-white/80 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <textarea
                  rows={11}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder={t("cvTextPlaceholder")}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white leading-relaxed"
                />
                <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                  <span>{lang === "en" ? `Text length: ${cvText.split(/\s+/).filter(Boolean).length} words` : `Panjang teks: ${cvText.split(/\s+/).filter(Boolean).length} kata`}</span>
                  {cvText.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCvText("")}
                      className="text-red-500 hover:underline"
                    >
                      {lang === "en" ? "Clear Text" : "Hapus Teks"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Job Description Target */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                {lang === "en" ? "2. Target Job Description" : "2. Target Lowongan (Job Description)"}
              </label>

              <button
                type="button"
                onClick={() => setUseCustomJd(!useCustomJd)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {useCustomJd ? (lang === "en" ? "Use Preset" : "Gunakan Preset") : (lang === "en" ? "+ Custom JD" : "+ Custom JD")}
              </button>
            </div>

            {!useCustomJd ? (
              <div className="space-y-3">
                <select
                  value={selectedJobPreset}
                  onChange={(e) => setSelectedJobPreset(e.target.value)}
                  className="w-full text-sm font-medium p-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                >
                  {PRESET_JOBS.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} ({job.department})
                    </option>
                  ))}
                </select>

                <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-600 max-h-[220px] overflow-y-auto leading-relaxed">
                  <div className="font-semibold text-indigo-950 mb-1">
                    {lang === "en" ? "Job Qualification Summary:" : "Ringkasan Kualifikasi Lowongan:"}
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700">
                    {activeJdText}
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  rows={9}
                  value={customJdText}
                  onChange={(e) => setCustomJdText(e.target.value)}
                  placeholder={t("jdPlaceholder")}
                  className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white leading-relaxed"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === "en" ? "System will extract mandatory keywords, preferred skills, and minimum experience thresholds." : "Sistem akan mengekstrak kata kunci wajib, preferensi, dan batas minimal pengalaman."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {lang === "en" ? "Supports PDF & Word (DOCX) files with automatic layout and section extraction." : "Mendukung file dokumen PDF & Word (DOCX) dengan ekstraksi struktur tata letak otomatis."}
          </div>

          <button
            type="submit"
            disabled={isLoading || (inputMode === "file" ? !selectedFile : !cvText.trim())}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition flex items-center justify-center gap-2 ${
              isLoading || (inputMode === "file" ? !selectedFile : !cvText.trim())
                ? "bg-slate-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 active:scale-98"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                {t("scanningButton")}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                {t("scanButton")}
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100 text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {lang === "en" ? "Zero Data Retention: Documents and resumes are NOT saved anywhere" : "Zero-Data Retention: Dokumen CV Anda sama sekali TIDAK DISIMPAN di database atau server"}
          </span>
        </div>
      </form>
    </div>
  );
}

