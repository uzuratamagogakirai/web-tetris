# Web Tetris Game

Webブラウザで遊べる一人対戦型のテトリスゲームです。

## 概要

このプロジェクトは、HTML5 Canvas APIとJavaScriptを使用して実装されたクラシックなテトリスゲームです。モダンなWebブラウザで動作し、デスクトップとモバイルの両方に対応しています。

## 特徴

- 標準的な7種類のテトリミノ（I, O, T, S, Z, J, L）
- スムーズなゲームプレイ
- レベルシステム（難易度が徐々に上昇）
- スコアリングシステム
- ネクストブロック表示
- ホールド機能
- ハイスコア記録（LocalStorage使用）

## 操作方法

### キーボード操作
- **← →** : 左右移動
- **↑** : 回転（時計回り）
- **↓** : 高速落下（ソフトドロップ）
- **スペース** : 即座に落下（ハードドロップ）
- **C** : ホールド（ブロックを保持）
- **P** : 一時停止/再開

## スコアリング

- 1ライン消去: 100点 × レベル
- 2ライン消去: 300点 × レベル
- 3ライン消去: 500点 × レベル
- 4ライン消去（テトリス）: 800点 × レベル
- ソフトドロップ: 1点/マス
- ハードドロップ: 2点/マス

## 技術スタック

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Canvas API

## プロジェクト構成

```
tetris/
├── index.html          # メインHTMLファイル
├── styles/
│   └── main.css        # スタイルシート
├── src/
│   ├── main.js         # エントリーポイント
│   ├── game.js         # ゲームループとメインロジック
│   ├── board.js        # ゲームボードの管理
│   ├── tetromino.js    # テトリミノクラス
│   ├── renderer.js     # 描画処理
│   ├── input.js        # 入力処理
│   ├── score.js        # スコア管理
│   └── constants.js    # 定数定義
└── docs/
    ├── design.md       # 基本設計書
    └── technical.md    # 技術仕様書
```

## デモ

🎮 **ライブデモ**: デプロイ準備完了（手順は [DEPLOY_STEPS.md](DEPLOY_STEPS.md) を参照）

## セットアップ

### 必要要件
- モダンWebブラウザ（Chrome, Firefox, Safari, Edge）

### ローカルで実行

1. リポジトリをクローン
```bash
git clone https://github.com/uzuratamagogakirai/web-tetris.git
cd web-tetris
```

2. HTMLファイルをブラウザで開く
```bash
# シンプルなHTTPサーバーを起動（Python使用）
python -m http.server 8000

# または、ファイルを直接開く
open index.html  # macOS
start index.html # Windows
```

3. ブラウザで `http://localhost:8000` にアクセス

## 開発

### 開発フェーズ

1. **フェーズ1**: 基本実装（ゲームボード、テトリミノ表示、基本操作）
2. **フェーズ2**: コア機能（回転、当たり判定、ライン消去、スコア）
3. **フェーズ3**: ゲーム機能（ネクスト、ホールド、レベルシステム）
4. **フェーズ4**: UI/UX改善（スタイリング、アニメーション）
5. **フェーズ5**: 最適化とテスト

### 今後の拡張機能

- サウンドエフェクト・BGM
- ゴーストピース（落下予測表示）
- ウォールキック機能
- Tスピン判定
- 難易度設定
- オンラインランキング

## ドキュメント

詳細な設計情報については、以下のドキュメントを参照してください。

- [基本設計書](docs/design.md)
- [技術仕様書](docs/technical.md)
- [デプロイメント計画書](docs/deployment.md)
- [デプロイ実行手順](DEPLOY_STEPS.md)

## デプロイメント

このプロジェクトはFirebase Hostingでデプロイできます。

### 簡単デプロイ（ヘルパースクリプト使用）

#### Windows
```bash
deploy.bat
```

#### macOS/Linux
```bash
./deploy.sh
```

ヘルパースクリプトが以下を自動でチェック:
- 環境確認（Node.js, npm, Firebase CLI）
- ファイル確認
- ログイン状態確認
- デプロイタイプ選択（プレビュー/本番/ローカルテスト）

### 手動デプロイ

```bash
# 1. Firebaseにログイン
firebase login

# 2. プロジェクトを作成（初回のみ）
firebase projects:create

# 3. Hostingを初期化（初回のみ）
firebase init hosting

# 4. プレビューデプロイ（推奨）
firebase hosting:channel:deploy preview

# 5. 本番デプロイ
firebase deploy --only hosting
```

### デプロイドキュメント

- 📝 [デプロイ実行手順](DEPLOY_STEPS.md) - ステップバイステップガイド
- ✅ [デプロイチェックリスト](DEPLOY_CHECKLIST.md) - 完全なチェックリスト
- 📋 [デプロイメント計画書](docs/deployment.md) - 詳細な計画とアーキテクチャ

## ライセンス

MIT License

## 作者

uzuratamagogakirai

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。
