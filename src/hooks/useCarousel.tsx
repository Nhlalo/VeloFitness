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

const MouseHandlers = (
  containerRef: React.RefObject<HTMLDivElement>,
  onDragEnd: () => void,
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

    const el = containerRef.current;
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";

    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isActive || !containerRef.current) return;

    e.preventDefault();
    const deltaX = dragState.current.startX - e.clientX;
    containerRef.current.scrollLeft =
      dragState.current.startScrollLeft + deltaX;
  };

  const onMouseUp = () => {
    if (!dragState.current.isActive || !containerRef.current) return;

    dragState.current.isActive = false;

    const el = containerRef.current;
    el.style.scrollBehavior = "smooth";
    el.style.cursor = "grab";
    el.style.userSelect = "auto";

    onDragEnd();
  };

  const onMouseLeave = () => {
    if (dragState.current.isActive && containerRef.current) {
      dragState.current.isActive = false;

      const el = containerRef.current;
      el.style.scrollBehavior = "smooth";
      el.style.cursor = "grab";
      el.style.userSelect = "auto";

      onDragEnd();
    }
  };

  return { onMouseDown, onMouseMove, onMouseUp, onMouseLeave };
};

const KeyboardHandlers = (
  containerRef: React.RefObject<HTMLDivElement>,
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
