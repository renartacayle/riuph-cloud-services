import React, { useState } from "react";
import Header from "./components/Header.jsx";
import UploadSection from "./components/UploadSection.jsx";
import SimilarityViewer from "./components/SimilarityViewer.jsx";
import AiReportViewer from "./components/AiReportViewer.jsx";
import AcademicCompliance from "./components/AcademicCompliance.jsx";
import DefenseQuestions from "./components/DefenseQuestions.jsx";
import ParafraseHelper from "./components/ParafraseHelper.jsx";
import CertificateModal from "./components/CertificateModal.jsx";
import UploadModal from "./components/UploadModal.jsx";
import AdBanner from "./components/AdBanner.jsx";
import { useIsDesktop } from "./hooks/useIsDesktop.js";
import { SAMPLE_THESES } from "./data/samples.js";
import { useLanguage } from "./context/LanguageContext.jsx";

const UNIVERSAL_FACULTIES = [
  { id: "FIK", name: "Ilmu Komputer & Informatika", nameEn: "Computer Science & Informatics", maxSimilarity: 20, maxAiAllowed: 20, specialNotes: "Sidang mewajibkan demonstrasi sistem fungsional, review clean code di IDE, dan pengujian keaslian logika algoritma.", programs: ["Teknik Informatika - S1", "Sistem Informasi - S1", "Rekayasa Perangkat Lunak - S1", "Sains Data & AI - S1", "DKV - S1"] },
  { id: "FEB", name: "Ekonomi, Bisnis & Manajemen", nameEn: "Economics, Business & Management", maxSimilarity: 20, maxAiAllowed: 20, specialNotes: "Fokus sidang pada keabsahan data sekunder/primer, ketepatan uji asumsi klasik, dan analisis manajerial.", programs: ["Manajemen - S1", "Akuntansi - S1", "Bisnis Digital - S1", "Ekonomi Pembangunan - S1"] },
  { id: "FKES", name: "Kesehatan, Farmasi & Kedokteran", nameEn: "Health Sciences, Pharmacy & Medicine", maxSimilarity: 20, maxAiAllowed: 15, specialNotes: "Wajib ethical clearance resmi, izin penelitian fasilitas kesehatan, dan validitas-reliabilitas instrumen.", programs: ["Kesehatan Masyarakat - S1", "Farmasi - S1", "Ilmu Keperawatan - S1", "Pendidikan Dokter - S1"] },
  { id: "FT", name: "Teknik & Rekayasa Industri", nameEn: "Engineering & Industrial Technology", maxSimilarity: 25, maxAiAllowed: 20, specialNotes: "Wajib demonstrasi alat/hardware, validasi pembacaan sensor, diagram teknis, dan analisis galat.", programs: ["Teknik Elektro - S1", "Teknik Mesin - S1", "Teknik Industri - S1", "Teknik Sipil - S1"] },
  { id: "FIB", name: "Sosial, Humaniora & Bahasa", nameEn: "Humanities, Social Sciences & Languages", maxSimilarity: 20, maxAiAllowed: 15, specialNotes: "Pemeriksaan ketat pada orisinalitas analisis wacana kualitatif dan larangan translasi AI tanpa kurasi.", programs: ["Sastra Inggris - S1", "Ilmu Komunikasi - S1", "Hubungan Internasional - S1", "Psikologi - S1"] },
  { id: "MIPA", name: "Sains & Matematika", nameEn: "Natural Sciences & Mathematics", maxSimilarity: 20, maxAiAllowed: 15, specialNotes: "Evaluasi ketat pada pembuktian teorema, ketepatan rumus matematis, dan protokol eksperimental laboratorium.", programs: ["Matematika - S1", "Fisika - S1", "Kimia - S1", "Biologi - S1", "Statistika - S1"] },
  { id: "HUKUM", name: "Ilmu Hukum & Kebijakan", nameEn: "Law & Public Policy", maxSimilarity: 20, maxAiAllowed: 15, specialNotes: "Evaluasi fokus pada presisi doktrin yurisprudensi dan orisinalitas konstruksi argumen hukum.", programs: ["Ilmu Hukum - S1", "Hukum Bisnis - S1", "Kenotariatan - S2"] },
  { id: "PASCA", name: "Program Pascasarjana (S2 & S3)", nameEn: "Postgraduate Programs (Master & PhD)", maxSimilarity: 15, maxAiAllowed: 10, specialNotes: "Standar integritas riset tinggi: kebaruan (novelty) wajib terbukti dan bebas kemiripan antar-bab (< 15%).", programs: ["Magister Sains/Terapan - S2", "Program Doktoral - S3"] }
];

export default function App() {
  const isDesktop = useIsDesktop(1280);
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("academic similarity");
  const [faculties, setFaculties] = useState(UNIVERSAL_FACULTIES);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Universal Threshold Configuration State
  const [customThresholds, setCustomThresholds] = useState({
    maxSimilarity: 20,
    maxAiAllowed: 20,
    preset: "S1"
  });

  // Student & Document State - Defaults to clean universal user upload
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    nim: "",
    universityName: "Perguruan Tinggi / Universitas",
    facultyId: "FIK",
    facultyName: "Ilmu Komputer & Informatika",
    studyProgram: "Teknik Informatika - S1",
    title: "",
    supervisor: "Dosen Pembimbing Akademik"
  });

  const [fullText, setFullText] = useState("");
  const [options, setOptions] = useState({
    excludeQuotes: true,
    excludeBibliography: true,
    excludeSmallMatchesWords: 4,
    noRepository: true
  });

  // Analysis Results State
  const [plagiarismResult, setPlagiarismResult] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [compliance, setCompliance] = useState(null);
  const [defenseQuestions, setDefenseQuestions] = useState([]);

  const runAnalysis = async (textToAnalyze, facultyId, currentOptions) => {
    if (!textToAnalyze || textToAnalyze.trim().length === 0) return;
    setLoading(true);
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToAnalyze,
          facultyId,
          customUniversity: studentInfo.universityName,
          customSimilarityMax: customThresholds.maxSimilarity,
          customAiMax: customThresholds.maxAiAllowed,
          lang,
          options: { ...currentOptions, lang }
        })
      });

      if (!response.ok) {
        throw new Error(lang === "en" ? "Failed to analyze document" : "Gagal melakukan analisis dokumen");
      }

      const data = await response.json();
      setPlagiarismResult(data.plagiarism);
      setAiResult(data.ai);
      setCompliance(data.compliance);
      setDefenseQuestions(data.defenseQuestions);
      setActiveTab("academic similarity");
    } catch (err) {
      console.error("Analysis failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample) => {
    if (!sample) return;
    setStudentInfo({
      name: sample.studentName,
      nim: sample.studentNim,
      universityName: studentInfo.universityName || (lang === "en" ? "National University of Technology" : "Institut Teknologi & Sains Nasional"),
      facultyId: sample.facultyId,
      facultyName: sample.facultyName,
      studyProgram: sample.studyProgram,
      title: sample.title,
      supervisor: "Dr. Supriyanto, M.Kom."
    });
    setFullText(sample.text);
    setIsUploadOpen(false);
    runAnalysis(sample.text, sample.facultyId, options);
    if (sample.id === "sample-ai" || activeTab === "ai") {
      setActiveTab("ai");
    } else {
      setActiveTab("academic similarity");
    }
  };

  const handleUploadFile = async (file) => {
    setLoading(true);
    setIsUploadOpen(false);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("facultyId", studentInfo.facultyId);
    formData.append("customUniversity", studentInfo.universityName);
    formData.append("customSimilarityMax", String(customThresholds.maxSimilarity));
    formData.append("customAiMax", String(customThresholds.maxAiAllowed));
    formData.append("excludeQuotes", String(options.excludeQuotes));
    formData.append("excludeBibliography", String(options.excludeBibliography));
    formData.append("noRepository", String(options.noRepository));
    formData.append("lang", lang);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.extractedText) {
        setFullText(data.extractedText);
        setPlagiarismResult(data.plagiarism);
        setAiResult(data.ai);
        setCompliance(data.compliance);
        setDefenseQuestions(data.defenseQuestions);
        // Automatically infer title if not set
        if (!studentInfo.title) {
          const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_\-]+/g, " ");
          setStudentInfo((prev) => ({ ...prev, title: cleanTitle }));
        }
        // If testing in AI Writing mode, stay on AI Writing tab
        setActiveTab((prev) => (prev === "ai" ? "ai" : "academic similarity"));
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitManualText = (text) => {
    setFullText(text);
    setIsUploadOpen(false);
    runAnalysis(text, studentInfo.facultyId, options);
    setActiveTab((prev) => (prev === "ai" ? "ai" : "academic similarity"));
  };

  const handleApplyFilters = () => {
    if (fullText) {
      runAnalysis(fullText, studentInfo.facultyId, options);
    }
  };

  const handleResetToUpload = () => {
    setPlagiarismResult(null);
    setAiResult(null);
    setCompliance(null);
    setDefenseQuestions([]);
    setFullText("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentInfo={studentInfo}
        setStudentInfo={(info) => {
          setStudentInfo(info);
          if (fullText) runAnalysis(fullText, info.facultyId, options);
        }}
        faculties={faculties}
        onOpenUpload={() => setIsUploadOpen(true)}
        similarityScore={plagiarismResult?.overallSimilarity || 0}
        aiScore={aiResult?.aiPercentage || 0}
        onRunCheck={() => {
          if (fullText) runAnalysis(fullText, studentInfo.facultyId, options);
        }}
        loading={loading}
        hasResult={!!plagiarismResult}
        onResetToUpload={handleResetToUpload}
        customThresholds={customThresholds}
      />

      {/* Responsive 3-Column Layout: Left/Right ads on Desktop, Top/Bottom ads on Mobile */}
      <div className="flex-1 w-full max-w-[1536px] mx-auto px-2.5 sm:px-4 lg:px-6 py-3 sm:py-6 flex justify-center items-start gap-4 2xl:gap-8">
        {/* Left Skyscraper (Desktop Only: hidden on mobile) */}
        {isDesktop && (
          <aside className="hidden xl:flex flex-col items-center w-[160px] shrink-0 sticky top-6 self-start">
            <AdBanner position="left" slotKey="LEFT_SKYSCRAPER" />
          </aside>
        )}

        {/* Center Main App Container */}
        <main className="flex-1 max-w-5xl min-w-0 space-y-6">
          {/* Mobile Top Ad (Mobile Only: hidden on desktop) */}
          {!isDesktop && (
            <div className="xl:hidden w-full">
              <AdBanner position="top" slotKey="TOP_LEADERBOARD" />
            </div>
          )}

          {loading && (
            <div className="mb-6 bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl flex items-center space-x-3 text-xs sm:text-sm animate-pulse shadow-xs">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 animate-ping shrink-0"></span>
              <span className="font-semibold">
                {lang === "en"
                  ? "Extracting DOCX/PDF text and processing Academic Similarity multi-gram similarity and AI detection algorithms..."
                  : "Sedang mengekstrak naskah DOCX/PDF dan memproses algoritma pemindaian kemiripan naskah serta deteksi teks buatan AI..."}
              </span>
            </div>
          )}

          {/* TAB CONTENT ROUTING */}
          {(!plagiarismResult && (activeTab === "academic similarity" || activeTab === "ai")) ? (
            /* Upload Screen for Academic Similarity & AI tabs when no document is analyzed yet */
            <UploadSection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onUploadFile={handleUploadFile}
              onSubmitManualText={handleSubmitManualText}
              onSelectSample={(idx) => handleSelectSample(SAMPLE_THESES[idx ?? (activeTab === "ai" ? 1 : 0)])}
              faculties={faculties}
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              options={options}
              setOptions={setOptions}
              loading={loading}
            />
          ) : (
            <>
              {/* Analyzed Document Banner with quick action to switch / reset */}
              {plagiarismResult && (
                <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-800 font-extrabold flex items-center justify-center shrink-0">
                      DOC
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800 text-sm">
                        {studentInfo.title || (lang === "en" ? "Academic Research Manuscript" : "Naskah Karya Ilmiah Mahasiswa")}
                      </h2>
                      <p className="text-slate-500">
                        {studentInfo.name ? `${studentInfo.name} • ` : ""}
                        {studentInfo.facultyName} • {fullText.split(/\s+/).filter(Boolean).length} {lang === "en" ? "Words" : "Kata"} • {fullText.length} {lang === "en" ? "Characters" : "Karakter"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetToUpload}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer transition flex items-center gap-1.5"
                    >
                      <span>← {lang === "en" ? "Upload Another Document" : "Unggah Dokumen Lain"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUploadOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{lang === "en" ? "Change File / Options" : "Ganti File / Opsi"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 1: Academic Similarity View */}
              {activeTab === "academic similarity" && plagiarismResult && (
                <SimilarityViewer
                  fullText={fullText}
                  plagiarismResult={plagiarismResult}
                  options={options}
                  setOptions={setOptions}
                  onApplyFilters={handleApplyFilters}
                  loading={loading}
                  studentInfo={studentInfo}
                />
              )}

              {/* Tab 2: AI Writing Integrity View */}
              {activeTab === "ai" && plagiarismResult && (
                <AiReportViewer
                  fullText={fullText}
                  aiResult={aiResult}
                  onOpenUpload={() => setIsUploadOpen(true)}
                  loading={loading}
                />
              )}

              {/* Tab 3: Universal Academic Compliance View */}
              {activeTab === "compliance" && (
                <AcademicCompliance
                  compliance={compliance}
                  chapters={plagiarismResult?.chapters || []}
                  similarityScore={plagiarismResult?.overallSimilarity || 0}
                  aiScore={aiResult?.aiPercentage || 0}
                  studentInfo={studentInfo}
                  setStudentInfo={(info) => {
                    setStudentInfo(info);
                    if (fullText) runAnalysis(fullText, info.facultyId, options);
                  }}
                  faculties={faculties}
                  customThresholds={customThresholds}
                  setCustomThresholds={(thresholds) => {
                    setCustomThresholds(thresholds);
                    if (fullText) runAnalysis(fullText, studentInfo.facultyId, options);
                  }}
                  hasResult={!!plagiarismResult}
                  onTrySample={() => handleSelectSample(SAMPLE_THESES[0])}
                  onOpenUpload={() => setIsUploadOpen(true)}
                />
              )}

              {/* Tab 4: Dewan Penguji Defense Questions Simulator */}
              {activeTab === "defense" && (
                <DefenseQuestions
                  questions={defenseQuestions}
                  facultyId={studentInfo.facultyId}
                  hasResult={!!plagiarismResult}
                  onTrySample={() => handleSelectSample(SAMPLE_THESES[0])}
                  onOpenUpload={() => setIsUploadOpen(true)}
                />
              )}

              {/* Tab 5: Intelligent Paraphrase Assistant 4S */}
              {activeTab === "paraphrase" && (
                <ParafraseHelper
                  fullText={fullText}
                  studentInfo={studentInfo}
                  hasResult={!!plagiarismResult}
                  onTrySample={() => handleSelectSample(SAMPLE_THESES[0])}
                  onOpenUpload={() => setIsUploadOpen(true)}
                  onApplyToMainDoc={(cleanText) => {
                    setFullText(cleanText);
                    runAnalysis(cleanText, studentInfo.facultyId, options);
                    setActiveTab("academic similarity");
                  }}
                />
              )}

              {/* Tab 6: Official Certificate Preview (Dinonaktifkan sementara per permintaan) */}
              {/* activeTab === "certificate" && (
                <CertificateModal
                  studentInfo={studentInfo}
                  similarityScore={plagiarismResult?.overallSimilarity || 0}
                  aiScore={aiResult?.aiPercentage || 0}
                  chapters={plagiarismResult?.chapters || []}
                  customThresholds={customThresholds}
                  hasResult={!!plagiarismResult}
                  onTrySample={() => handleSelectSample(SAMPLE_THESES[0])}
                  onOpenUpload={() => setIsUploadOpen(true)}
                />
              ) */}
            </>
          )}

          {/* Mobile Bottom Banner (Mobile Only: hidden on desktop) */}
          {!isDesktop && (
            <div className="xl:hidden w-full mt-8">
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

      {/* Upload & Sample Selector Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSelectSample={handleSelectSample}
        onUploadFile={handleUploadFile}
        onSubmitManualText={handleSubmitManualText}
        studentInfo={studentInfo}
        setStudentInfo={setStudentInfo}
        faculties={faculties}
        loading={loading}
      />

      {/* RIUPH Ecosystem Footer */}
      <footer className="no-print bg-slate-950 text-slate-400 py-6 border-t border-slate-800 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold flex items-center gap-1.5">
                <span className="font-mono text-cyan-300 tracking-wider">RIUPH CHECKER</span>
                <span className="text-[10px] font-mono text-slate-400 font-normal">| Academic Integrity Engine</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Pusat Pengujian Plagiarisme Mandiri (Academic Similarity) & Deteksi AI Karya Ilmiah Universal
              </p>
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            <p>© 2026 RIUPH Holding — Central Technology Command. All rights reserved.</p>
            <p className="text-slate-500 flex items-center justify-end gap-2 mt-0.5">
              <span>Universal Higher Education Edition</span>
              <span>•</span>
              <a href="/privacy.html" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white underline">
                Kebijakan Privasi
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
