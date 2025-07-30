import { useEffect, useState } from "react";

const getWindowSize = () => {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1024,
    isDesktop: width > 1024,
  };
};

export const useWindowSize = (debounceMs = 100) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const newSize = getWindowSize();

        // prevent unnecessary re-render
        setWindowSize((prev) => {
          const hasChanged =
            prev.width !== newSize.width ||
            prev.height !== newSize.height ||
            prev.isMobile !== newSize.isMobile ||
            prev.isTablet !== newSize.isTablet ||
            prev.isDesktop !== newSize.isDesktop;

          return hasChanged ? newSize : prev;
        });
      }, debounceMs);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs]);

  return windowSize;
};
