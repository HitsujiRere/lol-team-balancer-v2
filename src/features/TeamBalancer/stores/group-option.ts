import { atom } from "jotai/vanilla";
import { focusAtom } from "jotai-optics";
import type { GroupOption } from "../types/group-option";

export const groupOptionAtom = atom<GroupOption>({
  lane: "DISABLED",
  parameter: "rank_point",
  top_percentage: 10,
} satisfies GroupOption);

export const laneOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("lane"),
);

export const parameterOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("parameter"),
);

export const topPercentageOptionAtom = focusAtom(groupOptionAtom, (optic) =>
  optic.prop("top_percentage"),
);
