import { useAtomValue } from "jotai/react";
import { XIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { debugModeAtom } from "@/stores/debug-mode";
import { useAppendSummoners } from "./hooks/use-append-summoners";
import { findRiotIds } from "./utils/find-riot-ids";
import { randomMessage } from "./utils/random-message";

export const ChatInput = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const textareaId = useId();
  const [chat, setChat] = useState("");

  const debugMode = useAtomValue(debugModeAtom);
  const appendSummoners = useAppendSummoners();

  const changeChat = (chat: string) => {
    setChat(chat);
    const riotIds = findRiotIds(chat);
    appendSummoners(riotIds);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Label htmlFor={textareaId}>ロビーチャット</Label>
      <div className="relative">
        <Textarea
          id={textareaId}
          placeholder="サモナー #JP1がロビーに参加しました。"
          value={chat}
          onChange={(event) => changeChat(event.target.value)}
        />
        <Button
          variant="ghost"
          className="absolute top-2 right-2"
          disabled={chat === ""}
          onClick={() => changeChat("")}
        >
          <XIcon />
        </Button>
      </div>
      {debugMode && (
        <div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => changeChat(randomMessage())}
          >
            仮メッセージ
          </Button>
        </div>
      )}
    </div>
  );
};
