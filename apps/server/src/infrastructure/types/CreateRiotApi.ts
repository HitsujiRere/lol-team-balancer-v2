import type { RiotId } from "@packages/models/RiotId";
import type { Entry } from "@/models/Entry";
import type { Summoner } from "@/models/Summoner";

/**
 * RiotApiを呼ぶインターフェイス。
 */
export type CreateRiotApi = {
  getPuuId: (riotId: RiotId) => Promise<string | undefined>;
  getSummoner: (puuId: string) => Promise<Summoner | undefined>;
  getEntries: (puuId: string) => Promise<Entry[] | undefined>;
};
