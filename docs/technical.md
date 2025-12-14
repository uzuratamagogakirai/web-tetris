# テトリスゲーム - 技術仕様書

## 1. 定数定義

### 1.1 ゲーム定数
```javascript
const CONSTANTS = {
  // ボードサイズ
  BOARD_WIDTH: 10,
  BOARD_HEIGHT: 20,
  BLOCK_SIZE: 30,  // ピクセル

  // 色定義
  COLORS: {
    0: '#000000',  // 空
    1: '#00f0f0',  // I - シアン
    2: '#f0f000',  // O - イエロー
    3: '#a000f0',  // T - パープル
    4: '#00f000',  // S - グリーン
    5: '#f00000',  // Z - レッド
    6: '#0000f0',  // J - ブルー
    7: '#f0a000'   // L - オレンジ
  },

  // ゲーム速度
  INITIAL_DROP_INTERVAL: 1000,  // ミリ秒
  MIN_DROP_INTERVAL: 100,
  SPEED_INCREASE_PER_LEVEL: 100,

  // レベルアップ
  LINES_PER_LEVEL: 10,

  // スコア
  SCORE_SINGLE: 100,
  SCORE_DOUBLE: 300,
  SCORE_TRIPLE: 500,
  SCORE_TETRIS: 800,
  SCORE_SOFT_DROP: 1,
  SCORE_HARD_DROP: 2
};
```

### 1.2 テトリミノ形状定義
```javascript
const TETROMINOS = {
  I: {
    shape: [
      [[0, 0, 0, 0],
       [1, 1, 1, 1],
       [0, 0, 0, 0],
       [0, 0, 0, 0]]
    ],
    color: 1
  },
  O: {
    shape: [
      [[2, 2],
       [2, 2]]
    ],
    color: 2
  },
  T: {
    shape: [
      [[0, 3, 0],
       [3, 3, 3],
       [0, 0, 0]]
    ],
    color: 3
  },
  S: {
    shape: [
      [[0, 4, 4],
       [4, 4, 0],
       [0, 0, 0]]
    ],
    color: 4
  },
  Z: {
    shape: [
      [[5, 5, 0],
       [0, 5, 5],
       [0, 0, 0]]
    ],
    color: 5
  },
  J: {
    shape: [
      [[6, 0, 0],
       [6, 6, 6],
       [0, 0, 0]]
    ],
    color: 6
  },
  L: {
    shape: [
      [[0, 0, 7],
       [7, 7, 7],
       [0, 0, 0]]
    ],
    color: 7
  }
};
```

## 2. クラス設計

### 2.1 Game クラス
```javascript
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    this.renderer = new Renderer(this.ctx);
    this.inputHandler = new InputHandler(this);
    this.scoreManager = new ScoreManager();

    this.currentPiece = null;
    this.nextPiece = null;
    this.heldPiece = null;
    this.canHold = true;

    this.level = 1;
    this.dropInterval = INITIAL_DROP_INTERVAL;
    this.lastDropTime = 0;

    this.isGameOver = false;
    this.isPaused = false;
    this.isRunning = false;
  }

  start() { /* ゲーム開始 */ }
  stop() { /* ゲーム停止 */ }
  pause() { /* 一時停止 */ }
  resume() { /* 再開 */ }
  reset() { /* リセット */ }

  update(timestamp) { /* ゲーム状態更新 */ }
  gameLoop(timestamp) { /* メインループ */ }

  spawnPiece() { /* 新しいピース生成 */ }
  movePiece(dx, dy) { /* ピース移動 */ }
  rotatePiece() { /* ピース回転 */ }
  dropPiece() { /* ソフトドロップ */ }
  hardDrop() { /* ハードドロップ */ }
  holdPiece() { /* ホールド */ }

  lockPiece() { /* ピース固定 */ }
  checkLines() { /* ライン消去チェック */ }
  updateLevel() { /* レベル更新 */ }
  checkGameOver() { /* ゲームオーバーチェック */ }
}
```

### 2.2 Board クラス
```javascript
class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array.from({ length: this.height },
      () => Array(this.width).fill(0));
  }

  isValidPosition(piece, x, y) {
    // ピースが有効な位置にあるかチェック
    // - ボード境界内
    // - 既存ブロックと衝突していない
  }

  placePiece(piece, x, y) {
    // ボードにピースを配置
  }

  clearLines() {
    // 完成したラインをクリア
    // クリアしたライン数を返す
  }

  getFullRows() {
    // 完成した行のインデックスを取得
  }

  removeRow(row) {
    // 指定行を削除し、上の行を下にシフト
  }
}
```

### 2.3 Tetromino クラス
```javascript
class Tetromino {
  constructor(type) {
    this.type = type;
    this.shape = TETROMINOS[type].shape[0];
    this.color = TETROMINOS[type].color;
    this.x = Math.floor(BOARD_WIDTH / 2) - Math.floor(this.shape[0].length / 2);
    this.y = 0;
    this.rotation = 0;
  }

  rotate() {
    // 形状を時計回りに90度回転
    const rotated = this.shape[0].map((_, i) =>
      this.shape.map(row => row[i]).reverse()
    );
    return rotated;
  }

  getRotatedShape() {
    // 回転後の形状を取得（実際には変更しない）
  }

  getBlocks() {
    // ピースを構成するブロックの座標を取得
    const blocks = [];
    this.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          blocks.push({ x: this.x + x, y: this.y + y });
        }
      });
    });
    return blocks;
  }
}
```

### 2.4 Renderer クラス
```javascript
class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear() {
    // キャンバスをクリア
  }

  drawBoard(board) {
    // ボードを描画
    board.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.drawBlock(x, y, cell);
      });
    });
  }

  drawBlock(x, y, colorId) {
    // 単一ブロックを描画
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;

    this.ctx.fillStyle = COLORS[colorId];
    this.ctx.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

    // ボーダー描画
    this.ctx.strokeStyle = '#333';
    this.ctx.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawPiece(piece) {
    // 現在のピースを描画
    piece.getBlocks().forEach(block => {
      this.drawBlock(block.x, block.y, piece.color);
    });
  }

  drawGhost(piece, board) {
    // ゴーストピース（落下予測）を描画
  }

  drawNext(piece) {
    // ネクストピースを描画
  }

  drawHold(piece) {
    // ホールドピースを描画
  }

  drawUI(score, level, lines) {
    // スコア、レベル、ライン数を描画
  }

  drawGameOver() {
    // ゲームオーバー画面を描画
  }
}
```

### 2.5 InputHandler クラス
```javascript
class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  handleKeyDown(event) {
    if (this.keys[event.code]) return;  // キーリピート防止
    this.keys[event.code] = true;

    switch(event.code) {
      case 'ArrowLeft':
        this.game.movePiece(-1, 0);
        break;
      case 'ArrowRight':
        this.game.movePiece(1, 0);
        break;
      case 'ArrowDown':
        this.game.dropPiece();
        break;
      case 'ArrowUp':
        this.game.rotatePiece();
        break;
      case 'Space':
        this.game.hardDrop();
        event.preventDefault();
        break;
      case 'KeyC':
        this.game.holdPiece();
        break;
      case 'KeyP':
        this.game.isPaused ? this.game.resume() : this.game.pause();
        break;
    }
  }

  handleKeyUp(event) {
    this.keys[event.code] = false;
  }
}
```

### 2.6 ScoreManager クラス
```javascript
class ScoreManager {
  constructor() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  addScore(points) {
    this.score += points;
  }

  addLines(count, level) {
    this.lines += count;

    // ライン数に応じてスコア加算
    const scoreMap = {
      1: SCORE_SINGLE,
      2: SCORE_DOUBLE,
      3: SCORE_TRIPLE,
      4: SCORE_TETRIS
    };

    const points = scoreMap[count] * level;
    this.addScore(points);
  }

  addDropScore(distance, isHardDrop) {
    const points = distance * (isHardDrop ? SCORE_HARD_DROP : SCORE_SOFT_DROP);
    this.addScore(points);
  }

  updateLevel() {
    this.level = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
    return this.level;
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  getHighScore() {
    return localStorage.getItem('tetris-highscore') || 0;
  }

  saveHighScore() {
    const highScore = this.getHighScore();
    if (this.score > highScore) {
      localStorage.setItem('tetris-highscore', this.score);
    }
  }
}
```

## 3. アルゴリズム詳細

### 3.1 回転アルゴリズム（SRS - Super Rotation System）

基本的な回転は行列の転置と反転:
```javascript
function rotateMatrix(matrix) {
  const N = matrix.length;
  const rotated = matrix.map((_, i) =>
    matrix.map(row => row[N - 1 - i])
  );
  return rotated;
}
```

### 3.2 当たり判定アルゴリズム
```javascript
function isValidPosition(board, piece, offsetX, offsetY) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;

        // 境界チェック
        if (newX < 0 || newX >= board.width || newY >= board.height) {
          return false;
        }

        // 上部境界は許容（ピース出現時）
        if (newY < 0) continue;

        // 既存ブロックとの衝突チェック
        if (board.grid[newY][newX]) {
          return false;
        }
      }
    }
  }
  return true;
}
```

### 3.3 ライン消去アルゴリズム
```javascript
function clearLines(board) {
  let linesCleared = 0;

  for (let y = board.height - 1; y >= 0; y--) {
    // 行が完全に埋まっているかチェック
    if (board.grid[y].every(cell => cell !== 0)) {
      // 行を削除
      board.grid.splice(y, 1);
      // 新しい空行を先頭に追加
      board.grid.unshift(Array(board.width).fill(0));
      linesCleared++;
      y++; // 同じ行を再チェック
    }
  }

  return linesCleared;
}
```

### 3.4 ハードドロップアルゴリズム
```javascript
function hardDrop(board, piece) {
  let dropDistance = 0;

  while (isValidPosition(board, piece, 0, dropDistance + 1)) {
    dropDistance++;
  }

  piece.y += dropDistance;
  return dropDistance;
}
```

## 4. ゲームループ設計

### 4.1 メインループ
```javascript
function gameLoop(timestamp) {
  if (!isRunning || isPaused) {
    requestAnimationFrame(gameLoop);
    return;
  }

  // 自動落下処理
  if (timestamp - lastDropTime > dropInterval) {
    if (!movePiece(0, 1)) {
      lockPiece();
      checkLines();
      spawnPiece();
      checkGameOver();
    }
    lastDropTime = timestamp;
  }

  // 描画
  renderer.clear();
  renderer.drawBoard(board);
  renderer.drawPiece(currentPiece);
  renderer.drawNext(nextPiece);
  renderer.drawHold(heldPiece);
  renderer.drawUI(score, level, lines);

  if (isGameOver) {
    renderer.drawGameOver();
  }

  requestAnimationFrame(gameLoop);
}
```

## 5. イベント処理

### 5.1 キーボードイベント
- DAS (Delayed Auto Shift): キー長押し時の連続移動
- ARR (Auto Repeat Rate): 連続移動の速度

### 5.2 タッチイベント（モバイル対応）
```javascript
// スワイプジェスチャー
touchStartX, touchStartY
touchEndX, touchEndY

if (touchEndX - touchStartX > threshold) {
  // 右スワイプ
}
// 他の方向も同様
```

## 6. パフォーマンス最適化

### 6.1 描画最適化
- ダーティフラグ: 変更があった部分のみ再描画
- オフスクリーンキャンバス: 複雑な描画の事前レンダリング

### 6.2 メモリ管理
- オブジェクトプールパターン: テトリミノの再利用
- 不要なオブジェクトの適切な破棄

## 7. データ永続化

### 7.1 LocalStorage
```javascript
// ハイスコア保存
localStorage.setItem('tetris-highscore', score);

// 設定保存
const settings = {
  soundEnabled: true,
  musicEnabled: true,
  ghostPieceEnabled: true
};
localStorage.setItem('tetris-settings', JSON.stringify(settings));
```

## 8. エラーハンドリング

### 8.1 想定されるエラー
- Canvas API未サポート
- LocalStorage未サポート
- 不正な入力

### 8.2 エラー処理
```javascript
try {
  // ゲーム処理
} catch (error) {
  console.error('Game error:', error);
  // エラーメッセージ表示
  // ゲーム状態のリセット
}
```

## 9. テスト戦略

### 9.1 ユニットテスト
- 回転ロジック
- 当たり判定
- スコア計算
- ライン消去

### 9.2 統合テスト
- ゲームフロー全体
- UI操作

### 9.3 ブラウザテスト
- Chrome, Firefox, Safari, Edge
- デスクトップ/モバイル

## 10. デプロイメント

### 10.1 ビルドプロセス
- 静的ファイルのみ（シンプルな場合）
- または Vite/Webpack でバンドル

### 10.2 ホスティング
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 11. アクセシビリティ

### 11.1 キーボード操作
- すべての機能をキーボードで操作可能
- フォーカス管理

### 11.2 スクリーンリーダー対応
- ARIAラベル
- ゲーム状態の音声通知（オプション）

## 12. セキュリティ考慮事項

### 12.1 XSS対策
- ユーザー入力のサニタイズ（名前入力機能がある場合）

### 12.2 データ整合性
- LocalStorageデータの検証
- 不正なスコアの防止
