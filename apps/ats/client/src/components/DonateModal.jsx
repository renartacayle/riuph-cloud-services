import React, { useState } from "react";
import { Heart, X, Copy, Check, Download, Sparkles, ShieldCheck, QrCode } from "lucide-react";

export default function DonateModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyShopee = () => {
    navigator.clipboard.writeText("081228263200");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm sm:max-w-md w-full shadow-2xl overflow-hidden relative text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-2 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800/80 transition cursor-pointer z-10"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-6 text-center">
          {/* Header Badge & Title */}
          <div className="inline-flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold px-3 py-1 rounded-full mb-2.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Dukung Server ATS Master</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
            Scan QRIS Pembayaran Nasional
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Bebas isi nominal berapa saja. Tanpa isi formulir atau data pribadi!
          </p>

          {/* QRIS Image Container Card */}
          <div className="bg-white rounded-2xl p-3 shadow-xl inline-block max-w-[280px] sm:max-w-[300px] border border-slate-200">
            <img 
              src="/qris.jpg" 
              alt="QRIS RENARTASHOP" 
              className="w-full h-auto rounded-xl object-contain shadow-inner"
            />
          </div>

          {/* Payment Methods Pill */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-slate-300 font-medium">
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">BCA</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">Mandiri</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">BRI</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">BNI</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">GoPay</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">Dana</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">OVO</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">ShopeePay</span>
          </div>

          {/* Download & Copy Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href="/qris.jpg"
              download="QRIS_RENARTASHOP.jpg"
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold py-2.5 px-3 rounded-xl transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simpan QRIS</span>
            </a>

            <button
              onClick={handleCopyShopee}
              className={`flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-xl transition cursor-pointer shadow ${
                copied 
                  ? "bg-emerald-500 text-slate-950 font-bold" 
                  : "bg-[#EE4D2D] hover:bg-orange-600 text-white"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Tersalin! ✅" : "No. ShopeePay"}</span>
            </button>
          </div>

          {/* Footer Guarantee */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Standar Pembayaran Nasional QRIS / GPN (a.n. RENARTASHOP)
          </div>
        </div>
      </div>
    </div>
  );
}
