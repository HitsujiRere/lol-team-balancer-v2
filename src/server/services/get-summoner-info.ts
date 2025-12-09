import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { err, ok, type ResultAsync, safeTry } from "neverthrow";
import { joinRank, type Rank } from "@/types/rank";
import { parseRiotId } from "@/types/riot-id";
import { createRiotApi } from "../infrastructures/riot";

type SummonerInfo = {
  summoner_level: number;
  profile_iconId: number;
  solo_ranked_rank: Rank;
  solo_ranked_wins: number;
  solo_ranked_losses: number;
};

type GetSummonerInfoError = {
  message: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
};

export const getSummonerInfo = (
  name: string,
): ResultAsync<SummonerInfo, GetSummonerInfoError> => {
  return safeTry(async function* () {
    const riotId = parseRiotId(name);
    console.log({ name, riotId });
    if (riotId.isErr()) {
      return err({
        message: "Parameter 'id' is not in the correct format.",
        status: 400,
      } satisfies GetSummonerInfoError);
    }

    const riotApi = await createRiotApi();

    const puuid = yield* (await riotApi.getPuuid(riotId.value)).safeUnwrap();

    const summonerDTO = yield* (
      await riotApi.getSummonerDTO(puuid)
    ).safeUnwrap();

    const leagueEntriesDTO = yield* (
      await riotApi.getLeagueEntriesDTO(puuid)
    ).safeUnwrap();
    const soloRanked = leagueEntriesDTO.find(
      (leagueEntry) => leagueEntry.queueType === "RANKED_SOLO_5x5",
    );

    return ok({
      summoner_level: summonerDTO.summonerLevel,
      profile_iconId: summonerDTO.profileIconId,
      solo_ranked_rank: soloRanked
        ? joinRank(soloRanked.tier, soloRanked.rank)
        : "UNRANKED",
      solo_ranked_wins: soloRanked?.wins ?? 0,
      solo_ranked_losses: soloRanked?.losses ?? 0,
    } satisfies SummonerInfo);
  });
};
