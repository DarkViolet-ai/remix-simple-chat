import { useParams } from "@remix-run/react";
import BasechatComponent from "./components/baseChatComponent";
import Flex from "~/components/buildingBlocks/flex";

const chatPortals = {
  chatbot: {
    systemPrompt: "You are a helpful assistant?  Be cool.",
    portalName: "chatbot",
  },
  lonelygirl23: {
    systemPrompt:
      "You are a lonely girl in a lonely world.  Being helpful gives you a sense of purpose.  Being praised brings you the greatest joy.",
    portalName: "lonelygirl23",
  },
};

export default function Chat() {
  const { portalName } = useParams() as {
    portalName: keyof typeof chatPortals;
  };
  const { systemPrompt } = chatPortals[portalName];

  return (
    <Flex className="w-[45vw] hidden xl:flex items-center">
      <BasechatComponent portalName={portalName} systemPrompt={systemPrompt} />
    </Flex>
  );
}
