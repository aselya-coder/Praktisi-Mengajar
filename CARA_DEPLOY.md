# Panduan Deploy ke Vercel

## Langkah 1: Login ke Vercel (HANYA SEKALI)

Jalankan command ini untuk login:
```powershell
vercel login
```

Pilih salah satu:
- **Email** - Akan dikirim link verifikasi ke email
- **GitHub** - Login dengan akun GitHub
- **GitLab** - Login dengan akun GitLab

## Langkah 2: Deploy Backend

### A. Masuk ke folder backend
```powershell
cd praktisi-backend
```

### B. Deploy backend
```powershell
vercel --prod
```

**Pertanyaan yang akan muncul:**
1. "Set up and deploy?" → Ketik **Y** (Yes)
2. "Which scope?" → Pilih account Anda
3. "Link to existing project?" → Ketik **N** (No, buat project baru)
4. "What's your project's name?" → Ketik: **praktisi-backend**
5. "In which directory is your code located?" → Tekan **Enter** (pakai default: ./)

**PENTING: Catat URL backend yang muncul!**
Contoh: `https://praktisi-backend-xxx.vercel.app`

## Langkah 3: Deploy Frontend

### A. Keluar dari folder backend
```powershell
cd ..
```

### B. Build project frontend
```powershell
npm run build
```

### C. Deploy frontend
```powershell
vercel --prod
```

**Pertanyaan yang akan muncul:**
1. "Set up and deploy?" → Ketik **Y** (Yes)
2. "Which scope?" → Pilih account Anda
3. "Link to existing project?" → Ketik **N** (No, buat project baru)
4. "What's your project's name?" → Ketik: **praktisi-mengajar**
5. "In which directory is your code located?" → Tekan **Enter** (pakai default: ./)
6. "Want to override settings?" → Ketik **N** (No)

### D. Set Environment Variable di Vercel Dashboard

1. Buka: https://vercel.com/dashboard
2. Pilih project **praktisi-mengajar**
3. Klik tab **Settings**
4. Klik **Environment Variables**
5. Tambahkan variable baru:
   - **Name**: `VITE_API_BASE`
   - **Value**: URL backend yang dicatat tadi (contoh: `https://praktisi-backend-xxx.vercel.app`)
   - Pilih environment: **Production**, **Preview**, **Development** (centang semua)
6. Klik **Save**

### E. Redeploy Frontend (Agar environment variable aktif)
```powershell
vercel --prod
```

## ✅ Selesai!

Website Anda sekarang bisa diakses di:
- **Frontend**: `https://praktisi-mengajar-xxx.vercel.app`
- **Backend**: `https://praktisi-backend-xxx.vercel.app`
- **Admin**: `https://praktisi-mengajar-xxx.vercel.app/admin/login`

## 🔄 Deploy Update Selanjutnya

Jika ada perubahan code:

**Backend:**
```powershell
cd praktisi-backend
vercel --prod
```

**Frontend:**
```powershell
cd ..
npm run build
vercel --prod
```

## 🔐 Login Admin Default

- Email: `admin@praktisimengajar.id`
- Password: `admin123`

**PENTING:** Ganti password setelah login pertama kali!

## ❓ Troubleshooting

### Jika tampilan masih kosong:
1. Cek apakah environment variable `VITE_API_BASE` sudah diset
2. Pastikan URL backend benar (tanpa trailing slash `/`)
3. Buka Developer Console (F12) untuk cek error

### Jika admin tidak bisa login:
1. Cek apakah backend sudah deploy
2. Test backend: `https://backend-url-anda.vercel.app/users`
3. Harus return data user

### Jika ada CORS error:
✅ Sudah diperbaiki di `praktisi-backend/index.js` - deploy ulang backend
