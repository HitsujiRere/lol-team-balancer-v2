/**
 * RiotのIDを示す構造。
 * 例: `Summoner #JP1`
 */
export type RiotId = {
  /**
   * ゲーム名。
   * 例: `Summoner`
   */
  gameName: string;

  /**
   * タグライン。
   * 例: `JP1`
   */
  tagLine: string;
};

export { decodeRiotId, decodeRiotIdList } from "./decode";
export { encodeRiotId, encodeRiotIdList } from "./encode";
export { formatRiotId } from "./format";
export { parseRiotId } from "./parse";
