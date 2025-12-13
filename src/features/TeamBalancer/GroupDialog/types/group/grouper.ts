import type { Result } from "neverthrow";
import type { Summoner } from "@/features/TeamBalancer/types/summoner";
import type { PartialGroup } from "./create";

export type Grouper = (
  names: string[],
  summoners: Map<string, Summoner>,
) => Result<PartialGroup, void>;
