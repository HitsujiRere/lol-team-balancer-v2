import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { useSelectionStores } from "../stores/useSelectionStore";

export const HeaderRow = () => {
  const isSelectedAll = useSelectionStores((state) => state.isSelectedAll());
  const changeSelectionAll = useSelectionStores((state) => state.changeAll);

  return (
    <TableRow>
      <TableHead>
        <Checkbox
          checked={isSelectedAll}
          onCheckedChange={changeSelectionAll}
        />
      </TableHead>
      <TableHead>サモナー</TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};

export const columns = 5;
