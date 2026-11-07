/**
 * ATS Format & Parseability Detection Engine
 * Inspects contact info, section structure, multi-column/table hazards,
 * non-standard glyphs, and compliance with modern applicant tracking parsers.
 */

export function analyzeAtsFormat(rawText, metadata = {}) {
  const text = rawText || "";
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // 1. Contact Information Extraction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  const emails = text.match(emailRegex) || [];

  const phoneRegex = /(?:\+?62|08|\+?1|\+?44|\+?65)[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{3,4}[\s.-]?[0-9]{3,5}\b/g;
  const phones = text.match(phoneRegex) || [];

  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_-]+/gi;
  const linkedinLinks = text.match(linkedinRegex) || [];
  const hasLinkedIn = linkedinLinks.length > 0 || /\blinkedin\b/i.test(text);

  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/gi;
  const githubLinks = text.match(githubRegex) || [];
  const portfolioRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.(?:dev|me|io|tech|co\.id|com|org)\b/gi;
  const rawWebsites = text.match(portfolioRegex) || [];
  const portfolios = rawWebsites.filter(url => !/linkedin\.com|gmail\.com|yahoo\.com|hotmail\.com/i.test(url));
  const hasPortfolioOrGithub = githubLinks.length > 0 || portfolios.length > 0 || /\bgithub\b/i.test(text);

  const locationRegex = /\b(jakarta|surabaya|bandung|semarang|yogyakarta|jogja|tangerang|bekasi|depok|bogor|medan|bali|makassar|singapore|indonesia|remote|hybrid|onsite|dki jakarta|jawa barat|jawa timur|jawa tengah)\b/i;
  const locationMatch = text.match(locationRegex);
  const detectedLocation = locationMatch ? locationMatch[0] : null;

  // 2. Risky / Problematic Personal Information (Legacy Format Hazards)
  const privacyFlags = [];
  if (/\b(agama|religion)\s*:\s*[a-zA-Z]+/i.test(text)) {
    privacyFlags.push({
      item: "Agama / Religion",
      severity: "warning",
      message: "Penyebutan agama tidak dianjurkan untuk ATS standar global/multinasional karena potensi bias kepatuhan ketenagakerjaan (EEOC)."
    });
  }
  if (/\b(status perkawinan|status pernikahan|marital status)\s*:\s*[a-zA-Z]+/i.test(text)) {
    privacyFlags.push({
      item: "Status Pernikahan",
      severity: "warning",
      message: "Status pernikahan sebaiknya dihapus dari CV profesional modern."
    });
  }
  if (/\b(tempat(?:\s*,\s*|\s+)tanggal lahir|ttl|date of birth|dob)\s*:\s*[a-zA-Z0-9\s,.-]+/i.test(text)) {
    privacyFlags.push({
      item: "Tanggal Lahir / Usia",
      severity: "warning",
      message: "Pencantuman tanggal lahir spesifik tidak direkomendasikan pada standar ATS modern guna menghindari diskriminasi usia."
    });
  }
  if (/\b(rt\s*\d+\s*\/\s*rw\s*\d+|nomor rumah|kelurahan|kecamatan)\b/i.test(text)) {
    privacyFlags.push({
      item: "Alamat Rumah Terlalu Rinci",
      severity: "info",
      message: "Cukup cantumkan Kota dan Negara (contoh: Jakarta, Indonesia) tanpa alamat RT/RW demi privasi data."
    });
  }

  // 3. Section Headers Recognition
  const sectionPatterns = {
    summary: {
      regex: /^(?:summary|professional summary|executive summary|profile|about me|profil|profil profesional|ringkasan profesional|ringkasan pribadi|tentang saya)\b/im,
      name: "Professional Summary"
    },
    experience: {
      regex: /^(?:experience|work experience|employment history|work history|professional experience|pengalaman kerja|pengalaman profesional|riwayat pekerjaan)\b/im,
      name: "Work Experience"
    },
    education: {
      regex: /^(?:education|educational background|academic background|pendidikan|riwayat pendidikan)\b/im,
      name: "Education"
    },
    skills: {
      regex: /^(?:skills|technical skills|core competencies|competencies|keahlian|keterampilan|keahlian teknis)\b/im,
      name: "Skills"
    },
    projects: {
      regex: /^(?:projects|key projects|portfolio|proyek|portofolio proyek)\b/im,
      name: "Projects"
    },
    certifications: {
      regex: /^(?:certifications|licenses|certifications & licenses|sertifikasi|lisensi|pelatihan)\b/im,
      name: "Certifications"
    },
    languages: {
      regex: /^(?:languages|bahasa|kemampuan bahasa)\b/im,
      name: "Languages"
    }
  };

  const detectedSections = {};
  const missingCoreSections = [];

  for (const [key, config] of Object.entries(sectionPatterns)) {
    const isFound = config.regex.test(text);
    detectedSections[key] = {
      detected: isFound,
      name: config.name
    };
  }

  if (!detectedSections.experience.detected) missingCoreSections.push("Work Experience / Pengalaman Kerja");
  if (!detectedSections.education.detected) missingCoreSections.push("Education / Pendidikan");
  if (!detectedSections.skills.detected) missingCoreSections.push("Skills / Keahlian");

  // 4. Formatting Hazards (Special Glyphs, Tables, Layout Traps)
  const formatHazards = [];

  // Exotic unicode glyphs that break older ATS parsers (Taleo, iCIMS)
  const exoticGlyphRegex = /[✔★➤■❖👉►●◆✦✓✖]/g;
  const exoticGlyphsFound = text.match(exoticGlyphRegex) || [];
  if (exoticGlyphsFound.length >= 2) {
    formatHazards.push({
      type: "exotic_glyphs",
      severity: "warning",
      count: exoticGlyphsFound.length,
      detail: `Ditemukan ${exoticGlyphsFound.length} simbol/ikon non-standar (${[...new Set(exoticGlyphsFound)].join(" ")}). Gunakan bullet point standar (seperti '-' atau bulat standar) agar tidak terbaca karakter rusak pada ATS lawas.`
    });
  }

  // Multi-column or table delimiter indicators
  const pipeCount = (text.match(/\|/g) || []).length;
  const tabCount = (text.match(/\t/g) || []).length;
  const hasLineTableSeparator = /[-─]{10,}/.test(text);

  if ((pipeCount > 4 && hasLineTableSeparator) || pipeCount > 8 || tabCount > 15) {
    formatHazards.push({
      type: "multi_column_table",
      severity: "high",
      detail: "Terdeteksi pola tabel atau multi-kolom yang padat. Parser ATS cenderung membaca teks menyilang antar kolom sehingga alur kalimat menjadi acak."
    });
  }

  // Word count evaluation (Standard resume length is 200 - 1000 words)
  let lengthStatus = "optimal";
  let lengthFeedback = "Panjang dokumen ideal untuk resume 1-2 halaman profesional.";
  if (wordCount < 60) {
    lengthStatus = "too_short";
    lengthFeedback = "CV terlalu singkat (< 60 kata). Informasi pencapaian dan keahlian tidak lengkap.";
    formatHazards.push({
      type: "length_short",
      severity: "warning",
      detail: lengthFeedback
    });
  } else if (wordCount > 1200) {
    lengthStatus = "too_long";
    lengthFeedback = "CV cukup panjang (> 1200 kata). Disarankan memadatkan menjadi maksimal 2 halaman fokus untuk recruiter.";
    formatHazards.push({
      type: "length_long",
      severity: "info",
      detail: lengthFeedback
    });
  }

  // 5. Compute Comprehensive ATS Format Score (0 - 100)
  let score = 100;

  // Deduct for missing contact info
  if (emails.length === 0) score -= 18;
  if (phones.length === 0) score -= 12;
  if (!hasLinkedIn) score -= 4;
  if (!detectedLocation) score -= 4;

  // Deduct for missing core sections
  if (!detectedSections.experience.detected) score -= 22;
  if (!detectedSections.education.detected) score -= 15;
  if (!detectedSections.skills.detected) score -= 15;
  if (!detectedSections.summary.detected) score -= 4;

  // Deduct for format hazards
  if (formatHazards.some(h => h.type === "multi_column_table")) score -= 22;
  if (formatHazards.some(h => h.type === "exotic_glyphs")) score -= 10;
  if (lengthStatus === "too_short") score -= 18;
  if (lengthStatus === "too_long") score -= 6;

  // Deduct for privacy compliance warning (Indonesian legacy fields)
  if (privacyFlags.length > 0) score -= (privacyFlags.length * 3);

  // Normalize score between 0 and 100
  score = Math.max(15, Math.min(100, Math.round(score)));

  return {
    score,
    wordCount,
    contactInfo: {
      email: emails[0] || null,
      hasEmail: emails.length > 0,
      phone: phones[0] || null,
      hasPhone: phones.length > 0,
      hasLinkedIn,
      linkedInUrl: linkedinLinks[0] || null,
      hasPortfolioOrGithub,
      githubUrl: githubLinks[0] || null,
      location: detectedLocation,
      hasLocation: !!detectedLocation
    },
    sections: detectedSections,
    missingCoreSections,
    privacyFlags,
    formatHazards,
    lengthMetrics: {
      wordCount,
      estimatedPages: Math.max(1, Math.ceil(wordCount / 480)),
      status: lengthStatus,
      feedback: lengthFeedback
    }
  };
}
