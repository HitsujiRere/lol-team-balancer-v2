import { formatRiotId } from "@packages/models/RiotId";
import type { CreateRiotApi } from "@/infrastructure/types/CreateRiotApi";
import type { Entry } from "@/models/Entry";
import type { Summoner } from "@/models/Summoner";

type Data = Record<
  string,
  {
    exists: boolean;
    summoner?: Summoner;
    entries?: Entry[];
  }
>;

export const createTestRiotApi = (data: Data): CreateRiotApi => {
  return {
    getPuuId: async (riotId) => {
      const puuId = formatRiotId(riotId);
      return data[puuId]?.exists ? puuId : undefined;
    },
    getSummoner: async (puuId) => {
      return data[puuId]?.summoner;
    },
    getEntries: async (puuId) => {
      return data[puuId]?.entries;
    },
  };
};
