import React from "react";
import { Tag, Check, Plus, AlertCircle } from "lucide-react";

export default function SkillsGapMatrix({ keywords }) {
  const { 
    matchedKeywords, 
    missingKeywords, 
    hardSkillsMatchPct, 
    softSkillsMatchPct,
    hasJdComparison 
  } = keywords;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-600" />
            Matriks Kata Kunci & Kesenjangan Keahlian (Skills Gap)
          </h3>
          <p className="text-xs text-slate-500">
            Analisis kecocokan kata kunci teknis (*hard skills*) dan kompetensi perilaku (*soft skills*).
          </p>
        </div>

        {hasJdComparison && (
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Hard Skills:</span>
              <span className={`px-2 py-0.5 rounded-full ${hardSkillsMatchPct >= 75 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {hardSkillsMatchPct}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Soft Skills:</span>
              <span className={`px-2 py-0.5 rounded-full ${softSkillsMatchPct >= 70 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {softSkillsMatchPct}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Kata Kunci Cocok Terdeteksi ({matchedKeywords.length})
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 min-h-[140px] flex flex-wrap gap-2 content-start">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  {item.skill}
                  {item.cvCount > 1 && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                      {item.cvCount}x
                    </span>
                  )}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">
                Belum ada kata kunci lowongan yang cocok ditemukan di dalam CV.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Keahlian Belum Disebutkan di CV ({missingKeywords.length})
            </span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100 min-h-[140px] flex flex-wrap gap-2 content-start">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((item, idx) => (
                <span
                  key={idx}
                  title={item.recommendation}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-900 shadow-2xs hover:border-rose-400 transition cursor-help"
                >
                  <Plus className="w-3 h-3 text-rose-500" />
                  {item.skill}
                  {item.importance === "high" && (
                    <span className="text-[9px] bg-rose-100 text-rose-800 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      Wajib
                    </span>
                  )}
                </span>
              ))
            ) : (
              <p className="text-xs text-emerald-600 font-medium">
                🎉 Luar biasa! Seluruh kata kunci esensial lowongan sudah tercakup di dalam CV.
              </p>
            )}
          </div>
        </div>
      </div>

      {missingKeywords.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong>Tips Penempatan Kata Kunci:</strong> Jangan menaruh kata kunci di daftar keahlian (*Skills section*) saja. Sebutkan pula dalam 1–2 poin pengalaman kerja agar mesin ATS mendeteksi konteks penerapannya (*contextual matching*).
          </div>
        </div>
      )}
    </div>
  );
}
