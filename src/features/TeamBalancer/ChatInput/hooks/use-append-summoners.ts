import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { formatRiotId, type RiotId } from "@/types/riot-id";
import { roomAtom } from "../../stores/room";
import { selectionAtom } from "../../stores/selection";
import { summonersAtom } from "../../stores/summoner";
import { createSummoner } from "../../types/summoner";

export const useAppendSummoners = () =>
  useAtomCallback(
    useCallback(async (_get, set, riotIds: RiotId[]) => {
      // summonersAtomに無いなら新規作成
      set(summonersAtom, (summoners) => {
        const newSummoners = new Map(summoners);
        riotIds.forEach((riotId) => {
          const name = formatRiotId(riotId);
          if (!summoners.has(name)) {
            newSummoners.set(name, createSummoner(name, { riot_id: riotId }));
          }
        });
        return newSummoners;
      });

      // roomAtomを上書き
      set(roomAtom, riotIds.map(formatRiotId));

      // selectionAtomを更新
      set(selectionAtom, (selection) => {
        const newNames = riotIds.map(formatRiotId);
        const newSelection = new Map(selection);
        // 削除
        selection
          .keys()
          .filter((name) => !newNames.includes(name))
          .forEach((name) => void newSelection.delete(name));
        // 追加
        newNames
          .filter((name) => !selection.has(name))
          .forEach((name) => void newSelection.set(name, true));
        return newSelection;
      });
    }, []),
  );
