import React, { useState } from "react";
import { Heart, X, Copy, Check, ExternalLink, Sparkles, ShieldCheck, Wallet, ArrowRight, QrCode } from "lucide-react";

export default function DonateModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyShopee = () => {
    navigator.clipboard.writeText("081228263200");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-orange-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Creator Profile & Title */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 via-cyan-500/20 to-amber-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-md">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Dukung Veritas Suite
                <span className="text-[10px] bg-orange-500/20 text-orange-300 font-semibold px-2 py-0.5 rounded-full border border-orange-500/30">
                  Tanpa Form / Instan
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Donasi sukarela untuk server Veritas Academic Suite
              </p>
            </div>
          </div>

          {/* Description banner */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 mb-5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Layanan pengujian plagiasi & deteksi AI ini 100% gratis untuk mahasiswa. Donasi sukarela Anda sangat berharga untuk biaya operasional server.
            </span>
          </div>

          <div className="space-y-3.5">
            {/* 1. PRIMARY: ShopeePay Instant Transfer Card */}
            <div className="p-4 bg-gradient-to-br from-orange-500/15 via-orange-600/10 to-slate-900 border-2 border-orange-500/50 rounded-2xl shadow-xl shadow-orange-950/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EE4D2D] text-white flex items-center justify-center font-black text-sm shadow">
                    S
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      ShopeePay Transfer
                    </span>
                    <span className="text-[11px] text-orange-300">
                      Transfer Langsung (Tanpa Isi Biodata)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/40 px-2 py-0.5 rounded-full">
                  Paling Mudah
                </span>
              </div>

              {/* Number Display */}
              <div className="bg-slate-950/80 border border-orange-500/30 rounded-xl p-3 my-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Nomor ShopeePay:</div>
                  <div className="font-mono text-base font-extrabold text-orange-400 tracking-wide">
                    0812-2826-3200
                  </div>
                  <div className="text-[11px] text-slate-400">a.n. Renarta</div>
                </div>

                <button
                  onClick={handleCopyShopee}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer ${
                    copied 
                      ? "bg-emerald-500 text-slate-950 scale-105" 
                      : "bg-[#EE4D2D] hover:bg-orange-600 text-white hover:scale-105"
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Tersalin! ✅" : "Salin Nomor"}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                Buka Shopee ➔ Menu <b>ShopeePay</b> ➔ <b>Transfer</b> ➔ Masukkan nomor di atas.
              </div>
            </div>

            {/* 2. SECONDARY: SociaBuzz Tribe (QRIS Semua Bank) */}
            <a
              href="https://sociabuzz.com/renarta/tribe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition flex items-center gap-1">
                    Mau Scan QRIS (BCA / Mandiri / GoPay / Dana)?
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Bisa via SociaBuzz Tribe (sociabuzz.com/renarta/tribe)
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
            </a>
          </div>

          {/* Footer Guarantee */}
          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            100% donasi diterima langsung oleh Renarta tanpa potongan pihak ketiga.
          </div>
        </div>
      </div>
    </div>
  );
}
