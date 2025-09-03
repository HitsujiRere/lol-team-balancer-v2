import { Hono } from "hono";
import { summonersRouter } from "./routes/summoners";

const app = new Hono()
  .get("/", (c) => {
    return c.text("Hello world!");
  })
  .route("/summoners", summonersRouter);

export default app;
