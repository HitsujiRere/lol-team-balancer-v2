import { UsersIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RoomSummonerTable = () => {
  return (
    <div>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <UsersIcon className="size-5" />
        ルームサモナー
      </h2>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>サモナー</TableHead>
              <TableHead>Lv</TableHead>
              <TableHead>ランク</TableHead>
              <TableHead>聞き専</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>リンゴ #JP1</TableCell>
              <TableCell>345</TableCell>
              <TableCell>Gold I</TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>バナナ #JP1</TableCell>
              <TableCell>234</TableCell>
              <TableCell>SILVER II</TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
