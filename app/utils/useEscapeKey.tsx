import { useEffect } from "react";

// Custom hook definition
const useEscapeKey = (onEscape: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onEscape]);
};

export default useEscapeKey;
