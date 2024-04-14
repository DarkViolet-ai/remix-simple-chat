import Box from "./box";
import Image from "./image";
import Flex from "./flex";
import { imageFallback } from "styles";

interface BackgroundImageProps {
  image?: string;
  style?: React.CSSProperties;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
  w?: string;
  h?: string;
  objectFit?: string;
  objectPosition?: string;
  bgOverlayColor?: string;
  bgOverlayGradient?: string;
  shadow?: string;
  children?: React.ReactNode;
  overlayStyles?: string;
  innerContainerStyles?: string;
  overlayBlur?: string;
  showOverlay?: boolean;
  rounded?: string;
  p?: string;
}

export default function BackgroundImageContainer({
  image,
  containerClassName = "",
  imageClassName = "",
  alt = "",
  style = {},
  w = "w-full",
  h = "h-full",
  objectFit = "cover",
  objectPosition = "object-center",
  innerContainerStyles = "",
  shadow = "shadowNarrowNormal",
  showOverlay = true,
  bgOverlayColor = "bg-col-920",
  bgOverlayGradient = "bg-darkenPurpleGrad",
  overlayBlur = "backdrop-blur-[2px]",
  overlayStyles,
  children,
  rounded,
  p = "p-[1vh]",
}: BackgroundImageProps) {
  return (
    <Box
      className={`relative ${w} ${h} ${shadow} ${containerClassName} ${rounded}`}
      style={style}
    >
      <Image
        src={image ? image : imageFallback}
        alt={alt}
        className={`${objectFit} ${objectPosition} w-full h-full ${rounded} ${imageClassName}`}
      />
      {showOverlay && (
        <Flex
          className={`absolute top-0 left-0 w-full h-full ${overlayBlur} ${rounded} ${bgOverlayColor} ${bgOverlayGradient} ${p} ${overlayStyles} `}
        >
          <Flex className={`w-full h-full ${innerContainerStyles}`}>
            {children}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
