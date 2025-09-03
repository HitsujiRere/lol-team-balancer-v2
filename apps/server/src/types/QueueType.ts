export const QUEUE_TYPES = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR"] as const;

export type QueueType = (typeof QUEUE_TYPES)[number];
