# TravelMate

Berikut adalah contoh file **README.md** dalam bahasa Indonesia yang bisa Anda gunakan untuk proyek **TravelMate**. File ini akan memberikan panduan lengkap untuk tim Anda agar dapat meng-clone dan mengatur proyek dengan mudah.

### Contoh **README.md** dalam Bahasa Indonesia

````markdown
# Capstone Project DBS

Ini adalah proyek full-stack yang melibatkan **frontend** yang dikembangkan dengan **React**, **backend** yang diimplementasikan dengan **Node.js**, dan beberapa fungsionalitas **machine learning**.

## Daftar Isi

- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Kontributor](#kontributor)

## Instalasi

Untuk mengatur proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut:

### 1. Clone Repositori

Clone repositori ke mesin lokal menggunakan perintah berikut:

```bash
git clone https://github.com/your-username/Capstone-Project-DBS.git
```
````

### 2. Masuk ke Direktori Proyek

Setelah repositori ter-clone, masuk ke direktori **Front-End** dan **Back-End** untuk setup terpisah.

### 3. Setup Frontend (React)

1. Masuk ke direktori **Front-End**:

   ```bash
   cd Front-End
   ```

2. Install dependensi yang diperlukan:

   ```bash
   npm install
   ```

3. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

   Frontend akan berjalan di `http://localhost:5173`.

### 4. Setup Backend (Node.js)

1. Masuk ke direktori **Back-End**:

   ```bash
   cd Back-End
   ```

2. Install dependensi yang diperlukan:

   ```bash
   npm install
   ```

3. Jalankan server backend:

   ```bash
   node server.js
   ```

   Backend akan berjalan di `http://localhost:5000`.

### 5. Setup Machine Learning

1. Masuk ke direktori **Machine-Learning**.

2. Pastikan Anda memiliki semua dependensi yang diperlukan untuk menjalankan skrip machine learning. Jika menggunakan **Jupyter Notebooks**, pastikan Anda sudah menginstal **Jupyter Notebook** dan gunakan notebook `Contoh.ipynb` untuk eksperimen ML.

## Penggunaan

- **Frontend**: Frontend menyediakan antarmuka pengguna di mana pengguna dapat berinteraksi dengan aplikasi. Ini berkomunikasi dengan API backend untuk mengambil data.
- **Backend**: Backend menangani permintaan API, memproses data, dan berkomunikasi dengan model machine learning.
- **Machine Learning**: Skrip ML di direktori `Machine-Learning` menangani pemrosesan data dan prediksi.

## Struktur Proyek

Berikut adalah gambaran umum dari struktur proyek:

```
Capstone-Project-DBS/
├── Front-End/                   # Aplikasi React Frontend
│   ├── node_modules/            # Dependensi
│   ├── public/                  # File publik
│   ├── src/                     # Kode sumber untuk React
│   ├── package.json             # Dependensi frontend
│   ├── vite.config.ts           # Konfigurasi Vite
│   └── README.md                # Dokumentasi frontend
├── Back-End/                    # Aplikasi Node.js Backend
│   ├── server.js                # File server backend
│   ├── package.json             # Dependensi backend
├── Machine-Learning/            # File Machine Learning
│   ├── Datasets/                # File dataset
│   ├── Hasil/                   # Hasil model ML
│   ├── Model/                   # Model-model ML
│   └── Notebook/                # Jupyter Notebooks
└── README.md                    # Dokumentasi proyek
```

## Teknologi yang Digunakan

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Machine Learning**: Python, Jupyter Notebook, Scikit-learn, Pandas

## Kontributor

- <img src="https://avatars.githubusercontent.com/u/112327133?v=4" width="30" height="30" style="border-radius: 50%;"> **Muhammad Rizki** - Machine Learning
- <img src="https://avatars.githubusercontent.com/u/181300290?v=4" width="30" height="30" style="border-radius: 50%;"> **Najwa Mutiah yasmine** - Front-End & Back-End
- <img src="https://avatars.githubusercontent.com/u/112511554?v=4" width="30" height="30" style="border-radius: 50%;"> **Sri Mutia** - Machine Learning
- <img src="https://avatars.githubusercontent.com/u/112487598?v=4" width="30" height="30" style="border-radius: 50%;"> **Teuku Aldie Aulia** - Front-End & Back-End
- <img src="https://avatars.githubusercontent.com/u/112398559?s=400&u=f567b90da41ebf745f341badb5aa8a24568d5f90&v=4" width="30" height="30" style="border-radius: 50%;"> **Riski Ananda** - Machine Learning

### Penjelasan:

- **Instalasi**: Memberikan instruksi untuk meng-clone repositori dan mengatur frontend serta backend.
- **Penggunaan**: Menjelaskan cara frontend, backend, dan machine learning berfungsi.
- **Struktur Proyek**: Menjelaskan struktur direktori agar anggota tim mudah memahami organisasi proyek.
- **Teknologi yang Digunakan**: Menyebutkan teknologi yang digunakan di frontend, backend, dan bagian machine learning.
- **Kontributor**: Bagian ini memungkinkan Anda menambahkan nama-nama anggota tim Anda.

Berikut adalah **langkah-langkah untuk melakukan perubahan dan kemudian push ke GitHub** setelah Anda membuat perubahan dalam proyek:

### Langkah-langkah untuk Melakukan Perubahan dan Push ke GitHub:

1. **Lakukan Perubahan di Proyek Anda**

   - Edit atau tambahkan file sesuai dengan perubahan yang diinginkan di proyek Anda. Misalnya, Anda bisa mengedit file kode atau menambah file baru.

2. **Periksa Status Perubahan**

   - Setelah melakukan perubahan, gunakan perintah `git status` untuk memeriksa file mana yang telah diubah atau ditambahkan.

   ```bash
   git status
   ```

3. **Tambahkan Perubahan ke Staging Area**

   - Setelah memeriksa file yang berubah, tambahkan file-file tersebut ke staging area menggunakan perintah `git add`. Anda dapat menambahkan file secara spesifik atau semua file yang berubah sekaligus:
     - Menambahkan file tertentu:
       ```bash
       git add <nama_file>
       ```
     - Menambahkan semua file yang berubah:
       ```bash
       git add .
       ```

4. **Commit Perubahan**

   - Setelah menambahkan file ke staging area, buat commit untuk menyimpan perubahan tersebut dengan pesan yang menjelaskan apa yang telah diubah.

   ```bash
   git commit -m "Deskripsi perubahan yang dilakukan"
   ```

   Gantilah `"Deskripsi perubahan yang dilakukan"` dengan pesan yang sesuai, seperti "Menambahkan fitur X" atau "Memperbaiki bug Y".

5. **Push Perubahan ke GitHub**

   - Setelah commit selesai, kirim perubahan ke repositori GitHub dengan perintah `git push`. Pastikan Anda berada di branch yang sesuai (misalnya, `main` atau `master`).

   ```bash
   git push origin main  # jika menggunakan branch main
   ```

   atau

   ```bash
   git push origin master  # jika menggunakan branch master
   ```

6. **Verifikasi di GitHub**
   - Buka repositori Anda di GitHub untuk memastikan bahwa perubahan telah berhasil di-push dan tampil dengan benar.
