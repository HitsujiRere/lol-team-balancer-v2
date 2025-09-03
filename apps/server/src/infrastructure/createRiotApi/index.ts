import { env } from "cloudflare:workers";
import type { CreateRiotApi } from "../types/CreateRiotApi";
import { getEntries } from "./getEntries";
import { getPuuId } from "./getPuuId";
import { getSummoner } from "./getSummoner";

export const createRiotApi = (): CreateRiotApi => {
  const riotApiKey = env.RIOT_API_KEY;

  return {
    getPuuId: (riotId) => getPuuId(riotApiKey, riotId),
    getSummoner: (puuId) => getSummoner(riotApiKey, puuId),
    getEntries: (puuId) => getEntries(riotApiKey, puuId),
  };
};
