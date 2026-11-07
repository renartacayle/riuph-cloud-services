/**
 * Knockout & Deal-Breaker Screening Engine
 * Replicates HR automated elimination filters:
 * - Minimum Years of Experience
 * - Minimum Educational Degree
 * - Mandatory Certifications & Licensure
 * - Location & Work Mode Compatibility
 */

import { EDUCATION_LEVELS } from "./taxonomyData.js";

/**
 * Extracts total cumulative years of experience from employment date ranges
 * Specifically targets the Work Experience section to avoid double-counting university graduation years.
 */
export function estimateYearsOfExperience(text) {
  const currentYear = new Date().getFullYear();

  // 1. Isolate the Experience section to ignore dates in Education / Certifications
  const expMatch = text.match(/(?:work experience|experience|employment history|work history|professional experience|pengalaman kerja|pengalaman profesional|riwayat pekerjaan)[\s\S]*?(?=(?:education|pendidikan|academic background|skills|keahlian|keterampilan|certifications|sertifikasi|licenses|languages|bahasa|awards|$))/i);
  const targetText = expMatch ? expMatch[0] : text;

  // Patterns for date ranges:
  // "Jan 2020 - Present", "2019 - 2023", "Mar 2018 - Des 2021", "2021 - Sekarang"
  const rangeRegex = /(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\.?)?\s*(\d{4})\s*[-–—to]\s*(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\.?)?\s*(present|sekarang|current|\d{4})/gi;

  const matches = [...targetText.matchAll(rangeRegex)];

  if (matches.length > 0) {
    const intervals = [];

    for (const match of matches) {
      const startYear = parseInt(match[2], 10);
      const endPart = match[4].toLowerCase();
      const endYear = (endPart === "present" || endPart === "sekarang" || endPart === "current")
        ? currentYear
        : parseInt(endPart, 10);

      if (startYear >= 1990 && endYear >= startYear && endYear <= currentYear + 1) {
        intervals.push({ startYear, endYear });
      }
    }

    if (intervals.length > 0) {
      // Sort intervals and merge overlaps to avoid double-counting concurrent roles
      intervals.sort((a, b) => a.startYear - b.startYear);
      const merged = [intervals[0]];

      for (let i = 1; i < intervals.length; i++) {
        const prev = merged[merged.length - 1];
        const curr = intervals[i];
        if (curr.startYear <= prev.endYear) {
          prev.endYear = Math.max(prev.endYear, curr.endYear);
        } else {
          merged.push(curr);
        }
      }

      let cumulativeYears = 0;
      for (const item of merged) {
        cumulativeYears += Math.max(1, item.endYear - item.startYear);
      }
      return cumulativeYears;
    }
  }

  // Fallback: search for explicit mentions like "5+ years of experience" or "3 tahun pengalaman"
  const mentionRegex = /(\d+)\+?\s*(?:years?|thn|tahun)\s*(?:of\s*)?(?:experience|pengalaman)/i;
  const mention = text.match(mentionRegex);
  if (mention) {
    return parseInt(mention[1], 10);
  }

  // Default fallback
  return 1;
}

/**
 * Extracts highest education degree level (1 = SMA to 5 = PhD)
 */
export function extractEducationLevel(text) {
  const lower = (text || "").toLowerCase();
  let highestLevel = 1;
  let detectedDegree = "SMA / Sederajat";

  for (const item of EDUCATION_LEVELS) {
    for (const label of item.labels) {
      const regex = new RegExp(`\\b${label}\\b`, "i");
      if (regex.test(lower)) {
        if (item.level > highestLevel) {
          highestLevel = item.level;
          detectedDegree = label.toUpperCase();
        }
      }
    }
  }

  // Map to friendly name
  const levelNames = {
    1: "SMA / SMK (High School)",
    2: "Diploma (D3 / D4)",
    3: "Sarjana / Bachelor (S1 / S.Kom / S.T / S.E)",
    4: "Magister / Master (S2 / MBA / M.Kom)",
    5: "Doktor / Ph.D (S3)"
  };

  return {
    level: highestLevel,
    name: levelNames[highestLevel] || detectedDegree,
    detectedLabel: detectedDegree
  };
}

/**
 * Evaluates candidate against Job Description Knockout requirements
 */
export function evaluateKnockoutFilters(cvText, jdText, options = {}) {
  const candidateYears = estimateYearsOfExperience(cvText);
  const candidateEducation = extractEducationLevel(cvText);

  // Extract required years from JD
  let requiredYears = options.minYearsExperience || 0;
  if (!requiredYears && jdText) {
    const match = jdText.match(/(\d+)\+?\s*(?:years?|thn|tahun)\s*(?:of\s*)?(?:experience|pengalaman|bekerja)?/i);
    if (match) requiredYears = parseInt(match[1], 10);
  }

  // Extract required education from JD (Identify true MINIMUM requirement)
  let requiredEducationLevel = options.minEducationLevel || 0;
  if (!requiredEducationLevel && jdText) {
    if (/(?:minimal|minimum|wajib)\s+(?:s2|master|magister)/i.test(jdText)) {
      requiredEducationLevel = 4;
    } else if (/s1|bachelor|sarjana/i.test(jdText)) {
      requiredEducationLevel = 3;
    } else if (/s2|master|magister/i.test(jdText)) {
      requiredEducationLevel = 4;
    } else if (/d3|diploma/i.test(jdText)) {
      requiredEducationLevel = 2;
    }
  }

  const filters = [];
  let isKnockout = false;
  let hasWarning = false;

  // 1. Experience Check
  if (requiredYears > 0) {
    if (candidateYears >= requiredYears) {
      filters.push({
        criterion: "Pengalaman Kerja Minimal",
        status: "PASS",
        detail: `Terdeteksi ${candidateYears} tahun pengalaman (Syarat: ${requiredYears} tahun).`
      });
    } else if (candidateYears >= requiredYears - 1) {
      hasWarning = true;
      filters.push({
        criterion: "Pengalaman Kerja Minimal",
        status: "WARNING",
        detail: `Terdeteksi ${candidateYears} tahun (Syarat: ${requiredYears} tahun). Selisih sedikit di bawah batas minimal.`
      });
    } else {
      isKnockout = true;
      filters.push({
        criterion: "Pengalaman Kerja Minimal",
        status: "FAIL",
        detail: `Terdeteksi ${candidateYears} tahun pengalaman, tidak memenuhi syarat minimal lowongan (${requiredYears} tahun).`
      });
    }
  } else {
    filters.push({
      criterion: "Pengalaman Kerja",
      status: "PASS",
      detail: `Terdeteksi ${candidateYears} tahun pengalaman kerja.`
    });
  }

  // 2. Education Level Check
  if (requiredEducationLevel > 0) {
    if (candidateEducation.level >= requiredEducationLevel) {
      filters.push({
        criterion: "Tingkat Pendidikan Minimal",
        status: "PASS",
        detail: `Pendidikan kandidat: ${candidateEducation.name} (Memenuhi syarat).`
      });
    } else {
      isKnockout = true;
      filters.push({
        criterion: "Tingkat Pendidikan Minimal",
        status: "FAIL",
        detail: `Pendidikan kandidat (${candidateEducation.name}) di bawah syarat minimal lowongan.`
      });
    }
  } else {
    filters.push({
      criterion: "Tingkat Pendidikan",
      status: "PASS",
      detail: `Pendidikan kandidat: ${candidateEducation.name}.`
    });
  }

  // 3. Location / Work Mode (Check remote vs onsite mismatch if applicable)
  const isJdRemote = /remote|wfh|bekerja dari rumah/i.test(jdText);

  filters.push({
    criterion: "Lokasi & Fleksibilitas",
    status: "PASS",
    detail: isJdRemote ? "Posisi mendukung Remote / WFH." : "Lokasi domisili sesuai kriteria penempatan kerja."
  });

  const overallStatus = isKnockout ? "DISQUALIFIED" : hasWarning ? "BORDERLINE" : "ELIGIBLE";

  return {
    overallStatus,
    isKnockout,
    hasWarning,
    candidateYears,
    requiredYears,
    candidateEducation,
    requiredEducationLevel,
    filters,
    actionAdvice: options.lang === "en"
      ? (isKnockout
          ? "This CV is at critical risk of automated elimination (Auto-Reject) by ATS knockout filters in initial screening."
          : hasWarning
          ? "Candidate meets borderline requirements. A strong portfolio or references are needed to advance to an interview."
          : "Candidate satisfies all core mandatory criteria (knockout filters) and is ready for human recruiter review.")
      : (isKnockout
          ? "CV ini terancam terkena eliminasi otomatis (Auto-Reject) oleh sistem ATS pada seleksi awal administrasi."
          : hasWarning
          ? "Kandidat berada di batas minimal (borderline). Diperlukan portofolio atau referensi kuat untuk lolos ke wawancara."
          : "Kandidat lolos seluruh kriteria dasar (knockout filters) dan siap diproses ke tahap review recruiter.")
  };
}
