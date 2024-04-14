import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  style?: React.CSSProperties;
  textAreaHeight?: string;
  textAreaWidth?: string;
  autoFocus?: boolean;
  resize?: "resize-none" | "resize-vertical" | "resize-horizontal";
  isEditable?: boolean;
}

export default function TextArea({
  className = "",
  resize = "resize-none",
  style,
  defaultValue,
  textAreaHeight = "h-[9.5vh]",
  textAreaWidth = "w-full",
  autoFocus = false,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      defaultValue={defaultValue}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      className={`w-full ${resize} ${textAreaHeight} ${textAreaWidth} textareaStyles ${className} `}
      style={style}
      {...props}
    />
  );
}
