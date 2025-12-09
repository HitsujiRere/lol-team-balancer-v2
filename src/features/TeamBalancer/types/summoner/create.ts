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
  fixed_team: init.fixed_team,
  fetch_status: init.fetch_status ?? "IDLE",
  icon_id: init.icon_id,
  rank_wins: init.rank_wins,
  rank_losses: init.rank_losses,
});
