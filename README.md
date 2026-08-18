# souji

本社清掃記録表 — 月次清掃チェックリストを記録する Web アプリ。

Cloudflare Pages + Pages Functions + D1 で構築。

## 構成

- `index.html` — チェックリスト画面（フロントエンド）
- `functions/api/checks/[key].js` — 月別チェック状態の取得・更新 API（`GET`/`POST` `/api/checks/:key`、`key` は `YYYY-MM` 形式）
- `migrations/` — D1 用マイグレーション（`checks` テーブル）
- `wrangler.jsonc` — Pages / D1 バインディング設定

## 開発

```bash
npm install
npm run dev
```

`http://localhost:8888` で確認できます。

## デプロイ

```bash
npm run deploy
```

Cloudflare Pages にデプロイします。D1 データベース（`souji-db`）のバインディングが必要です。
