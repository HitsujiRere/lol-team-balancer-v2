export const TEAM_NAMES = ["BLUE", "RED"] as const;

export type TeamName = (typeof TEAM_NAMES)[number];
