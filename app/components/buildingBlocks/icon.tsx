import React from "react";

interface IconProps {
  icon: React.ComponentType<{ className?: string }>;
  containerClassName?: string;
  pos?: "absolute" | "relative" | "fixed" | "sticky" | "static" | "inherit";
  t?: string;
  l?: string;
  r?: string;
  b?: string;
  iconClassName?: string;
  hoverCursor?: string;
  w?: string;
  h?: string;
  rounded?: string;
  onClick?: () => void;
}

export default function Icon({
  icon: IconComponent,
  containerClassName = "",
  iconClassName = "",
  hoverCursor = "hover:cursor-default",
  w = "w-fit",
  h = "h-fit",
  pos,
  t,
  l,
  r,
  b,
  rounded = "rounded-xs",
  onClick,
}: IconProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick && onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${rounded} ${w} ${h} ${pos} ${t} ${b} ${r} ${l} ${containerClassName} ${hoverCursor}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <IconComponent className={`${rounded} ${iconClassName} ${hoverCursor}`} />
    </div>
  );
}
