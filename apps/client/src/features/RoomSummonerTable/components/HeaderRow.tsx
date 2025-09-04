import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";

export const HeaderRow = () => {
  return (
    <TableRow>
      <TableHead>
        <Checkbox />
      </TableHead>
      <TableHead>サモナー</TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};
