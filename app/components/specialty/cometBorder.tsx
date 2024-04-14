import React from "react";

interface CometBorderProps {
  children: React.ReactNode;
  w?: string;
  h?: string;
  bg?: string;
  rounded?: string;
  fontSize?: string;
  color?: string;
  p?: string;
  cometSize?: string;
  cometSpeed?: string;
  cometLength?: string;
  cometIntensity?: number;
  cometDirection?: "clockwise" | "counter-clockwise";
}

export default function CometBorder({
  children,
  w = "w-auto",
  h = "h-auto",
  bg = "bg-col-800",
  rounded = "rounded-[1vh]",
  fontSize = "text-lg",
  color = "text-[#colorCode]",
  p = "p-[0.2vh]",
  cometSize = "p-[0.2vh]",
  cometSpeed = "4s",
  cometLength = "70%",
  cometIntensity = 1,
  cometDirection = "counter-clockwise",
}: CometBorderProps) {
  const cometAnimationClass =
    cometDirection === "clockwise"
      ? "animate-cometClockwise"
      : "animate-cometCounterClockwise";

  const cometColorStart = `rgba(255, 239, 92, ${cometIntensity})`;
  const cometColorEnd = `rgba(255, 170, 52, ${cometIntensity})`;

  const cometGradient = `linear-gradient(to left, transparent, ${cometColorStart} ${cometLength}, ${cometColorEnd} ${cometLength}, transparent 100%)`;

  return (
    <div className={`relative ${w} ${h} ${rounded}`}>
      <div
        className={`relative overflow-hidden ${rounded} w-full h-full justify-center items-center ${cometSize}`}
      >
        <div
          className={`w-full h-full absolute inset-[50%_-70%_-70%_50%] ${cometAnimationClass}`}
          style={{
            filter: "blur(5px)",
            background: cometGradient,
            borderRadius: rounded,
            transition: "all 400ms ease",
            backgroundRepeat: "no-repeat",
            transformOrigin: "0 0",
            backgroundSize: "100% 100%",
            animationDuration: cometSpeed,
          }}
        ></div>
        <div
          className={`w-full h-full ${color} ${bg} ${p} ${fontSize} ${rounded} border border-transparent block transition-all duration-200 relative`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
