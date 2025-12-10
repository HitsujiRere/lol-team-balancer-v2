import { MicIcon, MicOffIcon } from "lucide-react";
import { Toggle } from "../ui/toggle";

export const MuteToggle = ({
  isMute,
  disabled,
  onChange,
}: {
  isMute: boolean;
  disabled?: boolean;
  onChange: (isMute: boolean) => void;
}) => {
  return (
    <Toggle
      className="group relative"
      pressed={isMute}
      disabled={disabled}
      onPressedChange={onChange}
    >
      <MicIcon className="transition-opacity group-data-[state=on]:opacity-0" />
      <MicOffIcon className="absolute transition-opacity group-data-[state=off]:opacity-0" />
    </Toggle>
  );
};
