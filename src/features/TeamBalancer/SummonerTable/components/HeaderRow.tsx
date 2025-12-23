import { useAtom, useAtomValue } from "jotai/react";
import { CircleQuestionMarkIcon } from "lucide-react";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { laneOptionAtom } from "../../stores/group-option";
import { selectionAtom } from "../../stores/selection";
import { HeaderOpggLink } from "./HeaderOpggLink";

export const HeaderRow = () => {
  const [selection, setSelection] = useAtom(selectionAtom);
  const laneOption = useAtomValue(laneOptionAtom);

  const selectedAll = useMemo(() => {
    if (selection.values().every((select) => !select)) {
      return false;
    }
    if (selection.values().every((select) => select)) {
      return true;
    }
    return "indeterminate";
  }, [selection]);

  const handleSelectedAllChange = (selected: boolean) => {
    setSelection(
      (selection) =>
        new Map(selection.entries().map(([name, _]) => [name, selected])),
    );
  };

  return (
    <TableRow>
      <TableHead className="w-8">
        <Checkbox
          checked={selectedAll}
          onCheckedChange={handleSelectedAllChange}
        />
      </TableHead>
      <TableHead>
        <div className="flex items-center gap-4">
          <div>名前</div>
          <HeaderOpggLink />
        </div>
      </TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク/ポイント</TableHead>
      {laneOption !== "DISABLED" && (
        <>
          <TableHead>TOP</TableHead>
          <TableHead>JG</TableHead>
          <TableHead>MID</TableHead>
          <TableHead>BOT</TableHead>
          <TableHead>SUP</TableHead>
        </>
      )}
      <TableHead>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1 py-2">
            聞き専
            <CircleQuestionMarkIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>"聞き専さん"がなるべく分かれるようにチーム分けします</p>
          </TooltipContent>
        </Tooltip>
      </TableHead>
      <TableHead>チーム固定</TableHead>
    </TableRow>
  );
};
