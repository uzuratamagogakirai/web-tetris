# Firebase Hosting デプロイ実行手順書

このドキュメントは `docs/deployment.md` に基づいた実際の実行手順です。

## 準備完了事項 ✅

- ✅ Firebase CLI インストール済み（v15.0.0）
- ✅ firebase.json 作成済み
- ✅ .gitignore 更新済み

## 手動で実行する手順

### ステップ1: Firebaseにログイン

ターミナルで以下のコマンドを実行:

```bash
firebase login
```

- ブラウザが開きます
- **chiho@uzuratamago.com** でログイン
- 必要な権限を承認
- "Success! Logged in as chiho@uzuratamago.com" と表示されることを確認

### ステップ2: Firebaseプロジェクトを作成

#### オプションA: Firebase CLIで作成（推奨）

```bash
firebase projects:create
```

対話的に以下を入力:
- **プロジェクトID**: `web-tetris-game` （または希望のID）
- **プロジェクト表示名**: `Web Tetris Game`

#### オプションB: Webコンソールで作成

1. https://console.firebase.google.com/ にアクセス
2. chiho@uzuratamago.com でログイン
3. 「プロジェクトを追加」をクリック
4. プロジェクト名: `Web Tetris Game`
5. プロジェクトID: `web-tetris-game` （カスタマイズ可能）
6. Google Analyticsは任意（推奨: 有効化）
7. リソースロケーション: `asia-northeast1` （東京）を推奨

### ステップ3: プロジェクトリストを確認

```bash
firebase projects:list
```

作成したプロジェクトが表示されることを確認。

### ステップ4: Firebaseプロジェクトを初期化

```bash
firebase init hosting
```

対話的プロンプトで以下を選択:

1. **既存のプロジェクトを使用しますか？**: `Use an existing project`
2. **プロジェクト選択**: 作成した `web-tetris-game` を選択
3. **公開ディレクトリは？**: `.` (ドット、カレントディレクトリ)
4. **シングルページアプリとして設定しますか？**: `No`
5. **GitHub自動デプロイを設定しますか？**: `No` （後で設定可能）
6. **firebase.jsonを上書きしますか？**: `No` （既に作成済み）

### ステップ5: .firebasercファイルの確認と作成

初期化が完了すると `.firebaserc` ファイルが作成されます。
内容を確認:

```bash
cat .firebaserc
```

以下のような内容になっているはずです:
```json
{
  "projects": {
    "default": "web-tetris-game"
  }
}
```

### ステップ6: プレビューデプロイ（推奨）

本番環境に影響を与えずにテストするため、まずプレビューチャンネルにデプロイ:

```bash
firebase hosting:channel:deploy preview
```

- プレビューURLが表示されます（例: `https://web-tetris-game--preview-xxxxx.web.app`）
- このURLにアクセスしてゲームが正常に動作するか確認

### ステップ7: 動作確認チェックリスト

プレビューURLで以下を確認:

- [ ] ページが正常に読み込まれる
- [ ] ゲームボードが表示される
- [ ] Start Gameボタンが機能する
- [ ] キーボード操作が反応する
- [ ] テトリミノが表示される
- [ ] スコアが正しく表示される
- [ ] ネクスト・ホールドが表示される
- [ ] ブラウザコンソールにエラーがない

### ステップ8: 本番デプロイ

プレビューで問題がなければ、本番環境にデプロイ:

```bash
firebase deploy --only hosting
```

デプロイが完了すると、本番URLが表示されます:
- 通常のURL: `https://web-tetris-game.web.app`
- または: `https://web-tetris-game.firebaseapp.com`

### ステップ9: 本番環境の動作確認

本番URLにアクセスして、同じチェックリストで確認:

- [ ] ページが正常に読み込まれる
- [ ] ゲームが完全に動作する
- [ ] パフォーマンスが良好
- [ ] モバイルでも表示される

### ステップ10: デプロイ情報の確認

```bash
firebase hosting:sites:list
```

デプロイ済みのサイト一覧が表示されます。

## トラブルシューティング

### 問題1: ログインできない

```bash
firebase logout
firebase login --reauth
```

### 問題2: プロジェクトIDが既に使用されている

別のプロジェクトIDを選択してください:
- `web-tetris-game-2024`
- `tetris-game-chiho`
- など

### 問題3: デプロイが失敗する

権限を確認:
```bash
firebase projects:list
```

エラーログを確認:
```bash
cat firebase-debug.log
```

### 問題4: ページが404エラー

firebase.jsonの設定を確認:
- `public` が正しいディレクトリを指しているか
- `ignore` に必要なファイルが含まれていないか

## ローカルでのテスト

デプロイ前にローカルでホスティングをエミュレート:

```bash
firebase serve
```

`http://localhost:5000` でアクセスして動作確認できます。

## デプロイ後の次のステップ（オプション）

### 1. カスタムドメインの設定

Firebaseコンソール > Hosting > カスタムドメインを追加

### 2. GitHub Actionsとの連携

自動デプロイを設定:
```bash
firebase init hosting:github
```

### 3. Analytics確認

Firebaseコンソール > Analytics で使用状況を確認

### 4. Performance Monitoring

パフォーマンス監視を有効化してページ速度を追跡

## 重要な情報

### デプロイしたURL
本番: https://web-tetris-game.web.app （プロジェクトIDにより変わります）

### プロジェクト情報
- GCPアカウント: chiho@uzuratamago.com
- プロジェクトID: web-tetris-game （選択したID）
- リージョン: asia-northeast1 （推奨）

### コスト
- 無料枠内で運用可能
- ストレージ: 約50KB
- 月間想定転送量: 50MB程度
- 追加費用なし

## サポート

問題が発生した場合:
1. `docs/deployment.md` の詳細ドキュメントを確認
2. Firebase公式ドキュメント: https://firebase.google.com/docs/hosting
3. Firebase サポート: https://firebase.google.com/support

## チェックリスト

デプロイ完了後、以下を確認:

- [ ] firebase login 成功
- [ ] プロジェクト作成成功
- [ ] firebase init 完了
- [ ] .firebaserc ファイル存在
- [ ] プレビューデプロイ成功
- [ ] プレビューで動作確認完了
- [ ] 本番デプロイ成功
- [ ] 本番URLにアクセス可能
- [ ] すべての機能が動作
- [ ] GitHubリポジトリを更新

---

**次のコマンド**: 上記の手順に従って、`firebase login` から始めてください。
