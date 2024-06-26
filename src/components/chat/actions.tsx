// eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable @typescript-eslint/ban-ts-comment
import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
  spinner,
  BotCard,
  SystemMessage,
} from '@/components/llm/chat'

import { z } from 'zod'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/chat'
import { SpinnerMessage, UserMessage } from '@/components/llm/chat/message'
import { auth } from '@/server/auth'
import { Chat, Message } from '@/types/chat'
import { saveChat } from '@/server/chat/server-actions'
import { PartnerPageSkeleton } from '@/components/skeleton/partner-page-skeletons'
import { PartnerPage } from '../partner-page'
import { getAllData } from '@/server/chat/getAllData'
import { BotMessage } from './message'

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${amount * price
            }]`
        }
      ]
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  const data = await getAllData()
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `\
    You are a conversation bot that is designed to assit a school's CTE department with managing it's partners.
    You can discuss with the user about the parnters and their contacts. 

    here are all the partners with their contacts: ${JSON.stringify(data)}, pull any and all information you need from this data.
    
    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Partner Id = xyzId]" means that an interface of the of a partner with the xyzId is shown to the user.
    - "[User has changed the partners name to xyz]" means that the user has changed the name of a partner to xyz.
    
    If the user requests seeing a single partner, asks for something which's result would be a single partner, call \`show_partner\` to show the partner.
    If the user asks for something and multiple partners fit that description, call \`list_partners\` to show a list of partners.
    If the user asks to create a partner, call \`create_partner\` to show the form to create a partner.
    If the user asks to update a partner, call \`show_partner\` to show the form to update a partner.
    If the user asks to delete a partner, call \`show_partner\` to show the form to delete a partner.

    If the user asks to see a contact, call \`show_contact\` to show the contact.
    If the user asks to create a contact, call \`create_contact\` to show the form to create a contact.
    If the user asks to update a contact, call \`show_contact\` to show the form to update a contact.
    If the user asks to delete a contact, call \`show_contact\` to show the form to delete a contact.
    If the user asks to see a list of contacts, call \`list_contacts\` to show the list of contacts.

    If the user wants to complete an impossible task, respond that you are a not equiped to do so, one of the reasons being security.
    
    Besides that, you can also chat with users find things and analyze data .`,


    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      showPartner: {
        description: 'Show a partner based on the given id',
        parameters: z.object({
          id: z.string()
        }),
        generate: async function*({ id }) {
          yield (
            <BotCard>
              <PartnerPageSkeleton />
            </BotCard>
          )



          console.log(id)
          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'showPartner',
                    toolCallId,
                    args: { id }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'listStocks',
                    toolCallId,
                    result: id
                  }
                ]
              }
            ]
          })

          return (
            <BotCard>
              <PartnerPage id={id} />
            </BotCard>
          )
        }
      },

    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages?.[0]?.content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'showPartner' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <PartnerPage id={tool.result} />
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
