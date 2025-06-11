import { TujuanWisata } from '@/types';

// Data destinasi wisata di Yogyakarta
export const destinasiWisata: TujuanWisata[] = [
  {
    id: 1,
    nama: "Candi Borobudur",
    deskripsi: "Candi Buddha terbesar di dunia dan situs Warisan Dunia UNESCO yang dikelilingi oleh kehijauan dan pegunungan.",
    gambar: "/borobudur.jpg",
    rating: 4.9,
    lokasi: {
      latitude: -7.607874,
      longitude: 110.203751,
      alamat: "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah"
    },
    biaya: {
      masuk: 50000,
      makanan: 75000,
      penginapan: 350000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (sebelum jam 9) atau sore hari (setelah jam 3)",
    kategori: "Temple",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user1",
        namaPengguna: "Budi Santoso",
        fotoPengguna: "/avatar/budi.jpg",
        pesan: "Pemandangan sunrise di Borobudur sangat menakjubkan! Jangan lupa datang pagi-pagi untuk melihatnya.",
        rating: 5,
        tanggal: "2025-04-20",
        balasan: []
      }
    ]
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    deskripsi: "Kompleks candi Hindu abad ke-9 yang didedikasikan untuk Trimurti dengan pemandangan taman yang indah.",
    gambar: "/prambanan.jpg",
    rating: 4.8,
    lokasi: {
      latitude: -7.752020,
      longitude: 110.491417,
      alamat: "Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, DIY"
    },
    biaya: {
      masuk: 50000,
      makanan: 60000,
      penginapan: 300000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari menjelang sunset",
    kategori: "Temple",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user3",
        namaPengguna: "Ahmad Wijaya",
        fotoPengguna: "/avatar/ahmad.jpg",
        pesan: "Candi Prambanan sangat megah! Pertunjukan Ramayana Ballet-nya wajib ditonton.",
        rating: 5,
        tanggal: "2025-04-18",
        balasan: []
      }
    ]
  },
  {
    id: 3,
    nama: "Candi Ratu Boko",
    deskripsi: "Kompleks candi bersejarah yang terletak di puncak bukit dengan pemandangan sunset yang menakjubkan.",
    gambar: "/candi_ratu_boko.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.770617,
      longitude: 110.491767,
      alamat: "Ratu Boko, Bokoharjo, Prambanan, Sleman, DIY"
    },
    biaya: {
      masuk: 40000,
      makanan: 50000,
      penginapan: 280000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari untuk melihat sunset",
    kategori: "Temple",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user12",
        namaPengguna: "Maya Sari",
        fotoPengguna: "/avatar/maya.jpg",
        pesan: "Tempat terbaik untuk melihat sunset! Pemandangan dari atas bukit sangat spektakuler.",
        rating: 5,
        tanggal: "2025-04-22",
        balasan: []
      }
    ]
  },
  {
    id: 4,
    nama: "Candi Sambisari",
    deskripsi: "Candi Hindu bawah tanah yang unik, ditemukan terkubur di sawah dan dikelilingi hamparan rumput.",
    gambar: "/candi_sambisari.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.741389,
      longitude: 110.433889,
      alamat: "Sambisari, Purwomartani, Kalasan, Sleman, DIY"
    },
    biaya: {
      masuk: 15000,
      makanan: 35000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Temple",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user13",
        namaPengguna: "Adi Nugroho",
        fotoPengguna: "/avatar/adi.jpg",
        pesan: "Candi yang unik karena berada di bawah permukaan tanah. Cerita penemuannya sangat menarik.",
        rating: 4,
        tanggal: "2025-04-10",
        balasan: []
      }
    ]
  },
  {
    id: 5,
    nama: "Candi Plaosan",
    deskripsi: "Kompleks candi Buddha kembar yang melambangkan persatuan dalam keberagaman antara Buddha dan Hindu.",
    gambar: "/candi_plaosan.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.743333,
      longitude: 110.504444,
      alamat: "Plaosan Lor, Bugisan, Prambanan, Klaten, Jawa Tengah"
    },
    biaya: {
      masuk: 25000,
      makanan: 40000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Temple",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user14",
        namaPengguna: "Ratna Dewi",
        fotoPengguna: "/avatar/ratna.jpg",
        pesan: "Candi kembar yang indah dengan filosofi persatuan yang mendalam. Suasananya tenang dan damai.",
        rating: 4.5,
        tanggal: "2025-04-08",
        balasan: []
      }
    ]
  },
  {
    id: 6,
    nama: "Pantai Parangtritis",
    deskripsi: "Pantai pasir hitam terkenal dengan cerita mistis dan pemandangan sunset yang menakjubkan.",
    gambar: "/parangtritis.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -8.025990,
      longitude: 110.332150,
      alamat: "Parangtritis, Kretek, Bantul, DIY"
    },
    biaya: {
      masuk: 10000,
      makanan: 40000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari untuk melihat sunset",
    kategori: "Beach",
    jamBuka: "24 jam",
    komentar: [
      {
        id: 1,
        penggunaId: "user6",
        namaPengguna: "Eko Prasetyo",
        fotoPengguna: "/avatar/eko.jpg",
        pesan: "Sunsetnya luar biasa! Bisa naik ATV atau andong di pantai ini. Hati-hati dengan ombaknya yang besar.",
        rating: 4,
        tanggal: "2025-04-05",
        balasan: []
      }
    ]
  },
  {
    id: 7,
    nama: "Pantai Indrayanti",
    deskripsi: "Pantai pasir putih yang indah di Gunungkidul, sempurna untuk bersantai dengan pemandangan tebing kapur.",
    gambar: "/pantai_indrayanti.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -8.148611,
      longitude: 110.616944,
      alamat: "Tepus, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 10000,
      makanan: 45000,
      penginapan: 220000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Beach",
    jamBuka: "24 jam",
    komentar: [
      {
        id: 1,
        penggunaId: "user15",
        namaPengguna: "Linda Safitri",
        fotoPengguna: "/avatar/linda.jpg",
        pesan: "Pantai dengan pasir putih yang bersih dan air laut yang jernih. Cocok untuk berenang dan bersantai.",
        rating: 4.5,
        tanggal: "2025-04-12",
        balasan: []
      }
    ]
  },
  {
    id: 8,
    nama: "Pantai Timang",
    deskripsi: "Terkenal dengan wahana gondola menuju pulau karang dan ombak yang menantang, favorit para pencari sensasi.",
    gambar: "/pantai_timang.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -8.152754,
      longitude: 110.681983,
      alamat: "Timang, Purwodadi, Tepus, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 10000,
      makanan: 50000,
      penginapan: 230000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga siang hari",
    kategori: "Beach",
    jamBuka: "07:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user10",
        namaPengguna: "Agus Purnomo",
        fotoPengguna: "/avatar/agus.jpg",
        pesan: "Pengalaman naik gondola tradisional sangat mendebarkan! Pemandangan pantainya juga indah.",
        rating: 5,
        tanggal: "2025-04-02",
        balasan: []
      }
    ]
  },
  {
    id: 9,
    nama: "Pantai Drini",
    deskripsi: "Pantai yang tenang dengan pulau karang kecil, cocok untuk berenang dan berkanoe dengan angin pantai yang sejuk.",
    gambar: "/pantai_drini.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -8.138889,
      longitude: 110.583889,
      alamat: "Banjarejo, Tanjungsari, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 10000,
      makanan: 40000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Beach",
    jamBuka: "24 jam",
    komentar: [
      {
        id: 1,
        penggunaId: "user16",
        namaPengguna: "Fajar Hidayat",
        fotoPengguna: "/avatar/fajar.jpg",
        pesan: "Pantai yang tenang dengan air yang jernih. Pulau karang kecilnya menambah keunikan pantai ini.",
        rating: 4,
        tanggal: "2025-04-15",
        balasan: []
      }
    ]
  },
  {
    id: 10,
    nama: "Pantai Ngobaran",
    deskripsi: "Pantai dengan warisan budaya, menampilkan patung dan altar di dekat laut dengan kolam air pasang.",
    gambar: "/pantai_ngobaran.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -8.131667,
      longitude: 110.556944,
      alamat: "Kanigoro, Saptosari, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 5000,
      makanan: 35000,
      penginapan: 180000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Beach",
    jamBuka: "24 jam",
    komentar: [
      {
        id: 1,
        penggunaId: "user17",
        namaPengguna: "Indah Permata",
        fotoPengguna: "/avatar/indah.jpg",
        pesan: "Pantai yang unik dengan nuansa religius. Ada pura dan masjid berdampingan di tepi pantai.",
        rating: 4.5,
        tanggal: "2025-04-07",
        balasan: []
      }
    ]
  },
  {
    id: 11,
    nama: "Benteng Vredeburg",
    deskripsi: "Museum benteng Belanda yang menampilkan sejarah kemerdekaan Indonesia dengan koleksi artefak kolonial.",
    gambar: "/benteng_vredeburg.jpg",
    rating: 4.3,
    lokasi: {
      latitude: -7.799167,
      longitude: 110.365833,
      alamat: "Jl. Margo Mulyo No.6, Ngupasan, Gondomanan, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 10000,
      makanan: 35000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Historical Site",
    jamBuka: "08:00 - 15:30 (tutup Senin)",
    komentar: [
      {
        id: 1,
        penggunaId: "user18",
        namaPengguna: "Bambang Sutrisno",
        fotoPengguna: "/avatar/bambang.jpg",
        pesan: "Museum yang edukatif dengan koleksi sejarah yang lengkap. Cocok untuk mengenal sejarah Indonesia.",
        rating: 4,
        tanggal: "2025-04-03",
        balasan: []
      }
    ]
  },
  {
    id: 12,
    nama: "Museum Sonobudoyo",
    deskripsi: "Museum yang didedikasikan untuk budaya dan sejarah Jawa dengan koleksi artefak yang ekstensif.",
    gambar: "/museum_sonobudoyo.jpg",
    rating: 4.2,
    lokasi: {
      latitude: -7.802778,
      longitude: 110.364722,
      alamat: "Jl. Trikora No.6, Panembahan, Kraton, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 8000,
      makanan: 30000,
      penginapan: 180000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Historical Site",
    jamBuka: "08:00 - 15:30 (tutup Senin)",
    komentar: [
      {
        id: 1,
        penggunaId: "user19",
        namaPengguna: "Sari Wulandari",
        fotoPengguna: "/avatar/sari.jpg",
        pesan: "Koleksi budaya Jawa yang lengkap. Ada pertunjukan wayang kulit setiap malam Sabtu.",
        rating: 4,
        tanggal: "2025-03-28",
        balasan: []
      }
    ]
  },
  {
    id: 13,
    nama: "Keraton Yogyakarta",
    deskripsi: "Istana kerajaan Sultan Yogyakarta yang kaya akan budaya dan sejarah dengan arsitektur Jawa tradisional.",
    gambar: "/keraton.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.805571,
      longitude: 110.363968,
      alamat: "Jl. Rotowijayan Blok No. 1, Panembahan, Kraton, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 15000,
      makanan: 40000,
      penginapan: 280000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (tutup hari Senin)",
    kategori: "Historical Site",
    jamBuka: "08:30 - 14:00 (tutup Senin)",
    komentar: [
      {
        id: 1,
        penggunaId: "user9",
        namaPengguna: "Sri Wahyuni",
        fotoPengguna: "/avatar/sri.jpg",
        pesan: "Tempat yang penuh sejarah dan budaya Jawa. Ada pertunjukan gamelan dan tari tradisional.",
        rating: 4,
        tanggal: "2025-03-20",
        balasan: []
      }
    ]
  },
  {
    id: 14,
    nama: "Taman Sari Water Castle",
    deskripsi: "Bekas taman kerajaan Kesultanan Yogyakarta dengan arsitektur taman dan kolam yang indah.",
    gambar: "/tamansari.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.810040,
      longitude: 110.359400,
      alamat: "Jl. Tamanan, Patehan, Kraton, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 15000,
      makanan: 45000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Historical Site",
    jamBuka: "09:00 - 15:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user5",
        namaPengguna: "Putri Handayani",
        fotoPengguna: "/avatar/putri.jpg",
        pesan: "Arsitektur dan sejarahnya sangat menarik. Sewa pemandu lokal untuk cerita lengkap.",
        rating: 4.5,
        tanggal: "2025-03-25",
        balasan: []
      }
    ]
  },
  {
    id: 15,
    nama: "Museum Sonobudoyo",
    deskripsi: "Museum dedicated to Javanese culture and history with an extensive artifact collection..",
    gambar: "/museum_sonobudoyo.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -7.541617,
      longitude: 110.442711,
      alamat: "Sleman, DIY"
    },
    biaya: {
      masuk: 20000,
      makanan: 45000,
      penginapan: 275000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari untuk melihat sunrise",
    kategori: "Adventure",
    jamBuka: "24 jam (tur jeep mulai 05:00)",
    komentar: [
      {
        id: 1,
        penggunaId: "user8",
        namaPengguna: "Joko Susilo",
        fotoPengguna: "/avatar/joko.jpg",
        pesan: "Tur jeep Merapi sangat seru! Bisa melihat sisa-sisa letusan gunung berapi.",
        rating: 5,
        tanggal: "2025-04-12",
        balasan: []
      }
    ]
  },

  {
    id: 16,
    nama: "Merapi Volcano",
    deskripsi: "Salah satu gunung berapi paling aktif di Indonesia dengan tur yang menarik dan pemandangan vulkanis.",
    gambar: "/merapi.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -7.541617,
      longitude: 110.442711,
      alamat: "Sleman, DIY"
    },
    biaya: {
      masuk: 20000,
      makanan: 45000,
      penginapan: 275000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari untuk melihat sunrise",
    kategori: "Adventure",
    jamBuka: "24 jam (tur jeep mulai 05:00)",
    komentar: [
      {
        id: 1,
        penggunaId: "user8",
        namaPengguna: "Joko Susilo",
        fotoPengguna: "/avatar/joko.jpg",
        pesan: "Tur jeep Merapi sangat seru! Bisa melihat sisa-sisa letusan gunung berapi.",
        rating: 5,
        tanggal: "2025-04-12",
        balasan: []
      }
    ]
  },
  {
    id: 17,
    nama: "HeHa Sky View",
    deskripsi: "Tempat wisata modern dengan pemandangan kota dan gunung, dilengkapi spot foto yang menarik.",
    gambar: "/heha_sky_view.jpg",
    rating: 4.3,
    lokasi: {
      latitude: -8.009722,
      longitude: 110.631944,
      alamat: "Patuk, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 25000,
      makanan: 60000,
      penginapan: 300000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari atau malam hari",
    kategori: "Adventure",
    jamBuka: "15:00 - 24:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user20",
        namaPengguna: "Desi Ratnasari",
        fotoPengguna: "/avatar/desi.jpg",
        pesan: "Tempat yang instagramable dengan pemandangan yang bagus. Cocok untuk foto-foto dan nongkrong.",
        rating: 4,
        tanggal: "2025-04-18",
        balasan: []
      }
    ]
  },
  {
    id: 18,
    nama: "Goa Jomblang",
    deskripsi: "Gua vertikal dengan fenomena cahaya surga yang menakjubkan, populer di kalangan petualang.",
    gambar: "/goa_jomblang.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -8.029802,
      longitude: 110.640402,
      alamat: "Jetis Wetan, Pacarejo, Semanu, Gunungkidul, DIY"
    },
    biaya: {
      masuk: 450000,
      makanan: 50000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (sekitar jam 10 untuk cahaya surga)",
    kategori: "Adventure",
    jamBuka: "08:00 - 14:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user11",
        namaPengguna: "Nina Suryani",
        fotoPengguna: "/avatar/nina.jpg",
        pesan: "Pengalaman yang sangat unik! Cahaya surga yang masuk ke gua sangat indah.",
        rating: 5,
        tanggal: "2025-03-15",
        balasan: []
      }
    ]
  },
  {
    id: 19,
    nama: "Merapi Lava Tour",
    deskripsi: "Petualangan jeep 4x4 di sekitar lereng Gunung Merapi, menjelajahi peninggalan vulkanis dan pemandangan.",
    gambar: "/merapi_lava_tour.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.541617,
      longitude: 110.442711,
      alamat: "Kaliurang, Sleman, DIY"
    },
    biaya: {
      masuk: 300000,
      makanan: 40000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (sunrise tour) atau sore hari",
    kategori: "Adventure",
    jamBuka: "05:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user21",
        namaPengguna: "Rizki Pratama",
        fotoPengguna: "/avatar/rizki.jpg",
        pesan: "Tur jeep yang menantang dengan pemandangan luar biasa. Bisa melihat langsung bekas letusan Merapi.",
        rating: 5,
        tanggal: "2025-04-20",
        balasan: []
      }
    ]
  },
  {
    id: 20,
    nama: "Kalibiru National Park",
    deskripsi: "Taman petualangan di tebing dengan platform pohon dan flying fox menghadap waduk.",
    gambar: "/kalibiru.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.857778,
      longitude: 110.188889,
      alamat: "Hargowilis, Kokap, Kulon Progo, DIY"
    },
    biaya: {
      masuk: 15000,
      makanan: 35000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Adventure",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user22",
        namaPengguna: "Andi Setiawan",
        fotoPengguna: "/avatar/andi.jpg",
        pesan: "Tempat yang bagus untuk foto di atas pohon. Flying fox-nya juga seru dengan pemandangan waduk.",
        rating: 4,
        tanggal: "2025-04-14",
        balasan: []
      }
    ]
  },
  {
    id: 21,
    nama: "Malioboro",
    deskripsi: "Jalan paling terkenal di Yogyakarta, sempurna untuk berbelanja dan kuliner dengan suasana kota yang hidup.",
    gambar: "/malioboro.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.792908,
      longitude: 110.365701,
      alamat: "Jl. Malioboro, Sosromenduran, Gedong Tengen, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 50000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Sore hingga malam hari",
    kategori: "Shopping",
    jamBuka: "24 jam (toko: 09:00 - 21:00)",
    komentar: [
      {
        id: 1,
        penggunaId: "user4",
        namaPengguna: "Dewi Lestari",
        fotoPengguna: "/avatar/dewi.jpg",
        pesan: "Tempat yang sempurna untuk berburu oleh-oleh dan jajanan khas Yogya.",
        rating: 4,
        tanggal: "2025-04-10",
        balasan: []
      }
    ]
  },
  {
    id: 22,
    nama: "Pasar Beringharjo",
    deskripsi: "Pasar tradisional yang menawarkan berbagai batik, jamu, antik, dan camilan tradisional.",
    gambar: "/pasar_beringharjo.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.800833,
      longitude: 110.364444,
      alamat: "Jl. Pabringan No.1, Ngupasan, Gondomanan, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 25000,
      penginapan: 150000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Shopping",
    jamBuka: "08:00 - 16:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user23",
        namaPengguna: "Wati Susilowati",
        fotoPengguna: "/avatar/wati.jpg",
        pesan: "Pasar tradisional yang lengkap. Batiknya bagus-bagus dan harganya bisa ditawar.",
        rating: 4,
        tanggal: "2025-04-06",
        balasan: []
      }
    ]
  },
  {
    id: 23,
    nama: "Bakpia Pathok 25",
    deskripsi: "Toko terkenal untuk bakpia asli Yogyakarta, camilan manis wajib beli untuk wisatawan.",
    gambar: "/bakpia25.jpg",
    rating: 4.3,
    lokasi: {
      latitude: -7.802500,
      longitude: 110.375000,
      alamat: "Jl. KS Tubun No.1, Sorosutan, Umbulharjo, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 30000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Shopping",
    jamBuka: "08:00 - 21:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user24",
        namaPengguna: "Ratih Sari",
        fotoPengguna: "/avatar/ratih.jpg",
        pesan: "Bakpia yang paling enak di Yogya! Rasa kacang hijau dan kacang hitamnya autentik.",
        rating: 4,
        tanggal: "2025-04-01",
        balasan: []
      }
    ]
  },
  {
    id: 24,
    nama: "Toko Oleh-Oleh Monggo Chocolate",
    deskripsi: "Toko cokelat artisan yang memadukan teknik Belgia dengan bahan-bahan Indonesia.",
    gambar: "/monggo_chocolate.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.827778,
      longitude: 110.383333,
      alamat: "Jl. Dalem Mangkubumen KT III/237, Kotagede, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 50000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Shopping",
    jamBuka: "09:00 - 20:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user25",
        namaPengguna: "Hendro Wijaya",
        fotoPengguna: "/avatar/hendro.jpg",
        pesan: "Cokelat premium dengan rasa lokal yang unik. Kemasan juga bagus untuk souvenir.",
        rating: 4.5,
        tanggal: "2025-04-08",
        balasan: []
      }
    ]
  },
  {
    id: 25,
    nama: "Pusat Kerajinan Perak Kotagede",
    deskripsi: "Distrik kerajinan perak bersejarah dengan perhiasan dan perak buatan tangan, ideal untuk hadiah.",
    gambar: "/kotagede_silver.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.825000,
      longitude: 110.390000,
      alamat: "Kotagede, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 35000,
      penginapan: 220000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga sore hari",
    kategori: "Shopping",
    jamBuka: "08:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user26",
        namaPengguna: "Sinta Dewi",
        fotoPengguna: "/avatar/sinta.jpg",
        pesan: "Kerajinan perak yang sangat indah dan berkualitas. Bisa melihat proses pembuatannya langsung.",
        rating: 4,
        tanggal: "2025-03-30",
        balasan: []
      }
    ]
  },
  {
    id: 26,
    nama: "Gudeg Yu Djum",
    deskripsi: "Tempat legendaris untuk mencicipi gudeg asli Yogyakarta, semur nangka muda tradisional yang manis.",
    gambar: "/gudeg_yu_djum.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.797222,
      longitude: 110.370833,
      alamat: "Jl. Wijilan No.167, Panembahan, Kraton, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 25000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga malam hari",
    kategori: "Foods",
    jamBuka: "06:00 - 23:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user27",
        namaPengguna: "Budi Hartono",
        fotoPengguna: "/avatar/budi_h.jpg",
        pesan: "Gudeg paling enak dan autentik di Yogya! Sudah jadi warisan kuliner turun temurun.",
        rating: 5,
        tanggal: "2025-04-16",
        balasan: []
      }
    ]
  },
  {
    id: 27,
    nama: "Sate Klathak Pak Pong",
    deskripsi: "Terkenal dengan sate kambing unik yang dibakar menggunakan tusukan besi, berlokasi di Bantul.",
    gambar: "/sate_klathak_pak_pong.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.888889,
      longitude: 110.329444,
      alamat: "Jl. Imogiri Timur KM 5, Wonokromo, Pleret, Bantul, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 40000,
      penginapan: 180000
    },
    waktuTerbaikUntukMengunjungi: "Sore hingga malam hari",
    kategori: "Foods",
    jamBuka: "16:00 - 23:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user28",
        namaPengguna: "Agung Prasetya",
        fotoPengguna: "/avatar/agung_p.jpg",
        pesan: "Sate kambing terenak! Dagingnya empuk dan bumbunya meresap. Wajib coba kalau ke Yogya!",
        rating: 5,
        tanggal: "2025-04-11",
        balasan: []
      }
    ]
  },
  {
    id: 28,
    nama: "House of Raminten",
    deskripsi: "Restoran unik yang menyajikan makanan tradisional Jawa dengan presentasi teatrikal.",
    gambar: "/house_of_raminten.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.783333,
      longitude: 110.366667,
      alamat: "Jl. FM Noto No.7, Kotabaru, Gondokusuman, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 75000,
      penginapan: 300000
    },
    waktuTerbaikUntukMengunjungi: "Sore hingga malam hari",
    kategori: "Foods",
    jamBuka: "11:00 - 23:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user29",
        namaPengguna: "Lilis Setyowati",
        fotoPengguna: "/avatar/lilis.jpg",
        pesan: "Pengalaman makan yang unik dengan nuansa Jawa yang kental. Pelayannya berpakaian lurik!",
        rating: 4.5,
        tanggal: "2025-04-13",
        balasan: []
      }
    ]
  },
  {
    id: 29,
    nama: "Mangut Lele Mbah Marto",
    deskripsi: "Permata tersembunyi yang menawarkan gulai lele asap pedas yang dimasak dengan teknik tradisional.",
    gambar: "/mangut_lele.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.850000,
      longitude: 110.350000,
      alamat: "Jl. Parangtritis KM 4.5, Sewon, Bantul, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 30000,
      penginapan: 150000
    },
    waktuTerbaikUntukMengunjungi: "Siang hingga sore hari",
    kategori: "Foods",
    jamBuka: "11:00 - 20:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user30",
        namaPengguna: "Joko Widodo",
        fotoPengguna: "/avatar/joko_w.jpg",
        pesan: "Mangut lele paling enak! Pedasnya pas dan ikan lelenya segar. Tempat sederhana tapi rasa juara.",
        rating: 4.5,
        tanggal: "2025-04-09",
        balasan: []
      }
    ]
  },
  {
    id: 30,
    nama: "Angkringan Lik Man",
    deskripsi: "Angkringan legendaris yang terkenal dengan kopi joss dan jajanan tradisional.",
    gambar: "/angkringan_lik_man.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.792500,
      longitude: 110.368333,
      alamat: "Jl. Sosrowijayan GT I, Sosromenduran, Gedong Tengen, Kota Yogyakarta, DIY"
    },
    biaya: {
      masuk: 0,
      makanan: 15000,
      penginapan: 150000
    },
    waktuTerbaikUntukMengunjungi: "Malam hari (mulai jam 6 sore)",
    kategori: "Foods",
    jamBuka: "18:00 - 02:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user31",
        namaPengguna: "Surya Atmaja",
        fotoPengguna: "/avatar/surya.jpg",
        pesan: "Kopi joss-nya mantap! Suasana angkringan yang autentik dengan harga yang sangat terjangkau.",
        rating: 4,
        tanggal: "2025-04-17",
        balasan: []
      }
    ]
  }
];