import type { RiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";
import { getInfomation } from "./getInfomation";

/**
 * サモナーに関するサービスを作成する。
 * @param riotApi RiotApiを呼ぶインターフェイス。
 * @returns 各サービス。
 */
export const createSummonerService = (riotApi: CreateRiotApi) => ({
  getInfomation: async (riotId: RiotId) => getInfomation(riotApi, riotId),
});

/**
 * サモナーに関するサービス。
 */
export type CreateSummonerService = ReturnType<typeof createSummonerService>;
