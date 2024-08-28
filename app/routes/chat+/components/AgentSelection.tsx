import Flex from "~/components/buildingBlocks/flex";
import AgentCard from "./AgentCard";

type AgentSelectionProps = {
  agents: Array<{
    name: string;
    model: string;
    systemPrompt: string;
  }>;
  chatId: string;
};

export default function AgentSelection({
  agents,
  chatId,
}: AgentSelectionProps) {
  return (
    <Flex className="justify-center">
      {agents.map((agent) => (
        <AgentCard key={agent.name} agent={agent} chatId={chatId} />
      ))}
    </Flex>
  );
}
