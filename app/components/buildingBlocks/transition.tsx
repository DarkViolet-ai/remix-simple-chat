// PageTransition.tsx

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

export type TransitionType =
  | "fade"
  | "scale"
  | "slide"
  | "rotate"
  | "flip"
  | "zoom"
  | "slideInLeft"
  | "slideInTopLeft"
  | "slideInBottomLeft"
  | "slideInTop"
  | "slideInTopRight"
  | "slideInRight"
  | "slideInBottomRight"
  | "slideInBottom"
  | "fadeSlideInRight"
  | "fadeSlideInLeft"
  | "fadeSlideInTopLeft"
  | "fadeSlideInBottomLeft"
  | "fadeSlideInTop"
  | "fadeSlideInTopRight"
  | "fadeSlideInBottomRight"
  | "fadeSlideInBottom";

interface TransitionProps {
  children: ReactNode;
  className?: string;
  type?: TransitionType;
  delay?: number;
  duration?: number;
  style?: object;
  onClick?: () => void;
  key?: string;
}

const transitionVariants: Record<TransitionType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
  rotate: {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 90, opacity: 0 },
  },
  flip: {
    initial: { scaleX: -1, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: -1, opacity: 0 },
  },
  zoom: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  slide: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  slideInTopLeft: {
    initial: { x: "-100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "-100%" },
  },
  slideInBottomLeft: {
    initial: { x: "-100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: "100%" },
  },
  slideInTop: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  slideInTopRight: {
    initial: { x: "100%", y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "-100%" },
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  slideInBottomRight: {
    initial: { x: "100%", y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: "100%" },
  },
  slideInBottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },

  fadeSlideInRight: {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  },

  fadeSlideInLeft: {
    initial: { x: "-50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-50%", opacity: 0 },
  },
  fadeSlideInTopLeft: {
    initial: { x: "-50%", y: "-50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "-50%", y: "-50%", opacity: 0 },
  },
  fadeSlideInBottomLeft: {
    initial: { x: "-50%", y: "50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "-50%", y: "50%", opacity: 0 },
  },
  fadeSlideInTop: {
    initial: { y: "-50%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-50%", opacity: 0 },
  },
  fadeSlideInTopRight: {
    initial: { x: "50%", y: "-50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "50%", y: "-50%", opacity: 0 },
  },
  fadeSlideInBottomRight: {
    initial: { x: "50%", y: "50%", opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { x: "50%", y: "50%", opacity: 0 },
  },
  fadeSlideInBottom: {
    initial: { y: "50%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "50%", opacity: 0 },
  },
};

export default function Transition({
  children,
  type = "fade",
  delay = 0,
  className = "",
  style = {},
  duration = 0.5,
  onClick,
  key,
}: TransitionProps) {
  return (
    <motion.div
      className={`flex justify-center overflow-hidden ${className}`}
      key={key}
      variants={transitionVariants[type]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, delay }}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
