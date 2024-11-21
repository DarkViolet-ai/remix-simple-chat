import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { AIMessage } from "@langchain/core/messages";
import { RedisChatMessageHistory } from "@langchain/community/stores/message/ioredis";
import { redis } from "~/lib/server-utils/redis.server";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";
import {
  addMessageToHistory,
  getMessageHistory,
} from "~/lib/server-utils/textGen.server";

export const chatLoader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const clearHistory = searchParams.get("clearHistory");
  console.log("clear history", clearHistory);
  // clear history by changing the session id, keeps the chat in database, but
  // clears it for user.
  const sessionId = !clearHistory
    ? (await getSessionIdFromRequest(request)) || uuid()
    : uuid();
  if (clearHistory) {
    const response = redirect("/chat");
    return await setSessionIdOnResponse(response, sessionId);
  }

  const messageHistory = new RedisChatMessageHistory({
    sessionId: `simple-chat:${sessionId}`,
    client: redis,
    url: process.env.REDIS_URL,
  });

  //await messageHistory.addMessage(new AIMessage("Hello!"));
  let messages = await getMessageHistory(sessionId);
  if (messages.length === 0) {
    await addMessageToHistory(sessionId, {
      role: "assistant",
      name: "DarkViolet",
      content: "Hello! I'm Dark Violet.  What can I help you with today?",
      timestamp: new Date().toISOString(),
    });
    messages = await getMessageHistory(sessionId);
  }
  //console.log(messages);
  const response = json({
    messages: messages.map((message) =>
      message.name === "DarkViolet"
        ? {
            type: "ai",
            text: message.content,
            timestamp: message.timestamp,
          }
        : {
            type: "human",
            text: message.content,
            timestamp: message.timestamp,
          }
    ),
  });
  return await setSessionIdOnResponse(response, sessionId);
};

export type ChatLoaderData = {
  messages: { type: "ai" | "human"; text: string; timestamp: string }[];
};
