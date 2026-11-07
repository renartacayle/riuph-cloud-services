/**
 * Veritas Academic Suite — Universal Plagiarism & AI Testing API Server
 * Universal Academic Similarity & AI Writing Detector Simulation for Higher Education & Academic Research
 */

import express from "express";
import cors from "cors";
import multer from "multer";
import { runPlagiarismCheck } from "./engine/plagiarismEngine.js";
import { runAiDetection } from "./engine/aiEngine.js";
import {
  evaluateCompliance,
  generateDefenseQuestions,
  generateParaphraseSuggestions,
  UNIVERSAL_DISCIPLINES,
  STANDARD_PRESETS
} from "./engine/academicRules.js";
import { ACADEMIC_CORPUS } from "./engine/corpus.js";
import { parseDocumentBuffer } from "./utils/docParser.js";
import { generateCertificateData } from "./utils/certGenerator.js";
import { generateDocxBuffer, generatePdfBuffer } from "./utils/docExporter.js";
import { humanizeAndBypass } from "./engine/humanizerEngine.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");

const app = express();
const PORT = process.env.PORT || 5051;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(distPath));

// Configure Multer for file uploads (PDF, DOCX, TXT)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
});

/**
 * Health check & universal metadata
 */
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    system: "Veritas Academic Suite — Sistem Universal Pengujian Plagiarisme & Deteksi AI",
    unit: "Pusat Integritas Karya Ilmiah & Pengujian Orisinalitas Akademik",
    version: "3.0.0 (Universal Edition)",
    engine: "Universal Academic Similarity Engine + AI Writing Integrity Detector Simulation",
    faculties: UNIVERSAL_DISCIPLINES,
    presets: STANDARD_PRESETS,
    corpusCount: ACADEMIC_CORPUS.length
  });
});

/**
 * Core Comprehensive Analysis (Plagiarism + AI + Academic Compliance + Defense Questions)
 */
app.post("/api/check", async (req, res) => {
  try {
    const {
      text,
      facultyId = "FIK",
      customUniversity = "Perguruan Tinggi / Universitas",
      customSimilarityMax,
      customAiMax,
      options = {
        excludeQuotes: true,
        excludeBibliography: true,
        excludeSmallMatchesWords: 4,
        noRepository: true,
      }
    } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Teks naskah tidak boleh kosong." });
    }

    // 1. Plagiarism Analysis (Academic Similarity Style)
    const plagiarismResult = runPlagiarismCheck(text, options);

    // 2. AI Writing Detection (AI Writing Detector Style)
    const aiResult = runAiDetection(text);

    const lang = req.body.lang || (options && options.lang) || "id";
    const customOptions = {
      institutionName: customUniversity,
      customSimilarityMax,
      customAiMax,
      lang
    };

    // 3. Academic Compliance Evaluation
    const compliance = evaluateCompliance(
      plagiarismResult.overallSimilarity,
      aiResult.aiPercentage,
      facultyId,
      customOptions
    );

    // 4. Dewan Penguji Defense Simulator Questions
    const defenseQuestions = generateDefenseQuestions(
      plagiarismResult,
      aiResult,
      facultyId,
      customOptions
    );

    res.json({
      success: true,
      plagiarism: plagiarismResult,
      ai: aiResult,
      compliance,
      defenseQuestions,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Terjadi kesalahan internal saat analisis: " + error.message });
  }
});

/**
 * File Upload Handler (PDF, DOCX, TXT)
 */
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan dalam unggahan." });
    }

    const {
      facultyId = "FIK",
      customUniversity = "Perguruan Tinggi / Universitas",
      customSimilarityMax,
      customAiMax,
      excludeQuotes = "true",
      excludeBibliography = "true",
      noRepository = "true",
      lang = "id"
    } = req.body;

    const parsed = await parseDocumentBuffer(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    const options = {
      excludeQuotes: excludeQuotes === "true",
      excludeBibliography: excludeBibliography === "true",
      excludeSmallMatchesWords: 4,
      noRepository: noRepository === "true",
      lang
    };

    const plagiarismResult = runPlagiarismCheck(parsed.text, options);
    const aiResult = runAiDetection(parsed.text);

    const customOptions = {
      institutionName: customUniversity,
      customSimilarityMax,
      customAiMax,
      lang
    };

    const compliance = evaluateCompliance(
      plagiarismResult.overallSimilarity,
      aiResult.aiPercentage,
      facultyId,
      customOptions
    );
    const defenseQuestions = generateDefenseQuestions(
      plagiarismResult,
      aiResult,
      facultyId,
      customOptions
    );


    res.json({
      success: true,
      filename: req.file.originalname,
      fileFormat: parsed.format,
      pages: parsed.pages || null,
      extractedText: parsed.text,
      plagiarism: plagiarismResult,
      ai: aiResult,
      compliance,
      defenseQuestions,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Gagal memproses file unggahan: " + error.message });
  }
});

/**
 * Paraphrase Suggestion Helper
 */
app.post("/api/paraphrase", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Teks kalimat diperlukan." });
  }
  const result = generateParaphraseSuggestions(text);
  res.json(result);
});

/**
 * Thesis Full Humanizer & Anti-Plagiarism Generator (4S Method)
 */
app.post("/api/humanize", (req, res) => {
  try {
    const {
      text,
      facultyId = "FIK",
      customUniversity = "Perguruan Tinggi / Universitas",
      customSimilarityMax,
      customAiMax
    } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Teks naskah diperlukan." });
    }

    const { transformed, modificationsCount } = humanizeAndBypass(text);
    const options = {
      excludeQuotes: true,
      excludeBibliography: true,
      excludeSmallMatchesWords: 4,
      noRepository: true,
    };
    const afterPlagiarism = runPlagiarismCheck(transformed, options);
    const afterAi = runAiDetection(transformed);

    const customOptions = {
      institutionName: customUniversity,
      customSimilarityMax,
      customAiMax
    };

    const compliance = evaluateCompliance(
      afterPlagiarism.overallSimilarity,
      afterAi.aiPercentage,
      facultyId,
      customOptions
    );

    res.json({
      success: true,
      transformed,
      modificationsCount,
      plagiarism: afterPlagiarism,
      ai: afterAi,
      compliance
    });
  } catch (error) {
    console.error("Humanize error:", error);
    res.status(500).json({ error: "Gagal memproses humanisasi naskah: " + error.message });
  }
});

/**
 * Universal Certificate Generator Endpoint
 */
app.post("/api/certificate", async (req, res) => {
  try {
    const cert = await generateCertificateData(req.body);
    res.json({
      success: true,
      certificate: cert
    });
  } catch (error) {
    console.error("Certificate error:", error);
    res.status(500).json({ error: "Gagal membuat sertifikat: " + error.message });
  }
});

/**
 * Corpus Database View Endpoint
 */
app.get("/api/corpus", (req, res) => {
  res.json({
    totalSources: ACADEMIC_CORPUS.length,
    sources: ACADEMIC_CORPUS.map(c => ({
      id: c.id,
      title: c.title,
      author: c.author,
      institution: c.institution,
      sourceType: c.sourceType,
      domain: c.domain,
      url: c.url,
      color: c.color
    }))
  });
});

/**
 * Export Thesis Document as .DOCX (Microsoft Word)
 */
app.post("/api/export/docx", async (req, res) => {
  try {
    const { text, title = "Naskah_Karya_Ilmiah_Bebas_Plagiasi", author = "Penulis Karya Ilmiah" } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Teks naskah diperlukan." });
    }
    const buffer = await generateDocxBuffer(text, { title, author });
    const safeTitle = title.replace(/[^a-zA-Z0-9_\-]/g, "_");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.docx"`);
    res.send(buffer);
  } catch (error) {
    console.error("Export DOCX error:", error);
    res.status(500).json({ error: "Gagal membuat dokumen DOCX: " + error.message });
  }
});

/**
 * Export Thesis Document as .PDF
 */
app.post("/api/export/pdf", (req, res) => {
  try {
    const { text, title = "Naskah_Karya_Ilmiah_Bebas_Plagiasi", author = "Penulis Karya Ilmiah" } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Teks naskah diperlukan." });
    }
    const buffer = generatePdfBuffer(text, { title, author });
    const safeTitle = title.replace(/[^a-zA-Z0-9_\-]/g, "_");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.pdf"`);
    res.send(buffer);
  } catch (error) {
    console.error("Export PDF error:", error);
    res.status(500).json({ error: "Gagal membuat dokumen PDF: " + error.message });
  }
});

// Fallback route for SPA client (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(distPath, "index.html"));
  }
  next();
});

export default app;
