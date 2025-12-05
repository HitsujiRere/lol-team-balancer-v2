import { ScaleIcon } from "lucide-react";
import { TeamBalancer } from "@/features/TeamBalancer";

export default function Home() {
  return (
    <div className="relative">
      <header className="m-4 border-primary border-b-2 pb-2">
        <div className="flex gap-2">
          <ScaleIcon className="size-8" />
          <h1 className="text-2xl">LoLチーム調整くん</h1>
        </div>
      </header>

      <main className="mx-8">
        <TeamBalancer />
      </main>
    </div>
  );
}
