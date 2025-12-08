"use client";

import { useAtomValue } from "jotai/react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { roomAtom } from "../stores/room";
import { summonersAtom, summonersAtomsAtom } from "../stores/summoner";
import { HeaderRow } from "./components/HeaderRow";
import { SummonerRow } from "./components/SummonerRow";

export const SummonerTable = () => {
  const summonersAtoms = useAtomValue(summonersAtomsAtom);
  const summoners = useAtomValue(summonersAtom);
  const room = useAtomValue(roomAtom);

  return (
    <>
      <div className="overflow-auto">
        {summoners.map((summoner) => (
          <p key={summoner.name} className="whitespace-nowrap text-sm">
            {JSON.stringify(summoner)}
          </p>
        ))}
        <p className="text-sm">{JSON.stringify(room)}</p>
      </div>
      <div className="mb-2">
        <Button>
          <SearchIcon />
          サモナー検索
        </Button>
      </div>
      <Table>
        <TableHeader>
          <HeaderRow />
        </TableHeader>
        <TableBody>
          {summonersAtoms.map((summonerAtom) => (
            <SummonerRow key={`${summonerAtom}`} summonerAtom={summonerAtom} />
          ))}
        </TableBody>
        {/* <TableFooter>
          <FooterRow />
        </TableFooter> */}
      </Table>
    </>
  );
};
