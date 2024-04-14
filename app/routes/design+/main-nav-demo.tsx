import FlexFull from "~/components/buildingBlocks/flexFull";
import MainNavDemo from "./components/mainNavDemo";
import { HomeIcon, ReturnPathIcon } from "styles";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import HStack from "~/components/buildingBlocks/hStack";

export default function MainNavDemoPage() {
  return (
    <VStackFull>
      <VStackFull className="absolute top-0 left-0">
        <FlexFull>
          <MainNavDemo />
        </FlexFull>
      </VStackFull>
      <HStack className="w-fit absolute top-[0.7vh] left-[1vh] flex-shrink-0">
        <NavIconButton icon={HomeIcon} to="/" />
        <NavIconButton icon={ReturnPathIcon} to="/design/components" />
      </HStack>
      <FlexFull className="pt-[6vh] pl-[2vh]">
        <HStack className="w-fit flex-shrink-0">
          <NavIconButton icon={HomeIcon} to="/" />
          <NavIconButton icon={ReturnPathIcon} to="/design/components" />
        </HStack>
      </FlexFull>
    </VStackFull>
  );
}
