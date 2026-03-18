import { useRef, useState } from "react";

// ===== SEPARATE HANDLER FUNCTIONS =====

const TouchHandlers = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDragEnd: () => void,
  setIsDragging: (isDragging: boolean) => void,
) => {
  const dragState = useRef({
    isActive: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    dragState.current = {
      isActive: true,
      startX: e.touches[0].clientX,
      startScrollLeft: containerRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !dragState.current) return;

    const deltaX = dragState.current.startX - e.touches[0].clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;

    if (Math.abs(deltaX) > 10) e.preventDefault();
  };

  const onTouchEnd = () => {
    if (!containerRef.current) return;

    setIsDragging(false);
    onDragEnd();
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

const MouseHandlers = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDragEnd: () => void,
  setIsDragging: (isDragging: boolean) => void,
) => {
  const dragState = useRef({
    isActive: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    dragState.current = {
      isActive: true,
      startX: e.clientX,
      startScrollLeft: containerRef.current.scrollLeft,
    };

    setIsDragging(true);

    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !dragState.current) return;

    e.preventDefault();
    const deltaX = dragState.current.startX - e.clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;
  };

  const onMouseUp = () => {
    if (!containerRef.current) return;

    setIsDragging(false);

    onDragEnd();
  };

  const onMouseLeave = () => {
    if (!containerRef.current) {
      setIsDragging(false);
      onDragEnd();
    }
  };

  return { onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
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

  // ===== UTILITIES =====
  const updateButtonStates = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setPreviousScrollable(scrollLeft > 0);
    setNextScrollable(Math.abs(scrollLeft - maxScroll) >= 1);
  };

  const getScrollAmount = () =>
    !imgContainerRef.current ? 0 : imgContainerRef.current?.clientWidth;

  const smoothScroll = (direction: "left" | "right") => {
    if (!containerRef.current || isDragging) return;

    containerRef.current.scrollBy({
      left: direction === "left" ? -getScrollAmount() : getScrollAmount(),
      behavior: "smooth",
    });

    setTimeout(updateButtonStates, 200);
  };

  // ===== TOUCH HANDLERS =====
  const touchHandlers = TouchHandlers(
    containerRef,
    updateButtonStates,
    setIsDragging,
  );

  // ===== MOUSE HANDLERS =====
  const mouseHandlers = MouseHandlers(
    containerRef,
    updateButtonStates,
    setIsDragging,
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
      ...mouseHandlers,
      ...keyboardHandlers,
    },
    handlePrevious: () => smoothScroll("left"),
    handleNext: () => smoothScroll("right"),
  };
}
