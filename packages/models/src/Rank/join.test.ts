import { describe, expect, it } from "vitest";
import { joinRank } from "./join";

describe("joinRank", () => {
  it("数字が無いティアのとき正しくRankを作る", () => {
    expect(joinRank("UNRANKED", "I")).toBe("UNRANKED");
    expect(joinRank("MASTER", "I")).toBe("MASTER");
    expect(joinRank("GRANDMASTER", "I")).toBe("GRANDMASTER");
    expect(joinRank("CHALLENGER", "I")).toBe("CHALLENGER");
  });

  it("数字があるティアのとき正しくRankを作る", () => {
    expect(joinRank("IRON", "I")).toBe("IRON_I");
    expect(joinRank("BRONZE", "II")).toBe("BRONZE_II");
    expect(joinRank("SILVER", "III")).toBe("SILVER_III");
    expect(joinRank("GOLD", "IV")).toBe("GOLD_IV");
    expect(joinRank("PLATINUM", "I")).toBe("PLATINUM_I");
    expect(joinRank("EMERALD", "II")).toBe("EMERALD_II");
    expect(joinRank("DIAMOND", "III")).toBe("DIAMOND_III");
  });
});
