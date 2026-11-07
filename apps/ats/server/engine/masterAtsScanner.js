/**
 * Master ATS & HR CV Scanner Orchestrator
 * Coordinates all analysis engines to produce a unified diagnostic audit report.
 */

import { analyzeAtsFormat } from "./atsFormatEngine.js";
import { matchKeywords } from "./keywordEngine.js";
import { analyzeImpact } from "./impactEngine.js";
import { analyzeClichesAndHygiene } from "./clicheEngine.js";
import { evaluateKnockoutFilters } from "./knockoutEngine.js";
import { simulateMultiAtsScores, simulateRecruiterScan } from "./multiAtsEngine.js";
import { generateBulletSuggestions } from "./rewriterEngine.js";

export function runFullAtsScan(cvText, jdText = "", options = {}) {
  const text = cvText || "";

  // 1. Run ATS Format & Parseability Engine
  const formatData = analyzeAtsFormat(text, options.metadata || {});

  // 2. Run Keyword & Skills Matching Engine
  const keywordData = matchKeywords(text, jdText, options);

  // 3. Run Quantifiable Impact & Google XYZ Formula Engine
  const impactData = analyzeImpact(text);

  // 4. Run Clichés, Buzzwords & Hygiene Engine
  const hygieneData = analyzeClichesAndHygiene(text);

  // 5. Run Knockout & Deal-Breaker Screening Engine
  const knockoutData = evaluateKnockoutFilters(text, jdText, options);

  // 6. Run Multi-ATS Emulation & Recruiter 6-Second First Impression Scan
  const multiAtsData = simulateMultiAtsScores({
    formatData,
    keywordData,
    impactData,
    hygieneData,
    knockoutData
  });

  const recruiterScanData = simulateRecruiterScan(text, formatData);

  // 7. Generate Actionable Rewrites & Top Priority Fixes
  const weakBullets = impactData.evaluatedBullets.filter(b => b.grade === "weak" || b.grade === "passive");
  const bulletSuggestions = generateBulletSuggestions(weakBullets, options.jobCategory || "software_engineering");

  // Determine High Priority Fixes (Actionable Checklist)
  const isEn = options.lang === "en";
  const highPriorityFixes = [];

  if (knockoutData.isKnockout) {
    highPriorityFixes.push({
      priority: "CRITICAL",
      title: isEn ? "High Risk of Automated Elimination (Knockout Failure)" : "Risiko Tereliminasi Otomatis (Knockout Failure)",
      desc: isEn 
        ? "CV is at risk of automated rejection by initial ATS knockout screening filters." 
        : knockoutData.actionAdvice
    });
  }

  if (formatData.missingCoreSections.length > 0) {
    highPriorityFixes.push({
      priority: "HIGH",
      title: isEn ? "Missing Standard Resume Sections" : "Bagian Standar Belum Lengkap",
      desc: isEn 
        ? `Add standard sections: ${formatData.missingCoreSections.join(", ")} with clear headings.` 
        : `Tambahkan bagian standar: ${formatData.missingCoreSections.join(", ")} dengan judul baku.`
    });
  }

  if (keywordData.missingCount > 0) {
    const topMissing = keywordData.missingKeywords.slice(0, 4).map(k => k.skill).join(", ");
    highPriorityFixes.push({
      priority: "HIGH",
      title: isEn ? "Critical Vacancy Skills Missing" : "Keahlian Kunci Lowongan Belum Disebutkan",
      desc: isEn 
        ? `Add key missing keywords: ${topMissing} to pass HR filter searches.` 
        : `Tambahkan kata kunci penting berikut: ${topMissing} agar lolos pencarian filter HR.`
    });
  }

  if (impactData.metricPercentage < 35) {
    highPriorityFixes.push({
      priority: "MEDIUM",
      title: isEn ? "Lacks Quantifiable Metrics / Numbers" : "Kurang Bukti Metrik / Angka Terukur",
      desc: isEn 
        ? `Only ${impactData.metricPercentage}% of bullet points contain numbers. Add metrics, percentage growth, or project/team scale.` 
        : "Hanya " + impactData.metricPercentage + "% poin yang memiliki angka. Tambahkan nominal, persentase peningkatan, atau skala tim/proyek."
    });
  }

  if (hygieneData.detectedCliches.length > 0) {
    highPriorityFixes.push({
      priority: "LOW",
      title: isEn ? "Overused Corporate Clichés Found" : "Ditemukan Kata Klise / Buzzwords",
      desc: isEn 
        ? `Remove buzzwords (${hygieneData.detectedCliches.slice(0, 3).map(c => c.cliche).join(", ")}) and replace with concrete results.` 
        : `Hapus kata klise (${hygieneData.detectedCliches.slice(0, 3).map(c => c.cliche).join(", ")}) dan ganti dengan pencapaian konkret.`
    });
  }


  return {
    timestamp: new Date().toISOString(),
    overallScore: multiAtsData.overallScore,
    scores: {
      overall: multiAtsData.overallScore,
      format: formatData.score,
      keyword: keywordData.keywordScore,
      impact: impactData.impactScore,
      hygiene: hygieneData.hygieneScore,
      firstImpression: recruiterScanData.firstImpressionScore
    },
    multiAts: multiAtsData,
    knockout: knockoutData,
    format: formatData,
    keywords: keywordData,
    impact: impactData,
    hygiene: hygieneData,
    recruiterScan: recruiterScanData,
    suggestions: {
      bulletSuggestions,
      highPriorityFixes
    }
  };
}
