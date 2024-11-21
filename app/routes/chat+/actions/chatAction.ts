import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  getSessionIdFromRequest,
  setSessionIdOnResponse,
} from "~/lib/server-utils/session";
import { v4 as uuid } from "uuid";
import {
  addMessageToHistory,
  generateText,
  getMessageHistory,
} from "~/lib/server-utils/textGen.server";

export const chatAction = async ({ request }: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  console.log("session id", sessionId);

  const systemPrompt = `You are a helpful assistant, having a conversation with a user. You can help the user with a variety of tasks, such as answering questions, providing information, or assisting with tasks. You are friendly, polite, and professional. You are knowledgeable and can provide accurate information. You are patient and understanding, and you can help the user with any questions or concerns they may have. You are here to help the user and provide them with the information they need.`;

  const formData = await request.formData();
  const chatInput = formData.get("chatInput");

  const chatMessage = {
    role: "user",
    name: "user",
    content: chatInput as string,
    timestamp: new Date().toISOString(),
  };

  // @ts-ignore openai types are a little mangled
  await addMessageToHistory(sessionId, chatMessage);

  const messages = await getMessageHistory(sessionId);

  const response = await generateText({
    messageHistory: messages,
    systemPrompt,
    options: {
      apiKey: process.env.DEEP_INFRA_API_KEY,
      baseURL: "https://api.deepinfra.com/v1/openai",
    },
    generateOptions: {
      temperature: 0.8,
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
    },
  });

  if (response) {
    await addMessageToHistory(sessionId, {
      role: "assistant",
      name: "DarkViolet",
      content: response,
      timestamp: new Date().toISOString(),
    });
  }

  console.log("reponse", response);
  const responseJson = json({ response });
  return await setSessionIdOnResponse(responseJson, sessionId);
};
