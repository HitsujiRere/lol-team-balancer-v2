import { choice, randomBetween } from "@/utils/random";
import type { Summoner } from ".";
import iconList from "./iconList.json";

export const randomSummoner = (partial: Partial<Summoner>): Summoner => ({
  profileIconId: choice(iconList),
  revisionDate: randomBetween(0, 10000),
  summonerLevel: randomBetween(1, 100),
  ...partial,
});
