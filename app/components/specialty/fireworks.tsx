import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Box from "~/components/buildingBlocks/box";

interface ParticleProps {
  angle: number;
  color: string;
  minSize: number;
  maxSize: number;
  minDistance: number;
  maxDistance: number;
  minDuration?: number;
  maxDuration?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleDuration?: number;
  scaleMinDuration?: number;
  scaleMaxDuration?: number;
}

const Particle: React.FC<ParticleProps> = ({
  angle,
  color,
  minSize,
  maxSize,
  minDistance,
  maxDistance,
  minDuration = 1,
  maxDuration = 6,
  scaleMin = 0.5,
  scaleMax = 1.5,
  scaleMinDuration = 1,
  scaleMaxDuration = 5,
}) => {
  const radians = angle * (Math.PI / 180);
  const distance = Math.random() * (maxDistance - minDistance) + minDistance;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;
  const randomSize = (
    Math.round((Math.random() * (maxSize - minSize) + minSize) * 10) / 10
  ).toFixed(1);
  const randomDuration =
    Math.random() * (maxDuration - minDuration) + minDuration;
  const scaleDuration =
    Math.random() * (scaleMaxDuration - scaleMinDuration) + scaleMinDuration;
  const boxShadow = `0 0 0.1vh 3px rgba(255, 255, 255, 0.1)`;

  return (
    <motion.div
      className="absolute"
      style={{
        backgroundColor: color,
        width: `${randomSize}vh`,
        height: `${randomSize}vh`,
        borderRadius: "50%",
        boxShadow: boxShadow,
      }}
      initial={{ opacity: 0, scale: scaleMin, x: 0, y: 0 }}
      animate={{
        opacity: [1, 0],
        scale: [scaleMin, scaleMax, scaleMin],
        x: x,
        y: y,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: randomDuration,
        ease: "easeOut",
        opacity: { duration: randomDuration * 0.5 },
        scale: {
          duration: scaleDuration,
          repeat: 0,
        },
      }}
    />
  );
};

const Fireworks: React.FC<{
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  minDistance?: number;
  maxDistance?: number;
  minDuration?: number;
  maxDuration?: number;
  placementClassName?: string;
  numParticles?: number;
  delay?: number;
}> = ({
  minSize = 0.4,
  maxSize = 2.5,
  colors = ["cyan", "deeppink", "magenta"],
  minDistance = 75,
  maxDistance = 200,
  minDuration = 0.5,
  maxDuration = 4,
  placementClassName = "top-[15vh] left-[15vh]",
  delay = 0,
  numParticles = 50,
}) => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, delay * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [delay]);

  if (!showFireworks) return null; // Don't render anything if not time to show fireworks

  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * 360;
    const colorIndex = Math.floor(Math.random() * colors.length);
    particles.push(
      <Particle
        key={i}
        angle={angle}
        color={colors[colorIndex]}
        minSize={minSize}
        maxSize={maxSize}
        minDistance={minDistance}
        maxDistance={maxDistance}
        minDuration={minDuration}
        maxDuration={maxDuration}
      />
    );
  }

  return (
    <Box className={`absolute ${placementClassName}`}>
      <div className="relative w-full h-full">{particles}</div>
    </Box>
  );
};

export default Fireworks;
