import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { AIMessage } from "@langchain/core/messages";
import { RedisChatMessageHistory } from "@langchain/community/stores/message/ioredis";
import { redis } from "~/lib/server-utils/redis.server";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";

export const portalChatLoader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { portalName } = params as { portalName: string };
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const clearHistory = searchParams.get("clearHistory");
  console.log("clear history", clearHistory);
  // clear history by changing the session id, keeps the chat in database, but
  // clears it for user.
  const sessionId = !clearHistory
    ? (await getSessionIdFromRequest(request)) || uuid()
    : uuid();
  if (clearHistory) {
    const response = json({ messages: [] });
    return await setSessionIdOnResponse(response, sessionId);
  }

  const messageHistory = new RedisChatMessageHistory({
    sessionId: `dv-chat:${sessionId}:portal:${portalName}`,
    client: redis,
    url: process.env.REDIS_URL,
  });

  //await messageHistory.addMessage(new AIMessage("Hello!"));
  let messages = await messageHistory.getMessages();
  //console.log(messages);
  const response = json({
    messages: messages.map((message) =>
      message instanceof AIMessage
        ? {
            type: "ai",
            text: message.content,
            timestamp: message.additional_kwargs.timestamp,
            name: portalName,
          }
        : {
            type: "human",
            text: message.content,
            timestamp: message.additional_kwargs.timestamp,
            name: "user",
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
