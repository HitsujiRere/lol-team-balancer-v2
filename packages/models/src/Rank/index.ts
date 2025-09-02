/**
 * ティア一覧。
 */
export const TIERS = [
  "UNRANKED",
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

/**
 * ランク数字一覧。
 */
export const RANK_NUMBERS = ["I", "II", "III", "IV"] as const;

/**
 * ティアとランク数字を合わせたランク一覧。
 */
export const RANKS = [
  "UNRANKED",
  "IRON_IV",
  "IRON_III",
  "IRON_II",
  "IRON_I",
  "BRONZE_IV",
  "BRONZE_III",
  "BRONZE_II",
  "BRONZE_I",
  "SILVER_IV",
  "SILVER_III",
  "SILVER_II",
  "SILVER_I",
  "GOLD_IV",
  "GOLD_III",
  "GOLD_II",
  "GOLD_I",
  "PLATINUM_IV",
  "PLATINUM_III",
  "PLATINUM_II",
  "PLATINUM_I",
  "EMERALD_IV",
  "EMERALD_III",
  "EMERALD_II",
  "EMERALD_I",
  "DIAMOND_IV",
  "DIAMOND_III",
  "DIAMOND_II",
  "DIAMOND_I",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

/**
 * ティア。
 */
export type Tier = (typeof TIERS)[number];

/**
 * ランク数字。
 */
export type RankNumber = (typeof RANK_NUMBERS)[number];

/**
 * ティアとランク数字を合わせたランク。
 */
export type Rank = (typeof RANKS)[number];

export {
  isBronze,
  isDiamond,
  isEmerald,
  isGold,
  isIron,
  isMasterPlus,
  isPlatinum,
  isSilver,
  isUnranked,
} from "./isTier";
export { joinRank } from "./join";
