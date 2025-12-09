export const FETCH_STATUSES = [
  "IDLE",
  "LOADING",
  "SUCCESS",
  "NOT_FOUND",
  "ERROR",
] as const;

export type FetchStatus = (typeof FETCH_STATUSES)[number];
