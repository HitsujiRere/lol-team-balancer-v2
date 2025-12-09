import { useAtomValue } from "jotai/react";
import { ScaleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roomAtom } from "../stores/room";
import { HeaderRow } from "./components/HeaderRow";
import {
  type LaneSetting,
  LaneSettingToggle,
} from "./components/LaneSettingToggle";
import { SummonerRow } from "./components/SummonerRow";
import { useFetchSummoners } from "./hooks/use-fetch-summoners";

export const SummonerTable = ({ onGrouping }: { onGrouping: () => void }) => {
  const roomNames = useAtomValue(roomAtom);

  const [laneSetting, setLaneSetting] = useState<LaneSetting>("SIMPLE");

  const fetchSummoners = useFetchSummoners();

  return (
    <>
      <div className="mb-2 flex gap-4">
        <Button onClick={onGrouping}>
          <ScaleIcon />
          チーム分け
        </Button>
        <Button onClick={fetchSummoners}>
          <SearchIcon />
          サモナー検索
        </Button>
        <LaneSettingToggle setting={laneSetting} onChange={setLaneSetting} />
      </div>
      <Table>
        <TableHeader>
          <HeaderRow laneSetting={laneSetting} />
        </TableHeader>
        <TableBody>
          {roomNames.length === 0 ? (
            <TableRow>
              <TableCell colSpan={99} className="h-32 text-center text-base">
                ロビーチャットをコピペすることで簡単に追加できます！😊
              </TableCell>
            </TableRow>
          ) : (
            roomNames.map((name) => (
              <SummonerRow key={name} name={name} laneSetting={laneSetting} />
            ))
          )}
        </TableBody>
        {/* <TableFooter>
          <FooterRow />
        </TableFooter> */}
      </Table>
    </>
  );
};
