import { redis } from "~/lib/server-utils/redis.server";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  name?: string;
  timestamp: string;
};

const serialize = JSON.stringify;
const deserialize = JSON.parse;

const chatKey = (sessionId: string) => `chat:${sessionId}`;

export const getMessages = async (sessionId: string) => {
  const messages = await redis.lrange(chatKey(sessionId), 0, -1);
  return messages.map((message) => deserialize(message) as Message);
};

export const addMessage = async (sessionId: string, message: Message) => {
  await redis.rpush(chatKey(sessionId), serialize(message));
};

export const clearMessages = async (sessionId: string) => {
  await redis.del(chatKey(sessionId));
};

export const deleteLastMessage = async (sessionId: string) => {
  await redis.rpop(chatKey(sessionId));
};
