import { describe, it, expect } from "vitest";
import { mapLandmark } from "./mapLandmark.ts";

describe("mapLandmark", () => {
  it("A square picture in a square window, not mirrored", () => {
    const point = { x: 0.25, y: 0.5 };
    const video = { width: 100, height: 100 };
    const box = { width: 100, height: 100 };
    const mirrored = false;
    expect(mapLandmark(point, video, box, mirrored)).toEqual({ x: 25, y: 50 });
  });
});
describe("mapLandmark", () => {
  it("A square picture in a square window, mirrored", () => {
    const point = { x: 0.25, y: 0.5 };
    const video = { width: 100, height: 100 };
    const box = { width: 100, height: 100 };
    const mirrored = true;
    expect(mapLandmark(point, video, box, mirrored)).toEqual({ x: 75, y: 50 });
  });
});
describe("mapLandmark", () => {
  it("A wide picture in a square window, not mirrored", () => {
    const point = { x: 0.5, y: 0.5 };
    const video = { width: 200, height: 100 };
    const box = { width: 100, height: 100 };
    const mirrored = false;
    expect(mapLandmark(point, video, box, mirrored)).toEqual({ x: 50, y: 50 });
  });
});
