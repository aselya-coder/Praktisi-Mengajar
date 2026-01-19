# 🎯 Cara Menggunakan Admin Panel - Panduan Singkat

## ⚡ Quick Start (3 Langkah)

### 1️⃣ Jalankan Backend (Database)
Buka **Terminal Baru** di VS Code dan jalankan:
```bash
npm run server
```
✅ Server database akan berjalan di `http://localhost:3001`

### 2️⃣ Jalankan Website (sudah berjalan)
Website Anda sudah berjalan di terminal yang ada.
Jika belum, jalankan:
```bash
npm run dev
```
✅ Website akan berjalan di `http://localhost:8080`

### 3️⃣ Login ke Admin Panel
1. Buka browser: `http://localhost:8080/admin/login`
2. Login dengan:
   - **Email**: `admin@praktisimengajar.id`
   - **Password**: `admin123`
3. Klik tombol **"Masuk"**

## 📱 Navigasi Admin Panel

Setelah login, Anda akan masuk ke **Dashboard**. Gunakan menu sidebar di kiri untuk mengakses:

### 🏠 Dashboard
- Melihat ringkasan semua konten
- Quick actions untuk edit cepat

### 🖼️ Hero Section
Mengelola banner utama:
- Edit judul, subtitle, deskripsi
- Ubah teks tombol dan link
- Update benefits (3 poin)
- Edit statistik

### 💼 Services
Mengelola layanan:
- ➕ **Tambah Service**: Klik "Tambah Service"
- ✏️ **Edit**: Klik icon pensil
- 🗑️ **Hapus**: Klik icon tempat sampah
- Atur urutan tampilan

### 🔄 Process Steps
Mengelola langkah proses:
- ➕ **Tambah Langkah**: Klik "Tambah Langkah"
- ✏️ **Edit**: Klik icon pensil
- 🗑️ **Hapus**: Klik icon tempat sampah
- Pilih icon dari dropdown

### 💬 Testimonials
Mengelola testimoni:
- ➕ **Tambah Testimonial**: Klik "Tambah Testimonial"
- ✏️ **Edit**: Klik icon pensil
- 🗑️ **Hapus**: Klik icon tempat sampah
- Set rating 1-5 bintang

### ℹ️ About
Mengelola halaman tentang:
- Edit deskripsi perusahaan
- Update "Mengapa Memilih Kami" (6 poin)

### 📞 CTA & Contact
Mengelola call-to-action:
- Edit konten CTA
- Update informasi kontak

### 🔝 Header & Nav
Mengelola header:
- Edit logo
- Tambah/edit/hapus menu navigasi
- Atur urutan menu

### 🔚 Footer
Mengelola footer:
- Edit informasi kontak
- Update link media sosial

## ✅ Tips Penggunaan

### Menyimpan Perubahan
- Klik tombol **"Simpan Perubahan"** atau **"Simpan"**
- Notifikasi hijau akan muncul jika berhasil
- Notifikasi merah akan muncul jika gagal

### Menghapus Data
- Klik icon 🗑️ (tempat sampah)
- Konfirmasi dengan klik "OK"
- Data akan langsung terhapus

### Melihat Website
- Klik tombol **"Lihat Website"** di Dashboard
- Website akan terbuka di tab baru
- Semua perubahan langsung terlihat!

## 🔄 Update Data Website

Semua perubahan yang Anda buat di admin panel **LANGSUNG TERSIMPAN** dan **LANGSUNG TERLIHAT** di website!

Tidak perlu:
- ❌ Refresh halaman
- ❌ Edit kode
- ❌ Publish manual

Cukup:
- ✅ Edit di admin panel
- ✅ Klik simpan
- ✅ Selesai!

## 🚨 Troubleshooting

### Tidak bisa login?
- Pastikan JSON Server berjalan (`npm run server`)
- Cek kredensial: `admin@praktisimengajar.id` / `admin123`

### Data tidak tersimpan?
- Pastikan kedua terminal berjalan:
  - Terminal 1: `npm run server` (port 3001)
  - Terminal 2: `npm run dev` (port 8080)

### Error "Network response was not ok"
- Restart JSON Server: Stop (`Ctrl+C`) lalu jalankan lagi `npm run server`

### Halaman admin tidak muncul?
- Clear browser cache
- Hard refresh: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)

## 📊 Struktur Data (db.json)

Semua data disimpan di file `db.json` di root folder project.
Anda bisa backup file ini untuk save data Anda.

## 🎨 Kustomisasi Admin Panel

Anda bisa ubah:
- Kredensial login di `db.json` → `users`
- Port server di `package.json` → `scripts.server`
- Warna dan styling di file admin components

## 💡 Next Steps

1. **Test semua fitur** - Coba tambah, edit, hapus di setiap section
2. **Backup db.json** - Copy file ini ke tempat aman
3. **Ubah password** - Edit di `db.json` → `users` → `password`
4. **Custom konten** - Sesuaikan semua teks dengan kebutuhan Anda

## 🎉 Selamat!

Admin panel Anda sudah siap digunakan! Anda sekarang bisa mengelola seluruh konten website tanpa perlu coding.

---

**Butuh bantuan?** Lihat `ADMIN_PANEL_README.md` untuk dokumentasi lengkap.
