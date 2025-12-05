import { ButtonGroup } from "@/components/ui/button-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { LANES, type Lane } from "../../types/lane";
import { TEAMS, type Team } from "../../types/team";

const formatTeamDict: Record<Team, string> = {
  UNSET: "-",
  BLUE: "Blue",
  RED: "Red",
};

const formatLaneDict: Record<Lane, string> = {
  UNSET: "-",
  TOP: "Top",
  JG: "Jg",
  MID: "Mid",
  BOT: "Bot",
  SUP: "Sup",
};

export const FixedPositionSelect = ({
  team,
  lane,
  onTeamChange,
  onLaneChange,
}: {
  team: Team;
  lane: Lane;
  onTeamChange: (team: Team) => void;
  onLaneChange: (lane: Lane) => void;
}) => {
  return (
    <ButtonGroup>
      <NativeSelect
        value={team}
        className={cn("w-24 rounded-r-none", {
          "bg-blue-200": team === "BLUE",
          "bg-red-200": team === "RED",
        })}
        onChange={(event) => onTeamChange(event.target.value as Team)}
      >
        {TEAMS.map((optionTeam) => (
          <NativeSelectOption
            key={optionTeam}
            value={optionTeam}
            className={cn({
              "bg-blue-200": optionTeam === "BLUE",
              "bg-red-200": optionTeam === "RED",
            })}
          >
            {formatTeamDict[optionTeam]}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        value={lane}
        className="w-24 rounded-l-none border-l-0"
        onChange={(event) => onLaneChange(event.target.value as Lane)}
      >
        {LANES.map((optionLane) => (
          <NativeSelectOption key={optionLane} value={optionLane}>
            {formatLaneDict[optionLane]}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </ButtonGroup>
  );
};
