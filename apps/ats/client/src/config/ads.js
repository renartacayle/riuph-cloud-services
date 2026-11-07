/**
 * Google AdSense Configuration
 * 
 * Untuk mengaktifkan iklan Google Ads sungguhan dan mulai menghasilkan pendapatan:
 * 1. Daftar akun di https://www.google.com/adsense
 * 2. Tambahkan domain website Vercel Anda di menu "Sites"
 * 3. Ganti PUBLISHER_ID di bawah ini dengan ID Publisher Anda (format: ca-pub-XXXXXXXXXXXXXXXX)
 * 4. Buat unit iklan Display di menu "Ad units" dan masukkan Slot ID ke konfigurasi slot di bawah
 */

export const ADSENSE_CONFIG = {
  // Google AdSense Publisher ID Resmi
  PUBLISHER_ID: "ca-pub-8260281136702906",

  // Siap menayangkan unit iklan resmi Google
  SHOW_TEST_PLACEHOLDER: false,

  // Definisi Slot Iklan
  SLOTS: {
    TOP_LEADERBOARD: {
      slotId: "1234567890",
      format: "horizontal", // 728x90 / responsive horizontal banner (Mobile)
      label: "Mobile Top Leaderboard"
    },
    IN_CONTENT: {
      slotId: "2345678901",
      format: "auto", // responsive content box
      label: "ATS Audit In-Content Unit"
    },
    BOTTOM_BANNER: {
      slotId: "3456789012",
      format: "horizontal", // 728x90 footer banner (Mobile)
      label: "Mobile Bottom Footer Banner"
    },
    LEFT_SKYSCRAPER: {
      slotId: "4567890123",
      format: "vertical", // 160x600 Skyscraper (Desktop Left)
      label: "Desktop Left Skyscraper"
    },
    RIGHT_SKYSCRAPER: {
      slotId: "5678901234",
      format: "vertical", // 160x600 Skyscraper (Desktop Right)
      label: "Desktop Right Skyscraper"
    }
  }
};
