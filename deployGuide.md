# 🚀 Panduan Deploy: CyberShield Mission (Gen-Z Cyber Guardian)

Panduan ini berisi langkah-langkah lengkap untuk:
1. Mengunggah source code ke **GitHub** (hanya file produksi/esensial saja yang di-upload).
2. Melakukan deployment ke platform hosting (**Render** atau **Vercel**).

---

## 📋 Bagian 1: Persiapan File & .gitignore

File `.gitignore` sudah dibuat secara otomatis di root proyek untuk memastikan file-file yang **tidak diperlukan** tidak ikut terunggah ke GitHub, antara lain:
- ❌ `node_modules/` (library dependensi berukuran besar)
- ❌ `dist/` (hasil build lokal yang akan di-build ulang otomatis di cloud)
- ❌ File log (`*.log`)
- ❌ File catatan sementara (`backend.md`, `modification.md`, dll.)

### Daftar File Bersih yang Akan Masuk ke GitHub:
```
├── .dockerignore
├── .gitignore
├── Dockerfile
├── api/
│   ├── db.js
│   └── index.js
├── data/
│   └── cyber_guardian_db.json
├── public/
│   └── email_icon.png
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── run.bat
├── server.js
├── vercel.json
├── vite.config.js
└── deployGuide.md
```

---

## 🐙 Bagian 2: Langkah Mengunggah Proyek ke GitHub

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [https://github.com](https://github.com) dan login ke akun Anda.
2. Klik tombol **"+"** di pojok kanan atas, lalu pilih **New repository**.
3. Beri nama repositori, misalnya: `cybershield-mission` atau `cyber-guardian`.
4. Pilih **Public** (atau **Private** sesuai preferensi Anda).
5. **JANGAN centang** *"Add a README file"*, *"Add .gitignore"*, atau *"Choose a license"* (karena proyek lokal kita sudah memilikinya).
6. Klik tombol **Create repository**.
7. Salin URL repositori Anda, contohnya:
   ```
   https://github.com/username-anda/cybershield-mission.git
   ```

---

### Langkah 2: Jalankan Perintah Git di Terminal (PowerShell / CMD)
Buka terminal di folder proyek (`Detective`) dan jalankan perintah berikut secara berurutan:

```powershell
# 1. Pastikan berada di folder proyek
cd "c:\Kuliah\Semestar 5\Pendidikan Berkarakter\Detective"

# 2. Tambahkan semua file yang diizinkan (sesuai .gitignore)
git add .

# 3. Lakukan Commit pertama
git commit -m "feat: inisialisasi CyberShield Mission Gen-Z Cyber Guardian"

# 4. Ubah nama branch utama menjadi main
git branch -M main

# 5. Hubungkan repositori lokal ke GitHub Anda (ganti URL dengan URL repo Anda)
git remote add origin https://github.com/username-anda/cybershield-mission.git

# 6. Unggah kode ke GitHub
git push -u origin main
```

> **Catatan Autentikasi:** Jika diminta login, gunakan **Personal Access Token (PAT)** GitHub atau masuk via akun GitHub Browser Anda.

---

## 🌐 Bagian 3: Pilihan Deployment

Aplikasi ini menggunakan **React (Frontend)** dan **Express.js (Backend API + Database JSON)**. Anda dapat memilih salah satu dari dua platform gratis berikut:

---

### Opsi A: Deploy ke Render (SANGAT DIREKOMENDASIKAN ⭐⭐⭐⭐⭐)
Render sangat cocok untuk aplikasi Fullstack Node.js + Express karena menjalankan server persisten dan mendukung penyimpanan file database JSON secara langsung.

1. Buka [https://render.com](https://render.com) dan daftar/login menggunakan akun **GitHub** Anda.
2. Di Dashboard Render, klik tombol **"New +"** lalu pilih **"Web Service"**.
3. Pilih opsi **"Build and deploy from a Git repository"** lalu klik **Next**.
4. Hubungkan repositori GitHub Anda (`cybershield-mission`), lalu klik **Connect**.
5. Isi konfigurasi deployment sebagai berikut:
   - **Name**: `cybershield-guardian` (bebas sesuai keinginan)
   - **Region**: Singapore / Oregon (pilih yang terdekat, misal Singapore)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Instance Type**: `Free`
6. Gulir ke bawah dan klik tombol **"Create Web Service"**.
7. Tunggu beberapa menit hingga proses build selesai. Setelah muncul status **"Live"**, Anda akan mendapatkan URL publik (misal: `https://cybershield-guardian.onrender.com`).

---

### Opsi B: Deploy ke Vercel
File konfigurasi `vercel.json` sudah tersedia di dalam proyek sehingga siap dideploy ke Vercel.

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun **GitHub**.
2. Klik tombol **"Add New..."** -> **"Project"**.
3. Pilih repositori GitHub Anda (`cybershield-mission`), lalu klik **Import**.
4. Pada bagian **Configure Project**:
   - **Framework Preset**: Pilih `Vite` (atau Other).
   - **Root Directory**: `./` (biarkan default).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**.
6. Vercel akan otomatis membaca file `vercel.json` dan memublikasikan frontend beserta API serverless `/api/*`.

---

## 🔄 Pembaruan di Masa Depan (Update Code)
Jika di kemudian hari Anda melakukan perubahan kode di lokal dan ingin memperbarui aplikasi live di Vercel:

```powershell
git add .
git commit -m "feat: tambah mode pengajar hapus data leaderboard"
git push
```
Vercel akan otomatis mendeteksi push baru dan melakukan deploy ulang dalam waktu sekitar 1 menit (*Auto-deploy*).

---

## 📊 Bagian 4: Cara Memantau & Menghapus Data Leaderboard

Karena di Vercel kita tidak memiliki akses langsung ke server/folder file, sistem telah dilengkapi dengan **Mode Pengajar (Admin Mode)** langsung dari antarmuka web:

### 1. Cara Memantau Peringkat Siswa
- Buka website yang telah dideploy di Vercel.
- Klik tombol **Leaderboard** (ikon piala 🏆) di pojok kanan atas navbar atau di halaman utama.
- Anda dapat melihat peringkat nilai, sisa waktu, sekolah, dan lencana karakter setiap siswa secara langsung dan realtime.
- Anda juga dapat melihat raw data JSON lewat browser di: `https://domain-vercel-anda.vercel.app/api/leaderboard`.

### 2. Cara Menghapus Data Siswa (Nama Iseng / Duplikat)
1. Buka modal **Leaderboard**.
2. Di pojok kanan bawah modal (di sebelah tombol *Refresh*), klik tombol gembok bertuliskan **"🔒 Guru"**.
3. Masukkan **PIN Pengajar**:
   - PIN Default: `guru2026`
4. Setelah masuk, banner merah bertuliskan **"Mode Guru Aktif"** akan muncul:
   - **Hapus Satu Siswa**: Klik ikon tempat sampah merah (**🗑️**) di baris nama siswa yang ingin dihapus.
   - **Reset Semua Data**: Klik tombol **"Reset Semua"** jika ingin mengosongkan seluruh papan peringkat untuk memulai kelas/sesi ujian baru.
   - Klik **"Keluar"** untuk kembali ke tampilan siswa biasa.


