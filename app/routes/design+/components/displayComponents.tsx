import Flex from "~/components/buildingBlocks/flex";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Text from "~/components/buildingBlocks/text";

export function HeadingText({ heading }: { heading?: string }) {
  return (
    <Text className="text-[2.3vh] text-[#dca3ff] textShadow">{heading}</Text>
  );
}

export function BulletListItem({
  children,
  highlighted,
}: {
  children: React.ReactNode;
  highlighted?: string;
}) {
  return (
    <Flex className="pl-[1vh]">
      <Text className="text-[2vh] text-col-100">
        <span className="text-[2vh] text-[#dca3ff] ">￮</span>{" "}
        {highlighted && (
          <span className="font-semibold text-[#33d3ff] text-[2vh] textShadow">
            {highlighted}
          </span>
        )}{" "}
        {children}
      </Text>
    </Flex>
  );
}

export function NestedBulletListItem({
  children,
  highlighted,
}: {
  children: React.ReactNode;
  highlighted?: string;
}) {
  return (
    <FlexFull className="pl-[2vh]">
      <Text className="text-[2vh] text-col-100">
        <span className="text-[2vh] text-[#fad991]">￮</span>{" "}
        {highlighted && (
          <span className="text-[#fc9e95] text-[2vh] textShadow">
            {highlighted}
          </span>
        )}{" "}
        {children}
      </Text>
    </FlexFull>
  );
}
