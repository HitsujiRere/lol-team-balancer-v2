import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";

export const HeaderRow = () => {
  return (
    <TableRow>
      <TableHead className="w-8">
        <Checkbox />
      </TableHead>
      <TableHead>名前</TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>TOP</TableHead>
      <TableHead>JG</TableHead>
      <TableHead>MID</TableHead>
      <TableHead>BOT</TableHead>
      <TableHead>SUP</TableHead>
      <TableHead>聞き専</TableHead>
      <TableHead>チーム固定</TableHead>
      <TableHead>レーン固定</TableHead>
    </TableRow>
  );
};
