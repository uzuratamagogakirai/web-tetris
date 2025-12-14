# 開発環境セットアップガイド

**対象**: 新規開発者、引き継ぎ担当者
**所要時間**: 約30分
**最終更新**: 2025年12月14日

このドキュメントは、ゼロから開発環境をセットアップして、最初のコード変更をデプロイするまでの完全なガイドです。

---

## 前提条件

### 必要なアクセス権限
- [ ] GitHubアカウント: uzuratamagogakirai へのアクセス
- [ ] Firebase/GCPアカウント: chiho@uzuratamago.com へのアクセス

### システム要件
- **OS**: Windows 10/11, macOS, Linux
- **RAM**: 4GB以上
- **ストレージ**: 1GB以上の空き容量

---

## ステップ1: 必要なツールのインストール（10分）

### 1.1 Node.js のインストール

#### Windows
```bash
# 公式サイトからダウンロード
# https://nodejs.org/
# LTS版（推奨）をダウンロードしてインストール
```

#### macOS
```bash
# Homebrewを使用
brew install node
```

#### 確認
```bash
node --version  # v18以上推奨
npm --version   # v9以上推奨
```

### 1.2 Git のインストール

#### Windows
```bash
# 公式サイトからダウンロード
# https://git-scm.com/
```

#### macOS
```bash
# Homebrewを使用
brew install git
```

#### 確認
```bash
git --version  # 2.x以上
```

### 1.3 Firebase CLI のインストール

```bash
# npm経由でグローバルインストール
npm install -g firebase-tools

# 確認
firebase --version  # 15.0.0以上
```

### 1.4 Python のインストール（オプション - ローカルサーバー用）

#### Windows
```bash
# 公式サイトからダウンロード
# https://www.python.org/downloads/
# Python 3.8以上
```

#### macOS
```bash
# プリインストール済み、または
brew install python3
```

#### 確認
```bash
python --version  # または python3 --version
```

---

## ステップ2: リポジトリのクローン（5分）

### 2.1 GitHubからクローン

```bash
# 作業ディレクトリに移動
cd C:\  # Windowsの場合
# cd ~  # macOS/Linuxの場合

# リポジトリをクローン
git clone https://github.com/uzuratamagogakirai/web-tetris.git

# プロジェクトディレクトリに移動
cd web-tetris
```

### 2.2 Git設定

```bash
# ユーザー名とメールアドレスを設定（初回のみ）
git config user.name "uzuratamagogakirai"
git config user.email "chiho@uzuratamago.com"

# 確認
git config --list
```

### 2.3 ファイル構造確認

```bash
# ディレクトリ構造を確認
ls -la  # macOS/Linux
dir     # Windows

# 重要なファイルが存在することを確認
# - index.html
# - firebase.json
# - src/
# - styles/
# - docs/
```

---

## ステップ3: ローカルで実行（5分）

### 3.1 HTTPサーバーを起動

#### Python使用（推奨）
```bash
# プロジェクトルートで実行
python -m http.server 8000
# または
python3 -m http.server 8000
```

#### Node.js使用（代替）
```bash
# http-serverをインストール
npm install -g http-server

# 実行
http-server -p 8000
```

### 3.2 ブラウザで確認

1. ブラウザを開く
2. http://localhost:8000 にアクセス
3. ゲームが表示されることを確認
4. "Start Game"をクリックして動作確認

### 3.3 開発者ツールで確認

1. F12キーを押して開発者ツールを開く
2. Consoleタブでエラーがないことを確認
3. Networkタブで全ファイルが正常に読み込まれていることを確認

---

## ステップ4: Firebase認証（5分）

### 4.1 Firebase ログイン

```bash
# Firebaseにログイン
firebase login

# ブラウザが開くので、chiho@uzuratamago.com でログイン
# 権限を承認
```

### 4.2 プロジェクト確認

```bash
# プロジェクト一覧を表示
firebase projects:list

# web-tetris-game-2024 が表示されることを確認
```

### 4.3 現在のプロジェクト確認

```bash
# .firebaserc の内容確認
cat .firebaserc  # macOS/Linux
type .firebaserc # Windows

# 出力例:
# {
#   "projects": {
#     "default": "web-tetris-game-2024"
#   }
# }
```

---

## ステップ5: 初めてのコード変更（5分）

### 5.1 簡単な変更を加える

#### エディタでファイルを開く
```bash
# VSCodeを使用する場合
code .

# または任意のエディタで index.html を開く
```

#### 変更例: タイトルを変更
```html
<!-- index.html の <h1> タグを探す -->
<h1>Tetris Game</h1>

<!-- 変更 -->
<h1>Tetris Game - Test</h1>
```

### 5.2 ローカルで確認

1. ブラウザをリロード（Ctrl+R または Cmd+R）
2. タイトルが変更されていることを確認

---

## ステップ6: Git コミット（3分）

### 6.1 変更を確認

```bash
# 変更されたファイルを確認
git status

# 変更内容を確認
git diff index.html
```

### 6.2 コミット

```bash
# 変更をステージング
git add index.html

# コミット
git commit -m "test: タイトル変更のテスト"

# 確認
git log -1
```

### 6.3 リモートにプッシュ

```bash
# GitHubにプッシュ
git push origin main

# GitHub Web UI で確認
# https://github.com/uzuratamagogakirai/web-tetris
```

---

## ステップ7: プレビューデプロイ（5分）

### 7.1 プレビューチャンネルにデプロイ

```bash
# プレビューデプロイを実行
firebase hosting:channel:deploy preview --project web-tetris-game-2024

# 出力例:
# ✔  Deploy complete!
# Channel URL (preview): https://web-tetris-game-2024--preview-XXXXX.web.app
```

### 7.2 プレビューURLで確認

1. 表示されたURLをブラウザで開く
2. 変更が反映されていることを確認
3. ゲームが正常に動作することを確認

---

## ステップ8: 本番デプロイ（オプション）

### 8.1 本番デプロイ実行

```bash
# プレビューで問題なければ本番デプロイ
firebase deploy --only hosting --project web-tetris-game-2024

# 出力例:
# ✔  Deploy complete!
# Hosting URL: https://web-tetris-game-2024.web.app
```

### 8.2 本番環境で確認

1. https://web-tetris-game-2024.web.app を開く
2. 変更が反映されていることを確認
3. 全機能が動作することを確認

### 8.3 変更を元に戻す（テストのため）

```bash
# index.html を元に戻す
git checkout HEAD~1 index.html

# コミット
git add index.html
git commit -m "revert: タイトルを元に戻す"
git push origin main

# 本番に再デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

---

## 完了チェックリスト

セットアップが完了したら、以下を確認してください:

- [ ] Node.js インストール完了（`node --version`）
- [ ] npm インストール完了（`npm --version`）
- [ ] Git インストール完了（`git --version`）
- [ ] Firebase CLI インストール完了（`firebase --version`）
- [ ] リポジトリクローン完了
- [ ] ローカルでゲームが起動した
- [ ] Firebase認証成功
- [ ] プロジェクト確認完了
- [ ] コード変更→コミット→プッシュ完了
- [ ] プレビューデプロイ成功
- [ ] 本番デプロイ成功（オプション）

---

## 開発環境の推奨設定

### Visual Studio Code（推奨エディタ）

#### インストール
https://code.visualstudio.com/

#### 推奨拡張機能
```bash
# VSCode拡張機能（オプション）
# - ESLint
# - Prettier
# - Live Server
# - GitLens
```

#### 設定例（.vscode/settings.json）
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.autoSave": "afterDelay",
  "liveServer.settings.port": 8000
}
```

---

## 次のステップ

### 1. ドキュメントを読む
- **HANDOVER.md**: プロジェクト全体の理解
- **docs/technical.md**: コードの詳細設計
- **OPERATIONS.md**: 運用ガイド

### 2. コードを理解する
```bash
# エントリーポイントから読み始める
# 1. src/main.js
# 2. src/game.js
# 3. src/renderer.js
# 4. src/board.js
# 5. src/tetromino.js
```

### 3. 開発タスクを試す
- **新機能追加**: 次のセクション参照
- **バグ修正**: トラブルシューティングガイド参照
- **パフォーマンス改善**: docs/technical.md 参照

---

## よくある開発タスク

### タスク1: 新しいテトリミノの色を追加

#### 1. constants.js を編集
```javascript
// src/constants.js
export const COLORS = [
  '#000000', // 0: 空
  '#00F0F0', // 1: I (シアン)
  '#F0F000', // 2: O (黄色)
  '#A000F0', // 3: T (紫)
  '#00F000', // 4: S (緑)
  '#F00000', // 5: Z (赤)
  '#0000F0', // 6: J (青)
  '#F0A000', // 7: L (オレンジ)
];

// 新しい色を追加（例: ピンク）
// '#FF69B4', // 8: ピンク
```

#### 2. ローカルで確認
```bash
# ブラウザをリロード
# 開発者ツールでエラーがないか確認
```

#### 3. コミット
```bash
git add src/constants.js
git commit -m "feat: 新しいテトリミノ色を追加"
git push origin main
```

#### 4. デプロイ
```bash
# プレビューデプロイ
firebase hosting:channel:deploy preview --project web-tetris-game-2024

# 確認後、本番デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

### タスク2: 落下速度を調整

#### 1. constants.js を編集
```javascript
// src/constants.js
export const LEVEL_SPEEDS = {
  1: 1000,  // レベル1: 1秒
  2: 900,
  3: 800,
  // ... 速度を調整
};
```

#### 2. テストとデプロイ
同上の手順に従う

---

## トラブルシューティング

### 問題: `firebase login` が失敗する
```bash
# 解決策1: ログアウトして再ログイン
firebase logout
firebase login

# 解決策2: ブラウザのキャッシュをクリア
# 解決策3: 別のブラウザで試す
```

### 問題: ローカルサーバーが起動しない
```bash
# 解決策1: ポートが使用中か確認
# Windows
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :8000

# 解決策2: 別のポートを使用
python -m http.server 8080
```

### 問題: Git プッシュが失敗する
```bash
# 解決策1: リモートの変更を取得
git pull origin main

# 解決策2: 認証情報を確認
git config user.name
git config user.email
```

---

## サポート・連絡先

### ドキュメント
- **プロジェクト概要**: README.md
- **引き継ぎ**: HANDOVER.md
- **運用ガイド**: OPERATIONS.md
- **技術仕様**: docs/technical.md

### 問題報告
- **GitHub Issues**: https://github.com/uzuratamagogakirai/web-tetris/issues

### リソース
- **Firebase ドキュメント**: https://firebase.google.com/docs/hosting
- **Git ドキュメント**: https://git-scm.com/doc

---

**セットアップ完了！**
これで開発環境のセットアップは完了です。
HANDOVER.md を読んでプロジェクト全体を理解してください。
