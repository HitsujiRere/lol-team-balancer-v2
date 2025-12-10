import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type { LaneName } from "../../types/lane-name";
import type { TeamName } from "../../types/team-name";
import { FlippedItem } from "./FlippedItem";
import { SummonerCardView } from "./SummonerCardView";

export const SummonerCard = ({
  name,
  team,
  lane,
  noFlip,
}: {
  name: string;
  team: TeamName;
  lane: LaneName;
  noFlip?: boolean;
}) => {
  const {
    setNodeRef,
    isDragging,
    transform,
    transition,
    setActivatorNodeRef,
    attributes,
    listeners,
  } = useSortable({
    id: name,
    data: { team, lane },
  });

  return (
    <FlippedItem flipId={name} disabled={noFlip}>
      <div
        ref={setNodeRef}
        className={cn({
          "col-start-1": team === "blue",
          "col-start-3": team === "red",
          "z-10 opacity-50": isDragging,
        })}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        <SummonerCardView
          name={name}
          team={team}
          handle={{
            ref: setActivatorNodeRef,
            attributes,
            listeners,
          }}
        />
      </div>
    </FlippedItem>
  );
};
