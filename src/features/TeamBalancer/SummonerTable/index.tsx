"use client";

import { useAtomValue } from "jotai/react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import { summonersAtomsAtom } from "../stores/summoner";
import { FooterRow } from "./components/FooterRow";
import { HeaderRow } from "./components/HeaderRow";
import { SummonerRow } from "./components/SummonerRow";

export const SummonerTable = () => {
  const summonersAtoms = useAtomValue(summonersAtomsAtom);

  return (
    <>
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
        <TableFooter>
          <FooterRow />
        </TableFooter>
      </Table>
    </>
  );
};
