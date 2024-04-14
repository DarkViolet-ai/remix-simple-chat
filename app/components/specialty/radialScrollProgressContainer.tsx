/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import Box from "~/components/buildingBlocks/box";
import CenterFull from "~/components/buildingBlocks/centerFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Flex from "~/components/buildingBlocks/flex";
import Text from "~/components/buildingBlocks/text";

type ItemComponent = React.ComponentType<any>;
export default function RadialScrollProgressContainer({
  items,
  itemComponent: ItemComponent,
  containerPadding = "p-[2vh]",
  bg = "bg-100-linear2op50",
  innerBg = "bg-col-270",
  innerPadding = "p-[0.5vh]",
  itemClassName = "",
  title = "Content Title",
  topPadding = "pt-[5vh]",
  trackOpacity = "opacity-30",
  titlePosition = "top-[1vh] right-[1vh]",
  titleClassName = "h-[3.2vh] pr-[2vh] text-[2.5vh] font-bold",
  progressPosition = "top-[0.3vh] left-[0.3vh]",
  progressColor = "stroke-cyan-600",
  progressWidth = "1.2vh",
  radius = 40,
  progressCircleSize = "4.5vh",
  snapScroll = true,
}: {
  items: any[];
  itemComponent: ItemComponent;
  containerPadding?: string;
  bg?: string;
  innerBg?: string;
  innerPadding?: string;
  topPadding?: string;
  itemClassName?: string;
  title?: string;
  titlePosition?: string;
  titleClassName?: string;
  trackOpacity?: string;
  progressPosition?: string;
  progressColor?: string;
  progressWidth?: string;
  radius?: number;
  progressCircleSize?: string;
  snapScroll?: boolean;
}) {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  return (
    <CenterFull
      className={`w-full h-full relative ${bg} ${topPadding} ${containerPadding}`}
    >
      <Box className={`absolute ${progressPosition}`}>
        <svg
          className="-rotate-90"
          width={progressCircleSize}
          height={progressCircleSize}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            pathLength="1"
            className={`${progressColor} ${trackOpacity}`}
            style={{ fill: "none", strokeWidth: progressWidth }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            pathLength="1"
            className={progressColor}
            style={{
              fill: "none",
              strokeWidth: progressWidth,
              pathLength: scrollXProgress,
            }}
          />
        </svg>
      </Box>
      <Flex
        className={`absolute items-center ${titlePosition} ${titleClassName}`}
      >
        <Text>{title}</Text>
      </Flex>
      <Box
        className={`${innerPadding} ${innerBg} insetShadowXl border-970-md overflow-x-hidden`}
      >
        <FlexFull
          className={`overflow-x-auto overflow-y-hidden scrollbar-hide ${
            snapScroll ? "snap-mandatory snap-x" : ""
          } `}
          ref={scrollRef}
        >
          <HStackFull className="w-fit h-full items-center">
            {items.map((i, index) => (
              <Flex
                key={index}
                className={
                  snapScroll
                    ? `snap-center snap-always ${itemClassName}`
                    : itemClassName
                }
              >
                <ItemComponent key={i} label={i.toString()} />
              </Flex>
            ))}
          </HStackFull>
        </FlexFull>
      </Box>
    </CenterFull>
  );
}
