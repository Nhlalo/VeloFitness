// generateInitials.test.js
import { describe, it, expect } from "vitest";
import generateInitials from "./generateInitials";

describe("generateInitials", () => {
  describe("valid inputs", () => {
    it("returns initials when both name and surname are provided", () => {
      expect(generateInitials("John", "Doe")).toBe("JD");
    });

    it("capitalizes lowercase inputs", () => {
      expect(generateInitials("john", "doe")).toBe("JD");
    });

    it("handles mixed case inputs", () => {
      expect(generateInitials("jOhN", "dOe")).toBe("JD");
    });

    it("takes only first letter even if longer strings provided", () => {
      expect(generateInitials("Jonathan", "Davidson")).toBe("JD");
    });

    it("returns two letters only (no extra characters)", () => {
      const result = generateInitials("Michael", "Jackson");
      expect(result).toBe("MJ");
      expect(result.length).toBe(2);
    });
  });

  describe("edge cases - returns empty string", () => {
    it("returns empty string when name is undefined", () => {
      expect(generateInitials(undefined, "Doe")).toBe("");
    });

    it("returns empty string when surname is undefined", () => {
      expect(generateInitials("John", undefined)).toBe("");
    });

    it("returns empty string when both are undefined", () => {
      expect(generateInitials(undefined, undefined)).toBe("");
    });

    it("returns empty string when name is empty string", () => {
      expect(generateInitials("", "Doe")).toBe("");
    });

    it("returns empty string when surname is empty string", () => {
      expect(generateInitials("John", "")).toBe("");
    });

    it("returns empty string when both are empty strings", () => {
      expect(generateInitials("", "")).toBe("");
    });

    it("returns empty string when name is null", () => {
      // @ts-expect-error - testing runtime behavior with invalid type
      expect(generateInitials(null, "Doe")).toBe("");
    });

    it("returns empty string when surname is null", () => {
      // @ts-expect-error - testing runtime behavior with invalid type
      expect(generateInitials("John", null)).toBe("");
    });
  });

  describe("special characters", () => {
    it("handles names with special characters", () => {
      expect(generateInitials("J@hn", "D#e")).toBe("JD");
    });

    it("handles unicode/emoji characters", () => {
      // Takes first character which might be an emoji
      const result = generateInitials("😊John", "Doe");
      expect(result.length).toBe(2);
    });
  });
});
