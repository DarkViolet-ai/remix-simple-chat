import Box from "~/components/buildingBlocks/box";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import { ArrowRightDown, ArrowUpLeftIcon, verticalAlign } from "styles";
import VStack from "~/components/buildingBlocks/vStack";
import RenderParagraphs from "~/components/buildingBlocks/renderParagraphs";
import FlexFull from "~/components/buildingBlocks/flexFull";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import FormatDate from "~/utils/formatDate";
import Icon from "~/components/buildingBlocks/icon";
import Transition from "~/components/buildingBlocks/transition";

interface ChatBubbleProps {
  bg?: string;
  text?: string;
  timestamp?: string;
  username?: string;
}

const iconStyles = "text-[3vh] text-col-100";
const headerSizes = "text-[1.9vh] leading-[2.4vh]";
const chatSizes = "text-[1.9vh] leading-[2.4vh]";
const aiChatBubble =
  "w-fit h-fit shadowNarrowTight bg-600-linear6op50 rounded-[1vh] border-970-md";
const aiChatHeader =
  "bg-col-870 text-col-100 border-b-970-md px-[0.8vh] rounded-[0.8vh] textShadow text-[1.9vh] leading-[2.4vh]";
const userChatBubble =
  "w-fit h-fit shadowNarrowTight bg-100-diagonal2op75 text-col-900 rounded-[1vh] border-200-md";
const userChatHeader =
  "bg-col-770 text-col-100 px-[0.8vh] rounded-[0.8vh] border-b-670-md textShadow text-[1.9vh] leading-[2.4vh]";

export function AIChatBubble({
  bg,
  text = "",
  timestamp = "",
  username = "",
}: ChatBubbleProps) {
  return (
    <Transition className="w-full justify-start">
      <FlexFull className="justify-start">
        <HStack className="h-full gap-[0px] w-fit items-center ">
          <Flex className={`${verticalAlign}`}>
            <Icon icon={ArrowUpLeftIcon} iconClassName={iconStyles} />
          </Flex>
          <Box className={`${aiChatBubble}`}>
            <VStack className="w-full gap-[0px] items-start">
              <HStackFull
                className={`justify-between ${aiChatHeader} rounded-b-none items-center`}
              >
                <p className={headerSizes}>{username}</p>
                <FormatDate inputDate={timestamp} />
              </HStackFull>
              <Flex className="w-full px-[1vh] pb-[0.2vh]">
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
}: ChatBubbleProps) {
  return (
    <Transition className="w-full justify-end">
      <FlexFull className="justify-end ">
        <HStack className="h-full gap-[0px] w-fit items-center justify-end">
          <Box className={`${userChatBubble}`}>
            {" "}
            <VStackFull className="gap-[0px] items-start">
              <HStackFull
                className={`justify-between ${userChatHeader} rounded-b-none items-center`}
              >
                <p className={headerSizes}>{username}</p>
                <FormatDate inputDate={timestamp} />
              </HStackFull>
              <FlexFull className="px-[1vh] pb-[0.2vh]">
                <RenderParagraphs textItem={text} textClassName={chatSizes} />
              </FlexFull>
            </VStackFull>
          </Box>
          <Flex className={`${verticalAlign}`}>
            <Icon icon={ArrowRightDown} iconClassName={iconStyles} />
          </Flex>
        </HStack>
      </FlexFull>
    </Transition>
  );
}

export function ChatContainer({ children }: { children: React.ReactNode }) {
  return (
    <VStackFull
      className={`gap-[1.5vh] border-900-md py-[1vh] shadowNarrowTight rounded-sm`}
    >
      {children}
    </VStackFull>
  );
}
