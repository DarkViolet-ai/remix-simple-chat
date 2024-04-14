import { type ReactNode, type CSSProperties } from "react";

interface WrapProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Wrap({ children, className = "", style }: WrapProps) {
  return (
    <div className={`flex flex-wrap ${className}`} style={style}>
      {children}
    </div>
  );
}
