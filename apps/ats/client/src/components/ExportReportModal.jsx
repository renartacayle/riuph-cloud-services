import React, { useEffect, useState, useRef } from "react";
import { X, Printer, Download, Award, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ExportReportModal({ result, onClose }) {
  const { lang, t } = useLanguage();
  const [qrDataUrl, setQrDataUrl] = useState("");
  const printRef = useRef(null);

  const { overallScore, scores, knockout, format, keywords, impact, multiAts, recruiterScan, timestamp } = result;

  useEffect(() => {
    const reportId = `ATS-AUDIT-${Date.now().toString(36).toUpperCase()}`;
    QRCode.toDataURL(`https://ats.riuph.me/verify/${reportId}`, {
      width: 120,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error("QR Code error:", err));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const isEn = lang === "en";
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(isEn ? "OFFICIAL ATS CV HRD AUDIT REPORT" : "LAPORAN AUDIT & DIAGNOSTIK ATS CV HRD", 20, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(isEn ? `Audit Timestamp: ${new Date(timestamp).toLocaleString("en-US")}` : `Waktu Pengujian: ${new Date(timestamp).toLocaleString("id-ID")}`, 20, 28);
    doc.text(isEn ? `Candidate: ${format.contactInfo.email || "Job Applicant"}` : `Kandidat: ${format.contactInfo.email || "Pelamar Kerja"}`, 20, 34);

    doc.line(20, 38, 190, 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(isEn ? `OVERALL MATCH SCORE: ${overallScore}%` : `SKOR KECOCOKAN TOTAL: ${overallScore}%`, 20, 48);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(isEn ? `• ATS Format & Parseability Score : ${scores.format}%` : `• Skor Format & Parseability : ${scores.format}%`, 25, 56);
    doc.text(isEn ? `• Job Keywords Match Score        : ${scores.keyword}%` : `• Skor Kata Kunci Lowongan    : ${scores.keyword}%`, 25, 62);
    doc.text(isEn ? `• Google XYZ Impact Score         : ${scores.impact}%` : `• Skor Dampak Kuantitatif    : ${scores.impact}%`, 25, 68);
    doc.text(isEn ? `• Vocabulary Hygiene & Clichés    : ${scores.hygiene}%` : `• Skor Kebersihan & Klise    : ${scores.hygiene}%`, 25, 74);
    doc.text(isEn ? `• Knockout Filter Status          : ${knockout.overallStatus}` : `• Status Knockout Filter     : ${knockout.overallStatus}`, 25, 80);

    doc.line(20, 86, 190, 86);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(isEn ? "ENTERPRISE ATS SIMULATION SCORES:" : "EMULSI SISTEM ATS PERUSAHAAN:", 20, 94);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`- Workday / Oracle Taleo  : ${multiAts.breakdown.workdayTaleo.score}%`, 25, 102);
    doc.text(`- Greenhouse / Lever      : ${multiAts.breakdown.greenhouseLever.score}%`, 25, 108);
    doc.text(`- Jobstreet SiVA / Glints : ${multiAts.breakdown.jobstreetGlints.score}%`, 25, 114);
    doc.text(isEn ? `- Recruiter 6-Sec Glance  : ${recruiterScan.firstImpressionScore}%` : `- Recruiter 6-Sec Glance  : ${recruiterScan.firstImpressionScore}%`, 25, 120);

    doc.line(20, 126, 190, 126);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(isEn ? "KEYWORDS & REPUTATION INSIGHTS:" : "KATA KUNCI & REKOMENDASI PERBAIKAN:", 20, 134);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(isEn ? `Matched Keywords (${keywords.matchedKeywords.length}): ${keywords.matchedKeywords.slice(0, 8).map(k => k.skill).join(", ")}` : `Kata Kunci Cocok (${keywords.matchedKeywords.length}): ${keywords.matchedKeywords.slice(0, 8).map(k => k.skill).join(", ")}`, 20, 142);
    if (keywords.missingKeywords.length > 0) {
      doc.text(isEn ? `Missing Skills (${keywords.missingKeywords.length}): ${keywords.missingKeywords.slice(0, 6).map(k => k.skill).join(", ")}` : `Keahlian Belum Ada (${keywords.missingKeywords.length}): ${keywords.missingKeywords.slice(0, 6).map(k => k.skill).join(", ")}`, 20, 150);
    }

    doc.text(isEn ? `Impact Advice: ${impact.summaryAdvice}` : `Saran Dampak: ${impact.summaryAdvice}`, 20, 162);
    doc.text(isEn ? `Recruiter Verdict: ${recruiterScan.recruiterVerdict}` : `Putusan Recruiter: ${recruiterScan.recruiterVerdict}`, 20, 172);

    doc.line(20, 185, 190, 185);
    doc.setFontSize(8);
    doc.text(isEn ? "This report was generated automatically by ATS Master HRD Diagnostic Engine v1.0" : "Dokumen ini diterbitkan secara otomatis oleh ATS Master HRD Diagnostic Engine v1.0", 20, 192);

    doc.save(`Audit_ATS_CV_${Date.now()}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header bar */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm tracking-tight">
              {lang === "en" ? "Official ATS CV HRD Audit Report" : "Laporan Audit Resmi ATS CV HRD"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate / Printable Area */}
        <div ref={printRef} className="p-8 space-y-6 bg-white text-slate-800">
          <div className="flex items-start justify-between border-b pb-4">
            <div>
              <div className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                {lang === "en" ? "Diagnostic Test Results Report" : "Laporan Hasil Uji Diagnostik"}
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {lang === "en" ? "ATS READINESS & HR REVIEW AUDIT" : "AUDIT KESIAPAN ATS & REVIEW HRD"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "en" ? "Audit Time: " : "Waktu Audit: "}{new Date(timestamp).toLocaleString(lang === "en" ? "en-US" : "id-ID")}
              </p>
            </div>

            {qrDataUrl && (
              <img src={qrDataUrl} alt="QR Code" className="w-16 h-16 border rounded" />
            )}
          </div>

          {/* Master Score Display */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-semibold">SKOR KECOCOKAN KESELURUHAN</div>
              <div className="text-3xl font-black text-slate-900">{overallScore}%</div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                overallScore >= 80 ? "bg-emerald-100 text-emerald-800" :
                overallScore >= 65 ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
              }`}>
                {knockout.overallStatus}
              </span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
            <div className="p-2.5 rounded-lg border bg-slate-50">
              <div className="text-[10px] text-slate-500">Format ATS</div>
              <div className="text-sm font-bold text-slate-900">{scores.format}%</div>
            </div>
            <div className="p-2.5 rounded-lg border bg-slate-50">
              <div className="text-[10px] text-slate-500">Kata Kunci</div>
              <div className="text-sm font-bold text-slate-900">{scores.keyword}%</div>
            </div>
            <div className="p-2.5 rounded-lg border bg-slate-50">
              <div className="text-[10px] text-slate-500">Dampak XYZ</div>
              <div className="text-sm font-bold text-slate-900">{scores.impact}%</div>
            </div>
            <div className="p-2.5 rounded-lg border bg-slate-50">
              <div className="text-[10px] text-slate-500">Kebersihan</div>
              <div className="text-sm font-bold text-slate-900">{scores.hygiene}%</div>
            </div>
          </div>

          {/* ATS Engine Breakdown */}
          <div className="text-xs space-y-2 border-t pt-4">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Prediksi Skor Pada Mesin HRD:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-50 border text-center">
                <div className="text-[10px] text-slate-500">Workday/Taleo</div>
                <div className="font-bold text-blue-600">{multiAts.breakdown.workdayTaleo.score}%</div>
              </div>
              <div className="p-2 rounded bg-slate-50 border text-center">
                <div className="text-[10px] text-slate-500">Greenhouse/Lever</div>
                <div className="font-bold text-emerald-600">{multiAts.breakdown.greenhouseLever.score}%</div>
              </div>
              <div className="p-2 rounded bg-slate-50 border text-center">
                <div className="text-[10px] text-slate-500">Jobstreet/Glints</div>
                <div className="font-bold text-amber-600">{multiAts.breakdown.jobstreetGlints.score}%</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border">
            <strong>Catatan Recruiter:</strong> {recruiterScan.recruiterVerdict} {impact.summaryAdvice}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-100 px-6 py-4 flex items-center justify-end gap-3 no-print border-t">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
          >
            <Printer className="w-4 h-4" /> Cetak Lembar Audit
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
          >
            <Download className="w-4 h-4" /> Simpan PDF
          </button>
        </div>
      </div>
    </div>
  );
}
