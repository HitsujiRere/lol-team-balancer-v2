import type { RiotId } from "@/types/riot-id";
import { getLeagueEntriesDTO } from "./get-league-entries-dto";
import { getPuuid } from "./get-puuid";
import { getSummonerDTO } from "./get-summoner-dto";

export const createRiotApi = async () => {
  const riotApiKey = process.env.RIOT_API_KEY ?? "";

  return {
    getPuuid: (riotId: RiotId) => getPuuid(riotApiKey, riotId),
    getSummonerDTO: (puuid: string) => getSummonerDTO(riotApiKey, puuid),
    getLeagueEntriesDTO: (puuid: string) =>
      getLeagueEntriesDTO(riotApiKey, puuid),
  };
};
