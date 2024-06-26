"use client";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const NextAuthSession = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};
