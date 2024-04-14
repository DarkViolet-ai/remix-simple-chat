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
  duration?: number;
  xOffset?: string;
  yOffset?: string;
  zoomInFrom?: number;
  zoomOutFrom?: number;
  zoomOutXOffset?: string;
  zoomOutYOffset?: string;
  delay?: number;
  className?: string;
}

const AnimatedComponent: React.FC<Props> = ({
  children,
  animation = "slideInY",
  duration = 1,
  xOffset = "40vw",
  yOffset = "20vh",
  zoomInFrom = 0.1,
  zoomOutFrom = 2.5,
  zoomOutXOffset = "60vw",
  zoomOutYOffset = "40vh",
  delay = 0.2,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationVariants: Record<Animations, Variants> = {
    slideInX: {
      hidden: { x: xOffset, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    slideInY: {
      hidden: { y: yOffset, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    fadeSlideUpperRight: {
      hidden: { x: xOffset, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    fadeSlideUpperLeft: {
      hidden: { x: `-${xOffset}`, y: `-${yOffset}`, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    fadeSlideLowerRight: {
      hidden: { x: xOffset, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    fadeSlideLowerLeft: {
      hidden: { x: `-${xOffset}`, y: yOffset, opacity: 0 },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          delay: isVisible ? delay : 0,
        },
      },
    },
    flipUp: {
      hidden: { rotateX: 90, opacity: 0, transformOrigin: "center bottom" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    flipDown: {
      hidden: { rotateX: -90, opacity: 0, transformOrigin: "center top" },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    flipRight: {
      hidden: { rotateY: 90, opacity: 0, transformOrigin: "left center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    flipLeft: {
      hidden: { rotateY: -90, opacity: 0, transformOrigin: "right center" },
      visible: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomIn: {
      hidden: { scale: zoomInFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomInUp: {
      hidden: { y: zoomOutYOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomInDown: {
      hidden: { y: `-${zoomOutYOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomInLeft: {
      hidden: { x: `-${xOffset}`, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomInRight: {
      hidden: { x: xOffset, scale: zoomInFrom, opacity: 0 },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomOut: {
      hidden: { scale: zoomOutFrom, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomOutUp: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: zoomOutYOffset },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomOutDown: {
      hidden: { scale: zoomOutFrom, opacity: 0, y: `-${zoomOutYOffset}` },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomOutLeft: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: `-${zoomOutXOffset}` },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
      },
    },
    zoomOutRight: {
      hidden: { scale: zoomOutFrom, opacity: 0, x: zoomOutXOffset },
      visible: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: duration, delay: isVisible ? delay : 0 },
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

export default AnimatedComponent;
