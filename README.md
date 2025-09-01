# LoL Team Balancer v2

LoLのカスタムゲームにおけるチーム分けを行うアプリケーションです．

[lol-team-balancer v1](https://github.com/HitsujiRere/lol-team-balancer)

## ビルド

APIサーバ

```
pnpm -F server build
```

## プロジェクト構成

### @apps/client

- アプリケーション
- React
- Cloudflare Pages

### [@apps/server](apps/server)

- APIサーバ
- Hono
- Cloudflare Workers

### @packages/models

- clientとserverで共有したいドメインモデル
