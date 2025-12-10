import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TeamName } from "../../types/team-name";

export const TeamCard = ({ team }: { team: TeamName }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-md border-2 p-4",
        {
          "border-blue-400 bg-blue-200": team === "blue",
          "border-red-400 bg-red-200": team === "red",
        },
      )}
    >
      <p className="text-lg">{team === "blue" ? "青チーム" : "赤チーム"}</p>
      <Button variant="secondary">コピー</Button>
    </div>
  );
};
