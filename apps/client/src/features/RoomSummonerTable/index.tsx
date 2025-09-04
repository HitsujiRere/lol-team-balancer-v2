import { UsersIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useRoomStore } from "@/stores/useRoomStore";
import { HeaderRow } from "./components/HeaderRow";
import { SummonerRow } from "./components/SummonerRow";

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
            <HeaderRow />
          </TableHeader>
          <TableBody>
            {names.map((name) => (
              <SummonerRow key={name} name={name} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
