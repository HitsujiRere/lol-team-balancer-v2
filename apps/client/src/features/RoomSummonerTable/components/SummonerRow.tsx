import type { Rank } from "@packages/models/Rank";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSummonersStore } from "@/stores/useSummonersStore";

export const SummonerRow = ({ name }: { name: string }) => {
  const summoner = useSummonersStore(useShallow((state) => state.get(name)));
  const changeSummoner = useSummonersStore((state) => state.change);

  const changeLevel = useCallback(
    (level: number) => changeSummoner(name, { level }),
    [name, changeSummoner],
  );
  const changeRank = useCallback(
    (rank: Rank) => changeSummoner(name, { rank }),
    [name, changeSummoner],
  );
  const changeMute = useCallback(
    (isMute: boolean) => changeSummoner(name, { isMute }),
    [name, changeSummoner],
  );

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <LevelInput level={summoner.level} onLevelChange={changeLevel} />
      </TableCell>
      <TableCell>
        <RankSelect rank={summoner.rank} onChange={changeRank} />
      </TableCell>
      <TableCell>
        <MuteToggle isMute={summoner.isMute} onChange={changeMute} />
      </TableCell>
    </TableRow>
  );
};
