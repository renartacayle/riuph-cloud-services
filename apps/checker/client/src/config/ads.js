/**
 * Google AdSense Configuration
 * 
 * Untuk mulai menghasilkan uang dari Google AdSense:
 * 1. Daftar akun di https://www.google.com/adsense/
 * 2. Tambahkan domain website Anda di menu "Sites"
 * 3. Ganti CLIENT_ID dengan publisher ID Anda
 * 4. Buat unit iklan dan masukkan Slot ID di bawah
 */

export const ADSENSE_CONFIG = {
  // Google AdSense Publisher ID Resmi
  CLIENT_ID: "ca-pub-8260281136702906", 
  
  // Siap menayangkan iklan resmi Google
  PREVIEW_MODE: false,

  SLOTS: {
    TOP_LEADERBOARD: "1234567890",   // Slot Iklan Banner Atas (Mobile)
    IN_CONTENT: "2345678901",        // Slot Iklan Di Tengah Hasil Analisis
    BOTTOM_BANNER: "3456789012",     // Slot Iklan Banner Bawah (Mobile)
    LEFT_SKYSCRAPER: "4567890123",   // Slot Iklan Vertikal Kiri (Desktop: 160x600)
    RIGHT_SKYSCRAPER: "5678901234",  // Slot Iklan Vertikal Kanan (Desktop: 160x600)
  }
};
