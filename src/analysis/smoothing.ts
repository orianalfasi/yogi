import type { JointAngles } from "./angles.ts";

export function smoothValue(
  previous: number | null,
  next: number,
  alpha = 0.3,
): number {
  if (previous === null) {
    return next;
  }

  return alpha * next + (1 - alpha) * previous;
}

export function smoothAngles(
  previous: JointAngles | null,
  next: JointAngles,
  alpha = 0.3,
): JointAngles {
  if (previous === null) {
    return next;
  }

  return {
    leftKnee: smoothValue(previous.leftKnee, next.leftKnee, alpha),
    rightKnee: smoothValue(previous.rightKnee, next.rightKnee, alpha),
    leftElbow: smoothValue(previous.leftElbow, next.leftElbow, alpha),
    rightElbow: smoothValue(previous.rightElbow, next.rightElbow, alpha),
    leftHip: smoothValue(previous.leftHip, next.leftHip, alpha),
    rightHip: smoothValue(previous.rightHip, next.rightHip, alpha),
    leftShoulder: smoothValue(previous.leftShoulder, next.leftShoulder, alpha),
    rightShoulder: smoothValue(
      previous.rightShoulder,
      next.rightShoulder,
      alpha,
    ),
    torsoTilt: smoothValue(previous.torsoTilt, next.torsoTilt, alpha),
  };
}
