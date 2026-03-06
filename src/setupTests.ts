// src/setupTests.ts
import "@testing-library/jest-dom"; // Adds custom matchers like toBeInTheDocument()
import "@testing-library/jest-dom/vitest"; // For Vitest specifically
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
