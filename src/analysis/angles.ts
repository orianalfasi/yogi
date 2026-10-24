import { angleAt, scalePoint, type Point } from "./geometry.ts";
import { getPoint, Landmark } from "./landmarks.ts";
export type JointAngles = {
  leftKnee: number;
  rightKnee: number;
  leftElbow: number;
  rightElbow: number;
  leftHip: number;
  rightHip: number;
  leftShoulder: number;
  rightShoulder: number;
  torsoTilt: number;
};

export function computeAngles(
  landmarks: readonly Point[],
  width: number,
  height: number,
): JointAngles {
  const point = (index: number): Point =>
    scalePoint(getPoint(landmarks, index), width, height);

  const leftShoulder = point(Landmark.LEFT_SHOULDER);
  const rightShoulder = point(Landmark.RIGHT_SHOULDER);
  const leftHip = point(Landmark.LEFT_HIP);
  const rightHip = point(Landmark.RIGHT_HIP);

  const midShoulder = {
    x: (leftShoulder.x + rightShoulder.x) / 2,
    y: (leftShoulder.y + rightShoulder.y) / 2,
  };

  const midHip = {
    x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2,
  };

  const dx = midShoulder.x - midHip.x;
  const dy = midShoulder.y - midHip.y;

  const torsoTilt = Math.atan2(dx, -dy) * (180 / Math.PI);
  return {
    leftKnee: angleAt(
      point(Landmark.LEFT_HIP),
      point(Landmark.LEFT_KNEE),
      point(Landmark.LEFT_ANKLE),
    ),
    rightKnee: angleAt(
      point(Landmark.RIGHT_HIP),
      point(Landmark.RIGHT_KNEE),
      point(Landmark.RIGHT_ANKLE),
    ),
    leftElbow: angleAt(
      point(Landmark.LEFT_SHOULDER),
      point(Landmark.LEFT_ELBOW),
      point(Landmark.LEFT_WRIST),
    ),
    rightElbow: angleAt(
      point(Landmark.RIGHT_SHOULDER),
      point(Landmark.RIGHT_ELBOW),
      point(Landmark.RIGHT_WRIST),
    ),
    leftHip: angleAt(
      point(Landmark.LEFT_SHOULDER),
      point(Landmark.LEFT_HIP),
      point(Landmark.LEFT_KNEE),
    ),
    rightHip: angleAt(
      point(Landmark.RIGHT_SHOULDER),
      point(Landmark.RIGHT_HIP),
      point(Landmark.RIGHT_KNEE),
    ),
    leftShoulder: angleAt(
      point(Landmark.LEFT_ELBOW),
      point(Landmark.LEFT_SHOULDER),
      point(Landmark.LEFT_HIP),
    ),
    rightShoulder: angleAt(
      point(Landmark.RIGHT_ELBOW),
      point(Landmark.RIGHT_SHOULDER),
      point(Landmark.RIGHT_HIP),
    ),
    torsoTilt,
  };
}
