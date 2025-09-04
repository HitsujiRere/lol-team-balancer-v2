import { MicIcon, MicOffIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export const MuteToggle = ({
  isMute,
  onChange,
}: {
  isMute?: boolean;
  onChange?: (mute: boolean) => void;
}) => {
  return (
    <Toggle className="group" pressed={isMute} onPressedChange={onChange}>
      <MicIcon className="transition-all group-data-[state=on]:opacity-0" />
      <MicOffIcon className="absolute transition-all group-data-[state=off]:opacity-0" />
    </Toggle>
  );
};
