import type { LaneName } from "../lane-name";
import type { Summoner } from "./summoner";

export const lockedSummonerLane = (
  summoner: Summoner,
): LaneName | undefined => {
  if (summoner.top_priority === "LOCK") {
    return "top";
  }
  if (summoner.jg_priority === "LOCK") {
    return "jg";
  }
  if (summoner.mid_priority === "LOCK") {
    return "mid";
  }
  if (summoner.bot_priority === "LOCK") {
    return "bot";
  }
  if (summoner.sup_priority === "LOCK") {
    return "sup";
  }
  return undefined;
};
