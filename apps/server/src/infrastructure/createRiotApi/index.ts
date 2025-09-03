import type { CreateRiotApi } from "../types/CreateRiotApi";
import { getEntries } from "./entries";
import { getPuuId } from "./puuId";
import { getSummoner } from "./summoner";

export const createRiotApi = (): CreateRiotApi => {
  return {
    getPuuId: getPuuId,
    getSummoner: getSummoner,
    getEntries: getEntries,
  };
};
