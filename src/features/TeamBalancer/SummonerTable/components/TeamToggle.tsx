import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Team } from "../../types/team";

export const TeamToggle = ({
  team,
  onChange,
}: {
  team?: Team;
  onChange: (team: Team | undefined) => void;
}) => {
  const handleChange = (value: string) => {
    onChange(value === "" ? undefined : (value as Team));
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={team ?? ""}
      onValueChange={handleChange}
    >
      <ToggleGroupItem
        value="Blue"
        className="text-blue-700! data-[state=on]:bg-blue-200"
      >
        Blue
      </ToggleGroupItem>
      <ToggleGroupItem
        value="Red"
        className="text-red-700! data-[state=on]:bg-red-200"
      >
        Red
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
