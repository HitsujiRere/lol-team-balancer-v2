import { Hono } from "hono";
import { logger } from "hono/logger";
import { getSummonerInfo } from "../services/get-summoner-info";

export const summonerApi = new Hono()
  .use("*", logger())
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const res = await getSummonerInfo(id);
    if (res.isOk()) {
      const value = res.value;
      return c.json(value, 200);
    } else {
      const error = res.error;
      return c.json({ message: error.message }, error.status);
    }
  });
