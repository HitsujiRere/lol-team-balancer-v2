# LoL Team Balancer v2

LoLのカスタムゲームにおけるチーム分けを行うアプリケーションです。

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

### [@apps/server](apps/server/)

- APIサーバ
- Hono
- Cloudflare Workers
- Dependency Injection

### [@packages/models](packages/models/)

- clientとserverで共有するドメインモデル

### 全体

- pnpm workspace
- biome
- vitest
