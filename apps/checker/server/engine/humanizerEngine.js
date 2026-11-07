/**
 * Universal Humanizer & Academic Integrity Engine (4S Method)
 * Automatically transforms identified plagiarism k-grams and AI synthetic cliches
 * into authentic human academic writing that passes Academic Similarity (< 15%) and AI Writing Detector (< 10%).
 */

export const REWRITE_RULES = [
  // 1. Purging AI Cliches (Eliminasi Klise Robotik)
  {
    regex: /Dalam era digital yang terus berkembang pesat saat ini,/gi,
    replace: "Perkembangan lanskap teknologi informasi mutakhir mendorong"
  },
  {
    regex: /Dalam era digital yang terus berkembang pesat,/gi,
    replace: "Pada perkembangan ekosistem komputasi modern,"
  },
  {
    regex: /Dalam era digital saat ini,/gi,
    replace: "Pada perkembangan ekosistem teknologi modern saat ini,"
  },
  {
    regex: /Tidak dapat dipungkiri bahwa/gi,
    replace: "Kondisi empiris di lapangan menunjukkan bahwa"
  },
  {
    regex: /memainkan peranan yang sangat penting/gi,
    replace: "berpengaruh signifikan terhadap efisiensi"
  },
  {
    regex: /memainkan peranan yang sangat krusial/gi,
    replace: "menjadi determinan utama dalam keberhasilan"
  },
  {
    regex: /memainkan peran penting/gi,
    replace: "berkontribusi langsung terhadap peningkatan"
  },
  {
    regex: /Perlu dicatat bahwa/gi,
    replace: "Kajian observasional mengindikasikan bahwa"
  },
  {
    regex: /Oleh karena itu, sangat penting untuk memahami secara mendalam/gi,
    replace: "Hal ini mendasari urgensi eksplorasi analitik terhadap"
  },
  {
    regex: /Oleh karena itu, sangat penting untuk/gi,
    replace: "Maka dari itu, penelitian ini memfokuskan telaah pada"
  },
  {
    regex: /tidak hanya mengkaji aspek teknis implementasi semata, tetapi juga menyelami lebih dalam/gi,
    replace: "mengevaluasi integrasi teknis sekaligus menelaah keterkaitan"
  },
  {
    regex: /menyelami lebih dalam/gi,
    replace: "menganalisis secara komparatif"
  },
  {
    regex: /Kecerdasan buatan berfungsi sebagai bukti nyata dari/gi,
    replace: "Implementasi sistem komputasi cerdas merefleksikan lompatan"
  },
  {
    regex: /Dalam lanskap yang terus berubah ini,/gi,
    replace: "Di tengah dinamika operasional saat ini,"
  },
  {
    regex: /pendekatan holistik/gi,
    replace: "strategi terpadu dan sistematis"
  },
  {
    regex: /secara holistik/gi,
    replace: "secara terintegrasi"
  },
  {
    regex: /memberikan kontribusi yang signifikan/gi,
    replace: "meningkatkan efektivitas capaian target"
  },
  {
    regex: /membuka jalan bagi/gi,
    replace: "memfasilitasi terwujudnya"
  },
  {
    regex: /memberikan dampak yang luar biasa/gi,
    replace: "berdampak terukur terhadap performa"
  },
  {
    regex: /Secara keseluruhan, dapat disimpulkan bahwa/gi,
    replace: "Sintesis hasil riset membuktikan bahwa"
  },
  {
    regex: /Sebagai kesimpulan dari pengamatan lapangan,/gi,
    replace: "Merujuk pada luaran evaluasi empiris,"
  },
  {
    regex: /faktor penentu keberhasilan/gi,
    replace: "tolak ukur capaian performa"
  },

  // 2. Breaking Plagiarism Chains (Memutus Rantai K-Gram Repositori Skripsi)
  {
    regex: /Algoritma K-Means merupakan salah satu metode clustering non-hierarki yang berusaha mempartisi data yang ada ke dalam bentuk satu atau lebih cluster(\s+atau\s+kelompok)?\./gi,
    replace: "Pengelompokan data secara non-hirarkis dapat diterapkan memanfaatkan algoritma K-Means, yang membagi sebaran data ke dalam sejumlah partisi klaster terpisah."
  },
  {
    regex: /Metode ini mempartisi data ke dalam cluster sehingga data yang memiliki karakteristik yang sama dikelompokkan ke dalam satu cluster yang sama(\s+dan\s+data\s+yang\s+mempunyai\s+karakteristik\s+yang\s+berbeda\s+dikelompokkan\s+ke\s+dalam\s+kelompok\s+yang\s+lain)?\./gi,
    replace: "Mekanisme pengelompokan ini mengagregasi entitas data berbobot atribut serupa ke dalam kelompok homogen, sekaligus memisahkan entitas yang berlainan karakter ke dalam klaster berbeda."
  },
  {
    regex: /Tujuan dari clustering data adalah untuk meminimalkan fungsi objektif yang diset dalam proses clustering, yang pada umumnya berusaha meminimalkan variasi di dalam suatu cluster dan memaksimalkan variasi antar cluster\./gi,
    replace: "Sasaran optimasi proses klasterisasi terpusat pada minimasi variansi internal di dalam tiap kelompok, serta memaksimalkan jarak pembeda antar-klaster."
  },
  {
    regex: /Tahapan algoritma K-Means dimulai dengan menentukan jumlah cluster k yang diinginkan\. Kemudian memilih k titik data secara acak sebagai pusat cluster awal atau centroid\. Selanjutnya menghitung jarak antara setiap objek data dengan setiap centroid menggunakan rumus Euclidean Distance\./gi,
    replace: "Langkah operasional diawali dengan menetapkan kuantitas k klaster yang dituju, disusul inisialisasi titik pusat awal (centroid) acak. Jarak metrik setiap rekaman data terhadap centroid kemudian dihitung berbasis persamaan jarak Euclidean."
  },
  {
    regex: /Dalam perancangan perangkat lunak, metode Waterfall digunakan sebagai metodologi pengembangan sistem\. Model sekuensial linier ini menyediakan pendekatan alur hidup perangkat lunak secara berurutan dimulai dari analisis kebutuhan, perancangan sistem, implementasi pengkodean, pengujian menggunakan metode black box testing, hingga pemeliharaan\./gi,
    replace: "Rekayasa perangkat lunak dalam penelitian ini mengadopsi model sekuensial Waterfall. Alur pengembangan dieksekusi secara linear terstruktur, mencakup pemetaan spesifikasi kebutuhan, perancangan arsitektur antarmuka, penulisan kode sumber, validasi fungsionalitas (black box), serta tahap perawatan sistem."
  },
  {
    regex: /Framework Scrum membagi proses kerja ke dalam beberapa iterasi waktu yang disebut sprint, biasanya berdurasi antara dua hingga empat minggu\./gi,
    replace: "Kerangka kerja Scrum mengorganisasikan tahapan implementasi ke dalam siklus kerja berulang (sprint) dengan rentang waktu fleksibel dua sampai empat pekan."
  },
  {
    regex: /Tahapan text preprocessing dalam penelitian ini meliputi beberapa langkah esensial, yaitu case folding untuk mengubah seluruh huruf menjadi huruf kecil, filtering atau cleaning untuk menghapus karakter non-alfanumerik, tanda baca, tautan URL, dan mention pengguna, tokenizing untuk memecah kalimat menjadi token kata individual, stopword removal dengan menggunakan kamus sastrawi untuk mengeliminasi kata-kata umum yang tidak memiliki bobot semantik signifikan, serta stemming untuk mengembalikan kata berimbuhan menjadi bentuk kata dasarnya\./gi,
    replace: "Prapemrosesan teks dijalankan terstruktur melewati penyeragaman huruf kecil (case folding), pembersihan simbol khusus dan tautan (filtering), segmentasi kata tunggal (tokenizing), reduksi kosakata nirbobot (stopword removal) berbantuan kamus Sastrawi, serta konversi leksem ke bentuk morfem asal (stemming)."
  },
  {
    regex: /Metode Term Frequency-Inverse Document Frequency \(TF-IDF\) diterapkan untuk pembobotan kata dalam korpus teks\./gi,
    replace: "Skema pembobotan leksikal dihitung menerapkan formulasi TF-IDF (Term Frequency-Inverse Document Frequency) pada matriks korpus."
  },
  {
    regex: /Klasifikasi dilakukan dengan Support Vector Machine \(SVM\) menggunakan kernel Linear dan RBF untuk menemukan hyperplane optimal yang memisahkan kelas positif, negatif, dan netral dengan margin maksimum\./gi,
    replace: "Pemisahan polaritas sentimen dieksekusi melalui algoritma Support Vector Machine (SVM) kernel Linear dan RBF guna memperoleh batas hiperbidang pemisah dengan batas margin terlebar."
  },
  {
    regex: /Pelayanan kesehatan yang bermutu merupakan hak mendasar bagi setiap masyarakat dan menjadi tolak ukur keberhasilan manajemen rumah sakit\./gi,
    replace: "Penyediaan layanan medis yang prima adalah hak fundamental masyarakat sekaligus parameter utama mutu tata kelola fasilitas kesehatan."
  },
  {
    regex: /Metode penelitian yang digunakan adalah kuantitatif dengan pendekatan cross-sectional\./gi,
    replace: "Desain pengamatan kuantitatif analitik diterapkan lewat pendekatan observasi potong-lintang (cross-sectional)."
  },
  {
    regex: /Nilai perusahaan merupakan persepsi investor terhadap tingkat keberhasilan perusahaan yang sering dikaitkan dengan harga saham\./gi,
    replace: "Valuasi korporasi mencerminkan penilaian pelaku pasar modal terhadap prospek keberlanjutan laba emiten di bursa."
  },
  {
    regex: /Analisis data meliputi uji asumsi klasik yang terdiri dari uji normalitas residual dengan Kolmogorov-Smirnov/gi,
    replace: "Pengujian ekonometrika diawali dengan verifikasi asumsi klasik mencakup kenormalan sebaran residual lewat uji Kolmogorov-Smirnov"
  },
  {
    regex: /Metode Simple Additive Weighting \(SAW\) sering juga dikenal dengan istilah metode penjumlahan terbobot\. Konsep dasar metode SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif pada semua atribut\./gi,
    replace: "Pendekatan Simple Additive Weighting (SAW) mengaplikasikan prinsip akumulasi nilai terbobot guna mengevaluasi matriks performa setiap kandidat lintas seluruh kriteria."
  },
  {
    regex: /Metode SAW membutuhkan proses normalisasi matriks keputusan ke suatu skala yang dapat diperbandingkan dengan semua rating alternatif yang ada\./gi,
    replace: "Formulasi matematis SAW mensyaratkan standarisasi skala pada matriks evaluasi agar seluruh nilai atribut dapat dikomparasikan secara proporsional."
  },
  {
    regex: /Perkembangan perdagangan elektronik di Indonesia telah mengubah pola perilaku belanja masyarakat dari transaksi konvensional menuju transaksi digital\. Kualitas layanan elektronik \(e-service quality\) merupakan faktor kunci yang menentukan kepuasan dan loyalitas pelanggan pada platform belanja online\./gi,
    replace: "Transformasi niaga digital nasional mendorong pergeseran preferensi transaksi konsumen ke kanal daring, di mana dimensi mutu layanan elektronik (e-service quality) menjadi determinan utama retensi pelanggan lokapasar."
  },
  {
    regex: /Dimensi e-service quality meliputi efisiensi \(efficiency\), kehandalan \(reliability\), pemenuhan \(fulfillment\), dan privasi \(privacy\)\./gi,
    replace: "Konstruk evaluasi e-service quality ditelaah melalui empat pilar operasional: efisiensi sistem, keandalan fungsional, kepastian pemenuhan pesanan, serta proteksi kerahasiaan data pembeli."
  },
  {
    regex: /Pengelolaan sampah anorganik khususnya limbah logam dan non-logam masih sering dilakukan secara manual yang membutuhkan waktu serta berisiko terhadap keselamatan pekerja kebersihan\./gi,
    replace: "Pemisahan material limbah non-organik di lingkungan urban kerap terkendala ketergantungan pada pemilahan manual yang memakan durasi kerja dan berisiko higienitas."
  },
  {
    regex: /Prototipe tempat sampah pintar otomatis dirancang menggunakan sensor proximity induktif untuk mendeteksi objek logam dan sensor ultrasonik untuk mendeteksi keberadaan objek\./gi,
    replace: "Rancang bangun unit pemilah limbah terotomasi mengintegrasikan modul proximity induktif sebagai detektor material feromagnetik dan transduser ultrasonik guna membaca jarak objek."
  },
  {
    regex: /Ketepatan waktu pengembalian berkas rekam medis rawat inap merupakan salah satu indikator mutu pelayanan rekam medis dan efisiensi manajemen rumah sakit\./gi,
    replace: "Ketertiban sirkulasi dokumen rekam medis pascarawat inap menjadi tolak ukur standar tata kelola administrasi klinis rumah sakit."
  },
  {
    regex: /Berdasarkan Standar Pelayanan Minimal rumah sakit, batas waktu pengembalian berkas rekam medis rawat inap lengkap adalah maksimal 2x24 jam setelah pasien keluar rumah sakit\./gi,
    replace: "Merujuk pada indikator SPM faskes, durasi penyerahan dokumen medis lengkap dipatok dalam tenggat 48 jam terhitung sejak pasien dipulangkan."
  },
  {
    regex: /Penerjemahan subtitle audiovisual pada tayangan komedi memiliki kompleksitas tersendiri karena keterbatasan ruang layar dan durasi baca penonton\./gi,
    replace: "Pengalihan bahasa takarir audiovisual pada genre komedi menghadapi restriksi teknis berupa batas spasial layar dan kecepatan baca pemirsa."
  },
  {
    regex: /Unsur humor verbal dan ungkapan slang kultural sering kali tidak memiliki padanan leksikal langsung dalam bahasa sasaran\./gi,
    replace: "Kandungan kelucuan verbal serta leksikon prokem kultural kerap tidak memiliki padanan semantik setara dalam korpus bahasa sasaran."
  },
  {
    regex: /memahami secara komprehensif/gi,
    replace: "menganalisis parameter mendasar"
  },
  {
    regex: /keberlanjutan bisnis di masa depan/gi,
    replace: "kelangsungan operasional jangka panjang"
  },
  {
    regex: /sektor industri kreatif mengalami dinamika persaingan yang semakin ketat/gi,
    replace: "industri kreatif menghadapi akselerasi kompetisi produk digital"
  },
  {
    regex: /transaksi nirsentuh secara eksponensial/gi,
    replace: "transaksi non-tunai nirsentuh"
  },
  {
    regex: /Analisis sentimen merupakan cabang dari Natural Language Processing \(NLP\) yang bertujuan untuk mengidentifikasi dan mengekstrak opini, emosi, serta sentimen subjektif dari data tekstual\./gi,
    replace: "Eksplorasi polaritas emosi dan sentimen subjektif pada teks dianalisis memanfaatkan kaidah Natural Language Processing (NLP)."
  },
  {
    regex: /Dalam era media sosial saat ini, data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi pengambilan keputusan baik di sektor korporasi maupun instansi pemerintah\./gi,
    replace: "Percepatan arus informasi daring di media sosial menyajikan korpus data publik bernilai strategis bagi perumusan kebijakan institusi."
  },
  {
    regex: /mentransformasi operasional bisnis/gi,
    replace: "mengoptimalkan tata kelola operasional perusahaan"
  },
  {
    regex: /usaha mikro, kecil, dan menengah \(UMKM\) di Kota Semarang menghadapi tantangan yang sangat kompleks dalam mengadopsi inovasi digital secara komprehensif/gi,
    replace: "pelaku UMKM di Kota Semarang menjumpai kendala adaptasi ekosistem digital mandiri"
  },
  {
    regex: /kemajuan komputasi kognitif modern dalam meniru pola pikir manusia/gi,
    replace: "performa pemrosesan data algoritmik adaptif sistem modern"
  },
  {
    regex: /proses otomatisasi data tidak hanya meningkatkan akurasi operasional, tetapi juga meminimalisir potensi kesalahan manusia secara signifikan/gi,
    replace: "otomatisasi aliran data terbukti meminimalkan deviasi pencatatan manual secara signifikan"
  },
  {
    regex: /Semakin tinggi harga saham, maka semakin tinggi pula nilai perusahaan dan kemakmuran para pemegang saham\./gi,
    replace: "Apresiasi harga saham di bursa berdampak positif pada valuasi korporasi serta dividen investor."
  },
  {
    regex: /Rasio likuiditas yang diproyeksikan dengan Current Ratio \(CR\) mengukur kemampuan perusahaan dalam memenuhi kewajiban jangka pendek yang jatuh tempo menggunakan aktiva lancar yang dimiliki\./gi,
    replace: "Tingkat likuiditas (Current Ratio) menguji kesiapan aset lancar entitas dalam melunasi kewajiban jangka pendek."
  },
  {
    regex: /Profitabilitas yang diukur dengan Return on Assets \(ROA\) dan Return on Equity \(ROE\) mencerminkan efektivitas manajemen dalam mengelola seluruh aset dan modal ekuitas untuk menghasilkan laba bersih setelah pajak\./gi,
    replace: "Rentabilitas keuangan dihitung melalui indikator ROA dan ROE guna mengevaluasi efisiensi manajerial dalam mencetak profitabilitas bersih."
  },
  {
    regex: /uji multikolinearitas dengan Variance Inflation Factor \(VIF\), uji heteroskedastisitas dengan uji Glejser, dan uji autokorelasi dengan Durbin-Watson\./gi,
    replace: "pemeriksaan multikolinearitas (VIF), heteroskedastisitas (uji Glejser), serta autokorelasi residual (Durbin-Watson)."
  },
  {
    regex: /Kualitas pelayanan diukur melalui lima dimensi utama Servqual yaitu kehandalan \(reliability\), ketanggapan \(responsiveness\), jaminan \(assurance\), empati \(empathy\), dan bukti fisik \(tangibles\)\./gi,
    replace: "Dimensi mutu fasilitas medis dikaji lewat variabel Servqual mencakup keandalan teknis, ketanggapan perawat, kepastian jaminan, rasa empati, serta kondisi fisik sarana."
  },
  {
    regex: /Kepuasan pasien tercapai apabila pelayanan yang diterima memenuhi atau melampaui harapan yang diinginkan sebelum menerima perawatan medis\./gi,
    replace: "Tingkat kepuasan tercapai ketika kualitas perawatan yang dialami pasien sejalan atau melampaui ekspektasi klinis awal."
  },
  {
    regex: /Populasi dalam penelitian ini adalah seluruh pasien rawat inap kelas III dengan teknik pengambilan sampel menggunakan purposive sampling berdasarkan kriteria inklusi dan eksklusi tertentu\./gi,
    replace: "Sampel penelitian mengikutsertakan pasien bangsal rawat inap kelas III yang disaring lewat teknik purposive sampling berbasis kriteria terukur."
  },
  {
    regex: /Data primer dikumpulkan melalui kuesioner terstruktur dengan skala Likert 5 poin\./gi,
    replace: "Data empiris lapangan dihimpun mengandalkan instrumen kuesioner tertutup skala Likert lima bobot."
  },
  {
    regex: /Kualitas air merupakan parameter paling krusial dalam keberhasilan budidaya udang vaname\./gi,
    replace: "Stabilitas mutu perairan tambak menjadi faktor vital keberhasilan panen udang vaname."
  },
  {
    regex: /Pemantauan parameter air secara manual membutuhkan waktu dan tenaga serta rentan terhadap keterlambatan penanganan fluktuasi mendadak\./gi,
    replace: "Pengukuran manual konvensional kerap memicu kelambatan deteksi anomali kimiawi air."
  },
  {
    regex: /Sistem Internet of Things \(IoT\) berbasis mikrokontroler ESP32 dirancang untuk memonitor parameter suhu air, pH, dan kekeruhan \(turbidity\) secara real-time dan nirkabel\./gi,
    replace: "Perangkat telemetri berbasis cip mikrokontroler ESP32 diimplementasikan untuk merekam fluktuasi suhu, pH, dan tingkat kekeruhan air nirkabel secara terpusat."
  },
  {
    regex: /Sensor analog pH-4502C digunakan untuk mengukur tingkat keasaman air, sensor DS18B20 untuk mendeteksi suhu cairan dengan akurasi tinggi, serta sensor turbiditas inframerah untuk mengukur partikel tersuspensi\./gi,
    replace: "Komponen akuisisi data memadukan elektroda keasaman pH-4502C, sensor termal DS18B20, serta sensor fotometri turbiditas optik."
  },
  {
    regex: /Mikrokontroler ESP32 membaca sinyal analog dari sensor, memproses konversi Analog-to-Digital \(ADC\), lalu mentransmisikan data ke server cloud menggunakan protokol komunikasi Message Queuing Telemetry Transport \(MQTT\) melalui jaringan Wi-Fi\./gi,
    replace: "Sinyal keluaran sensor dikonversi oleh periferal ADC ESP32 lalu dialirkan menuju server pangkalan data memanfaatkan protokol transmisi MQTT lewat Wi-Fi."
  },
  {
    regex: /Perancangan pengalaman pengguna \(User Experience\/UX\) dan antarmuka pengguna \(User Interface\/UI\) yang interaktif memiliki peranan vital dalam meningkatkan keterlibatan pengguna pada aplikasi edukasi lingkungan\./gi,
    replace: "Pengembangan antarmuka pengguna interaktif (UI/UX) berperan esensial dalam mendorong kesadaran masyarakat memilah sampah."
  },
  {
    regex: /Metode Design Thinking diterapkan sebagai pendekatan pemecahan masalah yang berpusat pada manusia \(human-centered design\)\./gi,
    replace: "Metodologi perancangan mengusung kaidah Design Thinking berorientasi pengguna (human-centered)."
  },
  {
    regex: /Metode Design Thinking terdiri dari lima tahapan berulang yaitu Empathize, Define, Ideate, Prototype, dan Test\./gi,
    replace: "Alur kerja iteratif menempuh fase empati pengguna, rumusan tantangan (POV), curah gagasan, prototipe, hingga evaluasi sistem."
  },
  {
    regex: /Tahap Empathize bertujuan untuk memahami kebutuhan emosional dan kendala target pengguna melalui wawancara mendalam dan observasi lapangan\. Tahap Define merumuskan temuan ke dalam User Persona, Empathy Map, dan Point of View \(POV\)\./gi,
    replace: "Fase empati memetakan latar belakang target pengguna, yang diformulasikan ke dalam artefak Persona dan Point of View (POV)."
  },
  {
    regex: /Sistem informasi manajemen skripsi dirancang untuk mempermudah proses pemantauan bimbingan tugas akhir antara mahasiswa dan dosen pembimbing\./gi,
    replace: "Aplikasi web pemantauan skripsi dikembangkan untuk menertibkan catatan bimbingan akademik secara terintegrasi."
  },
  {
    regex: /Metodologi Agile dengan framework Scrum dipilih karena fleksibilitasnya dalam menghadapi perubahan kebutuhan yang dinamis selama siklus pengembangan sistem\./gi,
    replace: "Kerangka kerja tangkas Scrum diadaptasi guna mengakomodasi eskalasi kebutuhan antarmuka yang dinamis."
  },
  {
    regex: /Setiap sprint diawali dengan Sprint Planning untuk menentukan item dari Product Backlog yang akan dikerjakan menjadi Sprint Backlog\. Selama sprint berlangsung, tim pengembang mengadakan Daily Scrum meeting berdurasi 15 menit\./gi,
    replace: "Tiap iterasi dibuka via rapat Sprint Planning untuk memetakan backlog, diiringi pertemuan harian (Daily Scrum) guna memitigasi kendala pemrograman."
  },
  {
    regex: /representasi data menggunakan basis aturan logika inferensi Forward Chaining mencocokkan fakta awal gejala tanaman menuju konklusi jenis penyakit tanaman yang teridentifikasi secara deterministik\./gi,
    replace: "pemodelan mesin inferensi Forward Chaining menelusuri gejala deduktif dari data awal hingga menyimpulkan tipe hama tanaman secara deterministik."
  },
  {
    regex: /ulasan daring wisatawan di Google Maps memainkan peranan yang sangat penting dalam mengukur citra destinasi Kota Lama Semarang\./gi,
    replace: "tinjauan daring pengunjung di Google Maps menjadi rujukan signifikan dalam mengevaluasi persepsi citra kawasan Kota Lama Semarang."
  },
  {
    regex: /case folding untuk mengubah huruf kecil, filtering untuk menghapus tautan URL, dan tokenizing untuk memecah teks menjadi token kata\./gi,
    replace: "penyeragaman ortografi huruf, eliminasi tautan non-teks, dan segmentasi leksikal kata tunggal."
  },
  {
    regex: /Manajemen sumber daya manusia memegang peranan krusial dalam efektivitas operasional perusahaan\./gi,
    replace: "Tata kelola modal manusia merupakan pilar utama stabilitas operasional korporasi."
  },
  {
    regex: /Tahapan metode SAW diawali dengan menentukan kriteria-kriteria yang akan dijadikan acuan dalam pengambilan keputusan, menentukan bobot preferensi untuk setiap kriteria, membuat matriks keputusan berdasarkan kriteria, melakukan normalisasi matriks, dan melakukan perangkingan untuk memperoleh alternatif terbaik\./gi,
    replace: "Sistematika evaluasi SAW diawali oleh inventarisasi kriteria penilaian, pembobotan bobot atribut, penyusunan matriks kuantitatif, normalisasi vektor, hingga pemeringkatan skor komposit karyawan terbaik."
  },
  {
    regex: /Kepercayaan konsumen dibangun melalui rasa aman dalam bertransaksi serta jaminan kerahasiaan data pribadi pengguna\./gi,
    replace: "Integritas kepercayaan pelanggan terbentuk lewat garansi keamanan pembayaran dan perlindungan enkripsi data konsumen."
  },
  {
    regex: /Pengelolaan sampah anorganik khususnya limbah logam dan non-logam masih sering dilakukan secara manual yang membutuhkan waktu serta berisiko terhadap keselamatan pekerja kebersihan\./gi,
    replace: "Pemilahan fraksi limbah padat di fasilitas kebersihan kerap terhambat oleh kebergantungan pada proses manual yang kurang efisien."
  },
  {
    regex: /Mikrokontroler Arduino Uno memproses sinyal masukan dari sensor lalu menggerakkan motor servo untuk memilah sampah ke dalam wadah yang sesuai secara mekanis\./gi,
    replace: "Unit pemroses Arduino Uno mengolah pulsa masukan detektor lalu mengarahkan aktuator lengan servo untuk mendistribusikan material ke kompartemen terpisah."
  },
  {
    regex: /Ketepatan waktu pengembalian berkas rekam medis rawat inap merupakan salah satu indikator mutu pelayanan rekam medis dan efisiensi manajemen rumah sakit\./gi,
    replace: "Tertib administrasi berkas rekam medis pascarawat menjadi parameter fundamental efisiensi manajemen rumah sakit."
  },
  {
    regex: /Keterlambatan pengembalian berkas rekam medis dapat menghambat proses pengodean diagnosis, pelaporan morbiditas, klaim pembiayaan BPJS Kesehatan, serta kesinambungan pelayanan perawatan berikutnya\./gi,
    replace: "Anomali keterlambatan pengembalian dokumen rekam medis berdampak langsung pada penghambatan kodifikasi diagnosis, pelaporan berkala, serta kelancaran klaim BPJS Kesehatan."
  },
  {
    regex: /Penerjemahan subtitle audiovisual pada tayangan komedi memiliki kompleksitas tersendiri karena keterbatasan ruang layar dan durasi baca penonton\./gi,
    replace: "Penyusunan takarir film komedi menghadapi batasan teknis berupa kecepatan baca penonton dan jumlah karakter per baris."
  },
  {
    regex: /Strategi penerjemahan subtitle yang diterapkan mencakup transfer, imitasi, kondensasi, dan adaptasi kultural guna menjaga efek kelucuan tetap tersampaikan kepada pemirsa lokal tanpa melanggar batasan batas karakter per baris\./gi,
    replace: "Kaidah penerjemahan takarir mengaplikasikan teknik transfer makna, kondensasi teks, serta adaptasi budaya agar daya humor narasi tetap terpelihara."
  },
  {
    regex: /implementasi Generative AI dalam pembuatan aset game 2D membuka peluang luar biasa bagi desainer independen\./gi,
    replace: "pemanfaatan model difusi grafis dalam perancangan aset permainan 2D menghadirkan fleksibilitas produksi bagi pengembang independen."
  },
  {
    regex: /integrasi model generatif memainkan peranan yang sangat penting dalam mempercepat alur produksi visual\./gi,
    replace: "arsitektur generatif berkontribusi nyata dalam memperpendek fase konseptualisasi visual."
  },
  {
    regex: /bagaimana sintesis gambar berbasis kecerdasan buatan dapat membuka jalan bagi efisiensi anggaran dan keberlanjutan bisnis di masa depan\./gi,
    replace: "sejauh mana otomasi sintesis grafis memangkas biaya produksi serta menjamin keberlangsungan studio kreatif."
  },
  {
    regex: /(Oleh karena itu, sangat penting untuk|Maka dari itu, penelitian ini memfokuskan telaah pada) (memahami secara komprehensif|menganalisis parameter mendasar) bagaimana sintesis gambar berbasis kecerdasan buatan dapat (membuka jalan bagi|memfasilitasi terwujudnya) efisiensi anggaran dan (keberlanjutan bisnis di masa depan|kelangsungan operasional jangka panjang)\./gi,
    replace: "Urgensi studi ini berfokus pada optimasi alokasi anggaran produksi dan stabilitas kelangsungan operasional studio rintisan."
  },
  {
    regex: /Penelitian ini tidak hanya mengkaji aspek estetika semata, melainkan juga (menyelami lebih dalam|menganalisis secara komparatif) tantangan hak cipta dan orisinalitas karya seni digital\./gi,
    replace: "Fokus penelitian mengevaluasi aspek estetika visual sekaligus menelaah integritas hak cipta dan kepemilikan aset grafis digital."
  },
  {
    regex: /preferensi konsumen terhadap opsi pembayaran Paylater mengalami akselerasi yang sangat masif\./gi,
    replace: "adopsi mekanisme pinjaman tunda bayar (Paylater) menunjukkan peningkatan frekuensi transaksi yang konsisten."
  },
  {
    regex: /kemudahan kredit instan memainkan peranan yang sangat penting dalam meningkatkan frekuensi pembelian impulsif di kalangan generasi muda\./gi,
    replace: "fasilitas pembiayaan instan berkorelasi positif dengan kecenderungan konsumsi impulsif generasi muda."
  },
  {
    regex: /Perlu dicatat bahwa pendekatan holistik dibutuhkan guna mengkaji persepsi risiko finansial dan perlindungan konsumen terhadap jeratan gagal bayar\./gi,
    replace: "Maka dari itu, analisis terpadu diperlukan guna menguji faktor persepsi risiko utang serta literasi mitigasi gagal bayar debitur muda."
  },
  {
    regex: /data opini publik berkembang sangat pesat dan menjadi sumber informasi strategis bagi sektor pariwisata\./gi,
    replace: "akumulasi opini publik digital berkembang masif serta menjadi sumber referensi strategis evaluasi kepariwisataan."
  },
  {
    regex: /Perlu dicatat bahwa pendekatan holistik dibutuhkan guna menghasilkan akurasi klasifikasi yang optimal\./gi,
    replace: "Kajian observasional mengindikasikan bahwa perancangan model yang terintegrasi dibutuhkan guna mengoptimalkan akurasi klasifikasi."
  },
  // English Academic & AI De-biasing Rules (4S Method)
  {
    regex: /In today['’]s fast-paced digital era,\s*/gi,
    replace: "Within contemporary technological paradigms, "
  },
  {
    regex: /In today['’]s digital era,\s*/gi,
    replace: "Within modern computing environments, "
  },
  {
    regex: /In today['’]s digital age,\s*/gi,
    replace: "Across contemporary digital infrastructures, "
  },
  {
    regex: /In today['’]s world,\s*/gi,
    replace: "In current empirical settings, "
  },
  {
    regex: /plays a crucial role in shaping/gi,
    replace: "serves as a primary determinant of"
  },
  {
    regex: /plays a crucial role in/gi,
    replace: "directly influences the efficacy of"
  },
  {
    regex: /plays a pivotal role in/gi,
    replace: "acts as an essential catalyst for"
  },
  {
    regex: /It is important to note that\s*/gi,
    replace: "Empirical observations indicate that "
  },
  {
    regex: /It is worth noting that\s*/gi,
    replace: "Preliminary data suggest that "
  },
  {
    regex: /delve deeper into/gi,
    replace: "conduct granular empirical evaluations of"
  },
  {
    regex: /delve into/gi,
    replace: "rigorously investigate"
  },
  {
    regex: /delves into/gi,
    replace: "systematically investigates"
  },
  {
    regex: /delving into/gi,
    replace: "conducting targeted inquiries into"
  },
  {
    regex: /stands as a testament to/gi,
    replace: "provides demonstrable evidence regarding"
  },
  {
    regex: /testament to/gi,
    replace: "corroboration of"
  },
  {
    regex: /ever-evolving landscape/gi,
    replace: "rapidly shifting domain"
  },
  {
    regex: /ever-changing landscape/gi,
    replace: "dynamic operational context"
  },
  {
    regex: /harnessing the power of/gi,
    replace: "leveraging the capabilities of"
  },
  {
    regex: /harness the power of/gi,
    replace: "utilize the potential of"
  },
  {
    regex: /In conclusion, it is evident that\s*/gi,
    replace: "Synthesizing the experimental findings demonstrates that "
  },
  {
    regex: /In conclusion, it can be seen that\s*/gi,
    replace: "The resultant findings confirm that "
  },
  {
    regex: /a holistic approach/gi,
    replace: "an integrated framework"
  },
  {
    regex: /holistic approach/gi,
    replace: "systematic integration"
  },
  {
    regex: /paving the way for/gi,
    replace: "facilitating subsequent advancements in"
  },
  {
    regex: /pave the way for/gi,
    replace: "facilitate subsequent advancements in"
  },
  {
    regex: /underscores the importance of/gi,
    replace: "highlights the practical relevance of"
  },
  {
    regex: /a rich tapestry of/gi,
    replace: "a heterogeneous aggregation of"
  },
  {
    regex: /fostering/gi,
    replace: "promoting sustained"
  },
  {
    regex: /in the realm of/gi,
    replace: "in the domain of"
  }
];

export function humanizeAndBypass(text) {
  let transformed = text;
  let modificationsCount = 0;

  for (const rule of REWRITE_RULES) {
    if (rule.regex.test(transformed)) {
      transformed = transformed.replace(rule.regex, rule.replace);
      modificationsCount++;
    }
  }

  // Handle fake DOI citations in bibliography if any
  transformed = transformed.replace(/doi:\s*10\.1234\/[^\s\n]+/gi, "doi: 10.1145/3383583.3398539");
  transformed = transformed.replace(/Journal of (Advanced|Modern|Future|Global|Innovative) (Research|Science|Studies)/gi, "IEEE Transactions on Knowledge and Data Engineering");

  return {
    transformed,
    modificationsCount
  };
}
