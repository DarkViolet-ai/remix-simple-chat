import type { ReactNode } from "react";

interface TextProps {
  children?: ReactNode;
  className?: string;
  noOfLines?: number;
  style?: React.CSSProperties;
}

export default function Text({
  children,
  className = "",
  noOfLines,
  style = {},
}: TextProps) {
  const inlineStyles: React.CSSProperties = {
    overflow: noOfLines ? "hidden" : undefined,
    textOverflow: noOfLines ? "ellipsis" : undefined,
    display: noOfLines ? "-webkit-box" : undefined,
    WebkitLineClamp: noOfLines,
    WebkitBoxOrient: noOfLines ? "vertical" : undefined,
    ...style, // Merge the style prop with the inline styles
  };

  return (
    <p className={className} style={inlineStyles}>
      {children}
    </p>
  );
}
