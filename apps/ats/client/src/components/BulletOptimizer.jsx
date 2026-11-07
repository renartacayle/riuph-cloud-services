import React, { useState } from "react";
import { Sparkles, Copy, Check, ArrowRight } from "lucide-react";

export default function BulletOptimizer({ suggestions }) {
  const { bulletSuggestions } = suggestions;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Asisten Optimasi Kalimat (Google XYZ Bullet Rewriter)
          </h3>
          <p className="text-xs text-slate-500">
            Saran penulisan ulang otomatis agar kalimat memiliki daya pikat tinggi di mata rekruter dan ATS.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bulletSuggestions.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            {/* Before (Original) */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Sebelum (Lemah / Pasif)
              </span>
              <p className="text-xs text-slate-700 italic pl-1">
                "{item.originalBullet}"
              </p>
            </div>

            {/* After (Optimized) */}
            <div className="space-y-1 pt-2 border-t border-slate-200/60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  Rekomendasi Google XYZ (Kuat & Terukur)
                </span>
                <button
                  onClick={() => handleCopy(item.recommendedBullet, item.id)}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200 transition shadow-2xs"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Salin Kalimat
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-900 font-semibold pl-1 leading-relaxed">
                "{item.recommendedBullet}"
              </p>
            </div>

            {/* Principle Tip */}
            <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80">
              💡 <strong>Alasan:</strong> {item.actionAdvice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
