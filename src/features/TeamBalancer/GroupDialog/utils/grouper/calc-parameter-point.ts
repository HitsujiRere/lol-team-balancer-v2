import type { ParameterOption } from "../../../types/group-option";
import { LANE_NAMES } from "../../../types/lane-name";
import type { Summoner } from "../../../types/summoner";
import type { Team } from "../../types/team";

export const calcMemberParameterPoint = (
  parameter: ParameterOption,
  names: string[],
  summoners: Map<string, Summoner>,
): number => {
  let point = 0;
  names.forEach((name) => {
    const summoner = summoners.get(name);
    if (summoner !== undefined) {
      point += parameterPoint(parameter, summoner[parameter]);
    }
  });
  return point;
};

export const calcTeamParameterPoint = (
  parameter: ParameterOption,
  team: Team,
  summoners: Map<string, Summoner>,
): number => {
  let point = 0;
  LANE_NAMES.forEach((lane) => {
    const summoner = summoners.get(team[lane]);
    if (summoner !== undefined) {
      point += parameterPoint(parameter, summoner[parameter]);
    }
  });
  return point;
};

const parameterPoint = (parameter: ParameterOption, value: number) => {
  if (parameter === "level") {
    return Math.log2(value);
  }
  return value;
};
