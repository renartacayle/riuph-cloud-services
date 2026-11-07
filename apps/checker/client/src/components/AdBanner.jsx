import React, { useEffect, useRef } from "react";
import { ADSENSE_CONFIG } from "../config/ads.js";
import { Sparkles, DollarSign } from "lucide-react";

/**
 * Responsive Google AdSense Component
 * - Desktop: Skyscrapers (Left & Right)
 * - Mobile: Top & Bottom Leaderboard
 * - Kebijakan Resmi Google: Label "IKLAN / ADVERTISEMENT"
 */
export default function AdBanner({
  slotKey,
  position = "top",
  type = "top-leaderboard",
  className = ""
}) {
  const isPushedRef = useRef(false);
  const isConfigured =
    ADSENSE_CONFIG.CLIENT_ID &&
    !ADSENSE_CONFIG.CLIENT_ID.includes("XXXX");

  // Determine slot ID
  const effectiveKey = slotKey || (
    position === "left" ? "LEFT_SKYSCRAPER" :
    position === "right" ? "RIGHT_SKYSCRAPER" :
    position === "bottom" || type === "bottom" ? "BOTTOM_BANNER" :
    "TOP_LEADERBOARD"
  );

  const slotId = ADSENSE_CONFIG.SLOTS[effectiveKey] || ADSENSE_CONFIG.SLOTS.TOP_LEADERBOARD;
  const isVertical = position === "left" || position === "right" || effectiveKey.includes("SKYSCRAPER");

  useEffect(() => {
    if (isConfigured && typeof window !== "undefined" && !isPushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushedRef.current = true;
      } catch (e) {
        console.debug("AdSense push:", e);
      }
    }
  }, [isConfigured, effectiveKey]);

  if (isConfigured) {
    if (isVertical) {
      return (
        <div className={`flex flex-col items-center justify-start w-[160px] ${className}`}>
          <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">
            IKLAN / ADS
          </span>
          <div className="w-[160px] min-h-[600px] bg-slate-100/90 rounded-xl border border-slate-300 p-1 flex flex-col items-center justify-center text-center overflow-hidden shadow-xs relative">
            <ins
              className="adsbygoogle relative z-10"
              style={{ display: "inline-block", width: "160px", height: "600px" }}
              data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
              data-ad-slot={slotId}
              data-ad-format="vertical"
              data-full-width-responsive="false"
            />
            {/* Fallback indicator while ad loads or awaits Google inventory */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-slate-400 pointer-events-none z-0">
              <span className="text-[10px] font-mono font-semibold text-slate-500">Google AdSense</span>
              <span className="text-[9px] text-slate-400">160 × 600</span>
            </div>
          </div>
        </div>
      );
    }

    // Horizontal Mobile Top / Bottom Banner
    return (
      <div className={`w-full flex flex-col items-center justify-center ${className}`}>
        <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">
          IKLAN / ADVERTISEMENT
        </span>
        <div className="w-full overflow-hidden bg-slate-100/90 rounded-xl border border-slate-300 p-1 text-center shadow-xs min-h-[90px] relative flex items-center justify-center">
          <ins
            className="adsbygoogle relative z-10"
            style={{ display: "block", minHeight: "90px", width: "100%" }}
            data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          {/* Fallback indicator while ad loads */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 p-3 text-slate-400 pointer-events-none z-0">
            <span className="text-[10px] font-mono font-semibold text-slate-500">Google AdSense</span>
            <span className="text-[9px] text-slate-400">• Unit Iklan Aktif</span>
          </div>
        </div>
      </div>
    );
  }

  // Preview Mode
  if (!ADSENSE_CONFIG.PREVIEW_MODE) {
    return null;
  }

  return (
    <div className={`my-2 w-full flex flex-col items-center justify-center ${className}`}>
      <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">
        IKLAN / ADVERTISEMENT
      </div>
      <div className="w-full py-3 px-4 rounded-xl border border-dashed border-blue-400 bg-blue-50/50 flex items-center justify-center gap-2 text-xs text-blue-900">
        <DollarSign className="w-4 h-4 text-emerald-600" />
        <span className="font-semibold">Unit Iklan AdSense Siap ({effectiveKey})</span>
      </div>
    </div>
  );
}
