import { atom } from "jotai/vanilla";
import type { LaneOption } from "../types/option";

export const laneOptionAtom = atom<LaneOption>("SIMPLE");
