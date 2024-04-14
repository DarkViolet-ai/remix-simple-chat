import { CircleArrowUp, RefreshIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import IconButton from "~/components/buildingBlocks/iconButton";
import TextArea from "~/components/buildingBlocks/textArea";
import VStack from "~/components/buildingBlocks/vStack";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import { AIChatBubble, UserChatBubble } from "./chatBubbles";
import {
  Form,
  useFetcher,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import Modal from "~/components/buildingBlocks/modal";
import { useState } from "react";
import BouncingDots from "~/components/specialty/bouncingDots";
import ChatTermsOfServiceContent from "./chatTermsOfService";

export type ChatData = {
  messages: { text: string; timestamp: string; type: "ai" | "human" }[];
};

export default function ChatComponent({ messages }: ChatData) {
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  console.log(navigation.state);
  const chatHeight = "h-[92.5svh] sm:h-[90vh] xl:h-[90vh]";
  const chatWindowHeight = "h-[60svh] sm:h-[61vh] xl:h-[61vh]";
  const chatInputHeight = "h-[24svh] sm:h-[21vh] xl:h-[21vh] xxl:h-[17vh]";
  const isSubmitting = navigation.state === "submitting";
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit({ chatInput: event.currentTarget.value }, { method: "post" });
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
      <FlexFull className="h-full sm:h-fit bg-500-radial3op75 border-550-md px-[1vh] pt-[1vh] rounded-b-none xl:rounded-b-[0.7vh]">
        <VStackFull className={`${chatHeight} justify-between`} gap="gap-[0px]">
          <FlexFull
            ref={chatContainerRef}
            className={`${chatWindowHeight} flex-shrink-0 overflow-x-hidden overflow-y-auto insetShadowXl bg-700-radial4op25 border-970-md`}
          >
            <VStackFull className={`h-fit p-[1.5vh]`} gap="gap-[1.5vh]">
              {messages.map((entry, index) => {
                return entry.type === "ai" ? (
                  <AIChatBubble
                    key={index}
                    text={entry.text}
                    timestamp={entry.timestamp}
                    username={"Dark Violet"}
                  />
                ) : (
                  <UserChatBubble
                    key={index}
                    text={entry.text}
                    timestamp={entry.timestamp}
                    username={"user"}
                  />
                );
              })}
            </VStackFull>
          </FlexFull>
          <HStackFull className="justify-between items-center px-[1vh]">
            <IconButton
              icon={RefreshIcon}
              tooltipPlacement="left"
              label="clear chat"
              type="negative"
              onClick={() => setSearchParams({ clearHistory: "true" })}
            />
          </HStackFull>
          <Form ref={formRef} method="post" style={{ width: "100%" }}>
            {" "}
            <HStackFull className={`h-full p-[0.5vh] pb-[1.5vh] items-center`}>
              <FlexFull className={`relative ${chatInputHeight}`}>
                {isSubmitting && (
                  <FlexFull className="h-full z-10 absolute top-0 left-0 bg-col-850 justify-center items-center backdrop-blur-[3px]">
                    <BouncingDots />
                  </FlexFull>
                )}

                <TextArea
                  textAreaHeight={chatInputHeight}
                  name="chatInput"
                  placeholder={"Type your message here"}
                  onKeyDown={handleKeyDown}
                  className="absolute top-0 left-0"
                />
              </FlexFull>
              <VStack className="h-full items-center justify-around">
                <IconButton
                  icon={CircleArrowUp}
                  label="submit"
                  htmlType="submit"
                />
              </VStack>
            </HStackFull>{" "}
          </Form>
        </VStackFull>
      </FlexFull>
    </>
  );
}
