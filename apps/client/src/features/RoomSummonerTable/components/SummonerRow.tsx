import type { Rank } from "@packages/models/Rank";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { useSelectionStores } from "../stores/useSelectionStore";
import { getOpggLink } from "../utils/getOpggLink";

export const SummonerRow = ({ name }: { name: string }) => {
  const isSelected = useSelectionStores((state) => state.isSelected(name));
  const changeSelectionWithName = useSelectionStores((state) => state.change);
  const changeSelection = useCallback(
    (checked: boolean) => changeSelectionWithName(name, checked),
    [name, changeSelectionWithName],
  );

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
        <Checkbox checked={isSelected} onCheckedChange={changeSelection} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/${summoner.iconId}.png`}
              alt="icon"
            />
            <AvatarFallback />
          </Avatar>
          {summoner.riotId === undefined ? (
            <span>{name}</span>
          ) : (
            <a href={getOpggLink(summoner.riotId)} target="_blank">
              <Button variant="link" size="sm" className="px-0">
                <span className="font-normal text-foreground">{name}</span>
              </Button>
            </a>
          )}
        </div>
      </TableCell>
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
