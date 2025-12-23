import { err, okAsync, ResultAsync } from "neverthrow";
import { choice } from "@/utils/choice";
import { shuffled } from "@/utils/shuffled";
import type { Grouper } from "../../types/group";
import { createTeamFromArray } from "../../types/team";
import { calcLanePoint } from "./calc-lane-point";
import { calcTeamMemberPoint } from "./calc-team-member-point";
import { combinations } from "./combinations";
import { permutations } from "./permutations";

export const groupRandomly: Grouper = (names, summoners, option) => {
  // チーム分け
  const goodNames = shuffled(combinations(names, 5))
    .map<[string[], string[]]>((blue) => [
      blue,
      // red-team names
      names.filter((name) => !blue.includes(name)),
    ])
    .filter(([blue, red]) => {
      const bluePoint = calcTeamMemberPoint("blue", blue, summoners);
      const redPoint = calcTeamMemberPoint("red", red, summoners);
      return bluePoint >= 0 && redPoint >= 0;
    });

  // 非考慮のときレーン分けしない
  if (option.lane === "DISABLED") {
    const [blue, red] = choice(goodNames);
    return okAsync({
      blue: createTeamFromArray(blue),
      red: createTeamFromArray(red),
    });
  }

  // レーン分け
  const groupPromises = goodNames.map(async ([blue, red]) => {
    const blueTeam = shuffled(permutations(blue))
      .map((blue) => {
        const team = createTeamFromArray(blue);
        if (team === undefined) return undefined;
        const point = calcLanePoint({ blue: team }, summoners);
        return point >= 0 ? team : undefined;
      })
      .find((team) => team !== undefined);
    const redTeam = shuffled(permutations(red))
      .map((red) => {
        const team = createTeamFromArray(red);
        if (team === undefined) return undefined;
        const point = calcLanePoint({ red: team }, summoners);
        return point >= 0 ? team : undefined;
      })
      .find((team) => team !== undefined);
    if (blueTeam && redTeam) {
      return {
        blue: blueTeam,
        red: redTeam,
      };
    }
    return undefined;
  });

  const goodGroup = ResultAsync.fromSafePromise(
    Promise.all(groupPromises),
  ).andThen((x) => {
    const group = x.find((res) => res !== undefined);
    return group ? okAsync(group) : err();
  });

  return goodGroup;
};
