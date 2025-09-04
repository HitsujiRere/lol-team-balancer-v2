import { MicIcon, MicOffIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export const MuteToggle = ({
  mute,
  onChange,
}: {
  mute?: boolean;
  onChange?: (mute: boolean) => void;
}) => {
  return (
    <Toggle className="group" pressed={mute} onPressedChange={onChange}>
      <MicIcon className="transition-all group-data-[state=on]:opacity-0" />
      <MicOffIcon className="absolute transition-all group-data-[state=off]:opacity-0" />
    </Toggle>
  );
};
