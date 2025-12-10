import { defaultGroup } from "./default";
import type { Group } from "./group";

export const createGroup = (): Group => {
  return {
    blue: {
      ...defaultGroup.blue,
    },
    red: {
      ...defaultGroup.red,
    },
  };
};
