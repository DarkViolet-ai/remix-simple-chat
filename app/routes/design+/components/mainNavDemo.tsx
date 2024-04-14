import Flex from "~/components/buildingBlocks/flex";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Image from "~/components/buildingBlocks/image";
import NavContainer from "~/components/buildingBlocks/navContainer";
import Text from "~/components/buildingBlocks/text";
import { NavLink } from "@remix-run/react";
import HStack from "~/components/buildingBlocks/hStack";

import { BiSmile } from "react-icons/bi";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";

export default function MainNavDemo() {
  function NavElement({
    to,
    label,
    icon: IconComponent,
  }: {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) {
    return (
      <NavLink to={to}>
        <HStack className={`items-center gap-[0.2vh] p-[0.3vh] `}>
          {IconComponent && <IconComponent className="h-[2.5vh] w-[2.5vh]" />}
          <Text>{label}</Text>
        </HStack>
      </NavLink>
    );
  }

  return (
    <NavContainer
      bg="bg-100-diagonal4op25"
      alignment="justify-between items-center"
      className="border-b-970-md"
    >
      <Flex className="h-full items-end w-60% lg:w-40% flex-shrink-0">
        <Flex className="h-[3.7vh] md:h-[4.5vh] w-fit flex-shrink-0">
          {" "}
          <NavLink to="#home">
            <Image src="/images/logo.png" alt="logo" className="h-full" />
          </NavLink>{" "}
        </Flex>
      </Flex>

      <HStackFull className="justify-around hidden lg:flex textShadow">
        <NavElement to="#linkOne" label="Link One" icon={BiSmile} />
        <NavElement to="#linkTwo" label="Link Two" icon={BiSmile} />
        <NavElement to="#linkThree" label="Link Three" icon={BiSmile} />
        <NavElement to="#linkFour" label="Link Four" icon={BiSmile} />
      </HStackFull>
      <HStackFull className=" w-full justify-around flex lg:hidden">
        <NavIconButton
          label="link one"
          icon={BiSmile}
          type="smallNormal"
          to="#linkOne"
        />
        <NavIconButton
          label="link two"
          icon={BiSmile}
          type="smallNormal"
          to="#linkTwo"
        />
        <NavIconButton
          label="link three"
          icon={BiSmile}
          type="smallNormal"
          to="#linkThree"
        />
        <NavIconButton
          label="link four"
          icon={BiSmile}
          type="smallNormal"
          tooltipPlacement="bottomLeft"
          to="#linkFour"
        />
      </HStackFull>
    </NavContainer>
  );
}
