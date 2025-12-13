import { useAtom } from "jotai/react";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { SummonerAvatar } from "@/components/SummonerAvatar";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { selectionFamily } from "../../stores/selection";
import { summonerFamily } from "../../stores/summoner";
import { lockedSummonerLane } from "../../types/summoner";
import { FetchStatusBadge } from "./FetchStatusBadge";
import { LanePriorityToggle } from "./LanePriorityToggle";
import type { LaneSetting } from "./LaneSettingToggle";
import { TeamToggle } from "./TeamToggle";

export const SummonerRow = ({
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
      <TableCell>
        <SummonerAvatar
          name={name}
          riotId={summoner.riot_id}
          iconId={summoner.icon_id}
          fallback={<FetchStatusBadge status={summoner.fetch_status} />}
        />
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
          point={summoner.rank_point}
          onChange={(rank, rank_point) =>
            setSummoner((s) => ({ ...s, rank, rank_point }))
          }
        />
      </TableCell>
      {laneSetting !== "HIDDEN" && (
        <>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.top_priority}
              locked={!!lockedLane && lockedLane !== "top"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(top_priority) =>
                setSummoner((s) => ({ ...s, top_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.jg_priority}
              locked={!!lockedLane && lockedLane !== "jg"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(jg_priority) =>
                setSummoner((s) => ({ ...s, jg_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.mid_priority}
              locked={!!lockedLane && lockedLane !== "mid"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(mid_priority) =>
                setSummoner((s) => ({ ...s, mid_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.bot_priority}
              locked={!!lockedLane && lockedLane !== "bot"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(bot_priority) =>
                setSummoner((s) => ({ ...s, bot_priority }))
              }
            />
          </TableCell>
          <TableCell>
            <LanePriorityToggle
              priority={summoner.sup_priority}
              locked={!!lockedLane && lockedLane !== "sup"}
              showDetails={laneSetting === "DETAILED"}
              onChange={(sup_priority) =>
                setSummoner((s) => ({ ...s, sup_priority }))
              }
            />
          </TableCell>
        </>
      )}
      <TableCell>
        <MuteToggle
          isMute={summoner.is_mute}
          onChange={(is_mute) => setSummoner((s) => ({ ...s, is_mute }))}
        />
      </TableCell>
      <TableCell>
        <TeamToggle
          team={summoner.fixed_team}
          onChange={(fixed_team) => setSummoner((s) => ({ ...s, fixed_team }))}
        />
      </TableCell>
    </TableRow>
  );
};
