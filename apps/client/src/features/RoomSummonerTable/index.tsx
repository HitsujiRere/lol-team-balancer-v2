import { UsersIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoomStore } from "@/stores/useRoomStore";

export const RoomSummonerTable = () => {
  const names = useRoomStore(useShallow((state) => state.names));

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
            {names.map((name) => (
              <TableRow key={name}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>345</TableCell>
                <TableCell>GOLD I</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
