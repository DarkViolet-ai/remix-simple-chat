import { motion, MotionStyle } from "framer-motion";
import { useRef } from "react";
import Center from "~/components/buildingBlocks/center";
import CenterFull from "~/components/buildingBlocks/centerFull";
import Flex from "~/components/buildingBlocks/flex";

export default function InteractivePerspectiveContainer({
  containerDimensions = "w-screen h-screen",
  containerBg = "bg-400",
  containerClassName = "justify-center items-center",
  perspectiveWidth = "w-[80vw]",
  perspectiveHeight = "h-[80vh]",
  bg = "bg-900-radial3op75",
  shadow = "shadowBroadLooser",
  perspective = "1000px",
  scale = 1.02,
  rotateAmount = 40,
  children,
}: {
  containerDimensions?: string;
  containerBg?: string;
  containerClassName?: string;
  perspectiveWidth?: string;
  perspectiveHeight?: string;
  bg?: string;
  shadow?: string;
  perspective?: string;
  scale?: number;
  rotateAmount?: number;
  children?: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calculate the position of the mouse relative to the center of the element
      const centerX = mouseX / rect.width - 0.5;
      const centerY = mouseY / rect.height - 0.5;

      // Apply a damping factor to smooth out the rotation near the edges
      const dampingFactor = 0.5; // You can adjust this value to get the desired smoothness
      const rotateY =
        centerX * rotateAmount * (1 - Math.abs(centerX) * dampingFactor);
      const rotateX =
        centerY * -rotateAmount * (1 - Math.abs(centerY) * dampingFactor);

      const style: MotionStyle = {
        transform: `perspective(${perspective}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      };
      card.style.transform = style.transform as string;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      const style: MotionStyle = {
        transform: `perspective(${perspective}) rotateX(0deg) rotateY(0deg) scale(1)`,
      };
      card.style.transform = style.transform as string;
    }
  };

  return (
    <Flex
      className={`${containerDimensions} ${containerBg} ${containerClassName}`}
    >
      <Center className={`${perspectiveWidth} ${perspectiveHeight}`}>
        <motion.div
          ref={cardRef}
          className={`relative ${perspectiveWidth} ${perspectiveHeight} cursor-pointer`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Center className={`absolute inset-0 p-[2vh]`}>
            <CenterFull className={`${bg} ${shadow} h-full`}>
              {children}
            </CenterFull>
          </Center>
        </motion.div>
      </Center>
    </Flex>
  );
}
