import { useRef } from "react";

// ===== SEPARATE HANDLER FUNCTIONS =====

const TouchHandlers = (
  containerRef: React.RefObject<HTMLDivElement>,
  onDragEnd: () => void,
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

    containerRef.current.style.scrollBehavior = "auto";
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragState.current.isActive || !containerRef.current) return;

    const deltaX = dragState.current.startX - e.touches[0].clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;

    if (Math.abs(deltaX) > 10) e.preventDefault();
  };

  const onTouchEnd = () => {
    if (!dragState.current.isActive || !containerRef.current) return;

    dragState.current.isActive = false;
    containerRef.current.style.scrollBehavior = "smooth";
    onDragEnd();
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};
