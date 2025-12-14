export class InputHandler {
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
    // キーリピート防止
    if (this.keys[event.code]) {
      return;
    }
    this.keys[event.code] = true;

    // ゲームオーバー時はRキーのみ
    if (this.game.isGameOver) {
      if (event.code === 'KeyR') {
        this.game.reset();
      }
      return;
    }

    switch (event.code) {
      case 'ArrowLeft':
        this.game.movePiece(-1, 0);
        event.preventDefault();
        break;

      case 'ArrowRight':
        this.game.movePiece(1, 0);
        event.preventDefault();
        break;

      case 'ArrowDown':
        this.game.softDrop();
        event.preventDefault();
        break;

      case 'ArrowUp':
        this.game.rotatePiece();
        event.preventDefault();
        break;

      case 'Space':
        this.game.hardDrop();
        event.preventDefault();
        break;

      case 'KeyC':
        this.game.holdPiece();
        event.preventDefault();
        break;

      case 'KeyP':
        if (this.game.isPaused) {
          this.game.resume();
        } else {
          this.game.pause();
        }
        event.preventDefault();
        break;

      case 'KeyR':
        if (this.game.isGameOver) {
          this.game.reset();
        }
        break;
    }
  }

  handleKeyUp(event) {
    this.keys[event.code] = false;
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
}
