import {
  isBronze,
  isDiamond,
  isEmerald,
  isGold,
  isIron,
  isMasterPlus,
  isPlatinum,
  isSilver,
  type Rank,
} from "@packages/models/Rank";
import { CircleIcon, CircleQuestionMarkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const RankLabel = ({ rank }: { rank?: Rank }) => {
  return (
    <span className="inline-flex items-center gap-2">
      {rank === undefined ? (
        <CircleQuestionMarkIcon />
      ) : (
        <CircleIcon
          className={cn({
            "stroke-0": rank !== "UNRANKED",
            "fill-lol-iron-foreground": isIron(rank),
            "fill-lol-bronze-foreground": isBronze(rank),
            "fill-lol-silver-foreground": isSilver(rank),
            "fill-lol-gold-foreground": isGold(rank),
            "fill-lol-platinum-foreground": isPlatinum(rank),
            "fill-lol-emerald-foreground": isEmerald(rank),
            "fill-lol-diamond-foreground": isDiamond(rank),
            "fill-lol-master-foreground": isMasterPlus(rank),
          })}
        />
      )}
      <span>{rank ?? ""}</span>
    </span>
  );
};
