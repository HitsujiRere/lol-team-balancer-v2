import { useAtom } from "jotai/react";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { selectionAtom } from "../../stores/selection";
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
      <TableHead>名前</TableHead>
      <TableHead className="w-8" />
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      {laneSetting !== "HIDDEN" && (
        <>
          <TableHead>TOP</TableHead>
          <TableHead>JG</TableHead>
          <TableHead>MID</TableHead>
          <TableHead>BOT</TableHead>
          <TableHead>SUP</TableHead>
        </>
      )}
      <TableHead>聞き専</TableHead>
      <TableHead>チーム固定</TableHead>
    </TableRow>
  );
};
