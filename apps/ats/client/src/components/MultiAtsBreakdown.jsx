import React from "react";
import { Layers, Eye, CheckCircle2, XCircle, Building2, Rocket, Globe2 } from "lucide-react";

export default function MultiAtsBreakdown({ multiAts, recruiterScan }) {
  const { breakdown } = multiAts;
  const { firstImpressionScore, checklist, recruiterVerdict } = recruiterScan;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Emulasi Multi-Sistem ATS & Pemindaian Recruiter 6 Detik
          </h3>
          <p className="text-xs text-slate-500">
            Setiap sistem pelacak pelamar memiliki algoritma penilaian tersendiri.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3 ATS System Profiles */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Skor Berdasarkan Mesin ATS Populer:
          </div>

          {/* 1. Workday / Taleo */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Workday & Oracle Taleo</div>
                  <div className="text-[11px] text-slate-500">Standar Korporasi Multinasional (Enterprise)</div>
                </div>
              </div>
              <div className="text-lg font-extrabold text-blue-600">
                {breakdown.workdayTaleo.score}%
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              {breakdown.workdayTaleo.characteristics}
            </p>
          </div>

          {/* 2. Greenhouse / Lever */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Greenhouse & Lever</div>
                  <div className="text-[11px] text-slate-500">Standar Startup Teknologi & Unicorn Global</div>
                </div>
              </div>
              <div className="text-lg font-extrabold text-emerald-600">
                {breakdown.greenhouseLever.score}%
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              {breakdown.greenhouseLever.characteristics}
            </p>
          </div>

          {/* 3. Jobstreet SiVA / Glints */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Jobstreet SiVA & Glints</div>
                  <div className="text-[11px] text-slate-500">Standar Rekrutmen Perusahaan Asia Tenggara & Indonesia</div>
                </div>
              </div>
              <div className="text-lg font-extrabold text-amber-600">
                {breakdown.jobstreetGlints.score}%
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              {breakdown.jobstreetGlints.characteristics}
            </p>
          </div>
        </div>

        {/* Right: Recruiter 6-Second First Impression Scan */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <Eye className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900">
                Simulasi Pandangan 6 Detik Recruiter
              </div>
            </div>
            <span className="text-sm font-extrabold text-indigo-700">
              {firstImpressionScore}%
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            {recruiterVerdict}
          </p>

          <div className="space-y-2">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs">
                <span className="text-slate-700 font-medium">{item.item}</span>
                {item.passed ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ada
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-500 font-bold text-[11px]">
                    <XCircle className="w-3.5 h-3.5" /> Kurang
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 italic bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
            💡 <strong>Riset Rekrutmen:</strong> HRD manusia hanya menghabiskan 6–7 detik untuk memutuskan apakah CV layak dibaca penuh atau disingkirkan.
          </div>
        </div>
      </div>
    </div>
  );
}
