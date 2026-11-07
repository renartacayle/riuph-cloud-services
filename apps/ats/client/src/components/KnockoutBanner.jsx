import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Shield, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function KnockoutBanner({ knockout }) {
  const { lang } = useLanguage();
  const { overallStatus, filters, actionAdvice, candidateYears, requiredYears, candidateEducation } = knockout;

  const isPass = overallStatus === "ELIGIBLE";
  const isWarn = overallStatus === "BORDERLINE";
  const isFail = overallStatus === "DISQUALIFIED";

  return (
    <div className={`rounded-2xl border p-6 sm:p-7 shadow-sm transition ${
      isPass ? "bg-emerald-50/40 border-emerald-200" :
      isWarn ? "bg-amber-50/40 border-amber-200" :
      "bg-rose-50/50 border-rose-200"
    }`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs ${
            isPass ? "bg-emerald-500 text-white" :
            isWarn ? "bg-amber-500 text-white" :
            "bg-rose-500 text-white"
          }`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                {lang === "en" ? "Initial HR Knockout / Deal-Breaker Screening" : "Penyaringan Awal HRD (Knockout / Deal-Breaker Filter)"}
              </h3>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                isPass ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                isWarn ? "bg-amber-100 text-amber-800 border-amber-300" :
                "bg-rose-100 text-rose-800 border-rose-300"
              }`}>
                {overallStatus}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {lang === "en" 
                ? "Evaluates non-negotiable criteria (minimum experience, degrees, and location) that determine whether the CV advances to human HR review." 
                : "Evaluasi kriteria mutlak (pengalaman minimal, ijazah pendidikan, dan domisili) yang menentukan lolos tidaknya CV ke meja HRD."}
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-slate-700 shadow-2xs">
          {lang === "en"
            ? (isPass ? "✅ Passed Mandatory Criteria" : isWarn ? "⚠️ Borderline (Portfolio Required)" : "❌ Fails Mandatory Criteria")
            : (isPass ? "✅ Lolos Seleksi Syarat Wajib" : isWarn ? "⚠️ Di Batas Minimal (Perlu Portofolio)" : "❌ Gugur di Syarat Minimal")}
        </div>
      </div>

      {/* Filter Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
        {filters.map((f, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {idx === 0 ? <Briefcase className="w-3.5 h-3.5 text-blue-600" /> :
                 idx === 1 ? <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> :
                 <MapPin className="w-3.5 h-3.5 text-emerald-600" />}
                {lang === "en" ? (
                  idx === 0 ? "Years of Experience" :
                  idx === 1 ? "Education Level" : "Location & Work Mode"
                ) : f.criterion}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                f.status === "PASS" ? "bg-emerald-100 text-emerald-800" :
                f.status === "WARNING" ? "bg-amber-100 text-amber-800" :
                "bg-rose-100 text-rose-800"
              }`}>
                {f.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {f.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Advice Note */}
      <div className="mt-4 text-xs font-medium text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2">
        <span className="text-blue-600 font-bold">{lang === "en" ? "HR Recommendation:" : "Rekomendasi HR:"}</span> {actionAdvice}
      </div>
    </div>
  );
}

