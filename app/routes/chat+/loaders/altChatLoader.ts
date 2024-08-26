import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { AIMessage } from "@langchain/core/messages";
import { RedisChatMessageHistory } from "@langchain/community/stores/message/ioredis";
import { redis } from "~/lib/server-utils/redis.server";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";
import { getMessages } from "~/lib/data/messages";

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

  let messages = await getMessages(sessionId);
  //console.log(messages);
  const response = json({
    messages: messages.map((message) =>
      message.role === "assistant"
        ? {
            type: "ai",
            text: message.content,
            timestamp: message.timestamp,
            name: message.name,
          }
        : {
            type: "human",
            text: message.content,
            timestamp: message.timestamp,
            name: message.name,
          }
    ),
  });
  return await setSessionIdOnResponse(response, sessionId);
};

export type ChatLoaderData = {
  messages: {
    type: "ai" | "human";
    text: string;
    timestamp: string;
    name: string;
  }[];
};
