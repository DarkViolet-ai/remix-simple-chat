// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import IconButton from "./iconButton";
import Portal from "./portal";
import useEscapeKey from "~/utils/useEscapeKey";
import { TooltipPlacement } from "./tooltip";
import { ButtonType } from "./button";
import DrawerContent from "./drawerContent";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  buttonTextLeft?: string;
  buttonTextRight?: string;
  slideDirection?:
    | "top-right"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "top-left"
    | "top-center"
    | "top"
    | "right"
    | "bottom"
    | "left";
  buttonType?: ButtonType;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  icon?: React.ComponentType;
  label?: string;
  drawerWidth?: string;
  drawerHeight?: string;
  showBottomButton?: boolean;
  showTopButton?: boolean;
  overlayBlur?: string;
  overlayColor?: string;
  drawerBg?: string;
  buttonTooltipPlacement?: TooltipPlacement;
}

export default function DrawerWithButton({
  className = "",
  buttonType,
  slideDirection = "right",
  style = {},
  children,
  icon: Icon,
  label,
  showBottomButton = true,
  showTopButton = true,
  drawerWidth = "w-[400px] ultraHD:w-[800px]",
  drawerBg = "bg-col-700",
  drawerHeight = "h-full",
  overlayBlur = "defaultOverlayBlur",
  overlayColor = "defaultOverlay",
  buttonTooltipPlacement = "bottomRight",

  ...props
}: DrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Animation variants for sliding in and out
  const variants = {
    open: (direction: string) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };

      const baseVariant = { transition, x: 0, y: 0 };

      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { ...baseVariant, y: 0 };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { ...baseVariant, y: 0 };
        case "left":
          return { ...baseVariant, x: 0 };
        case "right":
          return { ...baseVariant, x: 0 };
        default:
          return { ...baseVariant, x: 0 };
      }
    },
    closed: (direction: string) => {
      const transition = { type: "spring", stiffness: 300, damping: 30 };

      switch (direction) {
        case "top-right":
        case "top-left":
        case "top-center":
          return { x: undefined, y: "-100%", transition };
        case "bottom-right":
        case "bottom-left":
        case "bottom-center":
          return { x: undefined, y: "100%", transition };
        case "left":
          return { x: "-100%", y: undefined, transition };
        case "right":
          return { x: "100%", y: undefined, transition };
        default:
          return { x: "100%", y: undefined, transition };
      }
    },
  };

  const drawerPositionClass = (direction: string) => {
    switch (direction) {
      case "top-right":
        return "top-0 right-0";
      case "top-left":
        return "top-0 left-0";
      case "top-center":
        return "top-0 left-1/2 -translate-x-1/2";
      case "bottom-right":
        return "bottom-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-center":
        return "bottom-0 left-1/2 -translate-x-1/2";
      case "left":
        return "left-0 top-0 -translate-y-1/2";
      case "right":
        return "right-0 top-0 -translate-y-1/2";
      default:
        return "top-0 right-0";
    }
  };

  useEscapeKey(() => setDrawerOpen(false));

  return (
    <>
      {Icon && (
        <IconButton
          icon={Icon}
          label={label}
          onClick={() => setDrawerOpen(true)}
          type={buttonType as ButtonType}
          tooltipPlacement={buttonTooltipPlacement}
        />
      )}
      <Portal>
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className={`fixed inset-0 ${overlayColor} ${overlayBlur} z-40`}
                onClick={() => setDrawerOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Drawer */}
              <motion.div
                className={`fixed ${drawerPositionClass(
                  slideDirection
                )} shadowNarrowNormal z-50 ${drawerHeight} ${className} ${drawerWidth}`}
                style={style}
                variants={variants}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                custom={slideDirection}
                initial="closed"
                animate="open"
                exit="closed"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
              >
                <DrawerContent
                  showTopButton={showTopButton}
                  showBottomButton={showBottomButton}
                  setDrawerOpen={setDrawerOpen}
                  drawerBg={drawerBg}
                >
                  {children}
                </DrawerContent>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
