import { useAtom } from "jotai";
import { EyeClosedIcon, EyeIcon, ViewIcon } from "lucide-react";
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
      <ToggleGroupItem value={"DISABLED" satisfies LaneOption}>
        <EyeClosedIcon />
        レーン非考慮
      </ToggleGroupItem>
      <ToggleGroupItem value={"SIMPLE" satisfies LaneOption}>
        <EyeIcon />
        レーンシンプル
      </ToggleGroupItem>
      <ToggleGroupItem value={"DETAILED" satisfies LaneOption}>
        <ViewIcon />
        詳細
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
