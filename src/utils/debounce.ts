type AnyFunction = (...args: any[]) => void;

//This ensures that a function is only executed after a certain amount of time has passed since it was last called.

export default function debounce<T extends AnyFunction>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
