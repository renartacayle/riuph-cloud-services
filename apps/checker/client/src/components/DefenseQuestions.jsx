import React, { useState } from "react";
import { GraduationCap, MessageSquare, AlertCircle, CheckCircle, HelpCircle, ChevronDown, ChevronUp, Code2, Sparkles, UploadCloud } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function DefenseQuestions({ questions = [], facultyId, hasResult = false, onTrySample, onOpenUpload }) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [openIndex, setOpenIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState({});

  const defaultQuestions = isEn
    ? [
        {
          role: "Committee Chair",
          topic: "Methodology Justification & Novelty",
          question: "Why did you select this methodological framework and algorithm over alternative contemporary approaches? What empirical limitations did you observe when deploying it on real-world datasets?",
          advice: "Explain objective criteria based on dataset traits or specific domain constraints; cite comparative benchmark metrics if available."
        },
        {
          role: "Subject Matter Examiner",
          topic: "Conceptual Mastery & Text Integrity",
          question: "Can you orally explain—without reading the slides—the step-by-step internal mechanics, algorithmic logic, and mathematical formulations presented in Chapter III?",
          advice: "Use visual analogies or diagram the pipeline step-by-step on the whiteboard. Demonstrate commanding mastery from raw input to output."
        },
        {
          role: "Academic Advisor / Co-Examiner",
          topic: "Research Limitations & Future Roadmap",
          question: "What was the most significant technical hurdle you encountered during this investigation, and what concrete recommendations do you offer for future researchers extending your findings?",
          advice: "Present limitations candidly and objectively, and offer clear technical solutions for future research."
        }
      ]
    : [
        {
          role: "Ketua Dewan Penguji",
          topic: "Justifikasi Metodologi & Kebaruan Riset",
          question: "Mengapa Anda memilih pendekatan metodologis dan algoritma/metode ini dibandingkan alternatif metode mutakhir lainnya? Apa keunggulan serta batasan empiris yang Anda temukan saat menerapkannya pada data riil?",
          advice: "Jelaskan alasan objektif pemilihan metode berdasarkan karakteristik dataset atau karakteristik masalah yang diteliti, sertakan data komparasi jika ada."
        },
        {
          role: "Anggota Penguji (Ahli Substansi)",
          topic: "Uji Pemahaman Mendalam & Integritas Teks",
          question: "Bisakah Anda menjelaskan secara lisan tanpa membaca teks, bagaimana mekanisme kerja internal, alur logika bertahap, dan rasionalisasi setiap persamaan atau formulasi yang Anda tulis di Bab III?",
          advice: "Gunakan analogi visual atau sketsa alur kerja di papan tulis. Tunjukkan bahwa Anda menguasai proses langkah demi langkah dari masukan (input) hingga keluaran (output)."
        },
        {
          role: "Dosen Pembimbing / Penguji Pendamping",
          topic: "Keterbatasan Penelitian & Arah Pengembangan",
          question: "Apa kendala terbesar yang Anda hadapi selama pengerjaan penelitian ini, dan jika ada peneliti berikutnya yang ingin melanjutkan topik ini, apa rekomendasi teknis konkrit yang paling penting?",
          advice: "Sampaikan keterbatasan penelitian secara jujur, objektif, dan tawarkan solusi teknis yang jelas bagi penelitian lanjutan."
        }
      ];

  const displayQuestions = (questions && questions.length > 0) ? questions : defaultQuestions;

  const handleAnswerChange = (idx, text) => {
    setPracticeAnswers({
      ...practiceAnswers,
      [idx]: text
    });
  };

  return (
    <div className="space-y-6">
      {/* Notice if viewing in preview mode */}
      {!hasResult && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-900 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>{isEn ? "Question Simulation Preview Mode:" : "Mode Pratinjau Pertanyaan:"}</strong>{" "}
              {isEn
                ? "Showing standard defense examination questions. Upload your manuscript to generate customized questions tailored to your paper's exact vulnerabilities."
                : "Menampilkan simulasi pertanyaan sidang standar. Unggah naskah Anda untuk menghasilkan pertanyaan khusus yang disesuaikan persis dengan titik rawan naskah Anda."}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {onTrySample && (
              <button
                type="button"
                onClick={onTrySample}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {isEn ? "⚡ Try Sample Paper" : "⚡ Coba Contoh Naskah"}
              </button>
            )}
            {onOpenUpload && (
              <button
                type="button"
                onClick={onOpenUpload}
                className="bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-300 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                {isEn ? "Upload Manuscript File" : "Upload File Naskah"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl shadow-md p-6 border-b-4 border-amber-400">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              <h3 className="font-extrabold text-lg sm:text-xl">
                {isEn
                  ? "Thesis Defense Examination Simulation (Academic Committee)"
                  : "Simulasi Ujian Sidang Skripsi (Dewan Penguji Akademik)"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isEn
                ? "Critical anticipated questions formulated by the examination board (Chair, Examiner, Advisor) targeting vulnerable manuscript sections, citation overlaps, and AI phrases."
                : "Daftar pertanyaan kritis yang diprediksi akan diajukan oleh Dewan Penguji (Ketua Penguji, Anggota Penguji, dan Dosen Pembimbing) berdasarkan titik rawan naskah, kemiripan referensi, serta kalimat terindikasi AI."}
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2 text-xs">
            <span className="text-slate-400 block">
              {isEn ? "Defense Examination Duration:" : "Durasi Ujian Sidang:"}
            </span>
            <span className="font-bold text-amber-300 text-sm">
              {isEn ? "~45 - 60 Minutes" : "~45 - 60 Menit"}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Questions Accordion */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-extrabold text-slate-800 text-base">
              {isEn
                ? `Anticipated Committee Questions (${displayQuestions.length} Questions)`
                : `Prediksi Pertanyaan Sidang (${displayQuestions.length} Pertanyaan)`}
            </h4>
            <p className="text-xs text-slate-500">
              {isEn
                ? "Click each question to view committee-preferred response strategies and practice mock defense answers."
                : "Klik pada tiap pertanyaan untuk melihat panduan strategi menjawab dan berlatih simulasi jawaban."}
            </p>
          </div>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
            Real-Time Analysis
          </span>
        </div>

        <div className="space-y-3">
          {displayQuestions.map((q, idx) => {
            const isOpen = openIndex === idx;
            const role = q.role || (isEn ? "Examination Board" : "Dewan Penguji");
            const topic = q.topic || q.category || (isEn ? "Paper Integrity" : "Integritas Naskah");

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? "border-indigo-400 bg-indigo-50/20 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-950">{role}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {topic}
                        </span>
                      </div>
                      <h5 className="font-semibold text-slate-800 text-xs sm:text-sm leading-snug">
                        "{q.question}"
                      </h5>
                    </div>
                  </div>

                  <div className="shrink-0 text-slate-400 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 text-xs animate-in fade-in duration-100">
                    {/* Strategy Tip */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-amber-900">
                      <span className="font-bold flex items-center space-x-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {isEn
                            ? "Committee-Preferred Answering Strategy:"
                            : "Strategi Menjawab yang Disukai Dewan Penguji:"}
                        </span>
                      </span>
                      <p className="text-[11px] leading-relaxed text-amber-800">
                        {q.advice || (
                          isEn
                            ? "Provide concise, data-driven answers grounded in empirical findings from Chapter IV rather than speculative generalities."
                            : "Sampaikan jawaban secara lugas berbasis data empiris pada Bab IV skripsi Anda, bukan sekadar asumsi atau teori umum."
                        )}
                      </p>
                    </div>

                    {/* Interactive Practice Box */}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        {isEn
                          ? "Practice Your Answer Notes (Defense Simulator):"
                          : "Latihan Catatan Jawaban Anda (Simulasi Sidang):"}
                      </label>
                      <textarea
                        rows={3}
                        value={practiceAnswers[idx] || ""}
                        onChange={(e) => handleAnswerChange(idx, e.target.value)}
                        placeholder={
                          isEn
                            ? "Draft your structured response points here for rehearsal..."
                            : "Ketik poin-poin argumen jawaban Anda di sini untuk latihan..."
                        }
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Secret Tips for Passing Academic Defense */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-6 space-y-3">
        <h4 className="font-extrabold text-slate-800 text-sm flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-emerald-600" />
          <span>
            {isEn ? "3 Golden Rules to Ace Your Thesis Defense:" : "3 Aturan Emas Lolos Sidang Skripsi & Tugas Akhir:"}
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800 block mb-1">
              {isEn ? "1. Master Technical Logic & Code" : "1. Bedah Karya & Alur Logika"}
            </span>
            <p className="text-slate-600 leading-snug">
              {isEn
                ? "Master every line of code, formula, or architecture in your paper. Examiners verify whether you genuinely built it or merely copied."
                : "Kuasai setiap baris kode, rumus, atau model yang tertulis di naskah. Dewan penguji menguji apakah Anda benar-benar pembuatnya atau hanya menyalin."}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800 block mb-1">
              {isEn ? "2. Know Your Citations Deeply" : "2. Pahami Sitasi Sendiri"}
            </span>
            <p className="text-slate-600 leading-snug">
              {isEn
                ? "Keep offline PDF copies of primary referenced papers. If an examiner challenges a citation, open it on your laptop in seconds."
                : "Simpan salinan PDF jurnal rujukan utama di folder laptop Anda. Jika penguji menanyakan keabsahan rujukan, Anda bisa langsung membukanya dalam hitungan detik."}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800 block mb-1">
              {isEn ? "3. Academic Humility & Decorum" : "3. Sikap Ilmiah & Keterbukaan"}
            </span>
            <p className="text-slate-600 leading-snug">
              {isEn
                ? "Accept committee feedback with gracious academic etiquette. Note down every revision clearly in your official defense log."
                : "Terima revisi dengan etika akademik yang santun. Catat seluruh masukan dewan penguji secara runtut pada lembar notulensi revisi sidang."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
