import { useAtomValue } from "jotai/react";
import { DicesIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SingleSlider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { shuffled } from "@/utils/shuffled";
import { selectionAtom } from "../stores/selection";
import { GroupTable } from "./components/GroupTable";
import { createGroup, type Group } from "./types/group";

type Parameter = "level" | "rank";

export const GroupDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const selection = useAtomValue(selectionAtom);
  const activeNames = selection
    .entries()
    .filter(([, selected]) => selected)
    .map(([name]) => name)
    .toArray();

  const [group, setGroup] = useState<Group>(createGroup());
  const [parameter, setParameter] = useState<Parameter>("rank");
  const [topPercentage, setTopPercentage] = useState(25);

  const handleGroup = () => {
    if (activeNames.length !== 10) return;

    const names = shuffled(activeNames);
    setGroup({
      blue: {
        top: names[0],
        jg: names[1],
        mid: names[2],
        bot: names[3],
        sup: names[4],
      },
      red: {
        top: names[5],
        jg: names[6],
        mid: names[7],
        bot: names[8],
        sup: names[9],
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl!">
        <DialogHeader>
          <DialogTitle>チーム分け</DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-4 flex gap-4">
            <Button onClick={handleGroup}>
              <DicesIcon />
              チーム分け
            </Button>

            <ToggleGroup
              type="single"
              variant="outline"
              value={parameter}
              onValueChange={(param) => {
                if (param !== "") {
                  setParameter(param as Parameter);
                }
              }}
            >
              <ToggleGroupItem value={"level" satisfies Parameter}>
                レベル
              </ToggleGroupItem>
              <ToggleGroupItem value={"rank" satisfies Parameter}>
                ランク
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">上位{topPercentage}%</span>
              <SingleSlider
                step={5}
                min={5}
                max={100}
                className="w-32"
                value={topPercentage}
                onValueChange={(value) => setTopPercentage(value)}
              />
            </div>
          </div>

          {activeNames.length === 10 ? (
            <GroupTable group={group} setGroup={setGroup} />
          ) : (
            <p>
              チーム分けには試合参加人数に10人が必要です: 現在
              {activeNames.length}人
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
