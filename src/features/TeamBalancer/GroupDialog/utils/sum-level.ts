import type { Summoner } from "../../types/summoner";

export const sumLevel = (summoners: readonly Summoner[]): number => {
  return summoners
    .map((summoner) => summoner.level)
    .reduce((sum, cur) => sum + cur, 0);
};
