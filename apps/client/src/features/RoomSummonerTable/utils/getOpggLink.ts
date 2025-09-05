import { formatRiotId, type RiotId } from "@packages/models/RiotId";

export const getOpggLink = (riotId: RiotId) => {
  return `https://op.gg/ja/lol/summoners/jp/${riotId.gameName}-${riotId.tagLine}`;
};

export const getOpggMultisearchLink = (riotIds: RiotId[]) => {
  const param = riotIds
    .slice(0, 10)
    .map((riotId) => formatRiotId(riotId))
    .join(",");
  return `https://op.gg/ja/lol/multisearch/jp?summoners=${encodeURIComponent(param)}`;
};
