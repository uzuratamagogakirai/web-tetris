import {
  SCORE_SINGLE,
  SCORE_DOUBLE,
  SCORE_TRIPLE,
  SCORE_TETRIS,
  SCORE_SOFT_DROP,
  SCORE_HARD_DROP,
  LINES_PER_LEVEL
} from './constants.js';

export class ScoreManager {
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

    const baseScore = scoreMap[count] || 0;
    const points = baseScore * level;
    this.addScore(points);
  }

  addDropScore(distance, isHardDrop) {
    const pointsPerCell = isHardDrop ? SCORE_HARD_DROP : SCORE_SOFT_DROP;
    const points = distance * pointsPerCell;
    this.addScore(points);
  }

  updateLevel() {
    const newLevel = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
    this.level = newLevel;
    return this.level;
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  getHighScore() {
    try {
      const highScore = localStorage.getItem('tetris-highscore');
      return highScore ? parseInt(highScore, 10) : 0;
    } catch (e) {
      console.warn('LocalStorage not available:', e);
      return 0;
    }
  }

  saveHighScore() {
    try {
      const highScore = this.getHighScore();
      if (this.score > highScore) {
        localStorage.setItem('tetris-highscore', this.score.toString());
        return true;
      }
    } catch (e) {
      console.warn('Cannot save high score:', e);
    }
    return false;
  }

  getStats() {
    return {
      score: this.score,
      lines: this.lines,
      level: this.level,
      highScore: this.getHighScore()
    };
  }
}
