import { atom } from "jotai/vanilla";
import { focusAtom } from "jotai-optics";
import type { GroupOption } from "../types/group-option";

export const groupOptionAtom = atom<GroupOption>({
  lane: "SIMPLE",
  parameter: "rank_point",
} satisfies GroupOption);

export const laneOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("lane"),
);

export const parameterOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("parameter"),
);
