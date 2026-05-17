import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { acquireLocalGyms } from "./acquireGymData";
import { Description, Gym } from "../types/club.interface";

describe("acquireLocalGyms", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const advanceAndResolve = async (
    promise: Promise<Description[] | Gym[] | string>,
  ) => {
    vi.advanceTimersByTime(1000);
    return await promise;
  };

  describe("country matching (returns Description[])", () => {
    it('returns USA gym descriptions when location is "USA"', async () => {
      const promise = acquireLocalGyms("USA");
      const result = await advanceAndResolve(promise);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("country", "USA");
      expect(result[0]).toHaveProperty("description");
      expect(result[0]).toHaveProperty("clubs");
    });

    it("returns South Africa gym descriptions (case-insensitive)", async () => {
      const promise = acquireLocalGyms("south africa");
      const result = await advanceAndResolve(promise);
      expect((result as Gym[] | Description[])[0].country).toBe("South Africa");
    });

    it("returns Canada gym descriptions", async () => {
      const promise = acquireLocalGyms("canada");
      const result = await advanceAndResolve(promise);
      expect((result as Gym[] | Description[])[0].country).toBe("Canada");
    });
  });

  describe("gym detail matching (returns Gym[])", () => {
    it('finds gym by name "Back Bay Gym"', async () => {
      const promise = acquireLocalGyms("Back Bay Gym");
      const result = await advanceAndResolve(promise);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("name", "Back Bay Gym");
    });

    it('finds gym by neighborhood "Yorkville"', async () => {
      const promise = acquireLocalGyms("Yorkville");
      const result = await advanceAndResolve(promise);
      expect(result.length).toBe(2); // Bay Street Fitness and Yorkville Urban Fitness
      expect((result as Gym[])[0].neighborhood).toBe("Yorkville");
    });

    it('finds gym by zip code "M5L 1G9"', async () => {
      const promise = acquireLocalGyms("M5L 1G9");
      const result = await advanceAndResolve(promise);
      expect((result as Gym[])[0].postal).toBe("M5L 1G9");
    });

    it('finds gym by city "Johannesburg"', async () => {
      const promise = acquireLocalGyms("Johannesburg");
      const result = await advanceAndResolve(promise);
      expect(result.length).toBe(2); // both SAGyms
      expect((result as Gym[])[0].city).toBe("Johannesburg");
    });

    it('finds gym by state "Boston"', async () => {
      const promise = acquireLocalGyms("Boston");
      const result = await advanceAndResolve(promise);
      expect(result.length).toBe(2);
      expect((result as Gym[])[0].state).toBe("Boston");
    });
  });

  describe("no matches", () => {
    it("returns string message when no gyms or countries match", async () => {
      const promise = acquireLocalGyms("NonexistentPlace");
      const result = await advanceAndResolve(promise);
      expect(result).toBe(
        "There are no gym facilities in the immediate vicinity.",
      );
    });

    it("handles empty string (no match)", async () => {
      const promise = acquireLocalGyms("");

      expect(promise).rejects.toBe(
        "Empty input - input cannot be white spaces only",
      );
    });

    it("handles whitespace only string", async () => {
      const promise = acquireLocalGyms("   ");

      expect(promise).rejects.toBe(
        "Empty input - input cannot be white spaces only",
      );
    });
  });

  describe("error handling", () => {
    it("rejects with error message when location is not a string", async () => {
      // @ts-expect-error - testing runtime behavior with invalid type
      const promise = acquireLocalGyms(123);
      // No need to advance timers because it rejects synchronously before setTimeout
      await expect(promise).rejects.toBe(
        "Incorrect Datatype - location must be a string",
      );
    });

    it("rejects with error message when location is null", async () => {
      // @ts-expect-error - testing runtime behavior with invalid type
      const promise = acquireLocalGyms(null);
      await expect(promise).rejects.toBe(
        "Incorrect Datatype - location must be a string",
      );
    });

    it("rejects with error message when location is undefined", async () => {
      // @ts-expect-error - testing runtime behavior with invalid type
      const promise = acquireLocalGyms(undefined);
      await expect(promise).rejects.toBe(
        "Incorrect Datatype - location must be a string",
      );
    });
  });
});
