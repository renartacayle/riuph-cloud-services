/**
 * Universal Academic Originality Certificate & Digital Receipt Generator
 * Generates official verification data and QR code for "Surat Keterangan Bebas Plagiasi"
 * and Academic Similarity-style Digital Receipt for any university or academic institution.
 */

import QRCode from "qrcode";

export async function generateCertificateData({
  studentName = "Penulis Karya Ilmiah",
  studentNim = "10000001",
  faculty = "Ilmu Komputer & Informatika",
  studyProgram = "Teknik Informatika - S1",
  thesisTitle = "Judul Karya Ilmiah / Tugas Akhir / Skripsi",
  similarityScore = 15,
  aiScore = 8,
  thresholdMax = 20,
  chapters = [],
  supervisorName = "Dosen Pembimbing Akademik",
  institutionName = "UNIVERSITAS / INSTITUT AKADEMIK",
  institutionUnit = "UPT PERPUSTAKAAN & PUSAT INTEGRITAS KARYA ILMIAH",
  institutionAddress = "Kampus Akademik Indonesia",
  institutionEmail = "perpustakaan@kampus.ac.id"
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const certNumber = `${Math.floor(100 + Math.random() * 900)}/VERITAS/INTEGRITAS/${now.getMonth() + 1}/${now.getFullYear()}`;
  const verificationHash = Buffer.from(`${studentNim}-${certNumber}-${similarityScore}`).toString("base64").substring(0, 16);
  const verifyUrl = `https://veritas-checker.org/verify/${verificationHash}`;

  // Generate QR Code data URL (navy/dark slate theme)
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    margin: 1,
    width: 140,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF"
    }
  });

  const isPassed = similarityScore <= thresholdMax;

  return {
    certNumber,
    verificationHash,
    verifyUrl,
    qrDataUrl,
    issuedDate: dateStr,
    thresholdMax,
    student: {
      name: studentName,
      nim: studentNim,
      faculty,
      studyProgram,
      thesisTitle,
      supervisor: supervisorName
    },
    results: {
      similarityScore,
      aiScore,
      isPassed,
      statusLabel: isPassed ? "MEMENUHI SYARAT (BEBAS PLAGIASI)" : "BELUM MEMENUHI SYARAT",
      chapters: chapters.length > 0 ? chapters : [
        { key: "BAB I", title: "BAB I - Pendahuluan", similarity: similarityScore },
        { key: "BAB II", title: "BAB II - Tinjauan Pustaka", similarity: similarityScore },
        { key: "BAB III", title: "BAB III - Metodologi Penelitian", similarity: similarityScore },
        { key: "BAB IV", title: "BAB IV - Hasil dan Pembahasan", similarity: similarityScore },
        { key: "BAB V", title: "BAB V - Kesimpulan", similarity: similarityScore }
      ]
    },
    institution: {
      name: institutionName,
      unit: institutionUnit,
      address: institutionAddress,
      email: institutionEmail,
      contact: "Layanan Verifikasi Integritas Akademik",
      headOfLibrary: "Kepala UPT Perpustakaan / Koordinator Verifikasi Naskah"
    }
  };
}
