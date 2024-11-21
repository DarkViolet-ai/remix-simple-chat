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
} from "../server-utils/textGen.server";

export const portalChatAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const sessionId = (await getSessionIdFromRequest(request)) || uuid();
  const { portalName } = params as { portalName: string };
  console.log("session id in action", sessionId);
  const formData = await request.formData();
  const chatInput = formData.get("chatInput");
  console.log("received chat input", chatInput);
  const system = formData.get("system");
  console.log("received system", system);

  const systemPrompt = system as string;
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
