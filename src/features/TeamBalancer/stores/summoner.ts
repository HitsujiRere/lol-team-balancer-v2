import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";
import { createSummoner, type Summoner } from "../types/summoner";

export const summonersAtom = atom<Map<string, Summoner>>(new Map());
export const summonerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersAtom).get(name) ?? createSummoner(name, {}),
    (get, set, arg: (summoner: Summoner) => Summoner) => {
      const newv = new Map(get(summonersAtom));
      // biome-ignore lint/style/noNonNullAssertion: 常に含まれると仮定
      newv.set(name, arg(newv.get(name)!));
      set(summonersAtom, newv);
    },
  ),
);
