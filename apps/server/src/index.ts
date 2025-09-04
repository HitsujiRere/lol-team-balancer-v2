import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { summonersRouter } from "./routes/summoners";

if (process.env.NODE_ENV === "development") {
  env.KV.put("RIOT_API_KEY", env.RIOT_API_KEY);
}

const app = new Hono()
  .use(logger())
  .get("/", (c) => {
    return c.text("Hello world!");
  })
  .route("/summoners", summonersRouter);

export default app;

export type AppType = typeof app;
