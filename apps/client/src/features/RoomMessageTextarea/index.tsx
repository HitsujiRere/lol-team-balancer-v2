import { MessageSquareIcon, XIcon } from "lucide-react";
import { type ChangeEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const RoomMessageTextarea = () => {
  const [message, setMessage] = useState("");

  const handleTextareaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    },
    [],
  );

  const clearMessage = useCallback(() => setMessage(""), []);

  return (
    <div>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <MessageSquareIcon className="size-5" />
        ルームチャット
      </h2>

      <div className="relative">
        <Textarea
          value={message}
          onChange={handleTextareaChange}
          className="field-sizing-content min-h-32"
          placeholder="サモナー #JP1がロビーに参加しました。"
        />
        <div className="absolute top-1 right-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={message === ""}
            onClick={clearMessage}
          >
            <XIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
