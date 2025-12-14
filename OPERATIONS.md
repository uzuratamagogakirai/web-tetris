# 運用ガイド - Web Tetris Game

**作成日**: 2025年12月14日
**対象**: 運用担当者、保守担当者
**本番URL**: https://web-tetris-game-2024.web.app

---

## 運用概要

このドキュメントは、Web Tetris Gameの日常的な運用・保守・監視のためのガイドです。

### 運用責任範囲
- 本番環境の稼働監視
- ユーザー報告への対応
- 定期メンテナンス
- インシデント対応
- パフォーマンス監視

### システム構成
- **フロントエンド**: 静的HTML/CSS/JavaScript
- **ホスティング**: Firebase Hosting
- **CDN**: Firebase CDN（グローバル配信）
- **SSL/TLS**: 自動証明書（Firebase管理）
- **データストア**: ブラウザLocalStorage（ハイスコアのみ）

---

## 日常運用タスク

### 毎日の確認事項
- [ ] 本番サイトが正常にアクセスできるか確認
- [ ] Firebase Consoleでエラーログ確認
- [ ] GitHub Issuesで新規報告確認

### 毎週の確認事項
- [ ] 転送量使用状況確認（10GB制限）
- [ ] パフォーマンス指標確認
- [ ] バックアップ状態確認（Git）

### 毎月の確認事項
- [ ] 月間転送量レポート確認
- [ ] コスト確認（Sparkプランは無料）
- [ ] セキュリティアップデート確認

---

## 監視・ヘルスチェック

### 稼働確認

#### 手動ヘルスチェック
```bash
# 本番URLにアクセス
curl -I https://web-tetris-game-2024.web.app

# 期待されるレスポンス
HTTP/2 200
content-type: text/html; charset=utf-8
```

#### ブラウザでの確認
1. https://web-tetris-game-2024.web.app を開く
2. "Start Game"ボタンをクリック
3. テトリミノが表示され、操作できることを確認
4. ブラウザコンソール（F12）でエラーがないことを確認

### パフォーマンス監視

#### Firebase Hostingダッシュボード
https://console.firebase.google.com/project/web-tetris-game-2024/hosting/sites

**確認項目**:
- リクエスト数
- 転送量（10GB/月制限）
- エラー率
- レスポンスタイム

#### ブラウザパフォーマンス
Chrome DevTools > Lighthouse で確認:
- Performance: 90点以上目標
- Accessibility: 95点以上目標
- Best Practices: 90点以上目標
- SEO: 80点以上目標

---

## デプロイ運用

### 通常デプロイフロー

#### 事前準備
```bash
# Firebase認証確認
firebase login

# プロジェクト確認
firebase projects:list | grep web-tetris-game-2024
```

#### プレビューデプロイ（推奨）
```bash
# プレビューチャンネルにデプロイ
firebase hosting:channel:deploy preview --project web-tetris-game-2024

# 表示されたURLでテスト
# https://web-tetris-game-2024--preview-XXXXX.web.app
```

#### 本番デプロイ
```bash
# 本番環境にデプロイ
firebase deploy --only hosting --project web-tetris-game-2024

# デプロイ完了を確認
# Hosting URL: https://web-tetris-game-2024.web.app
```

#### デプロイ後確認
- [ ] 本番URLにアクセス
- [ ] ゲームが起動する
- [ ] 全機能が動作する
- [ ] ブラウザコンソールにエラーがない
- [ ] 各種ブラウザで動作確認（Chrome, Firefox, Safari, Edge）

### デプロイスケジュール

#### 推奨デプロイタイミング
- **平日**: 午前10時〜午後4時（ユーザー影響最小化）
- **避けるべき時間**: 深夜、週末、祝日
- **緊急時**: 即座にデプロイ可能

#### 変更管理
```bash
# 変更前
git log -1  # 最新コミット確認

# 変更後
git add .
git commit -m "説明: 変更内容"
git push origin main

# デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

---

## インシデント対応

### 緊急度分類

#### レベル1: 緊急（即座対応）
**定義**: サイトが完全にダウン、ゲームが全く動作しない
**対応時間**: 即座
**エスカレーション**: 即座に管理者に連絡

#### レベル2: 高（2時間以内）
**定義**: 一部機能が動作しない、パフォーマンス著しく低下
**対応時間**: 2時間以内
**エスカレーション**: 2時間以内に解決しない場合

#### レベル3: 中（1営業日以内）
**定義**: 軽微なバグ、特定条件下での不具合
**対応時間**: 1営業日以内
**エスカレーション**: 必要に応じて

#### レベル4: 低（1週間以内）
**定義**: 改善要望、新機能リクエスト
**対応時間**: 1週間以内
**エスカレーション**: 不要

### インシデント対応フロー

#### 1. 検知
- ユーザー報告（GitHub Issues）
- 監視アラート
- 手動確認

#### 2. 初期対応
```bash
# サイト稼働確認
curl -I https://web-tetris-game-2024.web.app

# Firebase Console確認
# https://console.firebase.google.com/project/web-tetris-game-2024

# エラーログ確認
# Firebase Console > Hosting > Usage
```

#### 3. 原因調査
- ブラウザコンソールでエラー確認
- firebase-debug.log 確認
- 最近のデプロイ履歴確認
- Git履歴確認: `git log --oneline -10`

#### 4. 対処
**選択肢A**: ロールバック
```bash
# Firebase Consoleから以前のバージョンに復元
# Hosting > History > 復元したいバージョン > ⋮ > Clone to live channel
```

**選択肢B**: ホットフィックス
```bash
# 問題を修正
# 即座にデプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

**選択肢C**: 一時無効化
```bash
# メンテナンスページに差し替え（必要に応じて）
```

#### 5. 事後対応
- インシデントレポート作成
- GitHub Issueにドキュメント化
- 再発防止策の検討

---

## トラブルシューティング

### 一般的な問題と解決策

#### 問題: サイトが表示されない

**症状**:
- https://web-tetris-game-2024.web.app にアクセスできない
- 404 Not Found エラー

**原因と対処**:
```bash
# 1. Firebase Hosting状態確認
firebase hosting:channel:list --project web-tetris-game-2024

# 2. デプロイ履歴確認
# Firebase Console > Hosting > History

# 3. 再デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

#### 問題: ゲームが動作しない

**症状**:
- Start Gameボタンをクリックしても何も起きない
- ブロックが表示されない

**原因と対処**:
```bash
# 1. ブラウザコンソール確認（F12）
# JavaScriptエラーを確認

# 2. キャッシュクリア
# ブラウザで Ctrl+Shift+R（強制リロード）

# 3. LocalStorage確認
# 開発者ツール > Application > Local Storage
# 必要に応じてクリア

# 4. 問題が解決しない場合、ロールバック検討
```

#### 問題: スコアが保存されない

**症状**:
- ハイスコアが記録されない
- リロードするとスコアが消える

**原因と対処**:
1. LocalStorageが無効（ユーザー側の問題）
   - プライベートモードを使用していないか確認
   - ブラウザ設定でLocalStorageが有効か確認

2. LocalStorageクォータ超過
   - 開発者ツール > Application > Storage で使用量確認
   - 不要データをクリア

#### 問題: デプロイが失敗する

**症状**:
- `firebase deploy` がエラーで終了
- "Permission denied" エラー

**原因と対処**:
```bash
# 1. 認証確認
firebase login --reauth

# 2. プロジェクト権限確認
firebase projects:list

# 3. firebase.json 構文確認
# JSON構文エラーがないか確認

# 4. エラーログ確認
cat firebase-debug.log

# 5. Firebase CLI更新
npm install -g firebase-tools
```

#### 問題: パフォーマンスが低下

**症状**:
- ゲームの動きが遅い
- 画面がカクつく

**原因と対処**:
1. **ブラウザ側**:
   - 他のタブを閉じる
   - ブラウザを再起動
   - ハードウェアアクセラレーションを有効化

2. **サーバー側**:
   - Firebase Hosting CDNの状態確認
   - 転送量制限に達していないか確認（10GB/月）

3. **コード最適化**（開発者対応）:
   - src/constants.js でFPS調整
   - Canvas描画の最適化

---

## バックアップ・リカバリ

### バックアップ戦略

#### ソースコード
**場所**: GitHub Repository
**URL**: https://github.com/uzuratamagogakirai/web-tetris
**頻度**: 変更のたびに自動（Git）
**保持期間**: 永続

#### デプロイ履歴
**場所**: Firebase Hosting
**URL**: https://console.firebase.google.com/project/web-tetris-game-2024/hosting/sites
**頻度**: デプロイのたびに自動
**保持期間**: 最大100バージョン

#### ユーザーデータ
**場所**: ブラウザLocalStorage（ユーザー端末）
**バックアップ**: なし（ユーザー責任）
**リカバリ**: 不可

### リカバリ手順

#### デプロイロールバック
```bash
# 方法1: Firebase Console
# 1. https://console.firebase.google.com/project/web-tetris-game-2024/hosting/sites
# 2. History タブを開く
# 3. 復元したいバージョンを選択
# 4. ⋮ > Clone to live channel

# 方法2: CLI（プロジェクトIDとバージョンIDが必要）
firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION_ID DEST_SITE_ID:live
```

#### ソースコードリカバリ
```bash
# 以前のコミットに戻す
git log --oneline -10  # コミット履歴確認
git revert <COMMIT_HASH>  # 特定コミットを取り消し
git push origin main

# 再デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

#### 完全なシステムリストア
```bash
# 1. リポジトリからクローン
git clone https://github.com/uzuratamagogakirai/web-tetris.git
cd web-tetris

# 2. Firebase認証
firebase login

# 3. 本番デプロイ
firebase deploy --only hosting --project web-tetris-game-2024
```

---

## 監視・アラート設定

### Firebase Hosting監視

#### 転送量監視
```bash
# Firebase Console で確認
# https://console.firebase.google.com/project/web-tetris-game-2024/usage

# 閾値設定
# Sparkプラン: 10GB/月
# 警告: 8GB/月（80%）
# アラート: 9.5GB/月（95%）
```

#### エラー監視
- Firebase Console > Hosting > Usage
- HTTPエラー（4xx, 5xx）の発生率
- 1%以上のエラー率で調査開始

### 外部監視サービス（オプション）

#### UptimeRobot（無料）
- URL: https://uptimerobot.com/
- 設定: https://web-tetris-game-2024.web.app
- 間隔: 5分ごと
- アラート: Email

#### Google Analytics（オプション）
- ユーザー数、PV、滞在時間
- ブラウザ、デバイス分布
- パフォーマンス指標

---

## セキュリティ運用

### 定期セキュリティチェック

#### 月次チェックリスト
- [ ] Firebase Console で不審なアクセスがないか確認
- [ ] GitHub Dependabot アラート確認
- [ ] SSL証明書の有効性確認（Firebase自動更新）
- [ ] 不正なデプロイ履歴がないか確認

#### セキュリティインシデント対応
1. **検知**: 不審なアクティビティ
2. **隔離**: 必要に応じてサイト一時停止
3. **調査**: ログ分析、影響範囲特定
4. **対処**: 脆弱性修正、再デプロイ
5. **報告**: インシデントレポート作成

### アクセス管理

#### Firebase Console アクセス
- **アカウント**: chiho@uzuratamago.com
- **ロール**: Owner
- **MFA**: 推奨（有効化を検討）

#### GitHub リポジトリアクセス
- **アカウント**: uzuratamagogakirai
- **権限**: Owner
- **2FA**: 推奨（有効化を検討）

---

## コスト管理

### 現在のコスト構造

#### Firebase Hosting - Sparkプラン（無料）
- **月額**: $0
- **転送量**: 10GB/月
- **ストレージ**: 1GB
- **カスタムドメイン**: 利用不可

#### コスト監視
```bash
# Firebase Console でコスト確認
# https://console.firebase.google.com/project/web-tetris-game-2024/usage

# 月次レポート確認
# 転送量が8GB超えたら警告
# 9.5GB超えたら緊急対応
```

### スケーリング計画

#### 転送量が上限に近づいた場合
1. **短期対策**:
   - 画像圧縮
   - キャッシュ期間延長
   - CDN最適化

2. **中期対策**:
   - Blazeプラン（従量課金）への移行検討
   - コスト: $0.15/GB（超過分のみ）

3. **長期対策**:
   - 静的アセット最適化
   - Lazy loading導入

---

## ドキュメント更新

### ドキュメント保守

#### 更新が必要なケース
- 新機能追加時
- デプロイ手順変更時
- トラブルシューティング項目追加時
- システム構成変更時

#### 更新手順
```bash
# 1. ドキュメント編集
# OPERATIONS.md, HANDOVER.md, README.md など

# 2. Git コミット
git add *.md
git commit -m "docs: ドキュメント更新"
git push origin main

# 3. GitHub で確認
# https://github.com/uzuratamagogakirai/web-tetris
```

---

## 連絡先・エスカレーション

### 技術サポート

#### Firebase サポート
- **ドキュメント**: https://firebase.google.com/docs/hosting
- **サポート**: https://firebase.google.com/support
- **Stack Overflow**: `firebase-hosting` タグ

#### GitHub Issues
- **URL**: https://github.com/uzuratamagogakirai/web-tetris/issues
- **用途**: バグ報告、機能要望

### エスカレーションパス

#### レベル1: 運用担当者
- 日常的な監視・対応
- 軽微な問題の解決

#### レベル2: 開発担当者
- コード修正が必要な問題
- 新機能追加

#### レベル3: プロジェクトマネージャー
- 重大なインシデント
- システム全体に影響する問題

---

## 付録

### 便利なコマンド集

```bash
# Firebase関連
firebase login                                    # ログイン
firebase logout                                   # ログアウト
firebase projects:list                            # プロジェクト一覧
firebase deploy --only hosting --project web-tetris-game-2024  # デプロイ
firebase hosting:channel:deploy preview           # プレビューデプロイ
firebase hosting:channel:list                     # チャンネル一覧

# Git関連
git status                                        # 状態確認
git log --oneline -10                            # 最近10件のコミット
git diff                                         # 変更差分
git add .                                        # すべての変更をステージング
git commit -m "メッセージ"                       # コミット
git push origin main                             # プッシュ
git pull origin main                             # プル

# ローカルサーバー
python -m http.server 8000                       # Pythonサーバー起動
# http://localhost:8000 でアクセス
```

### チェックリスト

#### デプロイ前チェックリスト
- [ ] ローカルでテスト完了
- [ ] Git コミット完了
- [ ] プレビューデプロイで確認
- [ ] ブラウザコンソールにエラーなし
- [ ] 全機能動作確認

#### デプロイ後チェックリスト
- [ ] 本番URLにアクセス可能
- [ ] ゲーム起動確認
- [ ] 全機能動作確認
- [ ] パフォーマンス確認
- [ ] 各種ブラウザで確認

#### 月次確認チェックリスト
- [ ] 転送量確認（10GB制限）
- [ ] エラー率確認
- [ ] パフォーマンス指標確認
- [ ] セキュリティアップデート確認
- [ ] ドキュメント更新必要性確認

---

**運用ガイド作成日**: 2025年12月14日
**最終更新日**: 2025年12月14日
**バージョン**: 1.0
**ステータス**: ✅ 本番運用中
