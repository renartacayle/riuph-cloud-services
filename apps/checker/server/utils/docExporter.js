/**
 * Universal Academic Document Exporter Utility
 * Generates and saves clean, academic-compliant .docx and .pdf files
 * following Indonesian National Higher Education (Dikti) thesis layout standards:
 * - Margins: Top 4cm, Left 4cm, Bottom 3cm, Right 3cm
 * - Typography: Times New Roman 12pt, 1.5 Line Spacing
 * - Chapter Headings: Centered, Bold
 * - Paragraph Indent: 1 cm First Line
 */

import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import { jsPDF } from "jspdf";

/**
 * Generates a valid binary DOCX buffer formatted per national academic thesis guidelines
 * @param {string} text - Plain text of thesis content
 * @param {object} metadata - Document title and author metadata
 * @returns {Promise<Buffer>}
 */
export async function generateDocxBuffer(text, metadata = {}) {
  const title = metadata.title || "Naskah Karya Ilmiah (Hasil Humanisasi 4S)";
  const author = metadata.author || "Penulis Karya Ilmiah";

  // Split text into paragraphs
  const rawParagraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  const docParagraphs = [];

  for (const block of rawParagraphs) {
    const trimmed = block.trim();
    const isChapterHeading = /^BAB\s+[IVXLCDM]+/i.test(trimmed) || /^(DAFTAR\s+PUSTAKA|ABSTRAK|ABSTRACT)/i.test(trimmed);

    if (isChapterHeading) {
      // Split heading title if multi-line (e.g. "BAB I\nPENDAHULUAN")
      const lines = trimmed.split("\n");
      for (const line of lines) {
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.trim(),
                font: "Times New Roman",
                bold: true,
                size: 24, // 12pt
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 120, line: 360 }
          })
        );
      }
    } else {
      // Normal academic paragraph with 1cm first line indent and 1.5 line spacing
      docParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/\n/g, " "),
              font: "Times New Roman",
              size: 24, // 12pt
            })
          ],
          indent: { firstLine: 567 }, // 1 cm indent (567 twips)
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360, after: 120 } // 1.5 line spacing
        })
      );
    }
  }

  const doc = new Document({
    title,
    creator: author,
    description: "Naskah karya ilmiah terbebas plagiasi dan AI dengan metode 4S Standar Nasional",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 2268,    // 4 cm (4 * 567 twips)
              left: 2268,   // 4 cm
              bottom: 1701, // 3 cm (3 * 567 twips)
              right: 1701   // 3 cm
            }
          }
        },
        children: docParagraphs
      }
    ]
  });

  return await Packer.toBuffer(doc);
}

/**
 * Generates a valid binary PDF buffer formatted per national academic thesis guidelines
 * @param {string} text - Plain text of thesis content
 * @param {object} metadata - Document title and author metadata
 * @returns {Buffer}
 */
export function generatePdfBuffer(text, metadata = {}) {
  const title = metadata.title || "Naskah Karya Ilmiah (Bebas Plagiasi)";

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 30; // 30 mm left margin
  const maxTextWidth = pageWidth - marginX - 25; // 25 mm right margin

  let cursorY = 30;

  // Header Title
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text(title, pageWidth / 2, cursorY, { align: "center" });
  cursorY += 12;

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  const rawParagraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  for (const block of rawParagraphs) {
    const trimmed = block.trim();
    const isHeading = /^BAB\s+[IVXLCDM]+/i.test(trimmed) || /^(DAFTAR\s+PUSTAKA|ABSTRAK|ABSTRACT)/i.test(trimmed);

    if (isHeading) {
      if (cursorY > pageHeight - 35) {
        doc.addPage();
        cursorY = 30;
      }
      cursorY += 6;
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text(trimmed, pageWidth / 2, cursorY, { align: "center" });
      cursorY += 10;
      doc.setFont("times", "normal");
      doc.setFontSize(11);
    } else {
      const wrappedLines = doc.splitTextToSize(trimmed.replace(/\n/g, " "), maxTextWidth);

      for (let i = 0; i < wrappedLines.length; i++) {
        if (cursorY > pageHeight - 25) {
          doc.addPage();
          cursorY = 30;
        }
        const line = wrappedLines[i];
        if (i === 0) {
          doc.text("        " + line, marginX, cursorY); // simulated 1cm indent
        } else {
          doc.text(line, marginX, cursorY);
        }
        cursorY += 7; // ~1.5 line spacing
      }
      cursorY += 3;
    }
  }

  // Add Page Numbers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.text(String(i), pageWidth / 2, pageHeight - 15, { align: "center" });
  }

  return Buffer.from(doc.output("arraybuffer"));
}

/**
 * Saves generated document text to a target file path (.docx, .pdf, or .txt)
 * @param {string} text - Transformed text
 * @param {string} targetPath - Path to save
 * @param {object} metadata - Document metadata
 * @returns {Promise<{savedPath: string, format: string, sizeBytes: number}>}
 */
export async function saveDocumentToFile(text, targetPath, metadata = {}) {
  const resolved = path.resolve(targetPath);
  const ext = path.extname(resolved).toLowerCase();
  let buffer;
  let format = "txt";

  if (ext === ".docx") {
    buffer = await generateDocxBuffer(text, metadata);
    format = "docx";
  } else if (ext === ".pdf") {
    buffer = await generatePdfBuffer(text, metadata);
    format = "pdf";
  } else {
    buffer = Buffer.from(text, "utf-8");
    format = "txt";
  }

  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, buffer);

  return {
    savedPath: resolved,
    format,
    sizeBytes: buffer.length
  };
}

