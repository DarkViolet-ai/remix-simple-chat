import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
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
import {
  getChat,
  createChat,
  createChatMessage,
  getAgent,
} from "~/lib/data/postgres/dbApi.server";
import { CreateChatMessageInput } from "~/lib/data/postgres/chatMessageSchema.server";
import { apiReturn } from "~/utils/apiReturn";
import { makeApiFunction } from "~/utils/makeApi.server";
import { entityEvents } from "~/lib/server-utils/events.server";

const chatInputSchema = z.object({
  chatId: z.string(),
  chatInput: z.string().optional(),
  agentName: z.string().optional(),
  username: z.string().optional(),
});

export type ChatInput = z.infer<typeof chatInputSchema>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const _agentChat = async () => {
    const formData = await request.formData();
    const { chatId, chatInput, agentName, username } = chatInputSchema.parse(
      Object.fromEntries(formData)
    );

    if (chatInput && chatInput.length !== 0) {
      // we might not have chat input if it is just agents talking to each other
      const chatMessage = {
        role: "user",
        name: username,
        content: chatInput as string,
        chatId: chatId,
      } as CreateChatMessageInput;

      await createChatMessage(chatMessage);
      entityEvents.newEntityOutput(chatId).emit();
      // if there is chat input, we notify all client agents that the chat has been updated
      return await getChat(chatId);
    }
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENROUTER_BASE_URL,
      defaultHeaders: {
        "HTTP-Referer": "https://darkviolet.ai",
        "X-Title": "Dark Violet",
      },
    });

    const agent = agentName ? await getAgent(agentName) : null;
    if (!agent) {
      throw new Error("Agent not found");
    }

    const _chat = await getChat(chatId);
    const messages = _chat.messages;
    if (messages[messages.length - 1].name === agentName) {
      // this agent was the last to speak, so we can return the chat as is
      return _chat;
    }
    console.log("messages", messages);
    const result = await openai.chat.completions.create({
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: agent.systemPrompt!,
        },
        ...messages,
      ],
      model: "qwen/qwen-2-72b-instruct",
    });

    console.log("result", result);
    await createChatMessage({
      role: "assistant",
      name: agentName,
      content: result.choices[0].message.content,
      chatId: chatId,
    } as CreateChatMessageInput);
    entityEvents.newEntityOutput(chatId).emit();
    return await getChat(chatId);
  };
  return apiReturn(await makeApiFunction(request, _agentChat)());
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const _getAgentChat = async () => {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const chatId = searchParams.get("chatId");
    if (!chatId) {
      const createNew = searchParams.get("createNew");
      if (createNew) {
        const chat = await createChat({
          title: "New Chat",
          isPrivate: false,
          username: "user",
        });
        return json(chat);
      }
      return json({ error: "No chatId provided" });
    }
    const chat = await getChat(chatId!);
    return chat;
  };
  return apiReturn(await makeApiFunction(request, _getAgentChat)());
};
