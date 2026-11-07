import React, { useState } from "react";
import { Heart, Coffee, X, Copy, Check, ExternalLink, Sparkles, ShieldCheck, QrCode, Wallet, CreditCard } from "lucide-react";

export default function DonateModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Creator Profile & Title */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                <Heart className="w-6 h-6 fill-emerald-500 text-emerald-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Dukung Renarta
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SociaBuzz
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Traktir kopi atau donasi sukarela untuk server ATS Master
              </p>
            </div>
          </div>

          {/* Description banner */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 mb-5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Layanan ini disediakan 100% gratis tanpa batasan kuota untuk seluruh pencari kerja. Donasi sukarela Anda sangat berharga untuk biaya operasional server dan pembaruan sistem.
            </span>
          </div>

          {/* Main SociaBuzz Tribe Card */}
          <div className="space-y-3">
            <a
              href="https://sociabuzz.com/renarta/tribe"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent hover:from-emerald-500/25 border border-emerald-500/40 hover:border-emerald-500/60 rounded-xl transition duration-200 shadow-lg shadow-emerald-950/40"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs shadow">
                    SB
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                    SociaBuzz Tribe
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg group-hover:bg-emerald-400 transition shadow">
                  Traktir Sekarang
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-2.5">
                Dukung via <span className="text-emerald-300 font-semibold">sociabuzz.com/renarta/tribe</span>
              </p>
              
              {/* Payment Methods Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-emerald-500/20 text-[10px] text-slate-300">
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">QRIS</span>
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">GoPay</span>
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">OVO</span>
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">Dana</span>
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">ShopeePay</span>
                <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700/60">Virtual Account</span>
              </div>
            </a>

            {/* Quick Copy Box */}
            <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="text-[11px] text-slate-400">Direct Link Donasi:</div>
                <div className="font-mono text-xs font-semibold text-emerald-400 truncate">
                  https://sociabuzz.com/renarta/tribe
                </div>
              </div>
              <button
                onClick={() => handleCopy("https://sociabuzz.com/renarta/tribe", "tribe")}
                className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
              >
                {copiedKey === "tribe" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === "tribe" ? "Tersalin" : "Salin"}</span>
              </button>
            </div>

            {/* LinkBio Profile Option */}
            <div className="text-center pt-1">
              <a
                href="https://sociabuzz.com/renarta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 transition inline-flex items-center gap-1 underline underline-offset-4"
              >
                Lihat Profil Lengkap Renarta di SociaBuzz
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Footer Guarantee */}
          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% donasi diterima langsung oleh Renarta via platform SociaBuzz.
          </div>
        </div>
      </div>
    </div>
  );
}
