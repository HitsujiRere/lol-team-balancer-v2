import type { Summoner } from "./summoner";

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
