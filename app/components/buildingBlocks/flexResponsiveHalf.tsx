import Flex from "./flex";

export default function FlexFullResponsiveHalf({
  children,
  className,
  widths = "w-98% md:w-70% lg:w-60% xl:w-50% xxl:w-45%",
}: {
  children: React.ReactNode;
  className?: string;
  widths?: string;
}) {
  return <Flex className={`${widths} ${className}`}>{children}</Flex>;
}
