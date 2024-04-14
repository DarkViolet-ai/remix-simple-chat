import TransitionFull from "~/components/buildingBlocks/TransitionFull";
import AnimatedTitleDemo from "./components/animatedTextDemo";
import NavContainer from "~/components/buildingBlocks/navContainer";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import { HomeIcon, ReturnPathIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Heading from "~/components/buildingBlocks/headingText";
import HStack from "~/components/buildingBlocks/hStack";

export default function AnimatedTextDemoRoute() {
  return (
    <TransitionFull className="relative">
      <NavContainer bg="bg-col-990" className="h-[8vh]">
        <HStack className="w-fit pl-[2vh] flex-shrink-0">
          <NavIconButton icon={HomeIcon} to="/" />
          <NavIconButton icon={ReturnPathIcon} to="/design/components" />
        </HStack>
        <FlexFull className="justify-center pl-[6vh]">
          <Heading
            text="Animated Title Demo"
            layout="text-xl-loose sm:text-xxl-loose md:text-xxxl-loose "
            color="text-col-100"
            className="text-stroke-5-100"
          />
        </FlexFull>
      </NavContainer>
      <FlexFull className="h-full pt-[6vh]">
        <AnimatedTitleDemo />
      </FlexFull>
    </TransitionFull>
  );
}
