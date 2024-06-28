import { AI } from "@/components/chat/actions";
import { Chat } from "@/components/chat/chat";
import { auth } from "@/server/auth";
import { getMissingKeys } from "@/server/chat/server-actions";
import { nanoid } from "nanoid";
import React from "react";

export default async function Page() {
  const id = nanoid();
  const missingKeys = await getMissingKeys();
  const session = await auth();

  return (
    <AI>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  );
}
