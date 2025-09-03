import type { RiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";
import { getRank } from "./getRank";

export const createSummonerService = (riotApi: CreateRiotApi) => ({
  getRank: async (riotId: RiotId) => getRank(riotApi, riotId),
});

export type CreateSummonerService = ReturnType<typeof createSummonerService>;
