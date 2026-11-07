/**
 * RIUPH Cloud Services - Master Multi-Domain Gateway
 * Single Render Web Service hosting both:
 * 1. ATS Master HRD Screener (ats.riuph.me / hrd.riuph.me)
 * 2. Veritas Academic Plagiarism & AI Integrity Engine (checker.riuph.me / plagiat.riuph.me)
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import atsApp from "./apps/ats/server/app.js";
import checkerApp from "./apps/checker/server/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const masterApp = express();

// Trust reverse proxies (Cloudflare, Render, etc.) to read accurate host and IP
masterApp.set("trust proxy", true);

// Health check endpoint for UptimeRobot / pingers (24/7 keep-alive)
masterApp.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      ats: "online",
      checker: "online"
    }
  });
});

// Domain-based Multi-Tenant Dispatcher
masterApp.use((req, res, next) => {
  const host = (
    req.headers["x-forwarded-host"] ||
    req.hostname ||
    req.headers.host ||
    ""
  ).toLowerCase();

  // Route: ATS Master CV Screener
  if (host.includes("ats") || host.includes("hrd")) {
    return atsApp(req, res, next);
  }

  // Route: Academic Plagiarism & AI Checker
  if (host.includes("checker") || host.includes("plagiat")) {
    return checkerApp(req, res, next);
  }

  // Path-based fallback for direct *.onrender.com or localhost testing
  if (req.path.startsWith("/ats")) {
    req.url = req.url.replace(/^\/ats/, "") || "/";
    return atsApp(req, res, next);
  }

  if (req.path.startsWith("/checker")) {
    req.url = req.url.replace(/^\/checker/, "") || "/";
    return checkerApp(req, res, next);
  }

  // Default fallback to checker application
  return checkerApp(req, res, next);
});

const PORT = process.env.PORT || 10000;
masterApp.listen(PORT, "0.0.0.0", () => {
  console.log("==========================================================");
  console.log(` 🌐 RIUPH MASTER MULTI-DOMAIN GATEWAY ACTIVE`);
  console.log(` 🚀 Listening on Port: ${PORT}`);
  console.log(` 📋 Domain 1: ats.riuph.me     -> ATS Master CV Screener`);
  console.log(` 🎓 Domain 2: checker.riuph.me -> Plagiarism & AI Checker`);
  console.log(` 💓 Health:   /health (UptimeRobot Keep-Alive Endpoint)`);
  console.log("==========================================================");
});
