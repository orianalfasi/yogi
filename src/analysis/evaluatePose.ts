import type { JointAngles } from "./angles.ts";
import { Landmark } from "./landmarks.ts";
import type { PoseFile, PoseRule } from "./poseTypes.ts";

export type PoseEvaluation = {
  passed: readonly PoseRule[];
  failure: PoseRule | null;
  jointsVisible: boolean;
};

const landmarksFor: Record<keyof JointAngles, readonly number[]> = {
  leftKnee: [Landmark.LEFT_HIP, Landmark.LEFT_KNEE, Landmark.LEFT_ANKLE],
  rightKnee: [Landmark.RIGHT_HIP, Landmark.RIGHT_KNEE, Landmark.RIGHT_ANKLE],
  leftElbow: [Landmark.LEFT_SHOULDER, Landmark.LEFT_ELBOW, Landmark.LEFT_WRIST],
  rightElbow: [
    Landmark.RIGHT_SHOULDER,
    Landmark.RIGHT_ELBOW,
    Landmark.RIGHT_WRIST,
  ],
  leftHip: [Landmark.LEFT_SHOULDER, Landmark.LEFT_HIP, Landmark.LEFT_KNEE],
  rightHip: [Landmark.RIGHT_SHOULDER, Landmark.RIGHT_HIP, Landmark.RIGHT_KNEE],
  leftShoulder: [
    Landmark.LEFT_ELBOW,
    Landmark.LEFT_SHOULDER,
    Landmark.LEFT_HIP,
  ],
  rightShoulder: [
    Landmark.RIGHT_ELBOW,
    Landmark.RIGHT_SHOULDER,
    Landmark.RIGHT_HIP,
  ],
  torsoTilt: [
    Landmark.LEFT_SHOULDER,
    Landmark.RIGHT_SHOULDER,
    Landmark.LEFT_HIP,
    Landmark.RIGHT_HIP,
  ],
};

function jointsAreVisible(
  pose: PoseFile,
  landmarks: readonly { visibility?: number }[],
): boolean {
  for (const rule of pose.rules) {
    for (const index of landmarksFor[rule.joint]) {
      const visibility = landmarks[index]?.visibility ?? 0;
      if (visibility < 0.5) {
        return false;
      }
    }
  }
  return true;
}

export function evaluatePose(
  pose: PoseFile,
  angles: JointAngles,
  landmarks: readonly { visibility?: number }[],
): PoseEvaluation {
  if (!jointsAreVisible(pose, landmarks)) {
    return { passed: [], failure: null, jointsVisible: false };
  }

  const passed: PoseRule[] = [];
  let failure: PoseRule | null = null;

  for (const rule of pose.rules) {
    const angle = angles[rule.joint];
    const inRange = angle >= rule.min && angle <= rule.max;

    if (inRange) {
      passed.push(rule);
      continue;
    }

    if (failure === null || rule.priority > failure.priority) {
      failure = rule;
    }
  }

  return { passed, failure, jointsVisible: true };
}
