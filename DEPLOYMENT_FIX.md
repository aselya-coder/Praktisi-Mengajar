# Perbaikan Deployment - Praktisi Mengajar

## Masalah yang Ditemukan

Tampilan website deployment hanya menampilkan sebagian konten karena:

1. **CORS tidak dikonfigurasi** - Backend tidak bisa diakses dari frontend karena Cross-Origin Resource Sharing (CORS) tidak diaktifkan
2. **Field names tidak cocok** - Struktur data di `db.json` tidak sesuai dengan interface di frontend
3. **Export backend salah** - Backend menggunakan `server.listen()` yang tidak compatible dengan Vercel serverless

## Solusi yang Diterapkan

### 1. Konfigurasi CORS di Backend (`praktisi-backend/index.js`)
```javascript
// Menambahkan CORS headers
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

### 2. Memperbaiki Struktur Data Hero (`db.json` & `praktisi-backend/db.json`)
**Sebelum:**
- `buttonText` → `primaryButtonText`
- `buttonLink` → `primaryButtonLink`
- `imageUrl` → `image`
- Tidak ada `secondaryButtonLink`

**Sesudah:** Semua field names sekarang match dengan interface TypeScript di `src/lib/api.ts`

### 3. Export untuk Vercel Serverless
```javascript
// Export untuk Vercel
module.exports = server;
```

## Cara Deploy Ulang

### Backend
```powershell
cd praktisi-backend
vercel --prod
```

### Frontend
```powershell
cd ..
npm run build
vercel --prod
```

## Hasil Setelah Deploy

✅ Website akan menampilkan semua section:
- Hero section dengan gambar background
- Services section dengan 3 layanan
- Process section dengan step-by-step
- Testimonials dari klien
- About section
- CTA section
- Footer

✅ Admin login akan berfungsi di `/admin/login`

✅ API akan otomatis terhubung tanpa CORS error

## Environment Variable

Pastikan di Vercel dashboard frontend sudah set:
```
VITE_API_BASE=https://praktisibackend.vercel.app
```

(Update dengan URL backend Anda yang sebenarnya)
