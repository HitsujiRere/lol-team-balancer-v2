import { describe, expect, it } from "vitest";
import { getRank } from "./getRank";
import { createTestRiotApi } from "./test/createTestRiotApi";
import { randomEntry } from "./test/randomEntry";

describe("getRank", () => {
  const riotApi = createTestRiotApi({
    "Solo Summoner #JP1": {
      exists: true,
      entries: [
        randomEntry({
          queueType: "RANKED_SOLO_5x5",
          tier: "IRON",
          rank: "I",
        }),
      ],
    },
    "Flex Summoner #JP1": {
      exists: true,
      entries: [
        randomEntry({
          queueType: "RANKED_FLEX_SR",
          tier: "BRONZE",
          rank: "II",
        }),
      ],
    },
    "SoloFlex Summoner #JP1": {
      exists: true,
      entries: [
        randomEntry({
          queueType: "RANKED_SOLO_5x5",
          tier: "SILVER",
          rank: "III",
        }),
        randomEntry({
          queueType: "RANKED_FLEX_SR",
          tier: "GOLD",
          rank: "IV",
        }),
      ],
    },
    "Unrank Summoner #JP1": {
      exists: true,
      entries: [],
    },
    "None Summoner #JP1": {
      exists: false,
    },
  });

  it("SOLOのランクを持つとき正しいランクを返す", async () => {
    expect(
      await getRank(riotApi, { gameName: "Solo Summoner", tagLine: "JP1" }),
    ).toBe("IRON_I");

    expect(
      await getRank(riotApi, { gameName: "SoloFlex Summoner", tagLine: "JP1" }),
    ).toBe("SILVER_III");
  });

  it("SOLOランクを持たないときUNRANKEDを返す", async () => {
    expect(
      await getRank(riotApi, { gameName: "Flex Summoner", tagLine: "JP1" }),
    ).toBe("UNRANKED");

    expect(
      await getRank(riotApi, { gameName: "Unrank Summoner", tagLine: "JP1" }),
    ).toBe("UNRANKED");
  });

  it("サモナーが存在しないときundefinedを返す", async () => {
    expect(
      await getRank(riotApi, { gameName: "None Summoner", tagLine: "JP1" }),
    ).toBe(undefined);
  });
});
