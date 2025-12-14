# 🚀 Firebase Hostingにデプロイ - 今すぐ実行

## すべての準備が完了しています！

ドキュメント（DEPLOY_STEPS.md, DEPLOY_NOW.md）に従って、すべてのファイルを準備しました。

### 準備済み ✅

- ✅ Firebase CLI インストール済み (v15.0.0)
- ✅ firebase.json 作成済み
- ✅ .firebaserc 作成済み (プロジェクトID: web-tetris-game-2024)
- ✅ .gitignore 更新済み
- ✅ デプロイスクリプト作成済み
- ✅ すべてのゲームファイル準備完了

## 🎯 今すぐ実行する3つのステップ

### ステップ1: Firebaseプロジェクトを作成（3分）

**Webブラウザで:**
1. https://console.firebase.google.com/ を開く
2. **chiho@uzuratamago.com** でログイン
3. 「プロジェクトを追加」をクリック
4. 以下を入力:
   - **プロジェクト名**: `Web Tetris Game`
   - **プロジェクトID**: `web-tetris-game-2024`
   - **Google Analytics**: 有効化（推奨）
   - **リソースロケーション**: `asia-northeast1` (東京)
5. 「プロジェクトを作成」をクリック

**注意**: プロジェクトIDが既に使用されている場合は、別のID（例: `web-tetris-game-chiho` など）を使用し、`.firebaserc` ファイルのIDを更新してください。

### ステップ2: 自動デプロイスクリプトを実行（2分）

**Windowsターミナルで:**
```bash
setup-and-deploy.bat
```

スクリプトが自動的に:
1. Firebase にログイン（ブラウザが開きます）
2. プロジェクト存在を確認
3. ファイル構造を検証
4. デプロイタイプ選択を案内
5. デプロイ実行

**プレビューデプロイ（推奨）を選択**して、まずテスト環境で確認してください。

### ステップ3: 本番デプロイ（1分）

プレビューで問題なければ、本番デプロイ:

```bash
firebase deploy --only hosting --project web-tetris-game-2024
```

## 📱 デプロイ後のURL

デプロイが完了すると、以下のURLでアクセスできます:
- https://web-tetris-game-2024.web.app
- https://web-tetris-game-2024.firebaseapp.com

## ✅ 動作確認チェックリスト

デプロイ後、以下を確認:
- [ ] ゲームが正常に表示される
- [ ] Start Game ボタンが機能する
- [ ] テトリミノが表示され、操作できる
- [ ] スコアが正常に表示される
- [ ] ブラウザコンソールにエラーがない

詳細: [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)

## 🔧 トラブルシューティング

### プロジェクトIDが既に使用されている
.firebaserc を編集して別のIDに変更:
```json
{
  "projects": {
    "default": "web-tetris-game-chiho"
  }
}
```

### ログインできない
```bash
firebase logout
firebase login
```

### デプロイエラー
```bash
# ログを確認
cat firebase-debug.log

# プロジェクトを確認
firebase projects:list

# 権限を確認
firebase projects:list
```

## 📚 詳細ドキュメント

- [DEPLOY_NOW.md](DEPLOY_NOW.md) - クイックスタートガイド
- [DEPLOY_STEPS.md](DEPLOY_STEPS.md) - 詳細な手順
- [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md) - 完全チェックリスト
- [docs/deployment.md](docs/deployment.md) - 計画書

## 🎉 デプロイ完了後

1. README.md にライブURLを追加
2. 動作確認完了を記録
3. 変更をGitにコミット
4. 完了をチームに共有

---

**今すぐ開始**: setup-and-deploy.bat を実行してください！
