import type { RiotId } from "@packages/models/RiotId";
import z from "zod";

const schema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
});

/**
 * RiotIdから対応するPuuIdを取得する。
 * @param riotApiKey Riot APIキー。
 * @param riotId 取得するRiotId。
 * @returns APIリクエストが成功したときPuuId、失敗したときundefinedを返す。
 */
export const getPuuId = async (
  riotApiKey: string,
  riotId: RiotId,
): Promise<string | undefined> => {
  // try {
  const data = await fetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId.gameName}/${riotId.tagLine}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  );
  if (!data.ok) {
    // No results found for player
    if (data.status === 404) {
      return undefined;
    }

    throw new Error(await data.text());
  }

  const body = await schema.safeParseAsync(await data.json());
  if (!body.success) {
    throw new Error(body.error.message);
  }

  return body.data.puuid;
};
