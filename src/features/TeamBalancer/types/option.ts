export const LANE_OPTIONS = ["HIDDEN", "SIMPLE", "DETAILED"] as const;

export type LaneOption = (typeof LANE_OPTIONS)[number];
