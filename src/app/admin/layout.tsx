import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/admin/Header";

export const metadata: Metadata = {
  title: "Admin | AP Tenis Shop",
  description: "Administrador de la tienda de articulos de tenis",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-[calc(100dvh-3.5rem)] mt-14">{children}</main>
    </>
  );
}
