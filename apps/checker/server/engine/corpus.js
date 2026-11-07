/**
 * Universal Academic Corpus Database for Plagiarism Engine
 * Includes simulated and indexed references from:
 * - Repositori Karya Ilmiah & Tugas Akhir Nasional (Garuda Kemdikbud)
 * - Portal Publikasi Ilmiah Terakreditasi Nasional (Neliti & Perpusnas)
 * - Academic Wikipedia Indonesia (Computer Science, Business, Health, Engineering)
 * - Indexed Student Papers & Theses Repository
 */

export const ACADEMIC_CORPUS = [
  {
    id: 1,
    title: "Implementasi Algoritma K-Means Clustering untuk Segmentasi Pelanggan Berbasis Web",
    author: "Pratama, A. R. (2022)",
    institution: "Repositori Skripsi Nasional - Ilmu Komputer & Informatika",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/41821",
    url: "https://garuda.kemdikbud.go.id/documents/detail/41821",
    color: "#E53935", // Red
    content: `Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk satu atau lebih cluster atau kelompok. Metode ini mempartisi data ke dalam cluster sehingga data yang memiliki karakteristik yang sama dikelompokkan ke dalam satu cluster yang sama dan data yang mempunyai karakteristik yang berbeda dikelompokkan ke dalam kelompok yang lain. Tujuan dari clustering data adalah untuk meminimalkan fungsi objektif yang diset dalam proses clustering, yang pada umumnya berusaha meminimalkan variasi di dalam suatu cluster dan memaksimalkan variasi antar cluster.
Tahapan algoritma K-Means dimulai dengan menentukan jumlah cluster k yang diinginkan. Kemudian memilih k titik data secara acak sebagai pusat cluster awal atau centroid. Selanjutnya menghitung jarak antara setiap objek data dengan setiap centroid menggunakan rumus Euclidean Distance. Objek kemudian dialokasikan ke centroid terdekat. Setelah semua objek dialokasikan, posisi centroid baru dihitung ulang berdasarkan rata-rata dari seluruh objek dalam masing-masing cluster. Proses ini diulang secara iteratif hingga posisi centroid tidak mengalami perubahan yang signifikan atau mencapai batas iterasi maksimum yang telah ditentukan sebelumnya.
Dalam perancangan perangkat lunak, metode Waterfall digunakan sebagai metodologi pengembangan sistem. Model sekuensial linier ini menyediakan pendekatan alur hidup perangkat lunak secara berurutan dimulai dari analisis kebutuhan, perancangan sistem, implementasi pengkodean, pengujian menggunakan metode black box testing, hingga pemeliharaan.`
  },
  {
    id: 2,
    title: "Analisis Sentimen Twitter Terhadap Layanan Publik Menggunakan Support Vector Machine dan TF-IDF",
    author: "Wahyudi, B. & Santoso, H. (2023)",
    institution: "Jurnal Nasional Teknologi Informasi & Komputasi (Vol. 22 No. 2)",
    sourceType: "Publication",
    domain: "jurnal.kemdikbud.go.id/jntik/article/view/5891",
    url: "https://jurnal.kemdikbud.go.id/jntik/article/view/5891",
    color: "#1E88E5", // Blue
    content: `Analisis sentimen merupakan cabang dari Natural Language Processing (NLP) yang bertujuan untuk mengidentifikasi dan mengekstrak opini, emosi, serta sentimen subjektif dari data tekstual. Dalam era media sosial saat ini, data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi pengambilan keputusan baik di sektor korporasi maupun instansi pemerintah.
Tahapan text preprocessing dalam penelitian ini meliputi beberapa langkah esensial, yaitu case folding untuk mengubah seluruh huruf menjadi huruf kecil, filtering atau cleaning untuk menghapus karakter non-alfanumerik, tanda baca, tautan URL, dan mention pengguna, tokenizing untuk memecah kalimat menjadi token kata individual, stopword removal dengan menggunakan kamus sastrawi untuk mengeliminasi kata-kata umum yang tidak memiliki bobot semantik signifikan, serta stemming untuk mengembalikan kata berimbuhan menjadi bentuk kata dasarnya.
Metode Term Frequency-Inverse Document Frequency (TF-IDF) diterapkan untuk pembobotan kata dalam korpus teks. Term Frequency mengukur seberapa sering sebuah kata muncul dalam suatu dokumen, sedangkan Inverse Document Frequency mengukur tingkat kepentingan kata tersebut di seluruh korpus dokumen. Klasifikasi dilakukan dengan Support Vector Machine (SVM) menggunakan kernel Linear dan RBF untuk menemukan hyperplane optimal yang memisahkan kelas positif, negatif, dan netral dengan margin maksimum.`
  },
  {
    id: 3,
    title: "Penerapan Kerangka Kerja Scrum dalam Pengembangan Sistem Informasi Manajemen Skripsi",
    author: "Kurniawan, D. et al. (2021)",
    institution: "Jurnal Riset Rekayasa Perangkat Lunak Indonesia",
    sourceType: "Publication",
    domain: "neliti.com/publications/3342-rekayasa-perangkat-lunak",
    url: "https://neliti.com/publications/3342-rekayasa-perangkat-lunak",
    color: "#43A047", // Green
    content: `Sistem informasi manajemen skripsi dirancang untuk mempermudah proses pemantauan bimbingan tugas akhir antara mahasiswa dan dosen pembimbing. Metodologi Agile dengan framework Scrum dipilih karena fleksibilitasnya dalam menghadapi perubahan kebutuhan yang dinamis selama siklus pengembangan sistem.
Framework Scrum membagi proses kerja ke dalam beberapa iterasi waktu yang disebut sprint, biasanya berdurasi antara dua hingga empat minggu. Setiap sprint diawali dengan Sprint Planning untuk menentukan item dari Product Backlog yang akan dikerjakan menjadi Sprint Backlog. Selama sprint berlangsung, tim pengembang mengadakan Daily Scrum meeting berdurasi 15 menit untuk menyinkronkan aktivitas dan mengidentifikasi hambatan teknis. Pada akhir sprint, dilakukan Sprint Review untuk mendemonstrasikan inkrement produk yang berfungsi kepada pemilik produk (Product Owner) dan pemangku kepentingan, diikuti dengan Sprint Retrospective untuk mengevaluasi kinerja tim dan perbaikan berkelanjutan.
Pengujian fungsionalitas sistem dilakukan dengan pendekatan Black Box Testing menggunakan teknik Equivalence Partitioning dan Boundary Value Analysis guna memastikan seluruh antarmuka dan validasi form berjalan sesuai spesifikasi tanpa celah kegagalan.`
  },
  {
    id: 4,
    title: "Pengaruh Kualitas Pelayanan dan Persepsi Harga Terhadap Kepuasan Pasien Rawat Inap",
    author: "Lestari, M. A. (2023)",
    institution: "Jurnal Kesehatan Masyarakat & Kebijakan Rumah Sakit",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/49103",
    url: "https://garuda.kemdikbud.go.id/documents/detail/49103",
    color: "#FB8C00", // Orange
    content: `Pelayanan kesehatan yang bermutu merupakan hak mendasar bagi setiap masyarakat dan menjadi tolak ukur keberhasilan manajemen rumah sakit. Kualitas pelayanan diukur melalui lima dimensi utama Servqual yaitu kehandalan (reliability), ketanggapan (responsiveness), jaminan (assurance), empati (empathy), dan bukti fisik (tangibles). Kepuasan pasien tercapai apabila pelayanan yang diterima memenuhi atau melampaui harapan yang diinginkan sebelum menerima perawatan medis.
Metode penelitian yang digunakan adalah kuantitatif dengan pendekatan cross-sectional. Populasi dalam penelitian ini adalah seluruh pasien rawat inap kelas III dengan teknik pengambilan sampel menggunakan purposive sampling berdasarkan kriteria inklusi dan eksklusi tertentu. Data primer dikumpulkan melalui kuesioner terstruktur dengan skala Likert 5 poin.
Uji validitas instrumen dianalisis menggunakan korelasi Product Moment Pearson dengan kriteria r hitung lebih besar dari r tabel pada taraf signifikansi 5 persen. Uji reliabilitas dilakukan dengan koefisien Cronbach's Alpha di mana nilai di atas 0.70 menunjukkan instrumen memiliki keandalan yang dapat diterima. Analisis regresi linier berganda digunakan untuk menguji hipotesis pengaruh parsial dan simultan antara variabel independen terhadap kepuasan pasien.`
  },
  {
    id: 5,
    title: "Konsep Dasar Kecerdasan Buatan dan Jaringan Saraf Tiruan (Deep Learning)",
    author: "Ensiklopedia Ilmu Komputer Indonesia",
    institution: "Wikipedia Bahasa Indonesia / Garuda Dikti",
    sourceType: "Internet Source",
    domain: "id.wikipedia.org/wiki/Kecerdasan_buatan",
    url: "https://id.wikipedia.org/wiki/Kecerdasan_buatan",
    color: "#8E24AA", // Purple
    content: `Kecerdasan buatan atau Artificial Intelligence (AI) adalah kecerdasan yang ditambahkan kepada suatu sistem yang bisa diatur dalam konteks ilmiah atau integritas mesin. Kecerdasan diciptakan dan dimasukkan ke dalam suatu mesin komputer agar dapat melakukan pekerjaan seperti yang dapat dilakukan oleh manusia. Beberapa macam bidang yang menggunakan kecerdasan buatan antara lain sistem pakar, permainan komputer (computer games), logika fuzzy, jaringan saraf tiruan dan robotika.
Deep learning merupakan salah satu cabang dari machine learning yang berbasis representasi data menggunakan arsitektur jaringan saraf tiruan berlapis banyak (multi-layer neural network). Arsitektur deep learning seperti Convolutional Neural Network (CNN) dirancang khusus untuk memproses data berstruktur grid seperti citra digital, sedangkan Recurrent Neural Network (RNN) dan Transformer sangat efektif untuk memproses data berurutan seperti bahasa alami dan deret waktu.
Fungsi aktivasi non-linier seperti ReLU (Rectified Linear Unit), Sigmoid, dan Softmax digunakan untuk memungkinkan jaringan mempelajari pola kompleks dalam ruang berdimensi tinggi. Pengoptimalan bobot dilakukan melalui algoritma backpropagation menggunakan optimizers seperti Stochastic Gradient Descent (SGD) dan Adam guna meminimalkan fungsi loss (loss function).`
  },
  {
    id: 6,
    title: "Pengaruh Rasio Likuiditas dan Profitabilitas Terhadap Nilai Perusahaan Manufaktur di BEI",
    author: "Hidayat, S. & Nugroho, T. (2022)",
    institution: "Jurnal Riset Akuntansi & Keuangan Terakreditasi",
    sourceType: "Student Paper",
    domain: "neliti.com/publications/42918-rasio-keuangan-bei",
    url: "https://neliti.com/publications/42918-rasio-keuangan-bei",
    color: "#00ACC1", // Teal
    content: `Nilai perusahaan merupakan persepsi investor terhadap tingkat keberhasilan perusahaan yang sering dikaitkan dengan harga saham. Semakin tinggi harga saham, maka semakin tinggi pula nilai perusahaan dan kemakmuran para pemegang saham. Rasio likuiditas yang diproyeksikan dengan Current Ratio (CR) mengukur kemampuan perusahaan dalam memenuhi kewajiban jangka pendek yang jatuh tempo menggunakan aktiva lancar yang dimiliki.
Profitabilitas yang diukur dengan Return on Assets (ROA) dan Return on Equity (ROE) mencerminkan efektivitas manajemen dalam mengelola seluruh aset dan modal ekuitas untuk menghasilkan laba bersih setelah pajak. Penelitian ini menggunakan data sekunder dari laporan keuangan tahunan yang dipublikasikan di Bursa Efek Indonesia (BEI) selama periode pengamatan lima tahun berturut-turut.
Analisis data meliputi uji asumsi klasik yang terdiri dari uji normalitas residual dengan Kolmogorov-Smirnov, uji multikolinearitas dengan Variance Inflation Factor (VIF), uji heteroskedastisitas dengan uji Glejser, dan uji autokorelasi dengan Durbin-Watson. Pengujian hipotesis dilakukan dengan uji t statistik untuk pengaruh parsial dan uji F statistik untuk pengaruh simultan pada tingkat signifikansi alpha 5 persen.`
  },
  {
    id: 7,
    title: "Perancangan UI/UX Aplikasi Edukasi Sampah Berbasis Gamifikasi Menggunakan Metode Design Thinking",
    author: "Septian, R. (2023)",
    institution: "Jurnal Nasional Desain & Media Interaktif",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/51299",
    url: "https://garuda.kemdikbud.go.id/documents/detail/51299",
    color: "#3949AB", // Indigo
    content: `Perancangan pengalaman pengguna (User Experience/UX) dan antarmuka pengguna (User Interface/UI) yang interaktif memiliki peranan vital dalam meningkatkan keterlibatan pengguna pada aplikasi edukasi lingkungan. Metode Design Thinking diterapkan sebagai pendekatan pemecahan masalah yang berpusat pada manusia (human-centered design).
Metode Design Thinking terdiri dari lima tahapan berulang yaitu Empathize, Define, Ideate, Prototype, dan Test. Tahap Empathize bertujuan untuk memahami kebutuhan emosional dan kendala target pengguna melalui wawancara mendalam dan observasi lapangan. Tahap Define merumuskan temuan ke dalam User Persona, Empathy Map, dan Point of View (POV). Tahap Ideate menghasilkan berbagai alternatif solusi kreatif menggunakan teknik brainstorming dan Crazy 8's.
Tahap Prototype mewujudkan konsep solusi ke dalam bentuk wireframe low-fidelity hingga prototipe interaktif high-fidelity menggunakan perangkat lunak Figma. Terakhir, tahap Test dilakukan untuk menguji prototipe kepada pengguna sasaran dengan mengukur efektivitas dan kepuasan antarmuka menggunakan kuesioner System Usability Scale (SUS) dengan standar nilai minimal 68 sebagai kriteria kelayakan acceptable.`
  },
  {
    id: 8,
    title: "Implementasi Internet of Things (IoT) untuk Monitoring Kualitas Air Tambak Udang Berbasis ESP32",
    author: "Kusuma, F. A. (2023)",
    institution: "Jurnal Nasional Teknik Elektro & Mekatronika",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/47115",
    url: "https://garuda.kemdikbud.go.id/documents/detail/47115",
    color: "#D81B60", // Magenta
    content: `Kualitas air merupakan parameter paling krusial dalam keberhasilan budidaya udang vaname. Pemantauan parameter air secara manual membutuhkan waktu dan tenaga serta rentan terhadap keterlambatan penanganan fluktuasi mendadak. Sistem Internet of Things (IoT) berbasis mikrokontroler ESP32 dirancang untuk memonitor parameter suhu air, pH, dan kekeruhan (turbidity) secara real-time dan nirkabel.
Sensor analog pH-4502C digunakan untuk mengukur tingkat keasaman air, sensor DS18B20 untuk mendeteksi suhu cairan dengan akurasi tinggi, serta sensor turbiditas inframerah untuk mengukur partikel tersuspensi. Mikrokontroler ESP32 membaca sinyal analog dari sensor, memproses konversi Analog-to-Digital (ADC), lalu mentransmisikan data ke server cloud menggunakan protokol komunikasi Message Queuing Telemetry Transport (MQTT) melalui jaringan Wi-Fi.
Data yang diterima server disimpan ke dalam basis data MongoDB dan divisualisasikan dalam bentuk grafik dashboard interaktif pada aplikasi web dan mobile. Sistem dilengkapi mekanisme notifikasi otomatis melalui bot Telegram apabila nilai parameter air berada di luar ambang batas toleransi aman yang telah ditentukan.`
  },
  {
    id: 9,
    title: "Sistem Pendukung Keputusan Pemilihan Karyawan Terbaik Menggunakan Metode Simple Additive Weighting (SAW)",
    author: "Prasetyo, E. (2022)",
    institution: "Jurnal Riset Sistem Informasi & Bisnis Cerdas",
    sourceType: "Student Paper",
    domain: "neliti.com/publications/43210-spk-saw-karyawan",
    url: "https://neliti.com/publications/43210-spk-saw-karyawan",
    color: "#FDD835",
    content: `Sistem pendukung keputusan (SPK) dirancang untuk membantu pihak manajemen dalam menentukan keputusan pemilihan karyawan terbaik secara objektif. Metode Simple Additive Weighting (SAW) sering juga dikenal dengan istilah metode penjumlahan terbobot. Konsep dasar metode SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif pada semua atribut.
Metode SAW membutuhkan proses normalisasi matriks keputusan ke suatu skala yang dapat diperbandingkan dengan semua rating alternatif yang ada. Tahapan metode SAW diawali dengan menentukan kriteria-kriteria yang akan dijadikan acuan dalam pengambilan keputusan, menentukan bobot preferensi untuk setiap kriteria, membuat matriks keputusan berdasarkan kriteria, melakukan normalisasi matriks, dan melakukan perangkingan untuk memperoleh alternatif terbaik.`
  },
  {
    id: 10,
    title: "Pengaruh E-Service Quality dan Kepercayaan Terhadap Kepuasan Konsumen Marketplace",
    author: "Dewi, S. K. (2023)",
    institution: "Jurnal Pemasaran & Manajemen Bisnis Indonesia",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/45678",
    url: "https://garuda.kemdikbud.go.id/documents/detail/45678",
    color: "#6D4C41",
    content: `Perkembangan perdagangan elektronik di Indonesia telah mengubah pola perilaku belanja masyarakat dari transaksi konvensional menuju transaksi digital. Kualitas layanan elektronik (e-service quality) merupakan faktor kunci yang menentukan kepuasan dan loyalitas pelanggan pada platform belanja online.
Dimensi e-service quality meliputi efisiensi (efficiency), kehandalan (reliability), pemenuhan (fulfillment), dan privasi (privacy). Kepercayaan konsumen dibangun melalui rasa aman dalam bertransaksi serta jaminan kerahasiaan data pribadi pengguna.`
  },
  {
    id: 11,
    title: "Rancang Bangun Prototipe Pemilah Sampah Otomatis Logam dan Non-Logam Berbasis Sensor Proximity",
    author: "Firmansyah, A. (2023)",
    institution: "Jurnal Rekayasa Otomasi & Sistem Tertanam",
    sourceType: "Student Paper",
    domain: "neliti.com/publications/48901-pemilah-sampah-sensor",
    url: "https://neliti.com/publications/48901-pemilah-sampah-sensor",
    color: "#00897B",
    content: `Pengelolaan sampah anorganik khususnya limbah logam dan non-logam masih sering dilakukan secara manual yang membutuhkan waktu serta berisiko terhadap keselamatan pekerja kebersihan. Prototipe tempat sampah pintar otomatis dirancang menggunakan sensor proximity induktif untuk mendeteksi objek logam dan sensor ultrasonik untuk mendeteksi keberadaan objek.
Mikrokontroler Arduino Uno memproses sinyal masukan dari sensor lalu menggerakkan motor servo untuk memilah sampah ke dalam wadah yang sesuai secara mekanis.`
  },
  {
    id: 12,
    title: "Analisis Ketepatan Waktu Pengembalian Berkas Rekam Medis Rawat Inap di Rumah Sakit",
    author: "Ananda, P. R. (2023)",
    institution: "Jurnal Manajemen Informasi Kesehatan Indonesia",
    sourceType: "Student Paper",
    domain: "garuda.kemdikbud.go.id/documents/detail/50123",
    url: "https://garuda.kemdikbud.go.id/documents/detail/50123",
    color: "#3949AB",
    content: `Ketepatan waktu pengembalian berkas rekam medis rawat inap merupakan salah satu indikator mutu pelayanan rekam medis dan efisiensi manajemen rumah sakit. Berdasarkan Standar Pelayanan Minimal rumah sakit, batas waktu pengembalian berkas rekam medis rawat inap lengkap adalah maksimal 2x24 jam setelah pasien keluar rumah sakit.
Keterlambatan pengembalian berkas rekam medis dapat menghambat proses pengodean diagnosis, pelaporan morbiditas, klaim pembiayaan BPJS Kesehatan, serta kesinambungan pelayanan perawatan berikutnya.`
  },
  {
    id: 13,
    title: "Strategi Penerjemahan Subtitle Humor dan Slang Bahasa Inggris ke Bahasa Indonesia",
    author: "Wulandari, T. (2022)",
    institution: "Jurnal Linguistik Terapan & Kajian Terjemahan",
    sourceType: "Student Paper",
    domain: "neliti.com/publications/52345-penerjemahan-subtitle",
    url: "https://neliti.com/publications/52345-penerjemahan-subtitle",
    color: "#8E24AA",
  },
  {
    id: 14,
    title: "Unsupervised Customer Segmentation Using K-Means Clustering in Web Analytics",
    author: "Reynolds, M. & Davies, K. (2022)",
    institution: "IEEE Transactions on Knowledge and Data Engineering (Vol. 34 No. 4)",
    sourceType: "Publication",
    domain: "ieeexplore.ieee.org/document/8921470",
    url: "https://ieeexplore.ieee.org/document/8921470",
    color: "#E53935",
    content: `The K-Means clustering algorithm is an iterative partitioning method designed to divide an unlabeled dataset into k distinct, non-overlapping subgroups. Each data point belongs to the cluster with the nearest mean or centroid, serving as a prototype of the cluster. The objective function minimizes within-cluster variance while maximizing the between-cluster dispersion across dimensional spaces.
The standard algorithm operates through an iterative procedure: selecting k initial centroids randomly, calculating the Euclidean distance between every data instance and each centroid, assigning instances to their closest centroid, recalculating cluster means based on current cluster assignments, and repeating until centroid positions stabilize or reach maximum iterations.`
  },
  {
    id: 15,
    title: "Deep Learning Foundations: Convolutional Neural Networks and Self-Attention Transformers",
    author: "Vaswani, A. et al. / Academic Compendium (2021)",
    institution: "ACM Computing Surveys / arXiv Computer Science",
    sourceType: "Publication",
    domain: "dl.acm.org/doi/10.1145/3383583",
    url: "https://dl.acm.org/doi/10.1145/3383583",
    color: "#1E88E5",
    content: `Artificial intelligence and machine learning have experienced profound architectural advances through deep neural representations. Deep learning architectures utilize multi-layered artificial neural networks capable of learning hierarchical feature representations directly from raw multi-dimensional inputs. Convolutional Neural Networks (CNNs) leverage parameter sharing and spatial pooling to process grid-structured image data efficiently.
Transformer architectures replace recurrent sequencing with scaled dot-product self-attention mechanisms, allowing models to weigh the contextual relevance of all tokens concurrently across extensive sequence lengths. Optimization is guided by stochastic gradient descent variants such as Adam, minimizing designated loss functions via automatic differentiation.`
  },
  {
    id: 16,
    title: "Financial Ratio Analysis: The Interplay of Liquidity, Leverage, and Corporate Profitability",
    author: "Harrison, C. & Sterling, P. (2023)",
    institution: "Journal of Corporate Finance & Applied Economics",
    sourceType: "Publication",
    domain: "sciencedirect.com/science/article/pii/S092911992200145X",
    url: "https://sciencedirect.com/science/article/pii/S092911992200145X",
    color: "#43A047",
    content: `Corporate valuation reflects market and investor confidence regarding an enterprise's operational capacity to generate sustained free cash flows over foreseeable horizons. Financial ratios derived from audited balance sheets and income statements provide standardized benchmarks for evaluating operational liquidity, solvency, and managerial efficiency.
The Current Ratio measures short-term debt servicing capacity against maturing liabilities using liquid assets. Profitability indicators, including Return on Assets (ROA) and Return on Equity (ROE), quantify managerial efficacy in deploying allocated asset bases to produce net net earnings. Ordinary Least Squares (OLS) regression models examine the statistical significance of liquidity and asset turnover on firm valuation.`
  },
  {
    id: 17,
    title: "Evaluating Healthcare Service Quality and Patient Satisfaction Across Public Hospital Settings",
    author: "Thompson, J. E. (2022)",
    institution: "BMC Health Services Research / Springer Nature",
    sourceType: "Publication",
    domain: "bmchealthservres.biomedcentral.com/articles/10.1186/s12913-022",
    url: "https://bmchealthservres.biomedcentral.com/articles/10.1186/s12913-022",
    color: "#FB8C00",
    content: `Healthcare delivery quality is a multifaceted construct that directly impacts clinical treatment outcomes and patient adherence to therapeutic regimens. The Servqual analytical framework evaluates perceived service quality across five established dimensions: reliability, responsiveness, assurance, empathy, and physical tangibles.
Patient satisfaction manifests when experienced clinical and administrative encounters match or exceed prior expectations. Quantitative cross-sectional survey methodologies employing five-point Likert scales evaluate user sentiment. Pearson product-moment correlation coefficients validate construct validity, while Cronbach's alpha ensures internal consistency across subscale measurement items.`
  },
  {
    id: 18,
    title: "Agile Software Development with Scrum: Empirical Evaluation of Sprint Velocity and Defect Density",
    author: "MacIntyre, D. & Vance, B. (2021)",
    institution: "IEEE Software Engineering Proceedings",
    sourceType: "Student Paper",
    domain: "ieeexplore.ieee.org/document/9452011",
    url: "https://ieeexplore.ieee.org/document/9452011",
    color: "#8E24AA",
    content: `Modern software engineering methodologies increasingly favor Agile frameworks to accommodate dynamic requirement evolutions and volatile market conditions. Scrum decomposes development lifecycles into fixed timeboxed iterations designated as sprints, typically spanning two to four weeks.
Each sprint commences with Sprint Planning to estimate story points and delineate the Sprint Backlog from prioritized Product Backlog items. Daily Scrum standup sessions facilitate cross-functional alignment and synchronize operational blockers. Sprints culminate in Sprint Reviews presenting functional product increments to stakeholders, followed by Sprint Retrospectives evaluating process optimization.`
  }
];

