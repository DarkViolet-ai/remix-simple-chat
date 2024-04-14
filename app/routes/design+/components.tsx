import { StyledExampleWrap } from "./_index";
import ComponentExamples from "./components/componentExamples";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import NavContainer from "~/components/buildingBlocks/navContainer";
import Flex from "~/components/buildingBlocks/flex";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import { ReturnPathIcon } from "styles";
import Heading from "~/components/buildingBlocks/headingText";
import TransitionFull from "~/components/buildingBlocks/TransitionFull";

export default function ComponentsDemos() {
  return (
    <TransitionFull>
      <FlexFull className="overflow-y-auto px-[2vh]">
        <NavContainer bg="bg-col-990" className="h-[8vh]">
          <Flex className="w-[6vw] absolute top-[0.7vh] left-[1vh]">
            <NavIconButton icon={ReturnPathIcon} to="/design" />
          </Flex>
          <FlexFull className="justify-center pl-[6vh]">
            <Heading
              text="Components"
              layout="text-xl-loose sm:text-xxl-loose md:text-xxxl-loose "
              color="text-col-100"
              className="text-stroke-5-100"
            />
          </FlexFull>
        </NavContainer>
        <VStackFull className="pt-[8vh] h-fit py-[1vh]">
          <StyledExampleWrap bg="bg-col-600">
            <ComponentExamples />
          </StyledExampleWrap>
        </VStackFull>
      </FlexFull>
    </TransitionFull>
  );
}
