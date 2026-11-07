/**
 * Winnowing Algorithm & Token-based Sequence Alignment for Plagiarism Detection
 * Based on Schleimer, Wilkerson, Aiken (SIGMOD 2003):
 * "Winnowing: Local Algorithms for Document Fingerprinting"
 * As used in industry-standard tools like Academic Similarity and MOSS.
 */

// Simple rolling hash / polynomial hash for k-grams
function hashKgram(tokens, start, k) {
  let hash = 0;
  const p = 31;
  const m = 1e9 + 9;
  for (let i = 0; i < k; i++) {
    const token = tokens[start + i].normalized;
    for (let j = 0; j < token.length; j++) {
      hash = (hash * p + token.charCodeAt(j)) % m;
    }
  }
  return hash;
}

/**
 * Tokenizes text preserving character offsets and original casing
 */
export function tokenizeWithOffsets(text) {
  const tokens = [];
  const regex = /[\w\u00C0-\u017F]+/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    tokens.push({
      word: match[0],
      normalized: match[0].toLowerCase(),
      startChar: match.index,
      endChar: match.index + match[0].length
    });
  }
  return tokens;
}

/**
 * Computes winnowing fingerprints from tokens
 * @param {Array} tokens Token array with offsets
 * @param {number} k K-gram size (e.g. 4 or 5 consecutive words)
 * @param {number} w Window size (e.g. 4)
 */
export function computeFingerprints(tokens, k = 4, w = 4) {
  if (tokens.length < k) {
    return [];
  }

  const hashes = [];
  for (let i = 0; i <= tokens.length - k; i++) {
    hashes.push({
      hash: hashKgram(tokens, i, k),
      pos: i,
      startChar: tokens[i].startChar,
      endChar: tokens[i + k - 1].endChar
    });
  }

  const fingerprints = [];
  let minPos = -1;

  for (let i = 0; i <= hashes.length - w; i++) {
    let minHash = Infinity;
    let currentMinIndex = -1;

    for (let j = 0; j < w; j++) {
      const idx = i + j;
      if (hashes[idx].hash <= minHash) {
        minHash = hashes[idx].hash;
        currentMinIndex = idx;
      }
    }

    if (currentMinIndex !== minPos) {
      minPos = currentMinIndex;
      fingerprints.push(hashes[currentMinIndex]);
    }
  }

  return fingerprints;
}

/**
 * Finds matching spans between document and corpus item using expanded n-gram alignment
 * @param {Array} docTokens
 * @param {Array} corpusTokens
 * @param {number} minMatchWords Minimum consecutive words to count as a match (Academic Similarity standard: 4-6 words)
 */
export function findMatchingSpans(docTokens, corpusTokens, minMatchWords = 4) {
  const matches = [];
  const corpusLookup = new Map();

  // Index corpus by 3-word ngrams for fast seed lookup
  const seedSize = 3;
  for (let j = 0; j <= corpusTokens.length - seedSize; j++) {
    const key = corpusTokens.slice(j, j + seedSize).map(t => t.normalized).join(" ");
    if (!corpusLookup.has(key)) {
      corpusLookup.set(key, []);
    }
    corpusLookup.get(key).push(j);
  }

  let i = 0;
  while (i <= docTokens.length - seedSize) {
    const seed = docTokens.slice(i, i + seedSize).map(t => t.normalized).join(" ");
    const candidatePositions = corpusLookup.get(seed);

    if (candidatePositions && candidatePositions.length > 0) {
      let bestDocLen = 0;
      let bestCorpusStart = -1;

      for (const corpusPos of candidatePositions) {
        // Expand forward
        let len = 0;
        while (
          i + len < docTokens.length &&
          corpusPos + len < corpusTokens.length &&
          docTokens[i + len].normalized === corpusTokens[corpusPos + len].normalized
        ) {
          len++;
        }

        if (len > bestDocLen) {
          bestDocLen = len;
          bestCorpusStart = corpusPos;
        }
      }

      if (bestDocLen >= minMatchWords) {
        matches.push({
          docTokenStart: i,
          docTokenEnd: i + bestDocLen - 1,
          docStartChar: docTokens[i].startChar,
          docEndChar: docTokens[i + bestDocLen - 1].endChar,
          corpusTokenStart: bestCorpusStart,
          corpusTokenEnd: bestCorpusStart + bestDocLen - 1,
          matchedWordsCount: bestDocLen,
          matchedText: docTokens.slice(i, i + bestDocLen).map(t => t.word).join(" ")
        });
        i += bestDocLen;
        continue;
      }
    }
    i++;
  }

  return matches;
}

/**
 * Merges overlapping or adjacent match spans
 */
export function mergeMatchingSpans(spans, toleranceWords = 2) {
  if (spans.length === 0) return [];
  spans.sort((a, b) => a.docStartChar - b.docStartChar);

  const merged = [spans[0]];
  for (let i = 1; i < spans.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = spans[i];

    if (curr.docTokenStart <= prev.docTokenEnd + toleranceWords) {
      // Overlap or close adjacency
      prev.docTokenEnd = Math.max(prev.docTokenEnd, curr.docTokenEnd);
      prev.docEndChar = Math.max(prev.docEndChar, curr.docEndChar);
      prev.matchedWordsCount = prev.docTokenEnd - prev.docTokenStart + 1;
      // Retain the higher priority / primary source ID
    } else {
      merged.push(curr);
    }
  }

  return merged;
}
