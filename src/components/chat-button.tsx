import React from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const ChatButton = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href="/chat">
        <button className="flex h-12 w-12 items-center justify-center rounded-full text-white bg-foreground focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
          <MessageCircle className="h-6 w-6" />
        </button>
      </Link>
    </div>
  );
};

export default ChatButton;
