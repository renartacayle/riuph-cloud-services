import React from "react";
import { MessageSquareWarning, Repeat, Sparkles, ShieldAlert, AlignLeft } from "lucide-react";

export default function ClichésAndHygiene({ hygiene, format }) {
  const { detectedCliches, repetitiveWords, lexicalDiversity, bulletHygiene } = hygiene;
  const { privacyFlags } = format;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquareWarning className="w-5 h-5 text-amber-500" />
            Pendeteksi Kata Klise (*Buzzwords*), Repetisi & Privasi Dokumen
          </h3>
          <p className="text-xs text-slate-500">
            Menemukan kata basi yang sering membuat recruiter bosan, serta data sensitif yang berpotensi melanggar privasi kerja modern.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clichés Detected */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Jargon / Kata Klise Ditemukan ({detectedCliches.length}):
          </div>

          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100 min-h-[140px] space-y-2">
            {detectedCliches.length > 0 ? (
              detectedCliches.map((c, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg border border-amber-200 text-xs shadow-2xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>"{c.cliche}"</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                      {c.count}x muncul
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {c.advice}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-emerald-600 font-medium">
                ✅ Bagus sekali! CV Anda bersih dari jargon klise klise korporat (*buzzword-free*).
              </p>
            )}
          </div>
        </div>

        {/* Word Repetition & Lexical Diversity */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5 text-blue-600" />
            Kata yang Terlalu Sering Diulang (&gt; 4x):
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-h-[140px] space-y-3">
            {repetitiveWords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {repetitiveWords.map((r, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
                    <strong>{r.word}</strong>
                    <span className="text-[10px] text-blue-600 font-bold">({r.count}x)</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Tidak ditemukan kata yang diulang secara berlebihan.
              </p>
            )}

            <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
              <div>
                <strong>Kekayaan Kosakata (TTR):</strong> {lexicalDiversity.ttrScore}% ({lexicalDiversity.rating})
              </div>
              <div>
                <strong>Kebersihan Panjang Kalimat:</strong> {bulletHygiene.feedback}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Flags (Indonesian Legacy Format) */}
      {privacyFlags.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2">
          <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Peringatan Kepatuhan Privasi Data (Format Lama):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {privacyFlags.map((flag, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-2xs">
                <span className="font-bold text-rose-800">{flag.item}: </span>
                <span className="text-slate-600 text-[11px]">{flag.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
