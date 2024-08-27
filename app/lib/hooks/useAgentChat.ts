import { ChatInput } from "~/routes/api+/agent-chat";
import { Chat, ChatFromDb } from "../data/postgres/chatSchema.server";
import { useApiFetcher } from "./useApiFetcher";
import { useEffect, useState } from "react";

export const useAgentChat = (chatId?: string) => {
  const fetcher = useApiFetcher<ChatFromDb>();
  const [activeChatId, setActiveChatId] = useState<string | null>(
    chatId || null
  );

  const [revalidate, setRevalidate] = useState(false);

  const isLoading = fetcher.state !== "idle";
  const chat = fetcher.data?.data;
  const error = fetcher.data?.error;

  useEffect(() => {
    chat && setActiveChatId(chat.id);
  }, [chat]);

  useEffect(() => {
    if (chatId && fetcher.state === "idle" && (!fetcher.data || revalidate)) {
      setRevalidate(false);
      fetcher.load(`/api/agent-chat?chatId=${chatId}`);
    }
  }, [chatId, fetcher.state, revalidate, fetcher.data]);

  const submitChatInput = (chatInputData: ChatInput) => {
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
  };
};
