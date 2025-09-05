import { RANK_NUMBERS, TIERS } from "@packages/models/Rank";
import z from "zod";
import type { Entry } from "@/models/Entry";
import { randomEntry } from "@/models/Entry/random";
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
 * @param riotApiKey Riot APIキー。
 * @param puuId 取得するサモナーのPuuId。
 * @returns APIリクエストが成功したときEntry配列、失敗したときundefinedを返す。
 */
export const getEntries = async (
  riotApiKey: string,
  puuId: string,
): Promise<Entry[] | undefined> => {
  if (puuId === "RANDOM") {
    return [randomEntry({ queueType: "RANKED_SOLO_5x5" })];
  }

  const data = await fetch(
    `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuId}`,
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
};
