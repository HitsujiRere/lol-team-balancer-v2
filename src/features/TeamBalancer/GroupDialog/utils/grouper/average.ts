import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { choice } from "@/utils/choice";
import { shuffled } from "@/utils/shuffled";
import type { Group, Grouper } from "../../types/group";
import { createTeamFromArray } from "../../types/team";
import { calcLanePoint } from "./calc-lane-point";
import {
  calcMemberParameterPoint,
  calcTeamParameterPoint,
} from "./calc-parameter-point";
import { calcTeamMemberPoint } from "./calc-team-member-point";
import { combinations } from "./combinations";
import { permutations } from "./permutations";

export const groupByAverage: Grouper = (names, summoners, option) => {
  // チーム分け
  const goodNames = shuffled(combinations(names, 5))
    .map(
      (blue) =>
        [
          blue,
          // red-team names
          names.filter((name) => !blue.includes(name)),
        ] as const,
    )
    .filter(([blue, red]) => {
      const bluePoint = calcTeamMemberPoint("blue", blue, summoners);
      const redPoint = calcTeamMemberPoint("red", red, summoners);
      return bluePoint >= 0 && redPoint >= 0;
    })
    .toSorted((group1, group2) => {
      const group1point = Math.abs(
        calcMemberParameterPoint(option.parameter, group1[0], summoners) -
          calcMemberParameterPoint(option.parameter, group1[1], summoners),
      );
      const group2point = Math.abs(
        calcMemberParameterPoint(option.parameter, group2[0], summoners) -
          calcMemberParameterPoint(option.parameter, group2[1], summoners),
      );
      return group1point - group2point;
    });

  // 非考慮のときレーン分けしない
  if (option.lane === "DISABLED") {
    if (goodNames.length === 0) {
      return errAsync();
    }
    const [blue, red] = choice(
      goodNames.slice(0, (goodNames.length * option.top_percentage) / 100),
    );
    return okAsync({
      blue: createTeamFromArray(blue),
      red: createTeamFromArray(red),
    });
  }

  // レーン分け
  const teamGrouper = (blue: string[], red: string[]): Group[] => {
    const blueTeams = permutations(blue)
      .map((blue) => {
        const team = createTeamFromArray(blue);
        if (team === undefined) return undefined;
        const point = calcLanePoint({ blue: team }, summoners);
        return point >= 0 ? team : undefined;
      })
      .filter((team) => team !== undefined);
    const redTeams = permutations(red)
      .map((red) => {
        const team = createTeamFromArray(red);
        if (team === undefined) return undefined;
        const point = calcLanePoint({ red: team }, summoners);
        return point >= 0 ? team : undefined;
      })
      .filter((team) => team !== undefined);
    return blueTeams.flatMap((blue) =>
      redTeams.map((red) => ({ blue: blue, red: red })),
    );
  };

  const bestGroup = new ResultAsync(
    (async () => {
      // ブロッキングしないため
      await new Promise((r) => setTimeout(r, 0));
      const groups: Group[] = [];
      for (const [blue, red] of goodNames) {
        groups.push(...teamGrouper(blue, red));
        // 3628800 = 10!; all group permutations
        if (groups.length >= (3628800 * option.top_percentage) / 100) {
          break;
        }
      }
      if (groups.length === 0) {
        return errAsync();
      }
      groups.sort((group1, group2) => {
        const group1point = Math.abs(
          calcTeamParameterPoint(option.parameter, group1.blue, summoners) -
            calcTeamParameterPoint(option.parameter, group1.red, summoners),
        );
        const group2point = Math.abs(
          calcTeamParameterPoint(option.parameter, group2.blue, summoners) -
            calcTeamParameterPoint(option.parameter, group2.red, summoners),
        );
        return group1point - group2point;
      });
      return okAsync(choice(groups));
    })(),
  );
  return bestGroup;
};
