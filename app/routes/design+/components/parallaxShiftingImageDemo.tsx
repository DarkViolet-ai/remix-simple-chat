import { useEffect, useState } from "react";
import Box from "~/components/buildingBlocks/box";
import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import CounterInput from "~/components/buildingBlocks/counterInput";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import Wrap from "~/components/buildingBlocks/wrap";
import ParallaxShiftingImage from "~/components/specialty/parallaxShiftingImage";
import ParallaxImageViewportBar from "~/components/specialty/viewportBar";
import { GetViewportWidth } from "~/utils/viewportCalculation";

export default function ParallaxShiftingImageDemo() {
  const getHeightWidth = (viewportWidth: number) => {
    let linkWidth = "1000"; // Default values for server-side rendering
    let linkHeight = "500";
    if (viewportWidth < 600) {
      linkHeight = "500";
      linkWidth = "300";
    } else if (viewportWidth < 800) {
      linkHeight = "500";
      linkWidth = "500";
    } else if (viewportWidth < 1080) {
      linkHeight = "500";
      linkWidth = "700";
    } else if (viewportWidth < 1500) {
      linkHeight = "500";
      linkWidth = "900";
    }
    return [linkHeight, linkWidth];
  };
  const [bgImageLink, setBgImageLink] = useState("");

  const [viewportWidth, setViewportWidth] = useState(0);
  // const [baseImageLink, setBaseImageLink] = useState("https://picsum.photos");
  const baseImageLink = "https://picsum.photos";
  const [animationCycleDuration, setAnimationCycleDuration] = useState(30);
  const [numDivisions, setNumDivisions] = useState(5);
  const [minNumYmovements, setMinNumYmovements] = useState(4);
  const [maxNumYmovements, setMaxNumYmovements] = useState(10);
  const [minYdistance, setMinYdistance] = useState(-50);
  const [maxYdistance, setMaxYdistance] = useState(50);
  const [paddingGap, setPaddingGap] = useState(0.5);
  const [linkHeight, linkWidth] = getHeightWidth(viewportWidth);

  useEffect(() => {
    const width = GetViewportWidth();
    setViewportWidth(width);
    const [linkHeight, linkWidth] = getHeightWidth(width);
    setBgImageLink(`${baseImageLink}/${linkWidth}/${linkHeight}`);
  }, [baseImageLink, viewportWidth]);
  const inputClassName = "px-[0.1vh]";
  const counterClassName = "px-[0.1vh]";
  const counterInputStyles =
    "text-xs-tight sm:text-sm-tight text-cyan-200 textShadow";

  return (
    <FlexFull className="h-full justify-center">
      <VStackFull className="h-full">
        <VStackFull className="bg-col-990 pb-[0.5vh]">
          <ParallaxImageViewportBar className="">
            <Text>
              <span className={counterInputStyles}>numDivisions: </span>
              {numDivisions}
            </Text>
            <Text>
              <span className={counterInputStyles}>imageWidth: </span>
              {linkWidth}
            </Text>{" "}
            <Text>
              <span className={counterInputStyles}>imageHeight:</span>{" "}
              {linkHeight}
            </Text>
          </ParallaxImageViewportBar>
          <Wrap className="w-full p-[0.5vh] justify-evenly gap-x-[2vh] gap-y-[1vh]">
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={5}
                max={360}
                inputWidth="w-[6vh]"
                value={numDivisions}
                onChange={(newValue) => setNumDivisions(newValue as number)}
                label="divisions"
                className={inputClassName}
              />
            </Box>
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                inputWidth="w-[6vh]"
                min={5}
                max={360}
                value={animationCycleDuration}
                onChange={(newValue) =>
                  setAnimationCycleDuration(newValue as number)
                }
                label="cycle duration"
                className={inputClassName}
              />
            </Box>
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={5}
                max={360}
                inputWidth="w-[6vh]"
                value={minNumYmovements}
                onChange={(newValue) => setMinNumYmovements(newValue as number)}
                label="min Y moves"
                className={inputClassName}
              />
            </Box>
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={5}
                max={360}
                inputWidth="w-[6vh]"
                value={maxNumYmovements}
                onChange={(newValue) => setMaxNumYmovements(newValue as number)}
                label="max Y moves"
                className={inputClassName}
              />
            </Box>
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={-100}
                max={100}
                inputWidth="w-[6vh]"
                value={minYdistance}
                onChange={(newValue) => setMinYdistance(newValue as number)}
                label="min Y dis"
                className={inputClassName}
              />
            </Box>
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={-100}
                max={100}
                inputWidth="w-[6vh]"
                value={maxYdistance}
                onChange={(newValue) => setMaxYdistance(newValue as number)}
                label="max Y dis"
                className={inputClassName}
              />
            </Box>{" "}
            <Box className={counterClassName}>
              <CounterInput
                labelTextSizes={counterInputStyles}
                min={0}
                max={10}
                inputWidth="w-[6vh]"
                value={paddingGap}
                onChange={(newValue) => setPaddingGap(newValue)}
                label="gap"
                className={inputClassName}
              />
            </Box>
          </Wrap>
        </VStackFull>
        <CenterHorizontalFull className="h-full">
          <ParallaxShiftingImage
            animationCycleDuration={animationCycleDuration}
            bgImageLink={bgImageLink}
            numDivisions={numDivisions}
            minNumYmovements={minNumYmovements}
            maxNumYmovements={maxNumYmovements}
            minYdistance={minYdistance}
            maxYdistance={maxYdistance}
            paddingGap={"p-[" + String(paddingGap) + "vh]"}
          />
        </CenterHorizontalFull>
      </VStackFull>
    </FlexFull>
  );
}
