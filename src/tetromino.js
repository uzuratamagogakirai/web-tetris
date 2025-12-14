import { TETROMINOS, TETROMINO_TYPES, BOARD_WIDTH } from './constants.js';

export class Tetromino {
  constructor(type) {
    if (!type) {
      type = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
    }

    this.type = type;
    const tetrominoData = TETROMINOS[type];
    this.shape = JSON.parse(JSON.stringify(tetrominoData.shape)); // ディープコピー
    this.color = tetrominoData.color;

    // 初期位置：ボードの中央上部
    this.x = Math.floor(BOARD_WIDTH / 2) - Math.floor(this.shape[0].length / 2);
    this.y = 0;
  }

  rotate() {
    // 時計回りに90度回転
    const n = this.shape.length;
    const rotated = Array.from({ length: n }, () => Array(n).fill(0));

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        rotated[x][n - 1 - y] = this.shape[y][x];
      }
    }

    return rotated;
  }

  getRotatedShape() {
    return this.rotate();
  }

  applyRotation() {
    this.shape = this.rotate();
  }

  getBlocks() {
    const blocks = [];
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          blocks.push({
            x: this.x + x,
            y: this.y + y,
            color: this.color
          });
        }
      }
    }
    return blocks;
  }

  clone() {
    const cloned = new Tetromino(this.type);
    cloned.shape = JSON.parse(JSON.stringify(this.shape));
    cloned.x = this.x;
    cloned.y = this.y;
    return cloned;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

export function createRandomTetromino() {
  return new Tetromino();
}
