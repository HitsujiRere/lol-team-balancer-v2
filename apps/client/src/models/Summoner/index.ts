import type { Rank } from "@packages/models/Rank";
import type { RiotId } from "@packages/models/RiotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank?: Rank;
  isMute: boolean;
};

export { newRiotIdSummoner, newSummoner } from "./newSummoner";
