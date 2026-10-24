import { describe, it, expect } from "vitest";
import { computeAngles } from "./angles.ts";
import { Landmark } from "./landmarks.ts";
import type { Point } from "./geometry.ts";

describe("computeAngles", () => {
  it("computes angles for a standing body", () => {
    const landmarks: Point[] = Array.from({ length: 33 }, () => ({
      x: 0,
      y: 0,
    }));

    // Left side
    landmarks[Landmark.LEFT_SHOULDER] = { x: 0.3, y: 0.05 };
    landmarks[Landmark.LEFT_ELBOW] = { x: 0.3, y: 0.1 };
    landmarks[Landmark.LEFT_WRIST] = { x: 0.3, y: 0.15 };
    landmarks[Landmark.LEFT_HIP] = { x: 0.3, y: 0.2 };
    landmarks[Landmark.LEFT_KNEE] = { x: 0.3, y: 0.5 };
    landmarks[Landmark.LEFT_ANKLE] = { x: 0.3, y: 0.8 };

    // Right side
    landmarks[Landmark.RIGHT_SHOULDER] = { x: 0.7, y: 0.05 };
    landmarks[Landmark.RIGHT_ELBOW] = { x: 0.7, y: 0.1 };
    landmarks[Landmark.RIGHT_WRIST] = { x: 0.7, y: 0.15 };
    landmarks[Landmark.RIGHT_HIP] = { x: 0.7, y: 0.2 };
    landmarks[Landmark.RIGHT_KNEE] = { x: 0.7, y: 0.5 };
    landmarks[Landmark.RIGHT_ANKLE] = { x: 0.7, y: 0.8 };

    const angles = computeAngles(landmarks, 640, 480);

    expect(angles.leftKnee).toBeCloseTo(180, 5);
    expect(angles.rightKnee).toBeCloseTo(180, 5);

    expect(angles.leftElbow).toBeCloseTo(180, 5);
    expect(angles.rightElbow).toBeCloseTo(180, 5);

    expect(angles.leftHip).toBeCloseTo(180, 5);
    expect(angles.rightHip).toBeCloseTo(180, 5);

    expect(angles.leftShoulder).toBeCloseTo(0, 5);
    expect(angles.rightShoulder).toBeCloseTo(0, 5);

    expect(angles.torsoTilt).toBeCloseTo(0, 5);
  });

  it("computes 45 degrees for a tilted torso", () => {
    const landmarks: Point[] = Array.from({ length: 33 }, () => ({
      x: 0,
      y: 0,
    }));

    landmarks[Landmark.LEFT_SHOULDER] = { x: 0.65, y: 0.3 };
    landmarks[Landmark.RIGHT_SHOULDER] = { x: 0.65, y: 0.3 };

    landmarks[Landmark.LEFT_HIP] = { x: 0.5, y: 0.5 };
    landmarks[Landmark.RIGHT_HIP] = { x: 0.5, y: 0.5 };

    const angles = computeAngles(landmarks, 640, 480);

    expect(angles.torsoTilt).toBeCloseTo(45, 5);
  });
});
