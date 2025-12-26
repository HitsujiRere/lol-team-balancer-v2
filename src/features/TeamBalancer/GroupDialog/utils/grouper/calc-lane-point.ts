import { LANE_NAMES } from "../../../types/lane-name";
import { lockedSummonerLane, type Summoner } from "../../../types/summoner";
import { TEAM_NAMES } from "../../../types/team-name";
import type { PartialGroup } from "../../types/group";

export const calcLanePoint = (
  group: PartialGroup,
  summoners: Map<string, Summoner>,
): number => {
  let point = 0;
  TEAM_NAMES.forEach((team) => {
    LANE_NAMES.forEach((lane) => {
      const name = group?.[team]?.[lane] ?? "";
      const summoner = summoners.get(name);
      if (summoner !== undefined) {
        const locked = lockedSummonerLane(summoner);
        if (locked !== undefined && locked !== lane) {
          point -= 100000;
        }

        if (summoner[`${lane}_priority`] === "NEVER") {
          point -= 100000;
        }

        if (summoner[`${lane}_priority`] === "HIGH") {
          point += 4;
        }
        if (summoner[`${lane}_priority`] === "MEDIUM") {
          point += 2;
        }
      }
    });
  });
  return point;
};
