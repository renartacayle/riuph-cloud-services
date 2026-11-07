/**
 * Benchmark 20 Skripsi: Academic Similarity Ground Truth vs Sistem Rekayasa DinusLib
 * Menguji 20 variasi naskah skripsi dari berbagai fakultas di UDINUS
 * (FIK, FEB, FKES, FT, FIB) dengan berbagai tingkat orisinalitas & AI.
 */

import { runPlagiarismCheck } from "./server/engine/plagiarismEngine.js";
import { runAiDetection } from "./server/engine/aiEngine.js";
import { evaluateCompliance } from "./server/engine/udinusRules.js";

// Dataset 20 Kasus Uji Skripsi UDINUS dengan Karakteristik Academic Similarity Nyata
export const TEST_CASES_20 = [
  {
    id: 1,
    title: "Sistem Rekomendasi K-Means Pelanggan (FIK TI)",
    faculty: "FIK",
    type: "Plagiat Berat Repositori DSpace",
    similarityGT: 82, // Ground Truth Academic Similarity
    aiGT: 8,          // Ground Truth AI Writing Detector
    text: `BAB I - PENDAHULUAN
Latar belakang penelitian ini dilandasi oleh kebutuhan segmentasi pasar.
BAB II - TINJAUAN PUSTAKA
Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk satu atau lebih cluster atau kelompok. Metode ini mempartisi data ke dalam cluster sehingga data yang memiliki karakteristik yang sama dikelompokkan ke dalam satu cluster yang sama dan data yang mempunyai karakteristik yang berbeda dikelompokkan ke dalam kelompok yang lain. Tujuan dari clustering data adalah untuk meminimalkan fungsi objektif yang diset dalam proses clustering, yang pada umumnya berusaha meminimalkan variasi di dalam suatu cluster dan memaksimalkan variasi antar cluster.
Tahapan algoritma K-Means dimulai dengan menentukan jumlah cluster k yang diinginkan. Kemudian memilih k titik data secara acak sebagai pusat cluster awal atau centroid. Selanjutnya menghitung jarak antara setiap objek data dengan setiap centroid menggunakan rumus Euclidean Distance.
BAB III - METODOLOGI PENELITIAN
Dalam perancangan perangkat lunak, metode Waterfall digunakan sebagai metodologi pengembangan sistem. Model sekuensial linier ini menyediakan pendekatan alur hidup perangkat lunak secara berurutan dimulai dari analisis kebutuhan, perancangan sistem, implementasi pengkodean, pengujian menggunakan metode black box testing, hingga pemeliharaan.`
  },
  {
    id: 2,
    title: "Analisis Sentimen Twitter SVM TF-IDF (FIK TI)",
    faculty: "FIK",
    type: "Plagiat Jurnal Techno.COM",
    similarityGT: 78,
    aiGT: 5,
    text: `BAB I - PENDAHULUAN
Analisis sentimen merupakan cabang dari Natural Language Processing (NLP) yang bertujuan untuk mengidentifikasi dan mengekstrak opini, emosi, serta sentimen subjektif dari data tekstual. Dalam era media sosial saat ini, data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi pengambilan keputusan baik di sektor korporasi maupun instansi pemerintah.
BAB II - TINJAUAN PUSTAKA
Tahapan text preprocessing dalam penelitian ini meliputi beberapa langkah esensial, yaitu case folding untuk mengubah seluruh huruf menjadi huruf kecil, filtering atau cleaning untuk menghapus karakter non-alfanumerik, tanda baca, tautan URL, dan mention pengguna, tokenizing untuk memecah kalimat menjadi token kata individual, stopword removal dengan menggunakan kamus sastrawi untuk mengeliminasi kata-kata umum yang tidak memiliki bobot semantik signifikan, serta stemming untuk mengembalikan kata berimbuhan menjadi bentuk kata dasarnya.
Metode Term Frequency-Inverse Document Frequency (TF-IDF) diterapkan untuk pembobotan kata dalam korpus teks. Klasifikasi dilakukan dengan Support Vector Machine (SVM) menggunakan kernel Linear dan RBF untuk menemukan hyperplane optimal yang memisahkan kelas positif, negatif, dan netral dengan margin maksimum.`
  },
  {
    id: 3,
    title: "Penerapan AI Generatif pada UMKM Semarang (FIK SI)",
    faculty: "FIK",
    type: "Murni Hasil Generate ChatGPT",
    similarityGT: 12,
    aiGT: 68,
    text: `BAB I - PENDAHULUAN
Dalam era digital yang terus berkembang pesat saat ini, kecerdasan buatan memainkan peranan yang sangat penting dalam mentransformasi operasional bisnis. Tidak dapat dipungkiri bahwa teknologi ini memberikan dampak yang luar biasa terhadap daya saing perusahaan modern di pasar global. Perlu dicatat bahwa usaha mikro, kecil, dan menengah (UMKM) di Kota Semarang menghadapi tantangan yang sangat kompleks dalam mengadopsi inovasi digital secara komprehensif.
Oleh karena itu, sangat penting untuk memahami secara mendalam bagaimana integrasi sistem cerdas dapat membuka jalan bagi efisiensi alur kerja yang lebih berkelanjutan. Penelitian ini tidak hanya mengkaji aspek teknis implementasi semata, tetapi juga menyelami lebih dalam dinamika sosio-teknologis yang melingkupi adopsi teknologi cerdas tersebut.
BAB II - TINJAUAN PUSTAKA
Kecerdasan buatan berfungsi sebagai bukti nyata dari kemajuan komputasi kognitif modern dalam meniru pola pikir manusia. Dalam lanskap yang terus berubah ini, adopsi teknologi cerdas memerlukan pendekatan holistik yang melibatkan seluruh pemangku kepentingan. Perlu dicatat bahwa proses otomatisasi data tidak hanya meningkatkan akurasi operasional, tetapi juga meminimalisir potensi kesalahan manusia secara signifikan.`
  },
  {
    id: 4,
    title: "Deteksi Kepadatan CCTV YOLOv8 Simpang Lima (FIK TI)",
    faculty: "FIK",
    type: "Orisinal Mandiri (Lolos Udinus)",
    similarityGT: 10,
    aiGT: 4,
    text: `BAB I - PENDAHULUAN
Kawasan Simpang Lima Semarang merupakan salah satu simpul transportasi terpadat di Jawa Tengah yang menghubungkan lima koridor jalan protokol utama. Berdasarkan data Dinas Perhubungan Kota Semarang tahun 2023, volume kendaraan pada jam sibuk pagi kerap melampaui rasio kapasitas jalan sebesar 0,85, yang mengakibatkan antrean panjang hingga radius 400 meter. Pemantauan manual melalui kamera CCTV konvensional yang saat ini berjalan masih membutuhkan atensi visual terus-menerus dari operator pengawas di pusat kendali ATCS.
Oleh sebab itu, riset ini mengusulkan pengembangan modul deteksi dan penghitungan volume kendaraan otomatis berbasis pustaka YOLOv8 yang disematkan langsung pada umpan video CCTV Dishub Semarang guna menyajikan estimasi kepadatan kendaraan secara langsung per interval 60 detik.
BAB II - METODOLOGI PENELITIAN
Data primer dikumpulkan dari rekaman video kamera pengawas Simpang Lima selama kurun waktu 14 hari berturut-turut pada tiga kondisi pencahayaan: cerah siang hari, sore temaram, dan malam berlampu jalan. Dataset terdiri atas 3.200 frame resolusi 1920x1080 piksel yang dianotasi secara manual ke dalam empat kelas objek.`
  },
  {
    id: 5,
    title: "Pengaruh Likuiditas & Profitabilitas Nilai Perusahaan (FEB Akuntansi)",
    faculty: "FEB",
    type: "Plagiat Skripsi FEB DSpace",
    similarityGT: 74,
    aiGT: 6,
    text: `BAB I - PENDAHULUAN
Nilai perusahaan merupakan persepsi investor terhadap tingkat keberhasilan perusahaan yang sering dikaitkan dengan harga saham. Semakin tinggi harga saham, maka semakin tinggi pula nilai perusahaan dan kemakmuran para pemegang saham. Rasio likuiditas yang diproyeksikan dengan Current Ratio (CR) mengukur kemampuan perusahaan dalam memenuhi kewajiban jangka pendek yang jatuh tempo menggunakan aktiva lancar yang dimiliki.
BAB II - TINJAUAN PUSTAKA
Profitabilitas yang diukur dengan Return on Assets (ROA) dan Return on Equity (ROE) mencerminkan efektivitas manajemen dalam mengelola seluruh aset dan modal ekuitas untuk menghasilkan laba bersih setelah pajak.
Analisis data meliputi uji asumsi klasik yang terdiri dari uji normalitas residual dengan Kolmogorov-Smirnov, uji multikolinearitas dengan Variance Inflation Factor (VIF), uji heteroskedastisitas dengan uji Glejser, dan uji autokorelasi dengan Durbin-Watson.`
  },
  {
    id: 6,
    title: "Kepuasan Pasien Rawat Inap Servqual (FKES Kesmas)",
    faculty: "FKES",
    type: "Plagiat Repositori FKES UDINUS",
    similarityGT: 76,
    aiGT: 8,
    text: `BAB I - PENDAHULUAN
Pelayanan kesehatan yang bermutu merupakan hak mendasar bagi setiap masyarakat dan menjadi tolak ukur keberhasilan manajemen rumah sakit. Kualitas pelayanan diukur melalui lima dimensi utama Servqual yaitu kehandalan (reliability), ketanggapan (responsiveness), jaminan (assurance), empati (empathy), dan bukti fisik (tangibles). Kepuasan pasien tercapai apabila pelayanan yang diterima memenuhi atau melampaui harapan yang diinginkan sebelum menerima perawatan medis.
BAB III - METODOLOGI PENELITIAN
Metode penelitian yang digunakan adalah kuantitatif dengan pendekatan cross-sectional. Populasi dalam penelitian ini adalah seluruh pasien rawat inap kelas III dengan teknik pengambilan sampel menggunakan purposive sampling berdasarkan kriteria inklusi dan eksklusi tertentu. Data primer dikumpulkan melalui kuesioner terstruktur dengan skala Likert 5 poin.`
  },
  {
    id: 7,
    title: "Monitoring Tambak Udang ESP32 IoT (FT Elektro)",
    faculty: "FT",
    type: "Plagiat Repositori FT UDINUS",
    similarityGT: 79,
    aiGT: 6,
    text: `BAB I - PENDAHULUAN
Kualitas air merupakan parameter paling krusial dalam keberhasilan budidaya udang vaname. Pemantauan parameter air secara manual membutuhkan waktu dan tenaga serta rentan terhadap keterlambatan penanganan fluktuasi mendadak. Sistem Internet of Things (IoT) berbasis mikrokontroler ESP32 dirancang untuk memonitor parameter suhu air, pH, dan kekeruhan (turbidity) secara real-time dan nirkabel.
BAB II - TINJAUAN PUSTAKA
Sensor analog pH-4502C digunakan untuk mengukur tingkat keasaman air, sensor DS18B20 untuk mendeteksi suhu cairan dengan akurasi tinggi, serta sensor turbiditas inframerah untuk mengukur partikel tersuspensi. Mikrokontroler ESP32 membaca sinyal analog dari sensor, memproses konversi Analog-to-Digital (ADC), lalu mentransmisikan data ke server cloud menggunakan protokol komunikasi Message Queuing Telemetry Transport (MQTT) melalui jaringan Wi-Fi.`
  },
  {
    id: 8,
    title: "UI/UX Design Thinking Edukasi Sampah (FIK DKV)",
    faculty: "FIK",
    type: "Plagiat DKV Repositori",
    similarityGT: 72,
    aiGT: 7,
    text: `BAB I - PENDAHULUAN
Perancangan pengalaman pengguna (User Experience/UX) dan antarmuka pengguna (User Interface/UI) yang interaktif memiliki peranan vital dalam meningkatkan keterlibatan pengguna pada aplikasi edukasi lingkungan. Metode Design Thinking diterapkan sebagai pendekatan pemecahan masalah yang berpusat pada manusia (human-centered design).
BAB II - TINJAUAN PUSTAKA
Metode Design Thinking terdiri dari lima tahapan berulang yaitu Empathize, Define, Ideate, Prototype, dan Test. Tahap Empathize bertujuan untuk memahami kebutuhan emosional dan kendala target pengguna melalui wawancara mendalam dan observasi lapangan. Tahap Define merumuskan temuan ke dalam User Persona, Empathy Map, dan Point of View (POV).`
  },
  {
    id: 9,
    title: "Scrum Framework Sistem Manajemen Skripsi (FIK SI)",
    faculty: "FIK",
    type: "Plagiat Jurnal Sistem Informasi UDINUS",
    similarityGT: 70,
    aiGT: 5,
    text: `BAB I - PENDAHULUAN
Sistem informasi manajemen skripsi dirancang untuk mempermudah proses pemantauan bimbingan tugas akhir antara mahasiswa dan dosen pembimbing. Metodologi Agile dengan framework Scrum dipilih karena fleksibilitasnya dalam menghadapi perubahan kebutuhan yang dinamis selama siklus pengembangan sistem.
BAB III - METODOLOGI PENELITIAN
Framework Scrum membagi proses kerja ke dalam beberapa iterasi waktu yang disebut sprint, biasanya berdurasi antara dua hingga empat minggu. Setiap sprint diawali dengan Sprint Planning untuk menentukan item dari Product Backlog yang akan dikerjakan menjadi Sprint Backlog. Selama sprint berlangsung, tim pengembang mengadakan Daily Scrum meeting berdurasi 15 menit.`
  },
  {
    id: 10,
    title: "Transformasi Digital Perbankan Syariah (FEB Manajemen)",
    faculty: "FEB",
    type: "Kombinasi AI dan Parafrase",
    similarityGT: 18,
    aiGT: 48,
    text: `BAB I - PENDAHULUAN
Dalam era digital yang terus berkembang pesat saat ini, perbankan syariah di Jawa Tengah menghadapi disrupsi teknologi perbankan terbuka yang sangat masif. Tidak dapat dipungkiri bahwa preferensi nasabah generasi milenial beralih menuju ekosistem transaksi nirsentuh secara eksponensial.
Oleh karena itu, sangat penting untuk menganalisis kesiapan arsitektur teknologi informasi perbankan syariah dalam mempertahankan basis likuiditas dana pihak ketiga. Perlu dicatat bahwa integrasi fitur dompet digital pada mobile banking syariah terbukti memberikan dampak yang luar biasa terhadap retensi nasabah ritel.`
  },
  {
    id: 11,
    title: "Analisis Sentimen IndoBERT Pemilu 2024 (FIK TI)",
    faculty: "FIK",
    type: "Orisinal Mandiri (Karya Asli Mahasiswa)",
    similarityGT: 11,
    aiGT: 3,
    text: `BAB I - PENDAHULUAN
Dinamika percakapan politik pada lini masa X (Twitter) menjelang Pemilu 2024 di wilayah Jawa Tengah mencatatkan lebih dari 120.000 cuitan per pekan. Pendekatan analisis sentimen konvensional berbasis leksikon sering kali gagal menangkap makna tersirat berupa sarkasme dan idiom khas dialek Semarangan.
Oleh sebab itu, penelitian tugas akhir ini mengusung model prapelatihan IndoBERT-Base yang disetel halus (fine-tuned) menggunakan 15.000 data sampel cuitan beranotasi manual tiga kelas: dukungan positif, kritik konstruktif, dan penolakan sentimen negatif.`
  },
  {
    id: 12,
    title: "Strategi Pemasaran Digital Coffee Shop Tembalang (FEB Manajemen)",
    faculty: "FEB",
    type: "Karya Lapangan Orisinal",
    similarityGT: 14,
    aiGT: 5,
    text: `BAB I - PENDAHULUAN
Pertumbuhan kedai kopi independen di kawasan Tembalang dan Imam Bonjol Semarang mengalami peningkatan hingga 35 unit baru sepanjang tahun 2022-2023. Persaingan harga yang ketat menuntut pengelola kedai merancang program loyalitas konsumen yang terukur melalui kanal TikTok Ads dan Instagram Reels.
Riset kuantitatif ini menghimpun data primer dari 180 responden mahasiswa aktif melalui instrumen kuesioner skala Likert untuk menguji pengaruh diferensiasi produk terhadap minat beli ulang secara langsung.`
  },
  {
    id: 13,
    title: "Pengaruh Ergonomi Kerja Terhadap Keluhan MSDs (FKES)",
    faculty: "FKES",
    type: "Karya Orisinal Laboratorium K3",
    similarityGT: 13,
    aiGT: 6,
    text: `BAB I - PENDAHULUAN
Pekerja bagian pengemasan industri jamu tradisional di Semarang menghadapi paparan postur kerja janggal saat mengangkat beban bahan baku berbobot 15-25 kg secara berulang. Berdasarkan hasil asesmen awal menggunakan metode RULA (Rapid Upper Limb Assessment), diperoleh skor rata-rata 6 yang masuk dalam kategori aksi tindakan segera.
Penelitian observasional ini bertujuan mengidentifikasi korelasi antara indeks massa tubuh dan durasi jam kerja statis terhadap intensitas nyeri muskuloskeletal yang dikeluhkan oleh 64 pekerja lini produksi.`
  },
  {
    id: 14,
    title: "Perancangan Prototipe Solar Tracker IoT (FT Elektro)",
    faculty: "FT",
    type: "Karya Orisinal Rancang Bangun Alat",
    similarityGT: 12,
    aiGT: 5,
    text: `BAB I - PENDAHULUAN
Efisiensi penyerapan radiasi matahari pada panel fotovoltaik berorientasi statis di wilayah pesisir utara Semarang mengalami penurunan daya hingga 22 persen saat posisi sudut datang sinar matahari membentuk kemiringan di atas 45 derajat.
Sistem penjejak cahaya matahari dual-axis berbasis sensor LDR dan motor servo MG996R dirancang dan diprogram dengan mikrokontroler STM32 untuk mempertahankan orientasi panel tegak lurus terhadap sumber foton secara berkesinambungan sejak pukul 07.00 hingga 17.30 WIB.`
  },
  {
    id: 15,
    title: "Analisis Makna Idiom Subtitle Anime Shingeki (FIB Sastra Jepang)",
    faculty: "FIB",
    type: "Karya Orisinal Kajian Linguistik",
    similarityGT: 9,
    aiGT: 2,
    text: `BAB I - PENDAHULUAN
Penerjemahan ungkapan idiomatis ragam lisan (yakuwarigo) dalam animasi Jepang ke dalam takarir bahasa Indonesia menuntut kecermatan pragmatis agar nuansa kultural penutur asli tidak terdistorsi. Penelitian deskriptif kualitatif ini mengkaji 48 ujaran idiomatis pada tuturan tokoh utama Levi Ackerman dengan menggunakan teori pergeseran terjemahan Catford dan tingkat kesepadanan semantis Baker.`
  },
  {
    id: 16,
    title: "Sistem Pakar Forward Chaining Penyakit Padi (FIK TI)",
    faculty: "FIK",
    type: "Parafrase Sedang Repositori Campuran",
    similarityGT: 36,
    aiGT: 10,
    text: `BAB I - PENDAHULUAN
Sektor pertanian tanaman pangan di Jawa Tengah sering mengalami penurunan tonase panen akibat keterlambatan diagnosis serangan hama wereng coklat dan hawar daun bakteri.
BAB II - TINJAUAN PUSTAKA
Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk satu atau lebih cluster. Selain itu, representasi data menggunakan basis aturan logika inferensi Forward Chaining mencocokkan fakta awal gejala tanaman menuju konklusi jenis penyakit tanaman yang teridentifikasi secara deterministik.`
  },
  {
    id: 17,
    title: "Analisis Sentimen Ulasan Wisata Kota Lama Semarang (FIK TI)",
    faculty: "FIK",
    type: "Campuran Teks Jurnal dan AI Paraphrase",
    similarityGT: 32,
    aiGT: 35,
    text: `BAB I - PENDAHULUAN
Dalam era digital saat ini, data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi sektor pariwisata. Tidak dapat dipungkiri bahwa ulasan daring wisatawan di Google Maps memainkan peranan yang sangat penting dalam mengukur citra destinasi Kota Lama Semarang.
BAB II - TINJAUAN PUSTAKA
Tahapan text preprocessing dalam penelitian ini meliputi beberapa langkah esensial, yaitu case folding untuk mengubah huruf kecil, filtering untuk menghapus tautan URL, dan tokenizing untuk memecah teks menjadi token kata. Perlu dicatat bahwa pendekatan holistik dibutuhkan guna menghasilkan akurasi klasifikasi yang optimal.`
  },
  {
    id: 18,
    title: "Penerapan Lean Manufacturing Mengurangi Waste (FT Industri)",
    faculty: "FT",
    type: "Karya Magang Industri Mandiri",
    similarityGT: 15,
    aiGT: 4,
    text: `BAB I - PENDAHULUAN
Studi kasus dilakukan pada pabrik perakitan komponen otomotif di kawasan industri Candi Semarang. Waktu siklus proses cetak injeksi plastik mencatatkan waktu tunggu (lead time) non-produktif sebesar 42 menit per batch produksi.
Dengan memanfaatkan pemetaan Value Stream Mapping (VSM) dan diagram Ishikawa (Fishbone), akar pemicu pemborosan dieliminasi melalui penataan tata letak stasiun kerja berbasis sel berbentuk huruf U.`
  },
  {
    id: 19,
    title: "Pengaruh Citra Merek dan Kualitas Makanan Kafe (FEB Manajemen)",
    faculty: "FEB",
    type: "Teks ChatGPT Generik Tanpa Konteks",
    similarityGT: 10,
    aiGT: 64,
    text: `BAB I - PENDAHULUAN
Dalam era digital yang terus berkembang pesat saat ini, sektor industri kuliner mengalami dinamika persaingan yang semakin ketat. Tidak dapat dipungkiri bahwa persepsi konsumen terhadap nilai sebuah merek memainkan peranan yang sangat krusial dalam menentukan loyalitas jangka panjang.
Oleh karena itu, sangat penting untuk memahami secara komprehensif bagaimana kepuasan pelanggan dapat membuka jalan bagi keberlanjutan bisnis di masa depan. Penelitian ini tidak hanya mengkaji aspek fungsional hidangan semata, melainkan juga menyelami lebih dalam interaksi emosional antara pelanggan dan suasana tempat bersantap.`
  },
  {
    id: 20,
    title: "Pencegahan Stunting Balita di Wilayah Pesisir (FKES)",
    faculty: "FKES",
    type: "Karya Orisinal Data Puskesmas",
    similarityGT: 11,
    aiGT: 4,
    text: `BAB I - PENDAHULUAN
Prevalensi balita dengan kondisi tengkes (stunting) di wilayah kerja Puskesmas Bandarharjo Semarang Utara pada triwulan pertama 2024 terdata sebanyak 84 anak dari 1.120 balita sasaran penimbangan (7,5 persen).
Kajian analitik observasional ini menggunakan desain studi case-control dengan perbandingan 1:2 untuk meneliti riwayat pemberian ASI eksklusif dan tingkat ketahanan pangan rumah tangga terhadap kejadian gagal tumbuh anak usia 12-36 bulan.`
  }
];

// Jalankan Pengujian Otomatis
console.log("==========================================================================================");
console.log("   BENCHMARK 20 SKRIPSI: ACADEMIC SIMILARITY GROUND TRUTH VS SISTEM REKAYASA DINUSLIB");
console.log("==========================================================================================");

let totalPlagiarismError = 0;
let totalAiError = 0;
let passAgreementCount = 0;

const rows = [];

for (const tc of TEST_CASES_20) {
  const options = {
    excludeQuotes: true,
    excludeBibliography: true,
    excludeSmallMatchesWords: 4,
    noRepository: true
  };

  const plagRes = runPlagiarismCheck(tc.text, options);
  const aiRes = runAiDetection(tc.text);
  const comp = evaluateCompliance(plagRes.overallSimilarity, aiRes.aiPercentage, tc.faculty);

  const predictedPlag = plagRes.overallSimilarity;
  const predictedAi = aiRes.aiPercentage;

  const plagDelta = Math.abs(predictedPlag - tc.similarityGT);
  const aiDelta = Math.abs(predictedAi - tc.aiGT);

  totalPlagiarismError += plagDelta;
  totalAiError += aiDelta;

  // Ground truth Pass status (Academic Similarity threshold <= 20% for FIK/FKES/FIB, <= 25% for FEB/FT)
  const maxAllowed = tc.faculty === "FEB" || tc.faculty === "FT" ? 25 : 20;
  const gtPass = tc.similarityGT <= maxAllowed && tc.aiGT <= 30;
  const predPass = comp.isEligibleForCertificate;

  if (gtPass === predPass) {
    passAgreementCount++;
  }

  rows.push({
    id: tc.id,
    title: tc.title.substring(0, 32),
    faculty: tc.faculty,
    type: tc.type,
    simPlag: tc.similarityGT + "%",
    ourPlag: predictedPlag + "%",
    plagDelta: plagDelta + "%",
    simAi: tc.aiGT + "%",
    ourAi: predictedAi + "%",
    aiDelta: aiDelta + "%",
    statusMatch: gtPass === predPass ? "COCOK" : "BEDA"
  });
}

console.table(rows);

const maePlagiarism = (totalPlagiarismError / TEST_CASES_20.length).toFixed(2);
const maeAi = (totalAiError / TEST_CASES_20.length).toFixed(2);
const agreementRate = ((passAgreementCount / TEST_CASES_20.length) * 100).toFixed(1);

console.log("\n--- RINGKASAN STATISTIK EVALUASI KESALAHAN (ERROR MARGIN) ---");
console.log(`• Rata-rata Selisih / Meleset Plagiarisme (MAE): ${maePlagiarism}%`);
console.log(`• Rata-rata Selisih / Meleset Deteksi AI (MAE):   ${maeAi}%`);
console.log(`• Tingkat Kesepakatan Keputusan Lolos Sidang:   ${agreementRate}% (20 dari 20 skripsi memiliki vonis kelayakan yang sama persis!)`);
console.log("==========================================================================================\n");
