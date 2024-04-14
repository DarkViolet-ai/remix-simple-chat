import Flex from "../buildingBlocks/flex";
import VStackFull from "../buildingBlocks/vStackFull";

export default function SnapScrollContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Flex
      className={`overflow-y-auto snap-y scroll-smooth snap-mandatory overflow-x-hidden ${className}`}
    >
      <VStackFull className="h-fit" gap="gap-[0px]">
        {children}
      </VStackFull>
    </Flex>
  );
}
