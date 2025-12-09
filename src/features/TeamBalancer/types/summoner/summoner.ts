import type { Rank } from "@/types/rank";
import type { RiotId } from "@/types/riot-id";
import type { FetchStatus } from "../fetch-status";
import type { Priority } from "../priority";
import type { Team } from "../team";

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
  fixed_team?: Team;
  fetch_status: FetchStatus;
  icon_id?: number;
  rank_wins?: number;
  rank_losses?: number;
};
