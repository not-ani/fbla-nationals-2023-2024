import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/TRPCReactProvider";
import ChatButton from "@/components/chat-button";

export const metadata = {
  title: "Connect",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/connect-light.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <ChatButton />
      </body>
    </html>
  );
}
