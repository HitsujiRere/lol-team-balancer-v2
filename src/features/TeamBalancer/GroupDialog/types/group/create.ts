import { defaultGroup } from "./default";
import type { Group } from "./group";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

export type PartialGroup = RecursivePartial<Group>;

export const createGroup = (init?: PartialGroup): Group => {
  return {
    blue: {
      top: init?.blue?.top ?? defaultGroup.blue.top,
      jg: init?.blue?.jg ?? defaultGroup.blue.jg,
      mid: init?.blue?.mid ?? defaultGroup.blue.mid,
      bot: init?.blue?.bot ?? defaultGroup.blue.bot,
      sup: init?.blue?.sup ?? defaultGroup.blue.sup,
    },
    red: {
      top: init?.red?.top ?? defaultGroup.red.top,
      jg: init?.red?.jg ?? defaultGroup.red.jg,
      mid: init?.red?.mid ?? defaultGroup.red.mid,
      bot: init?.red?.bot ?? defaultGroup.red.bot,
      sup: init?.red?.sup ?? defaultGroup.red.sup,
    },
  };
};
