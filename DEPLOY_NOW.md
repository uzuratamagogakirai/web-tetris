# Firebase Hosting デプロイ - 今すぐ実行

このドキュメントはDEPLOY_STEPS.mdに基づいた、今すぐ実行するための簡潔な手順です。

## 🚀 クイックスタート（5分で完了）

### ステップ1: Firebaseにログイン（必須）

**ターミナルで実行:**
```bash
firebase login
```

1. ブラウザが自動で開きます
2. **chiho@uzuratamago.com** でログイン
3. 権限を承認
4. "Success! Logged in as chiho@uzuratamago.com" と表示されればOK

### ステップ2: Firebaseプロジェクト作成

#### オプションA: Webコンソールで作成（推奨・簡単）

1. https://console.firebase.google.com/ を開く
2. chiho@uzuratamago.com でログイン
3. 「プロジェクトを追加」をクリック
4. プロジェクト名: **Web Tetris Game**
5. プロジェクトID: **web-tetris-game-2024** （または利用可能なID）
6. Google Analytics: 有効化（推奨）
7. アカウント: Default Account for Firebase
8. リソースロケーション: **asia-northeast1** (東京)
9. 「プロジェクトを作成」をクリック

**プロジェクトIDをメモ:** ___________________________

#### オプションB: CLI で作成

```bash
firebase projects:create web-tetris-game-2024
```

### ステップ3: プロジェクトを設定

ターミナルで実行:
```bash
# プロジェクトIDを確認（上記でメモしたID）
firebase projects:list

# Hostingを初期化
firebase init hosting
```

対話的プロンプトで選択:
- **既存のプロジェクト使用?** → `Use an existing project`
- **プロジェクト選択** → `web-tetris-game-2024` (作成したプロジェクト)
- **公開ディレクトリ** → `.` (ドット)
- **SPA設定** → `No`
- **GitHub自動デプロイ** → `No`
- **firebase.json上書き** → `No`

### ステップ4: デプロイ実行

```bash
# プレビューデプロイ（テスト）
firebase hosting:channel:deploy preview
```

プレビューURLが表示されます。アクセスしてゲームが動作することを確認。

**問題なければ本番デプロイ:**
```bash
firebase deploy --only hosting
```

### ステップ5: 確認

デプロイ完了！以下のURLでアクセスできます:
- https://web-tetris-game-2024.web.app
- https://web-tetris-game-2024.firebaseapp.com

## 📝 実行ログ記録

実行日時: ____________________

プロジェクトID: ____________________

本番URL: ____________________

プレビューURL: ____________________

## ⚠️ エラーが出た場合

### "project ID already exists"
別のIDを使用してください:
- `web-tetris-game-chiho`
- `tetris-game-2024`
- `uzura-tetris-game`

### "not logged in"
```bash
firebase logout
firebase login
```

### "permission denied"
プロジェクトの権限を確認。chiho@uzuratamago.comがオーナーであることを確認。

## 🎯 完了後

1. DEPLOY_CHECKLIST.md でデプロイ項目を確認
2. README.md にライブURLを追加
3. 変更をGitにコミット

## 📞 サポート

詳細な手順: [DEPLOY_STEPS.md](DEPLOY_STEPS.md)
チェックリスト: [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)
