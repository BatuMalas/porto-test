// ============================================================
// PROJECT NODE — Sprite interaktif yang mewakili satu proyek
// ============================================================
import {
  Container,
  Graphics,
  Text,
  type Application,
  type FederatedPointerEvent,
} from "pixi.js";
import { gsap } from "gsap";
import type { Project } from "../data/portfolio";
import { TILE_SIZE, Z, FLOAT_SPEED, FLOAT_AMP, GLOW_COLOR } from "./constants";

const BUILDING_W = TILE_SIZE * 1.2;
const BUILDING_H = TILE_SIZE * 1.4;

// Bangunan pixel art yang mewakili proyek
function drawBuilding(g: Graphics, project: Project): void {
  const color = parseInt(project.color.replace("#", ""), 16);
  const darkColor = darken(color, 0.25);
  const lightColor = lighten(color, 0.25);

  const cx = BUILDING_W / 2;

  // Bayangan
  g.ellipse(cx, BUILDING_H * 0.92, BUILDING_W * 0.45, BUILDING_H * 0.07)
    .fill({ color: 0x000000, alpha: 0.25 });

  // Badan bangunan
  g.roundRect(
    cx - BUILDING_W * 0.38,
    BUILDING_H * 0.35,
    BUILDING_W * 0.76,
    BUILDING_H * 0.55,
    4
  ).fill({ color });

  // Sisi gelap (kedalaman)
  g.roundRect(
    cx + BUILDING_W * 0.22,
    BUILDING_H * 0.37,
    BUILDING_W * 0.16,
    BUILDING_H * 0.52,
    2
  ).fill({ color: darkColor, alpha: 0.6 });

  // Atap (segitiga)
  g.poly([
    cx - BUILDING_W * 0.45, BUILDING_H * 0.38,
    cx,                      BUILDING_H * 0.12,
    cx + BUILDING_W * 0.45, BUILDING_H * 0.38,
  ]).fill({ color: darkColor });

  // Highlight atap
  g.poly([
    cx - BUILDING_W * 0.42, BUILDING_H * 0.37,
    cx,                      BUILDING_H * 0.14,
    cx + BUILDING_W * 0.05, BUILDING_H * 0.37,
  ]).fill({ color: lightColor, alpha: 0.3 });

  // Pintu
  g.roundRect(
    cx - BUILDING_W * 0.09,
    BUILDING_H * 0.65,
    BUILDING_W * 0.18,
    BUILDING_H * 0.25,
    3
  ).fill({ color: 0x1a1a2e });

  // Jendela kiri
  g.roundRect(
    cx - BUILDING_W * 0.32,
    BUILDING_H * 0.44,
    BUILDING_W * 0.14,
    BUILDING_H * 0.13,
    2
  ).fill({ color: 0xfff9c4, alpha: 0.9 });

  // Jendela kanan
  g.roundRect(
    cx + BUILDING_W * 0.18,
    BUILDING_H * 0.44,
    BUILDING_W * 0.14,
    BUILDING_H * 0.13,
    2
  ).fill({ color: 0xfff9c4, alpha: 0.9 });

  // Garis silang jendela
  for (const wx of [cx - BUILDING_W * 0.32, cx + BUILDING_W * 0.18]) {
    const wy = BUILDING_H * 0.44;
    const ww = BUILDING_W * 0.14;
    const wh = BUILDING_H * 0.13;
    g.rect(wx + ww / 2 - 1, wy, 2, wh).fill({ color: 0xaaaaaa, alpha: 0.5 });
    g.rect(wx, wy + wh / 2 - 1, ww, 2).fill({ color: 0xaaaaaa, alpha: 0.5 });
  }
}

// Helper color utility
function darken(color: number, amount: number): number {
  const r = Math.max(0, ((color >> 16) & 0xff) * (1 - amount));
  const g = Math.max(0, ((color >> 8)  & 0xff) * (1 - amount));
  const b = Math.max(0, (color         & 0xff) * (1 - amount));
  return (r << 16) | (g << 8) | b;
}
function lighten(color: number, amount: number): number {
  const r = Math.min(255, ((color >> 16) & 0xff) * (1 + amount));
  const g = Math.min(255, ((color >> 8)  & 0xff) * (1 + amount));
  const b = Math.min(255, (color         & 0xff) * (1 + amount));
  return (r << 16) | (g << 8) | b;
}

export function createProjectNode(
  project: Project,
  onSelect: (project: Project) => void
): Container {
  const container = new Container();
  container.zIndex = Z.objects;
  container.x = project.tileX * TILE_SIZE - BUILDING_W / 2 + TILE_SIZE / 2;
  container.y = project.tileY * TILE_SIZE - BUILDING_H * 0.3;

  // Glow container (di belakang bangunan)
  const glowG = new Graphics();
  glowG.circle(BUILDING_W / 2, BUILDING_H * 0.6, BUILDING_W * 0.6)
    .fill({ color: GLOW_COLOR, alpha: 0 });
  glowG.filters = [];
  container.addChild(glowG);

  // Bangunan utama
  const buildingG = new Graphics();
  drawBuilding(buildingG, project);
  container.addChild(buildingG);

  // Label nama proyek
  const label = new Text({
    text: project.icon + " " + project.title,
    style: {
      fontFamily: "monospace",
      fontSize: 11,
      fill: 0xffffff,
      stroke: { color: 0x000000, width: 3 },
      align: "center",
    },
  });
  label.anchor.set(0.5, 0);
  label.x = BUILDING_W / 2;
  label.y = BUILDING_H * 0.92;
  label.alpha = 0;
  container.addChild(label);

  // Interaktivitas
  container.eventMode = "static";
  container.cursor = "pointer";

  let floatOffset = Math.random() * Math.PI * 2;
  const baseY = container.y;

  // Animasi float menggunakan gsap ticker
  gsap.ticker.add(() => {
    floatOffset += FLOAT_SPEED * gsap.ticker.deltaRatio(60);
    container.y = baseY + Math.sin(floatOffset) * FLOAT_AMP * 0.5;
  });

  container.on("pointerover", () => {
    gsap.to(buildingG.scale, { x: 1.08, y: 1.08, duration: 0.2, ease: "back.out(2)" });
    gsap.to(glowG, { alpha: 0.6, duration: 0.25 });
    gsap.to(label, { alpha: 1, y: BUILDING_H * 0.96, duration: 0.2 });
  });

  container.on("pointerout", () => {
    gsap.to(buildingG.scale, { x: 1, y: 1, duration: 0.2 });
    gsap.to(glowG, { alpha: 0, duration: 0.25 });
    gsap.to(label, { alpha: 0, y: BUILDING_H * 0.92, duration: 0.2 });
  });

  container.on("pointerdown", (_e: FederatedPointerEvent) => {
    gsap.to(buildingG.scale, {
      x: 0.95, y: 0.95, duration: 0.07,
      yoyo: true, repeat: 1,
      onComplete: () => onSelect(project),
    });
  });

  return container;
}
