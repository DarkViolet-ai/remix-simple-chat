import VStack from "./vStack";

export default function VStackResponsiveHalf({
  children,
  className,
  gap,
  widths = "w-98% md:w-80% lg:w-70% xl:w-50% xxl:w-45%",
}: {
  children: React.ReactNode;
  gap?: string;
  className?: string;
  widths?: string;
}) {
  return (
    <VStack className={`${widths} ${gap} ${className}`}>{children}</VStack>
  );
}
