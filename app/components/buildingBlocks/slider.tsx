// app/components/Slider.tsx
import React from "react";
import HStack from "./hStack";
import Text from "./text";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import IconButton from "./iconButton";
import FlexFull from "./flexFull";
import HStackFull from "./hStackFull";
import RoundToDecimal from "~/utils/useRoundToDecimal";
import Center from "./center";

interface SliderProps {
  label?: string;
  direction?: "flex-col" | "flex-row";
  labelColor?: string;
  min?: number;
  max?: number;
  value?: number;
  increment?: number;
  labelTextSizes?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  direction = "flex-col",
  min = 0,
  max = 100,
  increment = 1,
  value,
  labelColor = "text-cyan-200 textShadow",
  labelTextSizes = "text-xs-tight md:text-sm-tight",
  onChange,
}) => {
  const sliderValue = value ?? min;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };
  const step = increment ? increment : max - min <= 5 ? 0.1 : 1;

  // Increment and decrement now use sliderValue
  const incrementValue = () => {
    const newValue = Math.min(sliderValue + step, max); // Use sliderValue
    onChange(newValue);
  };

  const decrementValue = () => {
    const newValue = Math.max(sliderValue - step, min); // Use sliderValue
    onChange(newValue);
  };

  return (
    <FlexFull className={`${direction} gap-[0px]`}>
      {label && (
        <HStack
          className={`items-center ${labelTextSizes} text-col-100 justify-center whitespace-nowrap`}
        >
          <Text className={`${labelColor}`}>{label}: </Text>
          <Text>{RoundToDecimal(value || 0, 3)}</Text>
        </HStack>
      )}
      <HStackFull className="items-center" gap="gap-[0.2vh]">
        <Center className="h-full">
          <IconButton
            type="smallUnstyled"
            icon={FiMinusCircle}
            onClick={decrementValue}
            iconClassName="text-col-100"
          />
        </Center>
        <Center className="h-full">
          <span className="text-xs text-col-100">{min}</span>
        </Center>
        <HStackFull className="items-center" gap="gap-[0.4vh]">
          <Center className="h-full">
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              step={step}
              onChange={handleChange}
              className="slider h-[0.5vh] w-full cursor-pointer appearance-none  bg-col-300 dark:bg-gray-700 focus:outline-none focus:ring focus:ring-col-400 shadowBroadTight"
            />{" "}
          </Center>
          <Center className="h-full">
            <span className="text-xs text-col-100">{max}</span>
          </Center>
        </HStackFull>
        <Center className="h-full">
          <IconButton
            type="smallUnstyled"
            icon={FiPlusCircle}
            onClick={incrementValue}
            iconClassName="text-col-100"
          />
        </Center>
      </HStackFull>
    </FlexFull>
  );
};

export default Slider;
