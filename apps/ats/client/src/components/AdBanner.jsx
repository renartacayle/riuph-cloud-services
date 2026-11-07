import React, { useEffect, useRef } from "react";
import { ADSENSE_CONFIG } from "../config/ads";
import { Sparkles, DollarSign, ExternalLink } from "lucide-react";

/**
 * Responsive Google AdSense Component
 * - Desktop: Lateral side banners / Skyscrapers (Left & Right)
 * - Mobile: Top & Bottom Leaderboards
 * - Mematuhi kebijakan Google AdSense: label wajib "IKLAN / ADVERTISEMENT"
 */
export default function AdBanner({
  slotKey = "TOP_LEADERBOARD",
  position = "top",
  className = ""
}) {
  const isPushedRef = useRef(false);
  const isConfigured =
    ADSENSE_CONFIG.PUBLISHER_ID &&
    ADSENSE_CONFIG.PUBLISHER_ID !== "ca-pub-XXXXXXXXXXXXXXXX";

  const slotInfo = ADSENSE_CONFIG.SLOTS[slotKey] || ADSENSE_CONFIG.SLOTS.TOP_LEADERBOARD;
  const isVertical = position === "left" || position === "right" || slotInfo.format === "vertical";

  useEffect(() => {
    if (isConfigured && typeof window !== "undefined" && !isPushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushedRef.current = true;
      } catch (e) {
        console.debug("AdSense push notification:", e);
      }
    }
  }, [isConfigured, slotKey]);

  // JIKA SUDAH DIKONFIGURASI DENGAN ID GOOGLE ADSENSE
  if (isConfigured) {
    if (isVertical) {
      return (
        <div className={`flex flex-col items-center justify-start w-[160px] ${className}`}>
          <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">
            IKLAN / ADS
          </span>
          <div className="w-[160px] min-h-[600px] bg-slate-100 rounded-xl border border-slate-200 p-1 flex flex-col items-center justify-center text-center overflow-hidden shadow-xs">
            <ins
              className="adsbygoogle"
              style={{ display: "inline-block", width: "160px", height: "600px" }}
              data-ad-client={ADSENSE_CONFIG.PUBLISHER_ID}
              data-ad-slot={slotInfo.slotId}
              data-ad-format="vertical"
              data-full-width-responsive="false"
            />
          </div>
        </div>
      );
    }

    // Horizontal (Top / Bottom Mobile Banner)
    return (
      <div className={`w-full flex flex-col items-center justify-center ${className}`}>
        <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 mb-1">
          IKLAN / ADVERTISEMENT
        </span>
        <div className="w-full overflow-hidden bg-slate-100 rounded-xl border border-slate-200 p-1 text-center shadow-xs">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "90px", width: "100%" }}
            data-ad-client={ADSENSE_CONFIG.PUBLISHER_ID}
            data-ad-slot={slotInfo.slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // JIKA BELUM DIKONFIGURASI ATAU PREVIEW PLACEHOLDER AKTIF
  if (!ADSENSE_CONFIG.SHOW_TEST_PLACEHOLDER) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 px-1">
        <span>Slot Iklan ({slotInfo.label})</span>
        <span className="text-emerald-500 flex items-center gap-1 font-semibold">
          <DollarSign className="w-3 h-3" /> AdSense Ready
        </span>
      </div>
      <div className="w-full rounded-xl border border-dashed border-emerald-500/30 bg-emerald-50 p-4 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-xs font-semibold text-slate-700 text-center">
          {slotInfo.label} ({slotInfo.format})
        </div>
      </div>
    </div>
  );
}
