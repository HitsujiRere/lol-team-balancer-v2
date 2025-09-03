import type { RiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";
import { getRank } from "./getRank";

/**
 * サモナーに関するサービスを作成する。
 * @param riotApi RiotApiを呼ぶインターフェイス。
 * @returns 各サービス。
 */
export const createSummonerService = (riotApi: CreateRiotApi) => ({
  getRank: async (riotId: RiotId) => getRank(riotApi, riotId),
});

/**
 * サモナーに関するサービス。
 */
export type CreateSummonerService = ReturnType<typeof createSummonerService>;
