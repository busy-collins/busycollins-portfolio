import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Collins Chibuike | AI Agents Engineer",
  description:
    "Portfolio of Collins Chibuike, AI Agents Engineer from Lagos. Builder of ARIA — a production multi-agent research system on AWS — and the Meridian MCP chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
