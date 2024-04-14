export default function HL({
  children,
  textColor = "text-cyan-300",
  bold = "font-semibold",
  shadow = "textShadow",
  className = "",
}: {
  children?: React.ReactNode;
  textColor?: string;
  bold?: string;
  shadow?: string;
  className?: string;
}) {
  return (
    <span
      className={`${textColor} ${bold} ${shadow} ${className}`}
      style={{ fontSize: "inherit" }}
    >
      {children}
    </span>
  );
}
