import type { Lane } from "../lane";
import type { Summoner } from "./summoner";

export const lockedSummonerLane = (summoner: Summoner): Lane | undefined => {
  if (summoner.top_priority === "LOCK") {
    return "TOP";
  }
  if (summoner.jg_priority === "LOCK") {
    return "JG";
  }
  if (summoner.mid_priority === "LOCK") {
    return "MID";
  }
  if (summoner.bot_priority === "LOCK") {
    return "BOT";
  }
  if (summoner.sup_priority === "LOCK") {
    return "SUP";
  }
  return undefined;
};
