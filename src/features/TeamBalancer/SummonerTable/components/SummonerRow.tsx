import { useAtom, useAtomValue } from "jotai/react";
import type { PrimitiveAtom } from "jotai/vanilla";
import { MicIcon, MicOffIcon } from "lucide-react";
import { LevelInput } from "@/components/LevelInput";
import { RankSelect } from "@/components/RankSelect";
import { Stars } from "@/components/Stars";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { roomAtom } from "../../stores/room";
import type { Summoner } from "../../types/summoner";

export const SummonerRow = ({
  summonerAtom,
}: {
  summonerAtom: PrimitiveAtom<Summoner>;
}) => {
  const [summoner, setSummoner] = useAtom(summonerAtom);
  const room = useAtomValue(roomAtom);

  if (!room.includes(summoner.name)) {
    return undefined;
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
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
      <TableCell>
        <Stars
          size={3}
          value={summoner.top_priority}
          onChange={(top_priority) =>
            setSummoner((summoner) => ({ ...summoner, top_priority }))
          }
        />
      </TableCell>
      <TableCell>
        <Stars
          size={3}
          value={summoner.jg_priority}
          onChange={(jg_priority) =>
            setSummoner((summoner) => ({ ...summoner, jg_priority }))
          }
        />
      </TableCell>
      <TableCell>
        <Stars
          size={3}
          value={summoner.mid_priority}
          onChange={(mid_priority) =>
            setSummoner((summoner) => ({ ...summoner, mid_priority }))
          }
        />
      </TableCell>
      <TableCell>
        <Stars
          size={3}
          value={summoner.bot_priority}
          onChange={(bot_priority) =>
            setSummoner((summoner) => ({ ...summoner, bot_priority }))
          }
        />
      </TableCell>
      <TableCell>
        <Stars
          size={3}
          value={summoner.sup_priority}
          onChange={(sup_priority) =>
            setSummoner((summoner) => ({ ...summoner, sup_priority }))
          }
        />
      </TableCell>
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
        <Input
          className="w-12"
          value={summoner.fixed_team}
          onChange={(event) =>
            setSummoner((summoner) => ({
              ...summoner,
              fixed_team: event.target.value,
            }))
          }
        />
      </TableCell>
      <TableCell>
        <Input
          className="w-12"
          value={summoner.fixed_lane}
          onChange={(event) =>
            setSummoner((summoner) => ({
              ...summoner,
              fixed_lane: event.target.value,
            }))
          }
        />
      </TableCell>
    </TableRow>
  );
};
