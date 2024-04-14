/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import VStack from "~/components/buildingBlocks/vStack";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Button from "~/components/buildingBlocks/button";
import CodeModal from "./codeModal";
import Flex from "~/components/buildingBlocks/flex";
import { RefreshIcon } from "styles";
import Text from "~/components/buildingBlocks/text";

export function SimplePathRender({
  path = "M.4 84.1s127.4 188 267.7 3 247.3 0 247.3 0",
  viewBox = "0 0 450 450",
  stroke = "0.5vh",
  duration = 5,
  timingFunction = "easeInOut",
  title,
  color = "cyan",
}: {
  path?: string;
  viewBox?: string;
  stroke?: string;
  duration?: number;
  timingFunction?: string;
  title?: string;
  color?: string;
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration, ease: timingFunction },
    });
  }, [animationKey, controls, duration, timingFunction]);

  const handleClickAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  function MapPath({
    path,
    viewBox,
    stroke,
    controls,
    color,
  }: {
    path: string;
    viewBox: string;
    stroke: string;
    controls: any;
    color: string;
  }) {
    return (
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path
          d={path}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          initial={{ pathLength: 0 }}
          animate={controls}
          filter="drop-shadow(0.4vh 0.4vh 0.4vh rgba(255, 255, 255, 0.7))"
        />
      </svg>
    );
  }

  return (
    <VStack
      className="bg-col-900 shadowBroadLoose border-800-md p-[1vh]"
      gap="gap-[2vh]"
    >
      {title && (
        <FlexFull className="justify-center">
          <Text className="text-col-300 text-[2.4vh]">{title}</Text>
        </FlexFull>
      )}
      <HStackFull className="justify-evenly">
        <Button
          buttonText="Reanimate"
          onClick={handleClickAnimation}
          iconLeft={RefreshIcon}
          type="smallNormal"
        />
        <CodeModal code={path} title={title ? title : ""} />
      </HStackFull>
      <Flex className={`p-[1vh] h-full items-center justify-center`}>
        <MapPath
          key={animationKey}
          path={path}
          viewBox={viewBox}
          stroke={stroke}
          controls={controls}
          color={color}
        />
      </Flex>
    </VStack>
  );
}
