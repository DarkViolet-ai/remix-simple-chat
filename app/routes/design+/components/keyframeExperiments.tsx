/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Input from "~/components/buildingBlocks/input";
import VStack from "~/components/buildingBlocks/vStack";
import useReanimate from "~/utils/useReanimate";
import Button from "~/components/buildingBlocks/button";
import { CloseIcon, PlusIcon, RefreshIcon } from "styles";
import IconButton from "~/components/buildingBlocks/iconButton";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Wrap from "~/components/buildingBlocks/wrap";
import Center from "~/components/buildingBlocks/center";
import HStack from "~/components/buildingBlocks/hStack";
import Text from "~/components/buildingBlocks/text";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Heading from "~/components/buildingBlocks/headingText";
import NavContainer from "~/components/buildingBlocks/navContainer";

export function InteractiveKeyFrames() {
  const [numRepeats, handleRepeatsChange] = useState(0);
  const [repeatDelay, handleRepeatDelayChange] = useState(0);
  const [duration, handleDurationChange] = useState(4);
  const [keyframes, setKeyframes] = useState([
    { background: "#00cfd6", scale: 1, rotate: 0, borderRadius: "0%" },
    { background: "#d777fc", scale: 1.25, rotate: -90, borderRadius: "25%" },
    { background: "#8d9df2", scale: 1.5, rotate: 180, borderRadius: "50%" },
    { background: "#d777fc", scale: 1.75, rotate: -90, borderRadius: "25%" },
    { background: "#00cfd6", scale: 1.5, rotate: 0, borderRadius: "0%" },
    { background: "#00cfd6", scale: 1, rotate: 0, borderRadius: "0%" },
  ]);

  type Keyframe = {
    background: string;
    scale: number;
    rotate: number;
    borderRadius: string;
  };

  const handleKeyframeChange = (
    index: number,
    property: keyof Keyframe,
    value: string
  ) => {
    const updatedKeyframes = [...keyframes];
    if (property === "scale" || property === "rotate") {
      updatedKeyframes[index][property] = parseFloat(value);
    } else {
      updatedKeyframes[index][property] = value;
    }
    setKeyframes(updatedKeyframes);
  };

  const handleAddKeyframe = () => {
    const newKeyframe = {
      background: "#ffffff",
      scale: 1,
      rotate: 0,
      borderRadius: "0%",
    };
    setKeyframes([...keyframes, newKeyframe]);
  };

  const handleRemoveKeyframe = (index: number) => {
    const updatedKeyframes = [...keyframes];
    updatedKeyframes.splice(index, 1);
    setKeyframes(updatedKeyframes);
  };

  const [animationKey, reanimate] = useReanimate();
  return (
    <FlexFull className="p-[3vh] h-screen pt-[6vh]">
      <VStackFull className="bg-800-radial6op75 p-[2vh] border-500-md shadowBroadTight">
        <Heading
          text="Keyframes Experiments"
          layout="text-xxl-looser"
          color="text-col-100"
          shadow="textShadow"
          className="text-stroke-5-100"
        />
        <Wrap className="w-full justify-center gap-[1vh] p-[2vh]">
          {keyframes.map((keyframe, index) => (
            <VStack
              key={index}
              className="w-[12.5vh] p-[1.5vh] bg-col-960 border-900-md shadowBroadTight"
            >
              <HStackFull className="justify-between">
                <IconButton
                  onClick={() => handleRemoveKeyframe(index)}
                  icon={CloseIcon}
                  label="remove"
                  type="smallNormal"
                />
                <input
                  type="color"
                  value={keyframe.background}
                  onChange={(e) =>
                    handleKeyframeChange(index, "background", e.target.value)
                  }
                />
              </HStackFull>
              <HStack className="items-center">
                <Text className="text-[1.2vh] text-col-100 textShadow">
                  Scale
                </Text>
                <Input
                  type="number"
                  className="text-[1.2vh] font-semibold h-[2.5vh]"
                  step="0.1"
                  value={keyframe.scale}
                  onChange={(e) =>
                    handleKeyframeChange(index, "scale", e.target.value)
                  }
                />
              </HStack>
              <HStack className="items-center">
                <Text className="text-[1.2vh] text-col-100 textShadow">
                  Rotate
                </Text>
                <Input
                  className="text-[1.2vh] font-semibold h-[2.5vh]"
                  type="number"
                  value={keyframe.rotate}
                  onChange={(e) =>
                    handleKeyframeChange(index, "rotate", e.target.value)
                  }
                />
              </HStack>
              <HStack className="items-center">
                <Text className="text-[1.2vh] text-col-100 textShadow">
                  Radius
                </Text>
                <Input
                  className="text-[1.2vh] font-semibold h-[2.5vh]"
                  type="text"
                  value={keyframe.borderRadius}
                  onChange={(e) =>
                    handleKeyframeChange(index, "borderRadius", e.target.value)
                  }
                />
              </HStack>
            </VStack>
          ))}
        </Wrap>
        <HStackFull className="px-[1.5vh] justify-center " gap="gap-[1.5vh]">
          <HStack className="items-center w-[9vh]">
            <Text className="text-[1.3vh] text-col-100 textShadow">
              Duration
            </Text>
            <Input
              type="number"
              className="text-[1.2vh] font-semibold h-[2.5vh]"
              step="0.1"
              value={duration}
              onChange={(e) => handleDurationChange(parseFloat(e.target.value))}
            />
          </HStack>
          <HStack className="items-center w-[9vh]">
            <Text className="text-[1.3vh] text-col-100 textShadow">Repeat</Text>
            <Input
              type="number"
              className="text-[1.2vh] font-semibold h-[2.5vh]"
              step="0.1"
              value={numRepeats}
              onChange={(e) => handleRepeatsChange(parseFloat(e.target.value))}
            />
          </HStack>
          <HStack className="items-center w-[15vh]">
            <Text className="text-[1.3vh] text-col-100 textShadow w-50%">
              Repeat Delay
            </Text>
            <Input
              type="number"
              className="text-[1.2vh] font-semibold h-[2.5vh] w-30%"
              step="0.1"
              value={numRepeats}
              onChange={(e) => handleRepeatsChange(parseFloat(e.target.value))}
            />
          </HStack>
          <Button
            onClick={handleAddKeyframe}
            iconLeft={PlusIcon}
            type="smallNormal"
            buttonText="Add Keyframe"
          />
          <Button
            onClick={reanimate}
            buttonText="Reanimate"
            iconLeft={RefreshIcon}
            type="smallNormal"
          />
        </HStackFull>
        <Center className="h-[59vh] w-98% md:w-[70vh] bg-col-130 insetShadowXl border-900-md">
          <motion.div
            key={animationKey}
            className="w-[15vh] h-[15vh] bg-500-radial5op50 rounded-[2vh] shadowBroadTight border-970-md"
            animate={{
              background: keyframes.map((keyframe) => keyframe.background),
              scale: keyframes.map((keyframe) => keyframe.scale),
              rotate: keyframes.map((keyframe) => keyframe.rotate),
              borderRadius: keyframes.map((keyframe) => keyframe.borderRadius),
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
              times: keyframes.map(
                (_, index) => index / (keyframes.length - 1)
              ),
              repeat: numRepeats,
              repeatDelay: repeatDelay,
            }}
          />
        </Center>
      </VStackFull>
    </FlexFull>
  );
}
