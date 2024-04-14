import React from "react";
import { motion } from "framer-motion";
import Button from "./button";
import HStack from "./hStack";
import Flex from "./flex";
import VStack from "./vStack";
import VStackFull from "./vStackFull";
import Image from "./image";
import Box from "./box";
import Heading from "./headingText";
import Text from "./text";

const sizeClasses = {
  xs: "w-full h-1/3 md:w-64 md:h-1/2",
  sm: "w-full h-1/2 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3 xl:w-[28vw] xl:h-[28vh]",
  md: "w-full h-1/2 md:w-1/3 md:h-45vh",
  lg: "w-full h-2/3 md:w-1/2 md:h-2/3",
  xl: "w-full h-5/6 md:w-2/3 md:h-2/3",
  full: "w-full h-full",
};

interface AlertProps {
  isAlertOpen: boolean;
  onClose: () => void;
  onConfirmClick: () => void;
  cancelRef: React.MutableRefObject<HTMLButtonElement | null>;
  title: string;
  body: string;
  confirmButtonText: string;
  cancelButtonText: string;
  imageIcon?: string;
  size?: keyof typeof sizeClasses;
  imageWidth?: string;
  bodyWidth?: string;
  bodyClassName?: string;
  flexDirection?: string;
  bodyTextSize?: string;
  alertDimensions?: string;
  className?: string;
  alertImage?: string;
  imageClassName?: string;
}

export default function Alert({
  isAlertOpen,
  onClose,
  onConfirmClick,
  cancelRef,
  title,
  body,
  confirmButtonText,
  cancelButtonText,
  flexDirection = "flex-col",
  size,
  bodyWidth = "w-[30vh]",
  bodyTextSize = "text-[3vh]",
  bodyClassName = "",
  alertDimensions,
  className,
  alertImage,
  imageClassName = "w-75% h-auto sm:w-60%",
}: AlertProps) {
  const sizeClass = size ? sizeClasses[size] || undefined : "";
  if (!isAlertOpen) return null;

  // Animation variants for Framer Motion
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
  };

  const modalExitVariants = {
    exit: { y: "-100vh", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`fixed inset-0 overflow-hidden defaultOverlayBlur defaultOverlayColor flex justify-center items-center rounded-none`}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ zIndex: 1000 }}
    >
      <motion.div
        className={`bg-radial4 shadowNarrowNormal ${sizeClass} ${alertDimensions} ${className}`}
        variants={{ ...modalVariants, ...modalExitVariants }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <VStack className="w-full h-full justify-between ">
          {/* Header */}
          <HStack className="w-full items-center bg-col-990 rounded-b-none p-[1vh] gap-2 md:gap-[1vw]">
            <Heading
              color="text-col-100"
              className="text-stroke-5-100"
              shadow="textFog"
              text={title}
              layout="text-insane-normal"
            />
          </HStack>

          <HStack
            className={`w-full h-full justify-between text-col-900 `}
            gap="gap-[0px]"
          >
            <VStackFull className="h-full justify-center p-[1vh] items-center">
              <Flex
                className={`w-full h-full justify-center items-center flex-grow-1 gap-[1vh] ${bodyWidth} ${flexDirection} ${bodyClassName} `}
              >
                {alertImage && (
                  <Box className={imageClassName}>
                    <Image
                      src={alertImage}
                      alt="alert image"
                      className="w-full h-full"
                    />
                  </Box>
                )}
                <Text className={`${bodyTextSize} lightTextShadow`}>
                  {body}
                </Text>
              </Flex>
              <HStack className="justify-end gap-[2vw] p-[1vh]">
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  buttonText={cancelButtonText}
                />
                <Button
                  onClick={onConfirmClick}
                  type="negative"
                  buttonText={confirmButtonText}
                />
              </HStack>
            </VStackFull>
          </HStack>
        </VStack>
      </motion.div>
    </motion.div>
  );
}
