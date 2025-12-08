import type { Rank } from "@/types/rank";
import type { RiotId } from "@/types/riot-id";
import type { Lane } from "../lane";
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
  fixed_team: Team;
  fixed_lane: Lane;
};
