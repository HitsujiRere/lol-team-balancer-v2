import z from "zod";
import type { RiotId } from ".";

const riotIdSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});

const riotIdListSchema = z.array(riotIdSchema);

/**
 * JSON文字列からRiotIdにデコードします。
 * @param encoded - RiotIdのJSON文字列。例: `{"gameName": "Summoner", "tagLine": "JP1"}`
 * @returns デコードに成功したときときRiotId、失敗したときundefinedを返す。
 */
export const decodeRiotId = (encoded: string): RiotId | undefined => {
  try {
    const data = JSON.parse(encoded);
    const decoded = riotIdSchema.safeParse(data);
    if (!decoded.success) {
      return undefined;
    }
    return decoded.data;
  } catch {
    return undefined;
  }
};

/**
 * JSON文字列からRiotId配列にデコードします。
 * @param encoded - RiotId配列のJSON文字列。例: `[{"gameName": "Summoner", "tagLine": "JP1"}]`
 * @returns デコードに成功したときときRiotId配列、失敗したときundefinedを返す。
 */
export const decodeRiotIdList = (encoded: string): RiotId[] | undefined => {
  try {
    const data = JSON.parse(encoded);
    const decoded = riotIdListSchema.safeParse(data);
    if (!decoded.success) {
      return undefined;
    }
    return decoded.data;
  } catch {
    return undefined;
  }
};
