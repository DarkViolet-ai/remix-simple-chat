import { useParams } from "@remix-run/react";
import AgentChatComponent from "./components/agentChatComponent";
import Flex from "~/components/buildingBlocks/flex";

export default function Chat() {
  const { chatId, agentName } = useParams<{
    chatId: string;
    agentName: string;
  }>();
  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      {chatId && agentName && (
        <AgentChatComponent chatId={chatId} agentName={agentName} />
      )}
    </Flex>
  );
}
