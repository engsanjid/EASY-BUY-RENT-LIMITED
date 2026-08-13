import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Buy & Rent Limited",
  description: "Buy and rent quality cars and bikes.",
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