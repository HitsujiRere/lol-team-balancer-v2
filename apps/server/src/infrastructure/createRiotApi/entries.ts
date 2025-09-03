import { env } from "cloudflare:workers";
import { RANK_NUMBERS, TIERS } from "@packages/models/Rank";
import z from "zod";
import type { Entry } from "@/models/Entry";
import { QUEUE_TYPES } from "@/models/QueueType";

const schema = z.array(
  z.object({
    leagueId: z.string(),
    queueType: z.enum(QUEUE_TYPES),
    tier: z.enum(TIERS),
    rank: z.enum(RANK_NUMBERS),
    leaguePoints: z.number(),
    wins: z.number(),
    losses: z.number(),
    veteran: z.boolean(),
    inactive: z.boolean(),
    freshBlood: z.boolean(),
    hotStreak: z.boolean(),
  }),
);

/**
 * RiotIdから対応するLeagueのEntry配列を取得する。
 * @param riotId 取得するサモナーのPuuId。
 * @returns APIリクエストが成功したときEntry配列、失敗したときundefinedを返す。
 */
export const getEntries = async (
  puuid: string,
): Promise<Entry[] | undefined> => {
  try {
    const data = await fetch(
      `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      { headers: { "X-Riot-Token": env.RIOT_API_KEY } },
    );
    if (!data.ok) {
      return undefined;
    }

    const body = await schema.safeParseAsync(await data.json());
    if (!body.success) {
      return undefined;
    }

    return body.data.map((data) => ({
      leagueId: data.leagueId,
      queueType: data.queueType,
      tier: data.tier,
      rank: data.rank,
      leaguePoints: data.leaguePoints,
      wins: data.wins,
      losses: data.losses,
      veteran: data.veteran,
      inactive: data.inactive,
      freshBlood: data.freshBlood,
      hotStreak: data.hotStreak,
    }));
  } catch {
    return undefined;
  }
};
