import { useState, useEffect } from "react";

export default function useActiveIndexFullVisible(
  containerRef: React.RefObject<HTMLDivElement | null>,
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>, // Array of refs
) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const fullyVisible = entries
          .filter((entry) => entry.intersectionRatio === 1)
          .map((entry) => Number(entry.target.getAttribute("data-index")))
          .sort((a, b) => a - b);

        if (fullyVisible.length > 0) {
          setActiveIndex(fullyVisible[0]);
        }
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      },
    );

    // Observe each ref
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [containerRef, itemRefs]);

  return activeIndex;
}
