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
      // summonersAtomに無いなら追加す
      set(summonersAtom, (summoners) => {
        const existedNames = new Set(summoners.map((s) => s.name));
        const newSummoners = [...summoners];
        riotIds.forEach((riotId) => {
          const name = formatRiotId(riotId);
          if (!existedNames.has(name)) {
            newSummoners.push(createSummoner(name, { riot_id: riotId }));
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
