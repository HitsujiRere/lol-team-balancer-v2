import { env } from "cloudflare:workers";
import z from "zod";
import type { Summoner } from "@/types/Summoner";

const schema = z.object({
  puuid: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number(),
  summonerLevel: z.number(),
});

/**
 * RiotIdから対応するSummonerを取得する。
 * @param riotId 取得するRiotId。
 * @returns APIリクエストが成功したときSummoner、失敗したときundefinedを返す。
 */
export const getSummoner = async (
  puuId: string,
): Promise<Summoner | undefined> => {
  try {
    const data = await fetch(
      `https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuId}`,
      { headers: { "X-Riot-Token": env.RIOT_API_KEY } },
    );
    if (!data.ok) {
      return undefined;
    }

    const body = await schema.safeParseAsync(await data.json());
    if (!body.success) {
      return undefined;
    }

    return {
      profileIconId: body.data.profileIconId,
      revisionDate: body.data.revisionDate,
      summonerLevel: body.data.summonerLevel,
    };
  } catch {
    return undefined;
  }
};
