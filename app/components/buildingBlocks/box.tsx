import React, { type ReactNode, type RefObject } from "react";

interface BoxProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ref?: RefObject<HTMLDivElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      onClick,
      onKeyDown,
      style = {},
      className = "",
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`${className} hover:cursor-default`}
        style={{ ...style }}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";

export default Box;
