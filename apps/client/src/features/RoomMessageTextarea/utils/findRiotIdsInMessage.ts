import { parseRiotId, type RiotId } from "@packages/models/RiotId";

export const findRiotIdsInMessage = (message: string): RiotId[] => {
  const names = Array.from(
    message.match(/.+ #.+(?=(がロビーに参加しました。| joined the lobby))/gm) ??
      [],
  );

  const uniqueNames = [...new Set(names)];

  return uniqueNames
    .map((name) => parseRiotId(name))
    .filter((riotId) => riotId !== undefined);
};
