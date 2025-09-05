import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { useRoomStore } from "@/stores/useRoomStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { useSelectionStores } from "../stores/useSelectionStore";
import { getOpggMultisearchLink } from "../utils/getOpggLink";

export const HeaderRow = () => {
  const isSelectedAll = useSelectionStores((state) => state.isSelectedAll());
  const changeSelectionAll = useSelectionStores((state) => state.changeAll);

  const roomNames = useRoomStore(useShallow((state) => state.names));
  const roomRiotIds = useMemo(() => {
    const getSummoner = useSummonersStore.getState().get;
    return roomNames
      .map((name) => getSummoner(name).riotId)
      .filter((riotId) => riotId !== undefined);
  }, [roomNames]);

  return (
    <TableRow>
      <TableHead>
        <Checkbox
          checked={isSelectedAll}
          onCheckedChange={changeSelectionAll}
        />
      </TableHead>
      <TableHead>
        サモナー
        <a href={getOpggMultisearchLink(roomRiotIds)} target="_blank">
          <Button variant="link" size="sm">
            OP.GG マルチサーチ
          </Button>
        </a>
      </TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};

export const columns = 5;
