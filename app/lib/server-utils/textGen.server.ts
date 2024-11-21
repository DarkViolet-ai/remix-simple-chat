import { ClientOptions, OpenAI } from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";
import { redis } from "./redis.server";

const defaultSystemPrompt = "You are a helpful assistant.";

type TextGenMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam & {
  timestamp: string;
  name: string;
};

export async function generateText({
  systemPrompt = defaultSystemPrompt,
  options,
  generateOptions,
  messageHistory,
}: {
  systemPrompt?: string;
  options?: ClientOptions;
  generateOptions?: Omit<ChatCompletionCreateParamsNonStreaming, "messages">;
  messageHistory: TextGenMessage[];
}) {
  const openai = new OpenAI(options);
  const messages = messageHistory.map((message) => ({
    role: message.role,
    content: message.content,
  })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    model: "gpt-4o-mini",

    ...generateOptions,
  });
  return completion.choices[0].message.content;
}

export const addMessageToHistory = async (
  sessionId: string,
  message: TextGenMessage
) => {
  redis.rpush(`chat:${sessionId}`, JSON.stringify(message));
};

export const getMessageHistory = async (sessionId: string) => {
  const messages = await redis.lrange(`chat:${sessionId}`, 0, -1);
  return messages.map((message) => JSON.parse(message) as TextGenMessage);
};
