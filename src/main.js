import { Game } from './game.js';

let game = null;

function initGame() {
  game = new Game();

  // スタートボタンのイベント設定
  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', () => {
      game.start();
      startButton.textContent = 'Restart';
    });
  }

  // 初期描画
  game.render();

  // ハイスコア表示
  displayHighScore();
}

function displayHighScore() {
  const highScoreElement = document.getElementById('highScore');
  if (highScoreElement && game) {
    const highScore = game.scoreManager.getHighScore();
    highScoreElement.textContent = highScore;
  }
}

// DOM読み込み完了後にゲームを初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

// グローバルに公開（デバッグ用）
window.game = game;
