import React from "react";
import Flex from "./flex";

const FlexFull = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    widths?: string;
    onClick?: () => void;
    id?: string;
    style?: React.CSSProperties;
  }
>(({ children, className, onClick, id, style = {} }, ref) => {
  return (
    <Flex
      className={`w-full ${className}`}
      id={id}
      ref={ref}
      onClick={onClick}
      style={style}
    >
      {children}
    </Flex>
  );
});

FlexFull.displayName = "FlexFull";

export default FlexFull;
