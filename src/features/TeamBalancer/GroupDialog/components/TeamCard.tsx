import { useAtomValue } from "jotai/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toOpggMultisearchLink } from "@/types/riot-id";
import { summonersAtom } from "../../stores/summoner";
import { LANE_NAMES } from "../../types/lane-name";
import type { TeamName } from "../../types/team-name";
import type { Team } from "../types/team";
import { sumLevel } from "../utils/sum-level";

export const TeamCard = ({ name, team }: { name: TeamName; team: Team }) => {
  // TODO: 関係のないサモナーの更新を無視するように
  const summoners = useAtomValue(summonersAtom)
    .values()
    .filter(({ name }) => LANE_NAMES.some((lane) => team[lane] === name))
    .toArray();

  const handleCopy = () => {
    const riotIds = summoners
      .map((summoner) => summoner.riot_id)
      .filter((id) => id !== undefined);
    navigator.clipboard.writeText(
      `=== ${name === "blue" ? "Blue" : "Red"} ===
${LANE_NAMES.map((lane) => `${lane.toUpperCase()}: ${team[lane]}`).join("\n")}
${toOpggMultisearchLink(riotIds)}`,
    );
  };

  const average = sumLevel(summoners) / 5;

  return (
    <div
      className={cn("flex flex-col gap-2 rounded-md border-2 p-4", {
        "border-blue-400 bg-blue-200": name === "blue",
        "border-red-400 bg-red-200": name === "red",
      })}
    >
      <div className="grid grid-cols-2 place-items-center px-12">
        <p className="text-lg">{name === "blue" ? "Blue" : "Red"}</p>
        <p>平均: Lv.{average}</p>
      </div>
      <div className="flex justify-center">
        <Button variant="secondary" onClick={handleCopy}>
          コピー
        </Button>
      </div>
    </div>
  );
};
