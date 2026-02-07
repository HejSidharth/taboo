import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Taboo Clone",
  description: "A mobile-first Taboo-style party game built with Next.js and shadcn/ui",
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
