import Box from "../buildingBlocks/box";
import FlexFull from "../buildingBlocks/flexFull";
import VStackFull from "../buildingBlocks/vStackFull";
import HStackFull from "../buildingBlocks/hStackFull";
import Icon from "../buildingBlocks/icon";
import { CgScrollV } from "react-icons/cg";
import Flex from "../buildingBlocks/flex";
import Image from "../buildingBlocks/image";

export default function Parallax({
  dimensions = "w-[50vh] h-[50vh]",
  imageMargin = "mt-[40vh]",
  showIcon = true,
  children,
  bgImage = "bg-[url(/images/rain.jpg)]",
  bgPosition = "bg-center",
  bgFit = "bg-cover",
  bgAttachment = "bg-fixed",
  title,
  tagline,
  scrollBackground = "bg-100-linear6op75",
  imageOnly = false,
  overlayImage,
  overlayImagePositioning = "",
  overlayImageDimensions = "",
  overlayImageClassName,
}: {
  dimensions?: string;
  imageMargin?: string;
  children?: React.ReactNode;
  bgImage?: string;
  title?: string;
  tagline?: string;
  scrollBackground?: string;
  showIcon?: boolean;
  imageOnly?: boolean;
  bgPosition?: string;
  bgAttachment?: string;
  bgFit?: string;
  overlayImage?: string;
  overlayImagePositioning?: string;
  overlayImageDimensions?: string;
  overlayImageClassName?: string;
}) {
  return (
    <>
      <Flex className="relative">
        {overlayImage && (
          <Image
            alt={overlayImage}
            src={overlayImage}
            className={`absolute ${overlayImagePositioning} ${overlayImageDimensions} ${overlayImageClassName}`}
          />
        )}
        <Box
          className={`${dimensions} border-970-md overflow-y-scroll ${bgAttachment} ${bgImage} ${bgFit} ${bgPosition} bg-no-repeat shadowWideLoose 
        `}
        >
          {!imageOnly && (
            <Box className={imageMargin}>
              <VStackFull
                className={`${scrollBackground} text-col-100 shadow3DSm`}
                align="items-start"
              >
                <VStackFull>
                  {title && (
                    <HStackFull className="justify-between items-center rounded-none p-[1vh] bg-col-960">
                      <Box className="text-xl-tight font-cursive textShadow">
                        {title}
                      </Box>
                      {showIcon && (
                        <Icon icon={CgScrollV} iconClassName="text-[3vh]" />
                      )}
                    </HStackFull>
                  )}
                </VStackFull>
                <VStackFull className="px-[1vh] pb-[1vh]">
                  {tagline && (
                    <FlexFull className="italic text-lg textShadow">
                      {tagline}
                    </FlexFull>
                  )}
                  {children && children}
                </VStackFull>
              </VStackFull>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
}
