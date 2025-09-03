import { decodeRiotIdList } from "@packages/models/RiotId";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getSummonerRanks } from "@/application/summoners";

export const summonersRouter = new Hono().get("/rank", async (c) => {
  const riotIdsQuery = c.req.query("riot-id-list");
  if (riotIdsQuery === undefined) {
    throw new HTTPException(400, {
      message: "Query of 'riot-id-list' is not in the correct format.",
    });
  }

  const riotIds = decodeRiotIdList(riotIdsQuery);
  if (riotIds === undefined) {
    throw new HTTPException(400, {
      message: "Query of 'riot-id-list' is not in the correct format.",
    });
  }

  return c.json([...(await getSummonerRanks(riotIds))]);
});
