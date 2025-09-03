import { RANK_NUMBERS, TIERS } from "@packages/models/Rank";
import type { Entry } from "@/models/Entry";
import { QUEUE_TYPES } from "@/models/QueueType";

const randomBetween = (begin: number, end: number) => {
  return Math.floor(Math.random() * (end - begin)) + begin;
};

const choice = <T>(array: readonly T[]) => {
  return array[randomBetween(0, array.length)] as T;
};

export const randomEntry = (partial: Partial<Entry>): Entry => ({
  leagueId: randomBetween(0, 16 ** 4).toString(16),
  queueType: choice(QUEUE_TYPES),
  tier: choice(TIERS),
  rank: choice(RANK_NUMBERS),
  leaguePoints: randomBetween(0, 100),
  wins: randomBetween(0, 100),
  losses: randomBetween(0, 100),
  veteran: choice([true, false]),
  inactive: choice([true, false]),
  freshBlood: choice([true, false]),
  hotStreak: choice([true, false]),
  ...partial,
});
