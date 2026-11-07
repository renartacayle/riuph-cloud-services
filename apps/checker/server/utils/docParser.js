/**
 * Document Parser Utility
 * Extracts and cleans academic text from PDF, DOCX, and TXT files
 * for Universal Academic Similarity & AI Writing Detector Suite.
 */

import mammoth from "mammoth";

/**
 * Parses binary buffer of PDF, DOCX, or plain text document
 * @param {Buffer} buffer - Binary file buffer
 * @param {string} mimeType - Optional MIME type string
 * @param {string} filename - Filename with extension (.pdf, .docx, .txt)
 * @returns {Promise<{text: string, pages: number, wordsCount: number, charsCount: number, format: string, filename: string}>}
 */
export async function parseDocumentBuffer(buffer, mimeType = "", filename = "") {
  const ext = (filename.split(".").pop() || "").toLowerCase();

  try {
    // 1. PDF Parser
    if (ext === "pdf" || mimeType === "application/pdf") {
      let rawText = "";
      let totalPages = 1;
      try {
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: buffer });
        await parser.load();
        const textResult = await parser.getText();
        rawText = typeof textResult === "string" ? textResult : (textResult?.text || "");
        totalPages = textResult?.total || (Array.isArray(textResult?.pages) ? textResult.pages.length : 1);
      } catch (pdfErr) {
        console.warn("[docParser] PDFParse module error, falling back to buffer string decode:", pdfErr.message);
        rawText = buffer.toString("latin1").replace(/[^\x20-\x7E\n\r\t]/g, " ");
      }
      
      // Clean PDF page markers and un-wrap visual line breaks while keeping paragraph blocks and chapter headers
      const lines = rawText
        .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
        .replace(/\r\n/g, "\n")
        .split("\n");

      let normalizedText = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
          if (!normalizedText.endsWith("\n\n")) normalizedText += "\n\n";
          continue;
        }

        const isHeading = /^(?:BAB|CHAPTER)\s+[IVXLCDM\d]+/i.test(line) || 
          /^(?:DAFTAR\s+PUSTAKA|REFERENCES|BIBLIOGRAPHY|WORKS\s+CITED|ABSTRAK|ABSTRACT|PROPOSAL\s+SKRIPSI|SKRIPSI|THESIS|DISSERTATION)/i.test(line);
        if (isHeading) {
          if (!normalizedText.endsWith("\n\n") && normalizedText.length > 0) normalizedText += "\n\n";
          normalizedText += line + "\n";
          continue;
        }

        if (normalizedText.endsWith("\n") || normalizedText.length === 0) {
          normalizedText += line;
        } else {
          normalizedText += " " + line;
        }
      }
      const cleanedText = normalizedText.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();

      const words = cleanedText ? cleanedText.split(/\s+/).filter(Boolean).length : 0;

      return {
        text: cleanedText,
        pages: totalPages,
        wordsCount: words,
        charsCount: cleanedText.length,
        format: "pdf",
        filename
      };
    }

    // 2. DOCX Parser (Microsoft Word)
    if (
      ext === "docx" ||
      ext === "doc" ||
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      const rawText = result.value || "";
      const cleanedText = rawText
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      const words = cleanedText ? cleanedText.split(/\s+/).filter(Boolean).length : 0;
      const estimatedPages = Math.max(1, Math.ceil(words / 280)); // ~280 words per page in 1.5 line spacing

      return {
        text: cleanedText,
        pages: estimatedPages,
        wordsCount: words,
        charsCount: cleanedText.length,
        format: "docx",
        filename
      };
    }

    // 3. Plain Text / Markdown / Other Fallbacks
    const rawText = buffer.toString("utf-8");
    const cleanedText = rawText
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
      .replace(/\r\n/g, "\n")
      .trim();

    const words = cleanedText ? cleanedText.split(/\s+/).filter(Boolean).length : 0;
    const estimatedPages = Math.max(1, Math.ceil(words / 300));

    return {
      text: cleanedText,
      pages: estimatedPages,
      wordsCount: words,
      charsCount: cleanedText.length,
      format: ext || "txt",
      filename
    };
  } catch (err) {
    console.warn(`[docParser] Fallback string extraction for ${filename}:`, err.message);
    const fallbackText = buffer.toString("utf-8")
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
      .trim();

    const words = fallbackText ? fallbackText.split(/\s+/).filter(Boolean).length : 0;

    return {
      text: fallbackText,
      pages: Math.max(1, Math.ceil(words / 300)),
      wordsCount: words,
      charsCount: fallbackText.length,
      format: ext || "unknown",
      filename
    };
  }
}
