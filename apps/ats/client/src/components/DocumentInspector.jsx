import React, { useState } from "react";
import { FileCode, Mail, Phone, Globe, Code2, MapPin, CheckCircle, XCircle } from "lucide-react";

export default function DocumentInspector({ format, cvRawText }) {
  const { contactInfo, sections, missingCoreSections, formatHazards, lengthMetrics } = format;
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-slate-700" />
            Inspeksi Struktur Dokumen & Kontak Informasi
          </h3>
          <p className="text-xs text-slate-500">
            Hasil pemindaian informasi kontak, bagian dokumen baku, dan potensi jebakan format.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {lengthMetrics.wordCount} Kata • ~{lengthMetrics.estimatedPages} Halaman
        </div>
      </div>

      {/* Contact Info Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Email */}
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
          contactInfo.hasEmail ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
        }`}>
          <Mail className="w-4 h-4 shrink-0" />
          <div className="truncate">
            <div className="font-bold text-[10px] uppercase">Email</div>
            <div className="truncate font-mono text-[11px]">{contactInfo.email || "Tidak Ada"}</div>
          </div>
        </div>

        {/* Phone */}
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
          contactInfo.hasPhone ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
        }`}>
          <Phone className="w-4 h-4 shrink-0" />
          <div className="truncate">
            <div className="font-bold text-[10px] uppercase">No HP / WA</div>
            <div className="truncate font-mono text-[11px]">{contactInfo.phone || "Tidak Ada"}</div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
          contactInfo.hasLinkedIn ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-600"
        }`}>
          <Globe className="w-4 h-4 shrink-0" />
          <div className="truncate">
            <div className="font-bold text-[10px] uppercase">LinkedIn</div>
            <div className="truncate font-mono text-[11px]">{contactInfo.hasLinkedIn ? "Terdeteksi" : "Belum Ada"}</div>
          </div>
        </div>

        {/* GitHub / Portfolio */}
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
          contactInfo.hasPortfolioOrGithub ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-600"
        }`}>
          <Code2 className="w-4 h-4 shrink-0" />
          <div className="truncate">
            <div className="font-bold text-[10px] uppercase">Portofolio/Git</div>
            <div className="truncate font-mono text-[11px]">{contactInfo.hasPortfolioOrGithub ? "Terdeteksi" : "Belum Ada"}</div>
          </div>
        </div>

        {/* Location */}
        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
          contactInfo.hasLocation ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" : "bg-slate-50 border-slate-200 text-slate-600"
        }`}>
          <MapPin className="w-4 h-4 shrink-0" />
          <div className="truncate">
            <div className="font-bold text-[10px] uppercase">Domisili</div>
            <div className="truncate capitalize text-[11px]">{contactInfo.location || "Belum Ada"}</div>
          </div>
        </div>
      </div>

      {/* Section Headings Recognized */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          Deteksi Bagian Standar Resume:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {Object.entries(sections).map(([key, sec]) => (
            <div
              key={key}
              className={`p-2.5 rounded-lg border flex items-center justify-between ${
                sec.detected 
                  ? "bg-white border-slate-200 text-slate-800" 
                  : "bg-slate-50 border-slate-200/60 text-slate-400"
              }`}
            >
              <span>{sec.name}</span>
              {sec.detected ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formatting Hazards Alert */}
      {formatHazards.length > 0 && (
        <div className="space-y-2">
          {formatHazards.map((h, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <span className="font-bold">⚠️ Bahaya Format:</span> {h.detail}
            </div>
          ))}
        </div>
      )}

      {/* Parsed Raw Text Preview */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Pratinjau Teks yang Berhasil Diekstrak Mesin ATS:
          </span>
          <button
            type="button"
            onClick={() => setShowFullText(!showFullText)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            {showFullText ? "Perkecil Tampilan" : "Tampilkan Seluruhnya"}
          </button>
        </div>

        <div className={`p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs overflow-y-auto leading-relaxed border border-slate-800 ${
          showFullText ? "max-h-[500px]" : "max-h-[160px]"
        }`}>
          <pre className="whitespace-pre-wrap font-mono text-[11px]">
            {cvRawText || "Teks dokumen tidak tersedia."}
          </pre>
        </div>
      </div>
    </div>
  );
}
