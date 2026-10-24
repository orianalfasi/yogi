import { describe, it, expect } from "vitest";
import { smoothValue, smoothAngles } from "./smoothing.ts";
import type { JointAngles } from "./angles.ts";

describe("smoothing", () => {
  it("returns the first value unchanged", () => {
    expect(smoothValue(null, 180)).toBe(180);
  });

  it("smooths a value using the default alpha", () => {
    expect(smoothValue(0, 100)).toBeCloseTo(30, 5);
  });

  it("smooths each joint angle independently", () => {
    const previous: JointAngles = {
      leftKnee: 0,
      rightKnee: 0,
      leftElbow: 0,
      rightElbow: 0,
      leftHip: 0,
      rightHip: 0,
      leftShoulder: 0,
      rightShoulder: 0,
      torsoTilt: 0,
    };

    const next: JointAngles = {
      ...previous,
      leftKnee: 100,
    };

    const result = smoothAngles(previous, next);

    expect(result.leftKnee).toBeCloseTo(30, 5);
    expect(result.rightKnee).toBe(0);
    expect(result.leftElbow).toBe(0);
    expect(result.rightElbow).toBe(0);
    expect(result.leftHip).toBe(0);
    expect(result.rightHip).toBe(0);
    expect(result.leftShoulder).toBe(0);
    expect(result.rightShoulder).toBe(0);
    expect(result.torsoTilt).toBe(0);
  });

  it("returns next angles unchanged when previous is null", () => {
    const next: JointAngles = {
      leftKnee: 180,
      rightKnee: 180,
      leftElbow: 180,
      rightElbow: 180,
      leftHip: 180,
      rightHip: 180,
      leftShoulder: 0,
      rightShoulder: 0,
      torsoTilt: 0,
    };

    expect(smoothAngles(null, next)).toEqual(next);
  });
});
