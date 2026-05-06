import { useState, useEffect } from "react";

export default function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
