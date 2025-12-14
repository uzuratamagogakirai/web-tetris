# Firebase Hosting デプロイメント計画書

## 1. プロジェクト概要

### 1.1 目的
Web版テトリスゲームをFirebase Hostingで公開し、世界中からアクセス可能にする。

### 1.2 使用アカウント
- **GCPアカウント**: chiho@uzuratamago.com
- **プロジェクト名**: web-tetris（仮）
- **プロジェクトID**: web-tetris-xxxxx（Firebaseが自動生成）

### 1.3 Firebase Hostingを選択する理由
- 無料枠で十分な静的ホスティング
- グローバルCDNによる高速配信
- SSL証明書の自動発行
- カスタムドメイン対応
- 簡単なデプロイプロセス

## 2. 前提条件

### 2.1 必要なツール
- Node.js (v14以上)
- npm または yarn
- Firebase CLI
- Google Cloud Platform アカウント

### 2.2 必要な権限
- GCPプロジェクトの作成権限
- Firebase プロジェクトの作成・管理権限
- Billing アカウントへのアクセス（無料枠内でも必要）

## 3. デプロイメント手順

### フェーズ1: 環境準備

#### ステップ1: Firebase CLIのインストール
```bash
npm install -g firebase-tools
```

#### ステップ2: Firebaseへのログイン
```bash
firebase login
```
- chiho@uzuratamago.com でログイン
- 必要な権限を承認

#### ステップ3: Firebase CLIのバージョン確認
```bash
firebase --version
```

### フェーズ2: Firebaseプロジェクトの作成

#### ステップ1: GCP/Firebaseコンソールでプロジェクトを作成

**オプションA: Firebase CLIで作成**
```bash
firebase projects:create
```
- プロジェクトID: `web-tetris-game`（または類似）
- プロジェクト名: `Web Tetris Game`
- リソースロケーション: `asia-northeast1`（東京）または `us-central1`

**オプションB: Firebaseコンソールで手動作成**
1. https://console.firebase.google.com/ にアクセス
2. "プロジェクトを追加"をクリック
3. プロジェクト名を入力: `Web Tetris Game`
4. Google Analyticsを有効化（オプション）
5. リソースロケーションを選択

#### ステップ2: プロジェクト設定の確認
```bash
firebase projects:list
```

### フェーズ3: Firebase初期化

#### ステップ1: プロジェクトディレクトリでFirebase初期化
```bash
cd C:\AIプロジェクト
firebase init
```

#### ステップ2: 初期化オプションの選択
対話式プロンプトで以下を選択:
1. **機能選択**: `Hosting` を選択（スペースキーで選択、Enterで確定）
2. **プロジェクト選択**:
   - "Use an existing project" を選択
   - 作成したプロジェクトを選択
3. **公開ディレクトリ**: `.` （カレントディレクトリ）または `public`
4. **シングルページアプリケーション**: `No`
5. **GitHub自動デプロイ**: `No`（後で設定可能）

#### ステップ3: firebase.json の設定

生成された `firebase.json` を確認・編集:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "docs/**",
      "SETUP_GITHUB.md",
      "README.md"
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|html)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600"
          }
        ]
      }
    ]
  }
}
```

### フェーズ4: デプロイ前の準備

#### ステップ1: .firebaserc ファイルの確認
```json
{
  "projects": {
    "default": "web-tetris-game"
  }
}
```

#### ステップ2: デプロイ対象ファイルの確認
```bash
firebase hosting:channel:deploy preview
```
プレビューチャンネルで動作確認

#### ステップ3: 不要ファイルの除外
`.gitignore` に以下を追加（既存の場合は確認）:
```
.firebase/
firebase-debug.log
.firebaserc
```

### フェーズ5: デプロイ実行

#### ステップ1: プレビューデプロイ（推奨）
```bash
firebase hosting:channel:deploy preview
```
- 一時的なプレビューURLが発行される
- 本番環境に影響しない
- 動作確認用

#### ステップ2: 本番デプロイ
```bash
firebase deploy --only hosting
```
- 本番環境にデプロイ
- デプロイ完了後、ホスティングURLが表示される
- 通常のURL形式: `https://PROJECT_ID.web.app`

#### ステップ3: デプロイ結果の確認
```bash
firebase hosting:sites:list
```

### フェーズ6: デプロイ後の確認

#### ステップ1: 動作確認チェックリスト
- [ ] ゲームが正常に起動する
- [ ] すべてのJSファイルが読み込まれる
- [ ] CSSが正しく適用されている
- [ ] キーボード操作が機能する
- [ ] スコアが正しく表示される
- [ ] ネクスト・ホールドが表示される
- [ ] LocalStorageが機能する（ハイスコア保存）
- [ ] モバイルでも表示される

#### ステップ2: パフォーマンス確認
- [ ] ページ読み込み速度
- [ ] Canvas描画のパフォーマンス
- [ ] ネットワーク遅延

#### ステップ3: ブラウザ互換性テスト
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] モバイルブラウザ

## 4. ディレクトリ構造

デプロイ後の構造:
```
Firebase Hosting Root/
├── index.html
├── styles/
│   └── main.css
└── src/
    ├── constants.js
    ├── board.js
    ├── tetromino.js
    ├── renderer.js
    ├── input.js
    ├── score.js
    ├── game.js
    └── main.js
```

除外するファイル（firebase.jsonで設定）:
```
- docs/
- .git/
- .gitignore
- README.md
- SETUP_GITHUB.md
- firebase.json
- .firebaserc
```

## 5. コスト見積もり

### 5.1 Firebase Hosting 無料枠
- **ストレージ**: 10 GB
- **転送量**: 360 MB/日（約10.8 GB/月）
- **カスタムドメイン**: 無料
- **SSL証明書**: 無料

### 5.2 想定使用量
- **プロジェクトサイズ**: 約 50 KB（HTML, CSS, JS）
- **月間想定トラフィック**:
  - 1000ユーザー × 50KB = 50MB
  - 無料枠で十分対応可能

### 5.3 コスト
- **想定コスト**: $0（無料枠内）

## 6. カスタムドメイン設定（オプション）

### 6.1 ドメインの追加
```bash
firebase hosting:sites:create SITE_NAME
```

### 6.2 カスタムドメインの接続
1. Firebaseコンソール > Hosting > カスタムドメインを追加
2. ドメイン名を入力
3. DNS設定を更新（TXTレコードで所有権確認）
4. Aレコード/CNAMEレコードを追加
5. SSL証明書の自動発行を待つ（最大24時間）

## 7. 継続的デプロイメント（CI/CD）

### 7.1 GitHub Actionsとの連携

`.github/workflows/firebase-hosting.yml`:
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: web-tetris-game
```

### 7.2 自動デプロイの設定
```bash
firebase init hosting:github
```
- GitHubリポジトリを接続
- デプロイワークフローを自動生成

## 8. モニタリングと分析

### 8.1 Firebase Analytics（オプション）
- ユーザーエンゲージメント追跡
- ゲームプレイ統計
- デバイス・ブラウザ分布

### 8.2 Performance Monitoring
- ページ読み込み時間
- ネットワークレイテンシ
- リソース読み込み時間

## 9. トラブルシューティング

### 9.1 よくある問題

**問題1: モジュールが読み込めない**
- 原因: CORSエラー、相対パス問題
- 解決: firebase.jsonでヘッダー設定を確認

**問題2: デプロイが失敗する**
- 原因: 認証エラー、権限不足
- 解決: `firebase login --reauth` で再認証

**問題3: ページが表示されない**
- 原因: publicディレクトリの設定ミス
- 解決: firebase.jsonのpublic設定を確認

**問題4: 404エラー**
- 原因: ファイルパスの問題
- 解決: rewrites設定を追加

### 9.2 デバッグコマンド
```bash
# ローカルでホスティングをエミュレート
firebase serve

# デプロイログの確認
firebase hosting:channel:list

# プロジェクト情報の確認
firebase projects:list
```

## 10. セキュリティ考慮事項

### 10.1 Firebase Security Rules
静的ホスティングのため、特別なセキュリティルールは不要

### 10.2 ベストプラクティス
- [ ] HTTPSを強制（Firebaseがデフォルトで対応）
- [ ] 機密情報をコードに含めない
- [ ] 適切なキャッシュ設定
- [ ] Content Security Policy (CSP) ヘッダーの設定

## 11. バックアップと復旧

### 11.1 バージョン管理
Firebase Hostingは自動的に以前のバージョンを保持:
```bash
# 以前のバージョンにロールバック
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID DEST_SITE_ID:live
```

### 11.2 バックアップ戦略
- GitHubリポジトリがソースの真実
- Firebaseは配信のみ
- 必要に応じてGitタグでリリースを管理

## 12. 実行スケジュール

### タイムライン
1. **Day 1**: 環境準備（Firebase CLI インストール、認証）
2. **Day 1**: Firebaseプロジェクト作成
3. **Day 1**: Firebase初期化と設定
4. **Day 1**: プレビューデプロイとテスト
5. **Day 1**: 本番デプロイ
6. **Day 2**: 動作確認とパフォーマンステスト
7. **Day 3以降**: オプション設定（カスタムドメイン、CI/CD）

## 13. チェックリスト

### デプロイ前
- [ ] Node.jsとnpmがインストールされている
- [ ] Firebase CLIがインストールされている
- [ ] chiho@uzuratamago.comでログイン済み
- [ ] Firebaseプロジェクトが作成されている
- [ ] firebase.jsonが正しく設定されている
- [ ] ローカルでゲームが動作する

### デプロイ後
- [ ] デプロイが成功した
- [ ] ホスティングURLにアクセスできる
- [ ] すべての機能が動作する
- [ ] モバイルで表示される
- [ ] パフォーマンスが良好
- [ ] GitHubリポジトリを更新

## 14. 参考リンク

- [Firebase Hosting ドキュメント](https://firebase.google.com/docs/hosting)
- [Firebase CLI リファレンス](https://firebase.google.com/docs/cli)
- [Firebase コンソール](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

## 15. サポート連絡先

- Firebase サポート: https://firebase.google.com/support
- Firebase コミュニティ: https://firebase.google.com/community
- Stack Overflow: タグ `firebase-hosting`

## 16. 次のステップ

デプロイ完了後の改善案:
1. カスタムドメインの設定
2. Google Analyticsの統合
3. PWA（Progressive Web App）化
4. サウンドエフェクトの追加
5. マルチプレイヤー機能（Firebase Realtime Database使用）
6. ランキングシステム（Firestore使用）
