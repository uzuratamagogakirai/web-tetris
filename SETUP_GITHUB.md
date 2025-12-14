# GitHubリポジトリ作成手順

このドキュメントでは、プロジェクトをGitHubにアップロードする手順を説明します。

## 前提条件

### 1. Git設定（初回のみ）

まず、Gitのユーザー情報を設定する必要があります。

```bash
# グローバル設定（全てのリポジトリで使用）
git config --global user.name "uzuratamagogakirai"
git config --global user.email "your-email@example.com"

# または、このリポジトリのみの設定
git config user.name "uzuratamagogakirai"
git config user.email "your-email@example.com"
```

**注意**: `your-email@example.com` は実際のメールアドレスに置き換えてください。

## 方法1: GitHub CLI を使用（推奨）

### GitHub CLI のインストール

GitHub CLI がインストールされていない場合は、以下からインストールしてください。

- **Windows**: https://cli.github.com/ からインストーラーをダウンロード
- **macOS**: `brew install gh`
- **Linux**: https://github.com/cli/cli#installation

### GitHub CLI で認証

```bash
gh auth login
```

画面の指示に従って認証を完了してください。

### リポジトリを作成してプッシュ

```bash
# ファイルをコミット
git add .
git commit -m "Initial commit: Add Tetris game design documentation"

# GitHubリポジトリを作成
gh repo create uzuratamagogakirai/web-tetris --public --description "Webブラウザで遊べる一人対戦型のテトリスゲーム" --source=. --remote=origin

# プッシュ
git push -u origin main
```

## 方法2: GitHub Web UI を使用

### ステップ1: GitHubでリポジトリを作成

1. https://github.com/new にアクセス
2. 以下の情報を入力:
   - **Repository name**: `web-tetris`
   - **Description**: `Webブラウザで遊べる一人対戦型のテトリスゲーム`
   - **Public** を選択
   - **README, .gitignore, license を追加しない**（既に作成済みのため）
3. 「Create repository」をクリック

### ステップ2: ローカルリポジトリをプッシュ

GitHubで表示される指示に従って、以下のコマンドを実行:

```bash
# ファイルをコミット
git add .
git commit -m "Initial commit: Add Tetris game design documentation"

# リモートリポジトリを追加
git remote add origin https://github.com/uzuratamagogakirai/web-tetris.git

# デフォルトブランチをmainに設定（必要に応じて）
git branch -M main

# プッシュ
git push -u origin main
```

### 認証が必要な場合

初回プッシュ時に認証が求められる場合があります。

#### HTTPS を使用する場合
- **Personal Access Token (PAT)** を作成してください
- https://github.com/settings/tokens にアクセス
- "Generate new token (classic)" をクリック
- 必要な権限（repo）を選択
- 生成されたトークンをパスワードとして使用

#### SSH を使用する場合
```bash
# SSHキーを生成（既にある場合はスキップ）
ssh-keygen -t ed25519 -C "your-email@example.com"

# 公開鍵をGitHubに追加
# ~/.ssh/id_ed25519.pub の内容を https://github.com/settings/keys に追加

# リモートURLをSSHに変更
git remote set-url origin git@github.com:uzuratamagogakirai/web-tetris.git

# プッシュ
git push -u origin main
```

## 確認

リポジトリが正しく作成されたか確認:

```bash
git remote -v
```

以下のように表示されれば成功です:
```
origin  https://github.com/uzuratamagogakirai/web-tetris.git (fetch)
origin  https://github.com/uzuratamagogakirai/web-tetris.git (push)
```

GitHubのリポジトリページにアクセスして、ファイルが正しくアップロードされているか確認してください:
https://github.com/uzuratamagogakirai/web-tetris

## トラブルシューティング

### エラー: "fatal: not a git repository"
```bash
git init
```

### エラー: "Author identity unknown"
上記の「Git設定」を実行してください。

### エラー: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/uzuratamagogakirai/web-tetris.git
```

### エラー: "failed to push some refs"
```bash
# リモートの変更を取得してマージ
git pull origin main --rebase

# 再度プッシュ
git push -u origin main
```
