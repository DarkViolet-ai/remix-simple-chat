import Center from "~/components/buildingBlocks/center";
import Flex from "~/components/buildingBlocks/flex";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";

export function CSSHeading({ children }: { children?: React.ReactNode }) {
  const headingStyles = "text-xl-loose font-semibold lightTextShadow";
  return <Text className={headingStyles}>{children}</Text>;
}

export function CSSText({ children }: { children?: React.ReactNode }) {
  const svgTextStyles = "text-lg-normal";
  return <Text className={svgTextStyles}>{children}</Text>;
}

export function CSSSection({ children }: { children?: React.ReactNode }) {
  const sectionStyles =
    "bg-col-980 text-col-100 px-[1vh] sm:px-[2vh] md:px-[4vh] py-[1.5vh] border-970-md items-start shadowBroadLoose";
  return (
    <VStackFull className={sectionStyles} align="items-start">
      {children}
    </VStackFull>
  );
}

export function SVGHeading({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const svgHeadingStyles =
    "text-xl-loose font-semibold textShadow text-col-100";
  return (
    <Text className={className ? className : svgHeadingStyles}>{children}</Text>
  );
}

export function SVGText({ children }: { children?: React.ReactNode }) {
  const svgTextStyles = "text-lg-normal";
  return <Text className={svgTextStyles}>{children}</Text>;
}

export function SVGSection({ children }: { children?: React.ReactNode }) {
  const svgSectionStyles =
    "bg-col-890 text-col-100 px-[1vh] sm:px-[2vh] md:px-[4vh] py-[1.5vh] border-970-md items-start shadowBroadLoose";
  return (
    <VStackFull className={svgSectionStyles} align="items-start">
      {children}
    </VStackFull>
  );
}

export function SVGExample({
  description,
  example,
}: {
  description: React.ReactNode;
  example: React.ReactNode;
}) {
  return (
    <FlexFull className="justify-center">
      <FlexFull className="flex-col md:flex-row  p-[1vh] gap-[1vh] xl:w-80%">
        <Center className="w-full h-full md:w-40%">{example}</Center>
        <Center className="w-full h-full md:w-60%">{description}</Center>
      </FlexFull>
    </FlexFull>
  );
}

export function SVGContainer({ children }: { children?: React.ReactNode }) {
  return (
    <FlexFull className="justify-center">
      <Flex className=" bg-col-990 shadowBroadNormal border-900-md">
        {children}
      </Flex>
    </FlexFull>
  );
}
