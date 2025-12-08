export const PRIORITIES = ["LOCK", "HIGH", "MEDIUM", "LOW", "NEVER"] as const;

export type Priority = (typeof PRIORITIES)[number];
