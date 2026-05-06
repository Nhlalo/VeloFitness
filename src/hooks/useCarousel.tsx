import { useRef, useState, useEffect } from "react";
import useWindowWidth from "./useWindowWidth";

// ===== SEPARATE HANDLER FUNCTIONS =====

const TouchHandlers = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDragEnd: () => void,
  setIsDragging: (isDragging: boolean) => void,
  windowWidth: number,
) => {
  const dragState = useRef({
    isActive: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || windowWidth >= 1024) return;

    dragState.current = {
      isActive: true,
      startX: e.touches[0].clientX,
      startScrollLeft: containerRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      !containerRef.current ||
      !dragState.current.isActive ||
      windowWidth >= 1024
    )
      return;

    const deltaX = dragState.current.startX - e.touches[0].clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;

    if (Math.abs(deltaX) > 10) e.preventDefault();
  };

  const onTouchEnd = () => {
    if (!dragState.current.isActive || windowWidth >= 1024) return;

    dragState.current.isActive = false;
    setIsDragging(false);
    onDragEnd();
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

const MouseHandlers = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDragEnd: () => void,
  setIsDragging: (isDragging: boolean) => void,
  windowWidth: number,
) => {
  const dragState = useRef({
    isActive: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only enable drag on mobile/tablet (<1024px)
    if (!containerRef.current || windowWidth >= 1024) return;

    // Don't interfere with button clicks or text selection
    if (e.button !== 0) return;

    dragState.current = {
      isActive: true,
      startX: e.clientX,
      startScrollLeft: containerRef.current.scrollLeft,
    };

    setIsDragging(true);

    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (
      !containerRef.current ||
      !dragState.current.isActive ||
      windowWidth >= 1024
    )
      return;

    e.preventDefault();
    const deltaX = dragState.current.startX - e.clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;
  };

  const onMouseUp = () => {
    if (!dragState.current.isActive || windowWidth >= 1024) return;

    dragState.current.isActive = false;
    setIsDragging(false);
    onDragEnd();
  };

  useEffect(() => {
    if (windowWidth >= 1024) return;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [windowWidth]);

  const onMouseLeave = () => {
    if (dragState.current.isActive) {
      dragState.current.isActive = false;
      setIsDragging(false);
      onDragEnd();
    }
  };

  return { onMouseDown, onMouseLeave };
};

const KeyboardHandlers = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  smoothScroll: (direction: "left" | "right") => void,
  updateButtonStates: () => void,
) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    switch (e.key) {
      case "ArrowLeft":
        smoothScroll("left");
        e.preventDefault();
        break;
      case "ArrowRight":
        smoothScroll("right");
        e.preventDefault();
        break;
      case "Home":
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setTimeout(updateButtonStates, 200);
        e.preventDefault();
        break;
      case "End":
        containerRef.current.scrollTo({
          left:
            containerRef.current.scrollWidth - containerRef.current.clientWidth,
          behavior: "smooth",
        });
        setTimeout(updateButtonStates, 200);
        e.preventDefault();
        break;
    }
  };

  return { onKeyDown };
};

export default function useCarousel(
  containerRef: React.RefObject<HTMLDivElement | null>,
  imgContainerRef: React.RefObject<HTMLDivElement | null>,
) {
  const [isPreviousScrollable, setPreviousScrollable] =
    useState<boolean>(false);
  const [isNextScrollable, setNextScrollable] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState(false);
  const windowWidth = useWindowWidth();

  // ===== UTILITIES =====
  const updateButtonStates = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setPreviousScrollable(scrollLeft > 1); // Small threshold for better UX
    setNextScrollable(scrollLeft < maxScroll - 1); // Small threshold for better UX
  };

  const getScrollAmount = () =>
    !imgContainerRef.current ? 0 : imgContainerRef.current?.clientWidth;

  const smoothScroll = (direction: "left" | "right") => {
    if (!containerRef.current || isDragging) return;

    const currentScroll = containerRef.current.scrollLeft;
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const scrollAmount = getScrollAmount();

    let newScrollLeft =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    // Clamp to boundaries to prevent overscroll
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));

    containerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update buttons after scroll completes
    const checkScrollEnd = () => {
      if (!containerRef.current) return;
      if (Math.abs(containerRef.current.scrollLeft - newScrollLeft) < 1) {
        updateButtonStates();
      } else {
        requestAnimationFrame(checkScrollEnd);
      }
    };
    requestAnimationFrame(checkScrollEnd);
  };

  // Listen to scroll events for real-time button updates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(updateButtonStates);
    };

    container.addEventListener("scroll", handleScroll);
    updateButtonStates(); // Initial update

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef.current]);

  // ===== TOUCH HANDLERS =====
  const touchHandlers = TouchHandlers(
    containerRef,
    updateButtonStates,
    setIsDragging,
    windowWidth,
  );

  // ===== MOUSE HANDLERS =====
  const mouseHandlers = MouseHandlers(
    containerRef,
    updateButtonStates,
    setIsDragging,
    windowWidth,
  );

  // ===== KEYBOARD HANDLERS =====
  const keyboardHandlers = KeyboardHandlers(
    containerRef,
    smoothScroll,
    updateButtonStates,
  );

  return {
    isPreviousScrollable,
    isNextScrollable,
    isDragging,
    eventHandlers: {
      ...touchHandlers,
      onMouseDown: mouseHandlers.onMouseDown,
      onMouseLeave: mouseHandlers.onMouseLeave,
      onKeyDown: keyboardHandlers.onKeyDown,
    },
    handlePrevious: () => smoothScroll("left"),
    handleNext: () => smoothScroll("right"),
  };
}
