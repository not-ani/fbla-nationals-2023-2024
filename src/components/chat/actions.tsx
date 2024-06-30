// eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable @typescript-eslint/ban-ts-comment
import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import { spinner, BotCard, SystemMessage } from "@/components/llm/chat";

import { z } from "zod";
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid,
} from "@/lib/chat";
import { SpinnerMessage, UserMessage } from "@/components/llm/chat/message";
import { auth } from "@/server/auth";
import type { Chat, Message } from "@/types/chat";
import { saveChat } from "@/server/chat/server-actions";
import { PartnerPageSkeleton } from "@/components/skeleton/partner-page-skeletons";
import { PartnerPage } from "../partner-page";
import { getAllData } from "@/server/chat/getAllData";
import { BotMessage } from "./message";
import { ListPartners } from "../list-partners";
import { ListPartnersSkeleton } from "../skeleton/list-partners-skeleton";
import ContactCard from "../contact-card";
import { ContactCardSkeleton } from "../skeleton/contact-card-skeleton";
import { ListContactSkeleton } from "../skeleton/list-contact-skeleton";
import { ListContacts } from "../list-contacts";
import PartnerCount from "../PartnerCount";
import InteractionHistory from "../interaction-history";

async function confirmPurchase(symbol: string, price: number, amount: number) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>,
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000);

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>,
    );

    await sleep(1000);

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{" "}
          {formatNumber(amount * price)}
        </p>
      </div>,
    );

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={" "}
        {formatNumber(amount * price)}.
      </SystemMessage>,
    );

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "system",
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`,
        },
      ],
    });
  });

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  };
}

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const data = await getAllData();
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-4o"),
    initial: <SpinnerMessage />,
    system: `\
    You are a conversation bot that is designed to assit a school's CTE department with managing it's partners.
    You can discuss with the user about the parnters and their contacts. 

    here are all the partners with their contacts: ${JSON.stringify(data)}, pull any and all information you need from this data.
    
    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Partner Id = xyzId]" means that an interface of the of a partner with the xyzId is shown to the user.
    - "[User has changed the partners name to xyz]" means that the user has changed the name of a partner to xyz.
    
    If the user about the number of partners we have in the database, call \`db_count\` to show the number of partners.
    If the user requests seeing a single partner, asks for something which's result would be a single partner, call \`show_partner\` to show the partner.
    If the user asks for something and multiple partners fit that description, call \`list_partners\` to show a list of partners.
    If the user asks to create a partner, call \`create_partner\` to show the form to create a partner.
    If the user asks to update a partner, call \`show_partner\` to show the form to update a partner.
    If the user asks to delete a partner, call \`delete_partner\` to show the form to delete a partner.
    If the user asks to see the interaction history of a partner, call \`interaction_history\` to show the interaction history.

    If the user asks to see a contact, call \`show_contact\` to show the contact.
    If the user asks to create a contact, call \`create_contact\` to show the form to create a contact.
    If the user asks to update a contact, call \`update_contact\` to show the form to update a contact.
    If the user asks to delete a contact, call \`delete_contact\` to show the form to delete a contact.
    If the user asks to see a list of contacts, call \`list_contacts\` to show the list of contacts.

    If the user wants to complete an impossible task, respond that you are a not equiped to do so, one of the reasons being security.
    
    Besides that, you can also chat with users find things and analyze data .`,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      interaction_history: {
        description: `The interaction history for a given database`,
        parameters: z.object({
          partnerId: z.string(),
        }),
        generate: async function* ({ partnerId }) {
          yield (
            <BotCard>
              <PartnerPageSkeleton />
            </BotCard>
          );
          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "interaction_history",
                    toolCallId,
                    args: { partnerId },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "interaction_history",
                    toolCallId,
                    result: partnerId,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <InteractionHistory partnerId={partnerId} />
            </BotCard>
          );
        },
      },
      db_count: {
        description: `The number of partners in the database`,
        parameters: z.object({
          nothing: z.string().optional(),
        }),
        generate: async function* ({ nothing }) {
          yield (
            <BotCard>
              <div />
            </BotCard>
          );
          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "db_count",
                    toolCallId,
                    args: { nothing },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "db_count",
                    toolCallId,
                    result: nothing,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <PartnerCount nothing={nothing} />
            </BotCard>
          );
        },
      },
      list_contacts: {
        description: `Show a contact based on the given id`,
        parameters: z.object({
          ids: z.array(z.string()),
        }),
        generate: async function* ({ ids }) {
          yield (
            <BotCard>
              <ListContactSkeleton />
            </BotCard>
          );
          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "list_contacts",
                    toolCallId,
                    args: { ids },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "list_contacts",
                    toolCallId,
                    result: ids,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <ListContacts ids={ids} />
            </BotCard>
          );
        },
      },
      show_contact: {
        description: `Show a contact based on the given id`,
        parameters: z.object({
          id: z.string(),
        }),
        generate: async function* ({ id }) {
          yield (
            <BotCard>
              <ContactCardSkeleton />
            </BotCard>
          );
          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "show_contact",
                    toolCallId,
                    args: { id },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "show_contact",
                    toolCallId,
                    result: id,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <ContactCard id={id} />
            </BotCard>
          );
        },
      },
      list_partners: {
        description: `List partners based on the given ids`,
        parameters: z.object({
          ids: z.array(z.string()),
        }),
        generate: async function* ({ ids }) {
          yield (
            <BotCard>
              <ListPartnersSkeleton />
            </BotCard>
          );
          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "list_partners",
                    toolCallId,
                    args: { ids },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "list_partners",
                    toolCallId,
                    result: ids,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <ListPartners ids={ids} />
            </BotCard>
          );
        },
      },
      showPartner: {
        description: "Show a partner based on the given id",
        parameters: z.object({
          id: z.string(),
        }),
        generate: async function* ({ id }) {
          yield (
            <BotCard>
              <PartnerPageSkeleton />
            </BotCard>
          );

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "showPartner",
                    toolCallId,
                    args: { id },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "listStocks",
                    toolCallId,
                    result: id,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <PartnerPage id={id} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const aiState = getAIState() as Chat;

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.user.id;
      const path = `/chat/${chatId}`;

      const firstMessageContent = messages?.[0]?.content as string;
      const title = firstMessageContent.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };

      await saveChat(chat);
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "tool" ? (
          message.content.map((tool) => {
            return tool.toolName === "showPartner" ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error - haven't added type infer */}
                <PartnerPage id={tool.result} />
              </BotCard>
            ) : tool.toolName === "list_contacts" ? (
              <BotCard>
                {/* @ts-expect-error - haven't added type infer */}
                <ListContacts ids={tool.result} />
              </BotCard>
            ) : tool.toolName === "show_contact" ? (
              <BotCard>
                {/* @ts-expect-error - haven't added type infer */}
                <ContactCard id={tool.result} />
              </BotCard>
            ) : tool.toolName === "db_count" ? (
              <BotCard>
                {/* @ts-expect-error - haven't added type infer */}
                <PartnerCount nothing={tool.result} />
              </BotCard>
            ) : tool.toolName === "list_partners" ? (
              <BotCard>
                {/* @ts-expect-error - haven't added type infer */}
                <ListPartners ids={tool.result} />
              </BotCard>
            ) : null;
          })
        ) : message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
