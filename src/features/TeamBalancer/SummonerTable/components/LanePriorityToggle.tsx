import { LockIcon, SmileIcon, XIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Priority } from "../../types/priority";

export const LanePriorityToggle = ({
  priority,
  onChange,
}: {
  priority: Priority;
  onChange: (priority: Priority) => void;
}) => {
  const handleChange = (value: string) => {
    onChange(value === "" ? "NEVER" : (value as Priority));
  };

  return (
    <ToggleGroup
      type="single"
      value={`${priority}`}
      onValueChange={handleChange}
    >
      <ToggleGroupItem
        value={"NEVER" satisfies Priority}
        className="group p-0.5 not-hover:data-[state=on]:bg-transparent"
      >
        <XIcon className="size-6 stroke-border group-data-[state=on]:stroke-red-500" />
      </ToggleGroupItem>
      {/* <ToggleGroupItem
        value={"LOW" satisfies Priority}
        className="group p-0.5 not-hover:data-[state=on]:bg-transparent"
      >
        <FrownIcon className="size-6 stroke-border group-data-[state=on]:stroke-amber-500" />
      </ToggleGroupItem> */}
      <ToggleGroupItem
        value={"MEDIUM" satisfies Priority}
        className="group p-0.5 not-hover:data-[state=on]:bg-transparent"
      >
        {/* MehIcon */}
        <SmileIcon className="size-6 stroke-border group-data-[state=on]:stroke-green-500" />
      </ToggleGroupItem>
      {/* <ToggleGroupItem
        value={"HIGH" satisfies Priority}
        className="group p-0.5 not-hover:data-[state=on]:bg-transparent"
      >
        <SmileIcon className="size-6 stroke-border group-data-[state=on]:stroke-cyan-500" />
      </ToggleGroupItem> */}
      <ToggleGroupItem
        value={"LOCK" satisfies Priority}
        className="group p-0.5 not-hover:data-[state=on]:bg-transparent"
      >
        <LockIcon className="size-6 stroke-border group-data-[state=on]:stroke-blue-500" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
