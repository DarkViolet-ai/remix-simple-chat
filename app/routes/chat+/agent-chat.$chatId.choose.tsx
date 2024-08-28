import { useTypedLoaderData } from "remix-typedjson";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getAgents } from "~/lib/data/postgres/dbApi.server";
import { typedjson } from "remix-typedjson";
import { NavLink, useParams } from "@remix-run/react";
import AgentSelection from "./components/AgentSelection";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const agents = await getAgents();
  return typedjson({ agents });
};

export default function ChooseAgent() {
  const { agents } = useTypedLoaderData<typeof loader>();
  const { chatId } = useParams<{ chatId: string }>();

  if (!chatId) {
    return <Text>Error: Chat ID not found</Text>;
  }

  return (
    <VStack className="w-full items-center p-4">
      <Text className="mb-6 text-2xl font-bold">Choose an Agent</Text>
      <AgentSelection agents={agents} chatId={chatId} />
      <NavLink
        to="/agent/new"
        className="w-64 h-80 m-4 p-4 flex items-center justify-center text-center border border-gray-200 rounded hover:shadow-lg transition-shadow"
      >
        <Text className="text-xl font-semibold">Create New Agent</Text>
      </NavLink>
    </VStack>
  );
}
