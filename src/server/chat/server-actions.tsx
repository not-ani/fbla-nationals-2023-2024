'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '../db'
import { eq } from "drizzle-orm"
import { chats } from '../db/schema'
import { auth } from '../auth'


export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    return await db.select().from(chats)
  } catch (error) {
    return []
  }
}

export async function getChat(id: string) {
  const [chat] = await db.select().from(chats).where(eq(chats.id, id))

  if (!chat) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session || !session.user.isAdmin) {
    return {
      error: 'Unauthorized'
    }
  }


  await db.delete(chats).where(eq(chats.id, id))
  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id || !session.user.isAdmin) {
    return {
      error: 'Unauthorized'
    }
  }

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
}

export async function saveChat(chat: any) {
  const session = await auth()

  if (session && session.user && session.user.isAdmin) {
    await db.update(chats).set({
      messages: chat.messages,
    })
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
