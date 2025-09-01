import { describe, expect, it } from "vitest";
import { encodeRiotId, encodeRiotIdList } from "./encode";

describe("encodeRiotId", () => {
  it("正しくJSON文字列にエンコードする", () => {
    expect(encodeRiotId({ gameName: "Summoner", tagLine: "JP1" })).toBe(
      '{"gameName":"Summoner","tagLine":"JP1"}',
    );
  });
});

describe("encodeRiotIdList", () => {
  it("正しくJSON文字列にエンコードする", () => {
    expect(encodeRiotIdList([{ gameName: "Summoner", tagLine: "JP1" }])).toBe(
      '[{"gameName":"Summoner","tagLine":"JP1"}]',
    );

    expect(
      encodeRiotIdList([
        { gameName: "Gold Summoner", tagLine: "JP1" },
        { gameName: "Silver Summoner", tagLine: "JP2" },
      ]),
    ).toBe(
      '[{"gameName":"Gold Summoner","tagLine":"JP1"},{"gameName":"Silver Summoner","tagLine":"JP2"}]',
    );
  });
});
