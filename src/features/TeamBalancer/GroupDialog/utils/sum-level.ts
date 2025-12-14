import type { Summoner } from "../../types/summoner";

export const sumLevel = (summoners: readonly Summoner[]): number => {
  return summoners.map(({ level }) => level).reduce((sum, cur) => sum + cur, 0);
};
