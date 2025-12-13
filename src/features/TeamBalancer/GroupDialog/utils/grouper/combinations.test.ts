import { describe, expect, it } from "vitest";
import { combinations } from "./combinations";

describe("combinations", () => {
  it("正しくすべての並び替えを求める", () => {
    expect(combinations([0], 1)).toEqual([[0]]);

    expect(combinations([0, 1], 1)).toEqual([[0], [1]]);

    expect(combinations([0, 1], 2)).toEqual([[0, 1]]);

    expect(combinations([0, 1, 2], 1)).toEqual([[0], [1], [2]]);

    expect(combinations([0, 1, 2], 2)).toEqual([
      [0, 1],
      [0, 2],
      [1, 2],
    ]);

    expect(combinations([0, 1, 2], 3)).toEqual([[0, 1, 2]]);

    expect(combinations([0, 1, 2, 3], 1)).toEqual([[0], [1], [2], [3]]);

    expect(combinations([0, 1, 2, 3], 2)).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ]);

    expect(combinations([0, 1, 2, 3], 3)).toEqual([
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3],
    ]);

    expect(combinations([0, 1, 2, 3], 4)).toEqual([[0, 1, 2, 3]]);
  });
});
