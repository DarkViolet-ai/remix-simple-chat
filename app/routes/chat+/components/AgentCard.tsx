import { NavLink } from "@remix-run/react";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";

type AgentCardProps = {
  agent: {
    name: string;
    model: string;
    systemPrompt: string;
  };
  chatId: string;
};

export default function AgentCard({ agent, chatId }: AgentCardProps) {
  return (
    <NavLink to={`/chat/agent-chat/${chatId}/agent/${agent.name}`}>
      <VStack className="w-64 h-80 m-4 p-4 hover:shadow-lg transition-shadow border border-gray-200 rounded">
        <Text className="mb-2 text-xl font-semibold">{agent.name}</Text>
        <Text className="mb-2 text-sm">Model: {agent.model}</Text>
        <Text className="overflow-y-auto flex-grow text-sm">
          {agent.systemPrompt}
        </Text>
      </VStack>
    </NavLink>
  );
}
