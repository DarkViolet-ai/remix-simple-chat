import React from "react";
import Center from "./center";

const CenterHorizontalFull = React.forwardRef<
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
    <Center
      className={`w-full ${className}`}
      id={id}
      ref={ref}
      onClick={onClick}
      style={style}
    >
      {children}
    </Center>
  );
});

CenterHorizontalFull.displayName = "FlexFull";

export default CenterHorizontalFull;
