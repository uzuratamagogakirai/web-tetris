@echo off
REM Firebase Hosting 完全自動セットアップ&デプロイ
REM DEPLOY_STEPS.md と DEPLOY_NOW.md に基づく

setlocal enabledelayedexpansion

echo =========================================
echo Firebase Hosting 自動デプロイ
echo =========================================
echo.
echo このスクリプトはデプロイを自動化します
echo DEPLOY_STEPS.md に基づいています
echo.

REM カラー出力用
set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set BLUE=[94m
set NC=[0m

REM ステップ1: ログイン確認
echo %BLUE%[ステップ1/6]%NC% Firebase ログイン確認...
echo.

firebase projects:list >nul 2>&1
if %errorlevel% equ 0 (
    echo %GREEN%[OK]%NC% Firebase にログイン済み
    echo.
) else (
    echo %YELLOW%[!]%NC% Firebase にログインしていません
    echo.
    echo ブラウザが開きます。chiho@uzuratamago.com でログインしてください
    echo.
    pause

    firebase login

    if %errorlevel% neq 0 (
        echo %RED%[ERROR]%NC% ログインに失敗しました
        pause
        exit /b 1
    )

    echo %GREEN%[OK]%NC% ログイン成功
    echo.
)

REM ステップ2: プロジェクト確認/作成
echo %BLUE%[ステップ2/6]%NC% Firebase プロジェクト確認...
echo.

set PROJECT_ID=web-tetris-game-2024

REM プロジェクトリストを取得
firebase projects:list | findstr /C:"%PROJECT_ID%" >nul 2>&1

if %errorlevel% equ 0 (
    echo %GREEN%[OK]%NC% プロジェクト %PROJECT_ID% は既に存在します
    echo.
) else (
    echo %YELLOW%[!]%NC% プロジェクト %PROJECT_ID% が見つかりません
    echo.
    echo Webコンソールでプロジェクトを作成してください:
    echo 1. https://console.firebase.google.com/ を開く
    echo 2. chiho@uzuratamago.com でログイン
    echo 3. 「プロジェクトを追加」をクリック
    echo 4. プロジェクト名: Web Tetris Game
    echo 5. プロジェクトID: %PROJECT_ID%
    echo 6. リソースロケーション: asia-northeast1
    echo.
    echo または、CLIで作成:
    echo firebase projects:create %PROJECT_ID%
    echo.
    set /p choice="プロジェクトを作成しましたか? [y/N]: "

    if /i not "%choice%"=="y" (
        echo デプロイを中止しました
        pause
        exit /b 1
    )
)

REM ステップ3: .firebaserc 作成
echo %BLUE%[ステップ3/6]%NC% プロジェクト設定ファイル作成...
echo.

if exist ".firebaserc" (
    echo %YELLOW%[!]%NC% .firebaserc は既に存在します
    echo.
) else (
    echo { > .firebaserc
    echo   "projects": { >> .firebaserc
    echo     "default": "%PROJECT_ID%" >> .firebaserc
    echo   } >> .firebaserc
    echo } >> .firebaserc

    echo %GREEN%[OK]%NC% .firebaserc を作成しました
    echo.
)

REM ステップ4: ファイル確認
echo %BLUE%[ステップ4/6]%NC% デプロイファイル確認...
echo.

set FILES_OK=1

if exist "index.html" (
    echo %GREEN%[OK]%NC% index.html
) else (
    echo %RED%[ERROR]%NC% index.html が見つかりません
    set FILES_OK=0
)

if exist "firebase.json" (
    echo %GREEN%[OK]%NC% firebase.json
) else (
    echo %RED%[ERROR]%NC% firebase.json が見つかりません
    set FILES_OK=0
)

if exist "src" (
    echo %GREEN%[OK]%NC% src/
) else (
    echo %RED%[ERROR]%NC% src/ が見つかりません
    set FILES_OK=0
)

if exist "styles" (
    echo %GREEN%[OK]%NC% styles/
) else (
    echo %RED%[ERROR]%NC% styles/ が見つかりません
    set FILES_OK=0
)

echo.

if %FILES_OK% equ 0 (
    echo %RED%[ERROR]%NC% 必要なファイルが不足しています
    pause
    exit /b 1
)

REM ステップ5: デプロイタイプ選択
echo %BLUE%[ステップ5/6]%NC% デプロイタイプ選択...
echo.
echo 1) プレビューデプロイ（テスト用・推奨）
echo 2) 本番デプロイ
echo.

set /p deploy_type="選択してください [1-2]: "

if "%deploy_type%"=="1" (
    echo.
    echo %BLUE%プレビューチャンネルにデプロイします...%NC%
    echo.

    firebase hosting:channel:deploy preview --project %PROJECT_ID%

    if %errorlevel% equ 0 (
        echo.
        echo %GREEN%=========================================%NC%
        echo %GREEN%[SUCCESS] プレビューデプロイ完了！%NC%
        echo %GREEN%=========================================%NC%
        echo.
        echo 上記のURLにアクセスしてゲームをテストしてください
        echo 問題がなければ、本番デプロイを実行してください:
        echo.
        echo   firebase deploy --only hosting --project %PROJECT_ID%
        echo.
    ) else (
        echo %RED%[ERROR]%NC% デプロイに失敗しました
        echo.
        echo トラブルシューティング:
        echo 1. firebase projects:list でプロジェクトを確認
        echo 2. firebase-debug.log を確認
        echo 3. DEPLOY_STEPS.md を参照
        pause
        exit /b 1
    )

) else if "%deploy_type%"=="2" (
    echo.
    echo %YELLOW%警告: 本番環境にデプロイします%NC%
    set /p confirm="続行しますか？ [y/N]: "

    if /i "%confirm%"=="y" (
        echo.
        echo %BLUE%本番環境にデプロイします...%NC%
        echo.

        firebase deploy --only hosting --project %PROJECT_ID%

        if %errorlevel% equ 0 (
            echo.
            echo %GREEN%=========================================%NC%
            echo %GREEN%[SUCCESS] 本番デプロイ完了！%NC%
            echo %GREEN%=========================================%NC%
            echo.
            echo ゲームにアクセスできます:
            echo https://%PROJECT_ID%.web.app
            echo https://%PROJECT_ID%.firebaseapp.com
            echo.

            REM README更新
            echo README.mdを更新してください:
            echo デモURL: https://%PROJECT_ID%.web.app
            echo.
        ) else (
            echo %RED%[ERROR]%NC% デプロイに失敗しました
            pause
            exit /b 1
        )
    ) else (
        echo デプロイをキャンセルしました
    )

) else (
    echo %RED%無効な選択です%NC%
    pause
    exit /b 1
)

REM ステップ6: 完了
echo %BLUE%[ステップ6/6]%NC% デプロイ完了確認
echo.
echo %GREEN%全ての手順が完了しました！%NC%
echo.
echo 次のステップ:
echo 1. デプロイされたURLにアクセス
echo 2. DEPLOY_CHECKLIST.md で動作確認
echo 3. README.md にライブURLを追加
echo 4. 変更をGitにコミット
echo.
echo 詳細なチェックリスト: DEPLOY_CHECKLIST.md
echo.

pause
