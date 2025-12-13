export const combinations = <T>(array: readonly T[], k: number): T[][] => {
  if (k === 0) {
    return [[]];
  }
  if (k > array.length) {
    return [];
  }

  const [first, ...rest] = array;
  const withFirst = combinations(rest, k - 1).map((combination) => [
    // biome-ignore lint/style/noNonNullAssertion: array.length >= 1
    first!,
    ...combination,
  ]);
  const withoutFirst = combinations(rest, k);
  return [...withFirst, ...withoutFirst];
};
