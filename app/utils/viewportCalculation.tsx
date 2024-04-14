import { useEffect, useState } from "react";

// Utility function to get the viewport width
export const GetViewportWidth = (): number => {
  // Ensure this runs in an environment where `window` is defined
  if (typeof window !== "undefined") {
    return window.innerWidth;
  } else {
    // Return a default value or handle the server-side rendering (SSR) case
    console.warn("getViewportWidth was called server-side. Returning 0.");
    return 0;
  }
};

export const GetGalleryRowHeight = (
  viewportWidth: number
): {
  viewportWidth: number;
  rowHeight: number;
  itemsPerRow: number;
} => {
  if (viewportWidth >= 1920) {
    const rowHeight = viewportWidth * 0.25;
    const itemsPerRow = 4;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 1280) {
    const rowHeight = viewportWidth * 0.333;
    const itemsPerRow = 3;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 768) {
    const rowHeight = viewportWidth * 0.5;
    const itemsPerRow = 2;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  if (viewportWidth >= 640) {
    const rowHeight = viewportWidth * 0.8;
    const itemsPerRow = 1;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
  {
    const rowHeight = viewportWidth * 0.98;
    const itemsPerRow = 1;
    return { viewportWidth, rowHeight, itemsPerRow };
  }
};

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return size;
};
