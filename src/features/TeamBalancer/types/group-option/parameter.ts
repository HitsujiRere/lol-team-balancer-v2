import type { Summoner } from "../summoner";

export const PARAMETER_OPTIONS = [
  "level",
  "rank_point",
] as const satisfies (keyof Summoner)[];

export type ParameterOption = (typeof PARAMETER_OPTIONS)[number];
