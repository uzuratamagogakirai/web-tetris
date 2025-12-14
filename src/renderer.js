import { BLOCK_SIZE, COLORS, BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Renderer {
  constructor(canvasId, nextCanvasId, holdCanvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.nextCanvas = document.getElementById(nextCanvasId);
    this.nextCtx = this.nextCanvas ? this.nextCanvas.getContext('2d') : null;

    this.holdCanvas = document.getElementById(holdCanvasId);
    this.holdCtx = this.holdCanvas ? this.holdCanvas.getContext('2d') : null;

    // メインキャンバスのサイズ設定
    this.canvas.width = BOARD_WIDTH * BLOCK_SIZE;
    this.canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

    // ネクスト・ホールドキャンバスのサイズ設定
    if (this.nextCanvas) {
      this.nextCanvas.width = 4 * BLOCK_SIZE;
      this.nextCanvas.height = 4 * BLOCK_SIZE;
    }
    if (this.holdCanvas) {
      this.holdCanvas.width = 4 * BLOCK_SIZE;
      this.holdCanvas.height = 4 * BLOCK_SIZE;
    }
  }

  clear() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBoard(board) {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const colorId = board.grid[y][x];
        this.drawBlock(x, y, colorId, this.ctx);
      }
    }
  }

  drawBlock(x, y, colorId, ctx = this.ctx) {
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;

    // ブロックの塗りつぶし
    ctx.fillStyle = COLORS[colorId];
    ctx.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

    // ボーダー描画（空でない場合）
    if (colorId !== 0) {
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);

      // ハイライト効果
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + 2, py + BLOCK_SIZE - 2);
      ctx.lineTo(px + 2, py + 2);
      ctx.lineTo(px + BLOCK_SIZE - 2, py + 2);
      ctx.stroke();
    } else {
      // グリッド線（空のマス）
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  drawPiece(piece) {
    if (!piece) return;

    const blocks = piece.getBlocks();
    blocks.forEach(block => {
      if (block.y >= 0) {
        this.drawBlock(block.x, block.y, block.color, this.ctx);
      }
    });
  }

  drawGhost(piece, board) {
    if (!piece) return;

    // ゴーストピースの位置を計算
    const ghostPiece = piece.clone();
    while (board.isValidPosition(ghostPiece, 0, 1)) {
      ghostPiece.y++;
    }

    // ゴーストピースを薄く描画
    const blocks = ghostPiece.getBlocks();
    blocks.forEach(block => {
      if (block.y >= 0) {
        const px = block.x * BLOCK_SIZE;
        const py = block.y * BLOCK_SIZE;

        this.ctx.strokeStyle = COLORS[block.color];
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
      }
    });
  }

  drawNext(piece) {
    if (!this.nextCtx || !piece) return;

    // クリア
    this.nextCtx.fillStyle = '#000000';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

    // ピースを中央に配置
    const tempPiece = piece.clone();
    tempPiece.x = 0;
    tempPiece.y = 0;

    const blocks = tempPiece.getBlocks();

    // ピースのサイズを計算
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    blocks.forEach(block => {
      minX = Math.min(minX, block.x);
      maxX = Math.max(maxX, block.x);
      minY = Math.min(minY, block.y);
      maxY = Math.max(maxY, block.y);
    });

    const offsetX = Math.floor((4 - (maxX - minX + 1)) / 2) - minX;
    const offsetY = Math.floor((4 - (maxY - minY + 1)) / 2) - minY;

    blocks.forEach(block => {
      const x = block.x + offsetX;
      const y = block.y + offsetY;
      this.drawBlock(x, y, block.color, this.nextCtx);
    });
  }

  drawHold(piece) {
    if (!this.holdCtx) return;

    // クリア
    this.holdCtx.fillStyle = '#000000';
    this.holdCtx.fillRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);

    if (!piece) return;

    // ピースを中央に配置
    const tempPiece = piece.clone();
    tempPiece.x = 0;
    tempPiece.y = 0;

    const blocks = tempPiece.getBlocks();

    // ピースのサイズを計算
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    blocks.forEach(block => {
      minX = Math.min(minX, block.x);
      maxX = Math.max(maxX, block.x);
      minY = Math.min(minY, block.y);
      maxY = Math.max(maxY, block.y);
    });

    const offsetX = Math.floor((4 - (maxX - minX + 1)) / 2) - minX;
    const offsetY = Math.floor((4 - (maxY - minY + 1)) / 2) - minY;

    blocks.forEach(block => {
      const x = block.x + offsetX;
      const y = block.y + offsetY;
      this.drawBlock(x, y, block.color, this.holdCtx);
    });
  }

  drawUI(score, level, lines) {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lines').textContent = lines;
  }

  drawGameOver() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);

    this.ctx.font = '24px Arial';
    this.ctx.fillText('Press R to Restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
  }

  drawPaused() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);

    this.ctx.font = '24px Arial';
    this.ctx.fillText('Press P to Resume', this.canvas.width / 2, this.canvas.height / 2 + 50);
  }
}
