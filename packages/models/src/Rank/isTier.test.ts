import { describe, expect, it } from "vitest";
import { isIron, isMasterPlus, isUnranked } from "./isTier";

describe("isUnranked", () => {
  it("Unrankedのときtrueを返す", () => {
    expect(isUnranked("UNRANKED")).toBe(true);
  });

  it("Unrankedでないときtrueを返す", () => {
    expect(isUnranked("IRON")).toBe(false);
    expect(isUnranked("BRONZE_I")).toBe(false);
    expect(isUnranked("SILVER_II")).toBe(false);
    expect(isUnranked("GOLD_III")).toBe(false);
    expect(isUnranked("PLATINUM_IV")).toBe(false);
    expect(isUnranked("EMERALD")).toBe(false);
    expect(isUnranked("DIAMOND_I")).toBe(false);
    expect(isUnranked("MASTER")).toBe(false);
    expect(isUnranked("GRANDMASTER")).toBe(false);
    expect(isUnranked("CHALLENGER")).toBe(false);
  });
});

describe("isIron", () => {
  it("Ironのときtrueを返す", () => {
    expect(isIron("IRON")).toBe(true);
    expect(isIron("IRON_I")).toBe(true);
    expect(isIron("IRON_II")).toBe(true);
    expect(isIron("IRON_III")).toBe(true);
    expect(isIron("IRON_IV")).toBe(true);
  });

  it("Ironでないときtrueを返す", () => {
    expect(isIron("UNRANKED")).toBe(false);
    expect(isIron("BRONZE")).toBe(false);
    expect(isIron("SILVER_I")).toBe(false);
    expect(isIron("GOLD_II")).toBe(false);
    expect(isIron("PLATINUM_III")).toBe(false);
    expect(isIron("EMERALD_IV")).toBe(false);
    expect(isIron("DIAMOND")).toBe(false);
    expect(isIron("MASTER")).toBe(false);
    expect(isIron("GRANDMASTER")).toBe(false);
    expect(isIron("CHALLENGER")).toBe(false);
  });
});

describe("isMasterPlus", () => {
  it("Master以上のときtrueを返す", () => {
    expect(isMasterPlus("MASTER")).toBe(true);
    expect(isMasterPlus("GRANDMASTER")).toBe(true);
    expect(isMasterPlus("CHALLENGER")).toBe(true);
  });

  it("Ironでないときtrueを返す", () => {
    expect(isMasterPlus("UNRANKED")).toBe(false);
    expect(isMasterPlus("IRON")).toBe(false);
    expect(isMasterPlus("BRONZE_I")).toBe(false);
    expect(isMasterPlus("SILVER_II")).toBe(false);
    expect(isMasterPlus("GOLD_III")).toBe(false);
    expect(isMasterPlus("PLATINUM_IV")).toBe(false);
    expect(isMasterPlus("EMERALD")).toBe(false);
    expect(isMasterPlus("DIAMOND_I")).toBe(false);
  });
});
