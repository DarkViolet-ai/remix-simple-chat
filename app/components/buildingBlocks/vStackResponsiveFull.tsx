import VStack from "./vStack";

export default function VStackResponsiveFull({
  children,
  className,
  gap,
  style = {},
  widths = "w-full sm:w-90% md:w-80% lg:w-65% xl:w-95% xxl:w-85%",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  style?: React.CSSProperties;
  widths?: string;
}) {
  return (
    <VStack className={`${widths} ${gap} ${className}`} style={style}>
      {children}
    </VStack>
  );
}
