import { createSummonerService } from "@/services/createSummonerService";
import { Dependency } from "./Dependency";
import { riotApiDependency } from "./riotApiDependency";

/**
 * SummonerServiceのDIコンテナ。
 */
export const summonerServiceDependency = new Dependency(() => {
  const riotApi = riotApiDependency.resolve();

  return createSummonerService(riotApi);
});
