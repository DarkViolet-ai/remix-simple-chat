import ParallaxShiftingImageDemo from "./components/parallaxShiftingImageDemo";
import { HomeIcon, ReturnPathIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStack from "~/components/buildingBlocks/hStack";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";

export default function ShiftingParallax() {
  return (
    <FlexFull className="h-full relative">
      <HStack className="w-fit absolute top-[0.7vh] left-[1vh] flex-shrink-0">
        <NavIconButton icon={HomeIcon} to="/" />
        <NavIconButton icon={ReturnPathIcon} to="/design/components" />
      </HStack>
      <ParallaxShiftingImageDemo />
    </FlexFull>
  );
}
