export const TRANSLATIONS = {
  id: {
    // Header & Brand
    brandTitle: "RIUPH",
    brandSubtitle: "CHECKER",
    brandBadge: "Integritas Akademik",
    univDefault: "Perguruan Tinggi / Universitas",
    editUnivTitle: "Klik untuk ubah nama institusi",
    saveUniv: "Simpan",
    cancel: "Batal",
    runCheckBtn: "Jalankan Pemeriksaan Dokumen",
    analyzingBtn: "Memindai Similarity & AI...",
    uploadDocBtn: "Unggah Dokumen",
    resetBtn: "Reset Naskah",
    
    // Presets
    presetLabel: "Standar Uji:",
    presetS1: "Program Sarjana / S1 (Maks 20% Sim, 20% AI)",
    presetS2S3: "Pascasarjana S2 & S3 (Maks 15% Sim, 10% AI)",
    presetJournal: "Jurnal / Scopus / Sinta (Maks 10% Sim, 5% AI)",
    presetFlexible: "Toleransi Fleksibel (Maks 25% Sim, 25% AI)",
    presetCustom: "Kustom / Ambang Mandiri",
    
    // Tabs
    tabSimilarity: "Academic Similarity Index",
    tabAi: "AI Writing Integrity Detector",
    tabCompliance: "Kepatuhan Integritas Akademik",
    tabDefense: "Simulasi Ujian Dewan Penguji",
    tabParafrase: "Generator 4S & Bebas Deteksi",
    
    // Academic Similarity Tab
    simTitle: "Laporan Uji Orisinalitas (Standar Academic Similarity)",
    simSubtitle: "Pencocokan k-gram dan sidik jari teks terhadap korpus repositori ilmiah dan artikel jurnal.",
    simScoreLabel: "Indeks Kesamaan (Similarity)",
    noRepoBadge: "No-Repository Mode: Naskah Anda 100% aman dan tidak disimpan ke database permanen",
    matchedSourcesTitle: "Daftar Sumber Kemiripan Terdeteksi",
    sourceName: "Sumber / Repositori",
    sourcePercent: "Persentase",
    filterSettings: "Pengaturan Filter Kemiripan:",
    excludeQuotes: "Kecualikan Kutipan Langsung (\" \")",
    excludeBiblio: "Kecualikan Daftar Pustaka / Bibliografi",
    smallMatches: "Abaikan kemiripan kata kecil (< 4 kata)",
    
    // AI Tab
    aiTitle: "Laporan Deteksi Penulisan AI (AI Writing Detector & GPTZero)",
    aiSubtitle: "Menganalisis Perplexity, Burstiness, dan Pola Sintaksis Model Bahasa AI (LLM).",
    aiScoreLabel: "Skor Penulisan AI",
    aiNaturalBadge: "Pola Penulisan Alami Manusia (Low Perplexity Burst)",
    aiSuspiciousBadge: "Terdapat Pola Kalimat Buatan AI (High Regularity)",
    aiHighlightedText: "Pratinjau Sorotan Kalimat AI",
    sentenceAnalysis: "Rincian Probabilitas per Kalimat",
    
    // Compliance Tab
    complianceTitle: "Evaluasi Integritas Akademik & Kelayakan Sidang",
    complianceSubtitle: "Pengujian kepatuhan terhadap ambang batas orisinalitas fakultas dan universitas.",
    disciplineLabel: "Disiplin Ilmu / Fakultas:",
    overallVerdict: "Vonnis Kelayakan Sidang:",
    verdictPass: "MEMENUHI SYARAT LOLOS SIDANG",
    verdictFail: "BELUM MEMENUHI SYARAT (PERLU REVISI)",
    maxAllowedSim: "Batas Maksimal Similarity:",
    maxAllowedAi: "Batas Maksimal AI Writing:",
    specialNotes: "Catatan Khusus Dewan Sidang:",
    
    // Defense Questions Tab
    defenseTitle: "Prediksi Pertanyaan Kritis Dewan Penguji (Sidang Ujian)",
    defenseSubtitle: "Simulasi pertanyaan berdasarkan titik lemah naskah (kemiripan metodologi dan susunan bahasa).",
    intentLabel: "Maksud / Tujuan Pertanyaan:",
    adviceLabel: "Rekomendasi Jawaban:",
    
    // 4S Paraphrase Tab
    parafraseTitle: "Metode 4S: Teknik Menurunkan Skor Similarity Secara Sah Menurut Standar Integritas Akademik",
    parafraseSubtitle: "Transformasi kalimat menjadi naskah ilmiah orisinal yang bebas dari indikasi plagiasi dan AI.",
    s1Title: "1. Synonym (Diksi Baku)",
    s1Desc: "Ganti padanan kata formal dan ilmiah tanpa merusak konteks makna.",
    s2Title: "2. Shuffle (Struktur Kalimat)",
    s2Desc: "Ubah pola aktif menjadi pasif atau letakkan anak kalimat di posisi depan.",
    s3Title: "3. Separate (Pecah Kalimat)",
    s3Desc: "Pecah kalimat majemuk panjang menjadi klausa padat untuk mengacaukan k-gram similarity.",
    s4Title: "4. Substantiate (Konteks Riil)",
    s4Desc: "Sematkan indikator empiris primer dan konteks spesifik studi kasus Anda.",
    btnDownloadDocx: "Unduh Naskah Bersih (DOCX Word Standar Margin 4-4-3-3 cm)",
    btnDownloadPdf: "Unduh Naskah Bersih (PDF)",
    btnCopyTransformed: "Salin Naskah Hasil Transformasi",
    copied: "Tersalin ke Clipboard!",
    
    // Upload Modal
    uploadModalTitle: "Unggah Naskah Karya Ilmiah",
    uploadModalDesc: "Pilih file naskah skripsi, tesis, atau artikel jurnal Anda.",
    dropzoneText: "Klik atau seret file skripsi ke sini",
    dropzoneTypes: "Mendukung file DOCX, PDF, dan TXT (Maks. 25 MB)",
    sampleThesesTitle: "Atau Pilih Contoh Naskah Skripsi Berbagai Fakultas:",
    closeBtn: "Tutup"
  },
  en: {
    // Header & Brand
    brandTitle: "RIUPH",
    brandSubtitle: "CHECKER",
    brandBadge: "Academic Integrity",
    univDefault: "Higher Education / University",
    editUnivTitle: "Click to edit institution name",
    saveUniv: "Save",
    cancel: "Cancel",
    runCheckBtn: "Run Academic Inspection",
    analyzingBtn: "Scanning Similarity & AI...",
    uploadDocBtn: "Upload Document",
    resetBtn: "Reset Paper",
    
    // Presets
    presetLabel: "Inspection Standard:",
    presetS1: "Undergraduate / Bachelor (Max 20% Sim, 20% AI)",
    presetS2S3: "Postgraduate Master & PhD (Max 15% Sim, 10% AI)",
    presetJournal: "Peer-Reviewed Journal / Scopus (Max 10% Sim, 5% AI)",
    presetFlexible: "Flexible Tolerance (Max 25% Sim, 25% AI)",
    presetCustom: "Custom Thresholds",
    
    // Tabs
    tabSimilarity: "Academic Similarity Index",
    tabAi: "AI Writing Integrity Detector",
    tabCompliance: "Academic Compliance & Policy",
    tabDefense: "Defense Examination Simulation",
    tabParafrase: "4S Paraphraser & Bypass Engine",
    
    // Academic Similarity Tab
    simTitle: "Originality Verification Report (Academic Similarity Standard)",
    simSubtitle: "Multi-gram matching and text fingerprinting against institutional repositories and scientific journals.",
    simScoreLabel: "Similarity Index",
    noRepoBadge: "No-Repository Mode: Your paper is 100% confidential and never stored in permanent databases",
    matchedSourcesTitle: "Detected Matched Sources & Publications",
    sourceName: "Source / Publication Repository",
    sourcePercent: "Percentage",
    filterSettings: "Similarity Filter Settings:",
    excludeQuotes: "Exclude Direct Quotations (\" \")",
    excludeBiblio: "Exclude Bibliography / References",
    smallMatches: "Ignore small word matches (< 4 words)",
    
    // AI Tab
    aiTitle: "AI Writing Detection Audit (AI Writing Detector & GPTZero Emulation)",
    aiSubtitle: "Analyzes Perplexity, Sentence Burstiness, and Large Language Model stylistic markers.",
    aiScoreLabel: "AI Generated Score",
    aiNaturalBadge: "Natural Human Writing Patterns (Low Perplexity Regularity)",
    aiSuspiciousBadge: "Synthetic AI Patterns Detected (High Uniformity)",
    aiHighlightedText: "AI Sentence Highlights Preview",
    sentenceAnalysis: "Per-Sentence Probability Breakdown",
    
    // Compliance Tab
    complianceTitle: "Academic Compliance & Thesis Defense Eligibility",
    complianceSubtitle: "Evaluation of paper conformity against university and faculty originality standards.",
    disciplineLabel: "Academic Discipline / Faculty:",
    overallVerdict: "Thesis Defense Verdict:",
    verdictPass: "ELIGIBLE FOR THESIS DEFENSE",
    verdictFail: "REVISION REQUIRED (THRESHOLD EXCEEDED)",
    maxAllowedSim: "Maximum Allowed Similarity:",
    maxAllowedAi: "Maximum Allowed AI Writing:",
    specialNotes: "Academic Examination Board Guidelines:",
    
    // Defense Questions Tab
    defenseTitle: "Anticipated Examination Committee Questions (Defense Simulator)",
    defenseSubtitle: "Simulates challenging committee questions targeting manuscript vulnerabilities and methodologies.",
    intentLabel: "Examiner Intent / Evaluation Target:",
    adviceLabel: "Recommended Answering Strategy:",
    
    // 4S Paraphrase Tab
    parafraseTitle: "4S Paraphrase Method: Lawfully Lowering Similarity Index Under Academic Integrity Guidelines",
    parafraseSubtitle: "Transforms manuscript paragraphs into pristine original academic prose free of plagiarism and AI flags.",
    s1Title: "1. Synonym (Formal Terminology)",
    s1Desc: "Substitute formal academic terms without altering substantive technical meaning.",
    s2Title: "2. Shuffle (Syntax Reordering)",
    s2Desc: "Invert passive to active voice or place subordinate clauses at the sentence forefront.",
    s3Title: "3. Separate (Clause Splitting)",
    s3Desc: "Decompose sprawling compound sentences into crisp clauses to break similarity k-grams.",
    s4Title: "4. Substantiate (Empirical Context)",
    s4Desc: "Embed specific empirical indicators, field metrics, and primary research context.",
    btnDownloadDocx: "Download Clean Paper (DOCX Word Standard 4-4-3-3 cm Margins)",
    btnDownloadPdf: "Download Clean Paper (PDF)",
    btnCopyTransformed: "Copy Transformed Clean Text",
    copied: "Copied to Clipboard!",
    
    // Upload Modal
    uploadModalTitle: "Upload Academic Paper / Manuscript",
    uploadModalDesc: "Select your thesis, dissertation, or journal research manuscript.",
    dropzoneText: "Click to select or drag manuscript file here",
    dropzoneTypes: "Supports DOCX, PDF, and TXT files (Max 25 MB)",
    sampleThesesTitle: "Or Load Benchmark Sample Theses Across Disciplines:",
    closeBtn: "Close"
  }
};
