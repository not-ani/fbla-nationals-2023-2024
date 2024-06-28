import React from "react";
import { DocsSidebarNav } from "./_components/sidebar";
import { docsConfig } from "./_components/docs";
import { Header } from "./_components/header";
import ChatButton from "@/components/chat-button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden ">
        <aside className="fixed h-[calc(100vh-64px)] w-64 flex-shrink-0 overflow-y-auto ">
          <div className="px-6 py-6">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto pl-64">
          <div className="container px-4 py-6 md:px-6">{children}</div>
        </main>
      </div>
      <ChatButton />
    </div>
  );
}
