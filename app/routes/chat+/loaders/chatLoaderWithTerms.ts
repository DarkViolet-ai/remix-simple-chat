import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { AIMessage } from "@langchain/core/messages";
import { RedisChatMessageHistory } from "@langchain/community/stores/message/ioredis";
import { redis } from "~/lib/server-utils/redis.server";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";

type TermsAcceptance = {
  accepted: boolean;
  timestamp: string;
};

const setAcceptedTerms = async (sessionId: string) => {
  const key = `accepted-terms:${sessionId}`;
  await redis.set(
    key,
    JSON.stringify({ accepted: true, timestamp: new Date().toISOString() })
  );
};

const unsetAcceptedTerms = async (sessionId: string) => {
  const key = `accepted-terms:${sessionId}`;
  await redis.del(key);
};

const getAcceptedTerms = async (sessionId: string) => {
  const key = `accepted-terms:${sessionId}`;
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as TermsAcceptance) : null;
};

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
    const response = redirect("/chat/with-terms-and-retrieval");
    return await setSessionIdOnResponse(response, sessionId);
  }
  const acceptTerms = searchParams.get("acceptTerms");
  if (acceptTerms) {
    console.log("accept terms", acceptTerms);
    if (acceptTerms === "true") await setAcceptedTerms(sessionId);
    else await unsetAcceptedTerms(sessionId);
    const response = redirect("/chat/with-terms-and-retrieval");
    return await setSessionIdOnResponse(response, sessionId);
  }
  const acceptedTerms = await getAcceptedTerms(sessionId);

  console.log("session id", sessionId);
  console.log("accepted terms", acceptedTerms);
  const messageHistory = new RedisChatMessageHistory({
    sessionId: `dv-chat:${sessionId}`,
    client: redis,
    url: process.env.REDIS_URL,
  });

  //await messageHistory.addMessage(new AIMessage("Hello!"));
  let messages = await messageHistory.getMessages();
  if (messages.length === 0) {
    messageHistory.addMessage(
      new AIMessage(
        "Hello! I'm Dark Violet.  What can I help you with today?",
        { timestamp: new Date().toISOString() }
      )
    );
    messages = await messageHistory.getMessages();
  }
  //console.log(messages);
  const response = json({
    messages: messages.map((message) =>
      message instanceof AIMessage
        ? {
            type: "ai",
            text: message.content,
            timestamp: message.additional_kwargs.timestamp,
          }
        : {
            type: "human",
            text: message.content,
            timestamp: message.additional_kwargs.timestamp,
          }
    ),
    acceptedTerms,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  });
  return await setSessionIdOnResponse(response, sessionId);
};

export type ChatLoaderData = {
  messages: { type: "ai" | "human"; text: string; timestamp: string }[];
  acceptedTerms: TermsAcceptance | null;
};
