import type { Summoner } from "../../types/summoner";

export const PARAMETERS = [
  "level",
  "rank",
] as const satisfies (keyof Summoner)[];

export type Parameter = (typeof PARAMETERS)[number];
