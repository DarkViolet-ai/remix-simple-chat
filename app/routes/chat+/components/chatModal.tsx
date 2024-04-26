import { CloseIcon } from "styles";
import Box from "~/components/buildingBlocks/box";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import HStack from "~/components/buildingBlocks/hStack";
import Icon from "~/components/buildingBlocks/icon";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import { motion } from "framer-motion";
import BaseChatComponent from "./baseChatComponent";
import FlexFull from "~/components/buildingBlocks/flexFull";
import { usePortalChat } from "~/lib/hooks/usePortalChat";

export default function ChatModal({
  onClose = () => {},
  chatTitle,
  topCloseColor,
  headerFooterStyles,
  closeButtonStyles,
  chatStyles,
  chatbotName,
  aiBubbleClassName,
  userBubbleClassName,
  iconClassName,
  buttonClassName,
  portalName,
  systemPrompt,
}: {
  onClose: () => void;
  chatTitle?: string;
  topCloseColor?: string;
  headerFooterStyles?: string;
  closeButtonStyles?: string;
  chatStyles?: string;
  chatbotName: string;
  aiBubbleClassName?: string;
  userBubbleClassName?: string;
  refreshIconClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  portalName: string;
  systemPrompt: string;
}) {
  return (
    <FlexFull className="h-[100svh] md:p-[1vh]">
      <VStackFull
        className="h-full justify-between border-9970-md shadowBroadNormal"
        gap="gap-[0px]"
      >
        <CenterHorizontalFull
          className={`${headerFooterStyles} rounded-none md:rounded-t-[0.7vh] lg:rounded-t-[0.7vh] justify-center px-[3vh] font-[500] text-[3vh] textShadow h-[5vh] relative`}
        >
          <Text className="font-cursive">{chatTitle}</Text>
          <Box className="absolute top-[1vh] right-[1vh]" onClick={onClose}>
            <Icon
              icon={CloseIcon}
              iconClassName={`text-[3vh] ${topCloseColor}`}
            />
          </Box>
        </CenterHorizontalFull>
        <FlexFull className={`${chatStyles} rounded-none h-[90svh]`}>
          <BaseChatComponent
            aiChatbotName={chatbotName}
            aiBubbleClassName={aiBubbleClassName}
            userBubbleClassName={userBubbleClassName}
            iconClassName={iconClassName}
            buttonClassName={buttonClassName}
            portalName={portalName}
            systemPrompt={systemPrompt}
          />
        </FlexFull>
        <CenterHorizontalFull
          className={`${headerFooterStyles} rounded-none justify-center px-[3vh] font-[500] text-[3vh] textShadow h-[5vh] relative lg:rounded-b-[0.7vh]`}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.4 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.4 },
            }}
            onClick={onClose}
          >
            <HStack
              className={`${closeButtonStyles} h-[3vh] px-[1vh] hover:cursor-pointer text-[1.5vh] md:text-[2vh] items-center border-970-md shadowBroadNormal`}
            >
              <Icon icon={CloseIcon} iconClassName="text-[2.5vh]" />
              close
            </HStack>
          </motion.div>
        </CenterHorizontalFull>
      </VStackFull>
    </FlexFull>
  );
}
