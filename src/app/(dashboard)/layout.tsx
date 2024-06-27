import { Sidebar as SidebarDefault } from "./_components/Sidebar";
import { Header } from "./_components/Header";
import ChatButton from "@/components/chat-button";

export default function Dashboard({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SidebarDefault />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
      <ChatButton />
      {modal}
    </div>
  );
}
