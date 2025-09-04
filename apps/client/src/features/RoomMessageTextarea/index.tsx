import { MessageSquareIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const RoomMessageTextarea = () => {
  return (
    <div>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <MessageSquareIcon className="size-5" />
        ルームチャット
      </h2>

      <div className="relative">
        <Textarea
          className="field-sizing-content min-h-32"
          placeholder="サモナー #JP1がロビーに参加しました。"
        />
        <Button variant="ghost" size="icon" className="absolute top-1 right-1">
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
