import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/server/auth'
import { getChat, getMissingKeys } from '@/server/chat/server-actions'
import { Session } from 'next-auth'
import { AI } from '@/components/chat/actions'
import { Chat } from '@/components/chat/chat'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {};
  }

  const chat = await getChat(params.id)
  return {
    title: chat?.title?.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id)

  if (!chat) {
    redirect('/')
  }

  if (session?.user?.isAdmin) {
    notFound()
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages! }}>
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages!}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
