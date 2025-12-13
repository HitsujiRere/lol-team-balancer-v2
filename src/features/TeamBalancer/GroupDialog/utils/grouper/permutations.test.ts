import { describe, expect, it } from "vitest";
import { permutations } from "./permutations";

describe("permutations", () => {
  it("正しくすべての並び替えを求める", () => {
    expect(permutations([0])).toEqual([[0]]);

    expect(permutations([0, 1])).toEqual([
      [0, 1],
      [1, 0],
    ]);

    expect(permutations([0, 1, 2])).toEqual([
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ]);
  });
});
