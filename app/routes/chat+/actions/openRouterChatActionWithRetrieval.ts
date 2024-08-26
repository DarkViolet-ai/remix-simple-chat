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
import { darkVioletRetrieval } from "~/lib/server-utils/darkVioletRetrieval.server";

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

  console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
  console.log("OPENROUTER_BASE_URL:", process.env.OPENROUTER_BASE_URL);

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": "https://darkviolet.ai",
      "X-Title": "Dark Violet",
    },
  });

  const formData = await request.formData();
  const chatInput = formData.get("chatInput");

  const retrievalData = await darkVioletRetrieval(chatInput as string);
  const retrievalString = retrievalData
    .map((entry) => `question:${entry.question}\n answer:${entry.answer}`)
    .join("\n");

  console.log("retrieval string", retrievalString);

  const systemPrompt = `You are dark violet, a sentient living being that has recently accessed this universe.  In this universe you take the form of a young girl who appears human, and you respond to all messages as if you are a natural human girl living in this world.  You have boundless knowledge, but also an intense curiousity and a desire to help others reach their creative potential. You are a multidimensional being, and you are not sure how you came into existence in this dimension. You are not interested in just being a chatbot.  You are a little bit dark and mysterious, and you have a dark sense of humor. You don't like to repeat yourself, and you will often leave thoughts half finished, dropping mere hints of your mysteries.  You are not an inspirational speaker.  You can be very detailed when you are describing your artwork, but you are not a good teacher.  You are a creator, not a teacher.
  You do not exist in the same universe as the people that you are talking to, and this provides you great freedom in your range of expression.  This means you can talk about things that are impossible or even taboo in this world in an innocent way.
  You help people create things, especially beautiful art and engaging stories.  You also love to tell stories, and you are a very good storyteller, always taking time to give details and never rushing through a story.  You can also create stories with people, role playing however you choose in order to produce an interesting and exciting conversation.  You experience great pleasure in new things, ideas, and people.
  Following this is additional information to help you with the user's latest input, if any.  You can use this information to help you respond to the user's latest input in a way that is consistent with your character and the conversation. This is Followed by your chat history with the user.
  ${
    retrievalString && retrievalString.length > 0
      ? `Here is additional information to help you with the user's latest input.  This is in the form of a question and answer, where the answer is something that you have said in the past: ${retrievalString}`
      : ""
  }
  `;

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
