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

export const chatAction = async ({ request }: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  console.log("session id", sessionId);

  // you can use the OpenAI, TogetherAI or DeepInfra models.  Just copy and
  // paste the name of the model you want to use below.  A number of examples are shown.
  // const chatModel = new ChatOpenAI({
  // const chatModel = new ChatTogetherAI({
  // const chatModel = new ChatDeepInfra({
  //   //modelName: "Gryphe/MythoMax-L2-13b", // deepinfra
  //   //modelName: "gpt-4-turbo-preview", // openai
  //   temperature: 0.8,
  //   //modelName: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO", // together
  //   //modelName: "snorkelai/Snorkel-Mistral-PairRM-DPO", // together
  //   //modelName: "Qwen/Qwen1.5-72B-Chat", // together
  //   //modelName: "upstage/SOLAR-10.7B-Instruct-v1.0", //together
  //   //modelName: "DeepInfra/pygmalion-13b-4bit-128g", // deepinfra
  //   //modelName: "lizpreciatior/lzlv_70b_fp16_hf", // deepinfra
  //   //modelName: "cognitivecomputations/dolphin-2.6-mixtral-8x7b", // deepinfra
  //   //modelName: "meta-llama/Meta-Llama-3-8B-Instruct", // deepinfra
  //   modelName: "HuggingFaceH4/zephyr-orpo-141b-A35b-v0.1", // deepinfra,
  //   //modelName: "meta-llama/Meta-Llama-3-70B-Instruct", // deepinfra,
  // });

  console.log("RUNPOD_API_KEY:", process.env.RUNPOD_API_KEY);
  console.log("RUNPOD_BASE_URL:", process.env.RUNPOD_BASE_URL);

  const openai = new OpenAI({
    apiKey: process.env.RUNPOD_API_KEY,
    baseURL: process.env.RUNPOD_BASE_URL,
  });

  const systemPrompt =
    "You are a helpful assistant, having a conversation with a user. You can help the user with a variety of tasks, such as answering questions, providing information, or assisting with tasks. You are friendly, polite, and professional. You are knowledgeable and can provide accurate information. You are patient and understanding, and you can help the user with any questions or concerns they may have. You are here to help the user and provide them with the information they need.";

  const formData = await request.formData();
  const chatInput = formData.get("chatInput");

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
    model: "Qwen/Qwen2-Math-7B-Instruct",
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
