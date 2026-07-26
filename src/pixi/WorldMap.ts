// ============================================================
// WORLD MAP — Render tilemap top-down menggunakan PixiJS v8
// ============================================================
import { Container, Graphics } from "pixi.js";
import { TILE_SIZE, MAP_COLS, MAP_ROWS, PALETTE, Z } from "./constants";

// Tipe tile sederhana
// 0 = rumput, 1 = tanah/dirt, 2 = jalan setapak, 3 = air
type TileType = 0 | 1 | 2 | 3;

// Layout peta — 10 baris x 18 kolom
const MAP_LAYOUT: TileType[][] = [
  [3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [0,0,0,2,2,2,2,2,0,0,2,2,2,2,0,0,0,0],
  [0,0,2,2,1,1,1,2,2,2,2,1,1,2,2,0,0,0],
  [0,0,2,1,1,1,1,1,2,2,1,1,1,1,2,0,0,0],
  [0,0,2,1,1,1,1,1,2,2,1,1,1,1,2,0,0,0],
  [0,0,2,2,1,1,1,2,2,2,2,1,1,2,2,0,0,0],
  [0,0,0,2,2,2,2,2,0,0,2,2,2,2,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
];

function getTileColor(type: TileType, row: number, col: number): number {
  // Checkerboard subtle untuk grass & dirt
  const checker = (row + col) % 2 === 0;
  switch (type) {
    case 0: return checker ? PALETTE.grassLight : PALETTE.grassDark;
    case 1: return checker ? PALETTE.dirt       : PALETTE.dirtDark;
    case 2: return checker ? PALETTE.path       : PALETTE.pathDark;
    case 3: return PALETTE.water;
    default: return PALETTE.grassLight;
  }
}

export function createWorldMap(): Container {
  const container = new Container();
  container.zIndex = Z.ground;

  const g = new Graphics();

  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      const tile = MAP_LAYOUT[row]?.[col] ?? 0;
      const color = getTileColor(tile as TileType, row, col);
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;

      g.rect(x, y, TILE_SIZE, TILE_SIZE).fill({ color });

      // Tepi tile halus
      if (tile === 3) {
        // Animasi ripple air akan di-handle di FarmApp ticker
        // Tandai tile air dengan metadata via tag
        g.rect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4)
          .fill({ color: PALETTE.waterLight, alpha: 0.3 });
      }
    }
  }

  // Dekorasi: beberapa batu kecil di area rumput
  const stonePositions = [
    [1, 2], [1, 15], [8, 4], [8, 13], [9, 8],
  ];
  for (const [row, col] of stonePositions) {
    const x = col * TILE_SIZE + TILE_SIZE * 0.25;
    const y = row * TILE_SIZE + TILE_SIZE * 0.35;
    const w = TILE_SIZE * 0.4;
    const h = TILE_SIZE * 0.25;
    g.ellipse(x, y, w, h).fill({ color: 0x888888, alpha: 0.7 });
    g.ellipse(x - 2, y - 3, w * 0.9, h * 0.8).fill({ color: 0xaaaaaa, alpha: 0.9 });
  }

  container.addChild(g);
  return container;
}

// Dekorasi pohon sederhana (bukan proyek)
export function createDecorTree(x: number, y: number): Container {
  const c = new Container();
  c.zIndex = Z.decor;
  c.x = x;
  c.y = y;

  const g = new Graphics();
  // Bayangan
  g.ellipse(TILE_SIZE / 2, TILE_SIZE * 0.85, TILE_SIZE * 0.4, TILE_SIZE * 0.1)
    .fill({ color: 0x000000, alpha: 0.2 });
  // Batang
  g.rect(TILE_SIZE * 0.42, TILE_SIZE * 0.55, TILE_SIZE * 0.16, TILE_SIZE * 0.3)
    .fill({ color: PALETTE.treeTrunk });
  // Mahkota (3 lingkaran berlapis)
  g.circle(TILE_SIZE * 0.5, TILE_SIZE * 0.38, TILE_SIZE * 0.32)
    .fill({ color: 0x2d6e22 });
  g.circle(TILE_SIZE * 0.38, TILE_SIZE * 0.44, TILE_SIZE * 0.25)
    .fill({ color: PALETTE.treeCrown });
  g.circle(TILE_SIZE * 0.62, TILE_SIZE * 0.42, TILE_SIZE * 0.23)
    .fill({ color: PALETTE.treeCrown });
  g.circle(TILE_SIZE * 0.5, TILE_SIZE * 0.28, TILE_SIZE * 0.28)
    .fill({ color: 0x4fa832 });

  c.addChild(g);
  return c;
}
