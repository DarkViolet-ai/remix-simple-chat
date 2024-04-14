import React, { ReactNode, CSSProperties, MouseEvent } from "react";

interface FlexProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id?: string;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, style, onClick, className = "", id }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={`flex ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export default Flex;
