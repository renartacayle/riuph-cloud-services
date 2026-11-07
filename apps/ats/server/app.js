/**
 * HRD & ATS CV Screener Express Application
 * Complete replication of ATS screening mechanisms:
 * Jobscan, Workday, Greenhouse, Taleo, Glints, and Jobstreet SiVA.
 */

// Polyfill Node.js globals for pdfjs-dist / pdf-parse on serverless environments
if (typeof globalThis.DOMMatrix === "undefined") {
  globalThis.DOMMatrix = class DOMMatrix {
    constructor() {
      this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
      this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
      this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
    }
    multiply() { return this; }
    scale() { return this; }
    translate() { return this; }
    rotate() { return this; }
    inverse() { return this; }
    transformPoint(p) { return p; }
  };
}
if (typeof globalThis.ImageData === "undefined") {
  globalThis.ImageData = class ImageData {
    constructor(w = 1, h = 1) {
      this.width = w;
      this.height = h;
      this.data = new Uint8ClampedArray(w * h * 4);
    }
  };
}
if (typeof globalThis.Path2D === "undefined") {
  globalThis.Path2D = class Path2D {
    addPath() {}
    closePath() {}
    moveTo() {}
    lineTo() {}
    bezierCurveTo() {}
    quadraticCurveTo() {}
    arc() {}
    rect() {}
  };
}

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { runFullAtsScan } from "./engine/masterAtsScanner.js";
import { PRESET_JOB_DESCRIPTIONS } from "./engine/taxonomyData.js";
import { parseDocumentBuffer } from "./utils/docParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(distPath));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB
});

/**
 * Health check & Engine metadata
 */
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    system: "HRD & ATS Master CV Screener Suite",
    version: "1.0.0",
    engines: [
      "ATS Format & Parseability Engine",
      "Keyword & Skills Semantic Matcher",
      "Google XYZ Quantifiable Impact Engine",
      "Cliché, Buzzword & Hygiene Detector",
      "Knockout & Deal-Breaker Filter",
      "Workday / Greenhouse / Glints Multi-ATS Emulator",
      "Recruiter 6-Second First-Impression Simulator",
      "Smart Resume Bullet Rewriter"
    ],
    presetsCount: PRESET_JOB_DESCRIPTIONS.length
  });
});

/**
 * Job Description Presets
 */
app.get("/api/presets", (req, res) => {
  res.json({
    presets: PRESET_JOB_DESCRIPTIONS
  });
});

/**
 * Core ATS Scan Endpoint (Text input)
 */
app.post("/api/scan", (req, res) => {
  try {
    const { cvText, jdText, options } = req.body;

    if (!cvText || cvText.trim().length < 20) {
      return res.status(400).json({
        error: "Isi teks CV tidak boleh kosong atau terlalu pendek (minimal 20 karakter)."
      });
    }

    const result = runFullAtsScan(cvText, jdText || "", options || {});
    res.json(result);
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Gagal memproses analisis CV: " + err.message });
  }
});

/**
 * File Upload Scan Endpoint (PDF / DOCX / TXT)
 */
app.post("/api/scan-file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada file dokumen yang diunggah." });
    }

    const jdText = req.body.jdText || "";
    let options = {};
    if (req.body.options) {
      try {
        options = JSON.parse(req.body.options);
      } catch (e) {
        options = {};
      }
    }

    const parsedDoc = await parseDocumentBuffer(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    if (!parsedDoc.text || parsedDoc.text.trim().length < 20) {
      return res.status(400).json({
        error: "Gagal mengekstrak teks dari file yang diunggah. Pastikan file bukan berupa scan gambar murni tanpa OCR."
      });
    }

    const result = runFullAtsScan(parsedDoc.text, jdText, {
      ...options,
      metadata: {
        filename: req.file.originalname,
        filesize: req.file.size,
        pages: parsedDoc.pages,
        format: parsedDoc.format
      }
    });

    result.document = {
      filename: req.file.originalname,
      filesize: req.file.size,
      format: parsedDoc.format,
      pages: parsedDoc.pages,
      extractedLength: parsedDoc.text.length,
      extractedText: parsedDoc.text
    };

    res.json(result);
  } catch (err) {
    console.error("File scan error:", err);
    res.status(500).json({ error: "Gagal memproses file dokumen: " + err.message });
  }
});

// Serve frontend for all SPA routes
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Front-end build in progress or not found. Access API at /api/status");
      }
    });
  }
  next();
});

export default app;
