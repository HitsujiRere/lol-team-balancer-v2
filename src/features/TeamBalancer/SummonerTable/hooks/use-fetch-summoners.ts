import { hc } from "hono/client";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import type { AppType } from "@/server/hono";
import { roomAtom } from "../../stores/room";
import { summonerFamily, summonersAtom } from "../../stores/summoner";

export const useFetchSummoners = () =>
  useAtomCallback(
    useCallback(async (get, set) => {
      const client = hc<AppType>("/");

      const summoners = get(summonersAtom);
      const fetchingNames = get(roomAtom)
        .filter((name) => summoners.get(name)?.fetch_status === "IDLE")
        .slice(0, 15);

      set(summonersAtom, (summoners) => {
        const newv = new Map(summoners);
        fetchingNames.forEach((name) => {
          // biome-ignore lint/style/noNonNullAssertion: 常に含まれると仮定
          newv.set(name, { ...newv.get(name)!, fetch_status: "LOADING" });
        });
        return newv;
      });

      await Promise.all(
        fetchingNames.map(async (name) => {
          const encoded = encodeURIComponent(name);
          const data = await client.api.summoner[":id"].$get({
            param: { id: encoded },
          });
          if (data.status === 200) {
            const info = await data.json();
            set(summonerFamily(name), (summoner) => ({
              ...summoner,
              fetch_status: "SUCCESS",
              level: info.summoner_level,
              icon_id: info.profile_iconId,
              rank: info.solo_ranked_rank,
              rank_wins: info.solo_ranked_wins,
              rank_losses: info.solo_ranked_losses,
            }));
          } else {
            set(summonerFamily(name), (summoner) => ({
              ...summoner,
              fetch_status: data.status === 404 ? "NOT_FOUND" : "ERROR",
            }));
          }
        }),
      );
    }, []),
  );
