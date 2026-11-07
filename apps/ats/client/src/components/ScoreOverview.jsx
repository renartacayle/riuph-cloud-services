import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Award, Target, FileSpreadsheet, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ScoreOverview({ result, onExportClick }) {
  const { lang, t } = useLanguage();
  const { overallScore, scores, suggestions } = result;

  const getScoreColor = (score) => {
    if (score >= 85) return { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-500/20", light: "bg-emerald-50" };
    if (score >= 70) return { bg: "bg-blue-500", text: "text-blue-700", ring: "ring-blue-500/20", light: "bg-blue-50" };
    if (score >= 55) return { bg: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-500/20", light: "bg-amber-50" };
    return { bg: "bg-rose-500", text: "text-rose-700", ring: "ring-rose-500/20", light: "bg-rose-50" };
  };

  const getStatusBadge = (score) => {
    if (score >= 85) {
      return {
        label: lang === "en" ? "Highly Recommended (Top 5%)" : "Sangat Direkomendasikan (Top 5%)",
        desc: lang === "en" ? "Candidate has a high likelihood of getting invited for an HR interview." : "Kandidat memiliki probabilitas tinggi dipanggil interview oleh HRD.",
        icon: <Award className="w-4 h-4 text-emerald-600" />,
        badge: "bg-emerald-100 text-emerald-800 border-emerald-300"
      };
    }
    if (score >= 70) {
      return {
        label: lang === "en" ? "Shortlisted (Passes Administration)" : "Lolos Seleksi Administrasi (Shortlist)",
        desc: lang === "en" ? "Meets essential job requirements, though some sections can still be polished." : "Memenuhi kriteria esensial lowongan, namun masih dapat ditingkatkan.",
        icon: <CheckCircle className="w-4 h-4 text-blue-600" />,
        badge: "bg-blue-100 text-blue-800 border-blue-300"
      };
    }
    if (score >= 55) {
      return {
        label: lang === "en" ? "Below Average (Borderline Review)" : "Di Bawah Rata-Rata (Borderline Review)",
        desc: lang === "en" ? "Lacks key vacancy keywords or quantitative business metrics." : "Kurang kata kunci esensial atau minim metrik dampak kuantitatif.",
        icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        badge: "bg-amber-100 text-amber-800 border-amber-300"
      };
    }
    return {
      label: lang === "en" ? "High Risk of Auto-Reject" : "Risiko Tinggi Auto-Reject",
      desc: lang === "en" ? "Document formatting issues or failed initial HR knockout criteria." : "Format dokumen bermasalah atau gagal pada kriteria knockout HR.",
      icon: <XCircle className="w-4 h-4 text-rose-600" />,
      badge: "bg-rose-100 text-rose-800 border-rose-300"
    };
  };


  const status = getStatusBadge(overallScore);
  const color = getScoreColor(overallScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Top Banner: Master Score Gauge & Verdict */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circular Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-100"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
                className={`${color.text} transition-all duration-1000 ease-out`}
                fill="transparent"
                strokeDasharray="326.7"
                strokeDashoffset={326.7 - (326.7 * overallScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {overallScore}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                ATS Score
              </span>
            </div>
          </div>

          {/* Details & Status */}
          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${status.badge}`}>
                {status.icon}
                {status.label}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {lang === "en" ? "Candidate Profile Overall Match" : "Kecocokan Total Profil Kandidat"}
            </h2>
            <p className="text-xs text-slate-600 max-w-md">
              {status.desc} {lang === "en" ? "Score computed across leading ATS engines (Jobscan, Workday, Greenhouse & Glints)." : "Skor dihitung berdasarkan gabungan algoritma ATS terkemuka (Jobscan, Workday, Greenhouse & Glints)."}
            </p>
          </div>
        </div>

        {/* Export Report Action */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <button
            onClick={onExportClick}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition hover:scale-102 active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            {lang === "en" ? "Print / Download PDF Report" : "Cetak / Download Laporan PDF"}
          </button>
          <span className="text-[11px] text-slate-400">
            {lang === "en" ? "Includes full HR audit sheet" : "Termasuk lembar audit lengkap HRD"}
          </span>
        </div>
      </div>

      {/* 4 Dimension Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Format & Parseability */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{lang === "en" ? "ATS Layout & Formatting" : "Tata Letak & Format ATS"}</span>
            <span className={`font-bold ${getScoreColor(scores.format).text}`}>
              {scores.format}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor(scores.format).bg}`}
              style={{ width: `${scores.format}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-600">
            {scores.format >= 90
              ? (lang === "en" ? "Machine parser friendly format." : "Format ramah mesin parser ATS.")
              : (lang === "en" ? "Contains non-standard tables or graphics needing cleanup." : "Ada tabel / simbol non-standar yang perlu diperbaiki.")}
          </p>
        </div>

        {/* 2. Keyword & Skills Match */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{lang === "en" ? "Keywords & Skills Match" : "Kecocokan Kata Kunci (Keywords)"}</span>
            <span className={`font-bold ${getScoreColor(scores.keyword).text}`}>
              {scores.keyword}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor(scores.keyword).bg}`}
              style={{ width: `${scores.keyword}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-600">
            {scores.keyword >= 80
              ? (lang === "en" ? "Most required tech stack skills are covered." : "Sebagian besar tech stack lowongan terpenuhi.")
              : (lang === "en" ? "Missing several key job vacancy skills." : "Beberapa keahlian wajib lowongan belum ada di CV.")}
          </p>
        </div>

        {/* 3. Google XYZ Impact */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{lang === "en" ? "Measurable Impact (Google XYZ)" : "Dampak Terukur (Google XYZ)"}</span>
            <span className={`font-bold ${getScoreColor(scores.impact).text}`}>
              {scores.impact}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor(scores.impact).bg}`}
              style={{ width: `${scores.impact}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-600">
            {scores.impact >= 75
              ? (lang === "en" ? "Strong bullets backed by numerical metrics and scale." : "Banyak pencapaian berbasis metrik angka/skala.")
              : (lang === "en" ? "Contains passive bullets lacking quantified outcomes." : "Masih banyak kalimat pasif tanpa hasil kuantitatif.")}
          </p>
        </div>

        {/* 4. Hygiene & Lexical */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{lang === "en" ? "Vocabulary Hygiene & Clichés" : "Kebersihan Bahasa & Klise"}</span>
            <span className={`font-bold ${getScoreColor(scores.hygiene).text}`}>
              {scores.hygiene}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor(scores.hygiene).bg}`}
              style={{ width: `${scores.hygiene}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-600">
            {scores.hygiene >= 85
              ? (lang === "en" ? "Free from excessive corporate buzzwords." : "Bebas dari jargon klise berlebihan.")
              : (lang === "en" ? "Found overused buzzwords that should be replaced." : "Ditemukan beberapa buzzword klise yang sebaiknya diganti.")}
          </p>
        </div>
      </div>

      {/* High Priority Action Items */}
      {suggestions.highPriorityFixes.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            {lang === "en" ? "High Priority Actions to Boost ATS Score (+15 - 25%):" : "Tindakan Prioritas Utama untuk Menaikkan Skor (+15 - 25%):"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {suggestions.highPriorityFixes.map((fix, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  fix.priority === "CRITICAL" ? "bg-rose-100 text-rose-800" :
                  fix.priority === "HIGH" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {fix.priority}
                </span>
                <div>
                  <div className="font-semibold text-slate-800">{fix.title}</div>
                  <div className="text-slate-600 text-[11px]">{fix.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

