import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ChatLoaderData } from "~/loaders/portalChatLoader";

export function usePortalChat({
  portalName,
  systemPrompt,
  getInitialAiMessage = true,
}: {
  portalName: string;
  systemPrompt: string;
  getInitialAiMessage?: Boolean;
}) {
  const chatFetcher = useFetcher<ChatLoaderData>();
  const chatSubmitter = useFetcher();
  const [shouldRevalidate, setShouldRevalidate] = useState(false);

  useEffect(() => {
    console.log("getting chat messages");
    if (
      (shouldRevalidate || !chatFetcher.data) &&
      chatFetcher.state === "idle"
    ) {
      chatFetcher.load(`/api/portal-chat/${portalName}`);
      setShouldRevalidate(false);
    }
  }, [
    chatFetcher,
    shouldRevalidate,
    portalName,
    chatFetcher.data,
    chatFetcher.state,
  ]);

  useEffect(() => {
    if (
      getInitialAiMessage &&
      chatFetcher.state === "idle" &&
      chatSubmitter.state === "idle" &&
      !chatSubmitter.data &&
      chatFetcher.data &&
      chatFetcher.data.messages.length === 0
    ) {
      console.log("submitting initial chat message");
      chatSubmitter.submit(
        { system: systemPrompt, chatInput: "" },
        {
          action: `/api/portal-chat/${portalName}`,
          method: "POST",
        }
      );
    }
  }, [
    chatFetcher.data,
    chatFetcher.state,
    chatSubmitter.state,
    chatSubmitter.data,
    portalName,
  ]);

  useEffect(() => {
    if (chatSubmitter.data) {
      setShouldRevalidate(true);
    }
  }, [chatSubmitter.data]);

  const submitChatMessage = async (message: string) => {
    chatSubmitter.submit(
      { system: systemPrompt, chatInput: message },
      {
        action: `/api/portal-chat/${portalName}`,
        method: "POST",
      }
    );
  };

  const clearChat = async () => {
    chatFetcher.load(`/api/portal-chat/${portalName}?clearHistory=true`);
  };
  const isLoading =
    chatFetcher.state === "loading" || chatSubmitter.state === "submitting";

  return {
    isLoading,
    submitChatMessage,
    clearChat,
    messages: chatFetcher.data?.messages || [],
  };
}
