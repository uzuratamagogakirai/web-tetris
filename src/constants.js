// ゲーム定数定義
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const BLOCK_SIZE = 30;

// 色定義
export const COLORS = {
  0: '#000000',  // 空
  1: '#00f0f0',  // I - シアン
  2: '#f0f000',  // O - イエロー
  3: '#a000f0',  // T - パープル
  4: '#00f000',  // S - グリーン
  5: '#f00000',  // Z - レッド
  6: '#0000f0',  // J - ブルー
  7: '#f0a000'   // L - オレンジ
};

// ゲーム速度
export const INITIAL_DROP_INTERVAL = 1000;  // ミリ秒
export const MIN_DROP_INTERVAL = 100;
export const SPEED_INCREASE_PER_LEVEL = 100;

// レベルアップ
export const LINES_PER_LEVEL = 10;

// スコア
export const SCORE_SINGLE = 100;
export const SCORE_DOUBLE = 300;
export const SCORE_TRIPLE = 500;
export const SCORE_TETRIS = 800;
export const SCORE_SOFT_DROP = 1;
export const SCORE_HARD_DROP = 2;

// テトリミノ形状定義
export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 1
  },
  O: {
    shape: [
      [2, 2],
      [2, 2]
    ],
    color: 2
  },
  T: {
    shape: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    color: 3
  },
  S: {
    shape: [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0]
    ],
    color: 4
  },
  Z: {
    shape: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0]
    ],
    color: 5
  },
  J: {
    shape: [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    color: 6
  },
  L: {
    shape: [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0]
    ],
    color: 7
  }
};

export const TETROMINO_TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
