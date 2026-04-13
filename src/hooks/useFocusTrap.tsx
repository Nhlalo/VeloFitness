// hooks/useFocusTrap.ts
import { useEffect } from "react";

export default function useFocusTrap(
  firstFocusedElement: HTMLButtonElement | null,
  closeSideBar: () => void,
  focusableContent: (HTMLElement | null)[],
  sideBarStatus: boolean,
  isLoggedIn: boolean,
) {
  useEffect(() => {
    if (sideBarStatus) {
      firstFocusedElement?.focus();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeSideBar();
        }
      };

      // Trap focus within the side bar
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          e.preventDefault();

          const focusableElements = focusableContent.filter(
            (el): el is HTMLElement => el !== null,
          );

          if (focusableElements.length) {
            const currentIndex = focusableElements.indexOf(
              document.activeElement as HTMLElement,
            );

            let nextIndex;

            if (e.shiftKey) {
              if (currentIndex === 0 || currentIndex === -1) {
                nextIndex = focusableElements.length - 1;
              } else {
                nextIndex = currentIndex - 1;
              }
            } else {
              if (
                currentIndex === focusableElements.length - 1 ||
                currentIndex === -1
              ) {
                nextIndex = 0;
              } else {
                nextIndex = currentIndex + 1;
              }
            }

            focusableElements[nextIndex]?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTabKey);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [sideBarStatus, focusableContent, isLoggedIn]);
}
