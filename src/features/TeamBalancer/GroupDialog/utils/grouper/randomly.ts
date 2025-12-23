import { err, errAsync, ok, okAsync, type Result } from "neverthrow";
import { choice } from "@/utils/choice";
import { shuffled } from "@/utils/shuffled";
import type { Group, Grouper } from "../../types/group";
import { createTeamFromArray } from "../../types/team";
import { calcLanePoint } from "./calc-lane-point";
import { calcTeamMemberPoint } from "./calc-team-member-point";
import { combinations } from "./combinations";
import { permutations } from "./permutations";

export const groupRandomly: Grouper = (names, summoners, option) => {
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
  const teamGrouper = (blue: string[], red: string[]): Result<Group, void> => {
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
      return ok({ blue: blueTeam, red: redTeam });
    }
    return err();
  };

  for (const [blue, red] of shuffled(goodNames)) {
    const group = teamGrouper(blue, red);
    if (group.isOk()) {
      return okAsync(group.value);
    }
  }
  return errAsync();
};
