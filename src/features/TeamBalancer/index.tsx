"use client";

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { GroupDialog } from "./GroupDialog";
import { SummonerTable } from "./SummonerTable";

export const TeamBalancer = () => {
  const [isOpenedTeam, setIsOpenedTeam] = useState(false);

  return (
    <>
      <ChatInput className="mb-8" />

      <SummonerTable onGrouping={() => setIsOpenedTeam(true)} />

      <GroupDialog open={isOpenedTeam} onOpenChange={setIsOpenedTeam} />
    </>
  );
};
