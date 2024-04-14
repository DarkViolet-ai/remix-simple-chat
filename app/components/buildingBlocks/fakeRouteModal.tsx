import { AnimatePresence, motion } from "framer-motion";
import Flex from "./flex";
import { CloseTextButton } from "./closeTextButton";
import { CloseButton } from "./closeButton";
import { useNavigate } from "@remix-run/react";
import useEscapeKey from "~/utils/useEscapeKey";
import FlexFull from "./flexFull";
import Box from "./box";

interface FakeRouteModalProps {
  exitLink?: string;
  children?: React.ReactNode;
  modalContentClassName?: string;
  modalOverlayClassName?: string;
  modalFooterClassName?: string;
  style?: React.CSSProperties;
  modalSize?: string;
  showTopClose?: boolean;
  topCloseButtonRight?: string;
  topCloseButtonTop?: string;
  topCloseButtonSize?: string;
  topCloseButtonIsSmall?: boolean;
  topCloseButtonIsUnstyled?: boolean;
  contentBgOverlay?: string;
  showBottomClose?: boolean;
  bottomCloseIsSmall?: boolean;
  footerBorder?: string;
  bottomPadding?: string;
  contentBg?: string;
  overlayColor?: string;
  overlayBlur?: string;
  maxWidth?: string;
  shadow?: string;
  variants?: {
    open: {
      scale: number;
      opacity: number;
      transition: { type: string; stiffness: number; damping: number };
    };
    closed: {
      scale: number;
      opacity: number;
      transition: { type: string; stiffness: number; damping: number };
    };
  };
}

const modalVariants = {
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

export default function FakeRouteModal({
  modalContentClassName = "",
  modalOverlayClassName = "",
  modalFooterClassName = "bg-darkGrayBack",
  style = {},
  modalSize = "w-98% h-full lg:w-94% lg:h-94%",
  exitLink,
  children,
  showTopClose = true,
  topCloseButtonSize = "text-[3.5vh]",
  contentBgOverlay = "",
  showBottomClose = true,
  overlayBlur = "defaultOverlayBlur",
  bottomPadding = "pb-[0.5vh]",
  overlayColor = "imageOverlay",
  contentBg,
  footerBorder = "border-t-2 border-col-850",
  maxWidth,
  variants = modalVariants,
}: FakeRouteModalProps) {
  const navigate = useNavigate();
  useEscapeKey(() => {
    navigate(exitLink || "");
  });

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className={`fixed inset-0 w-screen h-screen z-50 pt-[6vh] pb-[4vh] ${overlayColor} ${overlayBlur} ${modalOverlayClassName}`}
        onClick={() => navigate(exitLink || "")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 100, maxHeight: "100svh", borderRadius: "0px" }}
      />
      {/* Modal */}

      <motion.div
        className={`${maxWidth} fixed inset-0 m-auto flex flex-col justify-between shadow3DLg ${modalSize} ${contentBg} ${modalContentClassName}`}
        style={{ ...style, zIndex: 101, maxHeight: "88svh" }}
        variants={variants}
        initial="closed"
        animate="open"
        exit="closed"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      >
        <Flex
          className={
            showBottomClose
              ? `w-full h-full relative pb-[5vh] ${contentBgOverlay} border-970-md ${footerBorder} `
              : `w-full h-full relative ${contentBgOverlay} border-970-md`
          }
        >
          {showTopClose && (
            <Box className="absolute top-[1vh] right-[1vh]">
              <CloseButton
                onClose={() => navigate(exitLink || "")}
                iconClassName={topCloseButtonSize}
                buttonRadius="rounded-full"
                type="smallUnstyled"
              />
            </Box>
          )}
          {children}
          {showBottomClose && (
            <FlexFull
              className={`h-[5vh] fixed bottom-0 left-0 items-end rounded-t-none ${footerBorder} justify-center flex-shrink-0 ${bottomPadding} ${modalFooterClassName}`}
            >
              <CloseTextButton
                onClose={() => navigate(exitLink || "")}
                type="smallNormal"
              />
            </FlexFull>
          )}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
}
