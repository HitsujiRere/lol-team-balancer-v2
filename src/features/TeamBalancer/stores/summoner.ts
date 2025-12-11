import { atom } from "jotai/vanilla";
import { atomFamily } from "jotai-family";
import { createSummoner, type Summoner } from "../types/summoner";

export const summonersAtom = atom<Map<string, Summoner>>(new Map());
export const summonerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersAtom).get(name) ?? createSummoner(name, {}),
    (get, set, arg: (summoner: Summoner) => Summoner) => {
      const newv = new Map(get(summonersAtom));
      if (newv.has(name)) {
        // biome-ignore lint/style/noNonNullAssertion: nameの存在判定済み
        newv.set(name, arg(newv.get(name)!));
        set(summonersAtom, newv);
      }
    },
  ),
);
