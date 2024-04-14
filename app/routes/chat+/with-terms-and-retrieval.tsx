import Flex from "~/components/buildingBlocks/flex";
import ChatComponent from "./components/chatComponentWithTerms";
import { ChatLoaderData, chatLoader } from "./loaders/chatLoaderWithTerms";
import { chatAction } from "./actions/chatActionWithRetrieval";
import { useLoaderData } from "@remix-run/react";

export const loader = chatLoader;

export const action = chatAction;

export default function Chat() {
  const { messages, acceptedTerms } = useLoaderData<ChatLoaderData>();
  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      <ChatComponent messages={messages} acceptedTerms={acceptedTerms} />
    </Flex>
  );
}
