import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, BookOpen, Layers, Sliders, FileSpreadsheet, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AcademicCompliance({
  compliance,
  chapters = [],
  similarityScore = 0,
  aiScore = 0,
  studentInfo = {},
  setStudentInfo,
  faculties = [],
  customThresholds,
  setCustomThresholds,
  hasResult = false,
  onTrySample,
  onOpenUpload
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const currentFaculty = compliance?.faculty || faculties[0] || {
    id: "FIK",
    name: "Ilmu Komputer & Informatika",
    nameEn: "Computer Science & Informatics",
    maxSimilarity: 20,
    maxAiAllowed: 20,
    specialNotes: "Sidang mewajibkan demonstrasi sistem fungsional dan pengujian orisinalitas algoritma."
  };

  const universityName = studentInfo.universityName || (isEn ? "Higher Education / University" : "Perguruan Tinggi / Universitas");
  const maxSimilarityAllowed = customThresholds?.maxSimilarity ?? currentFaculty.maxSimilarity;
  const maxAiAllowed = customThresholds?.maxAiAllowed ?? currentFaculty.maxAiAllowed;

  // Representative scores in preview mode
  const effectiveSimilarity = hasResult ? similarityScore : 14;
  const effectiveAi = hasResult ? aiScore : 6;

  const sampleChapters = [
    { title: isEn ? "CHAPTER I INTRODUCTION" : "BAB I PENDAHULUAN", totalWords: 820, matchedWords: 115, similarity: 14 },
    { title: isEn ? "CHAPTER II LITERATURE REVIEW" : "BAB II TINJAUAN PUSTAKA", totalWords: 1450, matchedWords: 261, similarity: 18 },
    { title: isEn ? "CHAPTER III RESEARCH METHODOLOGY" : "BAB III METODOLOGI PENELITIAN", totalWords: 960, matchedWords: 105, similarity: 11 },
    { title: isEn ? "CHAPTER IV RESULTS AND DISCUSSION" : "BAB IV HASIL DAN PEMBAHASAN", totalWords: 1820, matchedWords: 163, similarity: 9 },
    { title: isEn ? "CHAPTER V CONCLUSION AND SUGGESTIONS" : "BAB V KESIMPULAN DAN SARAN", totalWords: 420, matchedWords: 21, similarity: 5 },
  ];
  const displayChapters = (chapters && chapters.length > 0) ? chapters : sampleChapters;

  const handlePresetSelect = (presetType) => {
    if (!setCustomThresholds) return;
    if (presetType === "S1") {
      setCustomThresholds({ maxSimilarity: 20, maxAiAllowed: 20, preset: "S1" });
    } else if (presetType === "S2_S3") {
      setCustomThresholds({ maxSimilarity: 15, maxAiAllowed: 10, preset: "S2_S3" });
    } else if (presetType === "JOURNAL") {
      setCustomThresholds({ maxSimilarity: 10, maxAiAllowed: 5, preset: "JOURNAL" });
    } else if (presetType === "FLEXIBLE") {
      setCustomThresholds({ maxSimilarity: 25, maxAiAllowed: 25, preset: "FLEXIBLE" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Notice if viewing in preview mode */}
      {!hasResult && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">
                {isEn ? "Academic Threshold Preview Mode" : "Mode Pratinjau Ambang Batas Akademik"}
              </p>
              <p className="text-amber-800 mt-0.5">
                {isEn
                  ? "Showing simulation of institutional tolerance thresholds and chapter evaluations. Upload your research manuscript or try a sample to view real document evaluation."
                  : "Menampilkan simulasi konfigurasi batas toleransi dan evaluasi bab. Unggah naskah skripsi Anda atau gunakan contoh naskah untuk melihat hasil evaluasi riil dokumen."}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onTrySample && (
              <button
                type="button"
                onClick={onTrySample}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
              >
                {isEn ? "⚡ Try Sample Paper" : "⚡ Coba Contoh Naskah"}
              </button>
            )}
            {onOpenUpload && (
              <button
                type="button"
                onClick={onOpenUpload}
                className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {isEn ? "Upload Document File" : "Unggah File Dokumen"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Banner: Academic Compliance & Universal Threshold Status */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>
                {isEn ? `ACADEMIC INTEGRITY STANDARD: ${universityName}` : `STANDAR INTEGRITAS AKADEMIK: ${universityName}`}
              </span>
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg sm:text-xl">
              {isEn
                ? `Manuscript Eligibility Status: ${currentFaculty.nameEn || currentFaculty.name}`
                : `Status Kelayakan Naskah: ${currentFaculty.name}`}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">
              {isEn ? "Academic Discipline:" : "Bidang Ilmu:"}
            </span>
            <select
              value={studentInfo.facultyId}
              onChange={(e) => {
                const selected = faculties.find(f => f.id === e.target.value);
                setStudentInfo({
                  ...studentInfo,
                  facultyId: e.target.value,
                  facultyName: selected ? (isEn ? (selected.nameEn || selected.name) : selected.name) : studentInfo.facultyName,
                  studyProgram: selected && selected.programs ? selected.programs[0] : studentInfo.studyProgram
                });
              }}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {isEn ? (f.nameEn || f.name) : f.name} ({isEn ? "Ref:" : "Acuan:"} {f.maxSimilarity}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset & Custom Threshold Controls */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-xs text-slate-700 uppercase tracking-wide">
                {isEn ? "Institutional / Publication Presets:" : "Preset Ambang Batas Kampus / Publikasi:"}
              </span>
            </div>
            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handlePresetSelect("S1")}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-center ${
                  customThresholds?.preset === "S1"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {isEn ? "Bachelor S1 (≤20%)" : "Sarjana S1 (≤20%)"}
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect("S2_S3")}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-center ${
                  customThresholds?.preset === "S2_S3"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {isEn ? "Master/PhD (≤15%)" : "S2/S3 (≤15%)"}
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect("JOURNAL")}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-center ${
                  customThresholds?.preset === "JOURNAL"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {isEn ? "Journal (≤10%)" : "Jurnal (≤10%)"}
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect("FLEXIBLE")}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-center ${
                  customThresholds?.preset === "FLEXIBLE"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {isEn ? "Flexible (≤25%)" : "Fleksibel (≤25%)"}
              </button>
            </div>
          </div>

          {/* Interactive Sliders for Custom Tuning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">
                  {isEn ? "Academic Similarity Limit:" : "Toleransi Similarity Kampus:"}
                </span>
                <span className="font-bold text-indigo-700">{maxSimilarityAllowed}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={maxSimilarityAllowed}
                onChange={(e) => {
                  if (setCustomThresholds) {
                    setCustomThresholds({
                      ...customThresholds,
                      maxSimilarity: Number(e.target.value),
                      preset: "CUSTOM"
                    });
                  }
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">
                  {isEn ? "AI Writing Detection Limit:" : "Toleransi Deteksi AI Writing:"}
                </span>
                <span className="font-bold text-cyan-700">{maxAiAllowed}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={maxAiAllowed}
                onChange={(e) => {
                  if (setCustomThresholds) {
                    setCustomThresholds({
                      ...customThresholds,
                      maxAiAllowed: Number(e.target.value),
                      preset: "CUSTOM"
                    });
                  }
                }}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Status Verdict Alerts */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border flex items-start space-x-3 ${
              effectiveSimilarity <= maxSimilarityAllowed
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : effectiveSimilarity <= maxSimilarityAllowed + 5
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {effectiveSimilarity <= maxSimilarityAllowed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : effectiveSimilarity <= maxSimilarityAllowed + 5 ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm">
                  {isEn ? "Plagiarism Threshold:" : "Ambang Batas Plagiarisme:"}
                </span>
                <span className="font-black text-base">{effectiveSimilarity}%</span>
                <span className="text-xs opacity-75">
                  ({isEn ? "Limit: Max" : "Batas: Maks"} {maxSimilarityAllowed}%)
                </span>
              </div>
              <p className="text-xs mt-1 leading-snug">
                {effectiveSimilarity <= maxSimilarityAllowed
                  ? (isEn
                      ? `Meets originality threshold (${effectiveSimilarity}% ≤ ${maxSimilarityAllowed}%).`
                      : `Memenuhi syarat ambang batas orisinalitas (${effectiveSimilarity}% ≤ ${maxSimilarityAllowed}%).`)
                  : effectiveSimilarity <= maxSimilarityAllowed + 5
                  ? (isEn
                      ? `Borderline tolerance (${effectiveSimilarity}%). Paraphrasing selected paragraphs recommended.`
                      : `Berada di ambang batas toleransi (${effectiveSimilarity}%). Disarankan parafrase beberapa paragraf.`)
                  : (isEn
                      ? `Exceeds maximum tolerance (${effectiveSimilarity}% > ${maxSimilarityAllowed}%). Revision required before defense!`
                      : `Melebihi batas toleransi (${effectiveSimilarity}% > ${maxSimilarityAllowed}%). Wajib revisi sebelum diajukan ke penguji!`)}
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-start space-x-3 ${
              effectiveAi <= maxAiAllowed
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : effectiveAi <= maxAiAllowed + 10
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-purple-50 border-purple-200 text-purple-900"
            }`}
          >
            {effectiveAi <= maxAiAllowed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm">
                  {isEn ? "AI Content Tolerance:" : "Toleransi Konten AI:"}
                </span>
                <span className="font-black text-base">{effectiveAi}%</span>
                <span className="text-xs opacity-75">
                  ({isEn ? "Limit: Max" : "Batas: Maks"} {maxAiAllowed}%)
                </span>
              </div>
              <p className="text-xs mt-1 leading-snug">
                {effectiveAi <= maxAiAllowed
                  ? (isEn
                      ? `Natural human writing pattern (${effectiveAi}% AI). Inspection passed.`
                      : `Pola bahasa naskah natural manusia (${effectiveAi}% AI). Lolos deteksi.`)
                  : (isEn
                      ? `Synthetic AI phrases detected (${effectiveAi}%). Recommended rephrasing repetitive markers.`
                      : `Terindikasi frasa generatif AI (${effectiveAi}%). Disarankan menyusun ulang frasa klise dengan gaya bahasa mandiri.`)}
              </p>
            </div>
          </div>
        </div>

        {/* Discipline Notes */}
        {currentFaculty.specialNotes && (
          <div className="mt-4 p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs flex items-start space-x-2.5">
            <BookOpen className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-900">
                {isEn
                  ? `Special Guidelines for ${currentFaculty.nameEn || currentFaculty.name}:`
                  : `Catatan Khusus Bidang ${currentFaculty.name}:`}
              </span>
              <p className="text-indigo-800 mt-0.5 leading-relaxed">{currentFaculty.specialNotes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Chapter-by-Chapter Plagiarism Breakdown Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h4 className="font-extrabold text-slate-800 text-base flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>
                {isEn ? "Chapter-by-Chapter Similarity Breakdown" : "Rincian Similarity Per-Bab Dokumen"}
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              {isEn
                ? `Evaluation of originality consistency across manuscript chapters against tolerance threshold (${maxSimilarityAllowed}%).`
                : `Evaluasi konsistensi orisinalitas di setiap bagian naskah terhadap batas toleransi (${maxSimilarityAllowed}%).`}
            </p>
          </div>
          <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
            {isEn ? `Target: ≤ ${maxSimilarityAllowed}% Per Chapter` : `Target: ≤ ${maxSimilarityAllowed}% Tiap Bab`}
          </span>
        </div>

        {/* Mobile View: Clean Chapter Cards */}
        <div className="md:hidden space-y-2.5">
          {displayChapters.map((chap, idx) => {
            const isChapPass = chap.similarity <= maxSimilarityAllowed;
            const isChapWarning = chap.similarity > maxSimilarityAllowed && chap.similarity <= maxSimilarityAllowed + 5;

            return (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-800 text-xs">{chap.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isChapPass
                      ? "bg-emerald-100 text-emerald-800"
                      : isChapWarning
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {chap.similarity}% • {isChapPass ? (isEn ? "PASS" : "LOLOS") : isChapWarning ? (isEn ? "BORDER" : "AMBANG") : (isEn ? "REVISE" : "REVISI")}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      isChapPass ? "bg-emerald-500" : isChapWarning ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(100, chap.similarity)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-0.5">
                  <span>Total: {chap.totalWords} {isEn ? "words" : "kata"}</span>
                  <span>{isEn ? "Matched:" : "Cocok:"} {chap.matchedWords} {isEn ? "words" : "kata"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Full Data Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{isEn ? "Chapter / Section" : "Bab / Bagian Naskah"}</th>
                <th className="py-3 px-4">{isEn ? "Total Words" : "Total Kata"}</th>
                <th className="py-3 px-4">{isEn ? "Matched Words" : "Kata Cocok"}</th>
                <th className="py-3 px-4">Similarity (%)</th>
                <th className="py-3 px-4">{isEn ? "Eligibility Status" : "Status Kelayakan"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayChapters.map((chap, idx) => {
                const isChapPass = chap.similarity <= maxSimilarityAllowed;
                const isChapWarning = chap.similarity > maxSimilarityAllowed && chap.similarity <= maxSimilarityAllowed + 5;

                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {chap.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {chap.totalWords} {isEn ? "words" : "kata"}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {chap.matchedWords} {isEn ? "words" : "kata"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-black text-sm ${
                          isChapPass ? "text-emerald-600" : isChapWarning ? "text-amber-600" : "text-red-600"
                        }`}>
                          {chap.similarity}%
                        </span>
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              isChapPass ? "bg-emerald-500" : isChapWarning ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(100, chap.similarity)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isChapPass
                          ? "bg-emerald-100 text-emerald-800"
                          : isChapWarning
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {isChapPass
                          ? (isEn ? `PASS (≤${maxSimilarityAllowed}%)` : `LOLOS (≤${maxSimilarityAllowed}%)`)
                          : isChapWarning
                          ? (isEn ? "BORDERLINE THRESHOLD" : "AMBANG BATAS")
                          : (isEn ? "PARAPHRASE REQUIRED" : "WAJIB PARAFRASE")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standar Rubrik Penilaian Sidang Akademik Nasional */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-extrabold text-slate-800 text-base flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>
                {isEn ? "Academic Thesis Defense Evaluation Rubric" : "Rubrik & Komponen Penilaian Ujian Sidang Akademik"}
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              {isEn
                ? "Official defense examination grading components across committee chairs, examiners, and advisors."
                : "Acuan standar penilaian Berita Acara Ujian oleh Ketua Penguji, Anggota Penguji, dan Dosen Pembimbing."}
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
            {isEn ? "National Higher Ed Standard" : "Standar Nasional Dikti"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-xs font-bold text-indigo-600 block uppercase">
              {isEn ? "Weight: 35%" : "Bobot 35%"}
            </span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">
              {isEn ? "Research Manuscript" : "Naskah Karya Ilmiah"}
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              {isEn
                ? "Sharp problem formulation, literature novelty (5-10 years), rigorous methodology, and academic formatting standards."
                : "Ketajaman rumusan masalah, kebaruan literatur (5–10 tahun), ketepatan metodologi, dan tata tulis ilmiah sesuai buku pedoman."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-xs font-bold text-emerald-600 block uppercase">
              {isEn ? "Weight: 25% – 30%" : "Bobot 25% – 30%"}
            </span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">
              {isEn ? "Implementation & System Demo" : "Implementasi / Demo Karya"}
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              {isEn
                ? "Functional system demonstration, empirical validation accuracy, and deep mastery of technical workflows."
                : "Keberfungsian sistem saat demonstrasi, validitas hasil pengujian empiris, dan penguasaan detail teknis metodologi."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-xs font-bold text-amber-600 block uppercase">
              {isEn ? "Weight: 30%" : "Bobot 30%"}
            </span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">
              {isEn ? "Q&A & Oral Mastery" : "Tanya Jawab & Penguasaan"}
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              {isEn
                ? "Scientific reasoning, defending data interpretations, and addressing critical counter-questions from examiners."
                : "Logika ilmiah, kemampuan mempertahankan argumentasi data, dan respon kritis atas pertanyaan sanggahan dewan penguji."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <span className="text-xs font-bold text-purple-600 block uppercase">
              {isEn ? "Weight: 10%" : "Bobot 10%"}
            </span>
            <h5 className="font-bold text-slate-800 text-sm mt-1">
              {isEn ? "Presentation & Ethics" : "Presentasi & Etika"}
            </h5>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              {isEn
                ? "Slide clarity, academic decorum, formal attire, and constructive receptiveness to committee revisions."
                : "Kejelasan slide paparan materi, kerapian busana sidang resmi, tata krama akademik, dan keterbukaan menerima masukan revisi."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
