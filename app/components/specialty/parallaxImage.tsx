import Flex from "../buildingBlocks/flex";
import Box from "../buildingBlocks/box";

export default function ParallaxImage({
  dimensions = "h-[50vh] w-[50vw]",
  bgImage = "/images/rain.jpg",
  bgPosition = "center",
  bgAttachment = "bg-fixed",
  bgFit = "bg-cover",
  className,
}: {
  dimensions?: string;
  bgImage?: string;
  bgPosition?: string;
  bgFit?: string;
  bgSize?: string;
  className?: string;
  bgAttachment?: string;
}) {
  return (
    <Flex className="relative">
      {" "}
      {/* Performance optimization */}
      <Box
        className={`${dimensions} border-970-md overflow-y-scroll ${bgAttachment} ${bgImage} ${bgFit} ${bgPosition} bg-no-repeat shadowWideLoose 
        ${className} `}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: bgPosition,
        }}
      ></Box>
    </Flex>
  );
}
