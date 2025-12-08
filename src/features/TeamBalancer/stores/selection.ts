import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";

export const selectionAtom = atom<Map<string, boolean>>(new Map());
export const selectionFamily = atomFamily((name: string) =>
  atom(
    (get) => get(selectionAtom).get(name) ?? true,
    (get, set, arg: boolean) => {
      const newv = new Map(get(selectionAtom));
      newv.set(name, arg);
      set(selectionAtom, newv);
    },
  ),
);
