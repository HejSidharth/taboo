import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Party Game Hub",
  description: "Play Taboo, Codenames, and Imposter with mode selection and built-in scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
