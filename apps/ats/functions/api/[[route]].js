/**
 * Cloudflare Pages Functions Handler for ATS Master HRD CV Screener
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

import { runFullAtsScan } from "../../server/engine/masterAtsScanner.js";
import { PRESET_JOB_DESCRIPTIONS } from "../../server/engine/taxonomyData.js";
import { parseDocumentBuffer } from "../../server/utils/docParser.js";

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
  const url = new URL(request.url);
  const route = Array.isArray(params.route) ? params.route.join("/") : (params.route || "");
  const method = request.method.toUpperCase();

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    return onRequestOptions();
  }

  try {
    // 1. GET /api/status
    if (route === "status" && method === "GET") {
      return jsonResponse({
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
    }

    // 2. GET /api/presets
    if (route === "presets" && method === "GET") {
      return jsonResponse({ presets: PRESET_JOB_DESCRIPTIONS });
    }

    // 3. POST /api/scan
    if (route === "scan" && method === "POST") {
      const body = await request.json();
      const { cvText, jdText, options } = body;

      if (!cvText || cvText.trim().length < 20) {
        return jsonResponse(
          { error: "Isi teks CV tidak boleh kosong atau terlalu pendek (minimal 20 karakter)." },
          400
        );
      }

      const result = runFullAtsScan(cvText, jdText || "", options || {});
      return jsonResponse(result);
    }

    // 4. POST /api/scan-file
    if (route === "scan-file" && method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return jsonResponse({ error: "Tidak ada file dokumen yang diunggah." }, 400);
      }

      const jdText = formData.get("jdText") || "";
      let options = {};
      const rawOptions = formData.get("options");
      if (rawOptions) {
        try {
          options = JSON.parse(rawOptions);
        } catch (e) {
          options = {};
        }
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const parsedDoc = await parseDocumentBuffer(buffer, file.type, file.name);

      if (!parsedDoc.text || parsedDoc.text.trim().length < 20) {
        return jsonResponse(
          { error: "Gagal mengekstrak teks dari file yang diunggah. Pastikan file bukan berupa scan gambar murni tanpa OCR." },
          400
        );
      }

      const result = runFullAtsScan(parsedDoc.text, jdText, {
        ...options,
        metadata: {
          filename: file.name,
          filesize: file.size,
          pages: parsedDoc.pages,
          format: parsedDoc.format
        }
      });

      result.document = {
        filename: file.name,
        filesize: file.size,
        format: parsedDoc.format,
        pages: parsedDoc.pages,
        extractedLength: parsedDoc.text.length,
        extractedText: parsedDoc.text
      };

      return jsonResponse(result);
    }

    return jsonResponse({ error: `Route /api/${route} not found` }, 404);
  } catch (err) {
    console.error("Pages function error:", err);
    return jsonResponse({ error: "Gagal memproses permintaan: " + err.message }, 500);
  }
}
