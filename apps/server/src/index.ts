import { Hono } from "hono";
import { logger } from "hono/logger";
import { summonersRouter } from "./routes/summoners";

const app = new Hono()
  .use(logger())
  .get("/", (c) => {
    return c.text("Hello world!");
  })
  .route("/summoners", summonersRouter);

export default app;
