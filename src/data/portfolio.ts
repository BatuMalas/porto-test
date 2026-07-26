// ============================================================
// PORTFOLIO DATA — edit ini untuk mengubah konten portofolio
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: "web" | "mobile" | "game" | "ai" | "tool";
  github?: string;
  live?: string;
  color: string; // warna aksen proyek
  icon: string;  // emoji icon
  tileX: number; // posisi di farm map (kolom)
  tileY: number; // posisi di farm map (baris)
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "devops" | "design" | "language";
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  description: string;
}

export const owner = {
  name: "Candra Bagus",
  title: "Full-Stack Developer & Creative Coder",
  bio: "Membangun antarmuka yang hidup dan sistem yang solid. Suka eksplorasi di persimpangan antara seni, teknologi, dan interaksi. Focused on crafting high-performance digital experiences with pixel-perfect precision.",
  location: "Indonesia, 🇮🇩",
  avatar: "/assets/avatar.png",
  email: "candra.bagus@dev.com",
  website: "candrabagas.id",
  yearsOfExperience: 5,
  summary: "With over 5 years of experience in technical architecture and frontend engineering, I specialize in building scalable web applications that don't just work — they perform. My philosophy is rooted in the belief that software should be as elegant internally as it is externally. I leverage a deep understanding of React, Node.js, and Cloud infrastructure to solve complex business problems through clean, maintainable code.",
};

export const projects: Project[] = [
  {
    id: "pixel-farm-portfolio",
    title: "Pixel Farm Portfolio",
    description: "Portofolio interaktif dengan PixiJS & Astro",
    longDescription:
      "Portofolio unik berbasis WebGL yang menggabungkan game mechanic dengan presentasi profesional. Dibangun dengan Astro untuk SSG & SEO, PixiJS v8 untuk rendering, dan Tailwind untuk UI.",
    techStack: ["Astro", "PixiJS", "TypeScript", "Tailwind CSS"],
    category: "web",
    github: "https://github.com/candrabagus/portfolio",
    live: "https://candrabagus.dev",
    color: "#7C3AED",
    icon: "🌾",
    tileX: 3,
    tileY: 2,
  },
  {
    id: "realtime-collab",
    title: "RealtimeBoard",
    description: "Whiteboard kolaborasi real-time",
    longDescription:
      "Aplikasi whiteboard kolaboratif real-time menggunakan WebSocket dan Canvas API. Mendukung multi-user drawing, sticky notes, dan export ke PNG/PDF.",
    techStack: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
    category: "web",
    github: "https://github.com/candrabagus/realtimeboard",
    color: "#059669",
    icon: "🖊️",
    tileX: 7,
    tileY: 3,
  },
  {
    id: "ai-notes",
    title: "NoteAI",
    description: "Smart note-taking dengan AI summarization",
    longDescription:
      "Aplikasi catatan cerdas yang memanfaatkan LLM untuk merangkum, mengkategorikan, dan menghubungkan antar catatan secara otomatis. Mendukung markdown dan ekspor ke berbagai format.",
    techStack: ["React", "FastAPI", "OpenAI API", "Supabase"],
    category: "ai",
    github: "https://github.com/candrabagus/noteai",
    color: "#D97706",
    icon: "🤖",
    tileX: 11,
    tileY: 2,
  },
  {
    id: "game-jam-2024",
    title: "Echoes of Terrain",
    description: "Game jam entry — puzzle platformer",
    longDescription:
      "Entry untuk Global Game Jam 2024 dengan tema 'Make Me Laugh'. Puzzle platformer 2D dimana suara adalah mechanic utama. Dibuat dalam 48 jam menggunakan Godot 4.",
    techStack: ["Godot 4", "GDScript", "Aseprite"],
    category: "game",
    github: "https://github.com/candrabagus/echoes-of-terrain",
    live: "https://itch.io/candrabagus/echoes",
    color: "#DC2626",
    icon: "🎮",
    tileX: 5,
    tileY: 6,
  },
  {
    id: "devtool-cli",
    title: "Scaffly",
    description: "CLI tool untuk scaffold project cepat",
    longDescription:
      "CLI tool yang men-generate boilerplate project berdasarkan template yang bisa dikustomisasi. Mendukung 20+ template termasuk React, Astro, FastAPI, dan Golang.",
    techStack: ["Golang", "Cobra CLI", "Docker"],
    category: "tool",
    github: "https://github.com/candrabagus/scaffly",
    color: "#0284C7",
    icon: "⚡",
    tileX: 9,
    tileY: 6,
  },
  {
    id: "ecommerce-mobile",
    title: "MarketNest",
    description: "Aplikasi mobile e-commerce lokal",
    longDescription:
      "Aplikasi mobile marketplace untuk UMKM lokal dengan fitur AR preview produk, sistem pembayaran terintegrasi, dan real-time order tracking.",
    techStack: ["React Native", "Expo", "Node.js", "MongoDB"],
    category: "mobile",
    github: "https://github.com/candrabagus/marketnest",
    color: "#BE185D",
    icon: "🛍️",
    tileX: 13,
    tileY: 5,
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "TypeScript", level: 5, category: "language" },
  { name: "React / Next.js", level: 5, category: "frontend" },
  { name: "Astro", level: 4, category: "frontend" },
  { name: "PixiJS / WebGL", level: 4, category: "frontend" },
  { name: "CSS / Tailwind", level: 5, category: "frontend" },
  // Backend
  { name: "Node.js", level: 4, category: "backend" },
  { name: "Python / FastAPI", level: 4, category: "backend" },
  { name: "Golang", level: 3, category: "backend" },
  { name: "PostgreSQL", level: 4, category: "backend" },
  // DevOps
  { name: "Docker", level: 3, category: "devops" },
  { name: "CI/CD (GitHub Actions)", level: 3, category: "devops" },
  // Design
  { name: "Figma", level: 4, category: "design" },
  { name: "Pixel Art (Aseprite)", level: 3, category: "design" },
];

export const socials: Social[] = [
  {
    platform: "GitHub",
    url: "https://github.com/candrabagus",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/candrabagus",
    icon: "linkedin",
  },
  {
    platform: "Twitter / X",
    url: "https://x.com/candrabagus",
    icon: "twitter",
  },
];

export const experiences: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "TechRange Systems",
    period: "JAN 2022 — PRESENT",
    current: true,
    achievements: [
      "Lead the development of a high-traffic e-commerce dashboard using Next.js and GraphQL, improving load times by 45%.",
      "Mentored a team of 4 junior developers, implementing strict code review processes and CI/CD best practices.",
      "Architected a microservices-based backend using Node.js and AWS Lambda, reducing operational costs by 30%.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Pixel Prefect Agency",
    period: "AUG 2019 — DEC 2021",
    current: false,
    achievements: [
      "Developed over 15+ custom WordPress themes and headless CMS solutions using React.",
      "Collaboration with designers to bridge the gap between creative vision and technical feasibility.",
      "Implemented advanced CSS animations and interactive SVG elements for award-winning marketing sites.",
    ],
  },
];

export const educations: Education[] = [
  {
    degree: "B.Sc. In Computer Science",
    institution: "University of Technology",
    description: "Focused on Software Engineering, Data Structures, and Distributed Systems. Graduated with Honors.",
  },
  {
    degree: "Full-Stack Certification",
    institution: "Advanced Tech Institute",
    description: "Comprehensive training in modern web architectures, cloud deployment, and system design patterns.",
  },
];
