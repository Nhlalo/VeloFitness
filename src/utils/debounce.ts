type AnyFunction = (...args: any[]) => void;

//This ensures that a function is only executed after a certain amount of time has passed since it was last called.

export default function debounce<T extends AnyFunction>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>; // Better type than :number

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
