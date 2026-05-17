import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import debounce from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("delays function execution until after delay period", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("resets timer when called again within delay period", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced(); // resets timer
    vi.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("only executes the last call when multiple calls happen within delay period", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced("first");
    debounced("second");
    debounced("third");
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("third");
  });

  it("passes the correct arguments to the callback", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced("hello", 42, { test: true });
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith("hello", 42, { test: true });
  });

  it("preserves `this` context", () => {
    const obj = {
      name: "Test Object",
      getName: function () {
        return this.name;
      },
    };

    const spy = vi.spyOn(obj, "getName");
    const debounced = debounce(obj.getName, 100);

    const bound = debounced.bind(obj);
    bound();
    vi.advanceTimersByTime(100);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(spy.mock.instances[0]).toBe(obj);
  });

  it("handles multiple independent debounced functions", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const debounced1 = debounce(callback1, 50);
    const debounced2 = debounce(callback2, 100);

    debounced1();
    debounced2();
    vi.advanceTimersByTime(60);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(40);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("works with zero delay (executes after next tick)", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 0);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(0);

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("handles multiple arguments correctly", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced(1, 2, 3);
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith(1, 2, 3);
  });

  it("creates separate timeout IDs for different debounced instances", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const debounced1 = debounce(callback1, 100);
    const debounced2 = debounce(callback2, 100);

    debounced1();
    debounced2();
    vi.advanceTimersByTime(50);
    debounced1(); // reset only first timer
    vi.advanceTimersByTime(60);

    expect(callback1).not.toHaveBeenCalled();

    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
