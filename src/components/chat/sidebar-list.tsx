import { getChats } from "@/server/chat/server-actions";
import { SidebarItems } from "./sidebar-items";

const loadChats = async () => {
  return await getChats();
};

export async function SidebarList() {
  const chats = await loadChats();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="h-min-[500px] h-full space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4"></div>
    </div>
  );
}
