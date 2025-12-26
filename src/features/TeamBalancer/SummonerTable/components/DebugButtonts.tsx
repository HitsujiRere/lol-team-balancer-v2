import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { debugModeAtom } from "@/stores/debug-mode";
import { RANKS, rankToPoint } from "@/types/rank";
import { choice } from "@/utils/choice";
import { roomAtom } from "../../stores/room";
import { summonerFamily } from "../../stores/summoner";
import { PRIORITIES } from "../../types/priority";

export const DebugButtons = () => {
  const debugMode = useAtomValue(debugModeAtom);

  const handleRandomizeRank = useAtomCallback(
    useCallback((get, set) => {
      const roomNames = get(roomAtom);
      roomNames.forEach((name) => {
        set(summonerFamily(name), (summoner) => {
          const rank = choice(RANKS.slice(1, 13));
          return {
            ...summoner,
            rank,
            rank_point: rankToPoint(rank),
          };
        });
      });
    }, []),
  );

  const handleRandomizeLane = useAtomCallback(
    useCallback((get, set) => {
      const roomNames = get(roomAtom);
      roomNames.forEach((name) => {
        set(summonerFamily(name), (summoner) => {
          return {
            ...summoner,
            top_priority: choice(PRIORITIES.slice(1)),
            jg_priority: choice(PRIORITIES.slice(1)),
            mid_priority: choice(PRIORITIES.slice(1)),
            bot_priority: choice(PRIORITIES.slice(1)),
            sup_priority: choice(PRIORITIES.slice(1)),
          };
        });
      });
    }, []),
  );

  if (!debugMode) {
    return undefined;
  }

  return (
    <>
      <Button variant="destructive" onClick={handleRandomizeRank}>
        ランダムランクIron~Silver
      </Button>
      <Button variant="destructive" onClick={handleRandomizeLane}>
        ランダムレーン
      </Button>
    </>
  );
};
