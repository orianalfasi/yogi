import type { JointAngles } from "./angles.ts";

export type PoseRule = {
  joint: keyof JointAngles;
  min: number;
  max: number;
  sentence: string;
  priority: number;
};

export type PoseFile = {
  id: "mountain";
  view: "front";
  hiddenSentence: string;
  rules: readonly PoseRule[];
};
