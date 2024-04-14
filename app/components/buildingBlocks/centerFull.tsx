import React from "react";
import Center from "./center";

const CenterFull = React.forwardRef<
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
      className={`w-full h-full ${className}`}
      id={id}
      ref={ref}
      onClick={onClick}
      style={style}
    >
      {children}
    </Center>
  );
});

CenterFull.displayName = "FlexFull";

export default CenterFull;
