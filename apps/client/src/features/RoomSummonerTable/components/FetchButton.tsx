import type { AppType } from "@apps/server";
import {
  encodeRiotIdList,
  formatRiotId,
  type RiotId,
} from "@packages/models/RiotId";
import { hc } from "hono/client";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { useSelectionStores } from "../stores/useSelectionStore";

export const FetchButton = () => {
  const getSelectedNames = useSelectionStores(
    useShallow((state) => state.selectedNames),
  );

  const [isLoading, setLoading] = useState(false);

  const fetchSummoners = useCallback(async () => {
    try {
      setLoading(true);

      const getSummoner = useSummonersStore.getState().get;
      const riotIdList = getSelectedNames()
        .map((name) => getSummoner(name))
        .filter(
          (summoner) =>
            summoner.riotId !== undefined && summoner.rank === undefined,
        )
        .map((summoner) => summoner.riotId as RiotId);

      const data = await hc<AppType>(
        import.meta.env.VITE_API_URL,
      ).summoners.$get({
        query: { "riot-id-list": encodeRiotIdList(riotIdList) },
      });

      const infomations = await data.json();
      const changeSummoner = useSummonersStore.getState().change;
      infomations.forEach((info) => {
        changeSummoner(formatRiotId(info.riotId), {
          iconId: info.iconId,
          level: info.level,
          rank: info.rank,
        });
      });
    } catch {}

    setLoading(false);
  }, [getSelectedNames]);

  return (
    <Button disabled={isLoading} onClick={fetchSummoners}>
      <SearchIcon className={cn(isLoading && "animate-spin")} />
      サモナー情報取得
    </Button>
  );
};
