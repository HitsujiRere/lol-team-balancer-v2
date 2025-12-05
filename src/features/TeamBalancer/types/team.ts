export const TEAMS = ["UNSET", "BLUE", "RED"] as const;

export type Team = (typeof TEAMS)[number];
