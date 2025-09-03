import { joinRank } from "@packages/models/Rank";
import type { RiotId } from "@packages/models/RiotId";
import { getEntries } from "@/infrastructure/riot/entries";
import { getPuuId } from "@/infrastructure/riot/puuId";
import { getSummoner } from "@/infrastructure/riot/summoner";

export const getSummonerRanks = async (riotIds: RiotId[]) => {
  return Promise.all(
    riotIds.map(async (riotId) => {
      const puuId = await getPuuId(riotId);
      if (puuId === undefined) {
        return undefined;
      }

      const entries = await getEntries(puuId);
      const summoner = await getSummoner(puuId);
      if (entries === undefined || summoner === undefined) {
        return undefined;
      }

      const soloRankedEntry = entries.find(
        (entry) => entry.queueType === "RANKED_SOLO_5x5",
      );
      const soloRankedRank =
        soloRankedEntry === undefined
          ? "UNRANKED"
          : joinRank(soloRankedEntry.tier, soloRankedEntry.rank);

      return {
        riotId,
        rank: soloRankedRank,
      };
    }),
  );
};
