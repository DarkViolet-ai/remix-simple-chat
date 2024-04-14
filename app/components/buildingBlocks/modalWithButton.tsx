// FramerMotionModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Portal from "./portal";
import IconButton from "./iconButton";
import ModalContent from "./modalContent";
import useEscapeKey from "~/utils/useEscapeKey";
import Button, { ButtonType } from "./button";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  modalSize?: string;
  icon?: React.ComponentType;
  label?: string;
  overlayBlur?: string;
  overlayColor?: string;
  showTopClose?: boolean;
  showBottomClose?: boolean;
  buttonType?: ButtonType;
  footerClassName?: string;
  buttonText?: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  overlayZIndex?: number;
  modalZIndex?: number;
}

export default function ModalWithButton({
  className = "",
  style = {},
  icon: Icon,
  label,
  children,
  overlayBlur = "defaultOverlayBlur",
  overlayColor = "defaultOverlay",
  modalSize = "w-full h-94% lg:w-[80vw]",
  showTopClose = true,
  showBottomClose = true,
  footerClassName,
  buttonType,
  buttonText,
  iconLeft,
  iconRight,
  overlayZIndex = 60,
  modalZIndex = 100,
}: ModalProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  // Animation variants for scaling in and out
  const variants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  useEscapeKey(() => setModalOpen(false));

  return (
    <>
      {" "}
      {buttonText && iconLeft ? (
        <Button
          buttonText={buttonText}
          onClick={() => setModalOpen(true)}
          iconLeft={Icon}
          type={buttonType}
        />
      ) : buttonText && iconRight ? (
        <Button
          buttonText={buttonText}
          onClick={() => setModalOpen(true)}
          type={buttonType}
          iconRight={Icon}
        />
      ) : buttonText ? (
        <Button buttonText={buttonText} onClick={() => setModalOpen(true)} />
      ) : null}
      {Icon && !buttonText && (
        <IconButton
          icon={Icon}
          label={label}
          onClick={() => setModalOpen(true)}
          type={buttonType}
        />
      )}
      <Portal>
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className={`fixed inset-0 w-screen h-screen ${overlayColor} ${overlayBlur}`}
                onClick={() => setModalOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ maxHeight: "100svh", zIndex: overlayZIndex }}
              />
              {/* Modal */}
              <motion.div
                className={`fixed inset-0 m-auto z-50 rounded-none ${modalSize} ${className}`}
                style={{ ...style, maxHeight: "100svh", zIndex: modalZIndex }}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <ModalContent
                  setModalOpen={setModalOpen}
                  showBottomClose={showBottomClose}
                  showTopClose={showTopClose}
                  footerClassName={footerClassName}
                >
                  {children}
                </ModalContent>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
