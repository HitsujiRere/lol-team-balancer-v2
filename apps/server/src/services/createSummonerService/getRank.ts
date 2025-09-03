import { joinRank, type Rank } from "@packages/models/Rank";
import type { RiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";

export const getRank = async (
  riotApi: CreateRiotApi,
  riotId: RiotId,
): Promise<Rank | undefined> => {
  const puuId = await riotApi.getPuuId(riotId);
  if (puuId === undefined) {
    return undefined;
  }

  const entries = await riotApi.getEntries(puuId);
  if (entries === undefined) {
    return undefined;
  }

  const soloRankedEntry = entries.find(
    (entry) => entry.queueType === "RANKED_SOLO_5x5",
  );
  const soloRankedRank: Rank =
    soloRankedEntry === undefined
      ? "UNRANKED"
      : joinRank(soloRankedEntry.tier, soloRankedEntry.rank);

  return soloRankedRank;
};
