const bounceAnimation = `
@keyframes bounce {
  0%, 100% {
    transform: scale(0) translateX(100%);
  }
  40% {
    transform: scale(1.0) translateX(0);
  }
}`;

interface BouncingDotsProps {
  color?: string;
  dotSize?: number;
  dotCount?: number;
  speed?: string;
}

export default function BouncingDots({
  color = "cyan",
  dotSize = 10,
  dotCount = 5,
  speed = "4s",
}: BouncingDotsProps) {
  const dots = Array.from({ length: dotCount });

  return (
    <>
      <style>{bounceAnimation}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dots.map((_, index) => (
          <div
            key={index}
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              margin: "0 6px",
              backgroundColor: color,
              borderRadius: "50%",
              boxShadow: "2px 2px 2px black",
              display: "inline-block",
              // The delay is also adjusted to make sure it's positive
              animation: `bounce ${speed} ${
                0.5 * index
              }s infinite ease-in-out both`,
            }}
          />
        ))}
      </div>
    </>
  );
}
