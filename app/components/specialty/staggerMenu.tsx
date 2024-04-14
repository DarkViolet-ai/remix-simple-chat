/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Flex from "~/components/buildingBlocks/flex";
import Button from "~/components/buildingBlocks/button";
import IconButton from "~/components/buildingBlocks/iconButton";
import { CgSmile, CgClose } from "react-icons/cg";
import Portal from "~/components/buildingBlocks/portal";
import VStack from "~/components/buildingBlocks/vStack";
import useEscapeKey from "~/utils/useEscapeKey";
import FlexFull from "~/components/buildingBlocks/flexFull";
import Box from "~/components/buildingBlocks/box";
import Transition from "~/components/buildingBlocks/transition";
import { ButtonType } from "../buildingBlocks/navLinkButton";
import { NavLink } from "@remix-run/react";

const tempItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/",
  },
  {
    title: "Contact",
    to: "/",
  },
];

type MenuItem = {
  title: string;
  to?: string;
  onClick?: () => void;
};

export default function StaggerMenu({
  enterFrom = "top",
  menuItems = tempItems,
  menuDirection = "flex-row",
  menuGap = "gap-[1vh]",
  containerClassName = "w-screen justify-evenly p-[1vh]",
  itemPadding = "px-[1.5vh] py-[0.5vh]",
  itemStyle = "bg-col-300",
  itemHoverStyle = "hover:bg-col-200 transition-400",
  itemHoverAnimation = "hover:-translate-x-[1vh]",
  slideDistance = 100,
  damping = 10,
  stiffness = 100,
  buttonText,
  buttonIcon,
  buttonType,
  staggerDuration = 0.2,
  overlayStyle = " bg-col-120 backdrop-blur-md",
  menuPosition = "left-0 top-[6vh]",
  closeButtonDelay = 1,
  buttonComponent,
  itemWhileHover,
  itemWhileTap,
}: {
  enterFrom?: string;
  menuItems?: MenuItem[];
  menuDirection?: string;
  menuGap?: string;
  containerClassName?: string;
  itemStyle?: string;
  itemHoverStyle?: string;
  itemHoverAnimation?: string;
  itemPadding?: string;
  slideDistance?: number | string;
  damping?: number;
  stiffness?: number;
  buttonText?: string;
  buttonIcon?: React.ComponentType<{ className?: string }>;
  buttonType?: string;
  staggerDuration?: number;
  overlayStyle?: string;
  menuPosition?: string;
  closeButtonDelay?: number;
  buttonComponent?: React.ReactNode;
  itemWhileHover?: any;
  itemWhileTap?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const itemVariants = {
    hidden: (enterFrom: string) => {
      switch (enterFrom) {
        case "left":
          return { x: -slideDistance, opacity: 0 };
        case "right":
          return { x: slideDistance, opacity: 0 };
        case "top":
          return { y: -slideDistance, opacity: 0 };
        case "bottom":
          return { y: slideDistance, opacity: 0 };
        default:
          return { x: 0, opacity: 0 };
      }
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping,
        stiffness,
      },
    },
    exit: (enterFrom: string) => {
      switch (enterFrom) {
        case "left":
          return { x: -slideDistance, opacity: 0 }; // Exit to the left
        case "right":
          return { x: slideDistance, opacity: 0 }; // Exit to the right
        case "top":
          return { y: -slideDistance, opacity: 0 }; // Exit to the top
        case "bottom":
          return { y: slideDistance, opacity: 0 }; // Exit to the bottom
        default:
          return { x: 0, opacity: 0 };
      }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: staggerDuration,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: staggerDuration,
        staggerDirection: -1,
      },
    },
  };

  useEscapeKey(() => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setShowMenu(isOpen);
  }, [isOpen]);

  return (
    <>
      {buttonComponent ? (
        <Box className="hover:cursor-pointer" onClick={toggleMenu}>
          {buttonComponent}
        </Box>
      ) : (
        <VStack>
          {buttonText ? (
            <Button
              onClick={toggleMenu}
              buttonText="Open Menu"
              iconLeft={buttonIcon ? buttonIcon : undefined}
            />
          ) : (
            <VStack>
              <IconButton
                onClick={toggleMenu}
                icon={buttonIcon ? buttonIcon : CgSmile}
                type={buttonType as ButtonType}
              />
            </VStack>
          )}
        </VStack>
      )}

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <motion.div
              className={`fixed inset-0 ${overlayStyle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className={`fixed ${menuPosition}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <Flex
                  className={`${containerClassName} ${menuDirection} ${
                    menuDirection === "flex-row"
                      ? "justify-between items-center"
                      : "justify-center items-between"
                  }`}
                >
                  <Flex
                    className={`${menuDirection} ${menuGap} w-full ${
                      menuDirection === "flex-row"
                        ? "justify-around items-center"
                        : "justify-center items-between"
                    }`}
                  >
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={enterFrom}
                        exit={itemVariants.exit(enterFrom)}
                      >
                        {item.to && (
                          <NavLink to={item.to}>
                            <Flex
                              className={` hover:cursor-pointer ${itemPadding} ${itemStyle} ${itemHoverStyle} ${itemHoverAnimation}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.title}
                            </Flex>
                          </NavLink>
                        )}
                        {item.onClick && (
                          <motion.div
                            className={`hover:cursor-pointer flex ${itemPadding} ${itemStyle} ${itemHoverStyle} ${itemHoverAnimation}`}
                            onClick={() => {
                              item.onClick && item.onClick();
                              setIsOpen(false);
                            }}
                            whileHover={itemWhileHover}
                            whileTap={itemWhileTap}
                          >
                            {item.title}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </Flex>
                  <Transition delay={closeButtonDelay}>
                    <FlexFull className="p-[0.5vh] justify-center">
                      <Box className="py-[0.2vh] px-[0.7vh] bg-col-950">
                        <IconButton
                          onClick={toggleMenu}
                          icon={CgClose}
                          type="smallUnstyled"
                          iconClassName="text-col-100"
                        />
                      </Box>
                    </FlexFull>
                  </Transition>
                </Flex>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
