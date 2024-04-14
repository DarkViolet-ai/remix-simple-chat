import Flex from "./flex";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  pt?: string;
  pb?: string;
  bg?: string; // Can be a color class or an image URL
}

export default function LayoutContainer({
  children,
  className = "",
  pt = "",
  pb = "",
  bg = "",
}: LayoutContainerProps) {
  // Simplified check to see if bg is a URL
  const isImageUrl =
    bg.startsWith("http://") ||
    bg.startsWith("https://") ||
    bg.startsWith("/images");

  // Apply background image or background class
  const backgroundStyle = isImageUrl
    ? { backgroundImage: `url(${bg})`, backgroundSize: "cover" }
    : {};

  const backgroundClass = isImageUrl ? "" : bg;

  return (
    <Flex
      className={`w-screen overflow-hidden justify-center ${pt} ${pb} ${backgroundClass} ${className}`}
      style={{ height: "100svh", maxHeight: "100svh", ...backgroundStyle }}
    >
      {children}
    </Flex>
  );
}
