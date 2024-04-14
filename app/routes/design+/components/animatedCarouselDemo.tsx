/* eslint-disable @typescript-eslint/no-explicit-any */
import VStackFull from "~/components/buildingBlocks/vStackFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import { useState } from "react";
import CounterInput from "~/components/buildingBlocks/counterInput";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import HStack from "~/components/buildingBlocks/hStack";
import Checkbox from "~/components/buildingBlocks/checkBox";
import Wrap from "~/components/buildingBlocks/wrap";
import Flex from "~/components/buildingBlocks/flex";
import AnimatedCarousel from "~/components/specialty/animatedCarousel";
import NavContainer from "~/components/buildingBlocks/navContainer";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import { HomeIcon, ReturnPathIcon } from "styles";
import Text from "~/components/buildingBlocks/text";

const randomNumberGenerator = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const images = [
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
  `https://picsum.photos/id/${randomNumberGenerator(1, 100)}/700/700`,
];

export default function AnimatedCarouselDemo() {
  const [imageSize, setImageSize] = useState(50);
  const [frontScale, setFrontScale] = useState(1.2);
  const [xOffsetFactor, setXOffsetFactor] = useState(0.53);
  const [yOffsetFactor, setYOffsetFactor] = useState(0.2);
  const [shiftOffset, setShiftOffset] = useState(0.2);
  const [damping, setDamping] = useState(15);
  const [stiffness, setStiffness] = useState(50);
  const [transitionType, setTransitionType] = useState<"spring" | "tween">(
    "spring"
  );

  function Counter({
    value,
    onChange,
    label,
    min,
    max,
    increment,
  }: {
    value: number;
    onChange: any;
    label: string;
    min: number;
    max: number;
    increment: number;
  }) {
    return (
      <Flex className="w-[20vh]">
        <CounterInput
          showButtons
          showInput={false}
          label={label}
          min={min}
          max={max}
          incrementStep={increment}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          labelTextSizes="text-sm-tight xl:text-md-tight"
        />
      </Flex>
    );
  }

  const checkboxContainerStyles =
    "w-fit bg-200-diagonal1op25 p-[0.2vh] insetShadowMd border-400-md gap-[0.5vh]";

  return (
    <FlexFull className="h-screen overflow-hidden">
      <VStackFull className="h-screen pb-[1vh]">
        <VStackFull
          className="h-25% xl:h-20% justify-start items-center"
          gap="gap-[0.5vh] xl:gap-[2vh]"
        >
          <NavContainer bg="bg-col-990">
            <HStack className="w-fit px-[2vh] flex-shrink-0 ">
              <NavIconButton icon={HomeIcon} to="/" />
              <NavIconButton icon={ReturnPathIcon} to="/design/components" />
            </HStack>
            <FlexFull className="justify-center pl-[6vh]">
              <Text className="font-semibold text-md-tight md:text-xl-tight text-col-200">
                Animated Carousel Demo
              </Text>
            </FlexFull>
          </NavContainer>
          <Wrap className="w-full gap-x-[1vh] gap-y-[0.2vh] justify-evenly pt-[6vh]">
            <Counter
              value={imageSize}
              onChange={setImageSize}
              label="Image Size"
              min={15}
              max={50}
              increment={5}
            />
            <Counter
              value={frontScale}
              onChange={setFrontScale}
              label="Front Scale"
              min={1}
              max={2.5}
              increment={0.05}
            />
            <Counter
              value={xOffsetFactor}
              onChange={setXOffsetFactor}
              label="X Offset"
              min={0.1}
              max={2}
              increment={0.1}
            />
            <Counter
              value={yOffsetFactor}
              onChange={setYOffsetFactor}
              label="Y Offset"
              min={0.1}
              max={2}
              increment={0.1}
            />
            <HStack gap="gap-[3vh]" className={checkboxContainerStyles}>
              <Checkbox
                label="spring"
                isChecked={transitionType === "spring"}
                onChange={() => setTransitionType("spring")}
              />
              <Checkbox
                label="tween"
                isChecked={transitionType === "tween"}
                onChange={() => setTransitionType("tween")}
              />
            </HStack>

            {transitionType === "tween" && (
              <Counter
                label={"Shift Duration Offset"}
                value={shiftOffset}
                onChange={setShiftOffset}
                min={0}
                max={1}
                increment={0.1}
              />
            )}

            {transitionType === "spring" && (
              <Counter
                value={damping}
                onChange={setDamping}
                label="Damping"
                min={1}
                max={50}
                increment={1}
              />
            )}
            {transitionType === "spring" && (
              <Counter
                value={stiffness}
                onChange={setStiffness}
                label="Stiffness"
                min={0}
                max={200}
                increment={5}
              />
            )}
          </Wrap>
        </VStackFull>
        <CenterHorizontalFull className="h-75% xl:h-80%">
          <AnimatedCarousel
            images={images}
            imageSize={imageSize}
            xOffsetFactor={xOffsetFactor}
            yOffsetFactor={yOffsetFactor}
            shiftDurationOffset={shiftOffset}
            damping={damping}
            stiffness={stiffness}
            transitionType={transitionType}
            frontScale={frontScale}
          />
        </CenterHorizontalFull>
      </VStackFull>
    </FlexFull>
  );
}
