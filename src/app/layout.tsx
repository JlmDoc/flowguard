import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowGuard - 智能上下文保护工具",
  description: "开发者的上下文保镖——在你被打断前预警，被打断后快速恢复，让深度工作不再碎片化。",
  keywords: ["productivity", "developer tools", "focus", "context management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
