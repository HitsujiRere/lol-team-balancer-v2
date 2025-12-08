import {
  EyeClosedIcon,
  ListChevronsDownUpIcon,
  ListChevronsUpDownIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type LaneSetting = "HIDDEN" | "SIMPLE" | "DETAILED";

export const LaneSettingToggle = ({
  setting,
  onChange,
}: {
  setting: LaneSetting;
  onChange: (setting: LaneSetting) => void;
}) => {
  const handleChange = (value: string) => {
    if (value !== "") {
      onChange(value as LaneSetting);
    }
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={setting}
      onValueChange={handleChange}
    >
      <ToggleGroupItem value={"HIDDEN" satisfies LaneSetting}>
        <EyeClosedIcon />
        レーン非表示
      </ToggleGroupItem>
      <ToggleGroupItem value={"SIMPLE" satisfies LaneSetting}>
        <ListChevronsDownUpIcon />
        シンプル
      </ToggleGroupItem>
      <ToggleGroupItem value={"DETAILED" satisfies LaneSetting}>
        <ListChevronsUpDownIcon />
        詳細
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
