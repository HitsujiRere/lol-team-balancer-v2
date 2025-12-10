import type { LaneName } from "../../../types/lane-name";
import type { TeamName } from "../../../types/team-name";
import type { Group } from "./group";

export const defaultGroup = {
  blue: {
    top: "#blue_top",
    jg: "#blue_jg",
    mid: "#blue_mid",
    bot: "#blue_bot",
    sup: "#blue_sup",
  },
  red: {
    top: "#red_top",
    jg: "#red_jg",
    mid: "#red_mid",
    bot: "#red_bot",
    sup: "#red_sup",
  },
} as const satisfies Group;

type DefaultGroupName = (typeof defaultGroup)[TeamName][LaneName];

const defaultGroupNames = [
  "#blue_top",
  "#blue_jg",
  "#blue_mid",
  "#blue_bot",
  "#blue_sup",
  "#red_top",
  "#red_jg",
  "#red_mid",
  "#red_bot",
  "#red_sup",
] as const satisfies DefaultGroupName[];

export const isDefaultGroupName = (name: string): name is DefaultGroupName => {
  return (defaultGroupNames as readonly string[]).includes(name);
};
