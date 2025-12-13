import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { TeamName } from "../../types/team-name";

export const TeamToggle = ({
  team,
  onChange,
}: {
  team?: TeamName;
  onChange: (team: TeamName | undefined) => void;
}) => {
  const handleChange = (value: string) => {
    onChange(value === "" ? undefined : (value as TeamName));
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={team ?? ""}
      onValueChange={handleChange}
    >
      <ToggleGroupItem
        value={"blue" satisfies TeamName}
        className="text-blue-700! data-[state=on]:bg-blue-200"
      >
        Blue
      </ToggleGroupItem>
      <ToggleGroupItem
        value={"red" satisfies TeamName}
        className="text-red-700! data-[state=on]:bg-red-200"
      >
        Red
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
