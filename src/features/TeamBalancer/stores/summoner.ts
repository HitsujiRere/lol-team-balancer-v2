import { splitAtom } from "jotai/utils";
import { atomWithMutative } from "jotai-mutative";
import type { Summoner } from "../types/summoner";

export const summonersAtom = atomWithMutative<Summoner[]>([]);
export const summonersAtomsAtom = splitAtom(summonersAtom);
