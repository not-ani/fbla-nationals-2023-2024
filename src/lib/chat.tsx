/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable @typescript-eslint/no-explicit-any
import { OpenAIStream } from "ai";
import { type ToolDefinition } from "@/lib/tool-definition";
import type OpenAI from "openai";
import zodToJsonSchema from "zod-to-json-schema";
import { customAlphabet } from "nanoid";

const consumeStream = async (stream: ReadableStream) => {
  const reader = stream.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }
};

export function runOpenAICompletion<
  T extends Omit<
    Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
    "functions"
  > & {
    functions: ToolDefinition<any, any>[];
  },
>(openai: OpenAI, params: T) {
  let text = "";
  let hasFunction = false;

  type FunctionNames =
    T["functions"] extends Array<any> ? T["functions"][number]["name"] : never;

  let onTextContent: (text: string, isFinal: boolean) => void = () => {};

  const onFunctionCall: Record<string, (args: Record<string, any>) => void> =
    {};

  const { functions, ...rest } = params;

  (async () => {
    consumeStream(
      OpenAIStream(
        (await openai.chat.completions.create({
          ...rest,
          stream: true,
          functions: functions.map((fn) => ({
            name: fn.name,
            description: fn.description,
            parameters: zodToJsonSchema(fn.parameters) as Record<
              string,
              unknown
            >,
          })),
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true;
            onFunctionCall[functionCallPayload.name]?.(
              functionCallPayload.arguments as Record<string, any>,
            );
          },
          onToken(token) {
            text += token;
            if (text.startsWith("{")) return;
            onTextContent(text, false);
          },
          onFinal() {
            if (hasFunction) return;
            onTextContent(text, true);
          },
        },
      ),
    );
  })();

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback;
    },
    onFunctionCall: (
      name: FunctionNames,
      callback: (args: any) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback;
    },
  };
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Fake data
export function getStockPrice(name: string) {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total = (total + name.charCodeAt(i) * 9999121) % 9999;
  }
  return total / 100;
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string
