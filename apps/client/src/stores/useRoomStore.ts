import { formatRiotId, type RiotId } from "@packages/models/RiotId";
import { create } from "zustand";
import { mutative } from "zustand-mutative";

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
      }),
  })),
);
