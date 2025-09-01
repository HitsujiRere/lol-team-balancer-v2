import { describe, expect, it } from "vitest";
import { decodeRiotId, decodeRiotIdList } from "./decode";

describe("decodeRiotId", () => {
  it("正しくRiotIdにデコードする", () => {
    expect(decodeRiotId('{"gameName":"Summoner","tagLine":"JP1"}')).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });

    expect(decodeRiotId('{"tagLine":"JP1","gameName":"Summoner"}')).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });

    expect(
      decodeRiotId('{\n  "gameName": "Summoner",\n  "tagLine": "JP1"\n}'),
    ).toEqual({
      gameName: "Summoner",
      tagLine: "JP1",
    });
  });

  it("型が異なるときundefinedを返す", () => {
    expect(decodeRiotId('{"gameName":1,"tagLine":"JP1"}')).toBe(undefined);

    expect(decodeRiotId('{"gameName":"Summoner","tagLine":1}')).toBe(undefined);

    expect(decodeRiotId('{"gameName":["Summoner"],"tagLine":"JP1"}')).toBe(
      undefined,
    );
  });

  it("ゲーム名が含まれていないときundefinedを返す", () => {
    expect(decodeRiotId('{"tagLine":"JP1"}')).toBe(undefined);
  });

  it("タグラインが含まれていないときundefinedを返す", () => {
    expect(decodeRiotId('{"gameName":"Summoner"}')).toBe(undefined);
  });

  it("空文字列のときundefinedを返す", () => {
    expect(decodeRiotId("")).toBe(undefined);
  });

  it("壊れたJSON文字列のときundefinedを返す", () => {
    expect(decodeRiotId('{"gameName":"Summoner","tagLine":"JP1"')).toBe(
      undefined,
    );
  });
});

describe("decodeRiotIdList", () => {
  it("正しくRiotId配列にデコードする", () => {
    expect(
      decodeRiotIdList('[{"gameName":"Summoner","tagLine":"JP1"}]'),
    ).toEqual([{ gameName: "Summoner", tagLine: "JP1" }]);

    expect(
      decodeRiotIdList(
        '[{"gameName":"Gold Summoner","tagLine":"JP1"},{"gameName":"Silver Summoner","tagLine":"JP2"}]',
      ),
    ).toEqual([
      { gameName: "Gold Summoner", tagLine: "JP1" },
      { gameName: "Silver Summoner", tagLine: "JP2" },
    ]);
  });

  it("空配列のとき正しく空配列を返す", () => {
    expect(decodeRiotIdList("[]")).toEqual([]);
  });

  it("型が異なるときundefinedを返す", () => {
    expect(decodeRiotIdList('[{"gameName":1,"tagLine":"JP1"}]')).toBe(
      undefined,
    );

    expect(
      decodeRiotIdList(
        '[{"gameName":"Summoner","tagLine":"JP1"},{"gameName":2,"tagLine":"JP2"}]',
      ),
    ).toBe(undefined);

    expect(decodeRiotIdList('[{"gameName":"Summoner","tagLine":1}]')).toBe(
      undefined,
    );

    expect(
      decodeRiotIdList('[{"gameName":["Summoner"],"tagLine":"JP1"}]'),
    ).toBe(undefined);
  });

  it("ゲーム名が含まれていないときundefinedを返す", () => {
    expect(decodeRiotIdList('[{"tagLine":"JP1"}]')).toBe(undefined);
  });

  it("タグラインが含まれていないときundefinedを返す", () => {
    expect(decodeRiotIdList('[{"gameName":"Summoner"}]')).toBe(undefined);
  });

  it("空文字列のときundefinedを返す", () => {
    expect(decodeRiotIdList("")).toBe(undefined);
  });

  it("壊れたJSON文字列のときundefinedを返す", () => {
    expect(decodeRiotIdList('[{"gameName":"Summoner","tagLine":"JP1"]')).toBe(
      undefined,
    );
  });
});
