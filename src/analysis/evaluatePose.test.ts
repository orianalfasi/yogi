import { describe, it, expect } from "vitest";
import mountain from "../poses/mountain.json";
import { computeAngles } from "./angles.ts";
import { evaluatePose } from "./evaluatePose.ts";
import { Landmark } from "./landmarks.ts";
import type { Point } from "./geometry.ts";
import type { PoseFile } from "./poseTypes.ts";

function allVisible() {
  return Array.from({ length: 33 }, () => ({ visibility: 1 }));
}

function standingBody(): Point[] {
  const landmarks: Point[] = Array.from({ length: 33 }, () => ({
    x: 0,
    y: 0,
  }));

  landmarks[Landmark.LEFT_SHOULDER] = { x: 0.3, y: 0.05 };
  landmarks[Landmark.LEFT_ELBOW] = { x: 0.3, y: 0.1 };
  landmarks[Landmark.LEFT_WRIST] = { x: 0.3, y: 0.15 };
  landmarks[Landmark.LEFT_HIP] = { x: 0.3, y: 0.2 };
  landmarks[Landmark.LEFT_KNEE] = { x: 0.3, y: 0.5 };
  landmarks[Landmark.LEFT_ANKLE] = { x: 0.3, y: 0.8 };

  landmarks[Landmark.RIGHT_SHOULDER] = { x: 0.7, y: 0.05 };
  landmarks[Landmark.RIGHT_ELBOW] = { x: 0.7, y: 0.1 };
  landmarks[Landmark.RIGHT_WRIST] = { x: 0.7, y: 0.15 };
  landmarks[Landmark.RIGHT_HIP] = { x: 0.7, y: 0.2 };
  landmarks[Landmark.RIGHT_KNEE] = { x: 0.7, y: 0.5 };
  landmarks[Landmark.RIGHT_ANKLE] = { x: 0.7, y: 0.8 };

  return landmarks;
}

describe("evaluatePose", () => {
  const pose: PoseFile = mountain as PoseFile;

  it("passes a standing body", () => {
    const angles = computeAngles(standingBody(), 640, 480);
    const result = evaluatePose(pose, angles, allVisible());

    expect(result.failure).toBeNull();
    expect(result.passed).toHaveLength(pose.rules.length);
  });

  it("fails the left knee when that knee is bent", () => {
    const landmarks = standingBody();
    landmarks[Landmark.LEFT_KNEE] = { x: 0.5, y: 0.5 };

    const angles = computeAngles(landmarks, 640, 480);
    const result = evaluatePose(pose, angles, allVisible());

    expect(result.failure?.joint).toBe("leftKnee");
    expect(result.failure?.sentence).toBe("Straighten your left leg.");
  });
  it("hides the angle cue when a needed joint is under 0.5", () => {
    const landmarks = standingBody();
    landmarks[Landmark.LEFT_KNEE] = { x: 0.5, y: 0.5 };

    const angles = computeAngles(landmarks, 640, 480);
    const visibility = allVisible();
    visibility[Landmark.LEFT_KNEE] = { visibility: 0.4 };

    const result = evaluatePose(pose, angles, visibility);

    expect(result.jointsVisible).toBe(false);
    expect(result.failure).toBeNull();
    expect(result.passed).toHaveLength(0);
  });
});
