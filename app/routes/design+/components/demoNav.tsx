import { HomeIcon, ReturnPathIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStack from "~/components/buildingBlocks/hStack";
import Heading from "~/components/buildingBlocks/headingText";
import NavContainer from "~/components/buildingBlocks/navContainer";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";

export default function DemoNav({ heading }: { heading: string }) {
  return (
    <NavContainer bg="bg-col-990" className="h-[8vh]">
      <HStack className="w-fit absolute top-[0.7vh] left-[1vh] flex-shrink-0">
        <NavIconButton icon={HomeIcon} to="/" />
        <NavIconButton icon={ReturnPathIcon} to="/design/components" />
      </HStack>
      <FlexFull className="justify-center pl-[6vh]">
        <Heading
          text={heading}
          layout="text-xl-loose sm:text-xxl-loose md:text-xxxl-loose "
          color="text-col-100"
          className="text-stroke-5-100"
        />
      </FlexFull>
    </NavContainer>
  );
}
