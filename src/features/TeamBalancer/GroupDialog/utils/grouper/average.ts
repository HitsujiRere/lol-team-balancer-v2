import Heap from "heap-js";
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
      goodNames.slice(0, (goodNames.length * option.top_percentage) / 100 + 1),
    );
    console.log(blue, red);
    return okAsync({
      blue: createTeamFromArray(blue),
      red: createTeamFromArray(red),
    });
  }

  // レーン分け
  const bestGroup = new ResultAsync(
    (async () => {
      // 処理が重いため一度描画する
      await new Promise((r) => setTimeout(r, 0));

      // 保持する件数
      // 3628800 = 10!; all group permutations
      const limit = Math.min(
        Math.floor((3_628_800 * option.top_percentage) / 100),
        10_000,
      );
      let allGroup = 0;

      const compare = (a: { point: number }, b: { point: number }) =>
        b.point - a.point;

      // const groups: Group[] = [];
      const groupHeap = new Heap<{ group: Group; point: number }>(compare);
      groupHeap.setLimit(limit);
      for (const [blue, red] of goodNames) {
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
        blueTeams.forEach((blue) => {
          redTeams.forEach((red) => {
            const group = { blue, red };
            const lanePoint = calcLanePoint(group, summoners);
            const blueParameter = calcTeamParameterPoint(
              option.parameter,
              blue,
              summoners,
            );
            const redParameter = calcTeamParameterPoint(
              option.parameter,
              red,
              summoners,
            );
            groupHeap.push({
              group,
              point: lanePoint - Math.abs(blueParameter - redParameter),
            });
            allGroup += 1;
          });
        });
      }

      // 最大値の修正
      if (limit > Math.floor((allGroup * option.top_percentage) / 100)) {
        groupHeap.setLimit(
          Math.floor((allGroup * option.top_percentage) / 100),
        );
      }

      if (groupHeap.size() === 0) {
        return errAsync();
      }
      return okAsync(choice(groupHeap.toArray()).group);
    })(),
  );
  return bestGroup;
};
