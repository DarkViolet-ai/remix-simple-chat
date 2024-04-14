import {
  GetGalleryRowHeight,
  useWindowSize,
} from "~/utils/viewportCalculation";
import HStack from "../buildingBlocks/hStack";
import Text from "../buildingBlocks/text";

export default function ParallaxImageViewportBar({
  children,
  className = "fixed z-50 top-0 right-0",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { width } = useWindowSize();
  const { viewportWidth } = GetGalleryRowHeight(width);

  return (
    <HStack
      className={`w-full rounded-none text-col-100 text-xs-tight sm:text-sm-tight md:text-md-tight justify-around px-[1vh] py-[0.5vh] ${className}`}
      gap="gap-[2vh]"
    >
      <Text>
        <span className="text-xs-tight sm:text-sm-tight text-cyan-200 textShadow">
          window width:
        </span>{" "}
        {viewportWidth}px
      </Text>
      {children}
    </HStack>
  );
}
