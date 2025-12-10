import { type RiotId, toOpggLink } from "@/types/riot-id";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const SummonerName = ({
  name,
  riotId,
  iconId,
}: {
  name: string;
  riotId?: RiotId;
  iconId?: number;
}) => {
  return (
    <div className="flex flex-1 items-center">
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
        <a href={toOpggLink(riotId)} target="_blank" rel="noopener">
          <Button variant="link" className="pl-2">
            {name}
          </Button>
        </a>
      ) : (
        <div className="pr-4 pl-2">{name}</div>
      )}
    </div>
  );
};
