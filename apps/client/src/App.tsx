import { Header } from "@/features/Header";
import { RoomMessageTextarea } from "@/features/RoomMessageTextarea";
import { RoomSummonerTable } from "@/features/RoomSummonerTable";
import { TeamSummonerTable } from "@/features/TeamSummonerTable";

function App() {
  const layouts = {
    "--layout1":
      "'room-message-textarea'" +
      "'room-summoner-table'" +
      "'team-summoner-table'",
    "--layout2":
      "'room-message-textarea team-summoner-table'" +
      "'room-summoner-table team-summoner-table'",
  } as React.CSSProperties;

  return (
    <>
      {/* ヘッダー */}
      <Header />

      <main
        className="grid-areas-(--layout1) xl:grid-areas-(--layout2) grid gap-8 px-4 pb-64 xl:grid-cols-2"
        style={layouts}
      >
        <div className="grid-area-[room-message-textarea]">
          <RoomMessageTextarea />
        </div>

        <div className="grid-area-[room-summoner-table]">
          <RoomSummonerTable />
        </div>

        <div className="grid-area-[team-summoner-table]">
          <TeamSummonerTable />
        </div>
      </main>
    </>
  );
}

export default App;
