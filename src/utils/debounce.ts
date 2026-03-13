import { useCallback, useRef } from "react";

type AnyFunction = (...args: any[]) => void;

//This ensures that a function is only executed after a certain amount of time has passed since it was last called.
export default function debounce<T extends AnyFunction>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);

      // Cleanup on unmount
      useCallback(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }, []);
    },
    [callback, delay],
  );
}
