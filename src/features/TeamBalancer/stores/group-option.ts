import { atom } from "jotai/vanilla";
import { focusAtom } from "jotai-optics";
import type { GroupOption } from "../types/group-option";

export const groupOptionAtom = atom<GroupOption>({
  lane: "SIMPLE",
});

export const laneOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("lane"),
);
