import { BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Board {
  constructor(width = BOARD_WIDTH, height = BOARD_HEIGHT) {
    this.width = width;
    this.height = height;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  reset() {
    this.grid = this.createEmptyGrid();
  }

  isValidPosition(piece, offsetX = 0, offsetY = 0) {
    const shape = piece.shape;
    const pieceX = piece.x + offsetX;
    const pieceY = piece.y + offsetY;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = pieceX + x;
          const newY = pieceY + y;

          // 左右の境界チェック
          if (newX < 0 || newX >= this.width) {
            return false;
          }

          // 下の境界チェック
          if (newY >= this.height) {
            return false;
          }

          // 上部境界は許容（ピース出現時）
          if (newY < 0) {
            continue;
          }

          // 既存ブロックとの衝突チェック
          if (this.grid[newY][newX]) {
            return false;
          }
        }
      }
    }

    return true;
  }

  placePiece(piece) {
    const shape = piece.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0 && boardY < this.height && boardX >= 0 && boardX < this.width) {
            this.grid[boardY][boardX] = piece.color;
          }
        }
      }
    }
  }

  clearLines() {
    let linesCleared = 0;

    for (let y = this.height - 1; y >= 0; y--) {
      // 行が完全に埋まっているかチェック
      if (this.grid[y].every(cell => cell !== 0)) {
        // 行を削除
        this.grid.splice(y, 1);
        // 新しい空行を先頭に追加
        this.grid.unshift(Array(this.width).fill(0));
        linesCleared++;
        y++; // 同じ行を再チェック
      }
    }

    return linesCleared;
  }

  getFullRows() {
    const fullRows = [];
    for (let y = 0; y < this.height; y++) {
      if (this.grid[y].every(cell => cell !== 0)) {
        fullRows.push(y);
      }
    }
    return fullRows;
  }

  getCellValue(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return null;
    }
    return this.grid[y][x];
  }
}
