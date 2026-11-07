import React, { useState } from "react";
import { Bot, AlertTriangle, ShieldCheck, HelpCircle, Activity, Sparkles, AlertOctagon, CheckCircle, Upload } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AiReportViewer({ fullText, aiResult, onOpenUpload, loading }) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [selectedSentence, setSelectedSentence] = useState(null);

  const sentences = aiResult?.sentences || [];
  const aiPercentage = aiResult?.aiPercentage || 0;
  const stats = aiResult?.stats || { burstiness: 0, avgSentenceLength: 0, overallPerplexity: 0 };
  const hallucinatedRefs = aiResult?.hallucinatedReferences || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Document View with Cyan/Teal AI Highlights (8 Cols on Desktop, Order 2 on Mobile) */}
      <div className="order-2 lg:order-1 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-cyan-600" />
                  <span>AI Writing Integrity Detector</span>
                </h3>
                <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs px-2.5 py-0.5 rounded font-bold">
                  {aiPercentage}% {isEn ? "AI Content" : "Kandungan AI"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn
                  ? "Sentences detected as generated or paraphrased by AI models (ChatGPT, Claude, etc.) are highlighted in cyan."
                  : "Kalimat yang terdeteksi dibuat atau diparafrase oleh model AI (ChatGPT, Claude, dll.) disorot dengan warna sian."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">{aiResult?.aiSentencesCount || 0}</span>{" "}
                {isEn ? "of" : "dari"}{" "}
                <span className="font-semibold text-slate-700">{aiResult?.totalSentences || 0}</span>{" "}
                {isEn ? "Sentences Flagged" : "Kalimat Ditandai"}
              </div>
              {onOpenUpload && (
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title={isEn ? "Upload another manuscript to check AI writing" : "Unggah naskah skripsi lain untuk diuji AI"}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isEn ? "Upload Another File (.DOCX)" : "Upload Naskah Lain (.DOCX)"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Document View */}
          <div className="min-h-[500px] max-h-[850px] overflow-y-auto pr-2 space-y-2">
            {sentences.length === 0 ? (
              <div
                onClick={onOpenUpload}
                className="p-10 border-2 border-dashed border-cyan-300 rounded-2xl bg-cyan-50/40 text-center cursor-pointer hover:bg-cyan-50 transition space-y-3"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center shadow-xs">
                  <Bot className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-base">
                    {isEn ? "No Manuscript Tested Yet" : "Belum Ada Naskah Skripsi yang Diuji"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    {isEn
                      ? "Click here or use the upload button to select a manuscript (.docx / .pdf) and detect AI writing percentage instantly."
                      : "Klik di sini atau gunakan tombol upload untuk mengunggah berkas skripsi (.docx / .pdf) dan mendeteksi persentase teks buatan AI secara instan."}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {isEn ? "Select Manuscript File (.DOCX / .PDF)" : "Pilih Berkas Skripsi (.DOCX / .PDF)"}
                  </span>
                </button>
              </div>
            ) : (
              <div className="font-academic text-slate-800 leading-loose text-sm sm:text-base select-text">
                {sentences.map((sent, idx) => {
                  const isSelected = selectedSentence === idx;
                  if (!sent.isAi) {
                    return (
                      <span key={idx} className="hover:bg-slate-50 transition rounded px-0.5">
                        {sent.text}{" "}
                      </span>
                    );
                  }

                  return (
                    <span
                      key={idx}
                      onClick={() => setSelectedSentence(isSelected ? null : idx)}
                      className={`inline cursor-pointer rounded-xs px-1 py-0.5 mx-0.5 transition-all duration-150 relative ${
                        isSelected
                          ? "bg-cyan-300/80 ring-2 ring-cyan-600 shadow-sm"
                          : "bg-cyan-100 hover:bg-cyan-200 text-cyan-950 border-b-2 border-cyan-400"
                      }`}
                    >
                      <span className="inline-flex items-center text-[10px] font-bold bg-cyan-700 text-white rounded-full px-1.5 py-0 mr-1 select-none">
                        AI {sent.confidence}%
                      </span>
                      {sent.text}{" "}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Drawer: AI Analytics & Academic Defense Risk (4 Cols on Desktop, Order 1 on Mobile) */}
      <div className="order-1 lg:order-2 lg:col-span-4 space-y-4">
        {/* Selected Sentence Inspection Card */}
        {selectedSentence !== null && sentences[selectedSentence] && (
          <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-4 text-xs space-y-2.5 animate-in fade-in duration-150 shadow-sm">
            <div className="flex items-center justify-between pb-1.5 border-b border-cyan-200">
              <span className="font-bold text-cyan-900 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>{isEn ? "AI-Flagged Sentence Inspection" : "Analisis Kalimat Terindikasi AI"}</span>
              </span>
              <span className="bg-cyan-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                {isEn ? "Probability:" : "Probabilitas:"} {sentences[selectedSentence].confidence}%
              </span>
            </div>

            <p className="font-academic italic text-slate-700 bg-white p-2 rounded border border-cyan-200">
              "{sentences[selectedSentence].text}"
            </p>

            <div>
              <span className="font-bold text-slate-700 block mb-1">
                {isEn ? "Detected Indicators:" : "Indikator yang Terdeteksi:"}
              </span>
              <ul className="space-y-1 text-slate-600">
                {sentences[selectedSentence].reasons.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-start space-x-1.5">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-cyan-200 flex justify-between text-[11px] text-slate-500">
              <span>Perplexity: <strong>{sentences[selectedSentence].perplexity}</strong></span>
              <span>
                {isEn ? "Length:" : "Panjang:"}{" "}
                <strong>{sentences[selectedSentence].wordsCount} {isEn ? "words" : "kata"}</strong>
              </span>
            </div>
          </div>
        )}

        {/* AI Writing Integrity Gauge */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm tracking-wide">
                AI WRITING DETECTION
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEn ? "AI Writing Integrity Standard" : "Standar AI Writing Integrity"}
              </p>
            </div>
            <Bot className="w-5 h-5 text-cyan-600" />
          </div>

          <div className="flex items-center justify-center py-5">
            <div className="relative flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-8 shadow-inner ${
                  aiPercentage <= 15
                    ? "border-emerald-500 bg-emerald-50/50 text-emerald-700"
                    : aiPercentage <= 30
                    ? "border-amber-500 bg-amber-50/50 text-amber-700"
                    : "border-purple-600 bg-purple-50/50 text-purple-700"
                }`}
              >
                <span className="text-4xl font-black tracking-tight">{aiPercentage}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">AI Generated</span>
              </div>
            </div>
          </div>

          {/* AI Risk Classification Banner */}
          <div
            className={`p-3 rounded-lg flex items-start space-x-2 text-xs mb-4 ${
              aiPercentage <= 15
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : aiPercentage <= 30
                ? "bg-amber-50 border border-amber-200 text-amber-800"
                : "bg-purple-50 border border-purple-200 text-purple-800"
            }`}
          >
            {aiPercentage <= 15 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : aiPercentage <= 30 ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertOctagon className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">
                {aiPercentage <= 15
                  ? (isEn ? "PASS: NATURAL HUMAN WRITING" : "AMAN: TULISAN ALAMI (HUMAN)")
                  : aiPercentage <= 30
                  ? (isEn ? "WARNING: MODERATE AI ASSISTANCE" : "PERINGATAN: BANTUAN AI MODERAT")
                  : (isEn ? "HIGH RISK: EXTENSIVE AI GENERATION" : "RISIKO TINGGI SIDANG SKRIPSI")}
              </span>
              <p className="text-[11px] mt-0.5 leading-snug opacity-90">
                {aiPercentage <= 15
                  ? (isEn
                      ? "Paper exhibits natural syntactic cadence and human linguistic bursts. No suspicious AI patterns."
                      : "Naskah menunjukkan ritme dan variasi alami tulisan mahasiswa. Tidak ada indikasi mencurigakan.")
                  : aiPercentage <= 30
                  ? (isEn
                      ? "Several paragraphs exhibit uniform AI sentence structure. Defense committee may probe conceptual understanding."
                      : "Terdapat beberapa paragraf dengan pola AI. Dewan penguji kemungkinan akan menguji pemahaman konsep secara lisan.")
                  : (isEn
                      ? "Paper is heavily dominated by synthetic language. High risk of academic integrity scrutiny during defense!"
                      : "Naskah didominasi bahasa generatif. Sangat berisiko dipertanyakan integritasnya oleh Dewan Penguji!")}
              </p>
            </div>
          </div>

          {/* Linguistic Metrics (Perplexity & Burstiness) */}
          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              {isEn ? "Linguistic & Stylistic Metrics:" : "Metrik Linguistik & Gaya Bahasa:"}
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">
                  {isEn ? "Burstiness (Variation)" : "Burstiness (Variasi)"}
                </span>
                <span className="font-bold text-slate-800 text-sm">{stats.burstiness}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {stats.burstiness > 6.5
                    ? (isEn ? "Varied (Natural)" : "Variatif (Alami)")
                    : (isEn ? "Uniform (Typical AI)" : "Monoton (Khas AI)")}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block">
                  {isEn ? "Perplexity (Predictability)" : "Perplexity (Prediktabilitas)"}
                </span>
                <span className="font-bold text-slate-800 text-sm">{stats.overallPerplexity}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {stats.overallPerplexity > 55
                    ? (isEn ? "High (Natural)" : "Tinggi (Alami)")
                    : (isEn ? "Low (Predictive)" : "Rendah (Prediktif)")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hallucinated References Warning Card */}
        {hallucinatedRefs.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-center space-x-2 text-red-800 font-bold">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <span>
                {isEn ? "Hallucinated Citations Warning (AI Fabrications)" : "Peringatan Sitasi Fiktif (Halusinasi AI)"}
              </span>
            </div>
            <p className="text-red-700 text-[11px]">
              {isEn
                ? `Found ${hallucinatedRefs.length} bibliography references matching fabricated AI patterns:`
                : `Ditemukan ${hallucinatedRefs.length} rujukan di daftar pustaka dengan indikasi pola fiktif buatan ChatGPT:`}
            </p>
            <div className="space-y-1.5">
              {hallucinatedRefs.map((h, hIdx) => (
                <div key={hIdx} className="bg-white p-2 rounded border border-red-200 text-slate-700 text-[11px]">
                  <p className="font-mono text-[10px] text-slate-600 line-clamp-2">{h.reference}</p>
                  <span className="text-red-600 font-semibold text-[10px] block mt-1">⚠️ {h.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How Dosen detects AI advice */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-amber-900">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>
              {isEn ? "How Do Examination Committees Probe AI?" : "Bagaimana Dewan Penguji Menguji AI?"}
            </span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            {isEn
              ? "Academic committees don't solely rely on software detectors; they conduct rigorous oral examinations:"
              : "Dosen penguji akademik tidak hanya mengandalkan detektor software, melainkan melakukan uji silang lisan (oral defense):"}
          </p>
          <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
            <li>
              {isEn
                ? "Asking candidates to close presentation slides and explain core definitions in their own words."
                : "Menyuruh mahasiswa menutup slide dan menjelaskan definisi dengan bahasa sendiri."}
            </li>
            <li>
              {isEn
                ? "Requesting original PDFs of referenced journal articles and raw primary datasets."
                : "Meminta bukti fisik file PDF jurnal rujukan atau raw dataset primer."}
            </li>
            <li>
              {isEn
                ? "In Science & Engineering: requiring live explanations of algorithmic logic and formula derivations."
                : "Pada bidang Sains & Rekayasa: meminta penjelasan alur logika teknis atau manipulasi fungsi secara langsung."}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
