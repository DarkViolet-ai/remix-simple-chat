import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export type Animations =
  | "slideInX"
  | "slideInY"
  | "fadeIn"
  | "fadeSlideUpperRight"
  | "fadeSlideUpperLeft"
  | "fadeSlideLowerRight"
  | "fadeSlideLowerLeft"
  | "flipUp"
  | "flipDown"
  | "flipRight"
  | "flipLeft"
  | "zoomIn"
  | "zoomInUp"
  | "zoomInDown"
  | "zoomInLeft"
  | "zoomInRight"
  | "zoomOut"
  | "zoomOutUp"
  | "zoomOutDown"
  | "zoomOutLeft"
  | "zoomOutRight";

interface Props {
  children?: React.ReactNode;
  animation?: Animations;
  xOffset?: string;
  yOffset?: string;
  zoomInFrom?: number;
  zoomOutFrom?: number;
  zoomOutXOffset?: string;
  zoomOutYOffset?: string;
  delay?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  useSpring?: boolean;
}

const AnimatedComponentSpring: React.FC<Props> = ({
  children,
  animation = "slideInY",
  xOffset = "40vw",
  yOffset = "20vh",
  zoomInFrom = 0.1,
  zoomOutFrom = 2.5,
  zoomOutXOffset = "60vw",
  zoomOutYOffset = "40vh",
  damping = 10,
  stiffness = 100,
  delay = 0.2,
  className,
  useSpring = true,
}) => {
  const getTransition = (isVisible: boolean) => {
    // If useSpring is true or if damping and stiffness are provided, use a spring transition
    if (useSpring || (damping !== undefined && stiffness !== undefined)) {
      return {
        type: "spring",
        damping,
        stiffness,
        delay: isVisible ? delay : 0,
      };
    } else {
      // Otherwise, use a duration-based transition
      return {
        delay: isVisible ? delay : 0,
      };
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationVariants: Record<Animations, Variants> = {
    slideInX: {
      hidden: { x: xOffset, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    slideInY: {
      hidden: { y: yOffset, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    fadeSlideUpperRight: {
      hidden: { x: xOffset, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    fadeSlideUpperLeft: {
      hidden: { x: `-${xOffset}`, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    fadeSlideLowerRight: {
      hidden: { x: xOffset, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    fadeSlideLowerLeft: {
      hidden: { x: `-${xOffset}`, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    flipUp: {
      hidden: { rotateX: 90, opacity: 0, transformOrigin: "center bottom" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    flipDown: {
      hidden: { rotateX: -90, opacity: 0, transformOrigin: "center top" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    flipRight: {
      hidden: { rotateY: 90, opacity: 0, transformOrigin: "left center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    flipLeft: {
      hidden: { rotateY: -90, opacity: 0, transformOrigin: "right center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomIn: {
      hidden: { scale: zoomInFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomInUp: {
      hidden: { y: zoomOutYOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomInDown: {
      hidden: { y: `-${zoomOutYOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomInLeft: {
      hidden: { x: `-${xOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomInRight: {
      hidden: { x: xOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomOut: {
      hidden: { scale: zoomOutFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomOutUp: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: zoomOutYOffset },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomOutDown: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: `-${zoomOutYOffset}` },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomOutLeft: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: `-${zoomOutXOffset}` },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
    zoomOutRight: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: zoomOutXOffset },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: getTransition(isVisible),
      },
    },
  };

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponentSpring;
