# Minimalist Personal Portfolio & Showcase

Portofolio personal dan etalase karya digital yang dibangun dengan **Astro**, **TypeScript**, dan **Tailwind CSS**. Mengusung konsep *Modern Editorial Dossier* dengan fokus pada tipografi yang kuat, presentasi studi kasus yang mendalam, dan micro-interactions yang responsif.

---

## ⚡ Cara Menjalankan

### 1. Development (Lokal)

```bash
npm run dev
```

Buka browser di **`http://localhost:4321`**.

### 2. Build Production

```bash
npm run build
```

Hasil build statis akan disimpan di folder `dist/` — siap di-deploy ke **Vercel**, **Netlify**, atau platform hosting statis lainnya.

### 3. Preview Production Build

```bash
npm run preview
```

---

## 🌟 Fitur Unggulan

- **📂 Project Showcase & Case Studies Modal**  
  Etalase proyek pilihan dengan modal pop-up interaktif yang menampilkan detail arsitektur, tech stack, serta tautan ke source code (GitHub) dan live preview.
- **🪐 Interactive 3D Planetary Tech Orbit**  
  Visualisasi horizontal 3D tech stack berbentuk orbit planet dan satelit yang dapat digeser (*drag-to-spin*) atau diputar secara otomatis dengan efek kedalaman dinamis.
- **🎯 Interactive Draggable Badges**  
  Elemen badge kreatif dengan simulasi inersia dan fisika gravitasi halus yang dapat ditarik (*drag & drop*).
- **📄 CV / Resume Integration**  
  Akses langsung ke Curriculum Vitae PDF terintegrasi langsung dari file data profil.
- **⚡ Super Fast & Lightweight**  
  Dibangun dengan arsitektur Astro Islands (zero JS secara default untuk elemen statis) sehingga menghasilkan waktu muat halaman yang sangat cepat.

---

## 📁 Struktur Folder

```
porto-test/
│
├── public/
│   ├── assets/                 # Aset gambar, avatar, GIF, dan CV (PDF)
│   └── favicon.svg             # Favicon website
│
├── src/
│   ├── components/             # Komponen UI (Astro)
│   │   ├── EditorialView.astro # Halaman utama (Modern Editorial Dossier)
│   │   ├── TechPlanetaryOrbit.astro # Komponen 3D Planetary Orbit Stack
│   │   ├── Navbar.astro        # Header navigasi & link sosial
│   │   ├── ProjectModal.astro  # Pop-up modal studi kasus proyek
│   │   └── ClassicView.astro   # Mode CV klasik alternatif
│   │
│   ├── data/
│   │   └── portfolio.ts        # ⭐ DATA UTAMA — edit semua konten di sini!
│   │                           #    (profil, pengalaman, proyek, CV, skill)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout dasar, font Google, dan meta SEO
│   │
│   ├── pages/
│   │   └── index.astro         # Entrypoint halaman utama
│   │
│   └── styles/
│       └── global.css          # CSS global & tokens
│
├── astro.config.mjs            # Konfigurasi Astro
├── package.json                # Dependencies & scripts
└── tsconfig.json               # Konfigurasi TypeScript
```

---

## ✏️ Cara Edit Konten

Semua data portofolio bersifat terpusat (*single source of truth*) di:

```
src/data/portfolio.ts
```

### 1. Mengubah Data Profil & Bio
```typescript
export const owner = {
  name: "Candra Bagus",
  title: "Full-Stack Developer & Creative Coder",
  bio: "Membangun antarmuka yang hidup dan sistem yang solid...",
  email: "abaguscandra@gmail.com",
  resume: "/assets/my_cv_Candra1.pdf", // Path file CV Anda
  yearsOfExperience: 2,
};
```

### 2. Menambah / Mengubah Proyek
```typescript
export const projects: Project[] = [
  {
    id: "nama-proyek",
    title: "Judul Proyek",
    description: "Deskripsi singkat yang tampil di kartu",
    longDescription: "Deskripsi lengkap studi kasus yang tampil di modal pop-up",
    techStack: ["React", "Astro", "Tailwind CSS"],
    category: "web", // "web" | "mobile" | "game" | "ai" | "tool"
    github: "https://github.com/...",
    live: "https://...",
    color: "#7C3AED",
    icon: "🌾",
  },
];
```

---

## 🌾 Proyek Terkait / Mendatang (Upcoming)

- **Pixel Farm Portfolio (WebGL / PixiJS Experiment)**  
  Eksperimen interaktif berbasis WebGL peta pixel kebun (*farm mechanic*) yang sebelumnya tergabung dalam repositori ini sedang dipersiapkan untuk dirilis sebagai **web/repositori terpisah** agar menjadi showcase interaktif khusus.

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|---|---|
| **Astro** | Web Framework untuk SSG, routing, dan performa tinggi |
| **TypeScript** | Type safety dan keandalan kode di seluruh data & komponen |
| **Tailwind CSS** | Styling modern dan responsif |
| **Vanilla CSS 3D** | Animasi fisika dan rotasi orbit 3D tanpa library eksternal berat |

---

## 👤 Author

**Candra Bagus**
- GitHub: [@BatuMalas](https://github.com/BatuMalas)
- LinkedIn: [candra-bagus-ar](https://www.linkedin.com/in/candra-bagus-ar/)
