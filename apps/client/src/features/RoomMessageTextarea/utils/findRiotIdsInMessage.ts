import { parseRiotId, type RiotId } from "@packages/models/RiotId";

export const findRiotIdsInMessage = (message: string): RiotId[] => {
  const names = Array.from(
    message.match(/.+ #.+(?=(がロビーに参加しました。| joined the lobby))/gm) ??
      [],
  );

  return names
    .map((name) => parseRiotId(name))
    .filter((riotId) => riotId !== undefined);
};
