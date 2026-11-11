import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mandi Price Watch",
  description: "Track what your crop actually sells for",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
