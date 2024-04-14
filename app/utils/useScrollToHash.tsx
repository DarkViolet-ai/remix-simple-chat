import { useEffect } from "react";

const findCumulativeOffset = (element: Element | null): number => {
  let top = 0;
  while (element) {
    top += (element as HTMLElement).offsetTop || 0;
    element = (element as HTMLElement).offsetParent as Element | null;
  }
  return top;
};

export const useScrollToHash = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSectionId = "";
      let lastSectionOffset = Number.MAX_VALUE;

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = findCumulativeOffset(sectionElement);
        const sectionHeight = sectionElement.offsetHeight;
        const pageOffset = window.pageYOffset;

        if (
          pageOffset >= sectionTop - sectionHeight / 3 &&
          pageOffset < sectionTop + sectionHeight
        ) {
          if (pageOffset < lastSectionOffset) {
            lastSectionOffset = pageOffset;
            currentSectionId = sectionElement.id;
          }
        }
      });

      if (currentSectionId) {
        window.history.replaceState(null, "", `#${currentSectionId}`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};
