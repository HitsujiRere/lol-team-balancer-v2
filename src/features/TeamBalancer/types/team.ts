export const TEAMS = ["BLUE", "RED"] as const;

export type Team = (typeof TEAMS)[number];
