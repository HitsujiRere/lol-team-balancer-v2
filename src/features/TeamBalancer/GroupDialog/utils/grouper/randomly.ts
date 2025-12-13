import { err, ok } from "neverthrow";
import { shuffled } from "@/utils/shuffled";
import type { Grouper } from "../../types/group";
import { createTeamFromArray } from "../../types/team";
import { calcGroupPoint } from "./calc-group-point";
import { calcTeamPoint } from "./calc-team-point";
import { combinations } from "./combinations";
import { permutations } from "./permutations";

export const groupRandomly: Grouper = (names, summoners) => {
  const goodNames = shuffled(combinations(names, 5))
    .map<[string[], string[]]>((blue) => [
      blue,
      // red-team names
      names.filter((name) => !blue.includes(name)),
    ])
    .filter(([blue, red]) => {
      const bluePoint = calcTeamPoint("blue", blue, summoners);
      const redPoint = calcTeamPoint("red", red, summoners);
      return bluePoint >= 0 && redPoint >= 0;
    });

  const goodGroup = goodNames
    .map(([blue, red]) => {
      const blueTeam = permutations(blue)
        .map((blue) => {
          const team = createTeamFromArray(blue);
          if (team === undefined) return undefined;
          const point = calcGroupPoint({ blue: team }, summoners);
          return point >= 0 ? team : undefined;
        })
        .find((team) => team !== undefined);
      const redTeam = permutations(red)
        .map((red) => {
          const team = createTeamFromArray(red);
          if (team === undefined) return undefined;
          const point = calcGroupPoint({ red: team }, summoners);
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
    })
    .find((res) => res !== undefined);

  if (goodGroup === undefined) {
    return err();
  }

  return ok(goodGroup);
};
