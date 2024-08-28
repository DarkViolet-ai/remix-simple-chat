import { useEffect } from "react";
import { useAgentChat } from "~/lib/hooks/useAgentChat";
import { useNavigate } from "@remix-run/react";
import Flex from "~/components/buildingBlocks/flex";
import Center from "~/components/buildingBlocks/center";
export default function AgentChatNew() {
  const { createNewChat, isLoading, chat } = useAgentChat({});
  const navigate = useNavigate();
  useEffect(() => {
    createNewChat();
  }, []);
  useEffect(() => {
    if (!isLoading && chat) {
      navigate(`/chat/agent-chat/${chat.id}.choose`);
    }
  }, [isLoading, chat]);
  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      <Center className="w-full h-full">
        {chat?.id || "Creating new chat..."}
      </Center>
    </Flex>
  );
}
