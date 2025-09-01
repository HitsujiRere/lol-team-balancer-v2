import type { RiotId } from ".";

/**
 * RiotIdをJSON文字列にエンコードする。
 * @param riotId エンコードするRiotId。
 * @returns RiotIdのJSON文字列。例: `{"gameName": "Summoner", "tagLine": "JP1"}`
 */
export const encodeRiotId = (riotId: RiotId): string => {
  return JSON.stringify(riotId);
};

/**
 * RiotId配列をJSON文字列にエンコードする。
 * @param riotIdList エンコードするRiotId配列。
 * @returns RiotId配列のJSON文字列。例: `[{"gameName": "Summoner", "tagLine": "JP1"}]`
 */
export const encodeRiotIdList = (riotIdList: RiotId[]): string => {
  return JSON.stringify(riotIdList);
};
