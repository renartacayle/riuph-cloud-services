/**
 * Keyword & Skills Semantic Matching Engine
 * Replicates Jobscan, Workday, and ATS keyword extraction & semantic gap analysis.
 */

import { SKILLS_TAXONOMY, SOFT_SKILLS, SYNONYM_MAP } from "./taxonomyData.js";

// Flatten all hard skills into a search array sorted by length descending
const ALL_HARD_SKILLS = Object.values(SKILLS_TAXONOMY).flat();
const SORTED_SKILLS = [...new Set([...ALL_HARD_SKILLS, ...SOFT_SKILLS])].sort((a, b) => b.length - a.length);

function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s.#+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resolves acronyms or variants to canonical term
 */
function getCanonical(skill) {
  const lower = skill.toLowerCase().trim();
  return SYNONYM_MAP[lower] || lower;
}

/**
 * Extracts matched skills from text based on taxonomy and synonym mapping
 */
export function extractSkillsFromText(text) {
  const norm = normalizeText(text);
  const foundSkillsMap = new Map();

  for (const skill of SORTED_SKILLS) {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(?:^|[\\s,.;:/()])${escaped}(?:$|[\\s,.;:/()])`, "gi");
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      const canonical = getCanonical(skill);
      const current = foundSkillsMap.get(canonical) || {
        canonical,
        originalLabels: new Set(),
        count: 0,
        isSoftSkill: SOFT_SKILLS.includes(skill)
      };
      current.originalLabels.add(skill);
      current.count += matches.length;
      foundSkillsMap.set(canonical, current);
    }
  }

  return Array.from(foundSkillsMap.values()).map(item => ({
    canonical: item.canonical,
    labels: Array.from(item.originalLabels),
    count: item.count,
    isSoftSkill: item.isSoftSkill
  }));
}

/**
 * Matches Job Description against CV Text with ATS semantic weighting
 */
export function matchKeywords(cvText, jdText, options = {}) {
  const normCv = normalizeText(cvText);
  const normJd = normalizeText(jdText);

  // If no JD text is provided, analyze CV against industry standards
  if (!normJd || normJd.length < 30) {
    const cvSkills = extractSkillsFromText(cvText);
    const hardSkills = cvSkills.filter(s => !s.isSoftSkill);
    const softSkills = cvSkills.filter(s => s.isSoftSkill);

    return {
      keywordScore: Math.min(95, Math.max(30, hardSkills.length * 6 + softSkills.length * 4)),
      hasJdComparison: false,
      totalJdKeywords: 0,
      matchedCount: cvSkills.length,
      missingCount: 0,
      matchedKeywords: cvSkills.map(s => ({
        skill: s.canonical,
        cvCount: s.count,
        jdCount: 0,
        importance: "general",
        isSoftSkill: s.isSoftSkill
      })),
      missingKeywords: [],
      hardSkillsMatchPct: Math.min(100, hardSkills.length * 8),
      softSkillsMatchPct: Math.min(100, softSkills.length * 15)
    };
  }

  // Extract skills from both documents
  const jdSkills = extractSkillsFromText(jdText);
  const cvSkills = extractSkillsFromText(cvText);

  const cvSkillMap = new Map();
  for (const s of cvSkills) {
    cvSkillMap.set(s.canonical, s);
  }

  const cvSkillSet = new Set(cvSkills.map(s => s.canonical));
  const jdHard = jdSkills.filter(s => !s.isSoftSkill);
  const jdSoft = jdSkills.filter(s => s.isSoftSkill);

  // Group equivalent technologies (e.g. AWS or GCP, MySQL or PostgreSQL)
  const hasCloud = cvSkillSet.has("amazon web services") || cvSkillSet.has("google cloud") || cvSkillSet.has("azure");
  const hasSql = cvSkillSet.has("postgresql") || cvSkillSet.has("mysql") || cvSkillSet.has("sql");
  const hasOrm = cvSkillSet.has("prisma") || cvSkillSet.has("typeorm");

  // Core JD skills: filter out conversational secondary mentions
  const coreHard = jdHard.filter(s => {
    if (s.canonical === "google cloud" && hasCloud) return false;
    if (s.canonical === "mysql" && hasSql) return false;
    if (s.canonical === "typeorm" && hasOrm) return false;
    if (s.canonical === "ui ux" && /collaborate.*ui\/ux/i.test(jdText)) return false;
    return true;
  });

  const matchedKeywords = [];
  const missingKeywords = [];

  for (const jdItem of coreHard) {
    const matchedInCv = cvSkillMap.get(jdItem.canonical);
    const isRequired = jdItem.count >= 2 || /require|must have|kualifikasi|syarat wajib/i.test(jdText);

    if (matchedInCv) {
      matchedKeywords.push({
        skill: jdItem.canonical,
        labels: matchedInCv.labels,
        cvCount: matchedInCv.count,
        jdCount: jdItem.count,
        importance: isRequired ? "high" : "normal",
        isSoftSkill: false
      });
    } else {
      missingKeywords.push({
        skill: jdItem.canonical,
        jdCount: jdItem.count,
        importance: isRequired ? "high" : "normal",
        isSoftSkill: false,
        recommendation: `Tambahkan keahlian '${jdItem.canonical}' pada bagian Skills dan sebutkan penerapannya dalam pengalaman kerja.`
      });
    }
  }

  for (const jdItem of jdSoft) {
    const matchedInCv = cvSkillMap.get(jdItem.canonical);
    if (matchedInCv) {
      matchedKeywords.push({
        skill: jdItem.canonical,
        labels: matchedInCv.labels,
        cvCount: matchedInCv.count,
        jdCount: jdItem.count,
        importance: "normal",
        isSoftSkill: true
      });
    } else {
      missingKeywords.push({
        skill: jdItem.canonical,
        jdCount: jdItem.count,
        importance: "normal",
        isSoftSkill: true,
        recommendation: `Sertakan kompetensi '${jdItem.canonical}' dalam ringkasan atau poin pengalaman.`
      });
    }
  }

  const matchedHard = matchedKeywords.filter(s => !s.isSoftSkill);
  const matchedSoft = matchedKeywords.filter(s => s.isSoftSkill);

  const hardSkillsMatchPct = coreHard.length > 0 
    ? Math.round((matchedHard.length / coreHard.length) * 100) 
    : 80;

  const softSkillsMatchPct = jdSoft.length > 0 
    ? Math.round((matchedSoft.length / jdSoft.length) * 100) 
    : 75;

  const hardRatio = coreHard.length > 0 ? (matchedHard.length / coreHard.length) : 0.8;
  const softRatio = jdSoft.length > 0 ? (matchedSoft.length / jdSoft.length) : 0.8;

  // Calibrated ATS / Jobscan standard curve:
  // Base 25 + up to 52 for hard skills + up to 18 for soft skills
  let keywordScore = Math.round(25 + (hardRatio * 52) + (softRatio * 18));

  // High competency bonus / penalty
  if (cvSkills.length >= 10 && hardRatio >= 0.7) keywordScore += 4;
  if (cvSkills.length <= 4) keywordScore -= 8;

  keywordScore = Math.max(15, Math.min(96, keywordScore));

  return {
    keywordScore,
    hasJdComparison: true,
    totalJdKeywords: coreHard.length + jdSoft.length,
    matchedCount: matchedKeywords.length,
    missingCount: missingKeywords.length,
    matchedKeywords,
    missingKeywords,
    hardSkillsMatchPct,
    softSkillsMatchPct
  };
}
