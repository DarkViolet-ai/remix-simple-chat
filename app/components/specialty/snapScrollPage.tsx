import Flex from "../buildingBlocks/flex";

export default function SnapScrollPage({
  children,
  className,
  id,
  snapFrom = "base",
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  snapFrom?:
    | "base"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "fullHD"
    | "quadHD"
    | "ultraHD";
}) {
  const snapScrollClassName =
    snapFrom === "base"
      ? `snap-start snap-always overflow-x-hidden h-screen ${className}`
      : snapFrom === "sm"
      ? `sm:snap-start sm:snap-always overflow-x-hidden h-fit sm:h-screen ${className}`
      : snapFrom === "md"
      ? `md:snap-start md:snap-always overflow-x-hidden h-fit md:h-screen ${className}`
      : snapFrom === "lg"
      ? `lg:snap-start lg:snap-always overflow-x-hidden h-fit lg:h-screen ${className}`
      : snapFrom === "xl"
      ? `xl:snap-start xl:snap-always overflow-x-hidden h-fit xl:h-screen  ${className}`
      : snapFrom === "xxl"
      ? `xxl:snap-start xxl:snap-always overflow-x-hidden h-fit xxl:h-screen  ${className}`
      : snapFrom === "fullHD"
      ? `fullHD:snap-start fullHD:snap-always overflow-x-hidden h-fit fullHD:h-screen  ${className}`
      : snapFrom === "quadHD"
      ? `quadHD:snap-start quadHD:snap-always overflow-x-hidden h-fit quadHD:h-screen  ${className}`
      : snapFrom === "ultraHD"
      ? `ultraHD:snap-start ultraHD:snap-always overflow-x-hidden h-fit ultraHD:h-screen  ${className}`
      : `snap-start snap-always overflow-x-hidden  ${className}`;
  return (
    <Flex
      className={`justify-center items-center ${snapScrollClassName} ${className}`}
      id={id}
    >
      {children}
    </Flex>
  );
}
