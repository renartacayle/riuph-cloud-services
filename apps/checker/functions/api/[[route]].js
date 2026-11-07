/**
 * Cloudflare Pages Functions Handler for Veritas Academic Suite (Turnitin & AI Checker)
 * Endpoint: /api/*
 */

// Polyfill Node.js globals for pdfjs-dist / pdf-parse on serverless/edge environments
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

import { runPlagiarismCheck } from "../../server/engine/plagiarismEngine.js";
import { runAiDetection } from "../../server/engine/aiEngine.js";
import {
  evaluateCompliance,
  generateDefenseQuestions,
  generateParaphraseSuggestions,
  UNIVERSAL_DISCIPLINES,
  STANDARD_PRESETS
} from "../../server/engine/academicRules.js";
import { ACADEMIC_CORPUS } from "../../server/engine/corpus.js";
import { parseDocumentBuffer } from "../../server/utils/docParser.js";
import { generateCertificateData } from "../../server/utils/certGenerator.js";
import { generateDocxBuffer, generatePdfBuffer } from "../../server/utils/docExporter.js";
import { humanizeAndBypass } from "../../server/engine/humanizerEngine.js";

const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export async function onRequest(context) {
  const { request, params } = context;
  const route = Array.isArray(params.route) ? params.route.join("/") : (params.route || "");
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return onRequestOptions();
  }

  try {
    // 1. GET /api/status
    if (route === "status" && method === "GET") {
      return jsonResponse({
        status: "online",
        system: "Veritas Academic Suite — Sistem Universal Pengujian Plagiarisme & Deteksi AI",
        unit: "Pusat Integritas Karya Ilmiah & Pengujian Orisinalitas Akademik",
        version: "3.0.0 (Universal Edition)",
        engine: "Universal Academic Similarity Engine + AI Writing Integrity Detector Simulation",
        faculties: UNIVERSAL_DISCIPLINES,
        presets: STANDARD_PRESETS,
        corpusCount: ACADEMIC_CORPUS.length
      });
    }

    // 2. GET /api/corpus
    if (route === "corpus" && method === "GET") {
      return jsonResponse({
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
    }

    // 3. POST /api/check
    if (route === "check" && method === "POST") {
      const body = await request.json();
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
      } = body;

      if (!text || text.trim().length === 0) {
        return jsonResponse({ error: "Teks naskah tidak boleh kosong." }, 400);
      }

      const plagiarismResult = runPlagiarismCheck(text, options);
      const aiResult = runAiDetection(text);

      const lang = body.lang || (options && options.lang) || "id";
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

      return jsonResponse({
        success: true,
        plagiarism: plagiarismResult,
        ai: aiResult,
        compliance,
        defenseQuestions,
        analyzedAt: new Date().toISOString()
      });
    }

    // 4. POST /api/upload
    if (route === "upload" && method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return jsonResponse({ error: "File tidak ditemukan dalam unggahan." }, 400);
      }

      const facultyId = formData.get("facultyId") || "FIK";
      const customUniversity = formData.get("customUniversity") || "Perguruan Tinggi / Universitas";
      const customSimilarityMax = formData.get("customSimilarityMax");
      const customAiMax = formData.get("customAiMax");
      const excludeQuotes = formData.get("excludeQuotes") !== "false";
      const excludeBibliography = formData.get("excludeBibliography") !== "false";
      const noRepository = formData.get("noRepository") !== "false";
      const lang = formData.get("lang") || "id";

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const parsed = await parseDocumentBuffer(buffer, file.type, file.name);

      const options = {
        excludeQuotes,
        excludeBibliography,
        excludeSmallMatchesWords: 4,
        noRepository,
        lang
      };

      const plagiarismResult = runPlagiarismCheck(parsed.text, options);
      const aiResult = runAiDetection(parsed.text);

      const customOptions = {
        institutionName: customUniversity,
        customSimilarityMax: customSimilarityMax ? Number(customSimilarityMax) : undefined,
        customAiMax: customAiMax ? Number(customAiMax) : undefined,
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

      return jsonResponse({
        success: true,
        filename: file.name,
        fileFormat: parsed.format,
        pages: parsed.pages || null,
        extractedText: parsed.text,
        plagiarism: plagiarismResult,
        ai: aiResult,
        compliance,
        defenseQuestions,
        analyzedAt: new Date().toISOString()
      });
    }

    // 5. POST /api/paraphrase
    if (route === "paraphrase" && method === "POST") {
      const body = await request.json();
      const { text } = body;
      if (!text) {
        return jsonResponse({ error: "Teks kalimat diperlukan." }, 400);
      }
      const result = generateParaphraseSuggestions(text);
      return jsonResponse(result);
    }

    // 6. POST /api/humanize
    if (route === "humanize" && method === "POST") {
      const body = await request.json();
      const {
        text,
        facultyId = "FIK",
        customUniversity = "Perguruan Tinggi / Universitas",
        customSimilarityMax,
        customAiMax
      } = body;

      if (!text) {
        return jsonResponse({ error: "Teks naskah diperlukan." }, 400);
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

      return jsonResponse({
        success: true,
        transformed,
        modificationsCount,
        plagiarism: afterPlagiarism,
        ai: afterAi,
        compliance
      });
    }

    // 7. POST /api/certificate
    if (route === "certificate" && method === "POST") {
      const body = await request.json();
      const cert = await generateCertificateData(body);
      return jsonResponse({
        success: true,
        certificate: cert
      });
    }

    // 8. POST /api/export/docx
    if (route === "export/docx" && method === "POST") {
      const body = await request.json();
      const { text, title = "Naskah_Karya_Ilmiah_Bebas_Plagiasi", author = "Penulis Karya Ilmiah" } = body;
      if (!text) {
        return jsonResponse({ error: "Teks naskah diperlukan." }, 400);
      }
      const docxBuf = await generateDocxBuffer(text, { title, author });
      const safeTitle = title.replace(/[^a-zA-Z0-9_\-]/g, "_");
      return new Response(docxBuf, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${safeTitle}.docx"`,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // 9. POST /api/export/pdf
    if (route === "export/pdf" && method === "POST") {
      const body = await request.json();
      const { text, title = "Naskah_Karya_Ilmiah_Bebas_Plagiasi", author = "Penulis Karya Ilmiah" } = body;
      if (!text) {
        return jsonResponse({ error: "Teks naskah diperlukan." }, 400);
      }
      const pdfBuf = generatePdfBuffer(text, { title, author });
      const safeTitle = title.replace(/[^a-zA-Z0-9_\-]/g, "_");
      return new Response(pdfBuf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return jsonResponse({ error: `Route /api/${route} not found` }, 404);
  } catch (err) {
    console.error("Pages function error:", err);
    return jsonResponse({ error: "Gagal memproses permintaan: " + err.message }, 500);
  }
}
