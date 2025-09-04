import { formatRiotId, type RiotId } from "@packages/models/RiotId";
import type { Summoner } from ".";

export const newSummoner = (name: string): Summoner => {
  return {
    name,
    riotId: undefined,
    level: 0,
    rank: undefined,
    isMute: false,
  };
};

export const newRiotIdSummoner = (riotId: RiotId): Summoner => {
  return {
    name: formatRiotId(riotId),
    riotId,
    level: 0,
    rank: undefined,
    isMute: false,
  };
};
