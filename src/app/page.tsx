import { ScaleIcon } from "lucide-react";
import { TeamBalancer } from "@/features/TeamBalancer";
import { Settings } from "./_components/settings";

export default function Home() {
  return (
    <div className="relative">
      <header className="m-4 flex justify-between border-primary border-b-2 pb-2">
        <div className="flex gap-2">
          <ScaleIcon className="size-8" />
          <h1 className="text-2xl">LoLチーム調整くん</h1>
        </div>
        <Settings />
      </header>

      <main className="mx-8 mb-32">
        <TeamBalancer />
      </main>
    </div>
  );
}
