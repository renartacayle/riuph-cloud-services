/**
 * Multi-ATS Emulation & Recruiter 6-Second Heatmap Simulation Engine
 * Simulates how Workday/Taleo, Greenhouse/Lever, and Jobstreet/Glints rank the CV,
 * along with eye-tracking simulation of a human recruiter's first glance.
 */

export function simulateMultiAtsScores({ formatData, keywordData, impactData, hygieneData, knockoutData }) {
  const formatScore = formatData.score;
  const keywordScore = keywordData.keywordScore;
  const impactScore = impactData.impactScore;
  const hygieneScore = hygieneData.hygieneScore;

  // 1. Workday / Taleo (Enterprise Legacy Profile):
  // Heavy emphasis on parseability, format hygiene, and exact keywords.
  let workdayScore = Math.round(
    (formatScore * 0.40) +
    (keywordScore * 0.35) +
    (hygieneScore * 0.15) +
    (impactScore * 0.10)
  );
  if (formatData.formatHazards.some(h => h.type === "multi_column_table")) {
    workdayScore -= 12; // Harsh penalty for legacy parsers
  }
  if (knockoutData.isKnockout) workdayScore = Math.min(40, workdayScore);
  workdayScore = Math.max(10, Math.min(100, workdayScore));

  // 2. Greenhouse / Lever (Modern Tech / Startup Profile):
  // Heavy emphasis on quantifiable impact, tech stack synergy, and GitHub/Portfolio.
  let greenhouseScore = Math.round(
    (impactScore * 0.40) +
    (keywordScore * 0.35) +
    (formatScore * 0.15) +
    (hygieneScore * 0.10)
  );
  if (formatData.contactInfo.hasPortfolioOrGithub) greenhouseScore += 5;
  if (knockoutData.isKnockout) greenhouseScore = Math.min(45, greenhouseScore);
  greenhouseScore = Math.max(10, Math.min(100, greenhouseScore));

  // 3. Jobstreet SiVA / Glints (SEA Corporate / Regional Profile):
  // Focus on education requirement, total years of experience, and hard skills match.
  let jobstreetScore = Math.round(
    (keywordScore * 0.45) +
    (formatScore * 0.25) +
    (impactScore * 0.20) +
    (hygieneScore * 0.10)
  );
  if (knockoutData.isKnockout) jobstreetScore = Math.min(35, jobstreetScore);
  jobstreetScore = Math.max(10, Math.min(100, jobstreetScore));

  // 4. Overall Standard ATS Composite Score (The canonical Master Match Score)
  let overallScore = Math.round(
    (keywordScore * 0.35) +
    (formatScore * 0.25) +
    (impactScore * 0.25) +
    (hygieneScore * 0.15)
  );
  if (knockoutData.isKnockout) {
    overallScore = Math.min(45, overallScore);
  }
  overallScore = Math.max(10, Math.min(100, overallScore));

  return {
    overallScore,
    breakdown: {
      workdayTaleo: {
        score: workdayScore,
        name: "Workday / Taleo (Enterprise)",
        characteristics: "Ketat terhadap tata letak, tanggal kronologis, dan format teks tunggal."
      },
      greenhouseLever: {
        score: greenhouseScore,
        name: "Greenhouse / Lever (Tech / Startup)",
        characteristics: "Prioritas tinggi pada dampak metrik terukur, portofolio proyek, dan stack relevan."
      },
      jobstreetGlints: {
        score: jobstreetScore,
        name: "Jobstreet SiVA / Glints (SEA / Korporat)",
        characteristics: "Fokus pada kesesuaian gelar pendidikan, durasi pengalaman kerja, dan filter administratif."
      }
    }
  };
}

/**
 * Simulates the 6-Second First-Impression Heatmap Scan of a Human Recruiter
 */
export function simulateRecruiterScan(rawText, formatData) {
  const lines = (rawText || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const topFoldLines = lines.slice(0, 15);
  const topFoldText = topFoldLines.join(" ");

  // Recruiter checklist in the first 6 seconds:
  const checkItems = [];

  // 1. Candidate Name (Usually in top 3 lines)
  const candidateName = lines[0] || "Nama Kandidat";
  const nameLooksValid = candidateName.length >= 3 && candidateName.length <= 40 && !candidateName.includes("@");
  checkItems.push({
    item: "Nama Jelas di Header",
    passed: nameLooksValid,
    preview: candidateName
  });

  // 2. Targeted Job Title / Headline
  const titleRegex = /(?:software|engineer|developer|designer|manager|specialist|analyst|lead|consultant|architect|intern|officer|koordinator|spesialis)\b/i;
  const hasTargetTitle = titleRegex.test(topFoldLines.slice(0, 5).join(" "));
  checkItems.push({
    item: "Gelar / Job Title Sasaran Terlihat Jelas",
    passed: hasTargetTitle,
    preview: hasTargetTitle ? "Terdeteksi di bagian atas CV" : "Tidak ditemukan headline spesifik di baris awal"
  });

  // 3. Quick Contact Details (Email + Phone)
  const hasQuickContact = formatData.contactInfo.hasEmail && formatData.contactInfo.hasPhone;
  checkItems.push({
    item: "Kontak Lengkap (Email & WhatsApp/No HP)",
    passed: hasQuickContact,
    preview: `${formatData.contactInfo.email || "Tanpa Email"} | ${formatData.contactInfo.phone || "Tanpa No HP"}`
  });

  // 4. Professional Summary (Punchy 2-3 lines)
  const hasSummary = formatData.sections.summary.detected;
  checkItems.push({
    item: "Ringkasan Profil (Executive Summary) Singkat",
    passed: hasSummary,
    preview: hasSummary ? "Ada ringkasan profesional" : "Disarankan menambah 2-3 kalimat elevator pitch"
  });

  // 5. Most Recent Company & Role Visible in Fold
  const hasRecentRole = topFoldLines.some(l => /\b(20\d{2}|present|sekarang)\b/i.test(l));
  checkItems.push({
    item: "Peran / Perusahaan Terakhir Terbaca Cepat",
    passed: hasRecentRole,
    preview: hasRecentRole ? "Posisi terkini terbaca di pandangan pertama" : "Terlalu jauh di bawah lipatan (fold)"
  });

  const passedCount = checkItems.filter(c => c.passed).length;
  const firstImpressionScore = Math.round((passedCount / checkItems.length) * 100);

  return {
    firstImpressionScore,
    passedCount,
    totalChecks: checkItems.length,
    checklist: checkItems,
    topFoldPreview: topFoldLines.slice(0, 8).join("\n"),
    recruiterVerdict: firstImpressionScore >= 80 
      ? "Kuat! Recruiter langsung menangkap identitas, keahlian, dan relevansi Anda dalam 6 detik pertama."
      : firstImpressionScore >= 60
      ? "Cukup baik, namun judul posisi dan ringkasan dapat dibuat lebih mencolok di bagian atas."
      : "Perlu perbaikan. Header terdistraksi dan informasi kunci belum langsung terbaca dalam 6 detik."
  };
}
