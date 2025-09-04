import type { CheckedState } from "@radix-ui/react-checkbox";
import { create } from "zustand";
import { mutative } from "zustand-mutative";

type SelectedState = boolean | undefined;

type State = {
  selection: Record<string, SelectedState>;
  selectedNames: () => string[];
  isSelected: (name: string) => boolean;
  isSelectedAll: () => CheckedState;
  setNames: (names: string[]) => void;
  change: (name: string, select: boolean) => void;
  changeAll: (select: boolean) => void;
};

export const useSelectionStores = create<State>()(
  mutative((set, get) => ({
    selection: {},
    selectedNames: () => {
      return Object.entries(get().selection)
        .filter(([, isSelected]) => isSelected === true)
        .map(([name]) => name);
    },
    isSelected: (name) => {
      return get().selection[name] === true;
    },
    isSelectedAll: () => {
      const selection = Object.entries(get().selection);
      const selecteds = selection.filter(
        ([, isSelected]) => isSelected === true,
      ).length;
      const unselecteds = selection.filter(
        ([, isSelected]) => isSelected === false,
      ).length;
      if (selecteds >= 1 && unselecteds >= 1) {
        return "indeterminate";
      }
      return selecteds >= 1;
    },
    setNames: (names) =>
      set((state) => {
        const selectedNames = Object.keys(state.selection).filter(
          (name) => state.selection[name] !== undefined,
        );

        // Add names
        names
          .filter((name) => !selectedNames.includes(name))
          .forEach((name) => {
            state.selection[name] = true;
          });

        // Remove names
        selectedNames
          .filter((active) => !names.includes(active))
          .forEach((name) => {
            state.selection[name] = undefined;
          });
      }),
    change: (name, select) =>
      set((state) => {
        state.selection[name] = select;
      }),
    changeAll: (select) =>
      set((state) => {
        Object.keys(state.selection).forEach((name) => {
          if (state.selection[name] !== undefined) {
            state.selection[name] = select;
          }
        });
      }),
  })),
);
