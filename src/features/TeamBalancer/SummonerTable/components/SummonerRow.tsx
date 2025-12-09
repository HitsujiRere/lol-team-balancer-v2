import { useAtom } from "jotai/react";
import { MicIcon, MicOffIcon } from "lucide-react";
import { LevelInput } from "@/components/LevelInput";
import { RankSelect } from "@/components/RankSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { selectionFamily } from "../../stores/selection";
import { summonerFamily } from "../../stores/summoner";
import { lockedSummonerLane } from "../../types/summoner";
import { FetchStatusBadge } from "./FetchStatusBadge";
import { LanePriorityToggle } from "./LanePriorityToggle";
import type { LaneSetting } from "./LaneSettingToggle";
import { TeamSelect } from "./TeamSelect";

const SummonerRow = ({
  name,
  laneSetting,
}: {
  name: string;
  laneSetting: LaneSetting;
}) => {
  const [summoner, setSummoner] = useAtom(summonerFamily(name));

  const [isSelected, setIsSelected] = useAtom(selectionFamily(summoner.name));

  const lockedLane = lockedSummonerLane(summoner);

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={setIsSelected} />
      </TableCell>
      <TableCell>{summoner.name}</TableCell>
      <TableCell>
        <FetchStatusBadge status={summoner.fetch_status} />
      </TableCell>
      <TableCell>
        <LevelInput
          level={summoner.level}
          onChange={(level) => setSummoner((s) => ({ ...s, level }))}
        />
      </TableCell>
      <TableCell>
        <RankSelect
          rank={summoner.rank}
          onChange={(rank) => setSummoner((s) => ({ ...s, rank }))}
        />
      </TableCell>

      {laneSetting !== "HIDDEN" && (
        <>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.top_priority}
              locked={!!lockedLane && lockedLane !== "TOP"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(top_priority) =>
                setSummoner((s) => ({ ...s, top_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.jg_priority}
              locked={!!lockedLane && lockedLane !== "JG"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(jg_priority) =>
                setSummoner((s) => ({ ...s, jg_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.mid_priority}
              locked={!!lockedLane && lockedLane !== "MID"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(mid_priority) =>
                setSummoner((s) => ({ ...s, mid_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.bot_priority}
              locked={!!lockedLane && lockedLane !== "BOT"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(bot_priority) =>
                setSummoner((s) => ({ ...s, bot_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.sup_priority}
              locked={!!lockedLane && lockedLane !== "SUP"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(sup_priority) =>
                setSummoner((s) => ({ ...s, sup_priority }))
              }
            />
          </TableCell>
        </>
      )}

      <TableCell>
        <Toggle
          className="group relative"
          onPressedChange={(is_mute) => setSummoner((s) => ({ ...s, is_mute }))}
        >
          <MicIcon className="transition-opacity group-data-[state=on]:opacity-0" />
          <MicOffIcon className="absolute transition-opacity group-data-[state=off]:opacity-0" />
        </Toggle>
      </TableCell>
      <TableCell>
        <TeamSelect
          team={summoner.fixed_team}
          onChange={(fixed_team) => setSummoner((s) => ({ ...s, fixed_team }))}
        />
      </TableCell>
    </TableRow>
  );
};

export default SummonerRow;
