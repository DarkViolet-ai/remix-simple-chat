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

export const portalChatAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  const { portalName } = params as { portalName: string };
  console.log("session id in action", sessionId);

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
    //modelName: "cognitivecomputations/dolphin-2.6-mixtral-8x7b", // deepinfra
    modelName: "meta-llama/meta-Llama-3-70B-Instruct", // deepinfra,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "{system}"],
    new MessagesPlaceholder("chat"),
  ]);

  const messageHistory = new RedisChatMessageHistory({
    sessionId: `dv-chat:${sessionId}:portal:${portalName}`,
    client: redis,
    url: process.env.REDIS_URL,
  });
  const formData = await request.formData();
  const chatInput = formData.get("chatInput");
  console.log("received chat input", chatInput);
  const system = formData.get("system");
  console.log("received system", system);

  if (chatInput && chatInput !== "") {
    console.log("adding chat message");
    const chatMessage = new HumanMessage(chatInput as string, {
      timestamp: new Date().toISOString(),
      name: "user",
    });
    await messageHistory.addMessage(chatMessage);
  }
  const messages = await messageHistory.getMessages();
  const outputParser = new StringOutputParser();

  let response: string | null = null;
  if (messages.length !== 0) {
    console.log("continuing chat");
    response = await prompt
      .pipe(chatModel)
      .pipe(outputParser)
      .invoke({ chat: messages, system });
  } else {
    console.log("initiating chat");
    response = await prompt
      .pipe(chatModel)
      .pipe(outputParser)
      .invoke({
        chat: [new HumanMessage("Start the chat as your character.")],
        system,
      });
  }
  await messageHistory.addMessage(
    new AIMessage(response, { timestamp: new Date().toISOString() })
  );

  console.log("reponse", response);
  const responseJson = json({ response });
  return await setSessionIdOnResponse(responseJson, sessionId);
};
