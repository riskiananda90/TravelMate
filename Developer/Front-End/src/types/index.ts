

export interface TujuanWisata {
  id: string | number;
  nama: string;
  deskripsi: string;
  gambar: string;
  lokasi: {
    latitude: number;
    longitude: number;
    alamat: string;
  };
  biaya: {
    masuk: number;
    makanan: number;
    penginapan: number;
  };
  rating: number;
  totalBiaya?: number;
  jarak?: number;
  biayaPerjalanan?: number;
  
  waktuTerbaikUntukMengunjungi?: string;
  kategori?: string;
  jamBuka?: string;
  komentar?: Komentar[];
}

export interface Komentar {
  id: number;
  penggunaId: string;
  namaPengguna: string;
  fotoPengguna?: string;
  pesan: string;
  rating: number;
  tanggal: string;
  balasan?: Komentar[];
}

export interface LokasiPengguna {
  latitude: number;
  longitude: number;
  alamat?: string;
  loaded: boolean;
  error?: string;
}

export interface FilterAnggaran {
  min: number;
  max: number;
}

export interface FilterJarak {
  jarakMaksimum: number; // dalam kilometer
}

// Alias untuk kompatibilitas
export type TouristDestination = TujuanWisata;
export type UserLocation = LokasiPengguna;

