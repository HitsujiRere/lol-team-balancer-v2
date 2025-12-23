import type { ResultAsync } from "neverthrow";
import type { GroupOption } from "../../../types/group-option";
import type { Summoner } from "../../../types/summoner";
import type { PartialGroup } from "./create";

export type Grouper = (
  names: string[],
  summoners: Map<string, Summoner>,
  option: GroupOption,
) => ResultAsync<PartialGroup, void>;
