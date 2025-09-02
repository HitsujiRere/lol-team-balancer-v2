import type { Rank, RankNumber, Tier } from ".";
import { isMasterPlus, isUnranked } from "./isTier";

/**
 * TierとRankNumberからそれに対応したRankを作る。
 * @param tier ティア。
 * @param number ランク数字。
 * @returns 対応したランク。
 */
export const joinRank = (tier: Tier, number: RankNumber): Rank => {
  if (isMasterPlus(tier) || isUnranked(tier)) {
    return tier;
  }
  return `${tier}_${number}`;
};
