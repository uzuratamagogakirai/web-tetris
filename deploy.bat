@echo off
REM Firebase Hosting デプロイヘルパースクリプト (Windows版)
REM このスクリプトは DEPLOY_STEPS.md と docs/deployment.md に基づいています

setlocal enabledelayedexpansion

echo =========================================
echo Firebase Hosting デプロイヘルパー
echo =========================================
echo.

REM ステップ1: 環境確認
echo [ステップ1] 環境確認中...
echo.

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Node.js がインストールされています
) else (
    echo [✗] Node.js がインストールされていません
    goto :error
)

where npm >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] npm がインストールされています
) else (
    echo [✗] npm がインストールされていません
    goto :error
)

where firebase >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Firebase CLI がインストールされています
) else (
    echo [✗] Firebase CLI がインストールされていません
    echo.
    echo Firebase CLI をインストールしてください:
    echo npm install -g firebase-tools
    goto :error
)

echo.
echo Firebase CLI バージョン:
firebase --version
echo.

REM ステップ2: ファイル確認
echo [ステップ2] ファイル確認中...
echo.

if exist "index.html" (
    echo [✓] index.html が存在します
) else (
    echo [✗] index.html が存在しません
    goto :error
)

if exist "firebase.json" (
    echo [✓] firebase.json が存在します
) else (
    echo [✗] firebase.json が存在しません
    goto :error
)

if exist "src" (
    echo [✓] src ディレクトリが存在します
) else (
    echo [✗] src ディレクトリが存在しません
    goto :error
)

if exist "styles" (
    echo [✓] styles ディレクトリが存在します
) else (
    echo [✗] styles ディレクトリが存在しません
    goto :error
)

echo.

REM ステップ3: ログイン状態確認
echo [ステップ3] Firebase ログイン状態確認...
echo.

firebase projects:list >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Firebase にログイン済みです
    echo.
    echo プロジェクトリスト:
    firebase projects:list
) else (
    echo [!] Firebase にログインしていません
    echo.
    echo 以下のコマンドを実行してログインしてください:
    echo firebase login
    echo.
    pause
    exit /b 1
)

echo.

REM ステップ4: デプロイタイプ選択
echo [ステップ4] デプロイタイプを選択してください:
echo.
echo 1) プレビューデプロイ（テスト用）
echo 2) 本番デプロイ
echo 3) ローカルでテスト（firebase serve）
echo 4) キャンセル
echo.

set /p choice="選択してください [1-4]: "

if "%choice%"=="1" goto :preview
if "%choice%"=="2" goto :production
if "%choice%"=="3" goto :serve
if "%choice%"=="4" goto :cancel
echo 無効な選択です
goto :error

:preview
echo.
echo プレビューチャンネルにデプロイします...
echo.
firebase hosting:channel:deploy preview
if %errorlevel% equ 0 (
    echo.
    echo [✓] プレビューデプロイ完了！
    echo.
    echo 上記のURLにアクセスして動作確認してください
    echo 問題がなければ、本番デプロイを実行してください
) else (
    echo デプロイに失敗しました
    goto :error
)
goto :end

:production
echo.
echo 警告: 本番環境にデプロイします
set /p confirm="続行しますか？ [y/N]: "
if /i not "%confirm%"=="y" (
    echo デプロイをキャンセルしました
    goto :end
)
echo.
echo 本番環境にデプロイします...
echo.
firebase deploy --only hosting
if %errorlevel% equ 0 (
    echo.
    echo [✓] 本番デプロイ完了！
    echo.
    echo デプロイが完了しました。上記のURLでアクセスできます。
) else (
    echo デプロイに失敗しました
    goto :error
)
goto :end

:serve
echo.
echo ローカルサーバーを起動します...
echo.
echo ブラウザで http://localhost:5000 にアクセスしてください
echo 終了するには Ctrl+C を押してください
echo.
firebase serve
goto :end

:cancel
echo キャンセルしました
goto :end

:error
echo.
echo エラーが発生しました
pause
exit /b 1

:end
echo.
echo =========================================
echo デプロイヘルパー終了
echo =========================================
pause
