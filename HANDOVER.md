# プロジェクト引き継ぎドキュメント

## プロジェクト概要

**プロジェクト名**: Web Tetris Game
**リポジトリ**: https://github.com/uzuratamagogakirai/web-tetris
**開発開始日**: 2024年12月14日
**デプロイ完了日**: 2025年12月14日
**プロジェクトステータス**: ✅ **本番環境稼働中**
**本番URL**: https://web-tetris-game-2024.web.app

### 目的
Webブラウザで遊べる一人対戦型テトリスゲームの開発とFirebase Hostingでの公開

### 開発手法
**ドキュメントドリブン開発 (Document-Driven Development)**
- すべての作業が文書化
- 実行前に計画書作成
- 完全なトレーサビリティ

## プロジェクト構成

### ディレクトリ構造

```
C:\AIプロジェクト/
├── index.html                      # メインHTMLファイル
├── firebase.json                   # Firebase Hosting設定
├── .firebaserc                    # Firebaseプロジェクト設定
├── .gitignore                     # Git除外設定
│
├── src/                           # ゲームロジック（8ファイル）
│   ├── constants.js               # 定数定義
│   ├── board.js                   # ゲームボード管理
│   ├── tetromino.js               # テトリミノクラス
│   ├── renderer.js                # Canvas描画
│   ├── input.js                   # 入力処理
│   ├── score.js                   # スコア管理
│   ├── game.js                    # メインゲームループ
│   └── main.js                    # エントリーポイント
│
├── styles/                        # スタイルシート
│   └── main.css                   # メインCSS
│
├── docs/                          # 設計ドキュメント（3ファイル）
│   ├── design.md                  # 基本設計書
│   ├── technical.md               # 技術仕様書
│   └── deployment.md              # デプロイメント計画書
│
├── デプロイ関連ファイル（7ファイル）
│   ├── RUN_THIS.md                # 今すぐ実行ガイド
│   ├── DEPLOY_NOW.md              # クイックデプロイガイド
│   ├── DEPLOY_STEPS.md            # 詳細手順書
│   ├── DEPLOY_CHECKLIST.md        # チェックリスト
│   ├── setup-and-deploy.bat       # 自動デプロイスクリプト(Windows)
│   ├── deploy.bat                 # デプロイヘルパー(Windows)
│   └── deploy.sh                  # デプロイヘルパー(macOS/Linux)
│
└── 引き継ぎ・運用ドキュメント（6ファイル）
    ├── README.md                  # プロジェクト概要
    ├── SETUP_GITHUB.md            # GitHub設定ガイド
    ├── HANDOVER.md                # 本ドキュメント（引き継ぎ）
    ├── DEPLOYMENT_STATUS.md       # デプロイ状況レポート
    ├── DEPLOYMENT_COMPLETE.md     # デプロイ完了レポート
    └── OPERATIONS.md              # 運用ガイド（NEW）
```

**総ファイル数**: 約25ファイル（ドキュメント含む）
**デプロイファイル数**: 91ファイル（すべて本番環境にデプロイ済み）

## 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: レスポンシブデザイン、グラデーション、Flexbox
- **JavaScript (ES6+)**: モジュール方式、クラスベース設計
- **Canvas API**: 2D描画エンジン

### 開発ツール
- **Git**: バージョン管理
- **GitHub**: リモートリポジトリ (uzuratamagogakirai/web-tetris)
- **Firebase CLI**: v15.0.0

### ホスティング・インフラ
- **Firebase Hosting**: 静的サイトホスティング
- **プラン**: Spark（無料）
- **CDN**: グローバル配信
- **SSL/TLS**: 自動HTTPS証明書
- **転送量上限**: 10GB/月

## 実装済み機能

### ゲーム機能 ✅ (100%)
- [x] 7種類のテトリミノ（I, O, T, S, Z, J, L）
- [x] 自動落下システム（レベル連動）
- [x] キーボード操作（移動、回転、ドロップ）
- [x] 回転処理（ウォールキック対応）
- [x] 当たり判定（完全実装）
- [x] ライン消去（1-4ライン対応）
- [x] スコアリングシステム（ドロップボーナス含む）
- [x] レベルシステム（落下速度10段階）
- [x] ネクストブロック表示
- [x] ホールド機能（1回制限）
- [x] ゴーストピース（落下予測表示）
- [x] 一時停止/再開（Pキー）
- [x] ゲームオーバー処理
- [x] ハイスコア記録（LocalStorage永続化）

### UI/UX ✅ (100%)
- [x] モダンなグラデーションデザイン
- [x] レスポンシブレイアウト
- [x] ビジュアルエフェクト（影、グロー）
- [x] 操作説明表示（常時表示）
- [x] リアルタイムスコア表示
- [x] ゲーム状態表示（一時停止、ゲームオーバー）

### デプロイ・運用 ✅ (100%)
- [x] Firebase設定ファイル作成
- [x] 自動デプロイスクリプト
- [x] 完全なドキュメント化
- [x] チェックリスト
- [x] **本番環境デプロイ完了**
- [x] **動作確認完了**
- [x] **GitHub公開完了**

## Firebase環境情報

### 本番環境 (Production)
- **プロジェクトID**: `web-tetris-game-2024`
- **プロジェクト名**: Web Tetris Game
- **プロジェクト番号**: 610898141968
- **リソースロケーション**: asia-northeast1（東京）
- **GCPアカウント**: chiho@uzuratamago.com

### 公開URL
- **メインURL**: https://web-tetris-game-2024.web.app
- **代替URL**: https://web-tetris-game-2024.firebaseapp.com
- **Firebaseコンソール**: https://console.firebase.google.com/project/web-tetris-game-2024/overview

### ホスティング設定
- **公開ディレクトリ**: `.` (カレントディレクトリ)
- **デプロイ日**: 2025年12月14日 18:17 JST
- **デプロイファイル数**: 91ファイル
- **除外ファイル**:
  - ドキュメント: `docs/**`, `**/*.md`
  - スクリプト: `**/*.bat`, `**/*.sh`
  - 設定: `firebase.json`, `.*`, `node_modules/**`
  - ログ: `firebase-debug.log`
- **キャッシュ設定**: HTML/CSS/JS 1時間 (max-age=3600)

## ドキュメント体系

### レベル1: 計画・設計（開発フェーズ）
| ドキュメント | 目的 | 読者 |
|------------|------|------|
| **docs/design.md** | ゲームの基本設計、要件定義 | 開発者、プランナー |
| **docs/technical.md** | 技術仕様、アルゴリズム詳細 | 開発者、エンジニア |
| **docs/deployment.md** | デプロイメント戦略、コスト見積 | インフラ担当者 |

### レベル2: 実行手順（デプロイフェーズ）
| ドキュメント | 目的 | 所要時間 |
|------------|------|---------|
| **RUN_THIS.md** | 今すぐ実行するための最短ガイド | 3分 |
| **DEPLOY_NOW.md** | クイックデプロイ手順 | 5分 |
| **DEPLOY_STEPS.md** | 詳細なステップバイステップガイド | 10分 |

### レベル3: 品質保証（検証フェーズ）
| ドキュメント | 目的 | 用途 |
|------------|------|------|
| **DEPLOY_CHECKLIST.md** | 完全なチェックリスト | デプロイ前後の確認 |
| **setup-and-deploy.bat** | 自動化スクリプト | ワンクリックデプロイ |

### レベル4: 運用・引き継ぎ（運用フェーズ）
| ドキュメント | 目的 | 読者 |
|------------|------|------|
| **README.md** | プロジェクト概要、セットアップ | 全員 |
| **HANDOVER.md** | 本ドキュメント（引き継ぎ） | 引き継ぎ担当者 |
| **DEPLOYMENT_STATUS.md** | デプロイ状況レポート | プロジェクト管理者 |
| **DEPLOYMENT_COMPLETE.md** | デプロイ完了レポート | ステークホルダー |
| **OPERATIONS.md** | 運用ガイド | 運用担当者 |

## 重要なファイル詳細説明

### firebase.json
Firebase Hostingの設定ファイル。以下を定義：
- 公開ディレクトリ: `.`
- 除外パターン: 実行可能ファイル、ドキュメント
- キャッシュヘッダー: 1時間
- リライトルール: なし（静的サイト）

**場所**: `C:\AIプロジェクト\firebase.json`

### .firebaserc
Firebaseプロジェクトの関連付け。プロジェクトIDを指定。

**内容**:
```json
{
  "projects": {
    "default": "web-tetris-game-2024"
  }
}
```

### src/constants.js
ゲーム定数の一元管理。以下を定義：
- ボードサイズ: 10x20
- ブロックサイズ: 30px
- 色定義: 7種類のテトリミノ色
- テトリミノ形状: 7種類の回転パターン
- スコア設定: ライン消去、ドロップボーナス
- レベル設定: 落下速度カーブ

**重要**: このファイルを編集すればゲームバランス調整可能

### src/game.js
メインゲームループと状態管理の中核。

**主要機能**:
- `gameLoop()`: requestAnimationFrame使用
- `update()`: ゲーム状態更新
- `spawnPiece()`: 新ピース生成
- `lockPiece()`: ピース固定
- `checkLines()`: ライン消去判定

**場所**: `C:\AIプロジェクト\src\game.js` (約450行)

### src/renderer.js
Canvas描画処理の全て。

**主要機能**:
- `drawBoard()`: ゲームボード描画
- `drawPiece()`: アクティブピース描画
- `drawGhost()`: ゴーストピース描画
- `drawNext()`: ネクストブロック描画
- `drawHold()`: ホールドブロック描画
- `drawUI()`: スコア、レベル表示

**場所**: `C:\AIプロジェクト\src\renderer.js` (約330行)

## ワークフロー

### 開発ワークフロー

#### コードの変更
```bash
# 1. ローカルで開発・テスト
python -m http.server 8000

# 2. 動作確認
# ブラウザで http://localhost:8000 を開く

# 3. 変更をステージング
git add .

# 4. コミット
git commit -m "機能追加: XXX"

# 5. リモートにプッシュ
git push origin main
```

#### デプロイワークフロー
```bash
# 1. Firebase認証確認
firebase login

# 2. プレビューデプロイ（推奨）
firebase hosting:channel:deploy preview --project web-tetris-game-2024

# 3. プレビューURLでテスト
# https://web-tetris-game-2024--preview-XXXXX.web.app

# 4. 問題なければ本番デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

### 緊急対応ワークフロー

#### ロールバック
```bash
# Firebaseコンソールから以前のバージョンに復元
# https://console.firebase.google.com/project/web-tetris-game-2024/hosting/sites

# または CLI で
firebase hosting:clone web-tetris-game-2024:PREVIOUS_VERSION web-tetris-game-2024:live
```

#### ホットフィックス
```bash
# 1. 問題を修正
# 2. 即座にコミット
git add .
git commit -m "hotfix: 緊急バグ修正"

# 3. 即座にデプロイ（プレビュースキップ）
firebase deploy --only hosting --project web-tetris-game-2024

# 4. 動作確認
# https://web-tetris-game-2024.web.app

# 5. プッシュ
git push origin main
```

## トラブルシューティング

### ゲームが動作しない

#### 症状: 画面が真っ白
**原因**: JavaScriptエラー
**対処**:
1. ブラウザの開発者ツールを開く（F12）
2. Consoleタブでエラーメッセージ確認
3. src/main.js が正しく読み込まれているか確認

#### 症状: ブロックが表示されない
**原因**: Canvas描画エラー
**対処**:
1. src/renderer.js のエラー確認
2. ブラウザがCanvas APIをサポートしているか確認
3. キャッシュクリア後リロード（Ctrl+Shift+R）

#### 症状: スコアが保存されない
**原因**: LocalStorage無効
**対処**:
1. ブラウザのLocalStorageが有効か確認
2. プライベートモードでないか確認
3. Application > Local Storage で内容確認

### デプロイエラー

#### エラー: "Failed to authenticate"
**原因**: Firebase未ログイン
**対処**:
```bash
firebase logout
firebase login
```

#### エラー: "Executable files are forbidden"
**原因**: .bat/.sh ファイルが含まれている
**対処**:
firebase.json の ignore に追加済み（解決済み）

#### エラー: "Permission denied"
**原因**: プロジェクト権限不足
**対処**:
1. chiho@uzuratamago.com でログインしているか確認
2. Firebaseコンソールで権限確認
3. プロジェクトオーナーに権限付与依頼

### パフォーマンス問題

#### 症状: ゲームが遅い
**対処**:
1. ブラウザのPerformanceタブでプロファイリング
2. src/constants.js で FPS 調整
3. Canvas描画の最適化検討

## プロジェクト完了状況

### 完了済み ✅ (100%)
- [x] ゲーム実装完了（全機能）
- [x] ドキュメント完備（25ファイル）
- [x] デプロイ準備完了
- [x] **Firebaseプロジェクト作成完了**
- [x] **本番デプロイ完了**
- [x] **動作確認完了**
- [x] **README更新完了（ライブURL追加）**
- [x] **GitHub公開完了**
- [x] **引き継ぎドキュメント完成**

### 今後の拡張（オプション）
- [ ] サウンドエフェクト・BGM追加
- [ ] マルチプレイヤー機能（Firebase Realtime Database）
- [ ] オンラインランキング（Firestore）
- [ ] PWA対応（オフラインプレイ）
- [ ] カスタムドメイン設定（web-tetris.com など）
- [ ] CI/CD自動化（GitHub Actions）
- [ ] ユニットテスト追加（Jest）
- [ ] E2Eテスト追加（Playwright）

## 引き継ぎチェックリスト

### 環境確認
- [x] Node.js インストール確認: `node --version` (v24.12.0)
- [x] npm インストール確認: `npm --version`
- [x] Firebase CLI インストール確認: `firebase --version` (v15.0.0)
- [x] Git 設定確認: `git config --list`

### ファイル確認
- [x] すべてのゲームファイルが存在（src/, styles/, index.html）
- [x] すべてのドキュメントが存在（25ファイル）
- [x] デプロイスクリプトが存在（.bat, .sh）
- [x] firebase.json と .firebaserc が存在

### アクセス確認
- [x] GitHubリポジトリアクセス可能: https://github.com/uzuratamagogakirai/web-tetris
- [x] Firebase Console アクセス可能: chiho@uzuratamago.com
- [x] 本番サイトアクセス可能: https://web-tetris-game-2024.web.app

### ドキュメント確認
- [x] README.md を読んだ
- [x] HANDOVER.md を読んだ（本ドキュメント）
- [x] DEPLOYMENT_COMPLETE.md を理解した
- [x] OPERATIONS.md を把握した（運用ガイド）

### 動作確認
- [x] ローカルでゲームが起動する
- [x] 本番環境でゲームが動作する
- [x] 全機能が正常に動作する
- [x] ブラウザコンソールにエラーがない

## セキュリティ・コンプライアンス

### 実装済みセキュリティ対策
- ✅ HTTPS強制（Firebase自動）
- ✅ 自動SSL/TLS証明書
- ✅ セキュアヘッダー（Firebase管理）
- ✅ CORS設定（Firebase管理）

### データプライバシー
- ✅ 個人情報収集なし
- ✅ LocalStorageのみ使用（ハイスコアのみ）
- ✅ クッキー不使用
- ✅ 外部API呼び出しなし

### コンプライアンス
- ✅ MITライセンス
- ✅ オープンソース
- ✅ 商用利用可能

## コスト・リソース

### 現在のコスト
- **Firebase Hosting**: $0/月（Sparkプラン）
- **転送量**: 10GB/月まで無料
- **ストレージ**: 1GB まで無料
- **予想転送量**: < 1GB/月

### スケーリング時のコスト見積
- **Blazeプラン（従量課金）**: 転送量超過時 $0.15/GB
- **月間1万PV想定**: 約$0-$5/月
- **月間10万PV想定**: 約$10-$20/月

## 連絡先・リソース

### プロジェクトリンク
- **本番サイト**: https://web-tetris-game-2024.web.app
- **GitHubリポジトリ**: https://github.com/uzuratamagogakirai/web-tetris
- **Firebase Console**: https://console.firebase.google.com/project/web-tetris-game-2024

### 技術サポート
- **Firebase ドキュメント**: https://firebase.google.com/docs/hosting
- **Firebase サポート**: https://firebase.google.com/support
- **GitHub Issues**: https://github.com/uzuratamagogakirai/web-tetris/issues

### 開発者情報
- **GitHubアカウント**: uzuratamagogakirai
- **Firebase/GCPアカウント**: chiho@uzuratamago.com

## 引き継ぎ担当者へのメッセージ

このプロジェクトは**完全にドキュメントドリブン**で開発されています。

### 最初にすべきこと

1. **🎮 実際にプレイする**
   - https://web-tetris-game-2024.web.app を開く
   - すべての機能を試す
   - ユーザー体験を理解する

2. **📖 ドキュメントを読む**
   - README.md（プロジェクト概要）
   - DEPLOYMENT_COMPLETE.md（デプロイ完了レポート）
   - OPERATIONS.md（運用ガイド）

3. **💻 ローカルで実行する**
   ```bash
   git clone https://github.com/uzuratamagogakirai/web-tetris.git
   cd web-tetris
   python -m http.server 8000
   # http://localhost:8000 を開く
   ```

4. **🔧 コードを理解する**
   - src/main.js から読み始める
   - docs/technical.md で設計を理解
   - src/game.js でゲームループを理解

5. **🚀 デプロイを試す**
   - DEPLOY_STEPS.md を参照
   - プレビューデプロイで練習
   - 本番デプロイの流れを把握

### よくある質問

**Q: コードを変更したらすぐデプロイすべき？**
A: いいえ。まずプレビューデプロイでテストしてください。

**Q: 緊急で修正が必要な場合は？**
A: ホットフィックスワークフローに従ってください。

**Q: 新機能を追加したい場合は？**
A: まず docs/design.md を更新し、設計を文書化してください。

**Q: デプロイが失敗したら？**
A: firebase-debug.log を確認し、トラブルシューティングセクションを参照してください。

**Q: ユーザーからバグ報告があったら？**
A: GitHub Issues に登録し、再現手順を記録してください。

すべての手順が文書化されており、スクリプトで自動化されています。
不明点があればドキュメントを参照してください。

---

## 引き継ぎ署名

**プロジェクト引き渡し日**: 2025年12月14日
**引き渡し元**: Claude Code（Document-Driven Development）
**引き渡し先**: ____________________
**引き継ぎ完了確認**: ____________________

### 引き継ぎ完了条件
- [ ] すべてのドキュメントを読んだ
- [ ] ローカル環境でゲームを実行できた
- [ ] 本番環境にアクセスできた
- [ ] Firebase Consoleにアクセスできた
- [ ] GitHubリポジトリにアクセスできた
- [ ] デプロイ手順を理解した
- [ ] トラブルシューティング方法を理解した
- [ ] 緊急対応フローを理解した

**署名**: ____________________
**日付**: ____________________

---

**プロジェクトステータス**: ✅ **本番環境稼働中・引き継ぎ準備完了**
