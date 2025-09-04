import { ThemeSelect } from "@/components/themeSelect";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between px-8">
      <h1 className="space-x-4">
        <span className="font-bold text-2xl">LoLチームバランサー</span>
        <span className="text-xl">ver.2</span>
      </h1>
      <ThemeSelect />
    </header>
  );
};
