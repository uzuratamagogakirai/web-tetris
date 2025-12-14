import { Board } from './board.js';
import { Tetromino, createRandomTetromino } from './tetromino.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import { ScoreManager } from './score.js';
import { INITIAL_DROP_INTERVAL, MIN_DROP_INTERVAL, SPEED_INCREASE_PER_LEVEL } from './constants.js';

export class Game {
  constructor() {
    this.board = new Board();
    this.renderer = new Renderer('gameCanvas', 'nextCanvas', 'holdCanvas');
    this.inputHandler = new InputHandler(this);
    this.scoreManager = new ScoreManager();

    this.currentPiece = null;
    this.nextPiece = null;
    this.heldPiece = null;
    this.canHold = true;

    this.dropInterval = INITIAL_DROP_INTERVAL;
    this.lastDropTime = 0;

    this.isGameOver = false;
    this.isPaused = false;
    this.isRunning = false;

    this.animationId = null;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.isGameOver = false;
    this.isPaused = false;

    this.board.reset();
    this.scoreManager.reset();

    this.currentPiece = createRandomTetromino();
    this.nextPiece = createRandomTetromino();
    this.heldPiece = null;
    this.canHold = true;

    this.lastDropTime = performance.now();
    this.gameLoop(performance.now());
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  pause() {
    if (!this.isRunning || this.isGameOver) return;
    this.isPaused = true;
  }

  resume() {
    if (!this.isRunning || this.isGameOver) return;
    this.isPaused = false;
    this.lastDropTime = performance.now();
  }

  reset() {
    this.stop();
    this.start();
  }

  gameLoop(timestamp) {
    if (!this.isRunning) return;

    // 一時停止中
    if (this.isPaused) {
      this.render();
      this.renderer.drawPaused();
      this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
      return;
    }

    // ゲームオーバー
    if (this.isGameOver) {
      this.render();
      this.renderer.drawGameOver();
      this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
      return;
    }

    // 自動落下処理
    if (timestamp - this.lastDropTime > this.dropInterval) {
      this.update();
      this.lastDropTime = timestamp;
    }

    this.render();

    this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  update() {
    if (!this.currentPiece) {
      this.spawnPiece();
      return;
    }

    // ピースを1マス下に移動
    if (this.board.isValidPosition(this.currentPiece, 0, 1)) {
      this.currentPiece.y++;
    } else {
      // 固定
      this.lockPiece();
      this.checkLines();
      this.spawnPiece();
      this.checkGameOver();
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.drawBoard(this.board);

    if (this.currentPiece) {
      this.renderer.drawGhost(this.currentPiece, this.board);
      this.renderer.drawPiece(this.currentPiece);
    }

    this.renderer.drawNext(this.nextPiece);
    this.renderer.drawHold(this.heldPiece);

    const stats = this.scoreManager.getStats();
    this.renderer.drawUI(stats.score, stats.level, stats.lines);
  }

  spawnPiece() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = createRandomTetromino();
    this.canHold = true;

    // 出現位置が無効な場合はゲームオーバー
    if (!this.board.isValidPosition(this.currentPiece, 0, 0)) {
      this.isGameOver = true;
      this.scoreManager.saveHighScore();
    }
  }

  movePiece(dx, dy) {
    if (!this.currentPiece || this.isPaused || this.isGameOver) return false;

    if (this.board.isValidPosition(this.currentPiece, dx, dy)) {
      this.currentPiece.x += dx;
      this.currentPiece.y += dy;
      return true;
    }

    return false;
  }

  rotatePiece() {
    if (!this.currentPiece || this.isPaused || this.isGameOver) return;

    const originalShape = this.currentPiece.shape;
    const rotatedShape = this.currentPiece.getRotatedShape();

    // 回転を試行
    this.currentPiece.shape = rotatedShape;

    // 基本的な回転チェック
    if (this.board.isValidPosition(this.currentPiece, 0, 0)) {
      return;
    }

    // ウォールキック（簡易版）
    const wallKicks = [
      [1, 0], [-1, 0], [2, 0], [-2, 0],
      [0, -1], [1, -1], [-1, -1]
    ];

    for (const [dx, dy] of wallKicks) {
      if (this.board.isValidPosition(this.currentPiece, dx, dy)) {
        this.currentPiece.x += dx;
        this.currentPiece.y += dy;
        return;
      }
    }

    // 回転できない場合は元に戻す
    this.currentPiece.shape = originalShape;
  }

  softDrop() {
    if (!this.currentPiece || this.isPaused || this.isGameOver) return;

    if (this.movePiece(0, 1)) {
      this.scoreManager.addDropScore(1, false);
    }
  }

  hardDrop() {
    if (!this.currentPiece || this.isPaused || this.isGameOver) return;

    let dropDistance = 0;
    while (this.board.isValidPosition(this.currentPiece, 0, 1)) {
      this.currentPiece.y++;
      dropDistance++;
    }

    if (dropDistance > 0) {
      this.scoreManager.addDropScore(dropDistance, true);
    }

    this.lockPiece();
    this.checkLines();
    this.spawnPiece();
    this.checkGameOver();
  }

  holdPiece() {
    if (!this.currentPiece || !this.canHold || this.isPaused || this.isGameOver) return;

    if (this.heldPiece === null) {
      // 初回ホールド
      this.heldPiece = new Tetromino(this.currentPiece.type);
      this.currentPiece = this.nextPiece;
      this.nextPiece = createRandomTetromino();
    } else {
      // ホールドと交換
      const temp = this.heldPiece;
      this.heldPiece = new Tetromino(this.currentPiece.type);
      this.currentPiece = new Tetromino(temp.type);
    }

    this.canHold = false;
  }

  lockPiece() {
    if (!this.currentPiece) return;

    this.board.placePiece(this.currentPiece);
    this.currentPiece = null;
  }

  checkLines() {
    const linesCleared = this.board.clearLines();

    if (linesCleared > 0) {
      this.scoreManager.addLines(linesCleared, this.scoreManager.level);
      const oldLevel = this.scoreManager.level;
      this.scoreManager.updateLevel();

      // レベルアップ時に落下速度を更新
      if (this.scoreManager.level > oldLevel) {
        this.updateDropInterval();
      }
    }
  }

  updateDropInterval() {
    const newInterval = INITIAL_DROP_INTERVAL - (this.scoreManager.level - 1) * SPEED_INCREASE_PER_LEVEL;
    this.dropInterval = Math.max(newInterval, MIN_DROP_INTERVAL);
  }

  checkGameOver() {
    // ゲームオーバーはspawnPieceで判定される
  }
}
