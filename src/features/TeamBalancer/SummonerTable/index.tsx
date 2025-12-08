"use client";

import { useAtomValue } from "jotai/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { summonersAtomsAtom } from "../stores/summoner";
import { HeaderRow } from "./components/HeaderRow";
import {
  type LaneSetting,
  LaneSettingToggle,
} from "./components/LaneSettingToggle";
import { SummonerRow } from "./components/SummonerRow";

export const SummonerTable = () => {
  const summonersAtoms = useAtomValue(summonersAtomsAtom);

  const [laneSetting, setLaneSetting] = useState<LaneSetting>("SIMPLE");

  return (
    <>
      <div className="mb-2 flex gap-4">
        <Button>
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
          {summonersAtoms.map((summonerAtom) => (
            <SummonerRow
              key={`${summonerAtom}`}
              summonerAtom={summonerAtom}
              laneSetting={laneSetting}
            />
          ))}
        </TableBody>
        {/* <TableFooter>
          <FooterRow />
        </TableFooter> */}
      </Table>
    </>
  );
};
