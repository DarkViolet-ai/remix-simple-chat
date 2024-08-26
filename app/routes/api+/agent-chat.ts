import { ActionFunctionArgs, json } from "@remix-run/node";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { RedisChatMessageHistory } from "@langchain/community/stores/message/ioredis";
import { redis } from "~/lib/server-utils/redis.server";
import { ChatDeepInfra } from "~/lib/server-utils/deepInfraLangChain";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";
import { OpenAI } from "openai";
import { addMessage, getMessages, Message } from "~/lib/data/messages";
import { z } from "zod";

const ChatInputSchema = z.object({
  chatInput: z.string(),
  systemPrompt: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  console.log("session id", sessionId);

  const formData = await request.formData();
  const chatInput = formData.get("chatInput");

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": "https://darkviolet.ai",
      "X-Title": "Dark Violet",
    },
  });

  const systemPrompt =
    "You are a helpful assistant, having a conversation with a user. You can help the user with a variety of tasks, such as answering questions, providing information, or assisting with tasks. You are friendly, polite, and professional. You are knowledgeable and can provide accurate information. You are patient and understanding, and you can help the user with any questions or concerns they may have. You are here to help the user and provide them with the information they need.";

  const chatMessage = {
    role: "user",
    name: "user",
    content: chatInput as string,
    timestamp: new Date().toISOString(),
  } as Message;

  await addMessage(sessionId, chatMessage);
  const messages = await getMessages(sessionId);
  console.log("messages", messages);
  const result = await openai.chat.completions.create({
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
    model: "qwen/qwen-2-72b-instruct",
  });
  console.log("result", result);
  //console.log("reponse", result.choices[0].message.content);
  await addMessage(sessionId, {
    role: "assistant",
    name: "assistant",
    content: result.choices[0].message.content,
    timestamp: new Date().toISOString(),
  } as Message);
  return await setSessionIdOnResponse(
    new Response(result.choices[0].message.content),
    sessionId
  );
};
