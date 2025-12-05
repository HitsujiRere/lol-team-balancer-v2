import { GripIcon, PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const SummonerCard = ({ team }: { team: "blue" | "red" }) => {
  return (
    <div
      className={cn("flex flex-col gap-2 rounded-md border-2 p-4", {
        "col-start-1 border-blue-400": team === "blue",
        "col-start-3 border-red-400": team === "red",
      })}
    >
      <div className="flex items-center justify-between">
        <Button variant="ghost">
          <GripIcon />
        </Button>
        <p>サモナー #JP1</p>
        <Toggle>
          <PinIcon />
        </Toggle>
      </div>
    </div>
  );
};

const LaneCard = ({ lane }: { lane: string }) => {
  return (
    <div className="col-start-2 flex flex-col items-center gap-2 rounded-md border-2 p-4">
      <p>{lane}</p>
      <p>ランク差：1pt</p>
    </div>
  );
};

export const TeamTable = () => {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button>チーム分け</Button>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="rank">ランク</ToggleGroupItem>
          <ToggleGroupItem value="level">レベル</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-flow-row-dense grid-cols-[1.5fr_1fr_1.5fr] gap-4">
        <div className="flex flex-col items-center gap-2 rounded-md border-2 border-blue-400 bg-blue-200 p-4">
          <p className="text-lg">青チーム</p>
          <Button variant="secondary">コピー</Button>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-2 border-border p-4">
          <p>平均ランク差：2pt</p>
          <Button>コピー</Button>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-2 border-red-400 bg-red-200 p-4">
          <p className="text-lg">赤チーム</p>
          <Button variant="secondary">コピー</Button>
        </div>
        <SummonerCard team="blue" />
        <SummonerCard team="blue" />
        <SummonerCard team="blue" />
        <SummonerCard team="blue" />
        <SummonerCard team="blue" />
        <SummonerCard team="red" />
        <SummonerCard team="red" />
        <SummonerCard team="red" />
        <SummonerCard team="red" />
        <SummonerCard team="red" />
        <LaneCard lane="TOP" />
        <LaneCard lane="JG" />
        <LaneCard lane="MID" />
        <LaneCard lane="BOT" />
        <LaneCard lane="SUP" />
      </div>
    </div>
  );
};
