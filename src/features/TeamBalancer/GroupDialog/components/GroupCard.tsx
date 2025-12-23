import { useAtomValue } from "jotai/react";
import { Button } from "@/components/ui/button";
import { toOpggMultisearchLink } from "@/types/riot-id";
import { parameterOptionAtom } from "../../stores/group-option";
import { summonersAtom } from "../../stores/summoner";
import { LANE_NAMES } from "../../types/lane-name";
import { TEAM_NAMES } from "../../types/team-name";
import type { Group } from "../types/group";

export const GroupCard = ({ group }: { group: Group }) => {
  const parameterOption = useAtomValue(parameterOptionAtom);

  const summoners = useAtomValue(summonersAtom).values().toArray();
  const blueSummoners = summoners.filter(({ name }) =>
    LANE_NAMES.some((lane) => group.blue[lane] === name),
  );
  const redSummoners = summoners.filter(({ name }) =>
    LANE_NAMES.some((lane) => group.red[lane] === name),
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(
      TEAM_NAMES.map((team) => {
        const riotIds = (team === "blue" ? blueSummoners : redSummoners)
          .map(({ riot_id }) => riot_id)
          .filter((id) => id !== undefined);
        return `=== ${team === "blue" ? "Blue" : "Red"} ===
${LANE_NAMES.map((lane) => `${lane.toUpperCase()}: ${group[team][lane]}`).join("\n")}
${toOpggMultisearchLink(riotIds)}`;
      }).join("\n"),
    );
  };

  const blueSum = blueSummoners
    .map((summoner) => summoner[parameterOption])
    .reduce((sum, cur) => sum + cur, 0);
  const redSum = redSummoners
    .map((summoner) => summoner[parameterOption])
    .reduce((sum, cur) => sum + cur, 0);

  const diff = (blueSum - redSum) / 5;

  return (
    <div className="col-start-2 flex flex-col items-center gap-2 rounded-md border-2 border-border p-4">
      <div className="flex items-center gap-2">
        <div>平均差:</div>
        {diff < 0 && <div>{"<"}</div>}
        {diff === 0 && <div>おなじ！</div>}
        {diff !== 0 && (
          <div>
            {parameterOption === "level"
              ? `+Lv.${Math.abs(diff)}`
              : `+${Math.abs(diff)}pt`}
          </div>
        )}
        {diff > 0 && <div>{">"}</div>}
      </div>
      <Button variant="secondary" onClick={handleCopy}>
        コピー
      </Button>
    </div>
  );
};
