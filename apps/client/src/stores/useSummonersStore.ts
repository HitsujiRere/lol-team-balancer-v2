import { formatRiotId, type RiotId } from "@packages/models/RiotId";
import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { newRiotIdSummoner, type Summoner } from "@/models/Summoner";

type State = {
  summoners: Record<string, Summoner>;
  get: (name: string) => Summoner;
  createByRiotId: (riotId: RiotId) => void;
  change: (
    name: string,
    changes: Partial<Omit<Summoner, "name" | "riotId">>,
  ) => void;
};

export const useSummonersStore = create<State>()(
  mutative((set, get) => ({
    summoners: {},
    get: (name) => {
      return get().summoners[name] as Summoner;
    },
    createByRiotId: (riotId) =>
      set((state) => {
        const name = formatRiotId(riotId);
        if (state.summoners[name] === undefined) {
          state.summoners[name] = { ...newRiotIdSummoner(riotId) };
        }
      }),
    change: (name, changes) =>
      set((state) => {
        if (state.summoners[name] !== undefined) {
          state.summoners[name] = { ...state.summoners[name], ...changes };
        }
      }),
  })),
);
