"use client";

import { useSetAtom } from "jotai/react";
import { XIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatRiotId } from "@/types/riot-id";
import { roomAtom } from "../stores/room";
import { summonersAtom } from "../stores/summoner";
import { findRiotIds } from "./utils/find-riot-ids";

export const ChatInput = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const setSummoners = useSetAtom(summonersAtom);
  const setRoom = useSetAtom(roomAtom);

  const textareaId = useId();
  const [chat, setChat] = useState("");

  const changeChat = (chat: string) => {
    setChat(chat);

    const riotIds = findRiotIds(chat);
    // summonersAtomに無いなら追加する
    setSummoners((summoners) => {
      const names = new Set(summoners.map((summoner) => summoner.name));
      riotIds.forEach((riotId) => {
        const name = formatRiotId(riotId);
        if (!names.has(name)) {
          summoners.push({ name, riotId });
        }
      });
    });
    // roomAtomを更新
    setRoom(riotIds.map((id) => formatRiotId(id)));
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
    </div>
  );
};
