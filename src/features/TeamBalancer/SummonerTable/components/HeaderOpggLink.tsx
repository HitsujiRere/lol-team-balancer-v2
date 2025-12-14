import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toOpggMultisearchLink } from "@/types/riot-id";
import { selectionAtom } from "../../stores/selection";
import { summonersAtom } from "../../stores/summoner";

export const HeaderOpggLink = () => {
  const names = useAtomValue(selectionAtom)
    .entries()
    .filter(([, selected]) => selected)
    .map(([name]) => name)
    .toArray();

  const getRiotIds = useAtomCallback(
    useCallback((get, _set, names: string[]) => {
      const summoners = get(summonersAtom);
      return names
        .map((name) => summoners.get(name)?.riot_id)
        .filter((id) => id !== undefined);
    }, []),
  );

  const link = toOpggMultisearchLink(getRiotIds(names));

  return (
    <Button variant="outline" asChild>
      <a href={link} target="_blank" rel="noopener">
        OP.GGマルチサーチ
      </a>
    </Button>
  );
};
