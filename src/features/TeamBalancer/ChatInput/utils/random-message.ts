import { randomBetween } from "@/utils/random";

const templateNames = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
  "キウイ",
] as const;

export const randomMessage = () => {
  const names = templateNames.map(
    (name) => `${name}${randomBetween(0, 10)} #DEBUG`,
  );
  return names.map((name) => `${name}がロビーに参加しました。`).join("\n");
};
