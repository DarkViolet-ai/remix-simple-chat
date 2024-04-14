// app/components/Slider.tsx
import React, { useState } from "react";
import HStack from "./hStack";
import Text from "./text";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import IconButton from "./iconButton";
import FlexFull from "./flexFull";
import HStackFull from "./hStackFull";
import Input from "./input";
import VStack from "./vStack";
import RoundToDecimal from "~/utils/useRoundToDecimal";

interface CounterInputProps {
  label?: string;
  direction?: "flex-col" | "flex-row";
  labelColor?: string;
  min?: number;
  max?: number;
  width?: string;
  value: number;
  labelTextSizes?: string;
  onChange: (value: number) => void;
  iconTextColor?: string;
  showMaxMin?: boolean;
  showInput?: boolean;
  showButtons?: boolean;
  inputWidth?: string;
  className?: string;
  stacked?: boolean;
  maxInputLength?: number;
  incrementStep?: number;
}

const CounterInput: React.FC<CounterInputProps> = ({
  label,
  width,
  direction = "flex-col",
  min = 0,
  max = 100,
  value,
  labelColor = "text-cyan-200 textShadow",
  labelTextSizes = "text-sm-tight md:text-md-tight",
  onChange,
  iconTextColor = "text-col-100",
  showMaxMin = false,
  showInput = true,
  showButtons = false,
  inputWidth,
  className,
  stacked = false,
  maxInputLength = 4,
  incrementStep = 1,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const incrementValue = () => {
    console.log("Increment Step:", incrementStep);
    const newValue = Math.min(inputValue + incrementStep, max);
    console.log("New Value:", newValue);
    setInputValue(newValue);
    onChange(newValue);
  };

  const decrementValue = () => {
    const newValue = Math.max(inputValue - incrementStep, min);
    setInputValue(newValue);
    onChange(newValue);
  };

  // Update local state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue);
  };

  return (
    <>
      {stacked ? (
        <VStack
          className={`${width} gap-[0px] text-xs text-col-100 ${className}`}
        >
          {" "}
          <Text className={`${labelColor} ${labelTextSizes}`}>{label}: </Text>
          <HStackFull className="justify-center">
            {" "}
            <IconButton
              type="smallUnstyled"
              icon={FiMinusCircle}
              onClick={decrementValue}
              iconClassName={iconTextColor}
              containerClassName={!showButtons ? "hidden" : ""}
            />{" "}
            {showInput ? (
              <Input
                value={inputValue}
                onChange={handleInputChange}
                maxLength={maxInputLength}
                className={inputWidth}
                step={incrementStep}
                type="text"
                onBlur={() => onChange(inputValue)} // Update parent state on blur
              />
            ) : (
              <Text>{RoundToDecimal(value, 2)}</Text>
            )}
            <IconButton
              type="smallUnstyled"
              icon={FiPlusCircle}
              onClick={incrementValue}
              iconClassName={iconTextColor}
              containerClassName={!showButtons ? "hidden" : ""}
            />
          </HStackFull>
          {showMaxMin && (
            <HStackFull>
              <HStackFull className="items-center">
                <Text>max:</Text>
                <span>{min}</span>
              </HStackFull>{" "}
              <HStackFull className="items-center" gap="gap-[0.4vh]">
                <Text>min:</Text>
                <span>{max}</span>
              </HStackFull>
            </HStackFull>
          )}
        </VStack>
      ) : (
        <FlexFull
          className={`${direction} ${width} gap-[0px] text-xs text-col-100 ${className}`}
        >
          <HStack
            className={` ${labelTextSizes} text-col-100 justify-center whitespace-nowrap items-center`}
          >
            <IconButton
              type="smallUnstyled"
              icon={FiMinusCircle}
              onClick={decrementValue}
              iconClassName={iconTextColor}
              containerClassName={!showButtons ? "hidden" : ""}
            />
            <Text className={`${labelColor}`}>{label}: </Text>
            {showInput ? (
              <Input
                value={inputValue}
                onChange={handleInputChange}
                maxLength={maxInputLength}
                className={inputWidth}
                type="text"
                step={incrementStep}
                onBlur={() => onChange(inputValue)} // Update parent state on blur
              />
            ) : (
              <Text>{RoundToDecimal(value, 2)}</Text>
            )}

            <IconButton
              type="smallUnstyled"
              icon={FiPlusCircle}
              onClick={incrementValue}
              iconClassName={iconTextColor}
              containerClassName={!showButtons ? "hidden" : ""}
            />
          </HStack>
          {showMaxMin && (
            <HStackFull>
              <HStackFull className="items-center">
                <Text>max:</Text>
                <span>{min}</span>
              </HStackFull>{" "}
              <HStackFull className="items-center" gap="gap-[0.4vh]">
                <Text>min:</Text>
                <span>{max}</span>
              </HStackFull>
            </HStackFull>
          )}
        </FlexFull>
      )}
    </>
  );
};

export default CounterInput;
