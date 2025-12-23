import { useAtomValue } from "jotai/react";
import { useAtomCallback } from "jotai/utils";
import { DicesIcon, LoaderCircleIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SingleSlider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { debugModeAtom } from "@/stores/debug-mode";
import { groupOptionAtom } from "../stores/group-option";
import { selectionAtom } from "../stores/selection";
import { summonersAtom } from "../stores/summoner";
import { GroupTable } from "./components/GroupTable";
import type { Grouper } from "./types/group";
import { createGroup, type Group } from "./types/group";
import type { Parameter } from "./types/parameter";
import { groupRandomly } from "./utils/grouper/randomly";

export const GroupDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const debugMode = useAtomValue(debugModeAtom);
  const groupOption = useAtomValue(groupOptionAtom);

  const selection = useAtomValue(selectionAtom);
  const activeNames = selection
    .entries()
    .filter(([, selected]) => selected)
    .map(([name]) => name)
    .toArray();

  const [group, setGroup] = useState<Group>(createGroup());
  useEffect(() => {
    setGroup(createGroup());
    console.log({ activeNames });
  }, [activeNames]);

  const [isGrouping, setIsGrouping] = useState(false);
  const [parameter, setParameter] = useState<Parameter>("rank");
  const [topPercentage, setTopPercentage] = useState(25);

  const handleGroup = useAtomCallback(
    useCallback(
      (get, _set, grouper: Grouper) => async () => {
        setIsGrouping(true);
        if (activeNames.length !== 10) return;
        const summoners = get(summonersAtom);
        const group = await grouper(activeNames, summoners, groupOption);
        setGroup(createGroup(group.unwrapOr(undefined)));
        setIsGrouping(false);
      },
      [groupOption, activeNames],
    ),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl!">
        <DialogHeader>
          <DialogTitle>チーム分け</DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-4 flex gap-4">
            <Button disabled={isGrouping} onClick={handleGroup(groupRandomly)}>
              {isGrouping ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <DicesIcon />
              )}
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

            {debugMode && (
              <Button
                variant="destructive"
                disabled={isGrouping}
                onClick={handleGroup(groupRandomly)}
              >
                ランダムチーム分け
              </Button>
            )}
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
