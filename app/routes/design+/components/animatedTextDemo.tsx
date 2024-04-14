/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Flex from "~/components/buildingBlocks/flex";
import Wrap from "~/components/buildingBlocks/wrap";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import Button from "~/components/buildingBlocks/button";
import useReanimate from "~/utils/useReanimate";
import HStack from "~/components/buildingBlocks/hStack";
import Checkbox from "~/components/buildingBlocks/checkBox";
import VStack from "~/components/buildingBlocks/vStack";
import TransitionFullScreen from "~/components/buildingBlocks/transitionFullScreen";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Box from "~/components/buildingBlocks/box";
import Heading from "~/components/buildingBlocks/headingText";
import Slider from "~/components/buildingBlocks/slider";
import Text from "~/components/buildingBlocks/text";

import DropDownMenu from "~/components/buildingBlocks/dropDownMenu";
import AnimatedText, {
  AnimationType,
} from "~/components/specialty/animatedTitle";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import { ReturnPathIcon } from "styles";

export default function AnimatedTitleDemo() {
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationType>("custom");
  const [letterDelay, setLetterDelay] = useState(0.09);
  const [damping, setDamping] = useState(12);
  const [stiffness, setStiffness] = useState(100);
  const [overallDelay, setOverallDelay] = useState(0.2);
  const [overallDuration, setOverallDuration] = useState<number | null>(null);
  const [letterDuration, setLetterDuration] = useState(0.5);
  const [yDistance, setYDistance] = useState(150);
  const [xDistance, setXDistance] = useState(150);
  const [fadeLetterDuration, setFadeLetterDuration] = useState(0.5);
  const [animationMotion, setAnimationMotion] = useState<"spring" | "tween">(
    "spring"
  );
  const [useVHUnits, setUseVHUnits] = useState(true);

  const [animationKey, reanimate] = useReanimate();
  useEffect(() => {
    reanimate();
  }, [
    letterDelay,
    damping,
    stiffness,
    overallDelay,
    letterDuration,
    yDistance,
    xDistance,
    fadeLetterDuration,
    animationMotion,
    reanimate,
  ]);

  function WrapItem({ children }: { children: React.ReactNode }) {
    return <Flex className="w-fit px-[1vh]">{children}</Flex>;
  }

  function WrapInput({
    onChange,
    label,
    value,
    min,
    max,
    increment = 1,
  }: {
    onChange: (value: number) => void; // Update the type to match expected usage
    label: string;
    value: number;
    min?: number;
    max?: number;
    increment?: number;
  }) {
    return (
      <WrapItem>
        <Slider
          value={value}
          onChange={(newValue: number) => onChange(newValue)} // Directly use the newValue
          label={label}
          min={min}
          max={max}
          increment={increment}
        />
      </WrapItem>
    );
  }

  const largeContainerStyles =
    "bg-col-950 p-[1vh] border-900-sm shadowBroadNormal";
  const checkboxContainerStyles =
    "bg-200-diagonal1op25 py-[0.7vh] px-[1vh] insetShadowMd border-400-md gap-[0.5vh]";

  const propSectionContainerStyles =
    "bg-col-880 px-[0.7vh] py-[1vh] md:p-[1.5vh] insetShadowXl border-900-md shadowBroadNormal";

  const rowSectionStyles =
    "justify-evenly items-center flex-col gap-[1.5vh] w-full lg:w-1/2 xxl:w-1/3";
  return (
    <TransitionFullScreen className="p-[1.5vh]">
      <Flex className="w-full md:w-98% xxl:w-95%">
        <VStackFull gap="gap-[1.5vh]">
          <FlexFull className={largeContainerStyles}>
            <Wrap className="w-full items-center justify-evenly gap-y-[1vh]">
              <Flex className={rowSectionStyles}>
                {/* DELAYS  */}
                <VStack className={propSectionContainerStyles}>
                  <WrapInput
                    onChange={setLetterDelay}
                    label="letter delay"
                    min={0}
                    max={2}
                    value={letterDelay}
                    increment={0.01}
                  />
                  <WrapInput
                    onChange={setOverallDelay}
                    label="overall delay"
                    min={0}
                    max={30}
                    value={overallDelay}
                  />
                </VStack>
                {/* DISTANCE  */}
                <VStack className={propSectionContainerStyles}>
                  <HStack>
                    <WrapInput
                      onChange={setYDistance}
                      label="y distance"
                      min={-2000}
                      max={2000}
                      increment={25}
                      value={yDistance}
                    />
                    <WrapInput
                      onChange={setXDistance}
                      label="x distance"
                      min={-2000}
                      max={2000}
                      increment={25}
                      value={xDistance}
                    />
                  </HStack>
                  <HStack gap="gap-[3vh]" className={checkboxContainerStyles}>
                    <Checkbox
                      label="vh"
                      isChecked={useVHUnits === true}
                      onChange={() => setUseVHUnits((prev) => !prev)}
                    />
                    <Checkbox
                      label="px"
                      isChecked={useVHUnits === false}
                      onChange={() => setUseVHUnits((prev) => !prev)}
                    />
                  </HStack>
                </VStack>
              </Flex>
              {/* row two  */}
              <Flex className={rowSectionStyles}>
                {/* SPRING  */}
                <VStack className={propSectionContainerStyles}>
                  <HStack gap="gap-[3vh]" className={checkboxContainerStyles}>
                    <Checkbox
                      label="spring"
                      isChecked={animationMotion === "spring"}
                      onChange={() =>
                        setAnimationMotion(
                          animationMotion !== "spring" ? "spring" : "tween"
                        )
                      }
                    />
                  </HStack>
                  <HStack>
                    <WrapInput
                      onChange={setDamping}
                      label="damping"
                      min={0}
                      max={25}
                      value={damping}
                    />
                    <WrapInput
                      onChange={setStiffness}
                      label="stiffness"
                      min={0}
                      max={250}
                      value={stiffness}
                      increment={1}
                    />
                  </HStack>
                </VStack>
                {/* TWEEN   */}
                <VStack className={propSectionContainerStyles}>
                  <HStack gap="gap-[3vh]" className={checkboxContainerStyles}>
                    <Checkbox
                      label="tween"
                      isChecked={animationMotion === "tween"}
                      onChange={() =>
                        setAnimationMotion(
                          animationMotion !== "tween" ? "tween" : "spring"
                        )
                      }
                    />
                  </HStack>
                  <WrapInput
                    onChange={setLetterDuration}
                    label="letter duration"
                    min={0}
                    max={5}
                    increment={0.01}
                    value={letterDuration}
                  />
                </VStack>
              </Flex>
              {/* row three  */}
              <Flex className={rowSectionStyles}>
                <HStack className="items-end">
                  {/* DIRECTION SELECTOR  */}
                  <VStack className="w-[18vh] justify-center">
                    <Text className="text-sm-tight md:text-md-tight text-cyan-200">
                      Animation Style:
                    </Text>
                    <DropDownMenu
                      options={[
                        "inFromTop",
                        "inFromBottom",
                        "inFromLeft",
                        "inFromRight",
                        "fadeIn",
                        "spinOnScreen",
                        "spinInPlace",
                        "custom",
                      ]}
                      buttonText="direction"
                      selectedOption={selectedAnimation}
                      setSelectedOption={setSelectedAnimation}
                    />
                  </VStack>
                  {/* BUTTON  */}
                  <WrapItem>
                    <Button buttonText="reanimate" onClick={reanimate} />
                  </WrapItem>{" "}
                </HStack>
              </Flex>
            </Wrap>
          </FlexFull>
          <CenterHorizontalFull
            className={`h-[50vh] md:h-[45vh] lg:h-[60vh] xxl:h-[70vh] ${largeContainerStyles} `}
          >
            <Box className="text-wrap max-w-full">
              <AnimatedText
                key={animationKey}
                text="I am some really great text!"
                textClassName="text-[3.5vh] sm:text-[4.5vh] md:text-[6vh] lg:text-[7vh] xl:text-[8vh] font-bold text-col-200  text-stroke-2-100"
                animationType={selectedAnimation as AnimationType}
                animationMotion={animationMotion}
                letterDelay={letterDelay}
                damping={damping}
                stiffness={stiffness}
                overallDelay={overallDelay}
                overallDuration={overallDuration || undefined}
                letterDuration={letterDuration}
                yDistance={yDistance}
                xDistance={xDistance}
                distanceAsVH={useVHUnits}
                gradient={{
                  colors: ["#ffeede", "#03738C"],
                  direction: "45deg",
                }}
              />
            </Box>
          </CenterHorizontalFull>
        </VStackFull>
      </Flex>
    </TransitionFullScreen>
  );
}

// export default function Test() {
//   return <AnimatedTitleExamples />;
// }
