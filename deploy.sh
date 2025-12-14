#!/bin/bash

# Firebase Hosting デプロイヘルパースクリプト
# このスクリプトは DEPLOY_STEPS.md と docs/deployment.md に基づいています

set -e

echo "========================================="
echo "Firebase Hosting デプロイヘルパー"
echo "========================================="
echo ""

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 環境チェック関数
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 がインストールされています"
        return 0
    else
        echo -e "${RED}✗${NC} $1 がインストールされていません"
        return 1
    fi
}

# ステップ1: 環境確認
echo -e "${BLUE}[ステップ1]${NC} 環境確認中..."
echo ""

check_command node
check_command npm
check_command firebase

echo ""
echo "Firebase CLI バージョン:"
firebase --version
echo ""

# ステップ2: ファイル確認
echo -e "${BLUE}[ステップ2]${NC} ファイル確認中..."
echo ""

check_file() {
    if [ -f "$1" ] || [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 が存在します"
        return 0
    else
        echo -e "${RED}✗${NC} $1 が存在しません"
        return 1
    fi
}

check_file "index.html"
check_file "firebase.json"
check_file "src"
check_file "styles"

echo ""

# ステップ3: ログイン状態確認
echo -e "${BLUE}[ステップ3]${NC} Firebase ログイン状態確認..."
echo ""

if firebase projects:list &> /dev/null; then
    echo -e "${GREEN}✓${NC} Firebase にログイン済みです"
    echo ""
    echo "プロジェクトリスト:"
    firebase projects:list
else
    echo -e "${YELLOW}!${NC} Firebase にログインしていません"
    echo ""
    echo "以下のコマンドを実行してログインしてください:"
    echo -e "${YELLOW}firebase login${NC}"
    echo ""
    exit 1
fi

echo ""

# ステップ4: デプロイタイプ選択
echo -e "${BLUE}[ステップ4]${NC} デプロイタイプを選択してください:"
echo ""
echo "1) プレビューデプロイ（テスト用）"
echo "2) 本番デプロイ"
echo "3) ローカルでテスト（firebase serve）"
echo "4) キャンセル"
echo ""

read -p "選択してください [1-4]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}プレビューチャンネルにデプロイします...${NC}"
        echo ""
        firebase hosting:channel:deploy preview
        echo ""
        echo -e "${GREEN}✓${NC} プレビューデプロイ完了！"
        echo ""
        echo "上記のURLにアクセスして動作確認してください"
        echo "問題がなければ、本番デプロイを実行してください"
        ;;
    2)
        echo ""
        echo -e "${YELLOW}警告:${NC} 本番環境にデプロイします"
        read -p "続行しますか？ [y/N]: " confirm

        if [[ $confirm =~ ^[Yy]$ ]]; then
            echo ""
            echo -e "${BLUE}本番環境にデプロイします...${NC}"
            echo ""
            firebase deploy --only hosting
            echo ""
            echo -e "${GREEN}✓${NC} 本番デプロイ完了！"
            echo ""
            echo "デプロイが完了しました。上記のURLでアクセスできます。"
        else
            echo "デプロイをキャンセルしました"
        fi
        ;;
    3)
        echo ""
        echo -e "${BLUE}ローカルサーバーを起動します...${NC}"
        echo ""
        echo "ブラウザで http://localhost:5000 にアクセスしてください"
        echo "終了するには Ctrl+C を押してください"
        echo ""
        firebase serve
        ;;
    4)
        echo "キャンセルしました"
        exit 0
        ;;
    *)
        echo -e "${RED}無効な選択です${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}デプロイヘルパー終了${NC}"
echo -e "${GREEN}=========================================${NC}"
