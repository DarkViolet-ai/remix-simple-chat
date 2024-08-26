import { ActionFunctionArgs, json } from "@remix-run/node";

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

  console.log("RUNPOD_API_KEY:", process.env.RUNPOD_API_KEY);
  console.log("RUNPOD_BASE_URL:", process.env.RUNPOD_BASE_URL);

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

  const systemPrompt = "You are a helpful assistant..."; // Your existing system prompt

  try {
    console.log("About to make API call");
    const response = await fetch(
      `${process.env.RUNPOD_BASE_URL}/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2-Math-7B-Instruct",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.8,
        }),
      }
    );

    console.log("API response status:", response.status);
    console.log("api response", response);
    const result = await response.json();
    console.log("API response body:", result);

    if (result.choices && result.choices.length > 0) {
      const assistantMessage = {
        role: "assistant",
        name: "assistant",
        content: result.choices[0].message.content,
        timestamp: new Date().toISOString(),
      } as Message;

      await addMessage(sessionId, assistantMessage);

      return await setSessionIdOnResponse(
        new Response(assistantMessage.content),
        sessionId
      );
    } else {
      throw new Error("No response from the model");
    }
  } catch (error) {
    console.error("Error calling API:", error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
};
