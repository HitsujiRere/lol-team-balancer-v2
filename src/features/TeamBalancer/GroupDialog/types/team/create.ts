import type { Team } from "./team";

export const createTeamFromArray = (names: string[]): Team | undefined => {
  if (names.length < 5) {
    return undefined;
  }

  return {
    // biome-ignore-start lint/style/noNonNullAssertion: names.length >= 5
    top: names[0]!,
    jg: names[1]!,
    mid: names[2]!,
    bot: names[3]!,
    sup: names[4]!,
    // biome-ignore-end lint/style/noNonNullAssertion: names.length >= 5
  };
};
