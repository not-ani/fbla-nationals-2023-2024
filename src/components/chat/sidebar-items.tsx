"use client";

import type { Chat } from "@/types/chat";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarItem } from "./sidebar-item";
import { removeChat } from "@/server/chat/server-actions";
import { SidebarActions } from "./sidebar-actions";

interface SidebarItemsProps {
  chats?: Chat[];
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null;

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <SidebarActions chat={chat} removeChat={removeChat} />
              </SidebarItem>
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );
}
