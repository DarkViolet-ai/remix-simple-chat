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

export const chatAction = async ({ request }: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  console.log("session id", sessionId);

  // you can use the OpenAI, TogetherAI or DeepInfra models.  Just copy and
  // paste the name of the model you want to use below.  A number of examples are shown.
  // const chatModel = new ChatOpenAI({
  // const chatModel = new ChatTogetherAI({
  const chatModel = new ChatDeepInfra({
    //modelName: "Gryphe/MythoMax-L2-13b", // deepinfra
    //modelName: "gpt-4-turbo-preview", // openai
    temperature: 0.8,
    //modelName: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO", // together
    //modelName: "snorkelai/Snorkel-Mistral-PairRM-DPO", // together
    //modelName: "Qwen/Qwen1.5-72B-Chat", // together
    //modelName: "upstage/SOLAR-10.7B-Instruct-v1.0", //together
    //modelName: "DeepInfra/pygmalion-13b-4bit-128g", // deepinfra
    //modelName: "lizpreciatior/lzlv_70b_fp16_hf", // deepinfra
    modelName: "cognitivecomputations/dolphin-2.6-mixtral-8x7b", // deepinfra
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a helpful assistant, having a conversation with a user. You can help the user with a variety of tasks, such as answering questions, providing information, or assisting with tasks. You are friendly, polite, and professional. You are knowledgeable and can provide accurate information. You are patient and understanding, and you can help the user with any questions or concerns they may have. You are here to help the user and provide them with the information they need.`,
    ],
    new MessagesPlaceholder("chat"),
  ]);

  const messageHistory = new RedisChatMessageHistory({
    sessionId: `dv-chat:${sessionId}`,
    client: redis,
    url: process.env.REDIS_URL,
  });
  const formData = await request.formData();
  const chatInput = formData.get("chatInput");

  const chatMessage = new HumanMessage(chatInput as string, {
    timestamp: new Date().toISOString(),
  });

  const outputParser = new StringOutputParser();
  await messageHistory.addMessage(chatMessage);
  const messages = await messageHistory.getMessages();

  const response = await prompt
    .pipe(chatModel)
    .pipe(outputParser)
    .invoke({ chat: messages });

  await messageHistory.addMessage(
    new AIMessage(response, { timestamp: new Date().toISOString() })
  );

  console.log("reponse", response);
  const responseJson = json({ response });
  return await setSessionIdOnResponse(responseJson, sessionId);
};
