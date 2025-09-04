import { joinRank, type Rank } from "@packages/models/Rank";
import type { RiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";

export type Information = {
  level?: number;
  iconId?: number;
  rank?: Rank;
};

/**
 * 各種情報を取得するサービス。
 * @param riotApi RiotApiインフラ。
 * @param riotId 対象のRiotId。
 * @returns 情報が取得できたときその情報を返す。
 */
export const getInfomation = async (
  riotApi: CreateRiotApi,
  riotId: RiotId,
): Promise<Information> => {
  const puuId = await riotApi.getPuuId(riotId);
  if (puuId === undefined) {
    return {};
  }

  const getSummoner = async (): Promise<{
    level?: number;
    iconId?: number;
  }> => {
    const summoner = await riotApi.getSummoner(puuId);
    return {
      iconId: summoner?.profileIconId,
      level: summoner?.summonerLevel,
    };
  };

  const getRank = async (): Promise<Rank> => {
    const entries = await riotApi.getEntries(puuId);
    if (entries === undefined) {
      return "UNRANKED";
    }

    const soloRankedEntry = entries.find(
      (entry) => entry.queueType === "RANKED_SOLO_5x5",
    );
    if (soloRankedEntry === undefined) {
      return "UNRANKED";
    }
    return joinRank(soloRankedEntry.tier, soloRankedEntry.rank);
  };

  const [summoner, rank] = await Promise.all([getSummoner(), getRank()]);

  return {
    ...summoner,
    rank,
  };
};
