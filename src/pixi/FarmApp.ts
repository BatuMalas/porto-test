// ============================================================
// FARM APP — Bootstrap PixiJS v8 Application
// Main entry point untuk Interactive Farm Mode
// ============================================================
import { Application, Container } from "pixi.js";
import { projects, type Project } from "../data/portfolio";
import { createWorldMap, createDecorTree } from "./WorldMap";
import { createProjectNode } from "./ProjectNode";
import { TILE_SIZE, MAP_COLS, MAP_ROWS } from "./constants";

// Posisi pohon dekorasi (bukan proyek)
const DECOR_TREES = [
  [1, 1], [1, 14], [1, 16], [2, 16],
  [8, 1], [8, 2], [8, 15], [8, 16],
  [9, 14], [4, 0], [5, 0], [3, 16], [6, 16],
];

export class FarmApp {
  private app: Application | null = null;
  private worldContainer: Container | null = null;
  private isDragging = false;
  private dragStart = { x: 0, y: 0 };
  private cameraStart = { x: 0, y: 0 };

  async init(canvas: HTMLCanvasElement, onProjectSelect: (p: Project) => void): Promise<void> {
    // Check WebGL support
    if (!this.supportsWebGL()) {
      throw new Error("WebGL not supported");
    }

    this.app = new Application();

    await this.app.init({
      canvas,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      backgroundColor: 0x1a1a2e,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // Main world container (untuk pan/drag)
    this.worldContainer = new Container();
    this.worldContainer.sortableChildren = true;
    this.app.stage.addChild(this.worldContainer);

    // Center peta di canvas
    const mapW = MAP_COLS * TILE_SIZE;
    const mapH = MAP_ROWS * TILE_SIZE;
    this.worldContainer.x = (canvas.clientWidth - mapW) / 2;
    this.worldContainer.y = (canvas.clientHeight - mapH) / 2;

    // Render tilemap
    const worldMap = createWorldMap();
    this.worldContainer.addChild(worldMap);

    // Pohon dekorasi
    for (const [row, col] of DECOR_TREES) {
      const tree = createDecorTree(col * TILE_SIZE, row * TILE_SIZE);
      this.worldContainer.addChild(tree);
    }

    // Project nodes
    for (const project of projects) {
      const node = createProjectNode(project, (p) => {
        onProjectSelect(p);
      });
      this.worldContainer.addChild(node);
    }

    // Setup drag-to-pan
    this.setupDragPan(canvas);

    // Ambient animation ticker (air berkilau)
    let tick = 0;
    this.app.ticker.add((delta) => {
      tick += delta.deltaMS * 0.001;
      // Nanti bisa tambah efek partikel / ambient di sini
    });

    // Responsive resize
    const resizeObserver = new ResizeObserver(() => this.onResize(canvas));
    resizeObserver.observe(canvas);
  }

  private setupDragPan(canvas: HTMLCanvasElement): void {
    if (!this.worldContainer) return;

    canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.cameraStart = {
        x: this.worldContainer!.x,
        y: this.worldContainer!.y,
      };
      canvas.style.cursor = "grabbing";
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!this.isDragging || !this.worldContainer) return;
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      this.worldContainer.x = this.cameraStart.x + dx;
      this.worldContainer.y = this.cameraStart.y + dy;
    });

    canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
      canvas.style.cursor = "grab";
    });

    canvas.addEventListener("mouseleave", () => {
      this.isDragging = false;
      canvas.style.cursor = "default";
    });

    // Touch drag for mobile
    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      this.isDragging = true;
      this.dragStart = { x: touch.clientX, y: touch.clientY };
      this.cameraStart = {
        x: this.worldContainer!.x,
        y: this.worldContainer!.y,
      };
    });

    canvas.addEventListener("touchmove", (e) => {
      if (!this.isDragging || !this.worldContainer) return;
      const touch = e.touches[0];
      const dx = touch.clientX - this.dragStart.x;
      const dy = touch.clientY - this.dragStart.y;
      this.worldContainer.x = this.cameraStart.x + dx;
      this.worldContainer.y = this.cameraStart.y + dy;
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
      this.isDragging = false;
    });

    canvas.style.cursor = "grab";
  }

  private onResize(canvas: HTMLCanvasElement): void {
    if (!this.app) return;
    this.app.renderer.resize(canvas.clientWidth, canvas.clientHeight);
  }

  supportsWebGL(): boolean {
    try {
      const testCanvas = document.createElement("canvas");
      return !!(
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  }

  destroy(): void {
    this.app?.destroy(false, { children: true });
    this.app = null;
    this.worldContainer = null;
  }
}
