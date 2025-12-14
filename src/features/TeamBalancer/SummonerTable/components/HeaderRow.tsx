import { useAtom } from "jotai/react";
import { CircleQuestionMarkIcon } from "lucide-react";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { selectionAtom } from "../../stores/selection";
import { HeaderOpggLink } from "./HeaderOpggLink";
import type { LaneSetting } from "./LaneSettingToggle";

export const HeaderRow = ({ laneSetting }: { laneSetting: LaneSetting }) => {
  const [selection, setSelection] = useAtom(selectionAtom);

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
      {laneSetting !== "HIDDEN" && (
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
