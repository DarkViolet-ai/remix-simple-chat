import { useParams } from "@remix-run/react";
import AgentUserChatComponent from "./components/agentUserChatComponent";
import Flex from "~/components/buildingBlocks/flex";

export default function Chat() {
  const { chatId, username } = useParams<{
    chatId: string;
    username: string;
  }>();
  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      {chatId && username && (
        <AgentUserChatComponent chatId={chatId} username={username} />
      )}
    </Flex>
  );
}
