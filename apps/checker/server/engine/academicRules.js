/**
 * Universal Academic Compliance Rules & Defense Simulation Engine
 * Encapsulates standard academic integrity thresholds across higher education disciplines,
 * supporting customizable university names, flexible similarity/AI thresholds, and realistic
 * defense examination questions (Dewan Penguji).
 */

export const UNIVERSAL_DISCIPLINES = [
  {
    id: "FIK",
    name: "Ilmu Komputer & Informatika",
    programs: [
      "Teknik Informatika - S1",
      "Sistem Informasi - S1",
      "Rekayasa Perangkat Lunak - S1",
      "Sains Data & AI - S1",
      "Desain Komunikasi Visual - S1",
      "Magister Ilmu Komputer - S2",
      "Doktor Ilmu Komputer - S3"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 20,
    specialNotes: "Sidang mewajibkan live demo program fungsional, review kode sumber (clean code) di IDE, dan pembuktian logika orisinalitas algoritma.",
    accentColor: "#1E40AF"
  },
  {
    id: "FEB",
    name: "Ekonomi, Bisnis & Manajemen",
    programs: [
      "Manajemen Bisnis - S1",
      "Akuntansi Keuangan - S1",
      "Ekonomi Pembangunan - S1",
      "Bisnis Digital - S1",
      "Magister Manajemen (MM) - S2"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 20,
    specialNotes: "Fokus evaluasi pada keabsahan sumber data sekunder/primer, ketepatan uji asumsi klasik, dan ketajaman interpretasi manajerial hasil riset.",
    accentColor: "#B91C1C"
  },
  {
    id: "FKES",
    name: "Kesehatan, Farmasi & Kedokteran",
    programs: [
      "Kesehatan Masyarakat - S1",
      "Farmasi Klinis - S1",
      "Ilmu Keperawatan - S1",
      "Pendidikan Dokter - S1",
      "Manajemen Informasi Kesehatan - D4"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 15,
    specialNotes: "Wajib melampirkan surat lolos kaji etik (Ethical Clearance), izin penelitian fasilitas kesehatan, dan bukti validitas-reliabilitas instrumen.",
    accentColor: "#047857"
  },
  {
    id: "FT",
    name: "Teknik & Rekayasa Industri",
    programs: [
      "Teknik Elektro - S1",
      "Teknik Industri - S1",
      "Teknik Mesin - S1",
      "Teknik Sipil - S1",
      "Mekatronika & Robotika - S1"
    ],
    maxSimilarity: 25,
    maxAiAllowed: 20,
    specialNotes: "Wajib mendemonstrasikan prototipe/alat fungsional, analisis diagram teknis, spesifikasi material, dan batas galat pengukuran instrumen.",
    accentColor: "#C2410C"
  },
  {
    id: "FIB",
    name: "Sosial, Humaniora & Bahasa",
    programs: [
      "Sastra Inggris - S1",
      "Ilmu Komunikasi - S1",
      "Hubungan Internasional - S1",
      "Psikologi - S1",
      "Sosiologi - S1"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 15,
    specialNotes: "Pemeriksaan ketat pada orisinalitas analisis wacana kualitatif, koherensi argumen nalar kritis, dan larangan alih-bahasa mesin otomatis tanpa kurasi.",
    accentColor: "#7E22CE"
  },
  {
    id: "MIPA",
    name: "Sains & Matematika",
    programs: [
      "Matematika Murni & Terapan - S1",
      "Fisika - S1",
      "Kimia - S1",
      "Biologi - S1",
      "Statistika - S1"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 15,
    specialNotes: "Evaluasi ketat pada pembuktian teorema, ketepatan rumus matematis, dan protokol eksperimental laboratorium.",
    accentColor: "#0E7490"
  },
  {
    id: "HUKUM",
    name: "Ilmu Hukum & Kebijakan",
    programs: [
      "Ilmu Hukum - S1",
      "Hukum Bisnis - S1",
      "Magister Kenotariatan - S2"
    ],
    maxSimilarity: 20,
    maxAiAllowed: 15,
    specialNotes: "Evaluasi fokus pada ketepatan hierarki peraturan perundang-undangan, presisi doktrin yurisprudensi, dan keaslian konstruksi argumen hukum.",
    accentColor: "#4338CA"
  },
  {
    id: "PASCA",
    name: "Program Pascasarjana (S2 & S3)",
    programs: [
      "Magister Terapan / Sains - S2",
      "Program Doktoral - S3"
    ],
    maxSimilarity: 15,
    maxAiAllowed: 10,
    specialNotes: "Standar integritas riset tinggi: kebaruan (novelty) wajib terbukti jelas, bebas kemiripan antar-bab (< 15%), dan wajib menyertakan target jurnal bereputasi.",
    accentColor: "#0F172A"
  }
];

// Compatibility alias
export const UDINUS_FACULTIES = UNIVERSAL_DISCIPLINES;

/**
 * Standard Presets for Academic Evaluation
 */
export const STANDARD_PRESETS = [
  { id: "S1", label: "Program Sarjana / S1 (Maks 20% Similarity, 20% AI)", maxSimilarity: 20, maxAiAllowed: 20 },
  { id: "S2_S3", label: "Pascasarjana S2 & S3 (Maks 15% Similarity, 10% AI)", maxSimilarity: 15, maxAiAllowed: 10 },
  { id: "JOURNAL", label: "Publikasi Jurnal / Sinta / Scopus (Maks 10% Similarity, 5% AI)", maxSimilarity: 10, maxAiAllowed: 5 },
  { id: "FLEXIBLE", label: "Toleransi Fleksibel (Maks 25% Similarity, 25% AI)", maxSimilarity: 25, maxAiAllowed: 25 },
  { id: "CUSTOM", label: "Kustom / Ditentukan Pengguna", maxSimilarity: 20, maxAiAllowed: 20 }
];

/**
 * Evaluates document compliance against universal or customized academic standards
 */
export function evaluateCompliance(similarityScore, aiScore, facultyId = "FIK", customOptions = {}) {
  const isEn = customOptions.lang === "en";
  const faculty = UNIVERSAL_DISCIPLINES.find(f => f.id === facultyId) || UNIVERSAL_DISCIPLINES[0];
  
  // Use custom threshold if provided, otherwise fallback to discipline standard
  const maxAllowed = customOptions.customSimilarityMax !== undefined 
    ? Number(customOptions.customSimilarityMax) 
    : faculty.maxSimilarity;

  const maxAiAllowed = customOptions.customAiMax !== undefined
    ? Number(customOptions.customAiMax)
    : faculty.maxAiAllowed;

  const institutionName = customOptions.institutionName || (isEn ? "Higher Education" : "Perguruan Tinggi");

  let similarityStatus = "PASS";
  let similarityMessage = isEn
    ? `Meets academic originality standards (${similarityScore}% ≤ limit ${maxAllowed}%)`
    : `Memenuhi standar ambang batas orisinalitas (${similarityScore}% ≤ batas ${maxAllowed}%)`;
  let statusColor = "green";

  if (similarityScore > maxAllowed + 5) {
    similarityStatus = "FAIL";
    similarityMessage = isEn
      ? `Exceeds maximum limit of ${maxAllowed}% for ${faculty.name} (recorded ${similarityScore}%). Revision and paraphrasing required!`
      : `Melebihi batas maksimal ${maxAllowed}% untuk bidang ${faculty.name} (tercatat ${similarityScore}%). Naskah wajib direvisi dan diparafrase mandiri!`;
    statusColor = "red";
  } else if (similarityScore > maxAllowed) {
    similarityStatus = "WARNING";
    similarityMessage = isEn
      ? `At tolerance threshold (${similarityScore}%, maximum ${maxAllowed}%). Requires minor rephrasing or supervisor approval.`
      : `Berada di ambang batas toleransi (${similarityScore}%, maksimal ${maxAllowed}%). Memerlukan perbaikan kalimat atau persetujuan khusus dosen pembimbing.`;
    statusColor = "orange";
  }

  let aiStatus = "PASS";
  let aiMessage = isEn
    ? `Natural human writing pattern (${aiScore}% AI ≤ limit ${maxAiAllowed}%)`
    : `Pola penulisan alami manusia (${aiScore}% AI ≤ batas ${maxAiAllowed}%)`;
  let aiColor = "green";

  if (aiScore > maxAiAllowed + 10) {
    aiStatus = "FAIL";
    aiMessage = isEn
      ? `High synthetic AI writing indicators (${aiScore}%). High risk during thesis defense examination!`
      : `Indikasi teks sintetik AI tinggi (${aiScore}%). Berisiko tinggi pada sesi uji integritas nalar skripsi oleh dewan penguji!`;
    aiColor = "red";
  } else if (aiScore > maxAiAllowed) {
    aiStatus = "WARNING";
    aiMessage = isEn
      ? `Detected potential AI-generated sentence structures (${aiScore}%). Rephrase generic clichés into personal academic style.`
      : `Terdapat indikasi susunan kalimat generatif AI (${aiScore}%). Disarankan menyusun ulang frasa klise dengan gaya bahasa ilmiah mandiri.`;
    aiColor = "orange";
  }

  const isEligibleForDefense = similarityStatus !== "FAIL" && aiStatus !== "FAIL";

  return {
    faculty: {
      ...faculty,
      maxSimilarity: maxAllowed,
      maxAiAllowed
    },
    institutionName,
    similarityScore,
    similarityStatus,
    similarityMessage,
    statusColor,
    aiScore,
    aiStatus,
    aiMessage,
    aiColor,
    isEligibleForDefense,
    isEligibleForCertificate: isEligibleForDefense,
    verdict: isEligibleForDefense
      ? (isEn ? "Passed Academic Integrity Thresholds" : "Lolos Ambang Batas Integritas Akademik")
      : (isEn ? "Revision Required / Threshold Exceeded" : "Perlu Revisi / Belum Memenuhi Syarat"),
    notes: faculty.specialNotes
  };
}

/**
 * Generates realistic questions asked by Academic Examination Board (Dewan Penguji)
 */
export function generateDefenseQuestions(plagiarismResult, aiResult, facultyId = "FIK", customOptions = {}) {
  const isEn = customOptions.lang === "en";
  const faculty = UNIVERSAL_DISCIPLINES.find(f => f.id === facultyId) || UNIVERSAL_DISCIPLINES[0];
  const questions = [];

  // Question 1: From Ketua Penguji (Methodology & Implementation Integrity)
  if (plagiarismResult.overallSimilarity > faculty.maxSimilarity) {
    questions.push({
      role: isEn ? "Head of Examination Committee" : "Ketua Dewan Penguji",
      topic: isEn ? "Manuscript Integrity & Source Similarity" : "Integritas Naskah & Sumber Kemiripan",
      question: isEn
        ? `Your manuscript similarity index is recorded at ${plagiarismResult.overallSimilarity}%, exceeding the ${faculty.maxSimilarity}% threshold. Similarity is concentrated in methodology and fundamental theory. How do you demonstrate that this research implementation and analysis are your authentic intellectual contributions rather than a compilation of prior works?`
        : `Indeks kemiripan naskah Anda tercatat ${plagiarismResult.overallSimilarity}%, melebihi ambang batas ${faculty.maxSimilarity}%. Dari laporan verifikasi, kemiripan dominan berada pada rujukan metodologi dan konsep dasar. Bagaimana Anda membuktikan bahwa implementasi dan analisis ini adalah kontribusi orisinal karya Anda, bukan sekadar kompilasi dokumen terdahulu?`,
      intent: isEn
        ? "Tests academic honesty and the candidate's ability to clearly articulate original contributions beyond cited literature."
        : "Menguji kejujuran akademik dan kemampuan mahasiswa menjelaskan kontribusi mandiri di luar sitasi literatur.",
      advice: isEn
        ? "Firmly delineate the boundaries of your original contribution, highlight primary data you collected yourself, and clarify how your method differs from prior literature."
        : "Tunjukkan secara tegas batas kontribusi orisinal penelitian Anda, data primer yang Anda kumpulkan sendiri, serta pembeda tegas metode Anda dari rujukan terdahulu."
    });
  } else {
    questions.push({
      role: isEn ? "Head of Examination Committee" : "Ketua Dewan Penguji",
      topic: isEn ? "Methodology Justification & Research Novelty" : "Justifikasi Metodologi & Kebaruan Riset",
      question: isEn
        ? `Why did you select this methodological framework over state-of-the-art alternatives? What empirical advantages and limitations did you discover during real-world implementation?`
        : `Mengapa Anda memilih pendekatan metodologis dan algoritma/metode ini dibandingkan alternatif metode mutakhir lainnya? Apa keunggulan serta batasan empiris yang Anda temukan saat menerapkannya pada data riil?`,
      intent: isEn
        ? "Assesses theoretical mastery and scientific justification in research design."
        : "Menguji penguasaan landasan teoretis dan justifikasi ilmiah dalam menentukan desain penelitian.",
      advice: isEn
        ? "Provide objective reasons for method selection based on dataset properties or problem constraints, citing comparative metrics where available."
        : "Jelaskan alasan objektif pemilihan metode berdasarkan karakteristik dataset atau karakteristik masalah yang diteliti, sertakan data komparasi jika ada."
    });
  }

  // Question 2: From Anggota Penguji (AI Writing & Algorithmic / Deep Understanding)
  if (aiResult.aiPercentage > 20) {
    questions.push({
      role: isEn ? "Examiner 1 (Subject Matter Expert)" : "Anggota Penguji (Ahli Substansi)",
      topic: isEn ? "Deep Conceptual Understanding & Text Authenticity" : "Uji Pemahaman Mendalam & Integritas Teks",
      question: isEn
        ? `Our diagnostic scan flagged ${aiResult.aiPercentage}% synthetic text and standardized transition markers. Can you explain verbally without notes, the step-by-step logic, internal mechanisms, and rationale behind each equation or formulation in Chapter III?`
        : `Kami mencatat adanya indikasi bahasa sintetik dan frasa normatif sebesar ${aiResult.aiPercentage}% pada naskah ini. Bisakah Anda menjelaskan secara lisan tanpa membaca teks, bagaimana mekanisme kerja internal, alur logika bertahap, dan rasionalisasi setiap persamaan atau formulasi yang Anda tulis di Bab III?`,
      intent: isEn
        ? "Verifies whether the student thoroughly comprehends the technical mechanics or merely relied on AI-generated prose."
        : "Memverifikasi apakah mahasiswa benar-benar memahami materi atau hanya mengandalkan teks yang digenerasi oleh AI.",
      advice: isEn
        ? "Use visual analogies or whiteboard diagrams. Walk the committee step-by-step from input preprocessing to final algorithmic output."
        : "Gunakan analogi visual atau sketsa alur kerja di papan tulis. Tunjukkan bahwa Anda menguasai proses langkah demi langkah dari masukan (input) hingga keluaran (output)."
    });
  } else {
    questions.push({
      role: isEn ? "Examiner 1 (Subject Matter Expert)" : "Anggota Penguji (Ahli Substansi)",
      topic: isEn ? "Critical Evaluation & Results Validation" : "Evaluasi Kritis & Validasi Hasil",
      question: isEn
        ? `In the Results & Discussion section, how did you ensure reported performance metrics are free from selection bias or overfitting? What was the most unexpected challenge during data collection?`
        : `Pada bagian Hasil dan Pembahasan, bagaimana Anda memvalidasi bahwa metrik performa atau temuan yang dilaporkan bebas dari bias seleksi atau overfitting? Apa kendala paling tidak terduga saat pengumpulan data?`,
      intent: isEn
        ? "Evaluates empirical rigor and candidate awareness of potential error margins."
        : "Menguji ketelitian pengujian empiris dan pemahaman terhadap potensi galat (error margins).",
      advice: isEn
        ? "Explain cross-validation strategies, test performance on unseen holdout datasets, and demonstrate transparency regarding field challenges."
        : "Jelaskan skenario pengujian dengan data tak terlihat (unseen data / uji validitas silang), serta jelaskan transparansi kendala lapangan yang berhasil Anda atasi."
    });
  }

  // Question 3: From Dosen Pembimbing (Future Work & Impact)
  questions.push({
    role: isEn ? "Academic Supervisor / Co-Examiner" : "Dosen Pembimbing / Penguji Pendamping",
    topic: isEn ? "Research Limitations & Future Directions" : "Keterbatasan Penelitian & Arah Pengembangan",
    question: isEn
      ? "What is the single greatest limitation of this research, and what concrete technical recommendation would you offer to subsequent researchers continuing this topic?"
      : "Apa kendala terbesar yang Anda hadapi selama pengerjaan penelitian ini, dan jika ada peneliti berikutnya yang ingin melanjutkan topik ini, apa rekomendasi teknis konkrit yang paling penting?",
    intent: isEn
      ? "Assesses critical maturity and awareness of project scope boundaries."
      : "Menilai kedewasaan berpikir kritis peneliti terhadap limitasi dari cakupan penelitian yang telah dikerjakan.",
    advice: isEn
      ? "State research boundaries candidly and propose actionable, well-reasoned technical next steps."
      : "Sampaikan keterbatasan penelitian secara jujur, objektif, dan tawarkan solusi teknis yang jelas bagi penelitian lanjutan."
  });

  return questions;
}


/**
 * Universal Paraphrase Suggestions Helper
 */
export function generateParaphraseSuggestions(sentence) {
  if (!sentence || sentence.length < 10) {
    return { error: "Kalimat terlalu pendek untuk dianalisis." };
  }

  return {
    original: sentence,
    method: "4S (Synonym, Shuffle, Separate, Substantiate)",
    tip: "Ganti struktur kalimat dari pasif ke aktif (atau sebaliknya), pecah klausa bertingkat, dan kombinasikan dengan argumen kontekstual spesifik pada data penelitian Anda.",
    steps: [
      { step: "Synonym", rule: "Ganti istilah umum dengan leksikon ilmiah yang setara." },
      { step: "Shuffle", rule: "Ubah urutan klausa utama dan klausa pendukung untuk memutus n-gram." },
      { step: "Separate", rule: "Pecah kalimat majemuk panjang yang monoton menjadi 2 kalimat ringkas." },
      { step: "Substantiate", rule: "Sisipkan indikator empiris atau satuan ukur spesifik dari temuan riset Anda." }
    ]
  };
}
