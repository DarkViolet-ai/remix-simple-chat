import { Variants, motion } from "framer-motion";
import Flex from "../buildingBlocks/flex";

export default function AnimatedParallaxImage({
  parallaxHeight = "h-[50vh]",
  parallaxWidth = "50vw",
  bgImage = "/images/rain.jpg",
  bgPosition = "center",
  bgSize,
  className,
  isAnimated = false,
  yValues = [0, -20, -40, -20, 0],
  duration = 20,
  sectionsClassName = "shadowWideLoose border-970-md ",
}: {
  parallaxHeight?: string;
  parallaxWidth?: string;
  bgImage?: string;
  bgPosition?: string;
  bgSize?: string;
  className?: string;
  isAnimated?: boolean;
  yValues?: number[];
  duration?: number;
  sectionsClassName?: string;
}) {
  const animationVariants = {
    move: {
      y: yValues,
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <Flex className="relative" style={{ willChange: "transform" }}>
      {" "}
      {/* Performance optimization */}
      <motion.div
        className={`${parallaxHeight} ${sectionsClassName} overflow-y-scroll ${bgImage} bg-cover bg-no-repeat  ${className}`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: bgPosition,
          backgroundSize: bgSize,
          width: parallaxWidth,
        }}
        variants={isAnimated ? (animationVariants as Variants) : undefined}
        animate="move"
      ></motion.div>
    </Flex>
  );
}
