import type { Rank } from "@/types/rank";
import type { RiotId } from "@/types/riot-id";
import type { Lane } from "./lane";
import type { Priority } from "./priority";
import type { Team } from "./team";

export type Summoner = {
  name: string;
  riot_id?: RiotId;
  level: number;
  rank: Rank;
  top_priority: Priority;
  jg_priority: Priority;
  mid_priority: Priority;
  bot_priority: Priority;
  sup_priority: Priority;
  is_mute: boolean;
  fixed_team: Team;
  fixed_lane: Lane;
};

export const createSummoner = (
  name: string,
  init: Partial<Omit<Summoner, "name">>,
): Summoner => ({
  name,
  riot_id: init.riot_id,
  level: init.level ?? 0,
  rank: init.rank ?? "UNRANKED",
  top_priority: init.top_priority ?? "MEDIUM",
  jg_priority: init.jg_priority ?? "MEDIUM",
  mid_priority: init.mid_priority ?? "MEDIUM",
  bot_priority: init.bot_priority ?? "MEDIUM",
  sup_priority: init.sup_priority ?? "MEDIUM",
  is_mute: init.is_mute ?? false,
  fixed_team: init.fixed_team ?? "UNSET",
  fixed_lane: init.fixed_lane ?? "UNSET",
});
