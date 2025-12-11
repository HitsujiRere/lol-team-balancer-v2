import { cn } from "@/lib/utils";
import { type RiotId, toOpggLink } from "@/types/riot-id";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const SummonerAvatar = ({
  name,
  riotId,
  iconId,
  className,
}: {
  name: string;
  riotId?: RiotId;
  iconId?: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex min-w-0 items-center", className)}>
      <Avatar>
        {iconId && (
          <AvatarImage
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/${iconId}.png`}
            alt="サモナーアイコン"
          />
        )}
        <AvatarFallback />
      </Avatar>
      {riotId ? (
        <Button variant="link" className="min-w-0 shrink pl-2" asChild>
          <a href={toOpggLink(riotId)} target="_blank" rel="noopener">
            {/* underlineのoverflow対策にline-heightを確保する */}
            <p className="truncate leading-6">{name}</p>
          </a>
        </Button>
      ) : (
        <div className="pr-4 pl-2">{name}</div>
      )}
    </div>
  );
};
