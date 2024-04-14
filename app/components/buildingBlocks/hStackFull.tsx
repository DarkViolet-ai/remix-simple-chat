import HStack from "./hStack";

export default function HStackFull({
  children,
  className,
  gap,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  onClick?: () => void;
}) {
  return (
    <HStack className={`w-full ${gap} ${className}`} onClick={onClick}>
      {children}
    </HStack>
  );
}
