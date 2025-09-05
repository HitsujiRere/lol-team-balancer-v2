import { WrenchIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebugStore } from "@/stores/useDebugStore";

export const DebugMessageButton = ({
  setMessage,
}: {
  setMessage: (message: string) => void;
}) => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const setRandomMessage = useCallback(() => {
    const newMessage = names
      .map((name) => `${name}${Math.floor(Math.random() * 10)} #JP1🔧`)
      .map((name) => `${name}がロビーに参加しました。`)
      .join("\n");
    setMessage(newMessage);
  }, [setMessage]);

  return (
    <Button
      variant="secondary"
      className={cn(!debugMode && "hidden")}
      onClick={setRandomMessage}
    >
      <WrenchIcon />
      デバッグメッセージ
    </Button>
  );
};

const names = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
  "キウイ",
] as const;
