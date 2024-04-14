import Flex from "./flex";
import { ReactNode } from "react";
import HStackFull from "./hStackFull";

interface NavContainerProps {
  children: ReactNode;
  className?: string;
  bg?: string;
  h?: string;
  isTop?: boolean;
  isBottom?: boolean;
  alignment?: string;
}

export default function NavContainer({
  className,
  children,
  bg = "bg-col-300",
  h = "h-nav",
  isTop = false,
  isBottom = false,
  alignment = "items-center justify-evenly",
}: NavContainerProps) {
  const locationStyle = isTop
    ? `top-0 rounded-none  `
    : isBottom
    ? `bottom-0 rounded-b-none`
    : ``;

  return (
    <Flex
      className={`fixed ${locationStyle} left-0 ${h} w-full z-50 items-center justify-center shadowNarrowNormal rounded-none ${className}`}
    >
      <HStackFull className={`h-full pr-[1vh] ${alignment} ${bg} rounded-none`}>
        {children}
      </HStackFull>
    </Flex>
  );
}
