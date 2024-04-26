import {
  ArrowRightDown,
  ArrowUpLeftIcon,
  BoxCheckedIcon,
  BoxUncheckedIcon,
  CircleArrowUp,
  RefreshIcon,
} from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import IconButton from "~/components/buildingBlocks/iconButton";
import TextArea from "~/components/buildingBlocks/textArea";
import VStack from "~/components/buildingBlocks/vStack";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Flex from "~/components/buildingBlocks/flex";
import {
  Form,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import BouncingDots from "~/components/specialty/bouncingDots";
import Transition from "~/components/buildingBlocks/transition";
import HStack from "~/components/buildingBlocks/hStack";
import Box from "~/components/buildingBlocks/box";
import Icon from "~/components/buildingBlocks/icon";
import FormatDate from "~/utils/formatDate";
import RenderParagraphs from "~/components/buildingBlocks/renderParagraphs";
import Center from "~/components/buildingBlocks/center";
import { usePortalChat } from "~/lib/hooks/usePortalChat";

export type ChatData = {
  messages: { text: string; timestamp: string; type: "ai" | "human" }[];
  acceptedTerms: { accepted: boolean; timestamp: string } | null;
};

export default function BaseChatComponent({
  buttonClassName = "",
  aiBubbleClassName = "",
  userBubbleClassName = "",
  aiChatbotName = "AI Chatbot",
  iconClassName = "",
  portalName,
  systemPrompt,
}: {
  buttonClassName?: string;
  aiBubbleClassName?: string;
  userBubbleClassName?: string;
  aiChatbotName?: string;
  iconClassName?: string;
  portalName: string;
  systemPrompt: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { isLoading, submitChatMessage, clearChat, messages } = usePortalChat({
    portalName: portalName,
    systemPrompt: systemPrompt,
  });
  console.log("messages", messages);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("chatInput") as string;
    submitChatMessage(message);
  };

  useEffect(() => {
    if (!isLoading) {
      formRef.current?.reset();
    }
  }, [isLoading]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitChatMessage(event.currentTarget.value);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current !== null) {
      const { scrollHeight, clientHeight, scrollTop } =
        chatContainerRef.current;
      console.log(scrollHeight, clientHeight, scrollTop);
      const maxScrollTop = scrollHeight - clientHeight;
      chatContainerRef.current.scrollTop = maxScrollTop;
    }
  }, [messages.length]);

  return (
    <>
      <FlexFull className="px-[1vh] pt-[1vh] rounded-b-none xl:rounded-b-[0.7vh]">
        <VStackFull
          className={`h-[88svh] md:h-[87svh] justify-between`}
          gap="gap-[0px]"
        >
          <FlexFull
            ref={chatContainerRef}
            className={`flex-shrink-0 overflow-x-hidden overflow-y-auto insetShadowXl bg-slate-500 border-970-md h-[60svh]`}
          >
            <VStackFull className={`h-fit p-[1.5vh]`} gap="gap-[1.5vh]">
              {messages.map((entry, index) => {
                return entry.type === "ai" ? (
                  <AIChatBubble
                    key={index}
                    text={entry.text}
                    timestamp={entry.timestamp}
                    username={aiChatbotName}
                    className={aiBubbleClassName}
                  />
                ) : (
                  <UserChatBubble
                    key={index}
                    text={entry.text}
                    timestamp={entry.timestamp}
                    username={"user"}
                    className={userBubbleClassName}
                  />
                );
              })}
            </VStackFull>
          </FlexFull>

          <Form
            ref={formRef}
            method="post"
            className="w-full h-[25svh] md:h-[24svh]"
            onSubmit={onSubmit}
          >
            {" "}
            <HStackFull className={`h-full p-[0.5vh] pb-[1.5vh] items-center`}>
              <FlexFull className={`relative h-[25svh] md:h-[24svh]`}>
                {isLoading && (
                  <FlexFull className="h-full z-10 absolute top-0 left-0 bg-col-850 justify-center items-center backdrop-blur-[3px]">
                    <BouncingDots />
                  </FlexFull>
                )}

                <TextArea
                  textAreaHeight="h-[25svh] md:h-[24svh]"
                  name="chatInput"
                  placeholder="Let's chat!"
                  onKeyDown={handleKeyDown}
                  className="absolute top-0 left-0"
                />
              </FlexFull>
              <VStack className="h-full items-center justify-around">
                <IconButton
                  icon={RefreshIcon}
                  tooltipPlacement="left"
                  type="unstyled"
                  iconClassName={`text-[2.7vh] ${iconClassName}`}
                  containerClassName={`${buttonClassName} border-970-md shadowBroadNormal`}
                  onClick={clearChat}
                />

                <IconButton
                  icon={CircleArrowUp}
                  htmlType="submit"
                  type="unstyled"
                  containerClassName={`${buttonClassName} border-970-md shadowBroadNormal`}
                  iconClassName={`text-[2.7vh] ${iconClassName}`}
                />
              </VStack>
            </HStackFull>{" "}
          </Form>
        </VStackFull>
      </FlexFull>
    </>
  );
}

interface ChatBubbleProps {
  bg?: string;
  text?: string;
  timestamp?: string;
  username?: string;
  className?: string;
}

const iconStyles = "text-[3vh] text-col-100";
const headerSizes = "text-[1.9vh] leading-[2.4vh]";
const chatSizes = "text-[1.9vh] leading-[2.4vh]";
const aiChatBubble =
  "w-fit h-fit shadowNarrowTight rounded-[1vh] border-970-md";
const userChatBubble = "w-fit h-fit shadowNarrowTight rounded-[1vh]";

export function AIChatBubble({
  text = "",
  timestamp = "",
  username = "",
  className,
}: ChatBubbleProps) {
  return (
    <Transition className="w-full justify-start rounded-none p-[0.5vh]">
      <FlexFull className="justify-start rounded-none">
        <HStack className="h-full gap-[0px] w-fit items-center ">
          <Flex className="h-full items-center">
            <Icon icon={ArrowUpLeftIcon} iconClassName={iconStyles} />
          </Flex>
          <Box className={`${aiChatBubble} ${className}`}>
            <VStack className="w-full gap-[0px] items-start">
              <HStackFull
                className={`justify-between rounded-b-none items-center bg-slate-800/50 px-[1vh] text-stone-100`}
              >
                <p className={headerSizes}>{username}</p>
                <FormatDate inputDate={timestamp} />
              </HStackFull>
              <Flex className="w-full px-[1vh] pb-[0.2vh] text-stone-100 subtleTextShadow">
                <RenderParagraphs
                  textItem={text}
                  textClassName={`${chatSizes} text-slate-100`}
                />
              </Flex>
            </VStack>
          </Box>
        </HStack>
      </FlexFull>
    </Transition>
  );
}

export function UserChatBubble({
  bg,
  text = "",
  timestamp = "",
  username = "",
  className,
}: ChatBubbleProps) {
  return (
    <Transition className="w-full justify-start rounded-none p-[0.5vh]">
      <FlexFull className="justify-end ">
        <HStack className="h-full gap-[0px] w-fit items-center justify-end">
          <Box className={`${userChatBubble} ${className}`}>
            {" "}
            <VStackFull className="gap-[0px] items-start">
              <HStackFull
                className={`justify-between bg-slate-800/70 px-[1vh] rounded-b-none items-center text-stone-100 rounded-[0.8vh]`}
              >
                <p className={headerSizes}>{username}</p>
                <FormatDate inputDate={timestamp} />
              </HStackFull>
              <FlexFull className="px-[1vh] pb-[0.2vh] text-stone-100 subtleTextShadow">
                <RenderParagraphs textItem={text} textClassName={chatSizes} />
              </FlexFull>
            </VStackFull>
          </Box>
          <Flex className="h-full items-center">
            <Icon icon={ArrowRightDown} iconClassName={iconStyles} />
          </Flex>
        </HStack>
      </FlexFull>
    </Transition>
  );
}
