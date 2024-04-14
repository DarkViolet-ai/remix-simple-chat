/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  isEditable?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", style, defaultValue, autoFocus = false, ...props },
    ref
  ) => {
    return (
      <>
        <input
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          ref={ref}
          className={`inputStyles ${className}`}
          style={style}
          {...props}
        />
      </>
    );
  }
);

// Assign a display name to the component
Input.displayName = "Input";

export default Input;
