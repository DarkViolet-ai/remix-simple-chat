/* eslint-disable react/no-unescaped-entities */
import Flex from "~/components/buildingBlocks/flex";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import AnimatedParallaxImage from "./animatedParallaxImage";

export default function ParallaxShiftingImage({
  animationCycleDuration = 20,
  bgImageLink,
  numDivisions = 8,
  imageHeight = "h-[60vh] md:h-[70vh] xl:h-[75vh]",
  minNumYmovements = 10,
  maxNumYmovements = 20,
  minYdistance = -50,
  maxYdistance = 50,
  paddingGap = "p-[0.5vh]",
  sectionsClassName,
}: {
  bgImageLink: string;
  animationCycleDuration?: number;
  imageHeight?: string;
  numDivisions?: number;
  minYdistance?: number;
  maxYdistance?: number;
  minNumYmovements?: number;
  maxNumYmovements?: number;
  paddingGap?: string;
  sectionsClassName?: string;
}) {
  const bgPositions = Array.from(
    { length: numDivisions },
    (_, index) => `${Math.floor((index / (numDivisions - 1)) * 100)}%`
  );
  const divisions = bgPositions.length;
  const sectionWidthCalc = (100 - 10) / divisions;
  const roundedSectionWidthCalc = Math.round(sectionWidthCalc);
  const sectionWidthString = String(roundedSectionWidthCalc) + "vw";
  const bgSize = String(100 * divisions) + "% 100%";

  const generateRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + (min * 10) / 10;
  };
  const numYmovements = generateRandomValue(minNumYmovements, maxNumYmovements);

  const generateYvalues = (min: number, max: number) => {
    const yValues = [];
    for (let i = 0; i < numYmovements; i++) {
      yValues.push(generateRandomValue(min, max));
    }
    return yValues;
  };

  return (
    <HStackFull className="justify-center mx-1" gap="gap-[0px]">
      {bgPositions.map((position, index) => (
        <Flex key={index} className={`${paddingGap} hover:cursor-default`}>
          <AnimatedParallaxImage
            sectionsClassName={sectionsClassName}
            duration={animationCycleDuration}
            bgImage={bgImageLink}
            isAnimated={true}
            parallaxHeight={imageHeight}
            parallaxWidth={sectionWidthString}
            bgPosition={`${position}`}
            bgSize={bgSize}
            yValues={generateYvalues(minYdistance, maxYdistance)}
          />
        </Flex>
      ))}
    </HStackFull>
  );
}
