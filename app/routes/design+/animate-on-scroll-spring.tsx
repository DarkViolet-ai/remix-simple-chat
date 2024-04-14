import { AnimationTypes } from "./components/data";
import SnapScrollContainer from "~/components/specialty/snapScrollContainer";
import SnapScrollPage from "~/components/specialty/snapScrollPage";
import NavContainer from "~/components/buildingBlocks/navContainer";
import Text from "~/components/buildingBlocks/text";
import { HomeIcon, ReturnPathIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import VStack from "~/components/buildingBlocks/vStack";
import CustomNavLink from "~/components/buildingBlocks/custonNavLink";
import Flex from "~/components/buildingBlocks/flex";
import AnimatedComponentSpring from "~/components/animate-on-scroll/animateOnScrollSpring";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import HStack from "~/components/buildingBlocks/hStack";

export default function AnimateOnScrollSpring() {
  return (
    <SnapScrollContainer>
      <NavContainer bg="bg-col-990">
        <HStack className="w-fit px-[2vh] flex-shrink-0 ">
          <NavIconButton icon={HomeIcon} to="/" />
          <NavIconButton icon={ReturnPathIcon} to="/design/components" />
        </HStack>
        <FlexFull className="justify-center pl-[6vh]">
          <Text className="font-semibold text-md-tight md:text-xl-tight text-col-200">
            Snap Scroll Animate-On-Scroll Spring
          </Text>
        </FlexFull>
      </NavContainer>

      <Flex className="fixed top-[6vh] left-0 px-[1vh]">
        <VStack
          className="h-[92vh] justify-around p-[1.5vh] bg-col-150 shadowWideLoose"
          align="items-start "
        >
          {" "}
          {AnimationTypes.map((animation, index) => (
            <CustomNavLink
              to={String(`#${animation}`)}
              key={index}
              useHash
              linkText={animation}
              className="text-sm-tight md:text-md-tight"
            />
          ))}
        </VStack>
      </Flex>
      {AnimationTypes.map((animation, index) => (
        <SnapScrollPage
          key={index}
          className="w-screen h-screen bg-col-300"
          id={animation}
        >
          <FlexFull className="justify-center pl-[20vh]">
            <AnimatedComponentSpring
              animation={animation}
              className="bg-col-970 p-[1.5vh] text-col-100 shadowWideLoose"
              delay={0.4}
            >
              <h1 className="text-sm-tight md:text-xl-tight font-bold textShadow">
                animationName=&quot;{animation}&quot;
              </h1>
            </AnimatedComponentSpring>
          </FlexFull>
        </SnapScrollPage>
      ))}
    </SnapScrollContainer>
  );
}
