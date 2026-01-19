# Admin Panel - Praktisi Mengajar

Admin panel lengkap untuk mengelola seluruh konten website Praktisi Mengajar secara dinamis.

## 🚀 Fitur Admin Panel

### ✅ Fitur yang Sudah Tersedia

1. **Autentikasi & Keamanan**
   - Login dengan email dan password
   - Protected routes untuk halaman admin
   - Session management menggunakan Zustand

2. **Dashboard**
   - Overview statistik konten
   - Quick actions untuk akses cepat
   - Monitoring jumlah data

3. **Manajemen Konten (CRUD Lengkap)**
   - ✅ Hero Section - Banner utama website
   - ✅ Services - Layanan yang ditawarkan
   - ✅ Process Steps - Langkah-langkah proses
   - ✅ Testimonials - Testimoni klien
   - ✅ About - Tentang perusahaan
   - ✅ CTA & Contact - Call to action dan kontak
   - ✅ Header & Navigation - Menu navigasi
   - ✅ Footer - Footer website

4. **User Experience**
   - Toast notifications untuk feedback
   - Loading states
   - Konfirmasi sebelum delete
   - Form validation
   - Responsive design

## 📋 Cara Menjalankan Admin Panel

### 1. Install Dependencies (Jika belum)
```bash
npm install
```

### 2. Jalankan JSON Server (Database)
Buka terminal pertama dan jalankan:
```bash
npm run server
```
Server akan berjalan di `http://localhost:3001`

### 3. Jalankan Development Server
Buka terminal kedua dan jalankan:
```bash
npm run dev
```
Website akan berjalan di `http://localhost:8080`

### 4. Akses Admin Panel
- URL Login: `http://localhost:8080/admin/login`
- Email: `admin@praktisimengajar.id`
- Password: `admin123`

## 🗂️ Struktur File Admin Panel

```
src/
├── components/
│   └── admin/
│       ├── AdminLayout.tsx      # Layout utama admin
│       └── ProtectedRoute.tsx   # Route protection
├── pages/
│   └── admin/
│       ├── Login.tsx                    # Halaman login
│       ├── Dashboard.tsx                # Dashboard utama
│       ├── HeroManagement.tsx           # Kelola Hero
│       ├── ServicesManagement.tsx       # Kelola Services
│       ├── ProcessManagement.tsx        # Kelola Process
│       ├── TestimonialsManagement.tsx   # Kelola Testimonials
│       ├── AboutManagement.tsx          # Kelola About
│       ├── CTAManagement.tsx            # Kelola CTA
│       ├── HeaderManagement.tsx         # Kelola Header
│       └── FooterManagement.tsx         # Kelola Footer
├── lib/
│   ├── api.ts          # API functions
│   └── auth-store.ts   # Zustand store untuk auth
└── db.json             # Database JSON Server
```

## 📝 Panduan Penggunaan

### Hero Section
Kelola banner utama website:
- Badge text
- Judul dan subtitle
- Deskripsi
- Tombol CTA (utama dan sekunder)
- Benefits (3 poin)
- Statistik (4 angka)

### Services
Kelola layanan yang ditawarkan:
- Tambah/Edit/Hapus service
- Icon selection
- Deskripsi layanan
- Features (3 poin per service)
- Urutan tampilan

### Process Steps
Kelola langkah-langkah proses:
- Tambah/Edit/Hapus langkah
- Nomor urut
- Icon selection
- Judul dan deskripsi
- Urutan tampilan

### Testimonials
Kelola testimoni klien:
- Tambah/Edit/Hapus testimonial
- Kutipan testimonial
- Nama dan jabatan
- Institusi
- Rating (1-5 bintang)

### About Section
Kelola halaman tentang:
- Badge dan judul
- 2 paragraf deskripsi
- 6 poin "Mengapa Memilih Kami"

### CTA & Contact
Kelola section CTA:
- Badge, judul, deskripsi
- Tombol CTA
- Informasi kontak (telepon, email, lokasi)

### Header & Navigation
Kelola header website:
- Logo text
- Menu navigasi (tambah/edit/hapus)
- Urutan menu
- Status aktif/nonaktif

### Footer
Kelola footer website:
- Deskripsi perusahaan
- Informasi kontak
- Copyright text
- Link media sosial (Facebook, Instagram, LinkedIn)

## 🔒 Keamanan

- Protected routes menggunakan React Router
- Authentication state management dengan Zustand + localStorage
- Session persistence

## 💾 Database

Menggunakan JSON Server untuk backend sederhana:
- File: `db.json`
- Port: `3001`
- REST API endpoints tersedia untuk semua entities

## 🎨 Teknologi yang Digunakan

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Backend/Database**: JSON Server
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React

## 📱 Responsive Design

Admin panel sepenuhnya responsive:
- Mobile-friendly sidebar
- Responsive tables
- Adaptive forms
- Touch-friendly buttons

## 🔄 Cara Kerja Data Flow

1. User login → Authentication → Protected Routes
2. User mengakses halaman management
3. Data di-fetch dari JSON Server menggunakan React Query
4. User melakukan perubahan (Create/Update/Delete)
5. Mutation dikirim ke JSON Server
6. React Query invalidate cache & refetch data
7. Toast notification muncul
8. Perubahan langsung terlihat di website

## 🚀 Deployment

### Development
```bash
npm run dev      # Frontend di port 8080
npm run server   # Backend di port 3001
```

### Production
Untuk production, ganti JSON Server dengan backend real (Express, NestJS, dll.) atau gunakan database seperti:
- PostgreSQL
- MySQL
- MongoDB
- Supabase
- Firebase

## 📞 Troubleshooting

### Port sudah digunakan
Jika port 3001 atau 8080 sudah digunakan:
- JSON Server: Edit `package.json` script `server` dengan port berbeda
- Vite: Edit `vite.config.ts` dengan port berbeda
- Update `API_BASE` di `src/lib/api.ts`

### Data tidak tersimpan
Pastikan JSON Server berjalan di terminal terpisah

### Tidak bisa login
Cek kredensial di `db.json` → users array

### Error saat build
Jalankan `npm install` untuk memastikan semua dependencies terinstall

## 🎯 Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:
- [ ] Image upload untuk Hero, Testimonials
- [ ] Rich text editor untuk deskripsi
- [ ] Multi-user dengan roles (admin, editor)
- [ ] Activity log
- [ ] Preview mode sebelum publish
- [ ] Backup & restore database
- [ ] Export/Import data
- [ ] Search & filter di tables
- [ ] Pagination untuk data banyak
- [ ] Dark mode untuk admin panel

## 📄 Lisensi

Private project untuk Praktisi Mengajar

---

**Dibuat dengan ❤️ untuk Praktisi Mengajar**
