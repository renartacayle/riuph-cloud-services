/**
 * Preloaded Sample Theses for Instant 1-Click Testing
 * Calibrated for universal higher education disciplines (Computer Science, Business, Engineering, Health).
 */

export const SAMPLE_THESES = [
  {
    id: "sample-high-plagiarism",
    label: "Contoh 1: Naskah Ilmu Komputer (Plagiarisme Tinggi ~38%)",
    facultyId: "FIK",
    facultyName: "Ilmu Komputer & Informatika",
    studyProgram: "Teknik Informatika - S1",
    studentName: "Mahasiswa Sampel A",
    studentNim: "10000001",
    title: "Implementasi Algoritma K-Means Clustering dan Support Vector Machine untuk Analisis Data Pelanggan Berbasis Web",
    description: "Naskah skripsi dengan kutipan langsung tanpa parafrase dari repositori tugas akhir senior dan publikasi jurnal nasional.",
    text: `BAB I - PENDAHULUAN
Latar belakang penelitian ini dilandasi oleh pesatnya pertumbuhan data transaksi pelanggan pada platform digital. Analisis sentimen merupakan cabang dari Natural Language Processing (NLP) yang bertujuan untuk mengidentifikasi dan mengekstrak opini, emosi, serta sentimen subjektif dari data tekstual. Dalam era media sosial saat ini, data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi pengambilan keputusan baik di sektor korporasi maupun instansi pemerintah.
Namun demikian, permasalahan utama yang dihadapi oleh pengelola sistem informasi di lingkungan perguruan tinggi adalah bagaimana mengelompokkan pola preferensi pengguna secara otomatis agar dapat memberikan rekomendasi layanan yang tepat sasaran.

BAB II - TINJAUAN PUSTAKA
Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk satu atau lebih cluster atau kelompok. Metode ini mempartisi data ke dalam cluster sehingga data yang memiliki karakteristik yang sama dikelompokkan ke dalam satu cluster yang sama dan data yang mempunyai karakteristik yang berbeda dikelompokkan ke dalam kelompok yang lain. Tujuan dari clustering data adalah untuk meminimalkan fungsi objektif yang diset dalam proses clustering, yang pada umumnya berusaha meminimalkan variasi di dalam suatu cluster dan memaksimalkan variasi antar cluster.
Tahapan algoritma K-Means dimulai dengan menentukan jumlah cluster k yang diinginkan. Kemudian memilih k titik data secara acak sebagai pusat cluster awal atau centroid. Selanjutnya menghitung jarak antara setiap objek data dengan setiap centroid menggunakan rumus Euclidean Distance. Objek kemudian dialokasikan ke centroid terdekat. Setelah semua objek dialokasikan, posisi centroid baru dihitung ulang berdasarkan rata-rata dari seluruh objek dalam masing-masing cluster. Proses ini diulang secara iteratif hingga posisi centroid tidak mengalami perubahan yang signifikan atau mencapai batas iterasi maksimum yang telah ditentukan sebelumnya.

BAB III - METODOLOGI PENELITIAN
Dalam perancangan perangkat lunak, metode Waterfall digunakan sebagai metodologi pengembangan sistem. Model sekuensial linier ini menyediakan pendekatan alur hidup perangkat lunak secara berurutan dimulai dari analisis kebutuhan, perancangan sistem, implementasi pengkodean, pengujian menggunakan metode black box testing, hingga pemeliharaan.
Tahapan text preprocessing dalam penelitian ini meliputi beberapa langkah esensial, yaitu case folding untuk mengubah seluruh huruf menjadi huruf kecil, filtering atau cleaning untuk menghapus karakter non-alfanumerik, tanda baca, tautan URL, dan mention pengguna, tokenizing untuk memecah kalimat menjadi token kata individual, stopword removal dengan menggunakan kamus sastrawi untuk mengeliminasi kata-kata umum yang tidak memiliki bobot semantik signifikan, serta stemming untuk mengembalikan kata berimbuhan menjadi bentuk kata dasarnya.
Metode Term Frequency-Inverse Document Frequency (TF-IDF) diterapkan untuk pembobotan kata dalam korpus teks. Term Frequency mengukur seberapa sering sebuah kata muncul dalam suatu dokumen, sedangkan Inverse Document Frequency mengukur tingkat kepentingan kata tersebut di seluruh korpus dokumen. Klasifikasi dilakukan dengan Support Vector Machine (SVM) menggunakan kernel Linear dan RBF untuk menemukan hyperplane optimal yang memisahkan kelas positif, negatif, dan netral dengan margin maksimum.

BAB IV - HASIL DAN PEMBAHASAN
Sistem informasi manajemen skripsi dirancang untuk mempermudah proses pemantauan bimbingan tugas akhir antara mahasiswa dan dosen pembimbing. Framework Scrum membagi proses kerja ke dalam beberapa iterasi waktu yang disebut sprint, biasanya berdurasi antara dua hingga empat minggu. Pengujian fungsionalitas sistem dilakukan dengan pendekatan Black Box Testing menggunakan teknik Equivalence Partitioning dan Boundary Value Analysis guna memastikan seluruh antarmuka dan validasi form berjalan sesuai spesifikasi tanpa celah kegagalan.

BAB V - KESIMPULAN DAN SARAN
Berdasarkan perancangan dan implementasi yang telah dilakukan, sistem pengelompokan data menggunakan algoritma K-Means berhasil dibangun dan diintegrasikan pada antarmuka web. Pengujian black box membuktikan fungsionalitas sistem berjalan dengan baik sesuai kebutuhan pengguna.

DAFTAR PUSTAKA
Ardiansyah, R. (2022). Implementasi Algoritma K-Means Clustering untuk Segmentasi Pelanggan Berbasis Web. Skripsi, Repositori Tugas Akhir Nasional.
Wahyudi, B. & Santoso, H. (2023). Analisis Sentimen Twitter Terhadap Layanan Publik Menggunakan Support Vector Machine dan TF-IDF. Jurnal Nasional Teknologi Informasi, 22(2), 145-156.
Kurniawan, D. et al. (2021). Penerapan Kerangka Kerja Scrum dalam Pengembangan Sistem Informasi Manajemen Skripsi. Jurnal Sistem Informasi Indonesia, 10(1), 22-31.`
  },
  {
    id: "sample-high-ai",
    label: "Contoh 2: Naskah AI Generated ChatGPT (~65% AI Writing)",
    facultyId: "FIK",
    facultyName: "Ilmu Komputer & Informatika",
    studyProgram: "Sistem Informasi - S1",
    studentName: "Mahasiswa Sampel B",
    studentNim: "10000002",
    title: "Eksplorasi Peranan Kecerdasan Buatan Generatif dalam Meningkatkan Efisiensi Operasional UMKM Modern",
    description: "Naskah yang disusun menggunakan ChatGPT tanpa penyuntingan mendalam, sarat dengan klise AI, bahasa normatif, dan referensi fiktif.",
    text: `BAB I - PENDAHULUAN
Dalam era digital yang terus berkembang pesat saat ini, kecerdasan buatan memainkan peranan yang sangat penting dalam mentransformasi operasional bisnis. Tidak dapat dipungkiri bahwa teknologi ini memberikan dampak yang luar biasa terhadap daya saing perusahaan modern di pasar global. Perlu dicatat bahwa usaha mikro, kecil, dan menengah (UMKM) menghadapi tantangan yang sangat kompleks dalam mengadopsi inovasi digital secara komprehensif.
Oleh karena itu, sangat penting untuk memahami secara mendalam bagaimana integrasi sistem cerdas dapat membuka jalan bagi efisiensi alur kerja yang lebih berkelanjutan. Penelitian ini tidak hanya mengkaji aspek teknis implementasi semata, tetapi juga menyelami lebih dalam dinamika sosio-teknologis yang melingkupi adopsi teknologi cerdas tersebut.

BAB II - TINJAUAN PUSTAKA
Kecerdasan buatan berfungsi sebagai bukti nyata dari kemajuan komputasi kognitif modern dalam meniru pola pikir manusia. Dalam lanskap yang terus berubah ini, adopsi teknologi cerdas memerlukan pendekatan holistik yang melibatkan seluruh pemangku kepentingan. Perlu dicatat bahwa proses otomatisasi data tidak hanya meningkatkan akurasi operasional, tetapi juga meminimalisir potensi kesalahan manusia secara signifikan.
Selain itu, berbagai literatur terdahulu telah membuktikan bahwa keterlibatan pengguna dalam perancangan antarmuka memainkan peranan yang sangat krusial dalam keberhasilan difusi inovasi teknologi informasi.

BAB III - METODOLOGI PENELITIAN
Penelitian ini dirancang secara sistematis dengan menerapkan kerangka kerja analitis berorientasi masa depan guna mengevaluasi efektivitas adopsi teknologi cerdas. Tidak dapat dipungkiri bahwa pengumpulan data empiris yang akurat merupakan fondasi utama dalam menarik inferensi ilmiah yang valid dan dapat dipertanggungjawabkan.
Pengolahan data dilakukan melalui tahapan komputasi kuantitatif yang dipadukan dengan analisis kualitatif deskriptif guna memperoleh pemahaman komprehensif mengenai fenomena yang diamati di lingkungan UMKM sektor riil.

BAB IV - HASIL DAN PEMBAHASAN
Berdasarkan analisis menyeluruh yang telah dipaparkan sebelumnya, terlihat jelas bahwa adopsi sistem berbasis kecerdasan buatan memberikan kontribusi yang signifikan terhadap efisiensi operasional harian. Perlu dicatat bahwa efisiensi waktu pemrosesan transaksi mengalami peningkatan yang sangat substansial setelah otomatisasi diterapkan.
Sebagai kesimpulan dari pengamatan lapangan, harmonisasi antara kesiapan sumber daya manusia dan ketersediaan infrastruktur teknologi menjadi faktor penentu keberhasilan transformasi digital di sektor UMKM.

BAB V - KESIMPULAN DAN SARAN
Secara keseluruhan, dapat disimpulkan bahwa penerapan kecerdasan buatan memberikan dampak transformatif yang sangat positif bagi perkembangan usaha kecil dan menengah. Oleh karena itu, sangat penting untuk terus mendorong kolaborasi strategis antara pemangku kebijakan, akademisi perguruan tinggi, dan pelaku usaha dalam memperluas literasi digital.

DAFTAR PUSTAKA
Smith, J. & Anderson, K. (2024). Artificial Intelligence and Sustainable Business Operations. Journal of Advanced Modern Global Science, 14(3), 88-102. doi: 10.1234/placeholder.jamgs.2024.11
Wibowo, T. (2023). Transformasi Digital UMKM Indonesia. Penerbit Pustaka Cerdas.
Johnson, R. et al. (2023). Generative AI Adoption in Emerging Markets. Journal of Innovative Future Research, 9(2), 45-60. doi: 10.1234/fake.jifr.2023.09`
  },
  {
    id: "sample-clean-compliant",
    label: "Contoh 3: Skripsi Orisinal Autentik (Similarity 11%, AI 4%)",
    facultyId: "FIK",
    facultyName: "Ilmu Komputer & Informatika",
    studyProgram: "Teknik Informatika - S1",
    studentName: "Mahasiswa Sampel C",
    studentNim: "10000003",
    title: "Rancang Bangun Sistem Monitoring Kepadatan Lalu Lintas Berbasis Computer Vision YOLOv8 pada Ruas Jalan Protokol",
    description: "Naskah skripsi orisinal dengan gaya bahasa ilmiah autentik, data empiris primer, sitasi valid, dan lolos batas similarity < 20%.",
    text: `BAB I - PENDAHULUAN
Kawasan simpul transportasi perkotaan kerap menghadapi fluktuasi volume arus kendaraan yang melampaui rasio kapasitas jalan. Berdasarkan data Dinas Perhubungan tahun 2023, volume kendaraan pada jam sibuk pagi (07.00–08.30 WIB) kerap melampaui rasio derajat kejenuhan sebesar 0,85, yang mengakibatkan antrean panjang hingga radius 400 meter. Pemantauan manual melalui kamera CCTV konvensional yang saat ini berjalan masih membutuhkan atensi visual terus-menerus dari operator pengawas di pusat kendali ATCS.
Oleh sebab itu, riset ini mengusulkan pengembangan modul deteksi dan penghitungan volume kendaraan otomatis berbasis pustaka YOLOv8 (You Only Look Once versi 8) yang disematkan langsung pada umpan video kamera pengawas guna menyajikan estimasi kepadatan kendaraan secara langsung per interval 60 detik.

BAB II - TINJAUAN PUSTAKA
Deteksi objek berbasis deep learning telah mengalami evolusi pesat sejak diperkenalkannya arsitektur YOLO oleh Redmon pada tahun 2016. Berbeda dengan pendekatan two-stage detector seperti Faster R-CNN yang memisahkan pembentukan region proposal dan klasifikasi objek, algoritma YOLO memformulasikan tugas pendeteksian sebagai masalah regresi tunggal dari piksel gambar langsung ke koordinat bounding box dan probabilitas kelas.
Arsitektur YOLOv8 yang dirilis oleh Ultralytics pada awal 2023 menyematkan modul backbone C2f (cross-stage partial bottleneck with two convolutions) yang memperkaya aliran gradien tanpa membebani kompleksitas komputasi secara berlebih. Penggunaan anchor-free head pada YOLOv8 juga terbukti menurunkan parameter komputasi hingga 28 persen dibandingkan generasi pendahulunya.

BAB III - METODOLOGI PENELITIAN
Data primer dikumpulkan dari rekaman video kamera pengawas selama kurun waktu 14 hari berturut-turut pada tiga kondisi pencahayaan: cerah siang hari, sore temaram, dan malam berlampu jalan. Dataset terdiri atas 3.200 frame resolusi 1920x1080 piksel yang dianotasi secara manual ke dalam empat kelas objek: sepeda motor, mobil pribadi, bus angkutan massal, dan truk sedang.
Proses pelatihan model dijalankan menggunakan kartu grafis NVIDIA RTX 3060 dengan ukuran batch 16 selama 100 epoch. Evaluasi performa pendeteksian diukur menggunakan parameter mean Average Precision pada ambang IoU 0.50 (mAP@0.50), Precision, Recall, dan frame rate per detik (FPS) saat inferensi waktu nyata.

BAB IV - HASIL DAN PEMBAHASAN
Hasil pengujian menunjukkan model YOLOv8n (nano) berhasil mencapai mAP@0.50 sebesar 91,4 persen pada pengujian frame siang hari dan 84,2 persen pada kondisi pencahayaan malam hari dengan kecepatan inferensi rata-rata 38,5 frame per detik pada resolusi input 640x640 piksel.
Penurunan akurasi pada malam hari terjadi terutama pada pendeteksian sepeda motor akibat silau lampu depan kendaraan (headlight flare). Kendala ini dimitigasi dengan menambahkan augmentasi kontras adaptif CLAHE pada lapisan prapemrosesan frame masukan, yang berhasil mendongkrak kembali mAP malam hari hingga 88,7 persen.

BAB V - KESIMPULAN DAN SARAN
Sistem pendeteksi kepadatan lalu lintas otomatis menggunakan YOLOv8 berhasil diimplementasikan pada aliran video CCTV dengan reliabilitas deteksi mAP rata-rata 89,8 persen. Untuk penelitian lanjutan, disarankan mengintegrasikan keluaran data estimasi kepadatan ini langsung ke kontroler logika lampu APILL adaptif milik instansi pengendali lalu lintas.

DAFTAR PUSTAKA
Bochkovskiy, A., Wang, C. Y., & Liao, H. Y. M. (2020). YOLOv4: Optimal Speed and Accuracy of Object Detection. arXiv preprint arXiv:2004.10934.
Dinas Perhubungan. (2023). Laporan Kinerja Pengelolaan Lalu Lintas Perkotaan Tahun 2023. Dokumen Resmi Dishub.
Jocher, G., Chaurasia, A., & Qiu, J. (2023). Ultralytics YOLOv8. Version 8.0.0. GitHub Repository. https://github.com/ultralytics/ultralytics`
  }
];
