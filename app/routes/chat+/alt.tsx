import Flex from "~/components/buildingBlocks/flex";
import ChatComponent from "./components/chatComponent";
import { ChatLoaderData, chatLoader } from "./loaders/altChatLoader";
import { chatAction } from "./actions/openRouterChatActionWithRetrieval";
import { useLoaderData } from "@remix-run/react";

export const loader = chatLoader;

export const action = chatAction;

export default function Chat() {
  const { messages } = useLoaderData<ChatLoaderData>();
  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      <ChatComponent messages={messages} />
    </Flex>
  );
}
