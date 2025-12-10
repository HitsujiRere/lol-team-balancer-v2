import { useAtomValue } from "jotai/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { selectionAtom } from "../stores/selection";
import { GroupEditor } from "./components/GroupEditor";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl!">
        <DialogHeader>
          <DialogTitle>チーム分け</DialogTitle>
        </DialogHeader>

        {activeNames.length === 10 ? (
          <GroupEditor />
        ) : (
          <div>
            <p>試合の参加人数は10人です: 現在{activeNames.length}人</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
