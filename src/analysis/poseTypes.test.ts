import { describe, it, expect } from "vitest";
import mountain from "../poses/mountain.json";
import type { PoseFile } from "./poseTypes.ts";

describe("Mountain pose file", () => {
  it("has a valid structure and knee rule", () => {
    const pose: PoseFile = mountain as PoseFile;

    expect(pose.id).toBe("mountain");
    expect(pose.view).toBe("front");

    const leftKneeRule = pose.rules.find((rule) => rule.joint === "leftKnee");

    expect(leftKneeRule).toBeDefined();
    expect(leftKneeRule!.min).toBeLessThan(180);
    expect(leftKneeRule!.max).toBeGreaterThanOrEqual(180);
    expect(pose.hiddenSentence).toBe(
      "Take a step back until your whole body is visible in the frame.",
    );
  });
});
