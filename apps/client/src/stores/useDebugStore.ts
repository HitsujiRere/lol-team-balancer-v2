import type { SetStateAction } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mutative } from "zustand-mutative";

type State = {
  debugMode: boolean;
  setDebugMode: (mode: SetStateAction<boolean>) => void;
};

export const useDebugStore = create<State>()(
  persist(
    mutative((set, _get) => ({
      debugMode: false,
      setDebugMode: (mode) =>
        set((state) => {
          if (typeof mode === "function") {
            state.debugMode = mode(state.debugMode);
          } else {
            state.debugMode = mode;
          }
        }),
    })),
    { name: "debug-mode" },
  ),
);
