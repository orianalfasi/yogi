import { describe, it, expect } from "vitest";
import { angleAt, scalePoint } from "./geometry.ts";

describe("angleAt", () => {
  it("returns 90 degrees for a right angle", () => {
    const a = { x: 1, y: 0 };
    const b = { x: 0, y: 0 };
    const c = { x: 0, y: 1 };
    expect(angleAt(a, b, c)).toBe(90);
  });
});
describe("angleAt", () => {
  it("returns 0 degrees", () => {
    const a = { x: 1, y: 0 };
    const b = { x: 0, y: 0 };
    const c = { x: 2, y: 0 };
    expect(angleAt(a, b, c)).toBe(0);
  });
});
describe("angleAt", () => {
  it("returns 180 degrees", () => {
    const a = { x: 1, y: 0 };
    const b = { x: 0, y: 0 };
    const c = { x: -1, y: 0 };
    expect(angleAt(a, b, c)).toBe(180);
  });
});
describe("angleAt", () => {
  it("returns 0 degrees for identical points", () => {
    const a = { x: 1, y: 0 };
    const b = { x: 1, y: 0 };
    const c = { x: 1, y: 0 };
    expect(angleAt(a, b, c)).toBe(0);
  });
});

it("keeps a 45 degree angle on a 640 by 480 frame", () => {
  const width = 640;
  const height = 480;
  const b = { x: 0, y: 0 };
  const a = { x: 100 / width, y: 0 };
  const c = { x: 100 / width, y: 100 / height };

  const angle = angleAt(
    scalePoint(a, width, height),
    scalePoint(b, width, height),
    scalePoint(c, width, height),
  );

  expect(angle).toBeCloseTo(45, 5);
});
