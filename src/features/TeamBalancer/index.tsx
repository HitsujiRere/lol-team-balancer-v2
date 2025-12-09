"use client";

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { SummonerTable } from "./SummonerTable";
import { TeamDialog } from "./TeamDialog";

export const TeamBalancer = () => {
  const [isOpenedTeam, setIsOpenedTeam] = useState(false);

  return (
    <>
      <ChatInput className="mb-8" />

      <SummonerTable onGrouping={() => setIsOpenedTeam(true)} />

      <TeamDialog open={isOpenedTeam} onOpenChange={setIsOpenedTeam} />
    </>
  );
};
