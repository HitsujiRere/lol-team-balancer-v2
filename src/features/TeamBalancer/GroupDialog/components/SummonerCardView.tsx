import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { useAtom } from "jotai/react";
import { GripIcon, PinIcon } from "lucide-react";
import { LevelInput } from "@/components/LevelInput";
import { MuteToggle } from "@/components/MuteToggle";
import { RankSelect } from "@/components/RankSelect";
import { SummonerAvatar } from "@/components/SummonerAvatar";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { summonerFamily } from "../../stores/summoner";
import type { TeamName } from "../../types/team-name";
import { isDefaultGroupName } from "../types/group";

export const SummonerCardView = ({
  name,
  team,
  handle,
}: {
  name: string;
  team: TeamName;
  handle?: {
    ref: (element: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
  };
}) => {
  const enabled = !isDefaultGroupName(name);
  const [summoner, setSummoner] = useAtom(summonerFamily(name));

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-2 rounded-md border-2 bg-background p-2",
        {
          "border-blue-400": team === "blue",
          "border-red-400": team === "red",
        },
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Button
          ref={handle?.ref}
          variant="ghost"
          size="icon"
          className={handle ? "cursor-grabbing" : "cursor-grab"}
          {...handle?.attributes}
          {...handle?.listeners}
        >
          <GripIcon />
        </Button>
        <SummonerAvatar
          className="flex-1"
          name={enabled ? name : "?"}
          riotId={summoner.riot_id}
          iconId={summoner.icon_id}
        />
        <Toggle disabled={!enabled}>
          <PinIcon />
        </Toggle>
      </div>
      <div className="flex items-center justify-between gap-2">
        <LevelInput
          level={summoner.level}
          onChange={(level) => setSummoner((s) => ({ ...s, level }))}
          disabled={!enabled}
        />
        <RankSelect
          rank={summoner.rank}
          point={summoner.rank_point}
          onChange={(rank, rank_point) =>
            setSummoner((s) => ({ ...s, rank, rank_point }))
          }
          disabled={!enabled}
        />
        <MuteToggle
          isMute={summoner.is_mute}
          onChange={(is_mute) => setSummoner((s) => ({ ...s, is_mute }))}
          disabled={!enabled}
        />
      </div>
    </div>
  );
};
