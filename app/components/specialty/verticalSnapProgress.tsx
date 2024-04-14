/* eslint-disable @typescript-eslint/no-explicit-any */

import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Flex from "../buildingBlocks/flex";

type ItemComponent = React.ComponentType<any>;
export function VerticalScrollProgressContainer({
  position = "top",
  height = "h-[85vh]",
  width = "w-[70vh]",
  padding = "p-[0vh]",
  gap = "gap-[0vh]",
  progressColor = "bg-cyan-500",
  progressHeight = "h-[1vh]",
  itemComponent: ItemComponent,
  items,
  snapScroll = true,
  itemClassName = "",
  springScroll = true,
}: {
  position?: "top" | "bottom";
  height?: string;
  width?: string;
  padding?: string;
  gap?: string;
  progressColor?: string;
  progressHeight?: string;
  itemComponent: ItemComponent;
  items: any[];
  snapScroll?: boolean;
  itemClassName?: string;
  springScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const springScrollScaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1])
  );
  const normalScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]); // Ensure it scales from 0 to 100%

  const placement =
    position === "top"
      ? "top-0 left-0 "
      : position === "bottom"
      ? "bottom-0 left-0 "
      : "";

  const scaleX = springScroll ? springScrollScaleX : normalScaleX;

  return (
    <div
      ref={ref}
      className={`${width} ${height} relative insetShadowXl border-980-lg overflow-y-auto overflow-x-hidden scrollbar-hide ${
        snapScroll ? "snap-mandatory snap-y" : ""
      } `}
    >
      {/* Progress bar */}
      <motion.div
        className={`sticky ${placement} ${progressHeight} ${progressColor}`}
        style={{ scaleX, zIndex: "2" }}
      />
      <div
        className={`absolute top-0 left-0 h-fit ${padding} flex flex-col`}
        style={{ gap }}
      >
        {items.map((item, index) => (
          <Flex
            key={index}
            className={
              snapScroll
                ? `snap-center snap-always ${itemClassName}`
                : itemClassName
            }
          >
            <ItemComponent {...item} />
          </Flex>
        ))}
      </div>
    </div>
  );
}
