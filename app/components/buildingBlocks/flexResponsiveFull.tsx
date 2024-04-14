import Flex from "./flex";

export default function FlexResponsiveFull({
  children,
  className,
  widths = "w-full sm:w-90% md:w-80% lg:w-65% xl:w-95% xxl:w-85%",
}: {
  children: React.ReactNode;
  className?: string;
  widths?: string;
}) {
  return <Flex className={`${widths} ${className}`}>{children}</Flex>;
}
