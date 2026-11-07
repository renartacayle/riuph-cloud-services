import React from "react";
import { TrendingUp, CheckCircle2, AlertTriangle, XCircle, Sparkles, Hash } from "lucide-react";

export default function ImpactAnalysis({ impact }) {
  const { 
    impactScore, 
    totalBullets, 
    metricPercentage, 
    powerVerbPercentage, 
    bulletsWithPassiveCount, 
    evaluatedBullets, 
    topMetricsFound, 
    summaryAdvice 
  } = impact;

  const getBulletBadge = (grade) => {
    switch (grade) {
      case "excellent":
        return { label: "Google XYZ", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" /> };
      case "good":
        return { label: "Kuat", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: <CheckCircle2 className="w-3 h-3 text-blue-600" /> };
      case "passive":
        return { label: "Pasif", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: <XCircle className="w-3 h-3 text-rose-600" /> };
      default:
        return { label: "Tanpa Metrik", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: <AlertTriangle className="w-3 h-3 text-amber-600" /> };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Evaluasi Dampak Kuantitatif (Google XYZ Formula & STAR Method)
          </h3>
          <p className="text-xs text-slate-500">
            Mengukur apakah poin pengalaman menyatakan hasil nyata: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
          Skor Dampak: {impactScore}%
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold">Poin Memuat Metrik/Angka</div>
          <div className="text-2xl font-extrabold text-slate-900">{metricPercentage}%</div>
          <div className="text-[11px] text-slate-500">
            Target standar rekruter: ≥ 50%
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold">Kata Kerja Aksi Kuat (*Power Verbs*)</div>
          <div className="text-2xl font-extrabold text-slate-900">{powerVerbPercentage}%</div>
          <div className="text-[11px] text-slate-500">
            Target standar rekruter: ≥ 70%
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
          <div className="text-[11px] text-slate-500 font-semibold">Kalimat Berindikasi Pasif (*Weak*)</div>
          <div className="text-2xl font-extrabold text-rose-600">{bulletsWithPassiveCount}</div>
          <div className="text-[11px] text-slate-500">
            Sebaiknya 0 kalimat pasif
          </div>
        </div>
      </div>

      {/* Top Metrics Extracted */}
      {topMetricsFound.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-blue-600" />
            Contoh Angka & Metrik Kuantitatif Terdeteksi di CV:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topMetricsFound.map((m, idx) => (
              <span key={idx} className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 shadow-2xs">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Evaluated Bullet Points Table */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Bedah Poin Pengalaman Kerja ({evaluatedBullets.length} Poin):
        </div>

        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {evaluatedBullets.length > 0 ? (
            evaluatedBullets.map((b, idx) => {
              const badge = getBulletBadge(b.grade);
              return (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      • {b.text}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge.bg}`}>
                      {badge.icon}
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>
                      {b.hasMetric ? `✅ Metrik: ${b.metrics.join(", ")}` : "❌ Tanpa metrik angka"}
                    </span>
                    <span className="italic text-slate-600">
                      {b.feedback}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 italic">
              Tidak ada poin pekerjaan terdeteksi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
