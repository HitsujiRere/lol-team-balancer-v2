import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { summonersRouter } from "./routes/summoners";

if (process.env.NODE_ENV === "development") {
  env.KV.put("RIOT_API_KEY", env.RIOT_API_KEY);
}

const app = new Hono()
  .use(logger())
  .use(
    cors({
      origin: [env.CLIENT_URL],
      allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
      allowMethods: ["GET"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .get("/", (c) => {
    return c.text("Hello world!");
  })
  .route("/summoners", summonersRouter);

export default app;

export type AppType = typeof app;
