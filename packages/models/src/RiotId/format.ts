import type { RiotId } from ".";

/**
 * RiotIdを`GameName #TagLine`形式の文字列に整形します。
 * @param riotId 整形するRiotId。
 * @returns GameName #TagLine`形式の文字列。
 */
export const formatRiotId = (riotId: RiotId): string => {
  return `${riotId.gameName} #${riotId.tagLine}`;
};
