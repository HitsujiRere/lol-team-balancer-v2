import type { LaneOption } from "./lane";
import type { ParameterOption } from "./parameter";

export type GroupOption = {
  lane: LaneOption;
  parameter: ParameterOption;
  top_percentage: number;
};
