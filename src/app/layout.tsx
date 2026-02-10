import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reshaa Agent Dashboard - AI Development Team Command Center",
  description: "Manage and monitor your AI agent development team with real-time status, task boards, and communication channels.",
  keywords: ["AI", "agents", "dashboard", "development", "team", "Reshaa"],
  authors: [{ name: "Reshaa Dev Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
