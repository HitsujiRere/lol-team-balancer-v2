import { useAtomValue } from "jotai/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatRank, pointToRank } from "@/types/rank";
import { toOpggMultisearchLink } from "@/types/riot-id";
import { parameterOptionAtom } from "../../stores/group-option";
import { summonersAtom } from "../../stores/summoner";
import { LANE_NAMES } from "../../types/lane-name";
import type { TeamName } from "../../types/team-name";
import type { Team } from "../types/team";

export const TeamCard = ({ name, team }: { name: TeamName; team: Team }) => {
  const parameterOption = useAtomValue(parameterOptionAtom);

  // TODO: 関係のないサモナーの更新を無視するように
  const summoners = useAtomValue(summonersAtom)
    .values()
    .filter(({ name }) => LANE_NAMES.some((lane) => team[lane] === name))
    .toArray();

  const handleCopy = () => {
    const riotIds = summoners
      .map(({ riot_id }) => riot_id)
      .filter((id) => id !== undefined);
    navigator.clipboard.writeText(
      `=== ${name === "blue" ? "Blue" : "Red"} ===
${LANE_NAMES.map((lane) => `${lane.toUpperCase()}: ${team[lane]}`).join("\n")}
${toOpggMultisearchLink(riotIds)}`,
    );
  };

  const average =
    summoners
      .map((summoner) => summoner[parameterOption])
      .reduce((sum, cur) => sum + cur, 0) / 5;

  return (
    <div
      className={cn("flex flex-col gap-2 rounded-md border-2 p-4", {
        "col-start-1 border-blue-400 bg-blue-200": name === "blue",
        "col-start-3 border-red-400 bg-red-200": name === "red",
      })}
    >
      <div className="grid grid-cols-[1fr_2fr] place-items-center">
        <div className="text-lg">{name === "blue" ? "Blue" : "Red"}</div>
        <div className="flex flex-col items-center gap-2">
          <div>
            平均:
            {parameterOption === "level"
              ? `Lv.${average}`
              : `${average}pt (${formatRank(pointToRank(average))})`}
          </div>
          <Button variant="secondary" onClick={handleCopy}>
            コピー
          </Button>
        </div>
      </div>
    </div>
  );
};
