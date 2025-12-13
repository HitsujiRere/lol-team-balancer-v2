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
      if (summoner.fixed_team !== undefined) {
        console.log(name, summoner.fixed_team);
      }
      if (summoner.fixed_team !== undefined && summoner.fixed_team !== team) {
        point -= 1000;
      }
    }
  });
  return point;
};
