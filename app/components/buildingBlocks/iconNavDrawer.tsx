// FramerMotionDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import VStack from "../buildingBlocks/vStack";
import Box from "../buildingBlocks/box";
import useEscapeKey from "~/utils/useEscapeKey";
import { CloseIcon } from "styles";

interface IconDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function IconDrawer({
  className = "",
  style = {},
  isOpen,
  onClose,
  children,
  setDrawerOpen,
}: IconDrawerProps) {
  // Animation variants for sliding in and out
  const variants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  useEscapeKey(() => onClose());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-col-975 backdrop-blur-sm bg- z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Drawer */}
          <motion.div
            className={`fixed top-2 right-0 w-full sm:w-[400px] h-[50px] bg-white  shadow3D z-50 ${className}`}
            style={style}
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <VStack
              className="w-full h-full justify-between relative bg-cyanBack border-l-3 border-col-900"
              gap="gap-0"
            >
              {children}
              <Box
                onClick={() => setDrawerOpen(false)}
                className="absolute top-1 right-1 border-2 border-col-175"
              >
                <CloseIcon size="text-[2vh]" />
              </Box>
            </VStack>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
