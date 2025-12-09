import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { okAsync, type ResultAsync } from "neverthrow";
import z from "zod";
import { logger } from "@/server/logger";
import { choice } from "@/utils/choice";
import { randomBetween } from "@/utils/random";
import iconList from "../../assets/icon-list.json";
import { safeFetch } from "../utils/safe-fetch";
import { safeZodParse } from "../utils/safe-zod-parse";

const schema = z.object({
  puuid: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number(),
  summonerLevel: z.number(),
});

export type SummonerDTO = z.infer<typeof schema>;

export type GetSummonerDTOError = {
  message: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
};

export const getSummonerDTO = (
  riotApiKey: string,
  puuid: string,
): ResultAsync<SummonerDTO, GetSummonerDTOError> => {
  if (puuid === "debug_puuid") {
    return okAsync({
      puuid,
      profileIconId: choice(iconList),
      // 2025/01/01 ~ 2025/01/01 UNIX time
      revisionDate: randomBetween(1704034800000, 1735657200000),
      summonerLevel: randomBetween(1, 200),
    });
  }

  return safeFetch(
    `https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(schema))
    .mapErr((error): GetSummonerDTOError => {
      logger.error(error);
      return {
        message: "Internal server error",
        status: 500,
      };
    })
    .map((res) => res);
};
