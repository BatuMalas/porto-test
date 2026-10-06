# 🌾 Pixel Farm Portfolio

Portofolio interaktif dengan dua mode tampilan — **Farm Mode** (peta pixel interaktif) dan **Classic Mode** (CV/resume standar).

---

## ⚡ Cara Menjalankan

> **PENTING:** Buka terminal kamu sendiri (PowerShell / CMD), jangan lewat IDE terminal yang cepat tutup.

### 1. Development (lokal)

```powershell
cd C:\Code\porto-test
npm run dev
```

Lalu buka browser → **`http://localhost:4321`**

Biarkan terminal tetap terbuka selama development. Tekan `Ctrl+C` untuk stop.

### 2. Build Production

```powershell
cd C:\Code\porto-test
npm run build
```

Hasil build ada di folder `dist/` — siap di-deploy ke Netlify / Vercel / GitHub Pages.

### 3. Preview Build Production (opsional)

```powershell
npm run preview
```
Untuk kedepannya, gunakan perintah berikut untuk mengelola dev server:

Stop: npx astro dev stop
Status: npx astro dev status
Logs: npx astro dev logs
---

## 📁 Struktur Folder

```
C:\Code\porto-test\
│
├── public/                     # File statis (langsung di-serve)
│   └── favicon.svg             # Ikon tab browser (pixel art "CB")
│
├── src/
│   ├── components/             # Komponen UI (Astro)
│   │   ├── ClassicView.astro   # Tampilan CV/resume klasik
│   │   ├── FarmCanvas.astro    # Wrapper canvas PixiJS (Farm Mode)
│   │   ├── Navbar.astro        # Header atas (nama + social links)
│   │   ├── ProjectModal.astro  # Pop-up detail proyek (glassmorphism)
│   │   └── ViewToggle.astro    # Tombol toggle Farm ↔ CV
│   │
│   ├── data/
│   │   └── portfolio.ts        # ⭐ DATA UTAMA — edit di sini!
│   │                           #    (nama, bio, proyek, skill, kontak)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout dasar + meta SEO semua halaman
│   │
│   ├── pages/
│   │   └── index.astro         # Halaman utama (root "/")
│   │
│   ├── pixi/                   # Engine PixiJS (Farm Mode)
│   │   ├── constants.ts        # Ukuran tile, warna palet, z-index
│   │   ├── FarmApp.ts          # Bootstrap PixiJS v8 Application
│   │   ├── ProjectNode.ts      # Sprite bangunan interaktif per proyek
│   │   └── WorldMap.ts         # Render tilemap peta kebun
│   │
│   └── styles/
│       └── global.css          # CSS global + Tailwind v4 import
│
├── astro.config.mjs            # Konfigurasi Astro + Tailwind plugin
├── package.json                # Dependencies & scripts
└── tsconfig.json               # Konfigurasi TypeScript
```

---

## ✏️ Cara Edit Konten

Semua konten portofolio ada di **satu file**:

```
src/data/portfolio.ts
```

### Edit profil/bio:
```typescript
export const owner = {
  name: "Nama Kamu",
  title: "Jabatan / Tagline",
  bio: "Deskripsi singkat tentang kamu...",
  location: "Kota, Negara",
  email: "email@kamu.dev",
};
```

### Tambah proyek baru:
```typescript
{
  id: "nama-unik-proyek",         // ID unik, tanpa spasi
  title: "Nama Proyek",
  description: "Deskripsi singkat",
  longDescription: "Deskripsi panjang untuk modal popup",
  techStack: ["React", "Node.js"],
  category: "web",                // web | mobile | game | ai | tool
  github: "https://github.com/...",
  live: "https://...",            // opsional
  color: "#7C3AED",               // warna aksen bangunan di farm
  icon: "🚀",                     // emoji ikon
  tileX: 5,                       // posisi kolom di peta (0-17)
  tileY: 3,                       // posisi baris di peta (0-9)
},
```

> **Tips posisi tile:** Farm punya grid **18 kolom × 10 baris**. Cek `src/pixi/constants.ts` untuk ukuran peta. Hindari posisi yang sudah dipakai proyek lain.

### Edit social links:
```typescript
export const socials = [
  { platform: "GitHub",   url: "https://github.com/...",   icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com/...", icon: "linkedin" },
  { platform: "Twitter",  url: "https://x.com/...",        icon: "twitter" },
];
```

---

## 🛠️ Tech Stack

| Teknologi | Versi | Fungsi |
|---|---|---|
| **Astro** | v7 (latest) | Framework SSG + routing + SEO |
| **PixiJS** | v8 | WebGL/WebGPU rendering Farm Mode |
| **Tailwind CSS** | v4 | Styling UI overlay & komponen |
| **GSAP** | latest | Animasi hover & transisi sprite |
| **TypeScript** | strict | Type safety seluruh project |

---

## 🚀 Deploy ke Netlify / Vercel

### Netlify (drag & drop):
1. `npm run build`
2. Upload folder `dist/` ke [netlify.com/drop](https://app.netlify.com/drop)

### Vercel (GitHub):
1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com) → framework: **Astro**
3. Auto-deploy setiap push!

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| `localhost:4321` tidak bisa diakses | Pastikan terminal tetap terbuka saat `npm run dev` berjalan |
| Farm tidak muncul (layar hitam) | Browser tidak support WebGL → klik tombol "CV" untuk Classic Mode |
| Port 4321 sudah dipakai | `npm run dev -- --port 3000` |
| Perubahan tidak ter-update | Simpan file → Astro hot-reload otomatis dalam ~1 detik |
