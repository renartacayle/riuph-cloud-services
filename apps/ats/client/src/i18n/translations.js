export const TRANSLATIONS = {
  id: {
    // Header & Meta
    appTitle: "ATS Master HRD",
    appSubtitle: "Sistem Audit & Deteksi CV Standar Workday, Greenhouse, Taleo, Jobscan & Glints/Jobstreet",
    precisionTag: "Kalibrasi Presisi: Δ Max ≤ 5% (Tercapai 0%)",
    newTestButton: "Uji Dokumen Baru",
    
    // Hero
    heroTitle: "Cek Kesiapan CV Terhadap Mesin ATS & Review HRD",
    heroDesc: "Uji kecocokan resume Anda terhadap algoritma penyaringan otomatis (Workday, Greenhouse, Taleo, Glints) sebelum melamar. Deteksi format rusak, kesenjangan kata kunci, dan optimalkan dampak pencapaian kerja dengan formula Google XYZ.",
    
    // Tabs
    tabOverview: "Ringkasan Skor",
    tabKeywords: "Matriks Kata Kunci",
    tabImpact: "Dampak Google XYZ",
    tabMultiAts: "Multi-ATS & 6 Detik",
    tabOptimizer: "Optimasi Kalimat",
    tabHygiene: "Klise & Kebersihan",
    tabInspector: "Inspeksi Dokumen",
    
    // Input Section
    inputTitle: "Unggah CV atau Tempel Teks Resume",
    inputSubtitle: "Pilih salah satu metode input dan sesuaikan dengan target lowongan kerja.",
    modeUpload: "Unggah File CV (PDF / DOCX)",
    modePaste: "Tempel Teks Resume",
    dragDropText: "Tarik & letakkan file CV Anda di sini, atau",
    browseButton: "Pilih Dokumen",
    fileSupported: "Mendukung format PDF, DOCX, dan TXT (Maks. 25 MB)",
    fileSelected: "File terpilih:",
    changeFile: "Ganti file",
    cvTextPlaceholder: "Tempelkan teks lengkap resume/CV Anda di sini (Riwayat kerja, pendidikan, keterampilan, dll)...",
    jdTitle: "Deskripsi Pekerjaan / Job Description Target (Opsional)",
    jdPlaceholder: "Tempel job description lowongan yang ingin Anda lamar di sini...",
    presetLabel: "Pilih Contoh Posisi Populer:",
    presetCustom: "-- Kustom / Tempel Sendiri --",
    scanButton: "Mulai Audit CV Sekarang",
    scanningButton: "Memindai dengan 7 Mesin ATS...",
    fillSampleButton: "Isi Contoh CV & Lowongan",
    clearButton: "Bersihkan Formulir",
    
    // Knockout Banner
    koTitleDisqualified: "Peringatan Deal-Breaker: Berisiko Tereliminasi Otomatis (Auto-Reject)",
    koTitleBorderline: "Perhatian: Kandidat Berada di Ambang Batas Minimal (Borderline)",
    koTitleEligible: "Kandidat Memenuhi Kriteria Dasar (Eligible)",
    koCandidateYears: "Pengalaman Kerja:",
    koCandidateEdu: "Pendidikan:",
    koYearsLabel: "Tahun",
    
    // Score Overview
    overallMatch: "Skor Kecocokan Keseluruhan",
    auditStatus: "Status Kelayakan",
    auditPass: "Sangat Direkomendasikan untuk Wawancara",
    auditReview: "Perlu Optimasi Beberapa Bagian",
    auditReject: "Berisiko Gugur di Screening Awal",
    coreSectionsAudit: "Kelengkapan Bagian Standar CV",
    sectionContact: "Kontak & Identitas",
    sectionSummary: "Ringkasan Profil",
    sectionExperience: "Pengalaman Kerja",
    sectionEducation: "Riwayat Pendidikan",
    sectionSkills: "Keahlian & Skills",
    present: "Lengkap",
    missing: "Belum Ditemukan",
    highPriorityTitle: "Daftar Perbaikan Prioritas Utama",
    critical: "KRITIS",
    high: "TINGGI",
    medium: "SEDANG",
    low: "RINGAN",
    exportPdfButton: "Unduh Rapor Audit Resmi (PDF)",
    
    // Categories
    catKeyword: "Kecocokan Kata Kunci",
    catImpact: "Formula Dampak Google XYZ",
    catFormat: "Kesesuaian Format ATS",
    catHygiene: "Kebersihan & Diksi Klise",
    catMultiAts: "Rata-Rata Multi-ATS",
    
    // Keywords Tab
    kwMatched: "Kata Kunci Ditemukan",
    kwMissing: "Kata Kunci Kurang (Gap)",
    kwHardSkills: "Hard Skills & Alat Teknis",
    kwSoftSkills: "Soft Skills & Kompetensi",
    kwDensity: "Kepadatan Kata Kunci",
    
    // Impact Tab
    impactTitle: "Evaluasi Formula Google XYZ: 'Accomplished [X] as measured by [Y] by doing [Z]'",
    impactSubtitle: "Mengukur seberapa kuat poin pengalaman kerja Anda didukung oleh angka, persentase, dan aksi nyata.",
    metricBullets: "Poin Berbasis Angka/Metrik",
    actionVerbs: "Kepadatan Kata Kerja Aksi",
    strongBullets: "Poin Berkinerja Kuat",
    weakBullets: "Poin Perlu Penguatan Metrik",
    
    // Multi-ATS Tab
    multiAtsTitle: "Simulasi Skor pada Berbagai Sistem ATS Global",
    multiAtsSubtitle: "Setiap platform memiliki pembobotan algoritma yang berbeda.",
    sixSecondTitle: "Simulasi Uji Lirik 6 Detik HRD (Recruiter Glance)",
    sixSecondSubtitle: "Memprediksi apa yang dilihat recruiter dalam 6 detik pertama.",
    
    // Bullet Optimizer Tab
    optTitle: "Rekomendasi Penulisan Ulang Kalimat (Smart Rewriter)",
    optSubtitle: "Ubah poin pasif menjadi pencapaian berdampak tinggi dengan formula Google XYZ.",
    originalText: "Teks Asli:",
    suggestedText: "Rekomendasi Penulisan Ulang:",
    copySuggestion: "Salin Hasil Optimasi",
    copied: "Tersalin!",
    
    // Cliché Tab
    clicheTitle: "Deteksi Diksi Klise, Buzzword & Repetisi Kata",
    clicheSubtitle: "Hindari kata-kata basi yang sering diabaikan recruiter.",
    clicheDetected: "Kata Klise Ditemukan",
    repetitionDetected: "Repetisi Kata Berlebihan",
    lexicalDiversity: "Variasi Kosakata (Type-Token Ratio)",
    
    // Inspector Tab
    inspectorTitle: "Inspeksi Parseability Dokumen Mentah",
    inspectorSubtitle: "Tampilan teks murni yang dibaca oleh parser mesin ATS.",
    rawTextExtracted: "Teks Hasil Ekstraksi Mesin",
    detectedContacts: "Kontak & Tautan Terdeteksi",
    charCount: "Total Karakter",
    wordCount: "Total Kata",
    
    // Export Modal
    exportModalTitle: "Ekspor Rapor Diagnostik ATS",
    exportModalDesc: "Pilih format dokumen dan opsi laporan.",
    exportCandidateName: "Nama Kandidat",
    exportTargetRole: "Posisi yang Dilamar",
    exportDownloadBtn: "Unduh Dokumen PDF",
    exportCloseBtn: "Tutup"
  },
  en: {
    // Header & Meta
    appTitle: "ATS Master HRD",
    appSubtitle: "CV Audit & Screening System matching Workday, Greenhouse, Taleo, Jobscan & Glints standards",
    precisionTag: "Calibrated Precision: Δ Max ≤ 5% (Achieved 0%)",
    newTestButton: "Scan New Document",
    
    // Hero
    heroTitle: "Audit Your Resume Against ATS Algorithms & HR Review",
    heroDesc: "Test your resume match against enterprise automated screening systems (Workday, Greenhouse, Taleo, Glints) before applying. Uncover format errors, keyword gaps, and boost business impact with Google's XYZ formula.",
    
    // Tabs
    tabOverview: "Score Overview",
    tabKeywords: "Skills & Keywords",
    tabImpact: "Google XYZ Impact",
    tabMultiAts: "Multi-ATS & 6-Sec Scan",
    tabOptimizer: "Bullet Optimizer",
    tabHygiene: "Clichés & Hygiene",
    tabInspector: "Document Inspector",
    
    // Input Section
    inputTitle: "Upload Resume or Paste CV Text",
    inputSubtitle: "Choose an input method and align it with your target job vacancy.",
    modeUpload: "Upload Document (PDF / DOCX)",
    modePaste: "Paste Resume Text",
    dragDropText: "Drag & drop your resume file here, or",
    browseButton: "Browse File",
    fileSupported: "Supports PDF, DOCX, and TXT (Max 25 MB)",
    fileSelected: "Selected file:",
    changeFile: "Change file",
    cvTextPlaceholder: "Paste your complete resume text here (Work experience, education, technical skills, etc.)...",
    jdTitle: "Target Job Description (Optional)",
    jdPlaceholder: "Paste the job vacancy requirements or description here...",
    presetLabel: "Select Popular Job Preset:",
    presetCustom: "-- Custom / Paste Your Own --",
    scanButton: "Audit Resume Now",
    scanningButton: "Scanning with 7 ATS Engines...",
    fillSampleButton: "Load Sample Resume & JD",
    clearButton: "Clear Form",
    
    // Knockout Banner
    koTitleDisqualified: "Deal-Breaker Alert: High Risk of Automated Elimination (Auto-Reject)",
    koTitleBorderline: "Warning: Candidate Meets Borderline Thresholds",
    koTitleEligible: "Candidate Meets Core Requirements (Eligible)",
    koCandidateYears: "Work Experience:",
    koCandidateEdu: "Education:",
    koYearsLabel: "Years",
    
    // Score Overview
    overallMatch: "Overall Match Score",
    auditStatus: "Eligibility Status",
    auditPass: "Highly Recommended for Interview",
    auditReview: "Requires Optimization in Key Sections",
    auditReject: "High Risk of Initial ATS Screening Rejection",
    coreSectionsAudit: "Standard Core Sections Audit",
    sectionContact: "Contact & Identity",
    sectionSummary: "Professional Summary",
    sectionExperience: "Work Experience",
    sectionEducation: "Education History",
    sectionSkills: "Skills & Competencies",
    present: "Complete",
    missing: "Missing",
    highPriorityTitle: "High-Priority Actionable Checklist",
    critical: "CRITICAL",
    high: "HIGH",
    medium: "MEDIUM",
    low: "LOW",
    exportPdfButton: "Download Official Diagnostic PDF Report",
    
    // Categories
    catKeyword: "Keyword Matching",
    catImpact: "Google XYZ Impact Formula",
    catFormat: "ATS Format Compliance",
    catHygiene: "Hygiene & Clichés",
    catMultiAts: "Multi-ATS Average",
    
    // Keywords Tab
    kwMatched: "Matched Keywords",
    kwMissing: "Missing Keywords (Skill Gap)",
    kwHardSkills: "Hard Skills & Tech Stack",
    kwSoftSkills: "Soft Skills & Competencies",
    kwDensity: "Keyword Density",
    
    // Impact Tab
    impactTitle: "Google XYZ Formula Audit: 'Accomplished [X] as measured by [Y] by doing [Z]'",
    impactSubtitle: "Measures whether your bullet points are backed by quantifiable numbers, metrics, and active verbs.",
    metricBullets: "Quantified Metric Bullets",
    actionVerbs: "Action Verbs Density",
    strongBullets: "High-Impact Bullets",
    weakBullets: "Passive / Needs Metrics",
    
    // Multi-ATS Tab
    multiAtsTitle: "Multi-ATS Engine Score Simulation",
    multiAtsSubtitle: "Each applicant tracking platform weighs criteria differently.",
    sixSecondTitle: "HR 6-Second Glance Simulation",
    sixSecondSubtitle: "Simulates what recruiters notice during their initial 6-second scan.",
    
    // Bullet Optimizer Tab
    optTitle: "Smart Resume Bullet Rewriter",
    optSubtitle: "Transform passive tasks into compelling accomplishments using Google's XYZ formula.",
    originalText: "Original Bullet:",
    suggestedText: "Optimized Recommendation:",
    copySuggestion: "Copy Optimization",
    copied: "Copied!",
    
    // Cliché Tab
    clicheTitle: "Clichés, Buzzwords & Vocabulary Hygiene",
    clicheSubtitle: "Eliminate overused corporate buzzwords recruiters typically ignore.",
    clicheDetected: "Overused Clichés Found",
    repetitionDetected: "Repetitive Words",
    lexicalDiversity: "Lexical Diversity (Type-Token Ratio)",
    
    // Inspector Tab
    inspectorTitle: "Raw Document Parseability Inspector",
    inspectorSubtitle: "View raw text exactly as parsed by ATS machines.",
    rawTextExtracted: "Extracted Machine Text",
    detectedContacts: "Detected Contacts & URLs",
    charCount: "Total Characters",
    wordCount: "Total Words",
    
    // Export Modal
    exportModalTitle: "Export ATS Diagnostic Report",
    exportModalDesc: "Select export document format and report parameters.",
    exportCandidateName: "Candidate Name",
    exportTargetRole: "Target Role",
    exportDownloadBtn: "Download PDF Report",
    exportCloseBtn: "Close"
  }
};
