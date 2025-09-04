import type { RiotId } from ".";

/**
 * `GameName#TagLine`形式の文字列をRiotIdに変換する。
 *
 * @param {string} formatted 変換するRiotIdの文字列表現。例: `Summoner #JP1`
 * @returns 変換に成功したときRiotId、失敗したときundefinedを返す。
 */
export const parseRiotId = (formatted: string): RiotId | undefined => {
  const res = formatted
    .trim()
    .match(/^\u2066*(.+?)[ \u2069]*#\u2066*(.+?)\u2069*$/);

  if (res === null) {
    return undefined;
  }

  const [, gameName, tagLine] = res;

  if (gameName === undefined || tagLine === undefined) {
    return undefined;
  }

  return { gameName, tagLine };
};
