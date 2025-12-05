import type { Rank } from "@/types/rank";
import type { RiotId } from "@/types/riot-id";

export type Summoner = {
  name: string;
  riot_id?: RiotId;
  level: number;
  rank: Rank;
  top_priority: number;
  jg_priority: number;
  mid_priority: number;
  bot_priority: number;
  sup_priority: number;
  is_mute: boolean;
  fixed_team: string;
  fixed_lane: string;
};

export const createSummoner = (
  name: string,
  init: Partial<Omit<Summoner, "name">>,
): Summoner => ({
  name,
  riot_id: init.riot_id,
  level: init.level ?? 0,
  rank: init.rank ?? "UNRANKED",
  top_priority: init.top_priority ?? 0,
  jg_priority: init.jg_priority ?? 0,
  mid_priority: init.mid_priority ?? 0,
  bot_priority: init.bot_priority ?? 0,
  sup_priority: init.sup_priority ?? 0,
  is_mute: init.is_mute ?? false,
  fixed_team: init.fixed_team ?? "青",
  fixed_lane: init.fixed_lane ?? "Top",
});
