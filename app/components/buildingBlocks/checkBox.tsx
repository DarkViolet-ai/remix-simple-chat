/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Box from "~/components/buildingBlocks/box";
import HStack from "~/components/buildingBlocks/hStack";
import Text from "~/components/buildingBlocks/text";

interface CheckboxProps {
  label: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  onChange?: () => void;
  checkboxSize?: string;
  textSize?: string;
  textColor?: string;
  bgColor?: string;
  checkedBg?: string;
  checkedColor?: string;
  hoveredBg?: string;
  hoveredColor?: string;
  disabledBg?: string;
  disabledColor?: string;
  p?: string;
  onDisabledClick?: () => void;
  className?: string;
  containerWidth?: string;
}

export default function Checkbox({
  label,
  isDisabled = false,
  isChecked = false,
  onChange,
  checkboxSize = "text-[3vh]",
  textSize = "text-[1.7vh]",
  textColor = "text-col-900",
  bgColor = "transparent",
  checkedBg = "bg-col-950 insetShadowMd hover:insetShadowLg",
  checkedColor = "text-col-100",
  hoveredBg = "hover:bg-transparent transition duration-300 ease-in-out",
  hoveredColor = "hover:text-col-900 transition-300",
  disabledBg = "bg-col-850 hover:bg-col-860 transition-300",
  disabledColor = "text-col-160 hover:text-col-180",
  p = "px-[0.6vh] py-[0px]",
  className = "",
  containerWidth = "w-full",
  onDisabledClick,
}: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = () => {
    if (!isDisabled && onChange) {
      onChange(); // Trigger the change event
    }
  };

  let backgroundColor = bgColor;
  let textColorClass = textColor;
  let boxShadowClass = "";

  if (isDisabled) {
    backgroundColor = disabledBg;
    textColorClass = disabledColor;
    boxShadowClass = "shadow-inset";
  } else if (isChecked) {
    backgroundColor = checkedBg;
    textColorClass = checkedColor;
    boxShadowClass = "shadowNarrowNormal";
  } else if (isHovered) {
    backgroundColor = hoveredBg;
    textColorClass = hoveredColor;
  }

  return (
    <HStack
      className={`items-center  gap-[0.5vh] ${p} ${backgroundColor} ${textColorClass} ${boxShadowClass} ${containerWidth} ${className}`}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => !isDisabled && setIsHovered(false)}
      onClick={handleCheckboxChange}
    >
      <Box className={checkboxSize}>
        {isChecked ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
      </Box>
      <Text className={textSize}>{label}</Text>
    </HStack>
  );
}
