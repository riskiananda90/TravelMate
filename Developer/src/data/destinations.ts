import { TujuanWisata } from '@/types';

// Data destinasi wisata di Yogyakarta
export const destinasiWisata: TujuanWisata[] = [
  {
    id: 1,
    nama: "Candi Borobudur",
    deskripsi: "Candi Buddha terbesar di dunia, dibangun pada abad ke-8 dan ke-9, dan terdiri dari tiga tingkat.",
    gambar: "/borobudur.jpg",
    rating: 4.8,
    lokasi: {
      latitude: -7.607874,
      longitude: 110.203751,
      alamat: "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah"
    },
    biaya: {
      masuk: 50000, // dalam IDR
      makanan: 75000, // biaya makanan rata-rata per orang
      penginapan: 350000 // rata-rata per malam
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (sebelum jam 9) atau sore hari (setelah jam 3)",
    kategori: "Candi Sejarah",
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
      },
      {
        id: 2,
        penggunaId: "user2",
        namaPengguna: "Siti Rahayu",
        fotoPengguna: "/avatar/siti.jpg",
        pesan: "Candi ini luar biasa, tapi jangan lupa bawa payung atau topi karena bisa sangat panas saat siang hari.",
        rating: 4.5,
        tanggal: "2025-04-15",
        balasan: []
      }
    ]
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    deskripsi: "Kompleks candi Hindu terbesar di Indonesia dan salah satu yang terbesar di Asia Tenggara.",
    gambar: "/prambanan.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -7.752020,
      longitude: 110.491417,
      alamat: "Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta"
    },
    biaya: {
      masuk: 50000,
      makanan: 60000,
      penginapan: 300000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari menjelang sunset",
    kategori: "Candi Sejarah",
    jamBuka: "06:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user3",
        namaPengguna: "Ahmad Wijaya",
        fotoPengguna: "/avatar/ahmad.jpg",
        pesan: "Candi Prambanan sangat megah! Pertunjukan Ramayana Ballet-nya wajib ditonton jika berkunjung ke sini.",
        rating: 5,
        tanggal: "2025-04-18",
        balasan: []
      }
    ]
  },
  {
    id: 3,
    nama: "Jalan Malioboro",
    deskripsi: "Jalan belanja terkenal dan atraksi wisata utama di Yogyakarta, dikenal dengan makanan jalanan dan belanjanya.",
    gambar: "/malioboro.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.792908,
      longitude: 110.365701,
      alamat: "Jl. Malioboro, Sosromenduran, Gedong Tengen, Kota Yogyakarta, Daerah Istimewa Yogyakarta"
    },
    biaya: {
      masuk: 0, // gratis
      makanan: 50000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Sore hingga malam hari",
    kategori: "Belanja & Kuliner",
    jamBuka: "24 jam (toko-toko: 09:00 - 21:00)",
    komentar: [
      {
        id: 1,
        penggunaId: "user4",
        namaPengguna: "Dewi Lestari",
        fotoPengguna: "/avatar/dewi.jpg",
        pesan: "Tempat yang sempurna untuk berburu oleh-oleh dan jajanan khas Yogya. Gudeg Yu Djum adalah makanan yang wajib dicoba!",
        rating: 4,
        tanggal: "2025-04-10",
        balasan: []
      }
    ]
  },
  {
    id: 4,
    nama: "Taman Sari",
    deskripsi: "Bekas taman kerajaan Kesultanan Yogyakarta, dengan kolam pemandian dan terowongan bawah tanah.",
    gambar: "/tamansari.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.810040,
      longitude: 110.359400,
      alamat: "Jl. Tamanan, Patehan, Kecamatan Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta"
    },
    biaya: {
      masuk: 15000,
      makanan: 45000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi atau sore hari",
    kategori: "Sejarah",
    jamBuka: "09:00 - 15:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user5",
        namaPengguna: "Putri Handayani",
        fotoPengguna: "/avatar/putri.jpg",
        pesan: "Arsitektur dan sejarahnya sangat menarik. Jangan lupa untuk menyewa pemandu lokal agar mendapatkan cerita lengkap tentang tempat ini.",
        rating: 4.5,
        tanggal: "2025-03-25",
        balasan: []
      }
    ]
  },
  {
    id: 5,
    nama: "Pantai Parangtritis",
    deskripsi: "Pantai terkenal di pantai selatan Jawa, dikenal dengan pasir hitamnya dan makna mitologisnya.",
    gambar: "/parangtritis.jpg",
    rating: 4.3,
    lokasi: {
      latitude: -8.025990,
      longitude: 110.332150,
      alamat: "Parangtritis, Kretek, Bantul Regency, Special Region of Yogyakarta"
    },
    biaya: {
      masuk: 10000,
      makanan: 40000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Sore hari untuk melihat sunset",
    kategori: "Pantai",
    jamBuka: "24 jam",
    komentar: [
      {
        id: 1,
        penggunaId: "user6",
        namaPengguna: "Eko Prasetyo",
        fotoPengguna: "/avatar/eko.jpg",
        pesan: "Sunsetnya luar biasa! Bisa naik ATV atau andong di pantai ini. Tapi hati-hati dengan ombaknya yang cukup besar.",
        rating: 4,
        tanggal: "2025-04-05",
        balasan: []
      }
    ]
  },
  {
    id: 6,
    nama: "Goa Pindul",
    deskripsi: "Gua alami dengan sungai bawah tanah yang menawarkan petualangan cave tubing.",
    gambar: "/goapindul.jpg",
    rating: 4.5,
    lokasi: {
      latitude: -7.953168,
      longitude: 110.454488,
      alamat: "Gelaran II, Bejiharjo, Karangmojo, Gunungkidul Regency, Special Region of Yogyakarta"
    },
    biaya: {
      masuk: 90000, // termasuk aktivitas tubing
      makanan: 35000,
      penginapan: 200000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga siang hari",
    kategori: "Petualangan",
    jamBuka: "08:00 - 16:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user7",
        namaPengguna: "Rini Wulandari",
        fotoPengguna: "/avatar/rini.jpg",
        pesan: "Pengalaman cave tubing yang menyenangkan! Air sungainya jernih dan sejuk. Pemandunya juga ramah dan profesional.",
        rating: 5,
        tanggal: "2025-03-30",
        balasan: []
      }
    ]
  },
  {
    id: 7,
    nama: "Gunung Merapi",
    deskripsi: "Salah satu gunung berapi paling aktif di Indonesia, menawarkan pendakian dan tur jeep.",
    gambar: "/merapi.jpg",
    rating: 4.6,
    lokasi: {
      latitude: -7.541617,
      longitude: 110.442711,
      alamat: "Sleman Regency, Special Region of Yogyakarta"
    },
    biaya: {
      masuk: 20000,
      makanan: 45000,
      penginapan: 275000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari untuk melihat sunrise",
    kategori: "Petualangan",
    jamBuka: "24 jam (tur jeep biasanya mulai pukul 05:00)",
    komentar: [
      {
        id: 1,
        penggunaId: "user8",
        namaPengguna: "Joko Susilo",
        fotoPengguna: "/avatar/joko.jpg",
        pesan: "Tur jeep Merapi sangat seru! Pemandangan sangat menakjubkan, dan bisa melihat sisa-sisa letusan gunung berapi.",
        rating: 5,
        tanggal: "2025-04-12",
        balasan: []
      }
    ]
  },
  {
    id: 8,
    nama: "Keraton Yogyakarta",
    deskripsi: "Istana Sultan Yogyakarta, menampilkan budaya dan arsitektur Jawa.",
    gambar: "/keraton.jpg",
    rating: 4.4,
    lokasi: {
      latitude: -7.805571,
      longitude: 110.363968,
      alamat: "Jl. Rotowijayan Blok No. 1, Panembahan, Kecamatan Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta"
    },
    biaya: {
      masuk: 15000,
      makanan: 40000,
      penginapan: 280000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (jangan datang Senin karena tutup)",
    kategori: "Sejarah & Budaya",
    jamBuka: "08:30 - 14:00 (tutup hari Senin)",
    komentar: [
      {
        id: 1,
        penggunaId: "user9",
        namaPengguna: "Sri Wahyuni",
        fotoPengguna: "/avatar/sri.jpg",
        pesan: "Tempat yang penuh sejarah dan budaya Jawa. Ada pertunjukan gamelan dan tari tradisional yang bagus.",
        rating: 4,
        tanggal: "2025-03-20",
        balasan: []
      }
    ]
  },
  {
    id: 9,
    nama: "Pantai Timang",
    deskripsi: "Dikenal dengan sistem seperti gondola untuk menyeberang ke formasi batu kecil lepas pantai.",
    gambar: "/timang.jpg",
    rating: 4.7,
    lokasi: {
      latitude: -8.152754,
      longitude: 110.681983,
      alamat: "Timang, Purwodadi, Tepus, Gunungkidul Regency, Special Region of Yogyakarta"
    },
    biaya: {
      masuk: 10000,
      makanan: 50000,
      penginapan: 230000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hingga siang hari",
    kategori: "Pantai & Petualangan",
    jamBuka: "07:00 - 17:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user10",
        namaPengguna: "Agus Purnomo",
        fotoPengguna: "/avatar/agus.jpg",
        pesan: "Pengalaman naik gondola tradisional sangat mendebarkan! Pemandangan pantainya juga indah dengan tebing-tebing karang yang menakjubkan.",
        rating: 5,
        tanggal: "2025-04-02",
        balasan: []
      }
    ]
  },
  {
    id: 10,
    nama: "Goa Jomblang",
    deskripsi: "Gua vertikal dengan lubang yang menawarkan pengalaman 'cahaya dari surga' yang unik.",
    gambar: "/jomblang.jpg",
    rating: 4.8,
    lokasi: {
      latitude: -8.029802,
      longitude: 110.640402,
      alamat: "Jetis Wetan, Pacarejo, Semanu, Gunungkidul Regency, Special Region of Yogyakarta"
    },
    biaya: {
      masuk: 450000, // termasuk tur dengan pemandu dan peralatan
      makanan: 50000,
      penginapan: 250000
    },
    waktuTerbaikUntukMengunjungi: "Pagi hari (sekitar jam 10 untuk melihat cahaya surga)",
    kategori: "Petualangan",
    jamBuka: "08:00 - 14:00",
    komentar: [
      {
        id: 1,
        penggunaId: "user11",
        namaPengguna: "Nina Suryani",
        fotoPengguna: "/avatar/nina.jpg",
        pesan: "Pengalaman yang sangat unik! Cahaya surga yang masuk ke dalam gua sangat indah. Tapi persiapkan fisik karena perlu turun dengan tali.",
        rating: 5,
        tanggal: "2025-03-15",
        balasan: []
      }
    ]
  }
];
