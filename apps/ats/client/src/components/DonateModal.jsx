import React, { useState } from "react";
import { Heart, Coffee, X, Copy, Check, ExternalLink, Sparkles, QrCode, CreditCard, ShieldCheck } from "lucide-react";

export default function DonateModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState("qris"); // 'qris', 'local', 'crypto'

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Title & Icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Dukung Pengembang / Donate
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-semibold px-2 py-0.5 rounded-full border border-rose-500/30">
                  Sukarela
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Bantu kami menjaga server & fitur AI tetap 100% gratis dan tanpa batasan.
              </p>
            </div>
          </div>

          {/* Description banner */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 mb-5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Tool ini disediakan bebas untuk seluruh pencari kerja di Indonesia. Donasi Anda sangat berarti untuk menutupi biaya domain, bandwidth, serta pembaruan algoritma ATS.
            </span>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg bg-slate-950/70 p-1 mb-4 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab("qris")}
              className={`flex-1 py-1.5 rounded-md transition flex items-center justify-center gap-1.5 ${
                activeTab === "qris"
                  ? "bg-rose-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              Saweria & Trakteer
            </button>
            <button
              onClick={() => setActiveTab("local")}
              className={`flex-1 py-1.5 rounded-md transition flex items-center justify-center gap-1.5 ${
                activeTab === "local"
                  ? "bg-rose-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Transfer / E-Wallet
            </button>
          </div>

          {/* Tab 1: Saweria & Trakteer */}
          {activeTab === "qris" && (
            <div className="space-y-3">
              <a
                href="https://saweria.co/riuph"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent hover:from-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 rounded-xl transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                      Saweria (QRIS, GoPay, OVO, Dana)
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      saweria.co/riuph • Dukung mulai dari Rp 1.000
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-amber-500 text-slate-950 px-3 py-1 rounded-lg group-hover:bg-amber-400 transition shadow">
                  Traktir
                </span>
              </a>

              <a
                href="https://trakteer.id/riuph"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent hover:from-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-sm">
                    T
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-red-300 transition flex items-center gap-1.5">
                      Trakteer.id
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      trakteer.id/riuph • Dukung dengan traktiran kopi
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-red-600 text-white px-3 py-1 rounded-lg group-hover:bg-red-500 transition shadow">
                  Kunjungi
                </span>
              </a>
            </div>
          )}

          {/* Tab 2: Bank / E-Wallet */}
          {activeTab === "local" && (
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Saweria Direct URL</div>
                  <div className="font-mono text-sm font-semibold text-white">https://saweria.co/riuph</div>
                </div>
                <button
                  onClick={() => handleCopy("https://saweria.co/riuph", "saweria")}
                  className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg transition"
                >
                  {copiedKey === "saweria" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "saweria" ? "Tersalin" : "Salin"}
                </button>
              </div>

              <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Trakteer Direct URL</div>
                  <div className="font-mono text-sm font-semibold text-white">https://trakteer.id/riuph</div>
                </div>
                <button
                  onClick={() => handleCopy("https://trakteer.id/riuph", "trakteer")}
                  className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg transition"
                >
                  {copiedKey === "trakteer" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "trakteer" ? "Tersalin" : "Salin"}
                </button>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% donasi dialokasikan untuk infrastruktur server & pemeliharaan tools.
          </div>
        </div>
      </div>
    </div>
  );
}
