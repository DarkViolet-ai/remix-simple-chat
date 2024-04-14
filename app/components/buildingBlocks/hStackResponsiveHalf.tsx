import HStack from "./hStack";

export default function HStackResponsiveHalf({
  children,
  className,
  gap,
  widths = "w-full md:w-70% lg:w-60% xl:w-50% xxl:w-45%",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  widths?: string;
}) {
  return (
    <HStack className={`${widths} ${gap} ${className}`}>{children}</HStack>
  );
}
