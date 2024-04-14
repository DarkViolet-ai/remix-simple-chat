import { useEffect, useState } from "react";
import Flex from "./flex";
import { motion } from "framer-motion";
import Text from "./text";

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = () => {
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  return { isToastVisible, showToast, hideToast };
};

const toastVariants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, transition: { duration: 0.5 } },
};

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center-right"
  | "center-bottom"
  | "center-left"
  | "center-top"
  | "center-center";

interface ToastProps {
  message: string;
  isVisible: boolean;
  duration?: number;
  fontSize?: string;
  lineHeight?: string;
  noOfLines?: number;
  onClose: () => void;
  position?: ToastPosition;
  containerClassName?: string;
  contentClassName?: string;
  textClassName?: string;
  toastSize?: string;
  bg?: string;
}

export default function Toast({
  noOfLines = 4,
  message,
  isVisible,
  duration = 4000,
  onClose,
  position = "center-center",
  toastSize = "w-fit h-fit",
  containerClassName = "",
  bg = "bg-100-linear6op75 shadowBroadNormal",
  contentClassName = "justify-center items-center p-[4vh]",
  textClassName = "text-col-100 text-lg-normal ",
}: ToastProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    let timer: number; // Explicitly typing the timer variable as a number
    if (isVisible) {
      timer = window.setTimeout(() => {
        // Using window.setTimeout for clarity
        setShow(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);

  // Position classes
  const positionClasses: { [key in ToastPosition]: string } = {
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
    "center-right": "top-1/2 right-10 transform -translate-y-1/2",
    "center-bottom": "bottom-10 left-1/2 transform -translate-x-1/2",
    "center-left": "top-1/2 left-10 transform -translate-y-1/2",
    "center-top": "top-20 left-1/2 transform -translate-x-1/2",
    "center-center":
      "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  const positionClass = positionClasses[position] || "bottom-5 right-5";

  return (
    <motion.div
      className={`fixed ${positionClass} z-20 ${bg} ${toastSize} ${containerClassName}`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={toastVariants}
    >
      <Flex className={`w-full h-full ${contentClassName}`}>
        <Text noOfLines={noOfLines} className={`${textClassName}`}>
          {message}
        </Text>
      </Flex>
    </motion.div>
  );
}
