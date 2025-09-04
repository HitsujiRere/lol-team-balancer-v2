import { WrenchIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useDebugStore } from "@/stores/useDebugStore";

export const DebugToggle = () => {
  const debugMode = useDebugStore((state) => state.debugMode);
  const setDebugMode = useDebugStore((state) => state.setDebugMode);

  return (
    <Toggle pressed={debugMode} onPressedChange={setDebugMode}>
      <WrenchIcon />
    </Toggle>
  );
};
