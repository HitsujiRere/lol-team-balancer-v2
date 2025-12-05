import { splitAtom } from "jotai/utils";
import { atom } from "jotai/vanilla";
import type { Summoner } from "../types/summoner";

export const summonersAtom = atom<Summoner[]>([]);
export const summonersAtomsAtom = splitAtom(
  summonersAtom,
  (summoner) => summoner.name,
);
