import { useEffect } from "react";

export default function useFocusTrap(
  firstFocusedElement: HTMLButtonElement | null,
  closeSideBar: () => void,
  focusableContent: (HTMLElement | null)[],
  sideBarStatus: boolean,
) {
  useEffect(() => {
    if (sideBarStatus) {
      firstFocusedElement?.focus();

      // Escape key handler
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeSideBar();
        }
      };

      //Trap focus within the side bar
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          e.preventDefault();
          const focusableElements = [...focusableContent];

          if (focusableElements.length) {
            // const first  = focusableElements[0];
            // const last = focusableElements[focusableElements.length - 1];

            // TRAP LOGIC

            //Locate the position of the focused element within focusableElement array
            const currentIndex = focusableElements.indexOf(
              document.activeElement as HTMLElement,
            );

            let nextIndex;

            if (e.shiftKey) {
              // Shift + Tab
              if (currentIndex == 0) {
                nextIndex = focusableElements.length - 1; // Loop to last
              } else {
                nextIndex = currentIndex - 1;
              }
            } else {
              // Tab only
              if (currentIndex == focusableElements.length - 1) {
                nextIndex = 0; // Loop to first
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

      //cleanup - remove the event listener to prevent memory leak
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [sideBarStatus]); //
}
