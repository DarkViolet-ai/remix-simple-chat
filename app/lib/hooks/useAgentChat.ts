import { ChatInput } from "~/routes/api+/agent-chat";
import { Chat, ChatFromDb } from "../data/postgres/chatSchema.server";
import { useApiFetcher } from "./useApiFetcher";
import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { useEventSource } from "remix-utils/sse/react";

export type UseAgentChatProps = {
  chatId?: string;
  includeChat?: boolean;
  agentName?: string;
  username?: string;
};

export const useAgentChat = ({
  chatId,
  includeChat,
  agentName,
  username,
}: UseAgentChatProps) => {
  const fetcher = useApiFetcher<ChatFromDb>();
  const [activeChatId, setActiveChatId] = useState<string | null>(
    chatId || null
  );
  const { agent } = useAgent(agentName);
  const eventSourcePath = `/api/agent-chat/${chatId}.stream`;
  const eventData = useEventSource(eventSourcePath);

  const [revalidate, setRevalidate] = useState(false);

  const isLoading = fetcher.state !== "idle";
  const chat = fetcher.data?.data;
  const error = fetcher.data?.error;

  useEffect(() => {
    // in this mannner, the agent "runs" on the client.
    if (eventData) {
      console.log("eventData", eventData);
      if (!agent) {
        return;
      }
      const chatInputData = {
        chatId: activeChatId,
        chatInput: eventData,
        agentName: agent.name,
        systemPrompt: agent.systemPrompt,
      };
      fetcher.submit(
        { chatInputData },
        { method: "POST", action: "/api/agent-chat" }
      );
    }
    setRevalidate(true);
  }, [eventData]);

  useEffect(() => {
    chat && setActiveChatId(chat.id);
  }, [chat]);

  useEffect(() => {
    if (
      includeChat &&
      chatId &&
      fetcher.state === "idle" &&
      (!fetcher.data || revalidate)
    ) {
      setRevalidate(false);
      fetcher.load(`/api/agent-chat?chatId=${chatId}`);
    }
  }, [chatId, fetcher.state, revalidate, fetcher.data]);

  const submitChatInput = (chatInput: string) => {
    if (!agent) {
      return;
    }
    const chatInputData = {
      chatId: activeChatId,
      chatInput: chatInput,
      username: username || "user",
    };
    fetcher.submit(
      { chatInputData },
      { method: "POST", action: "/api/agent-chat" }
    );
  };

  const createNewChat = () => {
    fetcher.submit(
      { createNew: true },
      { method: "GET", action: "/api/agent-chat" }
    );
  };

  return {
    isLoading,
    chat,
    error,
    submitChatInput,
    createNewChat,
    revalidate: () => setRevalidate(true),
  };
};
