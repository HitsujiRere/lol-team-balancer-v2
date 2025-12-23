import type { Summoner } from "../../../types/summoner";
import type { TeamName } from "../../../types/team-name";

export const calcTeamMemberPoint = (
  team: TeamName,
  names: string[],
  summoners: Map<string, Summoner>,
): number => {
  let point = 0;
  names.forEach((name) => {
    const summoner = summoners.get(name);
    if (summoner !== undefined) {
      if (summoner.fixed_team !== undefined && summoner.fixed_team !== team) {
        point -= 100000;
      }
    }
  });
  return point;
};
