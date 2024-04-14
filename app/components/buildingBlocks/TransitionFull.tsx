import Transition, { TransitionType } from "./transition";

export default function TransitionFull({
  children,
  className,
  type = "fade",
  delay = 0,
  duration = 0.5,
}: {
  children?: React.ReactNode;
  className?: string;
  type?: TransitionType;
  delay?: number;
  duration?: number;
}) {
  return (
    <Transition
      className={`flex w-full justify-center ${className}`}
      type={type}
      delay={delay}
      duration={duration}
    >
      {children}
    </Transition>
  );
}
