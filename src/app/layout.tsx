import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Tenis Shop",
  description: "Tienda de articulos de tenis",
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
