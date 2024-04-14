import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only execute this in the browser
    if (typeof document !== "undefined") {
      // Create the div for portal content
      const container = document.createElement("div");
      containerRef.current = container;
      const portalRoot = document.getElementById("modal-root") || document.body;
      portalRoot.appendChild(container);

      return () => {
        if (containerRef.current) {
          portalRoot.removeChild(containerRef.current);
        }
      };
    }
  }, []);

  // Only render on client side
  if (typeof document === "undefined" || !containerRef.current) {
    return null;
  }

  return ReactDOM.createPortal(children, containerRef.current);
};

export default Portal;
