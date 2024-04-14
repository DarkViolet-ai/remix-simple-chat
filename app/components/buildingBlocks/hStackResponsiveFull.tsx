import HStack from "./hStack";

export default function HStackResponsiveFull({
  children,
  className,
  gap,
  widths = "w-full sm:w-90% md:w-80% lg:w-65% xl:w-95% xxl:w-85%",
}: {
  children: React.ReactNode;
  className?: string;
  widths?: string;
  gap?: string;
}) {
  return (
    <HStack className={`${widths} ${gap} ${className}`}>{children}</HStack>
  );
}
