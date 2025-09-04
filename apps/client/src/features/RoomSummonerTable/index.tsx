import { UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useRoomStore } from "@/stores/useRoomStore";
import { HeaderRow } from "./components/HeaderRow";
import { SummonerRow } from "./components/SummonerRow";
import { useSelectionStores } from "./stores/useSelectionStore";

export const RoomSummonerTable = () => {
  const names = useRoomStore(useShallow((state) => state.names));

  const selectedNames = useSelectionStores(
    useShallow((state) => state.selectedNames()),
  );

  const setSelectionNames = useSelectionStores(
    useShallow((state) => state.setNames),
  );
  useEffect(() => {
    setSelectionNames(names);
  }, [names, setSelectionNames]);

  return (
    <div className="">
      <h2 className="mb-2 flex items-center gap-2 text-xl">
        <UsersIcon className="size-5" />
        ルームサモナー
      </h2>

      <div className="mb-2">
        <Button
          disabled={selectedNames.length !== 10}
          onClick={() => alert(selectedNames)}
        >
          チームメンバー決定：{selectedNames.length}/10人
        </Button>
      </div>

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
