import { formatRiotId, type RiotId } from "@packages/models/RiotId";
import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { useSummonersStore } from "./useSummonersStore";

type State = {
  names: string[];
  setRiotIdsNames: (riotIds: RiotId[]) => void;
};

export const useRoomStore = create<State>()(
  mutative((set, _get) => ({
    names: [],
    setRiotIdsNames: (riotIds) =>
      set((state) => {
        state.names = riotIds.map((riotId) => formatRiotId(riotId));
        riotIds.map((riotId) =>
          useSummonersStore.getState().createByRiotId(riotId),
        );
      }),
  })),
);
