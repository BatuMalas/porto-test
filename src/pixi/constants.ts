// ============================================================
// FARM WORLD CONSTANTS
// ============================================================

export const TILE_SIZE = 64;          // pixel per tile
export const MAP_COLS = 18;           // lebar peta (dalam tile)
export const MAP_ROWS = 10;           // tinggi peta (dalam tile)

// Warna palet utama kebun
export const PALETTE = {
  grassLight: 0x7ec850,
  grassDark:  0x5da832,
  dirt:       0x9b7653,
  dirtDark:   0x7a5c3a,
  path:       0xd4b483,
  pathDark:   0xb8956a,
  water:      0x4aaddc,
  waterLight: 0x72c4f0,
  treeTrunk:  0x7a5c3a,
  treeCrown:  0x3a8c2f,
  shadow:     0x00000033,
};

// Layer Z-index
export const Z = {
  ground:    0,
  decor:     1,
  objects:   2,
  player:    3,
  ui:        4,
  modal:     5,
};

// Warna glow saat hover proyek
export const GLOW_COLOR = 0xFFD700;

// Kecepatan animasi
export const FLOAT_SPEED = 0.002;   // radian per ms
export const FLOAT_AMP   = 4;       // pixel amplitude
