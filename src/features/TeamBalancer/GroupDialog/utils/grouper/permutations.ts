export const permutations = <T>(array: readonly T[]): T[][] => {
  if (array.length === 0) {
    return [[]];
  }

  const perms: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    // biome-ignore lint/style/noNonNullAssertion: 0 <= i < array.length
    const cur = array[i]!;
    const rest = [...array.slice(0, i), ...array.slice(i + 1)];
    const restPerms = permutations(rest);
    for (const perm of restPerms) {
      perms.push([cur, ...perm]);
    }
  }
  return perms;
};
