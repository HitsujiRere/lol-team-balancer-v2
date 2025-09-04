import type { Rank } from "@packages/models/Rank";
import { useState } from "react";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";

export const SummonerRow = ({ name }: { name: string }) => {
  const [level, setLevel] = useState(0);
  const [rank, setRank] = useState<Rank | undefined>(undefined);
  const [mute, setMute] = useState(false);

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <LevelInput level={level} onLevelChange={setLevel} />
      </TableCell>
      <TableCell>
        <RankSelect rank={rank} onChange={setRank} />
      </TableCell>
      <TableCell>
        <MuteToggle mute={mute} onChange={setMute} />
      </TableCell>
    </TableRow>
  );
};
