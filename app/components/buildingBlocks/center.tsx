import React from "react";
import Flex from "./flex";

const Center = React.forwardRef<
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
      className={`justify-center items-center ${className}`}
      id={id}
      ref={ref}
      onClick={onClick}
      style={style}
    >
      {children}
    </Flex>
  );
});

Center.displayName = "FlexFull";

export default Center;
