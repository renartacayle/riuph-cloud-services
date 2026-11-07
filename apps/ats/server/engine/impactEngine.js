/**
 * Quantifiable Impact & Action Verb Strength Engine
 * Replicates Google XYZ Formula ('Accomplished [X] as measured by [Y], by doing [Z]')
 * and Resume Worded impact scoring standards.
 */

import { POWER_VERBS } from "./taxonomyData.js";

// Comprehensive patterns to detect quantifiable metrics and numbers
const METRIC_PATTERNS = [
  // Percentages: 25%, 3.5%, 100%, 99.98%
  /\b\d+(?:\.\d+)?\s*%/gi,
  // Currency: $100k, $1.5M, $25k, Rp 500jt, IDR 2,5 Miliar, €50,000, $15M
  /(?:\$|Rp\.?|IDR|USD|EUR|£)\s*\d+(?:[.,]\d+)?\s*(?:k|m|b|rb|jt|ribu|juta|miliar|million|billion)?\b/gi,
  // Scaled counts: 450,000 monthly active users, 12 million daily requests, 5 mid-level engineers, 45M+ logs
  /\b\d+(?:[.,]\d+)?\s*(?:k|m|b|rb|jt|million|billion)?\s*(?:\+)?\s*(?:[a-zA-Z-]+\s+){0,4}(?:users|active users|dau|mau|clients|customers|leads|subscribers|projects|team members|developers|engineers|microservices|endpoints|bugs|reviews|interviews|experiments|features|models|requests|sessions|orders|transactions|transaksi|pengguna|nasabah|klien|cabang|orang|pelanggan|squads)\b/gi,
  // Multipliers: 2x, 2.5x, 3x, 4.6x, 5x, 10x
  /\b\d+(?:\.\d+)?x\b/gi,
  // Time and cost savings / increases: reducing release deployment cycle by 4 hours, saved 3 weeks, grew by 140%
  /\b(?:reducing|reduced|saved|saving|cut|cutting|decreased|decreasing|increased|increasing|boosting|boosted|grew|growing|saving)\s+(?:[a-zA-Z-]+\s+){0,4}(?:by\s+)?\d+(?:\.\d+)?\s*(?:%|days|weeks|months|years|hours|mins|jam|hari|minggu|bulan|tahun)\b/gi,
  // Explicit plus counts: 15+ secure, 450+ regression, 30+ penetration, 40+ user
  /\b\d+\+\s+[a-zA-Z]+/gi,
  // Quantified ratios or ratings: 4.8-star, 94% on-time, 99.95% uptime
  /\b\d+(?:\.\d+)?-star\b/gi
];

/**
 * Extracts bullet points from Experience / Projects sections
 */
export function extractBulletPoints(text) {
  if (!text) return [];

  // Try to locate Experience / Projects section
  const expMatch = text.match(/(?:work experience|experience|employment history|work history|professional experience|pengalaman kerja|pengalaman profesional|riwayat pekerjaan)[\s\S]*?(?=(?:education|pendidikan|academic background|skills|keahlian|keterampilan|certifications|sertifikasi|licenses|languages|bahasa|awards|$))/i);
  const targetText = expMatch ? expMatch[0] : text;

  const lines = targetText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const bullets = [];

  for (const line of lines) {
    const isBulletFormatted = /^[-*•–—►▪■]\s+/.test(line) || /^\d+\.\s+/.test(line);
    const cleaned = line.replace(/^[-*•–—►▪■\d.]+\s*/, "").trim();

    // Exclude section header itself or subheaders like "Company (Year - Year)"
    const isHeaderOrCompany = /^(?:work experience|experience|pengalaman|software engineer|product manager|data scientist|associate|senior|junior|lead|intern|analyst|developer|specialist).*?(?:\||\(20\d{2})/i.test(cleaned);
    const words = cleaned.split(/\s+/).filter(Boolean);

    if ((isBulletFormatted || words.length >= 6) && words.length <= 65 && !isHeaderOrCompany) {
      bullets.push(cleaned);
    }
  }

  // Fallback: if no bullets in experience section, parse all lines starting with bullet symbols
  if (bullets.length === 0) {
    const allLines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    for (const line of allLines) {
      if (/^[-*•–—►▪■]\s+/.test(line)) {
        const cleaned = line.replace(/^[-*•–—►▪■\d.]+\s*/, "").trim();
        bullets.push(cleaned);
      }
    }
  }

  return bullets;
}

/**
 * Evaluates individual bullet point for verbs and metrics
 */
export function evaluateBulletPoint(bullet) {
  const lower = bullet.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);
  const firstWord = words[0] || "";
  const firstThreeWords = words.slice(0, 3).join(" ");

  // 1. Detect Action Verb Type
  let verbStrength = "none";
  let matchedVerb = null;

  for (const verb of POWER_VERBS.high_impact) {
    if (lower.startsWith(verb) || firstThreeWords.includes(verb) || lower.includes(` ${verb} `)) {
      verbStrength = "high";
      matchedVerb = verb;
      break;
    }
  }

  if (verbStrength === "none") {
    for (const verb of POWER_VERBS.medium_impact) {
      if (lower.startsWith(verb) || firstThreeWords.includes(verb) || lower.includes(` ${verb} `)) {
        verbStrength = "medium";
        matchedVerb = verb;
        break;
      }
    }
  }

  let hasPassive = false;
  let passiveVerb = null;
  for (const weak of POWER_VERBS.weak_passive) {
    if (lower.startsWith(weak) || lower.includes(weak)) {
      hasPassive = true;
      passiveVerb = weak;
      break;
    }
  }

  // 2. Detect Metrics
  const foundMetrics = [];
  for (const pattern of METRIC_PATTERNS) {
    const matches = bullet.match(pattern);
    if (matches) {
      foundMetrics.push(...matches);
    }
  }
  const uniqueMetrics = [...new Set(foundMetrics)];
  const hasMetric = uniqueMetrics.length > 0;

  // 3. Classify overall bullet grade
  let grade = "weak";
  let feedback = "Kurang dampak terukur. Tambahkan metrik/angka dan gunakan kata kerja aksi yang kuat.";

  if (hasMetric && (verbStrength === "high" || verbStrength === "medium")) {
    grade = "excellent";
    feedback = "Luar biasa! Mengikuti formula Google XYZ dengan metrik terukur dan kata kerja berdampak tinggi.";
  } else if (hasMetric) {
    grade = "good";
    feedback = "Memiliki metrik yang bagus. Pertimbangkan mengganti kata kerja awal dengan kata kerja aksi yang lebih kuat.";
  } else if (verbStrength === "high" || verbStrength === "medium") {
    grade = "good";
    feedback = "Kata kerja aksi kuat. Tambahkan metrik terukur (persentase, nominal, atau skala) untuk memperkuat hasil.";
  } else if (hasPassive) {
    grade = "passive";
    feedback = `Hindari frasa pasif '${passiveVerb}'. Ganti dengan tindakan spesifik yang Anda lakukan.`;
  }

  return {
    text: bullet,
    hasMetric,
    metrics: uniqueMetrics,
    verbStrength,
    matchedVerb,
    hasPassive,
    passiveVerb,
    grade,
    feedback
  };
}

/**
 * Runs full Quantifiable Impact & Action Verb Analysis on the CV
 */
export function analyzeImpact(cvText) {
  const bullets = extractBulletPoints(cvText);

  // If no bullets at all, score very low
  if (bullets.length === 0) {
    return {
      impactScore: 18,
      totalBullets: 0,
      bulletsWithMetricsCount: 0,
      metricPercentage: 0,
      bulletsWithHighVerbsCount: 0,
      bulletsWithMediumVerbsCount: 0,
      bulletsWithPassiveCount: 0,
      powerVerbPercentage: 0,
      evaluatedBullets: [],
      topMetricsFound: [],
      summaryAdvice: "Tidak ditemukan poin pencapaian atau deskripsi pengalaman kerja yang terstruktur."
    };
  }

  const evaluatedBullets = bullets.map(evaluateBulletPoint);
  const totalBullets = evaluatedBullets.length;

  const bulletsWithMetrics = evaluatedBullets.filter(b => b.hasMetric);
  const bulletsWithHighVerbs = evaluatedBullets.filter(b => b.verbStrength === "high");
  const bulletsWithMediumVerbs = evaluatedBullets.filter(b => b.verbStrength === "medium");
  const bulletsWithPassive = evaluatedBullets.filter(b => b.hasPassive);

  const metricRate = bulletsWithMetrics.length / totalBullets;
  const powerVerbRate = (bulletsWithHighVerbs.length + bulletsWithMediumVerbs.length * 0.8) / totalBullets;
  const passiveRate = bulletsWithPassive.length / totalBullets;

  // Calibrated impact scoring
  // Benchmark targets:
  // metricRate >= 0.70 & verbRate >= 0.80 -> 90 - 95
  // metricRate 0.40 - 0.65 -> 78 - 88
  // metricRate 0.20 - 0.35 -> 55 - 70
  // metricRate < 0.15 & passive -> 20 - 35
  let baseScore = 0;
  if (metricRate >= 0.60) {
    baseScore = 85 + (metricRate - 0.60) * 25;
  } else if (metricRate >= 0.35) {
    baseScore = 70 + ((metricRate - 0.35) / 0.25) * 15;
  } else if (metricRate >= 0.15) {
    baseScore = 45 + ((metricRate - 0.15) / 0.20) * 25;
  } else {
    baseScore = 20 + (metricRate / 0.15) * 25;
  }

  // Verb adjustment (+/- 10 pts)
  const verbBonus = (powerVerbRate - 0.5) * 16;
  const passivePenalty = passiveRate * 25;

  let impactScore = Math.round(baseScore + verbBonus - passivePenalty);
  impactScore = Math.max(15, Math.min(96, impactScore));

  return {
    impactScore,
    totalBullets,
    bulletsWithMetricsCount: bulletsWithMetrics.length,
    metricPercentage: Math.round(metricRate * 100),
    bulletsWithHighVerbsCount: bulletsWithHighVerbs.length,
    bulletsWithMediumVerbsCount: bulletsWithMediumVerbs.length,
    bulletsWithPassiveCount: bulletsWithPassive.length,
    powerVerbPercentage: Math.round(Math.min(100, powerVerbRate * 100)),
    evaluatedBullets,
    topMetricsFound: [...new Set(evaluatedBullets.flatMap(b => b.metrics))].slice(0, 8),
    summaryAdvice: metricRate >= 0.5 
      ? "Kualitas dampak sangat baik. CV memiliki bukti pencapaian berbasis data kuantitatif."
      : "Tingkatkan metrik terukur. Idealnya minimal 40-50% poin pekerjaan memuat angka, persentase, atau skala."
  };
}
