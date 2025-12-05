import { ChatInput } from "./ChatInput";
import { SummonerTable } from "./SummonerTable";
import { TeamDialog } from "./TeamDialog";

export const TeamBalancer = () => {
  return (
    <div>
      <ChatInput className="mb-8" />

      <SummonerTable />

      <TeamDialog />
    </div>
  );
};
