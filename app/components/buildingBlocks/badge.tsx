// Badge.tsx
import React from "react";
import Text from "./text";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "subtle" | "outline";
  className?: string;
  style?: React.CSSProperties;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  label?: string;
  bgColor?: string;
  textColor?: string;
}

export default function Badge({
  className = "",
  style,
  rounded = "md",
  label,
  bgColor = "bg-col-300",
  textColor = "text-col-900 lightTextShadow",
  ...props
}: BadgeProps) {
  const baseClasses = `px-[1vh] py-[0.1vh] text-xs-tight font-semibold`;

  // Merge Tailwind classes with the provided className prop
  const badgeClasses = `shadowNarrowNormal ${baseClasses} ${rounded}  ${bgColor} ${textColor} ${className}`;

  return (
    <div className={badgeClasses} style={style} {...props}>
      <Text>{label?.toUpperCase()}</Text>
    </div>
  );
}
