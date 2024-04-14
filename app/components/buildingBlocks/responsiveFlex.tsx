import type { ReactNode } from "react";
import Flex from "./flex";

export default function ResponsiveFlex({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: object;
}) {
  return (
    <Flex
      className={`w-full h-full justify-center overflow-y-auto xl:overflow-y-hidden ${className}`}
      style={style}
    >
      {children}
    </Flex>
  );
}
