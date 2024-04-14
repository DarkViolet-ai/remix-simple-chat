import Box from "~/components/buildingBlocks/box";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import CenterFull from "~/components/buildingBlocks/centerFull";
import Flex from "~/components/buildingBlocks/flex";
import IconButton from "~/components/buildingBlocks/iconButton";
import Text from "~/components/buildingBlocks/text";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import VStack from "~/components/buildingBlocks/vStack";
import Center from "~/components/buildingBlocks/center";
import Image from "~/components/buildingBlocks/image";

import CenterHorizontalFull from "~/components/buildingBlocks/centerHorizontalFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import RadialScrollProgressContainer from "~/components/specialty/radialScrollProgressContainer";
import { VerticalScrollProgressContainer } from "~/components/specialty/verticalSnapProgress";

// EXAMPLE ONE
export function ExampleOne() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 180, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="w-[25vh] h-[25vh] bg-300-radial2op50 shadowBroadTight rounded-[2vh]"
    />
  );
}
// EXAMPLE TWO
export function ExampleTwo() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ul
      className="w-85% h-97% grid list-none grid-cols-2 grid-rows-2 gap-[2vh] p-[2vh] border-200-md insetShadowXl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.li
          key={index}
          className="bg-300-radial2op50 rounded-full shadowBroadTight"
          variants={item}
        />
      ))}
    </motion.ul>
  );
}

// EXAMPLE THREE
export function ExampleThree() {
  return (
    <motion.div
      className="bg-100-radial3op50 h-[23vh] w-[23vh] rounded-[2vh] shadowBroadTight"
      whileHover={{ scale: 1.2, rotate: 90 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: "100%",
      }}
    />
  );
}

// EXAMPLE FOUR
export function ExampleFour() {
  const constraintsRef = useRef(null);

  return (
    <motion.div
      ref={constraintsRef}
      className="w-95% h-95% flex justify-center items-center overflow-hidden bg-col-990 insetShadowXl rounded-[2vh] border-990-md"
    >
      <motion.div
        className="w-[8vh] h-[8vh] bg-100-linear2op75 border-300-sm shadowBroadTight rounded-[2vh]"
        drag
        dragConstraints={constraintsRef}
      />
    </motion.div>
  );
}

// EXAMPLE FIVE
export function ExampleFive() {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(0, 100, 100, 0)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(0, 255, 255, 1)",
    },
  };

  return (
    <div className="w-95% h-95% flex justify-center items-center overflow-hidden bg-col-990 border-900-md insetShadowXl rounded-[2vh]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-75% overflow-visible stroke-cyan-700 stroke-[0.2vh]"
      >
        <motion.path
          d="
M70,16
c0,20,-10,30,-20,30
c10,0,20,10,20,30
c0,-20,10,-30,20,-30
c-10,0,-20,-10,-20,-30
z
M30,0
c0,20,-10,30,-20,30
c10,0,20,10,20,30
c0,-20,10,-30,20,-30
c-10,0,-20,-10,-20,-30
z
M43,42
c0,20,-10,30,-20,30
c10,0,20,10,20,30
c0,-20,10,-30,20,-30
c-10,0,-20,-10,-20,-30
z
"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: {
              duration: 2,
              ease: [1, 0, 0.8, 1],
            },
          }}
        />
      </motion.svg>
    </div>
  );
}

// EXAMPLE SIX
export function ExampleSix() {
  return (
    <motion.div
      className="w-[15vh] h-[15vh] bg-500-radial5op50 rounded-[2vh] shadowBroadTight border-970-md"
      animate={{
        background: ["#00cfd6", "#d777fc", "#8d9df2", "#d777fc", "#00cfd6"],
        scale: [0.5, 1.5, 1.25, 1.75, 1.5, 1, 0.5],
        rotate: [0, -90, 180, -90, -180, 0],
        borderRadius: ["0%", "25%", "50%", "25%", "10%", "0%"],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        times: [0, 0.2, 0.6, 0.8, 1],
        repeat: 1,
        repeatDelay: 0.2,
      }}
    />
  );
}

// EXAMPLE SEVEN
export function ExampleSeven() {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ffeede 0%, #025373 100%)",
    "linear-gradient(180deg, #F27D72 0%, #45233e 100%)",
    "linear-gradient(180deg, #9C6892 0%, #F2B680 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(69, 35, 62)",
    "rgb(2, 83, 115)",
    "rgb(156, 104, 146)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div className="w-full h-full relative" style={{ background }}>
      <motion.div
        className="bg-100-linear2op25 w-[10vh] h-[10vh] absolute top-[40%] left-[40%] flex justify-center items-center rounded-[2vh] shadowBroadTight border-970-md"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <svg className="w-80% h-80%" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// EXAMPLE EIGHT
export function ExampleEight() {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  const spring = {
    type: "spring",
    stiffness: 800,
    damping: 33,
  };
  return (
    <Flex
      className={`${
        isOn ? "bg-col-200" : "bg-col-500"
      } px-[8vh] py-[9vh] insetShadowXl transition-500 border-900-md`}
    >
      <div
        className={`w-[20vh] h-[10vh] bg-500-radial6op75 flex ${
          isOn === true ? "justify-start" : "justify-end"
        } rounded-[5vh] p-[1vh] cursor-pointer shadowBroadTight border-970-md`}
        data-ison={isOn}
        onClick={toggleSwitch}
      >
        <motion.div
          className="h-[8vh] bg-100-radial5op50 w-[8vh] rounded-full shadowBroadTight border-970-md"
          layout
          transition={spring}
        />
      </div>
    </Flex>
  );
}

// EXAMPLE NINE
export function ExampleNine() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <VStackFull className="h-full">
      {" "}
      <CenterFull className="h-full">
        <motion.div
          layout
          data-isopen={isExpanded}
          initial={{ borderRadius: 50 }}
          className={`bg-col-200 w-[15vh] h-[15vh] flex justify-center items-center shadowBroadTight border-900-md ${
            isExpanded === true ? "w-[35vh] h-[35vh]" : "w-[12vh] h-[12vh]"
          }`}
        >
          <motion.div
            layout
            transition={{ duration: 0.9 }}
            className="w-[6vh] h-[6vh] bg-col-800 rounded-full shadowBroadTight border-900-md cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </motion.div>
      </CenterFull>
    </VStackFull>
  );
}

// EXAMPLE TEN - LayoutID 1
export function ExampleTen() {
  interface Item {
    id: number;
    icon: string;
    label: string;
  }
  const allItems: Item[] = [
    { id: 0, icon: "💜", label: "Heart" },
    { id: 1, icon: "🦄", label: "Uni" },
    { id: 2, icon: "🔥", label: "Fire" },
    { id: 3, icon: "👽", label: "Alien" },
  ];

  const [selectedTab, setSelectedTab] = useState<Item>(allItems[0]);

  return (
    <VStackFull className="w-full h-full overflow-hidden ">
      <main className="flex-1 flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: -50, x: -50, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: 50, x: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-[25vh]"
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
      <nav className="w-full">
        <ul className={`flex justify-around bg-col-980 `}>
          {allItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer w-25% py-[0.5vh] relative flex justify-center items-center font-semibold ${
                selectedTab.id === item.id ? "text-col-900" : "text-col-100"
              }`}
              onClick={() => setSelectedTab(item)}
            >
              {/* Animated background */}
              {selectedTab.id === item.id && (
                <motion.div
                  layoutId="active-background"
                  className="absolute inset-0 bg-col-200"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Tab content */}
              <div className="z-10 text-[2vh]">
                {item.icon} {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </VStackFull>
  );
}

// EXAMPLE ELEVEN - LayoutID 2
interface Item {
  id: number;
  text: string;
}

export function ItemComponent({
  item,
  isSelected,
  onClick,
}: {
  item: Item;
  isSelected: boolean;
  onClick: () => void;
}) {
  const containerVariants = {
    visible: {
      borderRadius: "2vh",
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 30,
      },
    },
  };

  const detailVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className={`p-[1vh] cursor-pointer w-full flex flex-col shadowBroadTight border-900-md ${
        isSelected ? "bg-col-300 h-45%" : "bg-col-200 h-23%"
      }`}
    >
      <Text
        className={`${
          isSelected ? "font-bold text-[2.3vh]" : "font-semibold text-[2vh]"
        }`}
      >
        {item.text}
      </Text>
      {isSelected && (
        <CenterFull className="h-full">
          <motion.div
            layoutId={`expandable-${item.id}`}
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden bg-col-960 text-col-100 p-[1vh] w-full textShadow shadow-shadowBroadTight border-900-md rounded-[2vh] h-fit"
          >
            Detailed view of {item.text}
          </motion.div>
        </CenterFull>
      )}
    </motion.div>
  );
}

export function ExampleEleven() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const items: Item[] = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];

  return (
    <VStackFull className="h-full p-[1vh]">
      {items.map((item) => (
        <ItemComponent
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
        />
      ))}
    </VStackFull>
  );
}

// EXAMPLE TWELVE - Dynamic Variants
function Component() {
  const controls = useAnimation();
  const backgroundOne = "radial-gradient(circle, #ffeede 0%, #9C6892 100%)";
  const backgroundTwo = "radial-gradient(circle, #F2B680 0%, #03738C 100%)";
  const backgroundThree = "radial-gradient(circle, #45233e 0%, #F27D72 100%)";
  const backgroundFour = "radial-gradient(circle, #032533 0%, #F2B680 100%)";
  const lightFont = "#fff";
  const darkFont = "#000";

  useEffect(() => {
    const sequence = async () => {
      // Start the sequence by moving to the right and partially fading
      await controls.start({
        x: 100,
        y: -100,
        opacity: 0.7,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: -100,
      });

      // Move back to the original position and fully fade in
      await controls.start({
        x: 0,
        opacity: 1,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      // Scale up
      await controls.start({ scale: 1.25, transition: { duration: 1.5 } });

      // Rotate while scaling down
      await controls.start({
        scale: 1,
        rotate: -180,
        borderRadius: "50%",
        background: backgroundThree,
        color: lightFont,
        transition: { duration: 1.75 },
      });

      // Move to the left and partially fading
      await controls.start({
        x: -100,
        opacity: 0.7,
        borderRadius: "20%",
        background: backgroundFour,
        color: lightFont,
        transition: { duration: 0.25 },
      });

      // Move back to the original position and fully fade in
      await controls.start({
        x: 0,
        opacity: 1,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      await controls.start({
        y: -100,
        x: 0,
        opacity: 1,
        borderRadius: "50%",
        background: backgroundOne,
        color: darkFont,
        transition: { duration: 2 },
      });

      await controls.start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundTwo,
        color: lightFont,
        transition: { duration: 1 },
      });

      // Scale up
      await controls.start({
        scale: 1.25,
        transition: { duration: 0.5 },
        background: backgroundTwo,
        color: lightFont,
      });

      // Rotate while scaling down
      await controls.start({
        scale: 1,
        rotate: 0,
        borderRadius: "20%",
        background: backgroundThree,
        color: lightFont,
        transition: { duration: 0.5 },
      });

      await controls.start({
        scale: 0.5,
        borderRadius: "50%",
        transition: { duration: 0.3 },
      });

      // fast rotation
      await controls.start({ rotate: 720, transition: { duration: 1 } });

      // scale, and fade out slightly
      await controls.start({
        scale: 2,
        opacity: 0.9,
        transition: { duration: 1 },
      });
      // fast rotation
      await controls.start({
        rotate: -720,
        transition: { duration: 1 },
        scale: 1,
        background: backgroundOne,
        color: darkFont,
      });
    };

    sequence();
  }, [controls]);

  return (
    <FlexFull className="h-full p-[1vh]">
      <CenterFull className="relative insetShadowXl bg-col-520 border-980-md">
        <motion.div
          className="w-[12vh] h-[12vh] flex justify-center items-center text-center font-semibold text-[2vh] lightGlowSm border-500-lg"
          animate={controls}
        >
          <Text>Controlled Animation</Text>
        </motion.div>
      </CenterFull>
    </FlexFull>
  );
}

export function ExampleTwelve() {
  return (
    <AnimatePresence>
      <Component key="example" />
    </AnimatePresence>
  );
}

// EXAMPLE THIRTEEN

function Component2() {
  const controls = useAnimation();
  const gradientOne = "radial-gradient(circle, #ffeede 0%, #9C6892 100%)";
  const gradientTwo = "radial-gradient(circle, #F2B680 0%, #03738C 100%)";
  const [isAnimating, setIsAnimating] = useState(false);
  const sineFunction = { duration: 0.7, ease: [0.445, 0.05, 0.55, 0.95] };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const sequence = async () => {
      while (isAnimating && isMounted) {
        await controls.start({
          y: "100%", // Move down
          rotate: 180,
          borderRadius: "50%",
          scale: 0.8,
          background: gradientOne,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "0%", // Move up to the original position
          rotate: 360,
          borderRadius: "20%",
          scale: 1,
          background: gradientTwo,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "-100%", // Move up above the starting point
          rotate: 540,
          borderRadius: "50%",
          scale: 1.2,
          background: gradientOne,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;

        await controls.start({
          y: "0%", // Return to starting point
          rotate: 720,
          borderRadius: "20%",
          scale: 1,
          background: gradientTwo,
          transition: sineFunction,
        });
        if (!isAnimating || !isMounted) break;
      }
    };

    if (isAnimating) {
      sequence();
    }

    return () => {
      isMounted = false; // Set isMounted to false when the component unmounts
      controls.stop(); // Stop the animation when the component unmounts or isAnimating changes
    };
  }, [isAnimating, controls, sineFunction]);

  return (
    <FlexFull className="h-full p-[1vh]">
      <CenterFull className="relative insetShadowXl bg-col-520 border-980-md">
        <motion.div
          className="w-[12vh] h-[12vh] flex justify-center items-center text-center font-semibold text-[2vh] metallicEdgesLg border-900-md"
          animate={controls}
        >
          Yo-Yo
        </motion.div>
        <Box className="absolute bottom-[1vh] left-[1vh]">
          <IconButton
            onClick={() => setIsAnimating(!isAnimating)}
            icon={isAnimating ? FaStop : FaPlay}
            type="smallNormal"
          />
        </Box>
      </CenterFull>
    </FlexFull>
  );
}

export function ExampleThirteen() {
  return (
    <AnimatePresence>
      <Component2 key="yo-yo" />
    </AnimatePresence>
  );
}

// EXAMPLE FOURTEEN
function ScrollItem() {
  const random = Math.floor(Math.random() * 100) + 1;
  return (
    <Box className="p-[0.5vh]">
      <Center className="w-[41vh] h-[34vh] bg-col-770 shadowBroadTight border-970-md flex-shrink-0 overflow-hidden">
        <Image
          src={`https://picsum.photos/id/${random}/400/400.jpg`}
          alt="an example"
          className="w-full h-full object-cover"
        />
      </Center>
    </Box>
  );
}

export function ExampleFourteen() {
  const items = Array.from({ length: 10 }, (_, i) => i);
  return (
    <FlexFull className="h-full p-[1vh]">
      <RadialScrollProgressContainer
        itemComponent={ScrollItem}
        items={items}
        title="scroll horizontally"
      />
    </FlexFull>
  );
}

// EXAMPLE FIFTEEN
function ScrollBox({ label }: { label: string }) {
  const random = Math.floor(Math.random() * 100) + 1;
  return (
    <div className="w-[50vh] h-[45vh] relative overflow-hidden rounded-none p-[1.5vh] pt-[2vh] bg-col-930">
      <CenterHorizontalFull className="h-full bg-500-radial3op50 shadowBroadLoose border-980-md">
        <VStackFull gap="gap-[1.5vh] ">
          <VStack className="p-[1vh] bg-col-970 insetShadowXl border-900-md">
            <Text className="text-[2.5vh] font-semibold text-col-100 textShadow">
              {label}
            </Text>
          </VStack>
          <Box className="w-[40vh] h-[28vh] overflow-hidden shadowBroadLoose border-980-md">
            <img
              src={`https://picsum.photos/id/${random}/600/600`}
              alt={`example`}
              className="w-full h-full"
            />
          </Box>
        </VStackFull>
      </CenterHorizontalFull>
    </div>
  );
}

const testItems = Array.from({ length: 15 }, (_, i) => ({
  label: `Item ${i + 1}`,
  content: `This is some content for item ${i + 1}`,
}));

export function ExampleFifteen() {
  return (
    <VerticalScrollProgressContainer
      items={testItems}
      itemComponent={ScrollBox}
      progressHeight="h-[0.7vh]"
      height="h-full"
      width="w-full"
    />
  );
}

// export function ExampleSixteen() {
//   return <motion.div>this</motion.div>;
// }

// // EXAMPLE SEVENTEEN
// export function ExampleSeventeen() {
//   return <motion.div>this</motion.div>;
// }

// // EXAMPLE EIGHTEEN
// export function ExampleEighteen() {
//   return <motion.div>this</motion.div>;
// }

// // EXAMPLE NINETEEN
// export function ExampleNineteen() {
//   return <motion.div>this</motion.div>;
// }

// // EXAMPLE TWENTY
// export function ExampleTwenty() {
//   return <motion.div>this</motion.div>;
// }
