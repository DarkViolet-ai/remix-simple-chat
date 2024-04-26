import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ChatLoaderData } from "~/loaders/portalChatLoader";

export function useSingleTextGen({ systemPrompt }: { systemPrompt: string }) {
  const chatSubmitter = useFetcher<{ response: string }>();

  const submitChatMessage = async (message: string) => {
    chatSubmitter.submit(
      { system: systemPrompt, userPrompt: message },
      {
        action: `/api/single-text-gen`,
        method: "POST",
      }
    );
  };

  const isLoading = chatSubmitter.state === "submitting";

  return {
    isLoading,
    submitChatMessage,
    response: chatSubmitter.data?.response,
  };
}
