import { useState, useEffect } from "react";

/**
 * Hook to detect if current screen width is desktop breakpoint (>= 1280px / xl)
 * Handles SSR safety and dynamic resize events
 */
export function useIsDesktop(breakpoint = 1280) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= breakpoint;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const updateMatch = (e) => setIsDesktop(e.matches);

    // Initial check
    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    } else {
      mediaQuery.addListener(updateMatch);
      return () => mediaQuery.removeListener(updateMatch);
    }
  }, [breakpoint]);

  return isDesktop;
}
