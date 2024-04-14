import { TextLayout, TextShadows } from "types";

interface TextProps {
  text?: string;
  noOfLines?: number;
  shadow?: TextShadows;
  layout?: TextLayout | string;
  className?: string;
  isCursive?: boolean;
  color?: string;
}

export default function Heading({
  text,
  layout = "text-md-normal",
  noOfLines = 1,
  shadow = "subtleTextShadow",
  className = "text-stroke-5-900",
  isCursive = true,
  color = "text-col-900",
}: TextProps) {
  const style: React.CSSProperties = {};

  if (noOfLines) {
    style.overflow = "hidden";
    style.textOverflow = "ellipsis";
    style.display = "-webkit-box";
    style.WebkitLineClamp = noOfLines;
    style.WebkitBoxOrient = "vertical";
  }
  const textClassName = isCursive
    ? `font-cursive ${layout} ${color} ${shadow} ${className}`
    : `${layout} ${color} ${shadow} ${className}`;

  return (
    <div className={`${layout} ${shadow} ${textClassName}`} style={style}>
      {text}
    </div>
  );
}
