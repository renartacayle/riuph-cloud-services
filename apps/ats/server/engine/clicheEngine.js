/**
 * Cliché, Buzzword, Word Repetition & Hygiene Engine
 * Identifies overused corporate clichés, repetitive vocabulary, and bullet point length hygiene.
 */

import { CLICHE_BUZZWORDS } from "./taxonomyData.js";

const STOPWORDS = new Set([
  "the", "and", "to", "of", "a", "in", "for", "is", "on", "that", "by", "this",
  "with", "i", "you", "it", "not", "or", "be", "are", "from", "at", "as", "your",
  "all", "have", "new", "more", "an", "was", "we", "will", "home", "can", "us",
  "dan", "di", "ke", "dari", "yang", "pada", "untuk", "dengan", "ini", "itu",
  "atau", "dalam", "bisa", "adalah", "sebagai", "oleh", "pada", "juga", "serta"
]);

export function analyzeClichesAndHygiene(text) {
  const lower = (text || "").toLowerCase();
  const words = lower.match(/\b[a-zA-Z]{3,}\b/g) || [];
  const lines = (text || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Cliché / Buzzword Detection
  const detectedCliches = [];
  for (const buzz of CLICHE_BUZZWORDS) {
    const escaped = buzz.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      detectedCliches.push({
        cliche: buzz,
        count: matches.length,
        advice: `Ganti frasa '${buzz}' dengan bukti nyata atau pencapaian yang spesifik dan terukur.`
      });
    }
  }

  // 2. Word Repetition Analysis (Exclude Stopwords)
  const wordFreq = new Map();
  for (const w of words) {
    if (!STOPWORDS.has(w) && w.length >= 4) {
      wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
    }
  }

  const repetitiveWords = [];
  for (const [word, count] of wordFreq.entries()) {
    if (count >= 5) {
      repetitiveWords.push({ word, count });
    }
  }
  repetitiveWords.sort((a, b) => b.count - a.count);

  // 3. Lexical Diversity (Type-Token Ratio)
  const uniqueWords = new Set(words);
  const ttr = words.length > 0 ? (uniqueWords.size / words.length) : 1;
  const lexicalDiversityScore = Math.round(ttr * 100);

  // 4. Bullet Length Hygiene
  const bullets = lines.filter(l => /^[-*•–—►▪■\d.]+\s*/.test(l));
  const bulletLengths = bullets.map(b => b.split(/\s+/).filter(Boolean).length);

  let tooShortBullets = 0;
  let tooLongBullets = 0;
  let idealBullets = 0;

  for (const len of bulletLengths) {
    if (len < 6) tooShortBullets++;
    else if (len > 35) tooLongBullets++;
    else idealBullets++;
  }

  // 5. Hygiene Score (0 - 100)
  let hygieneScore = 100;

  // Deductions
  hygieneScore -= (detectedCliches.length * 5);
  hygieneScore -= (repetitiveWords.length * 3);
  if (tooShortBullets > 2) hygieneScore -= 8;
  if (tooLongBullets > 2) hygieneScore -= 8;
  if (ttr < 0.35) hygieneScore -= 10;

  hygieneScore = Math.max(20, Math.min(100, Math.round(hygieneScore)));

  return {
    hygieneScore,
    detectedCliches,
    clicheCount: detectedCliches.length,
    repetitiveWords: repetitiveWords.slice(0, 6),
    lexicalDiversity: {
      totalWords: words.length,
      uniqueWords: uniqueWords.size,
      ttrScore: lexicalDiversityScore,
      rating: lexicalDiversityScore >= 45 ? "Bagus (Variasi kata kaya)" : "Cukup (Cenderung repetitif)"
    },
    bulletHygiene: {
      totalBulletsChecked: bullets.length,
      idealCount: idealBullets,
      tooShortCount: tooShortBullets,
      tooLongCount: tooLongBullets,
      feedback: tooLongBullets > 2 
        ? "Beberapa poin terlalu panjang. Idealnya 1-2 baris (12-25 kata) per bullet point."
        : "Format panjang bullet point sudah proporsional."
    }
  };
}
