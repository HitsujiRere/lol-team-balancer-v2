import { useAtom } from "jotai";
import {
  EyeClosedIcon,
  ListChevronsDownUpIcon,
  ListChevronsUpDownIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { laneOptionAtom } from "../../stores/group-option";
import type { LaneOption } from "../../types/group-option";

export const LaneOptionToggle = () => {
  const [laneOption, setLaneOption] = useAtom(laneOptionAtom);

  const handleChange = (value: string) => {
    if (value !== "") {
      setLaneOption(value as LaneOption);
    }
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={laneOption}
      onValueChange={handleChange}
    >
      <ToggleGroupItem value={"HIDDEN" satisfies LaneOption}>
        <EyeClosedIcon />
        レーン非表示
      </ToggleGroupItem>
      <ToggleGroupItem value={"SIMPLE" satisfies LaneOption}>
        <ListChevronsDownUpIcon />
        シンプル
      </ToggleGroupItem>
      <ToggleGroupItem value={"DETAILED" satisfies LaneOption}>
        <ListChevronsUpDownIcon />
        詳細
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
