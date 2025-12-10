export const LANE_NAMES = ["top", "jg", "mid", "bot", "sup"] as const;

export type LaneName = (typeof LANE_NAMES)[number];
