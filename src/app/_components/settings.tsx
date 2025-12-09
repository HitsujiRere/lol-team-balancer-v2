"use client";

import { useAtom } from "jotai/react";
import { BugIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { debugModeAtom } from "@/stores/debug-mode";

export const Settings = () => {
  const [debugMode, setDebugMode] = useAtom(debugModeAtom);

  return (
    <div>
      <Toggle pressed={debugMode} onPressedChange={setDebugMode}>
        <BugIcon />
      </Toggle>
    </div>
  );
};
