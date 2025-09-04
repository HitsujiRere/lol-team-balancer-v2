import { decodeRiotIdList } from "@packages/models/RiotId";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { summonerServiceDependency } from "@/dependencies/summonerServiceDependency";

export const summonersRouter = new Hono().get("/", async (c) => {
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

  const summoerService = await summonerServiceDependency.resolve();

  return c.json([
    ...(await Promise.all(
      riotIds.map(async (riotId) => {
        const infomation = await summoerService.getInfomation(riotId);
        return { riotId, ...infomation };
      }),
    )),
  ]);
});
