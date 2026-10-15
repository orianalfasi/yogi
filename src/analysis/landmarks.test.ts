import { describe, it, expect } from "vitest";
import type { Point } from "./geometry.ts";
import { Landmark, getPoint } from "./landmarks.ts";

describe("getPoint", () => {
  it("returns the left knee from a 33-point list", () => {
    const landmarks: Point[] = Array.from({ length: 33 }, () => ({
      x: 0,
      y: 0,
    }));
    landmarks[Landmark.LEFT_KNEE] = { x: 0.2, y: 0.7 };

    expect(getPoint(landmarks, Landmark.LEFT_KNEE)).toEqual({ x: 0.2, y: 0.7 });
  });
});
