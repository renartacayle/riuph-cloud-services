import React, { useState, useEffect } from "react";
import { Printer, Download, CheckCircle, ShieldCheck, QrCode, AlertCircle, Building2, FileCheck2, Sparkles, UploadCloud } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function CertificateModal({
  studentInfo = {},
  similarityScore = 0,
  aiScore = 0,
  chapters = [],
  customThresholds = { maxSimilarity: 20, maxAiAllowed: 20 },
  hasResult = false,
  onTrySample,
  onOpenUpload,
  onClose
}) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certFormat, setCertFormat] = useState("academic"); // 'academic' | 'academic_receipt'

  const universityName = studentInfo.universityName || (isEn ? "Higher Education / University" : "Perguruan Tinggi / Universitas");
  const maxSimilarityAllowed = customThresholds?.maxSimilarity ?? 20;
  
  // Use representative sample score for preview if not yet analyzed
  const effectiveSimilarity = hasResult ? similarityScore : 12;
  const effectiveAi = hasResult ? aiScore : 4;
  const isEligible = effectiveSimilarity <= maxSimilarityAllowed;

  useEffect(() => {
    fetchCertificate();
  }, [studentInfo, similarityScore, aiScore, customThresholds, hasResult, lang]);

  const fetchCertificate = async () => {
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentInfo.name || (isEn ? "Student / Author" : "Mahasiswa / Peneliti"),
          studentNim: studentInfo.nim || "10000001",
          faculty: studentInfo.facultyName || (isEn ? "Computer Science & Informatics" : "Ilmu Komputer & Informatika"),
          studyProgram: studentInfo.studyProgram || (isEn ? "Undergraduate (S1)" : "Program Sarjana (S1)"),
          thesisTitle: studentInfo.title || (isEn ? "Design and Implementation of AI-Powered Academic Integrity System" : "Rancang Bangun Sistem Informasi Berbasis Kecerdasan Buatan"),
          similarityScore: effectiveSimilarity,
          aiScore: effectiveAi,
          thresholdMax: maxSimilarityAllowed,
          chapters,
          supervisorName: studentInfo.supervisor || (isEn ? "Academic Advisor" : "Dosen Pembimbing Akademik"),
          institutionName: universityName,
          institutionUnit: isEn ? "ACADEMIC INTEGRITY & LIBRARY SERVICES" : "UPT PERPUSTAKAAN & PUSAT INTEGRITAS KARYA ILMIAH",
          lang
        })
      });
      const data = await res.json();
      setCertData(data.certificate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (!certData) return;
    const doc = new jsPDF();
    const instUpper = universityName.toUpperCase();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(instUpper, 105, 20, { align: "center" });
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(isEn ? "ACADEMIC INTEGRITY & LIBRARY SERVICES" : "UPT PERPUSTAKAAN & PUSAT INTEGRITAS KARYA ILMIAH", 105, 26, { align: "center" });
    doc.setFontSize(9);
    doc.text(isEn ? "Self-Service Manuscript Originality & Thesis Verification" : "Layanan Mandiri Pengujian Orisinalitas & Verifikasi Naskah Tugas Akhir", 105, 31, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, 34, 190, 34);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(isEn ? "ACADEMIC ORIGINALITY CLEARANCE CERTIFICATE" : "SURAT KETERANGAN BEBAS PLAGIASI & KEASLIAN KARYA ILMIAH", 105, 43, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`${isEn ? "Verification No" : "Nomor Verifikasi"}: ${certData.certNumber}`, 105, 48, { align: "center" });

    doc.setFontSize(10);
    doc.text(`${isEn ? "Author Name" : "Nama Mahasiswa"}: ${certData.student.name}`, 20, 60);
    doc.text(`${isEn ? "Student ID / NIM" : "NIM / Identitas"}: ${certData.student.nim}`, 20, 66);
    doc.text(`${isEn ? "Faculty" : "Fakultas / Bidang"}: ${certData.student.faculty}`, 20, 72);
    doc.text(`${isEn ? "Study Program" : "Program Studi"}: ${certData.student.studyProgram}`, 20, 78);
    const safeTitle = (certData.student.thesisTitle || "Research Manuscript").substring(0, 75);
    doc.text(`${isEn ? "Title" : "Judul Naskah"}: ${safeTitle}...`, 20, 84);

    doc.setFont("helvetica", "bold");
    doc.text(isEn ? "ACADEMIC SIMILARITY & AI AUDIT RESULTS:" : "HASIL PENGUJIAN ORISINALITAS KARYA ILMIAH & AI:", 20, 96);
    doc.setFont("helvetica", "normal");
    doc.text(`• Overall Similarity Index: ${certData.results.similarityScore}% (${isEn ? "Threshold" : "Ambang Batas Institusi"}: ≤ ${maxSimilarityAllowed}%)`, 25, 103);
    doc.text(`• ${isEn ? "AI Writing Content" : "Indikasi AI Writing (Generative AI)"}: ${certData.results.aiScore}% (${isEn ? "Tolerance" : "Toleransi"}: ≤ ${customThresholds?.maxAiAllowed ?? 20}%)`, 25, 109);
    doc.text(`• ${isEn ? "Verdict" : "Kesimpulan"}: ${certData.results.statusLabel}`, 25, 115);

    doc.text(isEn ? `Certified to have met academic originality standards at ${universityName}.` : `Dinyatakan telah memenuhi standar etika orisinalitas dan integritas akademik di ${universityName}.`, 20, 130);
    doc.text(`${isEn ? "Issued on" : "Diterbitkan pada"}: ${certData.issuedDate}`, 130, 150);
    doc.text(isEn ? "Academic Registrar / Librarian" : "Pustakawan / Petugas Verifikasi", 130, 156);
    doc.text(isEn ? "(Digitally Certified Veritas System)" : "(Tervalidasi Digital Veritas System)", 130, 180);

    const safeNim = (certData.student.nim || "Manuscript").replace(/[^a-zA-Z0-9_\-]/g, "_");
    doc.save(`Plagiarism_Clearance_Certificate_${safeNim}.pdf`);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 text-sm">
        {isEn
          ? "Processing and generating Originality Clearance Certificate..."
          : "Sedang memproses dan menerbitkan Surat Keterangan Orisinalitas..."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notice if viewing in preview mode */}
      {!hasResult && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-900 shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>{isEn ? "Certificate Preview Mode:" : "Mode Pratinjau Sertifikat:"}</strong>{" "}
              {isEn
                ? "This is a certificate preview. Upload your manuscript or test a demo paper to populate the certificate with live metrics and verification signatures."
                : "Ini adalah pratinjau format surat keterangan. Unggah dokumen naskah Anda atau coba contoh naskah instan untuk mengisi sertifikat dengan data dan skor nyata."}
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

      {/* Action Buttons & Format Toggle (Hidden on Print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h4 className="font-extrabold text-slate-800 text-base flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>
              {isEn ? "Originality Certificate & Manuscript Clearance" : "Sertifikat Orisinalitas & Verifikasi Naskah"}
            </span>
          </h4>
          <p className="text-xs text-slate-500">
            {isEn
              ? `Official academic integrity clearance certificate for thesis defense and graduation eligibility at ${universityName}.`
              : `Dokumen resmi bebas plagiasi untuk persyaratan pendaftaran Ujian Sidang Skripsi / Yudisium di ${universityName}.`}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Format Toggle */}
          <div className="flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs mr-2">
            <button
              type="button"
              onClick={() => setCertFormat("academic")}
              className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                certFormat === "academic" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isEn ? "Academic Format" : "Format Kampus"}
            </button>
            <button
              type="button"
              onClick={() => setCertFormat("academic_receipt")}
              className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                certFormat === "academic_receipt" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Digital Receipt
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-lg transition text-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isEn ? "Print" : "Cetak"}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg transition text-xs shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isEn ? "Download Official PDF" : "Unduh PDF Resmi"}</span>
          </button>
        </div>
      </div>

      {hasResult && !isEligible && (
        <div className="no-print p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-sm">
              {isEn ? `Attention: Similarity Score is ${effectiveSimilarity}%` : `Perhatian: Skor Similarity Masih ${effectiveSimilarity}%`}
            </span>
            <p className="mt-1 leading-snug">
              {isEn
                ? `Maximum allowed threshold is ${maxSimilarityAllowed}%. This certificate shows status "REVISION REQUIRED". Please use the 4S Paraphrase Assistant to remodel your text before defense submission.`
                : `Batas toleransi maksimal yang ditentukan adalah ${maxSimilarityAllowed}%. Surat ini menunjukkan status "BELUM MEMENUHI SYARAT". Silakan gunakan fitur Asisten Parafrase 4S untuk merombak teks Anda sebelum diajukan ke dewan penguji.`}
            </p>
          </div>
        </div>
      )}

      {/* FORMAT 1: Academic Institution Certificate */}
      {certFormat === "academic" ? (
        <div className="bg-white p-4 sm:p-8 sm:p-12 max-w-4xl mx-auto rounded-xl border border-slate-300 shadow-md font-academic text-slate-900 print:shadow-none print:border-none print:p-0 overflow-x-hidden">
          {/* Dynamic Kop Surat Resmi */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center relative">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 mb-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-800 to-slate-900 border-2 border-amber-400 flex items-center justify-center font-black text-lg sm:text-xl text-amber-300 shadow-sm tracking-wider shrink-0">
                VA
              </div>
              <div className="min-w-0 font-sans">
                <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-wide uppercase">
                  {universityName}
                </h2>
                <h3 className="text-xs sm:text-base font-bold text-slate-700">
                  {isEn ? "ACADEMIC INTEGRITY & LIBRARY SERVICES" : "UPT PERPUSTAKAAN & PUSAT INTEGRITAS KARYA ILMIAH"}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal">
                  {isEn ? "Originality Verification for Theses, Dissertations, and Research Articles" : "Layanan Verifikasi Orisinalitas Naskah Ilmiah, Skripsi, Tesis, dan Disertasi"}
                </p>
                <p className="text-[9px] sm:text-[10px] text-indigo-700 font-mono">
                  {isEn ? "Digital Verification Framework: Veritas Academic Integrity Framework" : "Sistem Validasi Digital: Veritas Academic Integrity Framework"}
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center my-6">
            <h3 className="font-extrabold text-base sm:text-lg underline underline-offset-4 tracking-wide font-sans">
              {isEn ? "ACADEMIC ORIGINALITY CLEARANCE CERTIFICATE" : "SURAT KETERANGAN BEBAS PLAGIASI"}
            </h3>
            <p className="text-xs font-mono text-slate-600 mt-1">
              {isEn ? "Certificate No" : "Nomor"}: {certData?.certNumber}
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 font-sans">
            <p>
              {isEn
                ? `The Academic Integrity Verification Board and Library Services of ${universityName} hereby certify that the manuscript specified below:`
                : `Pusat Pelaksana Uji Integritas Akademik dan Perpustakaan ${universityName} menerangkan bahwa naskah karya ilmiah / tugas akhir di bawah ini:`}
            </p>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1.5 text-xs font-sans">
              <div className="grid grid-cols-3">
                <span className="text-slate-500 font-medium">
                  {isEn ? "Author / Student Name" : "Nama Penulis / Mahasiswa"}
                </span>
                <span className="col-span-2 font-bold text-slate-800">: {certData?.student.name}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-slate-500 font-medium">
                  {isEn ? "Student ID / NIM" : "Nomor Induk / Identitas (NIM)"}
                </span>
                <span className="col-span-2 font-mono font-bold text-slate-800">: {certData?.student.nim}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-slate-500 font-medium">
                  {isEn ? "Faculty / Major" : "Fakultas / Program Studi"}
                </span>
                <span className="col-span-2 font-medium text-slate-800">: {certData?.student.faculty} / {certData?.student.studyProgram}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-slate-500 font-medium">
                  {isEn ? "Manuscript Title" : "Judul Karya Ilmiah"}
                </span>
                <span className="col-span-2 font-semibold text-slate-900">: "{certData?.student.thesisTitle || (isEn ? 'Research Manuscript' : 'Karya Ilmiah')}"</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-slate-500 font-medium">
                  {isEn ? "Academic Advisor" : "Dosen Pembimbing"}
                </span>
                <span className="col-span-2 font-medium text-slate-800">: {certData?.student.supervisor}</span>
              </div>
            </div>

            <p>
              {isEn
                ? 'Has undergone comprehensive originality testing via the Academic Similarity Engine and AI Writing Integrity Detector under "No Repository" mode, yielding the following results:'
                : 'Telah dilakukan uji orisinalitas naskah menggunakan sistem Academic Similarity Engine dan AI Writing Integrity Detector dengan mode No Repository, dengan hasil sebagai berikut:'}
            </p>

            {/* Results Summary Box */}
            <div className="border border-slate-300 rounded-lg p-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block mb-1">
                    {isEn ? "Originality Test Result (Similarity):" : "Hasil Uji Orisinalitas (Similarity):"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-black ${isEligible ? "text-emerald-600" : "text-red-600"}`}>
                      {certData?.results.similarityScore}%
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({isEn ? "Max Threshold" : "Ambang Batas Maksimal"}: ≤ {maxSimilarityAllowed}%)
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">
                    {isEn ? "AI Writing Content (Generative AI):" : "Indikasi AI Writing (Generative AI):"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black text-cyan-700">
                      {certData?.results.aiScore}%
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({isEn ? "Tolerance" : "Toleransi"}: ≤ {customThresholds?.maxAiAllowed ?? 20}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="text-slate-500 text-[11px] block">
                  {isEn ? "Final Clearance Verdict:" : "Kesimpulan Akhir Pemeriksaan:"}
                </span>
                <span className={`text-sm font-black tracking-wide ${isEligible ? "text-emerald-700" : "text-red-700"}`}>
                  {certData?.results.statusLabel}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              {isEn
                ? "This certificate is officially issued to serve as formal verification for Thesis Defense registration, Library Clearance, and Graduation (Yudisium) eligibility."
                : "Demikian surat keterangan ini diterbitkan secara sah untuk dapat dipergunakan sebagaimana mestinya sebagai syarat kelengkapan Ujian Sidang Pendadaran, Bebas Perpustakaan, dan pendaftaran Yudisium."}
            </p>
          </div>

          {/* Signature & QR Code Verification Section */}
          <div className="mt-10 pt-4 border-t border-slate-200 flex flex-wrap items-end justify-between gap-6 font-sans">
            <div className="flex items-center space-x-3">
              {certData?.qrDataUrl ? (
                <img src={certData.qrDataUrl} alt="QR Verification" className="w-24 h-24 border p-1 rounded bg-white shadow-xs" />
              ) : (
                <QrCode className="w-20 h-20 text-slate-400" />
              )}
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <span className="font-bold text-slate-700 block">
                  {isEn ? "Digital Verification:" : "Verifikasi Digital:"}
                </span>
                <span className="font-mono block">Hash: {certData?.verificationHash}</span>
                <span className="block">{isEn ? "Issued" : "Diterbitkan"}: {certData?.issuedDate}</span>
                <span className="text-indigo-700 font-semibold block">
                  {isEn ? "Online Validity Registered" : "Validitas Terdaftar Online"}
                </span>
              </div>
            </div>

            <div className="text-right text-xs text-slate-800 space-y-1">
              <p>{isEn ? "Issued on" : "Diterbitkan pada"}: {certData?.issuedDate}</p>
              <p className="font-bold text-slate-900">
                {isEn ? "Academic Integrity Verification Officer," : "Koordinator Pengujian Integritas Akademik,"}
              </p>
              <div className="h-16 flex items-center justify-end">
                <div className="border-2 border-dashed border-indigo-500 text-indigo-700 font-black text-[10px] px-3 py-1 rounded rotate-[-4deg] opacity-80 uppercase">
                  VERITAS ACADEMIC • VERIFIED
                </div>
              </div>
              <p className="font-bold underline text-slate-900">
                {isEn ? "Chief Academic Registrar / Librarian" : "Pustakawan / Petugas Verifikasi"}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">ID Verifikator: 2024.VERIF.881</p>
            </div>
          </div>
        </div>
      ) : (
        /* FORMAT 2: Official Digital Academic Receipt */
        <div className="bg-white p-8 sm:p-12 max-w-4xl mx-auto rounded-xl border border-slate-300 shadow-md font-sans text-slate-900">
          <div className="border-b-2 border-red-600 pb-4 mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                <span className="text-indigo-600 text-2xl font-black">RIUPH</span>
                <span className="text-slate-400 font-light">|</span>
                <span className="text-sm font-semibold text-slate-600">Digital Receipt</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">This digital receipt confirms that your paper has been verified for academic similarity & AI integrity.</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full">
                SUBMISSION CONFIRMED
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[11px]">Submission Author:</span>
                <span className="font-bold text-slate-800">{certData?.student.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Submission ID:</span>
                <span className="font-mono font-bold text-slate-800">{certData?.verificationHash}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Submission Date:</span>
                <span className="font-semibold text-slate-800">{certData?.issuedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Institution:</span>
                <span className="font-semibold text-slate-800">{universityName}</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <h4 className="font-bold text-sm text-slate-800">Originality Report Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-red-50/60 rounded border border-red-200">
                  <span className="text-xs font-semibold text-red-900 block">Overall Similarity Index:</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-black text-red-600">{certData?.results.similarityScore}%</span>
                    <span className="text-xs text-slate-600">Threshold: ≤ {maxSimilarityAllowed}%</span>
                  </div>
                </div>

                <div className="p-3 bg-cyan-50/60 rounded border border-cyan-200">
                  <span className="text-xs font-semibold text-cyan-900 block">AI Writing Detection:</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-black text-cyan-700">{certData?.results.aiScore}%</span>
                    <span className="text-xs text-slate-600">Tolerance: ≤ {customThresholds?.maxAiAllowed ?? 20}%</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Repository Mode: No Repository (Student work protected). Processed through Winnowing Karp-Rabin Fingerprint Algorithm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
