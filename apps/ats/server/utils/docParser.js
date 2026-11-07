/**
 * Document Parser Utility for CV/Resume Files
 * Supports PDF, DOCX, and TXT buffers with layout preservation.
 */

import mammoth from "mammoth";

export async function parseDocumentBuffer(buffer, mimeType = "", filename = "") {
  const ext = (filename.split(".").pop() || "").toLowerCase();

  try {
    // 1. PDF Parsing
    if (ext === "pdf" || mimeType === "application/pdf") {
      let rawText = "";
      let pageCount = 1;
      try {
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: buffer });
        await parser.load();
        const textResult = await parser.getText();
        rawText = typeof textResult === "string" ? textResult : (textResult?.text || "");
        pageCount = Array.isArray(textResult?.pages) 
          ? textResult.pages.length 
          : (typeof textResult?.pages === "number" ? textResult.pages : 1);
      } catch (pdfErr) {
        console.warn("[docParser] PDFParse module error, falling back to buffer string decode:", pdfErr.message);
        rawText = buffer.toString("latin1").replace(/[^\x20-\x7E\n\r\t]/g, " ");
      }

      // Clean artificial page footer markers inserted by parsers (e.g. "-- 1 of 2 --")
      rawText = rawText.replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "\n");

      // Normalize line breaks
      rawText = rawText.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");

      return {
        text: rawText.trim(),
        pages: pageCount,
        format: "pdf"
      };
    }

    // 2. Word (.docx) Parsing
    if (
      ext === "docx" ||
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/docx"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      let rawText = result.value || "";

      // Normalize paragraph breaks
      rawText = rawText.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");

      // Estimate page count for docx based on word count (~450 words/page)
      const wordCount = rawText.split(/\s+/).filter(Boolean).length;
      const estimatedPages = Math.max(1, Math.ceil(wordCount / 450));

      return {
        text: rawText.trim(),
        pages: estimatedPages,
        format: "docx",
        warnings: result.messages || []
      };
    }

    // 3. Legacy Word (.doc) Warning / Fallback
    if (ext === "doc" || mimeType === "application/msword") {
      // Extract ASCII/UTF-8 strings from binary .doc
      const str = buffer.toString("utf-8").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ");
      const cleaned = str.replace(/\s{2,}/g, " ").trim();
      return {
        text: cleaned,
        pages: 1,
        format: "doc",
        warning: "File berekstensi .doc (Word 97-2003) terdeteksi. Disarankan menyimpan ulang sebagai .docx atau .pdf agar format dan tabel terbaca optimal."
      };
    }

    // 4. Plain Text (.txt) or Default
    return {
      text: buffer.toString("utf-8").trim(),
      pages: 1,
      format: ext || "txt"
    };
  } catch (err) {
    console.warn("Document parsing warning, using fallback buffer string:", err.message);
    const fallbackText = buffer
      .toString("utf-8")
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
      .trim();

    return {
      text: fallbackText,
      pages: 1,
      format: ext || "unknown",
      error: err.message
    };
  }
}
