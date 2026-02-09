import { TabooGame } from "@/components/games/taboo-game";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-1 w-full max-w-lg mx-auto relative flex flex-col">
        <TabooGame modeId="classic" />
      </div>
    </main>
  );
}
