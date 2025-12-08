import { useAtom, useAtomValue } from "jotai/react";
import type { PrimitiveAtom } from "jotai/vanilla";
import { MicIcon, MicOffIcon } from "lucide-react";
import { LevelInput } from "@/components/LevelInput";
import { RankSelect } from "@/components/RankSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { roomAtom } from "../../stores/room";
import { selectionFamily } from "../../stores/selection";
import { lockedSummonerLane, type Summoner } from "../../types/summoner";
import { LanePriorityToggle } from "./LanePriorityToggle";
import type { LaneSetting } from "./LaneSettingToggle";
import { TeamSelect } from "./TeamSelect";

export const SummonerRow = ({
  summonerAtom,
  laneSetting,
}: {
  summonerAtom: PrimitiveAtom<Summoner>;
  laneSetting: LaneSetting;
}) => {
  const [summoner, setSummoner] = useAtom(summonerAtom);
  const room = useAtomValue(roomAtom);

  const [isSelected, setIsSelected] = useAtom(selectionFamily(summoner.name));

  const lockedLane = lockedSummonerLane(summoner);

  if (!room.includes(summoner.name)) {
    return undefined;
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={setIsSelected} />
      </TableCell>
      <TableCell>{summoner.name}</TableCell>
      <TableCell>
        <LevelInput
          level={summoner.level}
          onChange={(level) =>
            setSummoner((summoner) => ({ ...summoner, level }))
          }
        />
      </TableCell>
      <TableCell>
        <RankSelect
          rank={summoner.rank}
          onChange={(rank) =>
            setSummoner((summoner) => ({ ...summoner, rank }))
          }
        />
      </TableCell>

      {laneSetting !== "HIDDEN" && (
        <>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.top_priority}
              locked={lockedLane !== "UNSET" && lockedLane !== "TOP"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(top_priority) =>
                setSummoner((summoner) => ({ ...summoner, top_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.jg_priority}
              locked={lockedLane !== "UNSET" && lockedLane !== "JG"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(jg_priority) =>
                setSummoner((summoner) => ({ ...summoner, jg_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.mid_priority}
              locked={lockedLane !== "UNSET" && lockedLane !== "MID"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(mid_priority) =>
                setSummoner((summoner) => ({ ...summoner, mid_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.bot_priority}
              locked={lockedLane !== "UNSET" && lockedLane !== "BOT"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(bot_priority) =>
                setSummoner((summoner) => ({ ...summoner, bot_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.sup_priority}
              locked={lockedLane !== "UNSET" && lockedLane !== "SUP"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(sup_priority) =>
                setSummoner((summoner) => ({ ...summoner, sup_priority }))
              }
            />
          </TableCell>
        </>
      )}

      <TableCell>
        <Toggle
          className="group relative"
          onPressedChange={(is_mute) =>
            setSummoner((summoner) => ({ ...summoner, is_mute }))
          }
        >
          <MicIcon className="transition-opacity group-data-[state=on]:opacity-0" />
          <MicOffIcon className="absolute transition-opacity group-data-[state=off]:opacity-0" />
        </Toggle>
      </TableCell>
      <TableCell>
        <TeamSelect
          team={summoner.fixed_team}
          onChange={(fixed_team) =>
            setSummoner((summoner) => ({ ...summoner, fixed_team }))
          }
        />
      </TableCell>
    </TableRow>
  );
};
