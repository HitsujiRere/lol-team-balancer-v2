import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripIcon, PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import type { TeamName } from "../../types/team-name";

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
  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-md border-2 bg-primary-foreground p-4",
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
        <p>{name} #JP1</p>
        <Toggle>
          <PinIcon />
        </Toggle>
      </div>
    </div>
  );
};
