import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 资产管家",
  description: "以人生目标为导向的智能资产管理与财富规划产品",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

