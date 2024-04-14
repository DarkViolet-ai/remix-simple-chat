/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { Dispatch, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Flex from "./flex";
import Icon from "./icon";
import { BiChevronDown } from "react-icons/bi";
import Heading from "./headingText";
import { TextShadows } from "types";

export default function DropDownMenu({
  options,
  buttonText = "Select",
  maxHeight = "max-h-[13vh]",
  buttonTextSize = "text-[2vh]",
  elementTextSize = "text-[2vh]",
  iconSize = "text-[3.5vh]",
  elementClassName = "",
  bgSettings = "bg-100-diagonal5op50 hover:bg-100-diagonal5op75 transition-500",
  menuTextColor = "text-col-900",
  elementPadding = "px-[1vh] py-[0.2vh]",
  label,
  labelColor,
  labelSize = "normal",
  labelIsCursive = true,
  labelClassName,
  labelShadow,
  selectedOption,
  setSelectedOption,
}: {
  options: string[];
  buttonText?: string;
  maxHeight?: string;
  buttonTextSize?: string;
  elementTextSize?: string;
  iconSize?: string;
  elementClassName?: string;
  bgSettings?: string;
  menuTextColor?: string;
  elementPadding?: string;
  label?: string;
  labelSize?: "normal" | "small";
  labelColor?: string;
  labelClassName?: string;
  labelIsCursive?: boolean;
  labelShadow?: string;
  selectedOption: string | undefined;
  setSelectedOption:
    | Dispatch<any | string | undefined>
    | ((value: string | undefined) => void);
}) {
  function DropDownElement({
    text,
    alignment = "justify-start",
  }: {
    text: string;
    alignment?: string;
  }) {
    return (
      <HStackFull
        className={`${alignment} ${bgSettings} ${elementTextSize} ${elementPadding} ${elementClassName} h-[3.5vh] rounded-none`}
        onClick={() => {
          setSelectedOption(text);
          setIsDropDownOpen(false);
        }}
      >
        <Text>{text}</Text>
      </HStackFull>
    );
  }

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <VStackFull gap="gap-[0px]" align="items-start">
      {label && labelSize === "small" && (
        <Heading
          isCursive={labelIsCursive}
          color={labelColor}
          className={`${labelClassName}`}
          layout="text-md-loose"
          shadow={labelShadow as TextShadows}
          text={label}
        />
      )}
      {label && labelSize === "normal" && (
        <>
          <Heading
            isCursive={labelIsCursive}
            color={labelColor}
            className={` ${labelClassName}`}
            shadow={labelShadow as TextShadows}
            layout="text-md-loose md:text-lg-loose"
            text={label}
          />
        </>
      )}
      <VStackFull className={`mainShadow relative `} gap="gap-[0px]">
        <HStackFull
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          className={`${bgSettings} ${menuTextColor} ${elementPadding} hover:cursor-pointer items-center justify-between ${
            isDropDownOpen ? "rounded-b-none" : ""
          }  `}
          //   style={{ zIndex: 100 }}
        >
          <Flex className={`${buttonTextSize}`}>
            {selectedOption ? selectedOption : buttonText}
          </Flex>
          <Icon
            icon={BiChevronDown}
            iconClassName={`${iconSize} ${
              isDropDownOpen
                ? "transform rotate-180 transition-transform duration-500"
                : "transform rotate-0 transition-transform duration-500"
            }`}
          />
        </HStackFull>
        <AnimatePresence>
          {isDropDownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              style={{
                width: "100%",
                zIndex: 10,
                borderRadius: "0px",
                position: "absolute",
                top: "100%",
                left: "0",
              }}
            >
              <FlexFull
                className={`${maxHeight} ${bgSettings} ${menuTextColor} overflow-y-auto  rounded-t-none  transition-500`}
              >
                <VStackFull
                  gap="gap-[0px]"
                  className={`h-fit ${menuTextColor} transition-500 rounded-t-none mainInset`}
                >
                  {options.map((option, index) => (
                    <DropDownElement key={index} text={option} />
                  ))}
                </VStackFull>
              </FlexFull>
            </motion.div>
          )}
        </AnimatePresence>
      </VStackFull>
    </VStackFull>
  );
}
