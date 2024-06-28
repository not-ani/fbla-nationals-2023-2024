import React from "react";
import { Header } from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
    </div>
  );
}
