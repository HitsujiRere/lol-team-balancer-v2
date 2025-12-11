import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "LoLチーム調整くん",
  description:
    "League of Legendsのカスタムゲームのチームを良い感じに分けてくれます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={zenKakuGothicNew.className}>{children}</body>
    </html>
  );
}
