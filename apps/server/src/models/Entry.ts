import type { RankNumber, Tier } from "@packages/models/Rank";
import type { QueueType } from "./QueueType";

/**
 * リーグごとのエントリー情報。
 */
export type Entry = {
  leagueId: string;
  queueType: QueueType;
  tier: Tier;
  rank: RankNumber;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};
