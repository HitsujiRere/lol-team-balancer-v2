export const LANES = ["TOP", "JG", "MID", "BOT", "SUP"] as const;

export type Lane = (typeof LANES)[number];
