export const LANE_OPTIONS = ["DISABLED", "SIMPLE", "DETAILED"] as const;

export type LaneOption = (typeof LANE_OPTIONS)[number];
