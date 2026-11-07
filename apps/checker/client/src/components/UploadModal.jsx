import React, { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle, BookOpen, Layers, ShieldCheck } from "lucide-react";
import { SAMPLE_THESES } from "../data/samples.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function UploadModal({
  isOpen,
  onClose,
  onSelectSample,
  onUploadFile,
  onSubmitManualText,
  studentInfo,
  setStudentInfo,
  faculties,
  loading
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [activeTab, setActiveTab] = useState("file"); // "file" | "paste" | "samples"
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState("");

  if (!isOpen) return null;

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
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      onUploadFile(selectedFile);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      onSubmitManualText(pastedText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="bg-[#002266] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#FFCC00]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 border border-indigo-400 flex items-center justify-center font-black text-sm text-amber-300">
              VA
            </div>
            <div>
              <h3 className="font-extrabold text-base">
                {isEn ? "Upload & Test Academic Manuscript" : "Unggah & Uji Naskah Karya Ilmiah"}
              </h3>
              <p className="text-xs text-blue-200">Universal Academic Similarity & AI Writing Detector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white p-1 rounded-lg hover:bg-blue-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab("file")}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              activeTab === "file"
                ? "border-blue-600 text-blue-700 bg-white font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {isEn ? "Upload File (.DOCX / .PDF / .TXT)" : "Upload File (.DOCX / .PDF / .TXT)"}
          </button>
          <button
            onClick={() => setActiveTab("paste")}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              activeTab === "paste"
                ? "border-blue-600 text-blue-700 bg-white font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {isEn ? "Paste Manuscript Text" : "Tempel Teks Manual"}
          </button>
          <button
            onClick={() => setActiveTab("samples")}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              activeTab === "samples"
                ? "border-blue-600 text-blue-700 bg-white font-bold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            {isEn ? "Benchmark Sample Theses" : "Contoh Skripsi Demo"}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Student Metadata Form */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
            <span className="font-bold text-slate-800 block">
              {isEn ? "Author & Academic Faculty Details:" : "Identitas Mahasiswa & Fakultas:"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  {isEn ? "Author / Student Name" : "Nama Mahasiswa"}
                </label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  placeholder={isEn ? "Author Name" : "Nama Mahasiswa / Penulis"}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  {isEn ? "Student ID / NIM" : "NIM (Nomor Induk Mahasiswa)"}
                </label>
                <input
                  type="text"
                  value={studentInfo.nim}
                  onChange={(e) => setStudentInfo({ ...studentInfo, nim: e.target.value })}
                  placeholder={isEn ? "e.g. 2024010001" : "Contoh: 2024010001"}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  {isEn ? "Academic Faculty" : "Fakultas"}
                </label>
                <select
                  value={studentInfo.facultyId}
                  onChange={(e) => {
                    const f = faculties.find(fac => fac.id === e.target.value);
                    setStudentInfo({
                      ...studentInfo,
                      facultyId: e.target.value,
                      facultyName: f ? (isEn ? (f.nameEn || f.name) : f.name) : "",
                      studyProgram: f?.programs[0] || ""
                    });
                  }}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.id} - {isEn ? (f.nameEn || f.name) : f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  {isEn ? "Study Program / Major" : "Program Studi"}
                </label>
                <input
                  type="text"
                  value={studentInfo.studyProgram}
                  onChange={(e) => setStudentInfo({ ...studentInfo, studyProgram: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-600 font-medium block mb-1">
                  {isEn ? "Manuscript / Thesis Title" : "Judul Tugas Akhir / Skripsi"}
                </label>
                <input
                  type="text"
                  value={studentInfo.title}
                  onChange={(e) => setStudentInfo({ ...studentInfo, title: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* TAB 1: PRELOADED SAMPLES */}
          {activeTab === "samples" && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                {isEn
                  ? "Select Benchmark Academic Manuscript to Test System:"
                  : "Pilih Contoh Naskah Akademik untuk Menguji Sistem:"}
              </span>

              <div className="space-y-2.5">
                {SAMPLE_THESES.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition cursor-pointer flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{sample.label}</span>
                        <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {sample.facultyId}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-snug">{sample.title}</p>
                      <p className="text-slate-400 text-[11px] italic">{sample.description}</p>
                    </div>

                    <button
                      className="shrink-0 bg-[#003399] hover:bg-blue-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      {isEn ? "Select This Sample" : "Pilih Contoh Ini"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FILE UPLOAD */}
          {activeTab === "file" && (
            <div className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`p-8 border-2 border-dashed rounded-2xl text-center transition ${
                  dragActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
                }`}
              >
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-xs sm:text-sm">
                  {isEn ? "Drag & Drop Thesis File Here" : "Tarik & Lepas File Skripsi Anda ke Sini"}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {isEn
                    ? "Supported formats: .docx (Microsoft Word), .pdf, .txt (Max 25 MB)"
                    : "Format didukung: .docx (Microsoft Word), .pdf, .txt (Maks 25 MB)"}
                </p>

                <div className="mt-4">
                  <label className="bg-[#003399] hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer inline-flex items-center space-x-1.5 transition">
                    <span>{isEn ? "Select File from Device" : "Pilih Berkas dari Komputer"}</span>
                    <input
                      type="file"
                      accept=".docx,.pdf,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedFile && (
                  <div className="mt-4 inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{selectedFile.name}</span>
                    <span className="text-[10px] text-emerald-600">
                      ({Math.round(selectedFile.size / 1024)} KB)
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleUploadSubmit}
                disabled={!selectedFile || loading}
                className="w-full bg-[#003399] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition text-xs shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? (isEn ? "Extracting & Analyzing Manuscript..." : "Sedang Mengekstrak & Menguji Naskah...")
                  : (isEn ? "Start Similarity & AI Inspection" : "Mulai Pengujian Similarity & AI")}
              </button>
            </div>
          )}

          {/* TAB 3: PASTE TEXT */}
          {activeTab === "paste" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isEn
                    ? "Paste Manuscript Chapters / Full Text:"
                    : "Tempelkan Teks Bab Skripsi / Naskah Lengkap:"}
                </label>
                <textarea
                  rows={8}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={
                    isEn
                      ? "Paste thesis text here (Chapter I through Chapter V)..."
                      : "Tempel teks skripsi di sini (Bab I s/d Bab V)..."
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-academic text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              <button
                onClick={handlePasteSubmit}
                disabled={!pastedText.trim() || loading}
                className="w-full bg-[#003399] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition text-xs shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? (isEn ? "Analyzing..." : "Sedang Menganalisis...")
                  : (isEn ? "Start Similarity & AI Inspection" : "Mulai Pengujian Similarity & AI")}
              </button>
            </div>
          )}

          {/* Academic Similarity Settings Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {isEn
                  ? "Standard Similarity Procedure (No Repository):"
                  : "Standar Prosedur Pengujian Similarity (No Repository):"}
              </span>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                {isEn
                  ? "Inspection uses No-Repository mode automatically to safeguard your research from public indexing prior to official thesis defense."
                  : "Pengecekan menggunakan mode No Repository secara otomatis aktif untuk menjaga keamanan karya ilmiah Anda agar tidak terindeks publik sebelum yudisium resmi."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
